import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entity/user.entity';
import { CreateUserDTO } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  private issuer = 'login';
  private audicence = 'users';

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailer: MailerService,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async createToken(user: UserEntity) {
    const accessToken = this.jwtService.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      {
        expiresIn: '7 days',
        subject: String(user.id),
        issuer: this.issuer,
        audience: this.audicence,
      },
    );

    return { accessToken: accessToken };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: this.issuer,
        audience: this.audicence,
      });

      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  isInvalidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (e) {
      return false;
    }
  }

  async login(email: string, password: string) {
    const user = await this.usersRepository.findOneBy({
      email,
    });

    if (!user) {
      throw new UnauthorizedException('Email e/ou senha incorretor');
    }

    const userAllowed = await bcrypt.compare(password, user.password);

    if (!userAllowed) {
      throw new UnauthorizedException('Email e/ou senha incorretor');
    }

    return this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.usersRepository.findOneBy({
      email,
    });

    if (!user) {
      throw new UnauthorizedException('Email não existe!');
    }

    const token = this.jwtService.sign(
      {
        id: user.id,
      },
      {
        expiresIn: '30 minutes',
        subject: String(user.id),
        issuer: 'forget',
        audience: 'users',
      },
    );

    await this.mailer.sendMail({
      subject: 'Recuperação de Senha',
      to: 'jao@code.com.br',
      template: 'forget',
      context: {
        name: user.name,
        token,
      },
    });

    return { success: true };
  }

  async reset(password: string, token: string) {
    try {
      const data: any = this.jwtService.verify(token, {
        issuer: 'forget',
        audience: 'users',
      });

      if (isNaN(Number(data.id))) {
        throw new BadRequestException('Token invalido!');
      }

      const salt = await bcrypt.genSalt();

      password = await bcrypt.hash(password, salt);

      await this.usersRepository.update(Number(data.id), {
        password,
      });

      const user = await this.userService.get(Number(data.id));

      return this.createToken(user);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async register(data: CreateUserDTO) {
    delete data.role;

    const user = await this.userService.create(data);

    return this.createToken(user);
  }
}

import { Body, Controller, Headers, Post, Req, UseGuards } from "@nestjs/common";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { CreateUserDTO } from "src/user/dto/create-user.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/decorators/user.decorator";

@Controller('auth')
export class AuthController{

    constructor(
        private readonly authService: AuthService,
    ){}

    @Post('login')
    async login(@Body() {email, password}: AuthLoginDTO){
        return this.authService.login(email, password)
    }

    @Post('register')
    async register(@Body() body: CreateUserDTO){
        return this.authService.register(body)
    }

    @Post('forget')
    async forget(@Body() {email}: AuthForgetDTO){
        return this.authService.forget(email)
    }

    @Post('reset')
    async reset(@Body() {passwoord, token}: AuthResetDTO){
        return this.authService.reset(passwoord, token)
    }

    @UseGuards(AuthGuard)
    @Post('me')
    async me(@User() req){

        return {user: req}

        //return this.authService.checkToken((token ?? '').split(' ')[1])
    }
}
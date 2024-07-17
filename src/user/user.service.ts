import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import * as bcrypt from 'bcrypt';
import { Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>
    ) {}

    async create( data : CreateUserDTO){

        const salt = await bcrypt.genSalt()

        data.password = await bcrypt.hash(data.password, salt)

        data.birthAt

        const user = this.usersRepository.create(data)
        return this.usersRepository.save(user)
    }


    async getAll(){
        return this.usersRepository.find()
    }

    async get(id: number){
        return this.usersRepository.findOneBy({
            id
        })
    }

    async update(data : UpdatePatchUserDTO, id: number){
        await this.exists(id)

        if(data.password != null){
            const salt = await bcrypt.genSalt()

            data.password = await bcrypt.hash(data.password, salt)
        }        

        const birthAt = data.birthAt ? new Date(data.birthAt) : null

        await this.usersRepository.update(id, {
            ... data,
            birthAt : birthAt
        })

        return this.get(id)
    }

    async delete(id: number){

        await this.exists(id)

        return this.usersRepository.delete(id)
    }

    async exists(id: number){
        const user = await this.usersRepository.existsBy({
            id
        })

        if(!user){
            throw new NotFoundException(`O usuario do id ${id} nao existe!`)
        }
    }
}
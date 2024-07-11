import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {}

    async create( data : CreateUserDTO){
        return this.prisma.user.create({
            data
        })
    }


    async getAll(){
        return this.prisma.user.findMany()
    }

    async get(id: number){
        return this.prisma.user.findUnique({
            where: {
                id
            }
        })
    }

    async update(data : UpdatePatchUserDTO, id: number){
        await this.exists(id)

        const birthAt = data.birthAt ? new Date(data.birthAt) : null

        return this.prisma.user.update({
            data: {... data, birthAt : birthAt},
            where: {
                id
            }
        })
    }

    async delete(id: number){

        await this.exists(id)

        return this.prisma.user.delete({
            where: {
                id
            }
        })
    }

    async exists(id: number){
        const user = await this.get(id)

        if(!user){
            throw new NotFoundException(`O usuario do id ${id} nao existe!`)
        }
    }
}
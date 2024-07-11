import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";

@Controller('users') 
export class UserController{

    constructor( private readonly userService: UserService){}
    
    @Post()
    async create(@Body() data: CreateUserDTO){
        return this.userService.create(data)
    }

    @Get()
    async read(){
        return {users: []}
    }

    @Get(':id')
    async readOne(@Param() param){
        return {user: {}, param}
    }

    @Put(':id')
    async update(@Body() {email, name, password}: UpdatePatchUserDTO, @Param() param){
        return {
            method: 'put',
            email, name, password,
            param
        }
    }

    @Patch(':id')
    async updatePartial(@Body() {email, name, password}: UpdatePatchUserDTO, @Param() param){
        return {
            method: 'patch',
            email, name, password,
            param
        }
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id){
        return {
            method: 'delete',
            id
        }
    }
}
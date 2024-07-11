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
        return this.userService.getAll()
    }

    @Get(':id')
    async readOne(@Param('id', ParseIntPipe) id: number){
        return this.userService.get(id)
    }

    @Put(':id')
    async update(@Body() data: UpdatePatchUserDTO, @Param('id', ParseIntPipe) id: number){
        return this.userService.update(data, id)
    }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchUserDTO, @Param('id', ParseIntPipe) id: number){
        return this.userService.update(data, id)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id){
        return this.userService.delete(id)
    }
}
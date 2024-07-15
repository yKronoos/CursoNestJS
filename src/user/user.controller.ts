import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@UseGuards( AuthGuard, RoleGuard)
@Roles(Role.Admin)
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
    async readOne(@ParamId() id: number){
        return this.userService.get(id)
    }

    @Put(':id')
    async update(@Body() data: UpdatePatchUserDTO, @ParamId() id: number){
        return this.userService.update(data, id)
    }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchUserDTO, @ParamId() id: number){
        return this.userService.update(data, id)
    }

    @Delete(':id')
    async delete(@ParamId() id){
        return this.userService.delete(id)
    }
}
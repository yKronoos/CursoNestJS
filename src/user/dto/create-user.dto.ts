import { IsDateString, IsEmail, IsEnum, IsNumber, IsOptional, IsString, IsStrongPassword } from "class-validator"
import { Role } from "../../enums/role.enum"

export class CreateUserDTO{

    @IsString()
    name: string
    @IsEmail()
    email: string

    @IsStrongPassword({
        minLength: 6,
    })
    password: string

    @IsOptional()
    @IsDateString()
    birthAt: string

    @IsOptional()
    @IsEnum(Role)
    role: number
}
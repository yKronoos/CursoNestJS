import { IsEmail, IsStrongPassword } from "class-validator"

export class AuthForgetDTO{

    @IsEmail()
    email: string
}
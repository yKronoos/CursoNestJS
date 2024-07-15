import { IsEmail, IsJWT, IsStrongPassword } from "class-validator"

export class AuthResetDTO{

    @IsStrongPassword({
        minLength:6
    })
    passwoord: string

    @IsJWT()
    token: string
}
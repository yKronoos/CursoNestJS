import { AuthForgetDTO } from "../auth/dto/auth-forget.dto";
import { AuthLoginDTO } from "../auth/dto/auth-login.dto";
import { AuthResetDTO } from "../auth/dto/auth-reset.dto";
import { Role } from "../enums/role.enum";
import { CreateUserDTO } from "../user/dto/create-user.dto";
import { resetToken } from "./resetToken.moock";

export const authResetDTO: AuthResetDTO  = {
    password: 'ABa@1234567',
    token: resetToken
}
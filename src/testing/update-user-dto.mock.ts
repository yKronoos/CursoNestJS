import { Role } from "../enums/role.enum";
import { CreateUserDTO } from "../user/dto/create-user.dto";
import { UpdatePatchUserDTO } from "../user/dto/update-patch-user.dto";

export const updateUserDTO: UpdatePatchUserDTO = {
    role: Role.Admin
}
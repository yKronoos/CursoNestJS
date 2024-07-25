import { Role } from '../enums/role.enum';
import { UpdatePatchUserDTO } from '../user/dto/update-patch-user.dto';

export const updateUserDTO: UpdatePatchUserDTO = {
  role: Role.Admin,
};

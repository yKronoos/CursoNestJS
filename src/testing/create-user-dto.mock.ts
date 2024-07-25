import { Role } from '../enums/role.enum';
import { CreateUserDTO } from '../user/dto/create-user.dto';

export const createUserDTO: CreateUserDTO = {
  birthAt: '2000-01-01',
  email: 'test@gmail.com',
  name: 'Nani',
  password: 'Aa@1234567',
  role: Role.User,
};

import { AuthResetDTO } from '../auth/dto/auth-reset.dto';
import { resetToken } from './resetToken.moock';

export const authResetDTO: AuthResetDTO = {
  password: 'ABa@1234567',
  token: resetToken,
};

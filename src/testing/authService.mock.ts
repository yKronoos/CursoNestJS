import { AuthService } from '../auth/auth.service';
import { accessToken } from './accessToken.mock';
import { jwtPayload } from './jwtPayload.mock';

export const authServiceMock = {
  provide: AuthService,
  useValue: {
    createToken: jest.fn().mockReturnValue({ accessToken }),
    checkToken: jest.fn().mockReturnValue(jwtPayload),
    isInvalidToken: jest.fn().mockReturnValue(true),
    login: jest.fn().mockResolvedValue({ accessToken }),
    forget: jest.fn().mockResolvedValue({ success: true }),
    reset: jest.fn().mockResolvedValue({ accessToken }),
    register: jest.fn().mockResolvedValue({ accessToken }),
  },
};

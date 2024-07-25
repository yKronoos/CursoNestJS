import { userEntityList } from './userEntity-list.mock';
import { UserService } from '../user/user.service';

export const userServiceMock = {
  provide: UserService,
  useValue: {
    create: jest.fn().mockResolvedValue(userEntityList[0]),
    get: jest.fn().mockResolvedValue(userEntityList[0]),
    getAll: jest.fn().mockResolvedValue(userEntityList),
    update: jest.fn().mockResolvedValue(userEntityList[0]),
    delete: jest.fn().mockResolvedValue(true),
    exists: jest.fn().mockResolvedValue(true),
  },
};

import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { userServiceMock } from '../testing/userService.mock';
import { AuthGuard } from '../guards/auth.guard';
import { guardMock } from '../testing/guard.mock';
import { RoleGuard } from '../guards/role.guard';
import { UserService } from './user.service';
import { createUserDTO } from '../testing/create-user-dto.mock';
import { userEntityList } from '../testing/userEntity-list.mock';
import { updateUserDTO } from '../testing/update-user-dto.mock';

describe('userController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [userServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .overrideGuard(RoleGuard)
      .useValue(guardMock)
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  test('Validacao de definicao', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('Teste dos Guards', () => {
    test('Se os guards estao aplicados na ordem certa', () => {
      const guards = Reflect.getMetadata('__guards__', UserController);

      expect(guards.length).toEqual(2);
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
      expect(new guards[1]()).toBeInstanceOf(RoleGuard);
    });
  });

  describe('Create', () => {
    test('method create', async () => {
      const result = await userController.create(createUserDTO);
      expect(result).toEqual(userEntityList[0]);
    });
  });
  describe('Read', () => {
    test('method readOne', async () => {
      const result = await userController.readOne(1);
      expect(result).toEqual(userEntityList[0]);
    });
    test('method read', async () => {
      const result = await userController.read();
      expect(result).toEqual(userEntityList);
    });
  });
  describe('Update', () => {
    test('method update', async () => {
      const result = await userController.update(updateUserDTO, 1);
      expect(result).toEqual(userEntityList[0]);
    });
    test('method updatePartial', async () => {
      const result = await userController.updatePartial(updateUserDTO, 1);
      expect(result).toEqual(userEntityList[0]);
    });
  });
  describe('Delete', () => {
    test('method delete', async () => {
      const result = await userController.delete(1);
      expect(result).toEqual({ success: true });
    });
  });
});

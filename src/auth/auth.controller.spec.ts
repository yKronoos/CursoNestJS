import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../guards/auth.guard';
import { guardMock } from '../testing/guard.mock';
import { createUserDTO } from '../testing/create-user-dto.mock';
import { userEntityList } from '../testing/userEntity-list.mock';
import { AuthController } from './auth.controller';
import { authServiceMock } from '../testing/authService.mock';
import { fileServiceMock } from '../testing/fileService.mock';
import { authLoginDTO } from '../testing/auth-login-dto.mock';
import { accessToken } from '../testing/accessToken.mock';
import { authForgetDTO } from '../testing/auth-forget-dto.mock';
import { authResetDTO } from '../testing/auth-reset-dto.mock';
import { getPhotoFunc } from '../testing/getPhotoFunc.mock';

describe('authController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [authServiceMock, fileServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .compile();

    authController = module.get<AuthController>(AuthController);
  });

  test('Validacao de definicao', () => {
    expect(authController).toBeDefined();
  });

  /* describe('Teste dos Guards', () =>{
        test('Se os guards estao aplicados na ordem certa', () => {
            const guards = Reflect.getMetadata('__guards__', UserController)
        
            expect(guards.length).toEqual(2)
            expect(new guards[0]()).toBeInstanceOf(AuthGuard)
            expect(new guards[1]()).toBeInstanceOf(RoleGuard)
        })
    }) */

  describe('Fluxo autenticacao', () => {
    test('method login', async () => {
      const result = await authController.login(authLoginDTO);
      expect(result).toEqual({ accessToken });
    });

    test('method register', async () => {
      const result = await authController.register(createUserDTO);
      expect(result).toEqual({ accessToken });
    });

    test('method forget', async () => {
      const result = await authController.forget(authForgetDTO);
      console.log(result);
      expect(result).toEqual({ success: true });
    });

    test('method reset', async () => {
      const result = await authController.reset(authResetDTO);
      expect(result).toEqual({ accessToken });
    });
  });

  describe('Rotas Autenticadas', () => {
    test('method me', async () => {
      const result = await authController.me(userEntityList[0]);
      expect(result).toEqual(userEntityList[0]);
    });

    test('method uploadPhoto', async () => {
      const photo = await getPhotoFunc();
      const result = await authController.uploadPhoto(userEntityList[0], photo);
      expect(result).toEqual(photo);
    });
  });
});

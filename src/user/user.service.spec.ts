import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { userRepositoryMock } from '../testing/userRepository.mock';
import { userEntityList } from '../testing/userEntity-list.mock';
import { createUserDTO } from '../testing/create-user-dto.mock';
import { updateUserDTO } from '../testing/update-user-dto.mock';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRepositoryMock],
      //controllers: [UserController]
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(UserEntity));
  });

  test('Validar Definicao do UserService', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('Create', () => {
    test('method create', async () => {
      jest.spyOn(userRepository, 'existsBy').mockResolvedValueOnce(false);

      const result = await userService.create(createUserDTO);

      expect(result).toEqual(userEntityList[0]);
    });
  });
  describe('Read', () => {
    test('method getAll', async () => {
      const result = await userService.getAll();

      expect(result).toEqual(userEntityList);
    });
    test('method get', async () => {
      const result = await userService.get(1);

      expect(result).toEqual(userEntityList[0]);
    });
  });
  describe('Update', () => {
    test('method update', async () => {
      const result = await userService.update(updateUserDTO, 1);

      expect(result).toEqual(userEntityList[0]);
    });
  });
  describe('Delete', () => {
    test('method delete', async () => {
      const result = await userService.delete(1);

      expect(result).toEqual(true);
    });
  });
});

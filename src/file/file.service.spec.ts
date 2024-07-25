import { getPhotoFunc } from '../testing/getPhotoFunc.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from './file.service';

describe('FileService', () => {
  let fileService: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileService],
    }).compile();

    fileService = module.get<FileService>(FileService);
  });

  test('Testando definicao', () => {
    expect(fileService).toBeDefined();
  });

  describe('Test fileService', () => {
    test('method upload', async () => {
      const file = await getPhotoFunc();
      const filename = 'photo-test.png';
      fileService.upload(file, filename);

      expect(fileService).toBeDefined();
    });
  });
});

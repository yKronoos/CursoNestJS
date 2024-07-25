import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { createUserDTO } from '../src/testing/create-user-dto.mock';
import { Role } from '../src/enums/role.enum';
import dataSource from '../typeorm/data-source';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let userId: number;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('Registrar novo usuario', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(createUserDTO);

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.accessToken).toEqual('string');
  });

  it('Tentar fazer login com novo usuario', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: createUserDTO.email,
        password: createUserDTO.password,
      });

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.accessToken).toEqual('string');
    accessToken = response.body.accessToken;
  });

  it('Obter dados do usuario', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/me')
      .set('Authorization', `bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.id).toEqual('number');
    expect(response.body.role).toEqual(Role.User);

    userId = response.body.id;
  });

  it('Registrar novo usuario admin', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ ...createUserDTO, role: Role.Admin, email: 'lolo@gmail.com' });

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.accessToken).toEqual('string');
    accessToken = response.body.accessToken;
  });

  it('Verificar se o novo user e User', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/me')
      .set('Authorization', `bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.id).toEqual('number');
    expect(response.body.role).toEqual(Role.User);

    userId = response.body.id;
  });

  it('Tentar ver todos os users', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(403);
    expect(response.body.error).toEqual('Forbidden');
  });

  it('Alterando user para admin', async () => {
    const ds = await dataSource.initialize();
    const queryRunner = ds.createQueryRunner();

    await queryRunner.query(`
        UPDATE users SET role = ${Role.Admin} WHERE id = ${userId}
      `);

    const rows = await queryRunner.query(`
        SELECT * FROM users WHERE id = ${userId}
      `);

    ds.destroy();

    expect(rows.length).toEqual(1);
    expect(rows[0].role).toEqual(Role.Admin);
  });

  it('Tentar ver todos os users, agora como admin', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.length).toEqual(2);
  });
});

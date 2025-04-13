import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { UsersModule } from './../../src/users/users.module';
import { TypeOrmModuleDefine } from './../../src/app.module';
import { CreateUserDto } from './../../src/users/dto/create-user.dto';

describe('UsersController (e2e)', () => {
  let app: INestApplication<App>;
  const users = {
    firstName: 'FirstName #1',
    lastName: 'LastName #1',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModuleDefine, UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(users as CreateUserDto)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(users);
      });
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(
        '{"message":"Cannot GET /api/users","error":"Not Found","statusCode":404}',
      );
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { UsersModule } from './../../src/users/users.module';
import { CreateUserDto } from './../../src/users/dto/create-user.dto';
import { User } from './../../src/users/entities/user.entity';
import { DatabaseModule } from './../../src/databases/database.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication<App>;
  const createUser = {
    firstName: 'FirstName #1',
    lastName: 'LastName #1',
  };
  const user = {
    id: 1,
    firstName: createUser.firstName,
    lastName: createUser.lastName,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    // TODO DBをくらいする処理を追加する
    await app.close();
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(createUser as CreateUserDto)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(user as User);
      });
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer()).get('/users').expect(200).expect([]);
  });
});

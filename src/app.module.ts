import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

export const TypeOrmModuleDefine = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'service_postgres_dfasdfasd',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'db01',
  entities: [User],
  synchronize: true,
});

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '.', 'client'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'service_postgres_dfasdfasd',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'db01',
      entities: [User],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

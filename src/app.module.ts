import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './databases/database.module';

export const TypeOrmModuleDefineTest = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'service_postgres_efasdfasd',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'db01',
  entities: [User],
  synchronize: true,
  dropSchema: true,
});

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '.', 'client'),
    }),
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true, // グローバルモジュールとして設定
      envFilePath: '.env', // カスタムパスを使用する場合は指定
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}

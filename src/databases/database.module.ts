import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_ADMIN_USER'),
          password: configService.get<string>('DB_ADMIN_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'], // エンティティのパス
          namingStrategy: new SnakeNamingStrategy(),
          synchronize: true, // 本番環境ではfalse推奨
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}

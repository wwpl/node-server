import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as dotenv from 'dotenv';
dotenv.config();
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_ADMIN_USER,
  password: process.env.DB_ADMIN_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'], // エンティティのパス
  migrations: [__dirname + '/migrations/*.ts'],
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: false, // 本番環境ではfalse推奨
});

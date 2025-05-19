import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppNoDbModule } from './app-no-db.module';

async function bootstrap() {
  const moduleToLoad =
    process.env.APP_MODULE === 'noDb' ? AppNoDbModule : AppModule;
  const app = await NestFactory.create(moduleToLoad);
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();

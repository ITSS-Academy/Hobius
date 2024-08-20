import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import { HttpExceptionFilter } from './utils/custom_http_exception_filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  admin.initializeApp({
    credential: admin.credential.cert('firebase-admin-key.json'),
  });
  app.enableCors();
  await app.listen(6868);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap()
  .then(() => console.log('Tic Tic Boom!!!'))
  .catch((e) => console.error(e));

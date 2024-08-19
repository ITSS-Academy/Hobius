import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalPipes(new ValidationPipe());
  await app.listen(6868);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap()
  .then(() => console.log('Tic Tic Boom!!!'))
  .catch((e) => console.error(e));

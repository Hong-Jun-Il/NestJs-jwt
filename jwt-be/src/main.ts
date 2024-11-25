import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './all-exception.filter';
// import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapter = app.getHttpAdapter();
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
  // app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(8000);
}
bootstrap();

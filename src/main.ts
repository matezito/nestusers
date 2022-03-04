import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Swagger: https://docs.nestjs.com/openapi/introduction
  const config = new DocumentBuilder()
    .setTitle('Users API Test')
    .setDescription('The Users API Test description')
    .setVersion('1.0')
    .addTag('users')
    .addTag('address')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //https://docs.nestjs.com/techniques/validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(AppModule.port, () => {
    console.log(`Connect to ${AppModule.port}`);
  });
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      // const result = errors.map(error => ({
      //   property: error.property,
      //   message: error.constraints[Object.keys(error.constraints)[0]],
      // }));
      const error = errors[0];
      const message = error.constraints[Object.keys(error.constraints)[0]]

      return new BadRequestException(message);
    },
    stopAtFirstError: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);

}
bootstrap();

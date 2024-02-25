import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import config from './config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser(config().auth.cookie.secret));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const documentationConfig = new DocumentBuilder()
    .setTitle('Reservation API')
    .addCookieAuth(config().auth.cookie.name)
    .setDescription('Reservation API')
    .setVersion('1=0.1')
    .addTag('reservation')
    .addTag('amenity')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, documentationConfig);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(config().port);
}

bootstrap().catch((error) => {
  throw error;
});

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { ValidationPipe, HttpStatus, INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    }),
  );
  app.enableVersioning();
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );

  setupOpenApi(app);
  const port = process.env.PORT || 3000;

  await app.listen(port);
}
bootstrap();

function setupOpenApi(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Blink NestJS Boilerplate')
    .setDescription('This API is just an example case')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('openApi', app, document, { useGlobalPrefix: true });
}

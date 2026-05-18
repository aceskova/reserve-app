import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use(cookieParser());

  const corsOrigins = process.env.CORS_ORIGINS?.split(',').map((origin) =>
    origin.trim(),
  );

  app.enableCors({
    origin: corsOrigins,
    credentials: true,
  });

  app.setGlobalPrefix('v1');

  const config = new DocumentBuilder()
    .setTitle('Reserve App API')
    .setDescription('API for the Reserve app')
    .setVersion('1.0')
    .addBearerAuth()
    .addCookieAuth('accessToken', undefined, 'accessTokenCookie')
    .addTag('reserve')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();

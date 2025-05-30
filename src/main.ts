import * as express from 'express';
import * as cors from 'cors';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { toNodeHandler } from 'better-auth/node';
import { ExpressAdapter } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { auth } from './shared/auth/auth';
import { db } from './shared/db/db';

import * as dotenv from 'dotenv';
import { AppErrorExceptionFilter } from './shared/@nest/filters/app-error.exception-filter';
dotenv.config();

async function bootstrap() {
  const adapter = express();

  adapter.use(
    cors({
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    }),
  );
  adapter.all('/api/auth/*', toNodeHandler(auth));

  const app = await NestFactory.create(
    AppModule.register(db),
    new ExpressAdapter(adapter),
  );
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  const config = new DocumentBuilder().build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new AppErrorExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as passport from 'passport';
import * as session from 'express-session';
import { getRepository } from 'typeorm';
import { TypeormStore } from 'connect-typeorm';

import { TypeORMSession } from 'auth/session';

import { AppModule } from './app.module';
import { customOptions, swaggerConfig } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { credentials: true, origin: process.env.APP_CLIENT_URL },
  });

  const sessionRepository = getRepository(TypeORMSession);
  // delete sessions on app restart
  // sessionRepository.delete({});

  app.setGlobalPrefix('api');
  app.use(
    session({
      cookie: {
        maxAge: 3600000 * 12,
      },
      secret: process.env.APP_COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore().connect(sessionRepository),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, customOptions);

  await app.listen(parseInt(process.env.APP_PORT) || 80);
}
bootstrap();

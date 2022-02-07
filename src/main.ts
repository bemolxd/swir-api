import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import * as passport from 'passport';
import * as session from 'express-session';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.use(
    session({
      cookie: {
        maxAge: 360000 * 24,
      },
      secret: process.env.APP_COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(parseInt(process.env.APP_PORT) || 80);
}
bootstrap();

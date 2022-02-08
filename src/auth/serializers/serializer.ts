import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { DoneFun } from 'auth/types';
import { UserDto } from 'modules/users/application/dto';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor() {
    super();
  }

  serializeUser(user: UserDto, done: DoneFun) {
    done(null, user);
  }

  deserializeUser(user: UserDto, done: DoneFun) {
    done(null, user);
  }
}

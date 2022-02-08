import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { DoneFun } from 'auth/types';
import { User } from 'modules/users/domain';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor() {
    super();
  }

  serializeUser(user: User, done: DoneFun) {
    done(null, user);
  }

  deserializeUser(user: User, done: DoneFun) {
    done(null, user);
  }
}

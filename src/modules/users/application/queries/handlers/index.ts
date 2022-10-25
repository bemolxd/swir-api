import { GetAdminsHandler } from './get-admins.handler';
import { GetUserHandler } from './get-user.handler';
import { GetUsersHandler } from './get-users.handler';

export const QueryHandlers = [
  GetUsersHandler,
  GetUserHandler,
  GetAdminsHandler,
];

import { Controller, Get } from '@nestjs/common';

import { UserService } from '../../services/user.service';

@Controller()
export class GetUsersController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  async getAllUsers() {
    const users = this.userService.getAllUsers();

    return users;
  }
}

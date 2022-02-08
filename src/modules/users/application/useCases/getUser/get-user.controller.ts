import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '../../services';

@Controller()
export class GetUserController {
  constructor(private readonly userService: UserService) {}

  @Get('users/:userId')
  async getUserById(@Param('userId') userId: string) {
    const user = this.userService.getUserById({ userId });

    return user;
  }
}

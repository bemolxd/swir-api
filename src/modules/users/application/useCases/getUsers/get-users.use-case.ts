import { InjectRepository } from '@nestjs/typeorm';
import { UseCase } from 'shared/core';

import { UserRepository, UserMap } from 'modules/users/adapter';
import { UserDto } from '../../dto';

export class GetUsersUseCase implements UseCase<undefined, Promise<UserDto[]>> {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async execute(): Promise<UserDto[]> {
    const users = await this.userRepository.getAllUsers();

    return UserMap.toDtoBulk(users);
  }
}

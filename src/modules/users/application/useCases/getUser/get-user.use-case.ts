import { InjectRepository } from '@nestjs/typeorm';
import { UseCase } from 'shared/core';

import { GetUserDto } from './get-user.dto';
import { UserMap, UserRepository } from 'modules/users/adapter';
import { UserDto } from '../../dto';

export class GetUserUseCase implements UseCase<GetUserDto, Promise<UserDto>> {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async execute({ userId }: GetUserDto): Promise<UserDto> {
    const user = await this.userRepository.getUserById(userId);

    return UserMap.toDto(user);
  }
}

import { InjectRepository } from '@nestjs/typeorm';
import { UseCase } from 'shared/core';

import { UserMap, UserRepository } from 'modules/users/adapter';

import { GetUserDto } from './get-user.dto';
import { UserDto } from '../../dto';
import { GetUserErrors } from './get-user.errors';

export type GetUserResponse = UserDto | GetUserErrors.UserNotFoundError;

export class GetUserUseCase
  implements UseCase<GetUserDto, Promise<GetUserResponse>>
{
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async execute({ userId }: GetUserDto): Promise<GetUserResponse> {
    try {
      const user = await this.userRepository.getUserById(userId);

      return UserMap.toDto(user);
    } catch (error) {
      return new GetUserErrors.UserNotFoundError(userId);
    }
  }
}

import { InjectRepository } from '@nestjs/typeorm';

import { UseCase } from 'shared/core';

import { UserMap, UserRepository } from 'modules/users/adapter';
import { ContextType } from 'modules/users/domain/types';
import { User } from 'modules/users/domain';

import { CreateUserDto } from './signup-user.dto';
import { UserDto } from '../../dto';

// only for auth
export class SignupUserUseCase
  implements UseCase<CreateUserDto, Promise<UserDto>>
{
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async execute(dto: CreateUserDto): Promise<UserDto> {
    const isExistingUser = await this.userRepository.exists(dto.personalNumber);

    if (isExistingUser) {
      const existingUser = await this.userRepository.getUserByPersonalNumber(
        dto.personalNumber,
      );

      return UserMap.toDto(existingUser);
    }

    const newUser = User.create({
      personalNumber: dto.personalNumber,
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      contextType: ContextType.USER,
    });

    await this.userRepository.persist(newUser);

    return UserMap.toDto(newUser);
  }
}

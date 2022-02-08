import { InjectRepository } from '@nestjs/typeorm';

import { UseCase } from 'shared/core';

import { UserRepository } from 'modules/users/adapter';
import { User } from 'modules/users/domain';
import { ContextType } from 'modules/users/domain/types';

import { CreateUserDto } from './signup-user.dto';

// only for auth
export class SignupUserUseCase
  implements UseCase<CreateUserDto, Promise<User>>
{
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async execute(dto: CreateUserDto): Promise<User> {
    const isExistingUser = await this.userRepository.exists(dto.personalNumber);

    if (isExistingUser) {
      return await this.userRepository.getUserByPersonalNumber(
        dto.personalNumber,
      );
    }

    const newUser = User.create({
      personalNumber: dto.personalNumber,
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      contextType: ContextType.USER,
    });

    await this.userRepository.persist(newUser);

    return newUser;
  }
}

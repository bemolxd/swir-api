import { InjectRepository } from '@nestjs/typeorm';
import { UseCase } from 'shared/core';
import { UniqueEntityID } from 'shared/domain';

import { UserRepository } from 'modules/users/adapter';
import { User } from 'modules/users/domain';

import { ChangeRoleDto } from './change-role.dto';
import { ChangeRoleErrors } from './change-role.errors';

export type ChangeRoleResponse = void | ChangeRoleErrors.UserNotFoundError;

export class ChangeRoleUseCase
  implements UseCase<ChangeRoleDto, ChangeRoleResponse>
{
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async execute(dto: ChangeRoleDto): Promise<ChangeRoleResponse> {
    try {
      const user = await this.userRepository.getUserById(dto.userId);

      const updatedUser = User.create(
        {
          personalNumber: user.personalNumber,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          contextType: dto.contextType,
        },
        new UniqueEntityID(dto.userId),
      );

      await this.userRepository.updateUser(updatedUser);
    } catch {
      return new ChangeRoleErrors.UserNotFoundError(dto.userId);
    }
  }
}

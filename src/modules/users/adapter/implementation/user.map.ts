import { UniqueEntityID } from 'shared/domain';

import { UserEntity } from '../../infrastructure';
import { UserDto } from '../../application/dto';
import { User } from '../../domain';

export class UserMap {
  public static toDtoBulk(users: User[]): UserDto[] {
    return users.map((user) => this.toDto(user));
  }

  public static toDto(user: User): UserDto {
    return {
      userId: user.userId.toString(),
      personalNumber: user.personalNumber,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      contextType: user.contextType,
    };
  }

  public static toDomain(entity: UserEntity): User {
    return User.create(
      {
        personalNumber: entity.personal_number,
        firstName: entity.first_name,
        lastName: entity.last_name,
        email: entity.email,
        contextType: entity.context_type,
      },
      new UniqueEntityID(entity.user_id),
    );
  }

  public static toPersistance(user: User): Partial<UserEntity> {
    return {
      user_id: user.userId.toString(),
      personal_number: user.personalNumber,
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      context_type: user.contextType,
    };
  }
}

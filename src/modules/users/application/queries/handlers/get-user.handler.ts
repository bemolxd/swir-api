import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetUserUseCase } from '../../useCases/getUser';
import { GetUserQuery } from '../implementations/get-user.query';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler {
  constructor(private getUserUseCase: GetUserUseCase) {}

  async execute({ getUserDto }: GetUserQuery) {
    return await this.getUserUseCase.execute(getUserDto);
  }
}

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetUsersUseCase } from '../../useCases/getUsers';
import { GetUsersQuery } from '../implementations';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler {
  constructor(private getUsersUseCase: GetUsersUseCase) {}

  async execute({ params }: GetUsersQuery) {
    return await this.getUsersUseCase.execute(params);
  }
}

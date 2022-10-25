import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserArchivedOrdersUseCase } from '../../useCases/getUserArchivedOrders';
import { GetUserArchivedOrdersQuery } from '../implementations';

@QueryHandler(GetUserArchivedOrdersQuery)
export class GetUserArchivedOrdersHandler implements IQueryHandler {
  constructor(
    private getUserArchivedOrdersUseCase: GetUserArchivedOrdersUseCase,
  ) {}

  async execute({ params }: GetUserArchivedOrdersQuery) {
    return await this.getUserArchivedOrdersUseCase.execute(params);
  }
}

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetArchivedOrdersUseCase } from '../../useCases/getArchivedOrders';
import { GetArchivedOrdersQuery } from '../implementations';

@QueryHandler(GetArchivedOrdersQuery)
export class GetArchivedOrdersHandler implements IQueryHandler {
  constructor(private getArchivedOrdersUseCase: GetArchivedOrdersUseCase) {}

  async execute({ params }: GetArchivedOrdersQuery) {
    return await this.getArchivedOrdersUseCase.execute(params);
  }
}

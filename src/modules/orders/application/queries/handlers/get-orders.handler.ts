import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetOrdersUseCase } from '../../useCases/getOrders';
import { GetOrdersQuery } from '../implementations';

@QueryHandler(GetOrdersQuery)
export class GetOrdersHandler implements IQueryHandler {
  constructor(private getOrdersUseCase: GetOrdersUseCase) {}

  async execute({ params }: GetOrdersQuery) {
    return await this.getOrdersUseCase.execute(params);
  }
}

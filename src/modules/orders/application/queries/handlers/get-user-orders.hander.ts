import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetUserOrdersUseCase } from '../../useCases/getUserOrders/get-user-orders.use-case';
import { GetUserOrdersQuery } from '../implementations';

@QueryHandler(GetUserOrdersQuery)
export class GetUserOrdersHandler implements IQueryHandler {
  constructor(private getUserOrdersUseCase: GetUserOrdersUseCase) {}

  async execute({ params, senderId }: GetUserOrdersQuery): Promise<any> {
    return await this.getUserOrdersUseCase.execute(params, senderId);
  }
}

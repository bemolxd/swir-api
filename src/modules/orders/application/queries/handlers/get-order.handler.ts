import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetOrderUseCase } from '../../useCases/getOrder';
import { GetOrderQuery } from '../implementations';

@QueryHandler(GetOrderQuery)
export class GetOrderHandler implements IQueryHandler {
  constructor(private getOrderUseCase: GetOrderUseCase) {}

  async execute({ getOrderDto }: GetOrderQuery) {
    return await this.getOrderUseCase.execute(getOrderDto);
  }
}

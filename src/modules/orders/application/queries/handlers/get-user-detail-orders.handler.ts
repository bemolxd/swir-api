import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserDetailOrdersUseCase } from '../../useCases/getUserDetailOrders';
import { GetUserDetailOrdersQuery } from '../implementations';

@QueryHandler(GetUserDetailOrdersQuery)
export class GetUserDetailOrdersHandler implements IQueryHandler {
  constructor(private getUserDetailOrdersUseCase: GetUserDetailOrdersUseCase) {}

  async execute({ params }: GetUserDetailOrdersQuery) {
    return await this.getUserDetailOrdersUseCase.execute(params);
  }
}

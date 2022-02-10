import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetItemsQuery } from '../implementations';
import { GetItemsUseCase } from '../../useCases/getItems';

@QueryHandler(GetItemsQuery)
export class GetItemsHandler implements IQueryHandler {
  constructor(private getItemsUseCase: GetItemsUseCase) {}

  async execute() {
    return await this.getItemsUseCase.execute();
  }
}

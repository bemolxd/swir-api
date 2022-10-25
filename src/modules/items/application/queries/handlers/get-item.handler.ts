import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetItemUseCase } from '../../useCases/getItem';
import { GetItemQuery } from '../implementations';

@QueryHandler(GetItemQuery)
export class GetItemHandler implements IQueryHandler {
  constructor(private getItemUseCase: GetItemUseCase) {}

  async execute({ getItemDto }: GetItemQuery) {
    return await this.getItemUseCase.execute(getItemDto);
  }
}

import { CreateItemDto } from '../../useCases/createItem';

export class CreateItemCommand {
  constructor(public readonly createItemDto: CreateItemDto) {}
}

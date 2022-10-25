import { RemoveItemDto } from '../../useCases/removeItem';

export class RemoveItemCommand {
  constructor(public readonly removeItemDto: RemoveItemDto) {}
}

import { RemoveItemElementDto } from '../../useCases/removeItemElement';

export class RemoveItemElementCommand {
  constructor(
    public readonly removeItemElementDto: RemoveItemElementDto,
    public readonly orderId: string,
  ) {}
}

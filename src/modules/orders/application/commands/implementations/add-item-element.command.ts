import { AddItemElementDto } from '../../useCases/addItemElement';

export class AddItemElementCommand {
  constructor(
    public readonly addItemElementDto: AddItemElementDto,
    public readonly orderId: string,
  ) {}
}

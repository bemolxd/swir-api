import { UpdateItemDto } from '../../useCases/updateItem';

export class UpdateItemCommand {
  constructor(public readonly updateItemDto: UpdateItemDto) {}
}

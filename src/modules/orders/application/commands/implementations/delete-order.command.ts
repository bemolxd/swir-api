import { DeleteOrderDto } from '../../useCases/deleteOrder';

export class DeleteOrderCommand {
  constructor(public readonly deleteOrderDto: DeleteOrderDto) {}
}

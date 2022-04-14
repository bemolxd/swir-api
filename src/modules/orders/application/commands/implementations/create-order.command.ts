import { CreateOrderDto } from '../../useCases/createOrder';

export class CreateOrderCommand {
  constructor(public readonly createOrderDto: CreateOrderDto) {}
}

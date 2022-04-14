import { SubmitOrderDto } from '../../useCases/submitOrder';

export class SubmitOrderCommand {
  constructor(public readonly submitOrderDto: SubmitOrderDto) {}
}

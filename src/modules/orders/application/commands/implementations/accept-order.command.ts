import { AcceptOrderDto } from '../../useCases/acceptOrder';

export class AcceptOrderCommand {
  constructor(public readonly acceptOrderDto: AcceptOrderDto) {}
}

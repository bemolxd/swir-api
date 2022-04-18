import { RejectOrderDto } from '../../useCases/rejectOrder';

export class RejectOrderCommand {
  constructor(public readonly rejectOrderDto: RejectOrderDto) {}
}

import { FinishOrderDto } from '../../useCases/finishOrder';

export class FinishOrderCommand {
  constructor(public readonly finishOrderDto: FinishOrderDto) {}
}

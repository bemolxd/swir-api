import { GetOrderDto } from '../../useCases/getOrder';

export class GetOrderQuery {
  constructor(public readonly getOrderDto: GetOrderDto) {}
}

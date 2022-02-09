import { GetItemDto } from '../../useCases/getItem';

export class GetItemQuery {
  constructor(public readonly getItemDto: GetItemDto) {}
}

import { GetUserDto } from '../../useCases/getUser';

export class GetUserQuery {
  constructor(public readonly getUserDto: GetUserDto) {}
}

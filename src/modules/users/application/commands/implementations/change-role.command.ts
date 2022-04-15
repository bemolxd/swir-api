import { ChangeRoleDto } from '../../useCases/changeRole';

export class ChangeRoleCommand {
  constructor(public readonly changeRoleDto: ChangeRoleDto) {}
}

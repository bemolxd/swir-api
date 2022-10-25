import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetAdminsUseCase } from '../../useCases/getAdmins';
import { GetAdminsQuery } from '../implementations';

@QueryHandler(GetAdminsQuery)
export class GetAdminsHandler implements IQueryHandler {
  constructor(private getAdminsUseCase: GetAdminsUseCase) {}

  async execute() {
    return await this.getAdminsUseCase.execute();
  }
}

import { EntityRepository, Repository } from 'typeorm';

import { TypeORMSession } from './Session.entity';

@EntityRepository(TypeORMSession)
export class SessionRepository extends Repository<TypeORMSession> {}

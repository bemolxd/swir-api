import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ContextType } from 'modules/users/domain/types';

import { CONTEXT_TYPES_KEY } from './context-type.decorator';

@Injectable()
export class ContextTypeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredContextTypes = this.reflector.getAllAndOverride<
      ContextType[]
    >(CONTEXT_TYPES_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredContextTypes) return true;

    const { user } = context.switchToHttp().getRequest();

    if (!requiredContextTypes.some((reqCtx) => user.contextType === reqCtx)) {
      throw new ForbiddenException();
    }

    return true;
  }
}

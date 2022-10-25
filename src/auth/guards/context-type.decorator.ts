import { SetMetadata } from '@nestjs/common';
import { ContextType } from 'modules/users/domain/types';

export const CONTEXT_TYPES_KEY = 'context_types';
export const ContextTypes = (...contextTypes: ContextType[]) =>
  SetMetadata(CONTEXT_TYPES_KEY, contextTypes);

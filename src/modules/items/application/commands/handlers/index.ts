import { CreateItemHandler } from './create-item.handler';
import { RemoveItemHandler } from './remove-item.handler';
import { UpdateItemHandler } from './update-item.handler';

export const CommandHandlers = [
  CreateItemHandler,
  UpdateItemHandler,
  RemoveItemHandler,
];

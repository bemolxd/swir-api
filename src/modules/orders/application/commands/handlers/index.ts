import { AcceptOrderHandler } from './accept-order.handler';
import { AddItemElementHandler } from './add-item-element.handler';
import { CreateOrderHandler } from './create-order.handler';
import { DeleteOrderHandler } from './delete-order.handler';
import { FinishOrderHandler } from './finish-order.handler';
import { RejectOrderHandler } from './reject-order.handler';
import { RemoveItemElementHandler } from './remove-item-element.handler';
import { SubmitOrderHandler } from './submit-order.handler';

export const CommandHandlers = [
  CreateOrderHandler,
  AddItemElementHandler,
  RemoveItemElementHandler,
  DeleteOrderHandler,
  SubmitOrderHandler,
  RejectOrderHandler,
  AcceptOrderHandler,
  FinishOrderHandler,
];

import { AcceptOrderController, AcceptOrderUseCase } from './acceptOrder';
import {
  AddItemElementController,
  AddItemElementUseCase,
} from './addItemElement';
import { CreateOrderController, CreateOrderUseCase } from './createOrder';
import { DeleteOrderController, DeleteOrderUseCase } from './deleteOrder';
import { FinishOrderController, FinishOrderUseCase } from './finishOrder';
import {
  GetArchivedOrdersController,
  GetArchivedOrdersUseCase,
} from './getArchivedOrders';
import { GetOrderController, GetOrderUseCase } from './getOrder';
import { GetOrdersController, GetOrdersUseCase } from './getOrders';
import {
  GetUserArchivedOrdersController,
  GetUserArchivedOrdersUseCase,
} from './getUserArchivedOrders';
import {
  GetUserDetailOrdersController,
  GetUserDetailOrdersUseCase,
} from './getUserDetailOrders';
import { GetUserOrdersController, GetUserOrdersUseCase } from './getUserOrders';
import { RejectOrderController, RejectOrderUseCase } from './rejectOrder';
import {
  RemoveItemElementController,
  RemoveItemElementUseCase,
} from './removeItemElement';
import { SubmitOrderController, SubmitOrderUseCase } from './submitOrder';

export const OrderControllers = [
  GetOrdersController,
  GetOrderController,
  CreateOrderController,
  GetUserOrdersController,
  AddItemElementController,
  RemoveItemElementController,
  DeleteOrderController,
  SubmitOrderController,
  RejectOrderController,
  AcceptOrderController,
  FinishOrderController,
  GetArchivedOrdersController,
  GetUserDetailOrdersController,
  GetUserArchivedOrdersController,
];
export const OrderUseCases = [
  GetOrdersUseCase,
  GetOrderUseCase,
  CreateOrderUseCase,
  GetUserOrdersUseCase,
  AddItemElementUseCase,
  RemoveItemElementUseCase,
  DeleteOrderUseCase,
  SubmitOrderUseCase,
  RejectOrderUseCase,
  AcceptOrderUseCase,
  FinishOrderUseCase,
  GetArchivedOrdersUseCase,
  GetUserDetailOrdersUseCase,
  GetUserArchivedOrdersUseCase,
];

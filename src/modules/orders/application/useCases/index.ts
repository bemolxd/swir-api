import { AcceptOrderController, AcceptOrderUseCase } from './acceptOrder';
import {
  AddItemElementController,
  AddItemElementUseCase,
} from './addItemElement';
import { CreateOrderController, CreateOrderUseCase } from './createOrder';
import { DeleteOrderController, DeleteOrderUseCase } from './deleteOrder';
import { GetOrderController, GetOrderUseCase } from './getOrder';
import { GetOrdersController, GetOrdersUseCase } from './getOrders';
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
];

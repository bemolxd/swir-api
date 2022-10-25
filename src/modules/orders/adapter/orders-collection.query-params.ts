import { QueryParams } from 'shared/core';

export interface OrdersCollectionQueryParams extends QueryParams {
  senderId?: string;
  techId?: string;
}

import { Meta } from './Meta';

export interface QueryListResult<TCollection> {
  collection: TCollection[];
  meta: Meta;
}

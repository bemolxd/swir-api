import { BaseEntity, Repository } from 'typeorm';

interface PaginationProps {
  limit?: number;
  offset?: number;
}

type Order = 'ASC' | 'DESC';

export class BaseRepository<
  TEntity extends BaseEntity,
> extends Repository<TEntity> {
  protected createPaginatedQueryBuilder = (
    alias: string,
    { limit, offset }: PaginationProps,
  ) => {
    const parsedLimit = Number(limit);
    const parsedOffset = Number(offset);

    return this.createQueryBuilder(alias)
      .take(Number.isFinite(parsedLimit) ? parsedLimit : 10)
      .skip(Number.isFinite(parsedOffset) ? parsedOffset : 0);
  };

  protected extractOrder = (orderKey: string) => {
    const order = orderKey.charAt[0] === '-' ? 'DESC' : 'ASC';
    const sort = order === 'DESC' ? orderKey.substring(1) : orderKey;

    return [sort, order] as [string, Order];
  };
}

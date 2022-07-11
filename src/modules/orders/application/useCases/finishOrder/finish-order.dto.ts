export class FinishOrderDto {
  orderId: string;
  techComment: string | null;
}

export class FinishOrderBodyDto {
  techComment: string | null;
}

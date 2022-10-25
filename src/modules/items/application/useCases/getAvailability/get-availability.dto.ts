export class GetAvailabilityDto {
  itemId: string;
}

export class ItemAvailabilityDto {
  itemId: string;
  isNowAvailable: boolean;
  availableNowCount: number;
  occupiedDates: OccupiedDate[];
}

export type OccupiedDate = {
  dateFrom: string;
  dateTo: string;
  occupiedQuantity: number;
  orderDoc: string;
  techId: string;
  isOutOfBounds?: boolean;
};

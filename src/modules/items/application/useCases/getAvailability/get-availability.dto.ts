import { ApiProperty } from '@nestjs/swagger';

export class OccupiedDate {
  @ApiProperty()
  dateFrom: string;
  @ApiProperty()
  dateTo: string;
  @ApiProperty()
  occupiedQuantity: number;
  @ApiProperty()
  orderDoc: string;
  @ApiProperty()
  techId: string;
  @ApiProperty({ required: false })
  isOutOfBounds?: boolean;
}

export class ItemAvailabilityDto {
  @ApiProperty()
  itemId: string;
  @ApiProperty()
  isNowAvailable: boolean;
  @ApiProperty()
  availableNowCount: number;
  @ApiProperty({ type: [OccupiedDate] })
  occupiedDates: OccupiedDate[];
}

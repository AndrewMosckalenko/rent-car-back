import { ApiProperty } from '@nestjs/swagger';

export class CreateRentSessionDTO {
  @ApiProperty()
  rentStartDate: string;
  @ApiProperty()
  rentEndDate: string;
  @ApiProperty()
  rentCost?: number;
  @ApiProperty()
  carId: number;
}

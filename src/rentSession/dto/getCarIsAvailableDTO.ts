import { ApiProperty } from '@nestjs/swagger';

export class GetCarIsAvailableDTO {
  @ApiProperty()
  dateStartPeriod: string;
  @ApiProperty()
  dateEndPeriod: string;
  @ApiProperty()
  carId: number;
}

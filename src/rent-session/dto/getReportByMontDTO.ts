import { ApiProperty } from '@nestjs/swagger';

export class GetReportByMontDTO {
  @ApiProperty()
  month: number;
  @ApiProperty()
  year: number;
}

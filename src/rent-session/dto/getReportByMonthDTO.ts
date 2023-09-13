import { ApiProperty } from '@nestjs/swagger';

export class GetReportByMonthDTO {
  @ApiProperty()
  month: number;
  @ApiProperty()
  year: number;
}

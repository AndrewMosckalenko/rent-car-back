import { ApiProperty } from '@nestjs/swagger';

export class GetReportAboutCarUsageDTO {
  @ApiProperty()
  dateStartPeriod: string;
  @ApiProperty()
  dateEndPeriod: string;
}

import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RentSessionService } from './rent-session.service';
import {
  CreateRentSessionDTO,
  GetCarIsAvailableDTO,
  GetReportAboutCarUsageDTO,
  GetReportByMontDTO,
} from './dto';

@ApiTags('Rent sessions')
@Controller('rent-session')
export class RentSessionController {
  constructor(private rentSessionService: RentSessionService) {}

  @Get('/is-available')
  getCarIsAvailable(@Query() query: GetCarIsAvailableDTO) {
    return this.rentSessionService.carIsAvailableInInterval(
      query.carId,
      query.dateStartPeriod,
      query.dateEndPeriod,
    );
  }

  @Get('/cost')
  getRentCost(@Query() query: GetReportAboutCarUsageDTO) {
    return this.rentSessionService.costOfRent(
      query.dateStartPeriod,
      query.dateEndPeriod,
    );
  }

  @Get('/report')
  getReport(@Query() query: GetReportAboutCarUsageDTO) {
    return this.rentSessionService.getReportAboutCarUsage(
      query.dateStartPeriod,
      query.dateEndPeriod,
    );
  }

  @Get('/report-by-month')
  getReportByMonth(@Query() query: GetReportByMontDTO) {
    return this.rentSessionService.getReportAboutCarUsageByMonthAndYear(
      query.month,
      query.year,
    );
  }

  @Post('/')
  postCreateRentCarSession(@Body() createDto: CreateRentSessionDTO) {
    return this.rentSessionService.createRentSession(createDto);
  }
}

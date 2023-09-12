import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RentSessionService } from './rent-session.service';
import {
  CreateRentSessionDTO,
  GetCarIsAvailableDTO,
  GetReportAboutCarUsageDTO,
  GetReportByMontDTO,
} from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Rent sessions')
@Controller('rent-session')
export class RentSessionController {
  constructor(private rentSessionService: RentSessionService) {}

  @Get('/is-available')
  async getCarIsAvailable(@Query() query: GetCarIsAvailableDTO) {
    const response = await this.rentSessionService.carIsAvailableInInterval(
      query.carId,
      query.dateStartPeriod,
      query.dateEndPeriod,
    );
    return response;
  }

  @Get('/cost')
  async getRentCost(@Query() query: GetReportAboutCarUsageDTO) {
    const response = await this.rentSessionService.costOfRent(
      query.dateStartPeriod,
      query.dateEndPeriod,
    );
    return response;
  }

  @Get('/report')
  async getReport(@Query() query: GetReportAboutCarUsageDTO) {
    const response = await this.rentSessionService.getReportAboutCarUsage(
      query.dateStartPeriod,
      query.dateEndPeriod,
    );
    return response;
  }

  @Get('/report-by-month')
  async getReportByMonth(@Query() query: GetReportByMontDTO) {
    const response =
      await this.rentSessionService.getReportAboutCarUsageByMonthAndYear(
        query.month,
        query.year,
      );
    return response;
  }

  @Post('/')
  async postCreateRentCarSession(@Body() createDto: CreateRentSessionDTO) {
    const response = await this.rentSessionService.createRentSession(createDto);
    return response;
  }
}

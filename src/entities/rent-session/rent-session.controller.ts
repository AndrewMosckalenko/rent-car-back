import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RentSessionService } from './rent-session.service';

@Controller('rent-session')
export class RentSessionController {
  constructor(private rentSessionService: RentSessionService) {}

  @Get('/')
  async helloRent() {
    return 'Hello rent controller';
  }

  @Get('/is-available/:car_id')
  async getCarIsAvailable(@Query() query) {
    const response = await this.rentSessionService.carIsAvailableInInterval(
      query.carId,
      query.dateStart,
      query.dateEnd,
    );
    return response;
  }

  @Get('/cost')
  async getRentCost(@Query() query) {
    const response = await this.rentSessionService.costOfRent(
      query.rentStart,
      query.rentEnd,
    );
    return response;
  }

  @Get('/report')
  async getReport() {
    return 'Hello rent controller';
  }

  @Post('/')
  async postCreateRentCarSession(@Body() { carId, dateStart, dateEnd }) {
    const response = await this.rentSessionService.createRentSession(
      carId,
      dateStart,
      dateEnd,
    );
    return response;
  }
}

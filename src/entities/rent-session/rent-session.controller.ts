import { Controller, Get, Post } from '@nestjs/common';

@Controller('rent-session')
export class RentSessionController {
  @Get('/')
  async helloRent() {
    return 'Hello rent controller';
  }

  @Get('/is-available/:car_id')
  async getCarIsAvailable() {
    return 'Hello rent controller';
  }

  @Get('/cost')
  async getRentCost() {
    return 'Hello rent controller';
  }

  @Get('/report')
  async getReport() {
    return 'Hello rent controller';
  }

  @Post('/')
  async postCreateRentCarSession() {
    return 'Hello rent controller';
  }
}

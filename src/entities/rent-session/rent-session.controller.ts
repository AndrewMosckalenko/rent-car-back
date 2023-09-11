import { Controller, Get } from '@nestjs/common';

@Controller('rent-session')
export class RentSessionController {
  @Get('/')
  async helloRent() {
    return 'Hello rent controller';
  }
}

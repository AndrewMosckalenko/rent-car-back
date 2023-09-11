import { Module } from '@nestjs/common';
import { RentSessionService } from './rent-session.service';
import { RentSessionController } from './rent-session.controller';

@Module({
  providers: [RentSessionService],
  controllers: [RentSessionController]
})
export class RentSessionModule {}

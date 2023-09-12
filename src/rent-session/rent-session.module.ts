import { Module } from '@nestjs/common';
import { RentSessionService } from './rent-session.service';
import { RentSessionController } from './rent-session.controller';
import { PostgresManagerModule } from 'src/postgres-manager/postgres-manager.module';

@Module({
  imports: [PostgresManagerModule],
  providers: [RentSessionService],
  controllers: [RentSessionController],
})
export class RentSessionModule {}

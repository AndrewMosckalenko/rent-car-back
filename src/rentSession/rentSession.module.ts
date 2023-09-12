import { Module } from '@nestjs/common';
import { RentSessionService } from './rentSession.service';
import { RentSessionController } from './rentSession.controller';
import { PostgresManagerModule } from 'src/postgresManager/postgresManager.module';

@Module({
  imports: [PostgresManagerModule],
  providers: [RentSessionService],
  controllers: [RentSessionController],
})
export class RentSessionModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RentSessionModule } from './rentSession/rentSession.module';
import { PostgresManagerModule } from './postgresManager/postgresManager.module';

@Module({
  imports: [RentSessionModule, PostgresManagerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

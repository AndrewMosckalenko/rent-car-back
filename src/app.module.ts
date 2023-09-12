import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RentSessionModule } from './rent-session/rent-session.module';
import { PostgresManagerModule } from './postgres-manager/postgres-manager.module';

@Module({
  imports: [RentSessionModule, PostgresManagerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

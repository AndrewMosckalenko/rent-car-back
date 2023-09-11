import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RentSessionModule } from './entities/rent-session/rent-session.module';

@Module({
  imports: [RentSessionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { PostgresManagerService } from './postgres-manager.service';

@Module({
  providers: [PostgresManagerService],
})
export class PostgresManagerModule {}

import { Module } from '@nestjs/common';
import { PostgresManagerService } from './postgres-manager.service';

@Module({
  providers: [PostgresManagerService],
  exports: [PostgresManagerService],
})
export class PostgresManagerModule {}

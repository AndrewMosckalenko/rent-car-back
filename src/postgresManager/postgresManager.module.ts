import { Module } from '@nestjs/common';
import { PostgresManagerService } from './postgresManager.service';

@Module({
  providers: [PostgresManagerService],
  exports: [PostgresManagerService],
})
export class PostgresManagerModule {}

import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import postgresConfig from 'src/postgresConfig';

@Injectable()
export class PostgresManagerService {
  async createQuery(query: string) {
    try {
      const pool = new Pool(postgresConfig);
      await pool.connect();
      const res = await pool.query(query);
      return res;
    } catch (e) {
      throw e;
    }
  }
}

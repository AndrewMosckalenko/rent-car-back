import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import postgresConfig from 'src/postgresConfig';
import { createRentSessionQueryCreator } from 'utils/queryCreators';

@Injectable()
export class PostgresManagerService {
  async createQuery(query: string) {
    try {
      const pool = new Pool(postgresConfig);
      await pool.connect();
      await pool.query(query);
      await pool.end();
    } catch (e) {
      throw e;
    }
  }

  async createRentSessionTable() {
    try {
      const query = createRentSessionQueryCreator();
      await this.createQuery(query);
    } catch (e) {
      throw e;
    }
  }

  async initialQuery() {
    try {
      await this.createRentSessionTable();
    } catch (e) {
      throw e;
    }
  }
}

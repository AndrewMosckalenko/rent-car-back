import { Pool } from 'pg';
import { Injectable } from '@nestjs/common';

import postgresConfig from '../../postgresConfig';
import {
  createRentSessionQueryCreator,
  selectCountOfDisturbingRentSessionQueryCreator,
} from '../../../utils/queryCreators';

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

  async carIsAvailable(
    carId: number,
    dateStart: string,
    dateEnd: string,
  ): Promise<boolean> {
    try {
      const res = await this.createQuery(
        selectCountOfDisturbingRentSessionQueryCreator(
          carId,
          dateStart,
          dateEnd,
        ),
      );

      return Number(res.rows?.[0].count) === 0;
    } catch (e) {
      throw e;
    }
  }

  async createRentSession(
    dateStart: string,
    dateEnd: string,
    rentCost: number,
    carId: number,
  ): Promise<boolean> {
    try {
      await this.createQuery(
        createRentSessionQueryCreator(dateStart, dateEnd, rentCost, carId),
      );
      return true;
    } catch (e) {
      throw e;
    }
  }
}

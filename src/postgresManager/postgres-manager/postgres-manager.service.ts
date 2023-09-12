import { Pool } from 'pg';
import { Injectable } from '@nestjs/common';

import postgresConfig from '../../postgresConfig';
import {
  createRentSessionQueryCreator,
  getReportAboutUseCarQueryCreator,
  selectCountOfDisturbingRentSessionQueryCreator,
} from '../../../utils/queryCreators';
import {
  INSET_RENT_SESSION_REQUEST_FAILED_MESSAGE,
  SELECT_CAR_IS_AVAILABLE_REQUEST_FAILED_MESSAGE,
  SELECT_CAR_USAGE_REPORT_REQUEST_FAILED_MESSAGE,
} from '../../consts/errorMessages';

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
      throw new Error(SELECT_CAR_IS_AVAILABLE_REQUEST_FAILED_MESSAGE);
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
      throw new Error(INSET_RENT_SESSION_REQUEST_FAILED_MESSAGE);
    }
  }

  async getReportAboutCarUsing(startPeriodDate: string, endPeriodDate: string) {
    try {
      const res = await this.createQuery(
        getReportAboutUseCarQueryCreator(startPeriodDate, endPeriodDate),
      );
      const report = res.rows.map((row) => ({
        carId: row.carid,
        usage: row.usage,
      }));

      return report;
    } catch (e) {
      throw new Error(SELECT_CAR_USAGE_REPORT_REQUEST_FAILED_MESSAGE);
    }
  }
}

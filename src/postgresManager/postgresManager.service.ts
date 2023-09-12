import { Injectable } from '@nestjs/common';

import {
  createRentSessionQueryCreator,
  getReportAboutUseCarQueryCreator,
  selectCountOfDisturbingRentSessionQueryCreator,
  postgresPool,
} from '../db/postgres';
import {
  INSET_RENT_SESSION_REQUEST_FAILED_MESSAGE,
  SELECT_CAR_IS_AVAILABLE_REQUEST_FAILED_MESSAGE,
  SELECT_CAR_USAGE_REPORT_REQUEST_FAILED_MESSAGE,
} from '../constants';
import { CreateRentSessionDTO } from '../rentSession/dto';

@Injectable()
export class PostgresManagerService {
  async createQuery({ query, values }) {
    try {
      return postgresPool.query(query, values);
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

  async createRentSession(createDTO: CreateRentSessionDTO): Promise<void> {
    try {
      await this.createQuery(createRentSessionQueryCreator(createDTO));
    } catch (e) {
      throw new Error(INSET_RENT_SESSION_REQUEST_FAILED_MESSAGE);
    }
  }

  async getReportAboutCarUsing(startPeriodDate: string, endPeriodDate: string) {
    try {
      const res = await this.createQuery(
        getReportAboutUseCarQueryCreator(startPeriodDate, endPeriodDate),
      );
      return res.rows.map((row) => ({
        carId: row.car_id,
        usage: row.usage,
      }));
    } catch (e) {
      throw new Error(SELECT_CAR_USAGE_REPORT_REQUEST_FAILED_MESSAGE);
    }
  }
}

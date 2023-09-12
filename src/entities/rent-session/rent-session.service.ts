import { Injectable } from '@nestjs/common';

import {
  BASE_COST,
  MAX_RENT_TIME,
  MIN_RENT_TIME,
  TARIF_PLAN,
  WEEKEND,
} from '../../consts/appConfig';
import {
  RENT_SESSION_DIDNT_CREATE_MESSAGE,
  RENT_START_OR_END_IS_WEEKEND_MESSAGE,
  RENT_TIME_IS_INVALID_MESSAGE,
} from '../../consts/errorMessages';
import { PostgresManagerService } from '../../postgresManager/postgres-manager/postgres-manager.service';
import {
  datesDiffInDays,
  getFirstDayOfMonth,
  getLastDayOfMonth,
} from '../../../utils/utils';
import { CreateRentSessionDTO } from './dto/createRentSessionDTO';

@Injectable()
export class RentSessionService {
  constructor(private postgresManagerService: PostgresManagerService) {}

  async costOfRent(dateStart: string, dateEnd: string): Promise<number> {
    try {
      const dayOfStart = new Date(dateStart).getDay();
      const dayOfEnd = new Date(dateEnd).getDay();

      // ошибка если начало или конец аренды выпал на выходной
      if (
        WEEKEND.indexOf(dayOfStart) !== -1 ||
        WEEKEND.indexOf(dayOfEnd) !== -1
      ) {
        throw new Error(RENT_START_OR_END_IS_WEEKEND_MESSAGE);
      }

      let countOfDay = datesDiffInDays(dateEnd, dateStart);

      // ошибка, если срок аренды не правильный
      if (countOfDay > MAX_RENT_TIME || countOfDay < MIN_RENT_TIME) {
        throw new Error(RENT_TIME_IS_INVALID_MESSAGE);
      }

      const cost = TARIF_PLAN.reduce((acc: number, currentTarif) => {
        if (countOfDay < currentTarif.start) {
          return acc;
        }
        if (countOfDay > currentTarif.end) {
          acc += (countOfDay - currentTarif.end) * BASE_COST;
          countOfDay = currentTarif.end;
        }
        acc += (countOfDay - currentTarif.start + 1) * currentTarif.cost;
        countOfDay = currentTarif.start - 1;
        return acc;
      }, 0);

      return cost;
    } catch (e) {
      return NaN;
    }
  }

  async carIsAvailableInInterval(
    carId: number,
    dateStart: string,
    dateEnd: string,
  ) {
    try {
      const isAvailable = await this.postgresManagerService.carIsAvailable(
        carId,
        dateStart,
        dateEnd,
      );
      return isAvailable;
    } catch (e) {
      return false;
    }
  }

  async createRentSession(createDto: CreateRentSessionDTO) {
    try {
      createDto.rentCost = await this.costOfRent(
        createDto.rentStartDate,
        createDto.rentEndDate,
      );

      if (typeof createDto.rentCost !== 'number' || isNaN(createDto.rentCost)) {
        throw new Error(RENT_SESSION_DIDNT_CREATE_MESSAGE);
      }

      if (
        !(await this.carIsAvailableInInterval(
          createDto.carId,
          createDto.rentStartDate,
          createDto.rentEndDate,
        ))
      ) {
        throw new Error(RENT_SESSION_DIDNT_CREATE_MESSAGE);
      }

      const resultOfInsert =
        await this.postgresManagerService.createRentSession(createDto);
      return resultOfInsert;
    } catch (e) {
      return e.message;
    }
  }

  async getReportAboutCarUsage(startPeriodDate: string, endPriodDate: string) {
    try {
      const report = await this.postgresManagerService.getReportAboutCarUsing(
        startPeriodDate,
        endPriodDate,
      );
      return report;
    } catch (e) {
      return e.message;
    }
  }

  async getReportAboutCarUsageByMonthAndYear(month: number, year: number) {
    try {
      const dateStart = getFirstDayOfMonth(month, year);
      const dateEnd = getLastDayOfMonth(month, year);
      console.log(dateStart, dateEnd);
      const report = await this.getReportAboutCarUsage(dateStart, dateEnd);
      return report;
    } catch (e) {
      return e.message;
    }
  }
}

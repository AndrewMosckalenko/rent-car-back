import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { RENT_SESSION_DIDNT_CREATE_MESSAGE } from '../constants';
import { PostgresManagerService } from '../postgres-manager/postgres-manager.service';
import { getFirstDayOfMonth, getLastDayOfMonth, rentCost } from '../utils';
import { CreateRentSessionDTO } from './dto';

@Injectable()
export class RentSessionService {
  constructor(private postgresManagerService: PostgresManagerService) {}

  async costOfRent(dateStart: string, dateEnd: string): Promise<number> {
    try {
      return rentCost(dateStart, dateEnd);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async carIsAvailableInInterval(
    carId: number,
    dateStart: string,
    dateEnd: string,
  ) {
    try {
      return this.postgresManagerService.carIsAvailable(
        carId,
        dateStart,
        dateEnd,
      );
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createRentSession(createDto: CreateRentSessionDTO) {
    try {
      createDto.rentCost = await this.costOfRent(
        createDto.rentStartDate,
        createDto.rentEndDate,
      );

      const carIsAvailable = await this.carIsAvailableInInterval(
        createDto.carId,
        createDto.rentStartDate,
        createDto.rentEndDate,
      );

      if (!carIsAvailable) {
        throw new Error(RENT_SESSION_DIDNT_CREATE_MESSAGE);
      }

      return this.postgresManagerService.createRentSession(createDto);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getReportAboutCarUsage(startPeriodDate: string, endPriodDate: string) {
    try {
      return this.postgresManagerService.getReportAboutCarUsing(
        startPeriodDate,
        endPriodDate,
      );
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getReportAboutCarUsageByMonthAndYear(month: number, year: number) {
    try {
      const dateStart = getFirstDayOfMonth(month, year);
      const dateEnd = getLastDayOfMonth(month, year);

      return this.getReportAboutCarUsage(dateStart, dateEnd);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}

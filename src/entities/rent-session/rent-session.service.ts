import { Injectable } from '@nestjs/common';
import {
  BASE_COST,
  MAX_RENT_TIME,
  MILLISENDS_IN_ONE_DAY,
  MIN_RENT_TIME,
  TARIF_PLAN,
  WEEKEND,
} from 'src/consts/appConfig';
import {
  RENT_SESSION_DIDNT_CREATE_MESSAGE,
  RENT_START_OR_END_IS_WEEKEND_MESSAGE,
  RENT_TIME_IS_INVALID_MESSAGE,
} from 'src/consts/errorMessages';
import { PostgresManagerService } from 'src/postgresManager/postgres-manager/postgres-manager.service';
import { createRentSessionQueryCreator } from 'utils/queryCreators';

@Injectable()
export class RentSessionService {
  constructor(private postgresManagerService: PostgresManagerService) {}

  async costOfRent(
    dateStart: string,
    dateEnd: string,
  ): Promise<number | string> {
    try {
      const dateStartOnDate = new Date(dateStart);
      const dateEndOnDate = new Date(dateEnd);

      const dayOfStart = dateStartOnDate.getDay();
      const dayOfEnd = dateEndOnDate.getDay();

      // ошибка если начало или конец аренды выпал на выходной
      if (
        WEEKEND.indexOf(dayOfStart) !== -1 ||
        WEEKEND.indexOf(dayOfEnd) !== -1
      ) {
        throw new Error(RENT_START_OR_END_IS_WEEKEND_MESSAGE);
      }

      let countOfDay =
        (dateEndOnDate.getTime() - dateStartOnDate.getTime()) /
          MILLISENDS_IN_ONE_DAY +
        1;

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
      return e.message as string;
    }
  }

  async carIsAvailableInInterval(
    carId: number,
    dateStart: string,
    dateEnd: string,
  ) {
    // @todo
    return true;
  }

  async createRentSession(carId: number, dateStart: string, dateEnd: string) {
    try {
      const rentCost = await this.costOfRent(dateStart, dateEnd);

      if (typeof rentCost !== 'number' || isNaN(rentCost)) {
        throw new Error(RENT_SESSION_DIDNT_CREATE_MESSAGE);
      }

      if (!this.carIsAvailableInInterval(carId, dateStart, dateEnd)) {
        throw new Error(RENT_SESSION_DIDNT_CREATE_MESSAGE);
      }

      await this.postgresManagerService.createQuery(
        createRentSessionQueryCreator(dateStart, dateEnd, rentCost, carId),
      );
      return true;
    } catch (e) {
      return e.message;
    }
  }
}

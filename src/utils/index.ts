import {
  RENT_START_OR_END_IS_WEEKEND_MESSAGE,
  RENT_TIME_IS_INVALID_MESSAGE,
  BASE_COST,
  MAX_RENT_TIME,
  MILLISECONDS_IN_ONE_DAY,
  MIN_RENT_TIME,
  TARIF_PLAN,
  WEEKEND,
} from '../constants';

export function datesDiffInDays(date1: string, date2: string) {
  return (
    (new Date(date1).getTime() - new Date(date2).getTime()) /
      MILLISECONDS_IN_ONE_DAY +
    1
  );
}

export function getFirstDayOfMonth(month: number, year: number) {
  return `${month}-01-${year}`;
}

export function getLastDayOfMonth(month: number, year: number) {
  const date = new Date(getFirstDayOfMonth(month, year));

  date.setMonth(date.getMonth() + 1);
  date.setDate(date.getDate() - 1);

  return `${month}-${date.getDate()}-${year}`;
}

export function rentCost(dateStart: string, dateEnd: string) {
  let countOfDay = datesDiffInDays(dateEnd, dateStart);

  validateRentDate(dateStart, dateEnd);

  const cost = TARIF_PLAN.reduce((acc, currentTarif) => {
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
}

export function validateRentDate(dateStart: string, dateEnd: string) {
  const dayOfStart = new Date(dateStart).getDay();
  const dayOfEnd = new Date(dateEnd).getDay();

  const countOfDay = datesDiffInDays(dateEnd, dateStart);

  if (WEEKEND.indexOf(dayOfStart) !== -1 || WEEKEND.indexOf(dayOfEnd) !== -1) {
    throw new Error(RENT_START_OR_END_IS_WEEKEND_MESSAGE);
  }

  if (countOfDay > MAX_RENT_TIME || countOfDay < MIN_RENT_TIME) {
    throw new Error(RENT_TIME_IS_INVALID_MESSAGE);
  }
}

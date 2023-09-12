import { MILLISENDS_IN_ONE_DAY } from '../src/consts/appConfig';

export function datesDiffInDays(date1: string, date2: string) {
  return (
    (new Date(date1).getTime() - new Date(date2).getTime()) /
      MILLISENDS_IN_ONE_DAY +
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

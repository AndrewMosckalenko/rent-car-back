import { BREAK_RENT_TIME } from 'src/consts/appConfig';

export function createRentSessionTableQueryCreator() {
  return `CREATE TABLE IF NOT EXISTS "rentSessions"(
    id SERIAL PRIMARY KEY,
    rentStartDate Date NOT NULL,
    rentEndDate Date NOT NULL,
    rentCost integer NOT NULL DEFAULT 0,
    carId integer NOT NULL
  );`;
}

export function initDBQueryCreator() {
  return `${createRentSessionTableQueryCreator()}`;
}

export function createRentSessionQueryCreator(
  dateStart: string,
  dateEnd: string,
  rentCost: number,
  carId: number,
) {
  return `INSERT INTO "rentSessions"(rentStartDate, rentEndDate, rentCost, carId) VALUES('${dateStart}', '${dateEnd}', ${rentCost}, ${carId});`;
}

export function selectCountOfDisturbingRentSessionQueryCreator(
  carId: number,
  dateStart: string,
  dateEnd: string,
) {
  return `SELECT COUNT(*) FROM "rentSessions" WHERE (id = ${carId} AND ((rentstartdate < Date('${dateStart}') AND Date(rentenddate + ${BREAK_RENT_TIME}) > Date('${dateStart}')) OR (rentstartdate < Date('${dateEnd}') AND Date(rentenddate + ${BREAK_RENT_TIME}) > Date('${dateEnd}')) OR (rentstartdate > Date('${dateStart}') AND Date(rentenddate + ${BREAK_RENT_TIME}) < '${dateEnd}')));`;
}

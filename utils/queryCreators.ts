import { BREAK_RENT_TIME, MILLISENDS_IN_ONE_DAY } from 'src/consts/appConfig';
import { CreateRentSessionDTO } from 'src/entities/rent-session/dto/createRentSessionDTO';

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

export function createRentSessionQueryCreator(createDTO: CreateRentSessionDTO) {
  return `INSERT INTO "rentSessions"(rentStartDate, rentEndDate, rentCost, carId) VALUES('${createDTO.rentStartDate}', '${createDTO.rentEndDate}', ${createDTO.rentCost}, ${createDTO.carId});`;
}

export function selectCountOfDisturbingRentSessionQueryCreator(
  carId: number,
  dateStart: string,
  dateEnd: string,
) {
  return `SELECT COUNT(*) FROM "rentSessions" WHERE (id = ${carId} AND ((rentstartdate < Date('${dateStart}') AND Date(rentenddate + ${BREAK_RENT_TIME}) > Date('${dateStart}')) OR (rentstartdate < Date('${dateEnd}') AND Date(rentenddate + ${BREAK_RENT_TIME}) > Date('${dateEnd}')) OR (rentstartdate > Date('${dateStart}') AND Date(rentenddate + ${BREAK_RENT_TIME}) < '${dateEnd}')));`;
}

export function getReportAboutUseCarQueryCreator(
  startPeriodDate: string,
  endPeriodDate: string,
) {
  const dayCount =
    (new Date(endPeriodDate).getTime() - new Date(startPeriodDate).getTime()) /
      MILLISENDS_IN_ONE_DAY +
    1;
  return `SELECT carid, SUM(((CASE WHEN rentenddate > DATE('${endPeriodDate}') THEN DATE('${endPeriodDate}') ELSE rentenddate END) - (CASE WHEN rentstartdate < DATE('${startPeriodDate}') THEN DATE('${startPeriodDate}') ELSE rentstartdate END) + 1) * 100 / ${dayCount}) as usage FROM "rentSessions" WHERE rentstartdate <= DATE('${endPeriodDate}') AND rentenddate >= DATE('${startPeriodDate}')  GROUP BY carid;`;
}

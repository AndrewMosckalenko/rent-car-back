import { datesDiffInDays } from 'src/utils';
import { BREAK_RENT_TIME } from '../../constants';
import { CreateRentSessionDTO } from '../../rent-session/dto';
import { rentSessionCreateTableQuery } from './queries';

export function initDBQueryCreator() {
  return rentSessionCreateTableQuery;
}

export function createRentSessionQueryCreator(createDTO: CreateRentSessionDTO) {
  return {
    query: `
  INSERT INTO rent_sessions(rent_start_date, rent_end_date, rent_cost, car_id) 
  VALUES($1::date, $2::date, $3::integer, $4::integer);`,
    values: [
      createDTO.rentStartDate,
      createDTO.rentEndDate,
      createDTO.rentCost,
      createDTO.carId,
    ],
  };
}

export function selectCountOfDisturbingRentSessionQueryCreator(
  carId: number,
  dateStart: string,
  dateEnd: string,
) {
  return {
    query: `
     SELECT COUNT(*) 
     FROM rent_sessions 
     WHERE (car_id = $1::integer 
        AND 
           ((rent_start_date < Date(Date($2::date) + $4::integer)  
           AND Date(rent_end_date + $4::integer) > Date($2::date)) 
         OR 
           (rent_start_date < Date(Date($3::date) + $4::integer) 
           AND Date(rent_end_date + $4::integer) > Date(Date($3::date) + $4::integer)) 
         OR (rent_start_date > Date($2::date) 
           AND Date(rent_end_date + $4::integer) < Date(Date($3::date) + $4::integer))
         )
       );`,
    values: [carId, dateStart, dateEnd, BREAK_RENT_TIME],
  };
}

export function getReportAboutUseCarQueryCreator(
  startPeriodDate: string,
  endPeriodDate: string,
) {
  const dayCount = datesDiffInDays(endPeriodDate, startPeriodDate);
  return {
    query: `
    SELECT car_id, SUM((
    (CASE WHEN rent_end_date > DATE($1::date) 
      THEN DATE($1::date) 
      ELSE rent_end_date END) - 
    (CASE WHEN rent_start_date < DATE($2::date) 
      THEN DATE($2::date) 
      ELSE rent_start_date END) 
    + 1) * 100 / $3::integer) as usage 
    FROM rent_sessions 
    WHERE rent_start_date <= DATE($1::date) 
    AND rent_end_date >= DATE($2::date) 
    GROUP BY car_id;`,
    values: [endPeriodDate, startPeriodDate, dayCount],
  };
}

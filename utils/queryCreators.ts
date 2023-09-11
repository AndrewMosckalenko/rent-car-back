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

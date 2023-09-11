export function createRentSessionQueryCreator() {
  return `CREATE TABLE IF NOT EXISTS "rentSessions"(
    id integer PRIMARY KEY,
    rentStartDate Date NOT NULL,
    rentEndDate Date NOT NULL,
    rentCost integer NOT NULL DEFAULT 0,
    carId integer NOT NULL
  );`;
}

export function initDBQueryCreator() {
  return `${createRentSessionQueryCreator()}`;
}

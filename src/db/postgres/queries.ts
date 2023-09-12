export const rentSessionCreateTableQuery = `CREATE TABLE IF NOT EXISTS rent_sessions(
  id SERIAL PRIMARY KEY,
  rent_start_date Date NOT NULL,
  rent_end_date Date NOT NULL,
  rent_cost integer NOT NULL DEFAULT 0,
  car_id integer NOT NULL
);`;

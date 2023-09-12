import { Pool } from 'pg';

import { initDBQueryCreator, postgresConfig } from './';

export const postgresPool = new Pool(postgresConfig);

export async function initDB() {
  try {
    await postgresPool.connect();
    await postgresPool.query(initDBQueryCreator());

    console.log('DB is inited');
  } catch (e) {
    throw e;
  }
}

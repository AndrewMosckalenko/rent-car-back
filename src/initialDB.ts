import { Pool } from 'pg';
import postgresConfig from './postgresConfig';
import { initDBQueryCreator } from '../utils/queryCreators';

export default async function initDB() {
  try {
    const pool = new Pool(postgresConfig);
    await pool.connect();
    await pool.query(initDBQueryCreator());
    console.log('DB is inited');
    await pool.end();
  } catch (e) {
    throw e;
  }
}

interface IPostgresConfig {
  user: string;
  host: string;
  databese: string;
  password: string;
  port: number;
}

const postgresConfig: IPostgresConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  databese: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT) || 5432,
};

export default postgresConfig;

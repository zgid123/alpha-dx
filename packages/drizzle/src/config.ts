import { defineConfig, type Config } from 'drizzle-kit';

interface IConfigParams {
  dbName?: string;
  rootFolder?: string;
  dialect?: Config['dialect'];
}

export function config({
  dbName,
  dialect = 'postgresql',
  rootFolder = 'infrastructure/drizzle',
}: IConfigParams = {}): Config {
  dbName ||= process.env.DB_NAME || 'db_development';

  return defineConfig({
    dialect,
    casing: 'snake_case',
    out: `./src/${rootFolder}/migrations`,
    schema: `./src/${rootFolder}/schemas`,
    migrations: {
      schema: 'public',
      prefix: 'timestamp',
      table: 'orm_migrations',
    },
    dbCredentials: {
      ssl: false,
      database: dbName,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
    },
  });
}

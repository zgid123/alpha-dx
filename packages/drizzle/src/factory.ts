import { Pool } from 'pg';
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';

export interface ICreateParams<TSchema extends Record<string, unknown>> {
  client?: Pool;
  dbName?: string;
  schema?: TSchema;
  isTest?: boolean;
}

export interface IDrizzle<TSchema extends Record<string, unknown>>
  extends NodePgDatabase<TSchema> {
  $client: Pool;
}

export function createDrizzle<TSchema extends Record<string, unknown>>({
  dbName,
  schema,
  client,
  isTest = false,
}: ICreateParams<TSchema> = {}): IDrizzle<TSchema> {
  dbName ||= process.env.DB_NAME || 'db_development';

  if (isTest) {
    dbName = dbName || 'db_test';
  }

  if (!client) {
    client = new Pool({
      database: dbName,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
    });
  }

  return drizzle({
    schema,
    client,
    casing: 'snake_case',
    logger: process.env.DB_DEBUG === 'true',
  });
}

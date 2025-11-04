/* eslint-disable @typescript-eslint/ban-ts-comment */
import { migrate } from 'drizzle-orm/node-postgres/migrator';

import type { Pool } from 'pg';
import type {
  DBQueryConfig,
  TableRelationalConfig,
  ExtractTablesWithRelations,
} from 'drizzle-orm';

import type { IDrizzle } from './factory';

export * from 'drizzle-kit';
export * from 'drizzle-orm';
export * from 'drizzle-orm/node-postgres/migrator';

interface IDropSchemaParams {
  client: Pool;
  schema: string;
}

type TDrizzle = IDrizzle<Record<string, unknown>>;

export async function dropSchema({
  client,
  schema,
}: IDropSchemaParams): Promise<void> {
  await client.query(`DROP SCHEMA IF EXISTS ${schema} CASCADE`);
}

interface ISetupSchemaParams {
  client: Pool;
  schema: string;
  drizzle: TDrizzle;
  migrationsFolder: string;
}

export async function setupSchema({
  client,
  schema,
  drizzle,
  migrationsFolder,
}: ISetupSchemaParams): Promise<void> {
  await client.connect();
  await client.query(`CREATE SCHEMA IF NOT EXISTS ${schema}`);
  await client.query(`SET search_path TO ${schema}`);
  await migrate(drizzle, {
    migrationsFolder,
    migrationsSchema: schema,
  });
}

interface ITruncateDateParams {
  schema: string;
  drizzle: TDrizzle;
}

export async function truncateData({
  schema,
  drizzle,
}: ITruncateDateParams): Promise<void> {
  const queries = Object.values<TableRelationalConfig>(
    drizzle._.schema || {},
  ).map((table) => {
    return `TRUNCATE TABLE "${schema}"."${table.dbName}" RESTART IDENTITY CASCADE;`;
  });

  await drizzle.execute(queries.join('\n')).execute();
}

export type TWithMany<
  TSchema extends Record<string, unknown>,
  TField extends keyof TSchema,
> = DBQueryConfig<
  'many',
  true,
  ExtractTablesWithRelations<TSchema>,
  // TODO: fix typing
  // @ts-expect-error
  ExtractTablesWithRelations<TSchema>[TField]
>['with'];

export type TWithOne<
  TSchema extends Record<string, unknown>,
  TField extends keyof TSchema,
> = DBQueryConfig<
  'one',
  true,
  ExtractTablesWithRelations<TSchema>,
  // TODO: fix typing
  // @ts-expect-error
  ExtractTablesWithRelations<TSchema>[TField]
>['with'];

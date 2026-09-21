import { type Config, defineConfig } from 'drizzle-kit';

interface IConfigParams {
  out?: string;
  dbName?: string;
  dialect?: Config['dialect'];
  rootFolder?: string | string[];
}

const DEFAULT_ROOT_FOLDER = 'src/infrastructure/drizzle';

function resolveSchemaPath(folder: string): string {
  return `./${folder}/schemas`;
}

function resolveOutPath(folder: string): string {
  return `./${folder}/migrations`;
}

export function config({
  out,
  dbName,
  dialect = 'postgresql',
  rootFolder = DEFAULT_ROOT_FOLDER,
}: IConfigParams = {}): Config {
  dbName ||= process.env.DB_NAME || 'db_development';

  const isMultiple = Array.isArray(rootFolder);
  const schema = isMultiple
    ? rootFolder.map(resolveSchemaPath)
    : resolveSchemaPath(rootFolder);

  const resolvedOut =
    out ?? (isMultiple ? './drizzle/migrations' : resolveOutPath(rootFolder));

  return defineConfig({
    schema,
    dialect,
    out: resolvedOut,
    casing: 'snake_case',
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

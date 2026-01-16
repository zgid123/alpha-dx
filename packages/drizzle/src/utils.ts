import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import type { Config } from 'drizzle-kit';

const supportedFiles = [
  'drizzle.config.ts',
  'drizzle.config.js',
  'drizzle.config.mjs',
  'drizzle.config.cjs',
] as const;

export async function importTsFile<T = unknown>(filePath: string): Promise<T> {
  const { register } = await import('esbuild-register/dist/node');

  register();
  const path = join(process.cwd(), filePath);
  const require = createRequire(import.meta.url);
  const mod = require(path);

  return mod;
}

export async function resolveConfig(): Promise<Config> {
  const configFileName = supportedFiles.find((file) => {
    const path = join(process.cwd(), file);

    return existsSync(path);
  });

  if (!configFileName) {
    throw new Error('No drizzle config file found');
  }

  const { default: def } = await importTsFile<{ default: Config }>(
    configFileName,
  );

  return def;
}

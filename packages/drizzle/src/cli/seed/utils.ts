import { camelize } from '@alphacifer/core-utils/stringUtils';

import { resolveConfig } from '../../utils';
import type { ISeedOptions } from './interfaces';

export function seedTemplate(name: string): string {
  return `
import type { IDrizzle } from '@alphacifer/drizzle/factory';

export async function ${camelize(name)}(drizzle: IDrizzle<any>): Promise<void> {
  // create here
}
  `
    .trim()
    .concat('\n');
}

export async function resolveSeedDir({ dir }: ISeedOptions): Promise<string> {
  if (dir) {
    return dir;
  }

  const config = await resolveConfig();

  if (!config.out) {
    return 'drizzle/seeds';
  }

  return config.out.replace('migrations', 'seeds');
}

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { formatDate } from '@alphacifer/core-utils/dateUtils';
import { combine } from '@alphacifer/core-utils/stringUtils';

import type { ISeedOptions } from './interfaces';
import { resolveSeedDir, seedTemplate } from './utils';

export async function createSeedFile(name: string, options: ISeedOptions) {
  const seedDir = await resolveSeedDir(options);

  const fileName = combine(
    {
      joinWith: '.',
    },
    combine(
      {
        joinWith: '_',
      },
      formatDate(new Date(), {
        format: 'yyyyMMddHHmmss',
      }),
      name,
      'Seed',
    ),
    'ts',
  );
  const path = join(process.cwd(), seedDir, fileName);

  await mkdir(dirname(path), {
    recursive: true,
  });

  await writeFile(path, seedTemplate(name));

  console.log(`✔ Created ${path}!`);
}

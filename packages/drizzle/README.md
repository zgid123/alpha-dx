Drizzle Setup Utils for Alpha's projects.

# Installation

```sh
pnpm add @alphacifer/drizzle drizzle-orm pg
pnpm add -D drizzle-kit @types/pg
```

# Usage

## Configuration

Generate `drizzle.config.ts` configuration for single or multi-module setups.

```ts
// drizzle.config.ts
import { config } from '@alphacifer/drizzle/config';

export default config({
  dbName: 'my_database',
  dialect: 'postgresql', // default is 'postgresql'
  rootFolder: 'src/infrastructure/drizzle', // default
});
```

### Multiple root folders

```ts
// drizzle.config.ts
import { config } from '@alphacifer/drizzle/config';

export default config({
  rootFolder: [
    'modules/auth/infrastructure/drizzle',
    'modules/payments/infrastructure/drizzle',
  ],
});
```

## Client factory

Create a Drizzle instance with snake_case casing and connection pooling.

```ts
import { createDrizzle } from '@alphacifer/drizzle/factory';

import * as schema from './schemas';

export const db = createDrizzle({
  schema,
  dbName: process.env.DB_NAME,
});
```

## CLI

Seed generation command:

```sh
pnpm drizzle-cli seed create <name> --dir src/infrastructure/drizzle/seeds
```

## Schema & test helpers

```ts
import { dropSchema, setupSchema, truncateData } from '@alphacifer/drizzle/core';
import { testSchema } from '@alphacifer/drizzle/testing';
```

## Error parsing

Extract database query error details (e.g. unique constraint or not-null violations).

```ts
import { parseError } from '@alphacifer/drizzle/parser';

try {
  await db.insert(users).values({
    email: 'existing@example.com',
  });
} catch (error) {
  const parsed = parseError(error);

  if (parsed.type === 'DUPLICATE') {
    console.error(`Duplicate value for attribute: ${parsed.attribute}`);
  }
}
```

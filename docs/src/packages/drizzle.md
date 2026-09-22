# @alphacifer/drizzle

Drizzle ORM setup utilities for Alpha's projects, providing multi-module configurations, database client factories, seeding CLI, schema helpers, and error parsers.

## Installation

```sh
pnpm add @alphacifer/drizzle drizzle-orm pg
pnpm add -D drizzle-kit @types/pg
```

---

## Configuration

Generate `drizzle.config.ts` effortlessly for single or multi-module monorepo architectures.

### Single Root Folder

```ts
// drizzle.config.ts
import { config } from '@alphacifer/drizzle/config';

export default config({
  dbName: 'my_database',
  dialect: 'postgresql',                    // default is 'postgresql'
  rootFolder: 'src/infrastructure/drizzle',  // default
});
```

### Multiple Root Folders

Manage multi-domain modular schemas in a single project:

```ts
// drizzle.config.ts
import { config } from '@alphacifer/drizzle/config';

export default config({
  dbName: 'my_database',
  rootFolder: [
    'modules/auth/infrastructure/drizzle',
    'modules/payments/infrastructure/drizzle',
  ],
});
```

---

## Client Factory

Create a Drizzle ORM client with automated snake_case casing and connection pooling.

```ts
import { createDrizzle } from '@alphacifer/drizzle/factory';

import * as schema from './schemas';

export const db = createDrizzle({
  schema,
  dbName: process.env.DB_NAME,
});
```

---

## CLI Tools

Generate seed migration files with the bundled CLI:

```sh
pnpm drizzle-cli seed create <name> --dir src/infrastructure/drizzle/seeds
```

---

## Schema & Testing Helpers

Utilities for automated database setup, teardown, table truncation, and schema assertions in Vitest:

```ts
import { dropSchema, setupSchema, truncateData } from '@alphacifer/drizzle/core';
import { testSchema } from '@alphacifer/drizzle/testing';

// Initialize and drop schemas during test suites
beforeAll(async () => {
  await setupSchema(db);
});

afterEach(async () => {
  await truncateData(db);
});

afterAll(async () => {
  await dropSchema(db);
});
```

---

## Error Parsing

Extract structured error details (such as unique constraint or not-null violations) from database operations:

```ts
import { parseError } from '@alphacifer/drizzle/parser';

try {
  await db.insert(users).values({
    email: 'existing@example.com',
  });
} catch (error) {
  const parsed = parseError(error);

  if (parsed.type === 'DUPLICATE') {
    console.error(`Duplicate entry for column: ${parsed.attribute}`);
  }
}
```

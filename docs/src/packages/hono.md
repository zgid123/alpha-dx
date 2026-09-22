# @alphacifer/hono

Hono utilities and middleware for Alpha's projects, providing standardized error handling, request validators, and testing utilities.

## Installation

```sh
pnpm add @alphacifer/hono hono
```

Optional peer dependencies:

```sh
# For Zod schema validation
pnpm add @hono/zod-validator zod

# For ArkType schema validation
pnpm add @hono/standard-validator arktype
```

---

## Error Handling

Standardized error classes and global error response handler for Hono applications.

```ts
import {
  HonoCommonError,
  HonoError,
  onError,
} from '@alphacifer/hono/core';
import { Hono } from 'hono';

const app = new Hono();

// Register the error handler middleware
app.onError(onError);

app.get('/user', () => {
  // Throws predefined standard common error
  throw HonoCommonError.invalidParams({
    detail: 'Invalid user ID format',
  });
});
```

### Custom HonoError

Throw custom structured errors with HTTP status codes, error codes, and details:

```ts
throw new HonoError({
  status: 404,
  code: 10_002,
  name: 'NOT_FOUND',
  message: 'User was not found in the database',
  detail: {
    userId: '123',
  },
});
```

---

## Validation

### Zod Validator

Integrate [Zod](https://zod.dev) schema validation:

```ts
import { zValidator } from '@alphacifer/hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const app = new Hono().post(
  '/sign-in',
  zValidator('json', userSchema),
  async (c) => {
    const data = c.req.valid('json');
    return c.json({
      data,
    });
  },
);
```

### ArkType Validator

Integrate [ArkType](https://arktype.io) high-performance validation:

```ts
import { arkValidator } from '@alphacifer/hono/arktype-validator';
import { type } from 'arktype';
import { Hono } from 'hono';

const userSchema = type({
  email: 'string.email',
  password: 'string >= 8',
});

const app = new Hono().post(
  '/sign-in',
  arkValidator('json', userSchema),
  async (c) => {
    const data = c.req.valid('json');
    return c.json({
      data,
    });
  },
);
```

---

## Testing Utilities

Convenient wrapper around Hono's `app.request` for testing routes and endpoints with Vitest.

```ts
import { HonoTest } from '@alphacifer/hono/testing';
import { describe, expect, it } from 'vitest';

import { app } from './app';

describe('App API Endpoints', () => {
  const client = HonoTest.create(app);

  it('authenticates user successfully', async () => {
    const res = await client.post('/sign-in', {
      email: 'user@example.com',
      password: 'password123',
    });

    expect(res.status).toBe(200);
    expect(res.jsonData.data).toBeDefined();
  });
});
```

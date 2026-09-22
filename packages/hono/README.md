Hono Utils for Alpha's projects.

# Installation

```sh
pnpm add @alphacifer/hono hono
```

Optional peer dependencies:

```sh
pnpm add @hono/zod-validator zod # For zod validation
pnpm add @hono/standard-validator arktype # For arktype validation
```

# Usage

## Error handling

Standard error classes and error response handler for Hono.

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
  throw HonoCommonError.invalidParams({
    detail: 'Invalid user ID',
  });
});
```

### Custom HonoError

```ts
throw new HonoError({
  status: 404,
  code: 10_002,
  name: 'NOT_FOUND',
  message: 'User not found',
  detail: {
    userId: '123',
  },
});
```

## Validation

### Zod validator

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

### ArkType validator

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

## Testing utilities

Convenient wrapper around Hono's `app.request` for testing endpoints.

```ts
import { HonoTest } from '@alphacifer/hono/testing';
import { describe, expect, it } from 'vitest';

import { app } from './app';

describe('App test', () => {
  const client = HonoTest.create(app);

  it('signs in', async () => {
    const res = await client.post('/sign-in', {
      email: 'user@example.com',
      password: 'password123',
    });

    expect(res.status).toBe(200);
    expect(res.jsonData.data).toBeDefined();
  });
});
```

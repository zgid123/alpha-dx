import { serve } from '@hono/node-server';
import { Hono, type ValidationTargets } from 'hono';
import { z } from 'zod';

import { zValidator } from '../../core';

const baseSchema = z.object({
  id: z.bigint(),
  uuid: z.nanoid(),
  email: z.email(),
  createdAt: z.date(),
  updatedAt: z.date(),
  password: z.string(),
  lastName: z.string().nullish(),
  firstName: z.string().nullish(),
});

const signInSchema = baseSchema.pick({
  email: true,
  password: true,
});

const app = new Hono().post(
  '/sign-in',
  zValidator<
    typeof signInSchema,
    keyof ValidationTargets,
    Record<string, string>,
    string
  >('json', signInSchema),
  async (c) => {
    const { req } = c;
    const data = req.valid('json');

    return c.json({
      data,
    });
  },
);

serve(
  {
    port: 9_000,
    fetch: app.fetch,
  },
  ({ port }) => {
    console.log(`Server is running on http://localhost:${port}`);
  },
);

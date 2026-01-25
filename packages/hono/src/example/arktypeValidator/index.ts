import { serve } from '@hono/node-server';
import { type } from 'arktype';
import { Hono, type ValidationTargets } from 'hono';

import { arkValidator } from '../../core';

const userSchema = type({
  createdAt: 'Date',
  updatedAt: 'Date',
  id: 'string.uuid.v7',
  email: 'string.email',
  'password?': 'string.trim | null',
  'lastName?': 'string.trim | null',
  'firstName?': 'string.trim | null',
});

const signInSchema = userSchema.pick('email').merge(
  type({
    password: 'string',
  }),
);

const app = new Hono().post(
  '/sign-in',
  arkValidator<
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

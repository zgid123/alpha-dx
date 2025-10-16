import type { Context, Env } from 'hono';
import type { ContentfulStatusCode } from 'hono/utils/http-status';

import { HonoError, type TErrorResponse } from './HonoError';

export function onError<E extends Env>(
  error: Error | HonoError,
  c: Context<E>,
  hook?: (error: Error | HonoError) => void,
): Response {
  let status: ContentfulStatusCode = 500;
  let payload: TErrorResponse = {
    code: 10_000,
    name: 'INTERNAL_SERVER_ERROR',
    message: 'Something went wrong!',
  };

  hook?.(error);

  if (error instanceof HonoError) {
    status = error.status;
    payload = error.toJSON();
  }

  return c.json(payload, status);
}

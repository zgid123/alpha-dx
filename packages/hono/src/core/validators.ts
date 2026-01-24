import { sValidator as sv } from '@hono/standard-validator';
import { zValidator as zv } from '@hono/zod-validator';
import type { Type as ArkType } from 'arktype';
import type { Env, ValidationTargets } from 'hono';
import type { ZodType } from 'zod';

import { HonoCommonError } from './HonoError';

export const zValidator = <
  T extends ZodType,
  Target extends keyof ValidationTargets,
  E extends Env,
  P extends string,
>(
  target: Target,
  schema: T,
): ReturnType<typeof zv<T, Target, E, P>> => {
  return zv(target, schema, (result) => {
    if (!result.success) {
      const { message } = result.error;
      const detail = JSON.parse(message);

      throw HonoCommonError.invalidParams({
        detail,
      });
    }
  });
};

export const arkValidator = <
  T extends ArkType,
  Target extends keyof ValidationTargets,
  E extends Env,
  P extends string,
>(
  target: Target,
  schema: T,
): ReturnType<typeof sv<T, Target, E, P>> => {
  return sv(target, schema, (result) => {
    if (!result.success) {
      const detail = result.error;

      throw HonoCommonError.invalidParams({
        detail,
      });
    }
  });
};

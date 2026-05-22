import { sValidator as sv } from '@hono/standard-validator';
import type { Type as ArkType } from 'arktype';
import type { Env, ValidationTargets } from 'hono';

import { HonoCommonError } from '../core/HonoError';

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

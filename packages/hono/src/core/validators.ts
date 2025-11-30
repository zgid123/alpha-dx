import { zValidator as zv } from '@hono/zod-validator';
import type { Env, ValidationTargets } from 'hono';
import type { ZodType } from 'zod';

import { HonoCommonError } from './HonoError';

interface IError {
  code: string;
  path: string[];
  message: string;
}

interface IDetail {
  type: string;
  message: string;
}

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
      const detail = (JSON.parse(message) as IError[]).reduce<
        Record<string, IDetail>
      >((result, { code, path, message }) => {
        result[path.join('.')] = {
          message,
          type: code,
        };

        return result;
      }, {});

      throw HonoCommonError.invalidParams({
        detail,
      });
    }
  });
};

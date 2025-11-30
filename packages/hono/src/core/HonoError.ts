import { HTTPException } from 'hono/http-exception';
import type { ContentfulStatusCode } from 'hono/utils/http-status';

export interface IError {
  res?: Response;
  cause?: unknown;
}

interface IHonoError extends IError {
  code: number;
  name: string;
  message?: string;
  detail?: unknown;
  status?: ContentfulStatusCode;
}

export type TErrorResponse = Omit<IHonoError, 'res' | 'cause' | 'status'>;

export class HonoError extends HTTPException {
  #code: number;
  #name: string;
  #detail: unknown;

  constructor({ res, code, name, cause, message, status, detail }: IHonoError) {
    super(status, {
      res,
      cause,
      message,
    });

    this.#code = code;
    this.#name = name;
    this.#detail = detail;
  }

  public toJSON(): TErrorResponse {
    return {
      code: this.#code,
      name: this.#name,
      message: this.message,
      ...(this.#detail
        ? {
            detail: this.#detail,
          }
        : {}),
    };
  }
}

interface IInvalidParamsParams {
  detail: unknown;
}

export class HonoCommonError extends HonoError {
  public static invalidParams({ detail }: IInvalidParamsParams): HonoError {
    return new HonoCommonError({
      detail,
      status: 400,
      code: 10_000,
      name: 'INVALID_PARAMS',
      message: 'Invalid params',
    });
  }
}

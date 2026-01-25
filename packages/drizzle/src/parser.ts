import type { DrizzleQueryError } from 'drizzle-orm';

export interface IDrizzleError {
  detail: string;
  attribute: string;
  type: 'DUPLICATE' | 'NOT_NULL' | 'UNKNOWN';
}

interface IErrorCause {
  code: string;
  detail: string;
  column: string;
  routine: string;
}

export function parseError(error: DrizzleQueryError): IDrizzleError {
  const { detail, code, routine, column } =
    error.cause as unknown as IErrorCause;
  let type: IDrizzleError['type'] = 'UNKNOWN';
  let attribute = '';

  if (code === '23505') {
    type = 'DUPLICATE';
    attribute = (detail.split('=')[0] || '').replace(/key|\(|\)/gi, '').trim();
  } else if (routine === 'ReportNotNullViolationError') {
    type = 'NOT_NULL';
    attribute = column;
  }

  return {
    type,
    detail,
    attribute,
  };
}

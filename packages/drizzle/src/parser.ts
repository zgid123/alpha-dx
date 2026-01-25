import type { DrizzleQueryError } from 'drizzle-orm';

export interface IDrizzleError {
  detail: string;
  attribute: string;
  type: 'DUPLICATE' | 'UNKNOWN';
}

interface IErrorCause {
  code: string;
  detail: string;
}

export function parseError(error: DrizzleQueryError): IDrizzleError {
  const { detail, code } = error.cause as unknown as IErrorCause;
  let type: IDrizzleError['type'] = 'UNKNOWN';
  let attribute = '';

  if (code === '23505') {
    type = 'DUPLICATE';
    attribute = (detail.split('=')[0] || '').replace(/key|\(|\)/gi, '').trim();
  }

  return {
    type,
    detail,
    attribute,
  };
}

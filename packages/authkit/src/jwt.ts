import jwt, { type SignOptions, type VerifyOptions } from 'jsonwebtoken';
import { nanoid } from 'nanoid';

interface IExtractJWTParams {
  token: string;
  issuer?: string;
  subject?: string;
  secretKey?: string;
  audience?: VerifyOptions['audience'];
  algorithms?: ('HS256' | 'HS512' | 'ES256')[];
}

export function extractJWT<T = unknown>({
  token,
  issuer,
  subject,
  audience,
  secretKey,
  algorithms = ['HS256'],
}: IExtractJWTParams): T {
  return jwt.verify(token, secretKey || process.env.JWT_SECRET || '', {
    issuer,
    subject,
    audience,
    algorithms,
  }) as T;
}

interface IGenTokenParams {
  jwtId?: string;
  issuer?: string;
  subject?: string;
  secretKey?: string;
  audience?: VerifyOptions['audience'];
  expiresIn?: SignOptions['expiresIn'];
  notBefore?: SignOptions['notBefore'];
  algorithm?: 'HS256' | 'HS512' | 'ES256';
  payload: Record<string, string | string[]>;
}

export function genToken({
  jwtId,
  issuer,
  subject,
  payload,
  audience,
  secretKey,
  expiresIn,
  notBefore,
  algorithm = 'HS256',
}: IGenTokenParams): string {
  const options: SignOptions = {
    algorithm,
    expiresIn: expiresIn ?? 60 * 60,
  };

  if (notBefore) {
    options.notBefore = notBefore;
  }

  return jwt.sign(
    {
      ...payload,
      iss: issuer,
      sub: subject,
      aud: audience,
      jti: jwtId ?? nanoid(20),
    },
    secretKey || process.env.JWT_SECRET || '',
    options,
  );
}

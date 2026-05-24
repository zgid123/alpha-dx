import { argon2, randomBytes, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const asyncArgon2 = promisify(argon2);
const asyncRandomBytes = promisify(randomBytes);

interface IPasswordHashParams {
  memory?: number;
  passes?: number;
  password: string;
  tagLength?: number;
  parallelism?: number;
}

export async function passwordHash({
  password,
  passes = 3,
  tagLength = 32,
  parallelism = 4,
  memory = 65_534,
}: IPasswordHashParams): Promise<string> {
  const salt = await asyncRandomBytes(16);
  const hash = await asyncArgon2('argon2id', {
    memory,
    passes,
    tagLength,
    parallelism,
    nonce: salt,
    message: password,
  });

  const b64Salt = salt.toString('base64').replace(/=+$/, '');
  const b64Hash = hash.toString('base64').replace(/=+$/, '');

  return `$argon2id$v=19$m=${memory},t=${passes},p=${parallelism}$${b64Salt}$${b64Hash}`;
}

interface IVerifyPasswordParams {
  password: string;
  hashPassword: string;
}

export async function verifyPassword({
  password,
  hashPassword,
}: IVerifyPasswordParams): Promise<boolean> {
  try {
    const parts = hashPassword.split('$');

    if (parts.length !== 6 || parts[1] !== 'argon2id') {
      return false;
    }

    const [, , , params, saltB64, hashB64] = parts;
    const paramMatch = params?.match(/m=(\d+),t=(\d+),p=(\d+)/);

    if (!paramMatch) {
      return false;
    }

    const memory = Number.parseInt(paramMatch[1] || '', 10);
    const passes = Number.parseInt(paramMatch[2] || '', 10);
    const parallelism = Number.parseInt(paramMatch[3] || '', 10);
    const salt = Buffer.from(saltB64 || '', 'base64');
    const originalHash = Buffer.from(hashB64 || '', 'base64');

    const actualHash = await asyncArgon2('argon2id', {
      memory,
      passes,
      parallelism,
      nonce: salt,
      message: password,
      tagLength: originalHash.length,
    });

    return timingSafeEqual(originalHash, actualHash);
  } catch {
    return false;
  }
}

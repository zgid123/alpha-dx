import { generateKeyPairSync } from 'node:crypto';

import { extractJWT, genToken } from '../jwt';

const { publicKey: es256PublicKey, privateKey: es256PrivateKey } =
  generateKeyPairSync('ec', {
    namedCurve: 'prime256v1',
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });

describe('#genToken', () => {
  const secretKey = 'test-secret';
  const payload = {
    userId: '123',
  };

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  suite('when payload is provided', () => {
    it('generates a valid jwt token', () => {
      const token = genToken({
        payload,
        secretKey,
      });

      expect(token).toBeTypeOf('string');
    });
  });

  suite('when secretKey is missing but JWT_SECRET is set', () => {
    it('uses the environment variable as secret', () => {
      vi.stubEnv('JWT_SECRET', 'env-secret');

      const token = genToken({
        payload,
      });

      const extracted = extractJWT<{ userId: string }>({
        token,
        secretKey: 'env-secret',
      });

      expect(extracted.userId).toBe(payload.userId);
    });
  });

  suite('when expiresIn is provided', () => {
    it('respects the expiration time', () => {
      vi.useFakeTimers();

      const token = genToken({
        payload,
        secretKey,
        expiresIn: '1s',
      });

      vi.advanceTimersByTime(2_000);

      expect(() => {
        return extractJWT({
          token,
          secretKey,
        });
      }).toThrow();

      vi.useRealTimers();
    });
  });

  suite('when notBefore is provided', () => {
    it('cannot be used before the specified time', () => {
      vi.useFakeTimers();

      const token = genToken({
        payload,
        secretKey,
        notBefore: '1h',
        expiresIn: '24h',
      });

      expect(() => {
        return extractJWT({
          token,
          secretKey,
        });
      }).toThrow();

      vi.advanceTimersByTime(2 * 60 * 60 * 1_000);

      expect(() => {
        return extractJWT({
          token,
          secretKey,
        });
      }).not.toThrow();

      vi.useRealTimers();
    });
  });

  suite('when algorithm is ES256', () => {
    it('generates a valid jwt token using ECDSA', () => {
      const token = genToken({
        payload,
        algorithm: 'ES256',
        secretKey: es256PrivateKey,
      });

      expect(token).toBeTypeOf('string');
    });
  });
});

describe('#extractJWT', () => {
  const secretKey = 'test-secret';
  const payload = {
    userId: '123',
  };

  suite('when token is valid', () => {
    it('extracts the payload correctly', () => {
      const token = genToken({
        payload,
        secretKey,
      });

      const result = extractJWT<{ userId: string }>({
        token,
        secretKey,
      });

      expect(result.userId).toBe(payload.userId);
    });
  });

  suite('when issuer and subject are provided', () => {
    it('validates them correctly', () => {
      const issuer = 'test-issuer';
      const subject = 'test-subject';

      const token = genToken({
        issuer,
        payload,
        subject,
        secretKey,
      });

      const result = extractJWT<{ iss: string; sub: string }>({
        token,
        issuer,
        subject,
        secretKey,
      });

      expect(result.iss).toBe(issuer);
      expect(result.sub).toBe(subject);
    });
  });

  suite('when audience is provided', () => {
    it('validates it correctly', () => {
      const audience = 'test-audience';

      const token = genToken({
        payload,
        audience,
        secretKey,
      });

      const result = extractJWT<{ aud: string }>({
        token,
        audience,
        secretKey,
      });

      expect(result.aud).toBe(audience);
    });
  });

  suite('when algorithm is provided', () => {
    it('validates it correctly', () => {
      const token = genToken({
        payload,
        secretKey,
        algorithm: 'HS512',
      });

      const result = extractJWT({
        token,
        secretKey,
        algorithms: ['HS512'],
      });

      expect(result).toBeDefined();
    });
  });

  suite('when algorithm is ES256', () => {
    it('validates it correctly using ECDSA', () => {
      const token = genToken({
        payload,
        algorithm: 'ES256',
        secretKey: es256PrivateKey,
      });

      const result = extractJWT({
        token,
        algorithms: ['ES256'],
        secretKey: es256PublicKey,
      });

      expect(result).toBeDefined();
    });
  });
});

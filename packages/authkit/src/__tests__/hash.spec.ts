import { passwordHash, verifyPassword } from '../hash';

describe('#passwordHash', () => {
  const password = 'my-secure-password';

  suite('when password is provided', () => {
    it('hashes the password using argon2id', async () => {
      const hash = await passwordHash({
        password,
      });

      expect(hash).toContain('$argon2id$');
      expect(hash).toContain('v=19');
    });
  });

  suite('when custom parameters are provided', () => {
    it('respects the memory, passes, and parallelism', async () => {
      const hash = await passwordHash({
        password,
        passes: 2,
        parallelism: 2,
        memory: 32_768,
      });

      expect(hash).toContain('m=32768,t=2,p=2');
    });
  });
});

describe('#verifyPassword', () => {
  const password = 'my-secure-password';

  suite('when password and hash match', () => {
    it('returns true', async () => {
      const hash = await passwordHash({
        password,
      });

      const result = await verifyPassword({
        password,
        hashPassword: hash,
      });

      expect(result).toBe(true);
    });
  });

  suite('when password and hash do not match', () => {
    it('returns false', async () => {
      const hash = await passwordHash({
        password,
      });

      const result = await verifyPassword({
        hashPassword: hash,
        password: 'wrong-password',
      });

      expect(result).toBe(false);
    });
  });

  suite('when hash format is invalid', () => {
    it('returns false', async () => {
      const result = await verifyPassword({
        password,
        hashPassword: 'invalid-hash',
      });

      expect(result).toBe(false);
    });
  });
});

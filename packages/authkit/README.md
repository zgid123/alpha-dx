Auth Kit for Alpha's projects.

# Installation

```sh
pnpm add @alphacifer/authkit
```

# Usage

## JWT

Generate and verify JSON Web Tokens.

```ts
import { extractJWT, genToken } from '@alphacifer/authkit/jwt';

// Generate token
const token = genToken({
  payload: {
    userId: 'user-123',
    role: 'admin',
  },
  secretKey: 'your-secret-key', // optional, defaults to process.env.JWT_SECRET
  expiresIn: 60 * 60, // 1 hour (default)
});

// Extract and verify token
interface ITokenPayload {
  userId: string;
  role: string;
}

const payload = extractJWT<ITokenPayload>({
  token,
  secretKey: 'your-secret-key', // optional, defaults to process.env.JWT_SECRET
});
```

### Advanced JWT options

```ts
const token = genToken({
  payload: {
    userId: 'user-123',
  },
  issuer: 'https://auth.example.com',
  subject: 'user-123',
  audience: 'https://api.example.com',
  algorithm: 'HS256', // 'HS256' | 'HS512' | 'ES256'
  expiresIn: '24h',
  notBefore: '1h',
});

const extracted = extractJWT({
  token,
  issuer: 'https://auth.example.com',
  subject: 'user-123',
  audience: 'https://api.example.com',
  algorithms: ['HS256'],
});
```

## Password hashing

Hash and verify passwords using Argon2id (`argon2id`).

```ts
import { passwordHash, verifyPassword } from '@alphacifer/authkit/hash';

// Hash password
const hash = await passwordHash({
  password: 'my-secure-password',
});

// Verify password
const isValid = await verifyPassword({
  password: 'my-secure-password',
  hashPassword: hash,
});
```

### Custom Argon2 parameters

```ts
const hash = await passwordHash({
  password: 'my-secure-password',
  memory: 65_534,
  passes: 3,
  parallelism: 4,
  tagLength: 32,
});
```

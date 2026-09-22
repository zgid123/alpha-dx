# @alphacifer/authkit

Authentication toolkit for Alpha's projects providing strongly-typed JSON Web Token (JWT) handling and Argon2id password hashing.

## Installation

```sh
pnpm add @alphacifer/authkit
```

---

## JSON Web Tokens (JWT)

Generate and verify signed JWT tokens using `@alphacifer/authkit/jwt`.

### Basic Usage

```ts
import { extractJWT, genToken } from '@alphacifer/authkit/jwt';

// Generate token
const token = genToken({
  payload: {
    userId: 'user-123',
    role: 'admin',
  },
  secretKey: 'your-secret-key', // optional: defaults to process.env.JWT_SECRET
  expiresIn: 60 * 60,           // 1 hour (default)
});

// Extract and verify token
interface ITokenPayload {
  userId: string;
  role: string;
}

const payload = extractJWT<ITokenPayload>({
  token,
  secretKey: 'your-secret-key', // optional: defaults to process.env.JWT_SECRET
});

console.log(payload.userId); // 'user-123'
```

### Advanced JWT Claims & Options

Customize claims, algorithm, and token lifetime:

```ts
import { extractJWT, genToken } from '@alphacifer/authkit/jwt';

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

const verified = extractJWT({
  token,
  issuer: 'https://auth.example.com',
  subject: 'user-123',
  audience: 'https://api.example.com',
  algorithms: ['HS256'],
});
```

---

## Password Hashing

Secure password hashing and verification powered by Argon2id (`argon2id`) via `@alphacifer/authkit/hash`.

### Basic Usage

```ts
import { passwordHash, verifyPassword } from '@alphacifer/authkit/hash';

// Hash a plaintext password
const hash = await passwordHash({
  password: 'my-secure-password',
});

// Verify the plaintext password against stored hash
const isValid = await verifyPassword({
  password: 'my-secure-password',
  hashPassword: hash,
});

console.log(isValid); // true
```

### Custom Argon2 Parameters

Tune performance, memory cost, iterations, and parallelism:

```ts
import { passwordHash } from '@alphacifer/authkit/hash';

const hash = await passwordHash({
  password: 'my-secure-password',
  memory: 65_534,   // memory size in KiB
  passes: 3,        // number of iterations
  parallelism: 4,   // number of threads
  tagLength: 32,    // output length in bytes
});
```

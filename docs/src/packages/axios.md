# @alphacifer/axios

Type-safe Axios client wrapper for Alpha's projects, providing automated key transformations, token storage, and seamless refresh token flows.

## Installation

```sh
pnpm add @alphacifer/axios
```

---

## Basic Usage

Create a client instance and make typed API calls:

```ts
import { AxiosClient } from '@alphacifer/axios';

interface IUser {
  readonly id: string;
  readonly fullName: string;
}

const client = AxiosClient.create({
  baseURL: 'https://api.example.com',
});

const user = await client.get<IUser>({
  url: '/users/user-1',
});
```

---

## HTTP Requests

The client supports `get`, `post`, `put`, and `delete`:

```ts
// GET request with parameters
await client.get<IUser>({
  url: '/users/user-1',
  params: {
    includeRoles: true,
  },
});

// POST request with body payload
await client.post<IUser>({
  url: '/users',
  data: {
    firstName: 'Alpha',
  },
});
```

---

## Key Transformations

Request `params` and `data` are automatically transformed before reaching the network. The default transform is `camel`.

Supported transforms:
- `camel`
- `snake`
- `pascal`

```ts
// Send query parameters as snake_case (e.g., include_roles=true)
await client.get<IUser>({
  url: '/users',
  paramsTransform: 'snake',
  params: {
    includeRoles: true,
  },
});

// Send JSON body keys as PascalCase
await client.post<IUser>({
  url: '/users',
  dataTransform: 'pascal',
  data: {
    firstName: 'Alpha',
  },
});
```

### Automatic Response Camelization & Unwrapping

Responses are always converted with `deepCamelizeKeys`.

If an API response wraps the payload in a top-level `data` property, the client automatically unwraps it:

```json
// Raw API response from server:
{
  "data": {
    "user_id": "user-1",
    "full_name": "Alpha"
  }
}
```

```ts
// Returned value in TypeScript:
{
  userId: 'user-1',
  fullName: 'Alpha',
}
```

---

## Authentication & Token Storage

When `withCredentials` is `false`, the client injects the access token from `TokenStorage` as a `Bearer` token in the `Authorization` header:

```ts
import { AxiosClient, TokenStorage } from '@alphacifer/axios';

const storage = new TokenStorage();
storage.accessToken = 'access-token';
storage.refreshToken = 'refresh-token';

const client = AxiosClient.create({
  baseURL: 'https://api.example.com',
  storage,
  withCredentials: false,
});
```

---

## Automatic Refresh Token Flow

When receiving a `401 Unauthorized` response, the client intercepts the request, invokes the `onRefreshToken` callback, updates the stored tokens, and transparently retries the original request. Multiple concurrent 401 requests share a single refresh call.

```ts
const client = AxiosClient.create({
  baseURL: 'https://api.example.com',
  onRefreshToken: async ({ refreshToken }) => {
    const response = await fetch('https://api.example.com/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({
        refreshToken,
      }),
    });

    return response.json() as Promise<{
      accessToken: string;
      refreshToken: string;
    }>;
  },
  onUnauthenticated: () => {
    window.location.href = '/login';
  },
});
```

The `onUnauthenticated` callback triggers if the token cannot be recovered (e.g., missing refresh token, retry failure, or refresh error).

Axios wrapper for Alpha's projects.

# Installation

```sh
pnpm add @alphacifer/axios
```

# Usage

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

# Requests

The client supports `get`, `post`, `put`, and `delete`.

```ts
await client.get<IUser>({
  url: '/users/user-1',
  params: {
    include_roles: true,
  },
});

await client.post<IUser>({
  url: '/users',
  data: {
    first_name: 'Alpha',
  },
});
```

# Key transforms

Request `params` and `data` are transformed before they are passed to Axios.
The default transform is `camel`.

Supported transforms:

- `camel`
- `snake`
- `pascal`

```ts
await client.get<IUser>({
  url: '/users',
  paramsTransform: 'snake',
  params: {
    includeRoles: true,
  },
});

await client.post<IUser>({
  url: '/users',
  dataTransform: 'pascal',
  data: {
    first_name: 'Alpha',
  },
});
```

Responses are always converted with `deepCamelizeKeys`.

If the API response is wrapped with a top-level `data` property, the client
returns the wrapped value:

```ts
// API response
{
  "data": {
    "user_id": "user-1",
    "full_name": "Alpha"
  }
}

// returned value
{
  userId: 'user-1',
  fullName: 'Alpha',
}
```

# Authentication

When `withCredentials` is `false`, the client reads the access token from
`TokenStorage` and sends it as a Bearer token.

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

Explicit `Authorization` headers are preserved.

# Refresh token

When a request receives `401`, the client can refresh tokens and retry once.
Concurrent 401 responses share the same in-flight refresh call.

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

`onUnauthenticated` runs when a `401` cannot be recovered, for example:

- there is no refresh handler
- there is no refresh token
- the retry also receives `401`
- the refresh request fails

# TokenStorage

`TokenStorage` stores tokens with these keys:

- `accessToken`
- `refreshToken`

By default it uses `globalThis.localStorage`. You can pass a custom storage
driver when needed.

```ts
import { TokenStorage } from '@alphacifer/axios';

const storage = new TokenStorage();

storage.accessToken = 'access-token';
storage.refreshToken = 'refresh-token';

await storage.accessToken;
await storage.refreshToken;

await storage.clearToken();
```


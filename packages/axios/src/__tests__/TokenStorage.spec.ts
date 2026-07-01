import { TokenStorage } from '../index';

function createStorageDriver(
  itemByKey: Map<string, string> = new Map(),
): Storage {
  return {
    getItem: (key: string) => itemByKey.get(key) ?? null,
    key: () => null,
    clear: () => {
      itemByKey.clear();
    },
    length: itemByKey.size,
    removeItem: (key: string) => {
      itemByKey.delete(key);
    },
    setItem: (key: string, value: string) => {
      itemByKey.set(key, value);
    },
  } as Storage;
}

describe('TokenStorage', () => {
  it('gets and sets access and refresh tokens', async () => {
    const storage = new TokenStorage(createStorageDriver());

    storage.accessToken = 'access-token';
    storage.refreshToken = 'refresh-token';

    await expect(storage.accessToken).resolves.toBe('access-token');
    await expect(storage.refreshToken).resolves.toBe('refresh-token');
  });

  it('gets and sets tokens with async storage drivers', async () => {
    const itemByKey = new Map<string, string>();
    const storage = new TokenStorage({
      getItem: async (key: string) => itemByKey.get(key) ?? null,
      key: () => null,
      clear: () => {
        itemByKey.clear();
      },
      length: itemByKey.size,
      removeItem: async (key: string) => {
        itemByKey.delete(key);
      },
      setItem: async (key: string, value: string) => {
        itemByKey.set(key, value);
      },
    } as unknown as Storage);

    storage.accessToken = 'access-token';
    storage.refreshToken = 'refresh-token';

    await expect(storage.accessToken).resolves.toBe('access-token');
    await expect(storage.refreshToken).resolves.toBe('refresh-token');
  });

  it('clears access and refresh tokens', async () => {
    const itemByKey = new Map([
      ['accessToken', 'access-token'],
      ['refreshToken', 'refresh-token'],
    ]);
    const storage = new TokenStorage(createStorageDriver(itemByKey));

    await storage.clearToken();

    await expect(storage.accessToken).resolves.toBeUndefined();
    await expect(storage.refreshToken).resolves.toBeUndefined();
    expect(itemByKey).toEqual(new Map());
  });

  it('removes a token when the setter receives an empty value', async () => {
    const itemByKey = new Map([['accessToken', 'access-token']]);
    const storage = new TokenStorage(createStorageDriver(itemByKey));

    storage.accessToken = ' ';

    await expect(storage.accessToken).resolves.toBeUndefined();
    expect(itemByKey.has('accessToken')).toBe(false);
  });

  it('returns undefined when no storage driver is available', async () => {
    const storage = new TokenStorage(undefined);

    storage.accessToken = 'access-token';
    storage.refreshToken = 'refresh-token';
    await storage.clearToken();

    await expect(storage.accessToken).resolves.toBeUndefined();
    await expect(storage.refreshToken).resolves.toBeUndefined();
  });

  it('swallows storage driver errors', async () => {
    const storage = new TokenStorage({
      clear: () => {
        throw new Error('clear failed');
      },
      getItem: () => {
        throw new Error('get failed');
      },
      key: () => null,
      length: 0,
      removeItem: () => {
        throw new Error('remove failed');
      },
      setItem: () => {
        throw new Error('set failed');
      },
    } as Storage);

    storage.accessToken = 'access-token';
    storage.refreshToken = undefined;

    await expect(storage.accessToken).resolves.toBeUndefined();
    await expect(storage.clearToken()).resolves.toBeUndefined();
  });
});

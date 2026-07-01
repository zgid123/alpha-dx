const ACCESS_TOKEN_STORAGE_KEY = 'accessToken';
const REFRESH_TOKEN_STORAGE_KEY = 'refreshToken';

export class TokenStorage {
  #storage?: Storage;

  public constructor(storage?: Storage) {
    try {
      this.#storage = storage ?? globalThis.localStorage;
    } catch {
      this.#storage = undefined;
    }
  }

  public get accessToken(): Promise<string | undefined> {
    return this.#getItem(ACCESS_TOKEN_STORAGE_KEY);
  }

  public set accessToken(token: string | undefined) {
    this.#setItem(ACCESS_TOKEN_STORAGE_KEY, token);
  }

  public get refreshToken(): Promise<string | undefined> {
    return this.#getItem(REFRESH_TOKEN_STORAGE_KEY);
  }

  public set refreshToken(token: string | undefined) {
    this.#setItem(REFRESH_TOKEN_STORAGE_KEY, token);
  }

  public async clearToken(): Promise<void> {
    await Promise.all([
      this.#removeItem(ACCESS_TOKEN_STORAGE_KEY),
      this.#removeItem(REFRESH_TOKEN_STORAGE_KEY),
    ]);
  }

  async #getItem(key: string): Promise<string | undefined> {
    try {
      const value = await Promise.resolve(this.#storage?.getItem(key));

      if (!value?.trim()) {
        return undefined;
      }

      return value;
    } catch {
      return undefined;
    }
  }

  async #removeItem(key: string): Promise<void> {
    try {
      await Promise.resolve(this.#storage?.removeItem(key));
    } catch {
      return;
    }
  }

  async #setItem(key: string, value: string | undefined): Promise<void> {
    if (!value?.trim()) {
      await this.#removeItem(key);

      return;
    }

    try {
      await Promise.resolve(this.#storage?.setItem(key, value));
    } catch {
      return;
    }
  }
}

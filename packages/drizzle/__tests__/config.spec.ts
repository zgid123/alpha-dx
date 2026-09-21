import { describe, expect, it, vi } from 'vitest';

vi.mock('drizzle-kit', () => ({
  defineConfig: vi.fn((config) => config),
}));

import { config } from '../src/config';

describe('config', () => {
  describe('single rootFolder (string)', () => {
    it('generates default config', () => {
      const result = config();

      expect(result).toMatchObject({
        dialect: 'postgresql',
        casing: 'snake_case',
        schema: './src/infrastructure/drizzle/schemas',
        out: './src/infrastructure/drizzle/migrations',
        migrations: {
          schema: 'public',
          prefix: 'timestamp',
          table: 'orm_migrations',
        },
      });
    });

    it('generates config with custom rootFolder', () => {
      const result = config({
        rootFolder: 'modules/auth/infrastructure/drizzle',
      });

      expect(result).toMatchObject({
        dialect: 'postgresql',
        schema: './modules/auth/infrastructure/drizzle/schemas',
        out: './modules/auth/infrastructure/drizzle/migrations',
      });
    });

    it('generates config with custom out', () => {
      const result = config({
        rootFolder: 'modules/auth/infrastructure/drizzle',
        out: './custom/migrations',
      });

      expect(result).toMatchObject({
        schema: './modules/auth/infrastructure/drizzle/schemas',
        out: './custom/migrations',
      });
    });

    it('generates config with custom dialect', () => {
      const result = config({
        dialect: 'mysql',
      });

      expect(result).toMatchObject({
        dialect: 'mysql',
      });
    });
  });

  describe('multiple rootFolders (string[])', () => {
    it('aggregates schema paths into an array', () => {
      const result = config({
        rootFolder: [
          'modules/auth/infrastructure/drizzle',
          'modules/payments/infrastructure/drizzle',
          'modules/products/infrastructure/drizzle',
        ],
      });

      expect(result).toMatchObject({
        dialect: 'postgresql',
        schema: [
          './modules/auth/infrastructure/drizzle/schemas',
          './modules/payments/infrastructure/drizzle/schemas',
          './modules/products/infrastructure/drizzle/schemas',
        ],
        out: './drizzle/migrations',
      });
    });

    it('uses custom out when provided with multiple rootFolders', () => {
      const result = config({
        rootFolder: [
          'modules/auth/infrastructure/drizzle',
          'modules/payments/infrastructure/drizzle',
        ],
        out: './custom/shared-migrations',
      });

      expect(result).toMatchObject({
        schema: [
          './modules/auth/infrastructure/drizzle/schemas',
          './modules/payments/infrastructure/drizzle/schemas',
        ],
        out: './custom/shared-migrations',
      });
    });

    it('preserves common config properties with multiple rootFolders', () => {
      const result = config({
        rootFolder: [
          'modules/auth/infrastructure/drizzle',
          'modules/payments/infrastructure/drizzle',
        ],
      });

      expect(result).toMatchObject({
        casing: 'snake_case',
        migrations: {
          schema: 'public',
          prefix: 'timestamp',
          table: 'orm_migrations',
        },
      });
    });
  });

  describe('dbCredentials', () => {
    it('uses environment variables for credentials', () => {
      const result = config();

      expect(result).toMatchObject({
        dbCredentials: {
          ssl: false,
          database: 'db_development',
          host: 'localhost',
          port: 5432,
        },
      });
    });

    it('uses provided dbName', () => {
      const result = config({ dbName: 'my_database' });

      expect(result).toMatchObject({
        dbCredentials: {
          database: 'my_database',
        },
      });
    });
  });
});

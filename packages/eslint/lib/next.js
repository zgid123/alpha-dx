import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextCompat = new FlatCompat({
  baseDirectory: __dirname,
});

export default nextCompat
  .extends('next/core-web-vitals', 'next/typescript')
  .map((config, index) => {
    if (index === 1) {
      delete config.plugins?.['react-hooks'];
    }

    if (index === 5) {
      delete config.plugins?.import;
      delete config.plugins?.['jsx-a11y'];
    }

    return {
      ...config,
      name: `next-app-${index}`,
    };
  });

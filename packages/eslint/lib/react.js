import js from '@eslint/js';
import globals from 'globals';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import reactPlugin from 'eslint-plugin-react';
import { fixupPluginRules } from '@eslint/compat';
import storybookPlugin from 'eslint-plugin-storybook';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  allConfig: js.configs.all,
  resolvePluginsRelativeTo: __dirname,
  recommendedConfig: js.configs.recommended,
});

function legacyPlugin(name, alias = name) {
  const plugin = compat.plugins(name)[0]?.plugins?.[alias];

  if (!plugin) {
    throw new Error(`Unable to resolve plugin ${name} and/or alias ${alias}`);
  }

  return fixupPluginRules(plugin);
}

export default {
  name: 'react',
  languageOptions: {
    globals: {
      ...globals.es2020,
      ...globals.browser,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: {
    react: reactPlugin,
    storybook: storybookPlugin,
    'react-hooks': fixupPluginRules(reactHooksPlugin),
    import: legacyPlugin('eslint-plugin-import', 'import'),
    'jsx-a11y': legacyPlugin('eslint-plugin-jsx-a11y', 'jsx-a11y'),
  },
  ignores: ['dist', '.eslintrc.json', '**/*.d.ts'],
  rules: {
    ...reactPlugin.configs.recommended.rules,
    ...reactPlugin.configs['jsx-runtime'].rules,
    ...storybookPlugin.configs.recommended.rules,
    ...reactHooksPlugin.configs.recommended.rules,
    'react/jsx-key': 'off',
    'react/prop-types': 'off',
  },
};

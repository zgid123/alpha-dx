import reactRefreshPlugin from 'eslint-plugin-react-refresh';

export default {
  name: 'react-app',
  plugins: {
    'react-refresh': reactRefreshPlugin,
  },
  rules: {
    'react-refresh/only-export-components': 'warn',
  },
};

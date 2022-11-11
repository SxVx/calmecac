module.exports = {
  root: true,
  extends: ['plugin:prettier/recommended', '@react-native-community', 'airbnb'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'prettier/prettier': 'warn',
    'react/jsx-indent-props': ['warn', 2],
    'react/jsx-max-props-per-line': ['off', { maximum: 1, when: 'always' }],
    'react/jsx-indent': ['warn', 2],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
      },
    },
  ],
};

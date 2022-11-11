module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'comma-dangle': ['error', 'always-multiline'],
    'no-useless-escape': ['off'],
    'no-redeclare': ['error', { builtinGlobals: false }],
    'no-async-promise-executor': 'off',
  },
};

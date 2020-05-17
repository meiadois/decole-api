module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'standard'
  ],
  env: {
    browser: true,
    es6: true
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },

  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },

  rules: {
    quotes: [2, 'single'],
    camelcase: 0,
    '@typescript-eslint/camelcase': 'off'
  }
}

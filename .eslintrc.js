module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'plugin:prettier/recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
  ],
  overrides: [
    {
      files: '**/*.ts',
      extends: [
        '@vue/typescript/recommended',
        '@vue/prettier/@typescript-eslint',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'prettier'
      ]
    }
  ],
  parserOptions: {
    ecmaVersion: 2020,
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
};

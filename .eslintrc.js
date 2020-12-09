module.exports = {
  root: true,
  env: {
    node: true
  },
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/recommended',
    'plugin:vue/essential',
    'plugin:prettier/recommended',
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
    // parser: 'babel-eslint',
    ecmaVersion: 2020,
    // sourceType: 'module'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
};

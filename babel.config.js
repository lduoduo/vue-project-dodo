module.exports = {
  presets: ['@vue/cli-plugin-babel/preset', '@babel/typescript'],
  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true,
      },
      'vant',
    ],
  ],
};

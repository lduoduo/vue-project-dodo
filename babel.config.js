module.exports = {
  presets: [
    // '@vue/cli-plugin-babel/preset'
    [
      '@vue/cli-plugin-babel/preset',
      {
        useBuiltIns: 'entry'
      }
    ],
    '@babel/preset-typescript'
    // '@babel/typescript'
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-object-rest-spread',
    // [
    //   'import',
    //   {
    //     libraryName: 'vant',
    //     libraryDirectory: 'es',
    //     style: true
    //   },
    //   'vant'
    // ]
  ]
};

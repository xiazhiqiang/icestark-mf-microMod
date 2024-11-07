module.exports = {
  vite: false,
  vendor: false,
  devPublicPath: 'http://localhost:3334/',
  publicPath: process.env.NODE_ENV === 'production' ? 'http://localhost:8881/' : 'http://localhost:3334/',
  externals:
    process.env.NODE_ENV === 'production'
      ? {
          react: 'React',
          'react-dom': 'ReactDOM',
          lodash: '_',
          moment: 'moment',
          '@alifd/next': 'Next',
        }
      : {},
  // moduleFederation: {
  //   name: 'microApp1',
  //   library: { type: 'var', name: 'microApp1' },
  //   filename: 'microApp1.js',
  //   exposes: {
  //     './comp1': '/src/components/Comp1/index',
  //   },
  //   // shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
  // },
  plugins: [
    [
      'build-plugin-icestark',
      {
        type: 'child',
      },
    ],
    [
      'build-plugin-fusion',
      {
        disableModularImport: true,
        themePackage: '@alifd/theme-design-pro',
      },
    ],
    [
      'build-plugin-moment-locales',
      {
        locales: ['zh-cn'],
      },
    ],
    [
      'build-plugin-ignore-style',
      {
        libraryName: '@alifd/next',
      },
    ],
    ['build-plugin-css-assets-local'],
    ['build-plugin-js-assets-local'],
    ['./plugin.js'],
  ],
};

module.exports = {
  vite: false,
  vendor: false,
  devPublicPath: 'http://localhost:3335/',
  publicPath: process.env.NODE_ENV === 'production' ? 'http://localhost:8882/' : 'http://localhost:3335/',
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    lodash: '_',
    moment: 'moment',
    '@alifd/next': 'Next',
  },
  // moduleFederation: {
  //   name: 'microApp2',
  //   remotes: {
  //     microApp1:
  //       process.env.NODE_ENV === 'production'
  //         ? 'microApp1@//localhost:8881/microApp1.js'
  //         : 'microApp1@//localhost:3334/microApp1.js',
  //   },
  //   // "shared": { "react": { "singleton": true }, "react-dom": { "singleton": true } }
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

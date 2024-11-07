module.exports = {
  vite: false,
  vendor: false,
  devPublicPath: 'http://localhost:3333/',
  publicPath: process.env.NODE_ENV === 'production' ? 'http://localhost:8880/' : 'http://localhost:3333/',
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
  //   name: 'mainApp',
  //   remotes: {
  //     microApp1: 'microApp1@//localhost:8881/microApp1.js',
  //   },
  //   // "shared": { "react": { "singleton": true }, "react-dom": { "singleton": true } }
  // },
  plugins: [
    [
      'build-plugin-icestark',
      {
        type: 'framework',
        uniqueName: 'frameworkJsonp',
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
    [
      'build-plugin-tpl-render',
      {
        type: 'thymeleaf',
        tplFile: 'public/index.thymeleaf.html',
      },
    ],
    ['./plugin.js'],
  ],
};

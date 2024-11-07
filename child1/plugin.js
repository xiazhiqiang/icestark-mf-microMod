const path = require('path');
const webpack = require('webpack');
const { ModuleFederationPlugin } = webpack.container;

module.exports = ({ context, onGetWebpackConfig, log, onHook, ...rest }, options) => {
  // 第一项参数为插件 API 提供的能力
  // options：插件自定义参数

  onGetWebpackConfig((config) => {
    config.output.uniqueName = 'child1';
    config.plugin('module-federation').use(ModuleFederationPlugin, [
      {
        name: 'microApp1',
        filename: 'microApp1.js',
        shareScope: 'child1',
        remotes: {
          mainApp: 'mainApp@//localhost:8880/mainApp.js',
        },
        // exposes: {
        //   './comp1': '/src/components/Comp1/index',
        // },
        // shared: [
        //   {
        //     react: {
        //       singleton: true,
        //       eager: true,
        //     },
        //     'react-dom': {
        //       singleton: true,
        //       eager: true,
        //     },
        //     '@alifd/next': {
        //       singleton: true,
        //       eager: true,
        //     },
        //     lodash: {
        //       singleton: true,
        //       eager: true,
        //     },
        //     moment: {
        //       singleton: true,
        //       eager: true,
        //     },
        //   },
        // ],
      },
    ]);
  });
};

const path = require('path');
// const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');
const webpack = require('webpack');
const { ModuleFederationPlugin } = webpack.container;

module.exports = ({ context, onGetWebpackConfig, log, onHook, ...rest }, options) => {
  // 第一项参数为插件 API 提供的能力
  // options：插件自定义参数

  onGetWebpackConfig((config) => {
    config.output.uniqueName = 'main';
    // config.output.uniqueName('main');
    config.plugin('module-federation').use(ModuleFederationPlugin, [
      {
        name: 'mainApp',
        filename: 'mainApp.js',
        shareScope: 'main',
        exposes: {
          './main': '/src/components/Main/index',
        },
        // remotes: {
        //   microApp1: 'microApp1@//localhost:8881/microApp1.js',
        //   microApp2: 'microApp2@//localhost:8882/microApp2.js',
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

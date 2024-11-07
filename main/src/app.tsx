import { runApp, IAppConfig } from 'ice';
import { ConfigProvider } from '@alifd/next';
import PageLoading from '@/components/PageLoading';
import FrameworkLayout from '@/layouts/FrameworkLayout';

import { registerModules, getModules } from '@ice/stark-module';
registerModules([
  {
    url: ['http://localhost:8883/modules/index.js', 'http://localhost:8883/modules/index.css'],
    name: 'microMod',
  },
]);

console.log('main jinlaile', getModules());

const appConfig: IAppConfig = {
  app: {
    rootId: 'icestark-container',
    addProvider: ({ children }) => <ConfigProvider prefix="next-icestark-">{children}</ConfigProvider>,
  },
  router: {
    type: 'hash',
  },
  icestark: {
    type: 'framework',
    Layout: FrameworkLayout,
    // @ts-ignore
    getApps: async () => {
      const apps = [
        {
          hashType: true,
          path: '/child1',
          // exact: true,
          // sandbox: true,
          // loadScriptMode: 'import',
          url: ['http://localhost:8881/js/index.js'],
          // entry: 'http://localhost:8881/index.html',
        },
        {
          hashType: true,
          path: '/child2',
          // exact: true,
          // sandbox: true,
          // loadScriptMode: 'import',
          url: ['http://localhost:8882/js/index.js'],
          // entry: 'http://localhost:8882/index.html',
          // entry: 'http://localhost:3335/index.html',
        },
      ];
      return apps;
    },
    appRouter: {
      LoadingComponent: PageLoading,
      shouldAssetsRemove: (url: string, element) => {
        console.log('url', url, element);
        // 避免模块mf样式丢失
        if (
          /localhost:\d+\/.*\/\d+\..*/.test(url) ||
          /src_components.*/.test(url) ||
          /.*modules\/index.css/.test(url)
        ) {
          console.log('url jinlaile', url);
          return false;
        }
        return true;
      },
    },
  },
};

runApp(appConfig);

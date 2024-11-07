import { runApp, IAppConfig } from 'ice';

const appConfig: IAppConfig = {
  router: {
    type: 'hash',
  },
  // icestark: {
  //   type: 'child',
  // },
};

runApp(appConfig);

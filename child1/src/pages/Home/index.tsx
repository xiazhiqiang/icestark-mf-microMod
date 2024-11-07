import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { appHistory } from '@ice/stark-app';
import { Button } from '@alifd/next';
import styles from './index.module.css';
import RemoteApp from '@/components/RemoteApp';

import { MicroModule, registerModules, getModules } from '@ice/stark-module';
// registerModules([
//   {
//     url: ['http://localhost:8883/modules/index.js', 'http://localhost:8883/modules/index.css'],
//     name: 'microMod',
//   },
// ]);
// console.log('child1 jinlaile', getModules());

export default function Home() {
  useEffect(() => {
    console.log('Home Page mounted');
    return () => {
      console.log('Home Page unmounted');
    };
  }, []);

  return (
    <div className={styles.app}>
      <RemoteApp />
      <MicroModule
        // moduleName="microMod"
        moduleInfo={{
          url: ['http://localhost:8883/modules/index.js', 'http://localhost:8883/modules/index.css'],
          name: 'microMod',
        }}
      />
      <Link to="/detail">child1 微应用跳转内部路由</Link>
      <br />
      <br />
      <Button
        type="primary"
        onClick={() => {
          appHistory.push('#/child2/');
        }}
      >
        跳转微应用 child2 首页
      </Button>
    </div>
  );
}

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { appHistory } from '@ice/stark-app';
import { Button } from '@alifd/next';
import styles from './index.module.css';
import RemoteApp from '@/components/RemoteApp';

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
      <Link to="/detail">child2 微应用跳转内部路由</Link>
      <br />
      <br />
      <Button
        type="primary"
        onClick={() => {
          appHistory.push('#/child1/');
        }}
      >
        跳转微应用 child1 首页
      </Button>
    </div>
  );
}

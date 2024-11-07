import { lazy, Suspense } from 'react';
import styles from './index.module.scss';

// @ts-ignore
const Main = lazy(() => import('mainApp/main'));
console.log(Main);

export default function RemoteApp() {
  return (
    <Suspense fallback="">
      <Main />
    </Suspense>
  );
}

// @ts-nocheck
import { lazy, Suspense } from 'react';
import styles from './index.module.scss';

// @ts-ignore
const Comp1 = lazy(() => import('microApp1/comp1'));
console.log(Comp1);

const Comp2 = lazy(() => import('microApp2/comp2'));
console.log(Comp2);

export function RemoteApp1() {
  return (
    <Suspense fallback="">
      <Comp1 />
    </Suspense>
  );
}

export function RemoteApp2() {
  return (
    <Suspense fallback="">
      <Comp2 />
    </Suspense>
  );
}

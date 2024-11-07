import { IRouterConfig } from 'ice';
import Home from '@/pages/Home';
import About from '@/pages/About';
import NotFound from '@/components/NotFound';

const routes: IRouterConfig[] = [
  {
    path: '/about',
    component: About,
  },
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    component: NotFound,
  },
];

export default routes;

import Homepage from '~/pages/Home';
import Followingpage from '~/pages/Following';
import Upload from '~/pages/Upload';
import { HeaderOnly } from '~/components/Layout';
import Search from '~/pages/Search';
//publicRoutes
const publicRoutes = [
  {
    path: '/',
    component: Homepage,
  },
  {
    path: '/Following',
    component: Followingpage,
  },
  {
    path: '/Upload',
    component: Upload,
    layout: HeaderOnly,
  },
  {
    path: '/Search',
    component: Search,
    layout: null,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

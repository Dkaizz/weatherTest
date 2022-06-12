import Homepage from '~/pages/Home';
import Followingpage from '~/pages/Following';
import Upload from '~/pages/Upload';
import { HeaderOnly } from '~/layouts';
import Search from '~/pages/Search';
import Profile from '~/pages/Profile';

import config from '~/config';
//publicRoutes
const publicRoutes = [
  {
    path: config.routes.home,
    component: Homepage,
  },
  {
    path: config.routes.following,
    component: Followingpage,
  },
  {
    path: config.routes.upload,
    component: Upload,
    layout: HeaderOnly,
  },
  {
    path: config.routes.search,
    component: Search,
    layout: null,
  },
  {
    path: config.routes.nickname,
    component: Profile,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

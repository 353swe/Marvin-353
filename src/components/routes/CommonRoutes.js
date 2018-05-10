import Help from '../public/Help';
import License from '../public/License';
import NotFound from '../public/NotFound';
import Price from '../public/Price';

const CommonRoutes = [
  {
    path: '/help',
    label: 'Help',
    position: 'right',
    component: Help,
  },
  {
    path: '/price',
    label: 'Price',
    position: 'right',
    component: Price,
  },
  {
    path: '/license',
    label: 'License',
    position: 'none',
    component: License,
  },
  {
    path: '*',
    label: '404',
    position: 'none',
    component: NotFound,
  },
];

export default CommonRoutes;

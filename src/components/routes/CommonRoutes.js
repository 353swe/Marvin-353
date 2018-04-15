import testForm from '../template/testForm';
import Help from '../public/Help';
import License from '../public/License';
import NotFound from '../public/NotFound';

const CommonRoutes = [
  {
    path: 'help',
    label: 'Help',
    position: 'right',
    component: Help,
  },
  {
    path: 'price',
    label: 'Price',
    position: 'right',
    component: testForm,
  },
  {
    path: 'license',
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

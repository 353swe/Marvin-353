import Index from '../public/Index'; // eslint-disable-line import/no-named-as-default
import Register from '../public/Register'; // eslint-disable-line import/no-named-as-default
import LoginPage from '../public/LoginPage'; // eslint-disable-line import/no-named-as-default

const PublicRoutes = [
  {
    path: '/',
    label: '/',
    position: 'none',
    component: Index,
  },
  {
    path: 'login',
    label: 'Login',
    position: 'left',
    component: LoginPage,
  },
  {
    path: 'request',
    label: 'Register',
    position: 'left',
    component: Register,
  },
];

export default PublicRoutes;

import Index from '../public/Index';
import Register from '../public/Register';
import LoginPage from '../public/LoginPage';

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

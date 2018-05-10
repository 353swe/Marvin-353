import AccountEnum from '../util/logic/AccountEnum';
import UniversityRoutes from './routes/UniversityRoutes';
import PublicRoutes from './routes/PublicRoutes';
import CommonRoutes from './routes/CommonRoutes';
import StudentRoutes from './routes/StudentRoutes';
import TeacherRoutes from './routes/TeacherRoutes';
import AdminRoutes from './routes/AdminRoutes';
import Logout from './public/Logout';


/**
 * @return {array} of Objects links/routes
 */
function RoutesFactory(userType) {
  let routes = [];
  switch (userType) {
    case AccountEnum.UNIVERSITY:
      routes = routes.concat(UniversityRoutes);
      break;
    case AccountEnum.STUDENT:
      routes = routes.concat(StudentRoutes);
      break;
    case AccountEnum.TEACHER:
      routes = routes.concat(TeacherRoutes);
      break;
    case AccountEnum.ADMIN:
      routes = routes.concat(AdminRoutes);
      break;
    default:
      routes = routes.concat(PublicRoutes);
      break;
  }
  if (userType !== null && userType !== AccountEnum.NOTLOGGED) {
    const logout = [
      {
        path: 'logout',
        label: 'Logout',
        position: 'right',
        component: Logout,
      },
    ];
    routes = routes.concat(logout);
  }
  return routes.concat(CommonRoutes);
}
export default RoutesFactory;

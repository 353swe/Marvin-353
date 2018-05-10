import { expect } from 'chai';
import CommonRoutes from '../../src/components/routes/CommonRoutes';
import AdminRoutes from '../../src/components/routes/AdminRoutes';
import StudentRoutes from '../../src/components/routes/StudentRoutes';
import PublicRoutes from '../../src/components/routes/PublicRoutes';
import UniversityRoutes from '../../src/components/routes/UniversityRoutes';
import TeacherRoutes from '../../src/components/routes/TeacherRoutes';
import RoutesFactory from '../../src/components/RoutesFactory';
import ROLES from '../../src/util/logic/AccountEnum';
import Logout from '../../src/components/public/Logout';

describe('PageContainer component', () => {
  const logout = [
    {
      path: 'logout',
      label: 'Logout',
      position: 'right',
      component: Logout,
    },
  ];
  // 3
  it('Should return university routes', () => {
    let routes = UniversityRoutes.concat(logout);
    routes = routes.concat(CommonRoutes);
    const universityRoutes = RoutesFactory(ROLES.UNIVERSITY);
    expect(universityRoutes).to.deep.equal(routes);
  });
  // 4
  it('Should return admin routes', () => {
    let routes = AdminRoutes.concat(logout);
    routes = routes.concat(CommonRoutes);
    const adminRoutes = RoutesFactory(ROLES.ADMIN);
    expect(adminRoutes).to.deep.equal(routes);
  });
  // 5
  it('Should return teacher routes', () => {
    let routes = TeacherRoutes.concat(logout);
    routes = routes.concat(CommonRoutes);
    const teacherRoutes = RoutesFactory(ROLES.TEACHER);
    expect(teacherRoutes).to.deep.equal(routes);
  });
  // 6
  it('Should return student routes', () => {
    let routes = StudentRoutes.concat(logout);
    routes = routes.concat(CommonRoutes);
    const studentRoutes = RoutesFactory(ROLES.STUDENT);
    expect(studentRoutes).to.deep.equal(routes);
  });
  // 7
  it('Should return public routes', () => {
    const routes = PublicRoutes.concat(CommonRoutes);
    const publicRoutes = RoutesFactory(ROLES.NOTLOGGED);
    expect(publicRoutes).to.deep.equal(routes);
  });
  // 8
  it('Should return public routes for UNCONFIRMED_STUDENT', () => {
    let routes = PublicRoutes.concat(logout);
    routes = routes.concat(CommonRoutes);
    const publicRoutes = RoutesFactory(ROLES.UNCONFIRMED_STUDENT);
    expect(publicRoutes).to.deep.equal(routes);
  });
  // 9
  it('Should return public routes for UNCONFIRMED_TEACHER', () => {
    let routes = PublicRoutes.concat(logout);
    routes = routes.concat(CommonRoutes);
    const publicRoutes = RoutesFactory(ROLES.UNCONFIRMED_TEACHER);
    expect(publicRoutes).to.deep.equal(routes);
  });
});

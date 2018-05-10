import Index from '../university/Index';
import UniversityAcademic from '../university/UniversityAcademic'; // eslint-disable-line import/no-named-as-default
import UniversityAdmin from '../university/UniversityAdmin'; // eslint-disable-line import/no-named-as-default

const UniversityRoutes = [
  {
    path: '/',
    label: '/',
    component: Index,
  },
  {
    path: 'admin',
    label: 'Admin',
    position: 'left',
    component: UniversityAdmin,
  },
  {
    path: 'academicyears',
    label: 'Years',
    position: 'left',
    component: UniversityAcademic,
  },
];

export default UniversityRoutes;

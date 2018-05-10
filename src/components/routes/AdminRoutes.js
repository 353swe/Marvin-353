import Index from '../admin/Index';
import AdminCourseExams from '../admin/AdminCourseExams'; // eslint-disable-line import/no-named-as-default
import AdminCourses from '../admin/AdminCourses'; // eslint-disable-line import/no-named-as-default
import ConfirmStudents from '../admin/ConfirmStudentUser';
import ConfirmTeachers from '../admin/ConfirmTeacherUser';
import AdminExams from '../admin/AdminExams'; // eslint-disable-line import/no-named-as-default
import SystemUsers from '../admin/SystemUsers'; // eslint-disable-line import/no-named-as-default

const AdminRoutes = [
  {
    path: '/',
    label: '/',
    position: 'none',
    component: Index,
  },
  {
    path: '/confirmStudents',
    label: 'Confirm Students',
    position: 'left',
    component: ConfirmStudents,
  },
  {
    path: '/confirmTeachers',
    label: 'Confirm Teachers',
    position: 'left',
    component: ConfirmTeachers,
  },
  {
    path: '/systemUsers',
    label: 'Manage Users',
    position: 'left',
    component: SystemUsers,
  },
  {
    path: '/courses/:examid',
    label: 'Course exam',
    position: 'none',
    component: AdminCourseExams,
  },
  {
    path: '/courses',
    label: 'Courses',
    position: 'left',
    component: AdminCourses,
  },
  {
    path: '/exams',
    label: 'Exams',
    position: 'left',
    component: AdminExams,
  },
];

export default AdminRoutes;

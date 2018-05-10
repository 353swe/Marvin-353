import Index from '../student/Index'; // eslint-disable-line import/no-named-as-default
import StudentExam from '../student/StudentExam'; // eslint-disable-line import/no-named-as-default
import OptionalExams from '../student/OptionalExams'; // eslint-disable-line import/no-named-as-default

const StudentRoutes = [
  {
    path: '/',
    label: '/',
    position: 'none',
    component: Index,
  },
  {
    path: '/exams',
    label: 'Exams',
    position: 'left',
    component: StudentExam,
  },
  {
    path: '/optionalexams',
    label: 'Optional Exams',
    position: 'left',
    component: OptionalExams,
  },
];

export default StudentRoutes;

import Index from '../teacher/Index'; // eslint-disable-line import/no-named-as-default
import TeacherExams from '../teacher/TeacherExams'; // eslint-disable-line import/no-named-as-default
import TeacherExamStudents from '../teacher/TeacherExamStudents'; // eslint-disable-line import/no-named-as-default

const TeacherRoutes = [
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
    component: TeacherExams,
  },
  {
    path: '/exams/:examid',
    label: 'Exams attendances',
    position: 'none',
    component: TeacherExamStudents,
  },
];

export default TeacherRoutes;

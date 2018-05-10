import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import Admin from './ducks/Admin';
import AdminEmployer from './ducks/AdminEmployer';
import Session from './ducks/Session';
import Student from './ducks/Student';
import Metamask from './ducks/Metamask';
import ManageYears from './ducks/ManageYears';
import Booking from './ducks/Booking';
import Evaluator from './ducks/Evaluator';
import TeacherExam from './ducks/TeacherExam';
import TeachersList from './ducks/TeachersList';
import Course from './ducks/Course';
import CourseExams from './ducks/CourseExams';
import ExamsList from './ducks/ExamsList';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['routing', 'form'],
};


// main reducers
const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  accounts: Admin,
  course: Course,
  courseExams: CourseExams,
  exams: ExamsList,
  metamask: Metamask,
  user: Session,
  university: AdminEmployer,
  manageYears: ManageYears,
  signup: Booking,
  selectedExam: Evaluator,
  teacherData: TeacherExam,
  teachersList: TeachersList,
  student: Student,
});

const persistentReducer = persistReducer(persistConfig, reducers);

export default persistentReducer;

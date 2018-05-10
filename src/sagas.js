import { fork } from 'redux-saga/effects';
import Admin from './sagas/AdminSaga';
import AdminEmployer from './sagas/AdminEmployerSaga';
import Session from './sagas/SessionSaga';
import ManageYears from './sagas/ManageYearsSaga';
import Booking from './sagas/BookingSaga';
import Evaluator from './sagas/EvaluatorSaga';
import TeacherExam from './sagas/TeacherExamSaga';
import Course from './sagas/CourseSaga';
import ManageExams from './sagas/ManageExamsSaga';
import Student from './sagas/StudentSaga';


export default function* sagas() {
  yield [
    fork(Admin),
    fork(AdminEmployer),
    fork(Session),
    fork(ManageYears),
    fork(Booking),
    fork(Evaluator),
    fork(TeacherExam),
    fork(Course),
    fork(ManageExams),
    fork(Student),
  ];
}

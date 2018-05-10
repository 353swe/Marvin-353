import { call, put, fork, takeLatest, all } from 'redux-saga/effects';
import { creators as actionCreators } from '../ducks/Booking';
import { creators as sessionCreators } from '../sagas/SessionSaga';
import * as Session from '../web3calls/Session';
import * as UniversityYear from '../web3calls/UniversityYear';
import * as Year from '../web3calls/Year';
import * as Course from '../web3calls/Course';

const actionType = type => `marvin/BookingSaga/${type}`;
const SIGNUP = actionType('SIGNUP');
const LOAD = actionType('LOAD');

export function* loadCourses({ year }) {
  yield put(actionCreators.listIsLoading());
  try {
    const yearContract = yield call(UniversityYear.getAcademicYearContractByYear, year);
    const courseNumber = yield call(Year.getCourseNumber, yearContract);
    const coursesFetch = Array(Number(courseNumber)).fill().map((_, index) => (
      call(Year.getCourseContractAt, yearContract, index)
    ));
    const courseAddresses = yield all(coursesFetch);
    const coursesNameFetch = courseAddresses.map(addr => (
      call(Course.getName, addr)
    ));
    const coursesNames = yield all(coursesNameFetch);
    yield put(actionCreators.setCoursesAddress(courseAddresses));
    yield put(actionCreators.setCoursesNames(coursesNames));
  } catch (e) {
    yield put(actionCreators.listHasErrored());
  }
}
export function* signUp({ name, surname, course }) {
  yield put(actionCreators.signUpLoading());
  try {
    yield call(Session.signUp, name, surname, course);
    yield put(sessionCreators.loginAction());
  } catch (e) {
    yield put(actionCreators.signUpErrored());
  }
}

export const creators = {
  performSignUp: (name, surname, course) => (
    {
      type: SIGNUP, name, surname, course,
    }
  ),
  performLoad: year => (
    { type: LOAD, year }
  ),
};

export default function* handler() {
  yield [
    fork(takeLatest, LOAD, loadCourses),
    fork(takeLatest, SIGNUP, signUp),
  ];
}

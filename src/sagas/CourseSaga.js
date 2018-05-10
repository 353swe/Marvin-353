import { call, put, fork, all, takeLatest, takeEvery } from 'redux-saga/effects';
import { creators as actionCreators } from '../ducks/Course';
import { getCourseNumber, getCourseContractAt, addNewCourse } from '../web3calls/Year';
import { getAcademicYearNumber, getAcademicYearContractAt, getAcademicYearContractByYear } from '../web3calls/UniversityYear';
import { getName, getSolarYear, getCreditsToGraduate } from '../web3calls/Course';

const actionType = type => `marvin/CourseSaga/${type}`;

export const GET_ALL_COURSES = actionType('GET_ALL_COURSES');
export const ADD_NEW_COURSE = actionType('ADD_NEW_COURSE');

export function* getCourses() {
  yield put(actionCreators.listIsLoading());
  try {
    let num = yield call(getAcademicYearNumber);
    num = Number(num);
    const apiYearContractsCall = Array(num).fill().map((_, i) =>
      call(getAcademicYearContractAt, i));
    const YearContracts = yield all(apiYearContractsCall);
    const apiCourseNumberCall = Array(num).fill().map((_, i) =>
      call(getCourseNumber, YearContracts[i]));
    const numberOfCourses = yield all(apiCourseNumberCall);
    const apiCourseContractsCall = Array(num).fill().map((_, i) =>
      Array(numberOfCourses[i]).fill().map((_2, j) =>
        call(getCourseContractAt, YearContracts[i], j))).flatten();
    const CourseContracts = yield all(apiCourseContractsCall);
    console.log(CourseContracts);
    const apiNameCall = Array(CourseContracts.length).fill().map((_, i) =>
      call(getName, CourseContracts[i]));
    const names = yield all(apiNameCall);
    const apiYearCall = Array(CourseContracts.length).fill().map((_, i) =>
      call(getSolarYear, CourseContracts[i]));
    const years = yield all(apiYearCall);
    const apiCreditsCall = Array(CourseContracts.length).fill().map((_, i) =>
      call(getCreditsToGraduate, CourseContracts[i]));
    const credits = yield all(apiCreditsCall);
    const courses = Array(CourseContracts.length).fill().map((_, i) => ({
      address: CourseContracts[i],
      name: names[i],
      year: years[i],
      credits: credits[i],
    }));
    // console.log(courses);
    yield put(actionCreators.setCoursesList(courses));
  } catch (e) {
    console.log('Failed!');
    yield put(actionCreators.listHasErrored());
  }
}

export function* addCourse(action) {
  yield put(actionCreators.listIsLoading());
  try {
    const contract = yield call(getAcademicYearContractByYear, action.year);
    yield call(addNewCourse, contract, action.name, action.credits);
    yield put(actionCreators.pushNewCourse());
  } catch (e) {
    console.log('Failed!');
    yield put(actionCreators.listHasErrored());
  }
}

export const creators = {
  getAllCourses: () => (
    { type: GET_ALL_COURSES }
  ),
  addNewCourse: (year, name, credits) => (
    {
      type: ADD_NEW_COURSE, year, name, credits,
    }
  ),
};

export default function* handler() {
  yield [
    fork(takeEvery, ADD_NEW_COURSE, addCourse),
    fork(takeLatest, GET_ALL_COURSES, getCourses),
  ];
}

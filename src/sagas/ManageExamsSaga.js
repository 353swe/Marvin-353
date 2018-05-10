import { call, put, fork, all, takeLatest, takeEvery } from 'redux-saga/effects';
import { creators as CourseCreators } from '../ducks/CourseExams';
import { creators as TeacherCreators } from '../ducks/TeachersList';
import { creators as ExamsCreators } from '../ducks/ExamsList';
import * as UniversityExam from '../web3calls/UniversityExam';
import * as UniversityYear from '../web3calls/UniversityYear';
import * as Year from '../web3calls/Year';
import * as UniversityTeacher from '../web3calls/UniversityTeacher';
import * as Course from '../web3calls/Course';
import * as Getters from './helpers/getters';

const actionType = type => `marvin/ManageExamsSaga/${type}`;
const ADD_NEW_EXAM = actionType('ADD_NEW_EXAM');
const GET_ALL_EXAMS = actionType('GET_ALL_EXAMS');
const GET_EXAMS_BY_COURSE = actionType('GET_EXAMS_BY_COURSE');
const GET_TEACHERS = actionType('GET_TEACHERS');
const APTCE = actionType('ASSOCIATE_PROFESSOR_TO_COURSE_EXAM');
const APTE = actionType('ASSOCIATE_PROFESSOR_TO_EXAM');

const courseTeacherAdapter = exam => (
  Object.assign(
    exam,
    {
      professorName: exam.teacherName,
      professorSurname: exam.teacherSurname,
      professorAddress: exam.professorAddress,
    },
  )
);

export function* addNewExam({
  courseAddress, name, credits, mandatory,
}) {
  try {
    yield put(CourseCreators.listIsLoading());
    // NOT mandatory because it's the opposite of optional
    yield call(Course.addNewExam, courseAddress, name, credits, !mandatory);
    yield put(CourseCreators.examInserted());
  } catch (e) {
    yield put(CourseCreators.listHasErrored());
  }
}
export function* getAllExams({ solarYear }) {
  try {
    yield put(ExamsCreators.listIsLoading());
    const yearAddress = yield call(UniversityYear.getAcademicYearContractByYear, solarYear);
    const courseCount = yield call(Year.getCourseNumber, yearAddress);
    const coursesFetch = Array(Number(courseCount)).fill().map((_, id) => (
      call(Year.getCourseContractAt, yearAddress, id)
    ));
    const exams = [];
    const coursesAddresses = yield all(coursesFetch);
    const examsFetch = coursesAddresses.map(courseAddress => (
      call(Getters.getCourseExamsList, courseAddress, courseTeacherAdapter)
    ));
    const coursesDataFetch = coursesAddresses.map(courseAddress => (
      call(Getters.getCourseData, courseAddress)
    ));
    const examsByCourse = yield all(examsFetch);
    const coursesData = yield all(coursesDataFetch);
    for (let courseIndex = 0; courseIndex < coursesData.length; courseIndex += 1) {
      for (let examIndex = 0; examIndex < examsByCourse[courseIndex].length; examIndex += 1) {
        exams.push(Object.assign(
          {},
          coursesData[courseIndex],
          examsByCourse[courseIndex][examIndex],
        ));
      }
    }
    yield put(ExamsCreators.setList(exams));
  } catch (e) {
    console.log(e);
    yield put(ExamsCreators.listHasErrored());
  }
}
export function* getExamsByCourse({ courseAddress }) {
  try {
    yield put(CourseCreators.listIsLoading());
    const examsList = yield call(Getters.getCourseExamsList, courseAddress, courseTeacherAdapter);
    yield put(CourseCreators.setList(examsList));
  } catch (e) {
    yield put(CourseCreators.listHasErrored());
  }
}
export function* getTeachers() {
  try {
    yield put(TeacherCreators.listIsLoading());
    const teacherCount = yield call(UniversityTeacher.getTeacherNumber);
    const teacherAddressFetch = Array(Number(teacherCount)).fill().map((_, id) => (
      call(UniversityTeacher.getTeacherContractAddressAt, id)
    ));
    const teacherAddresses = yield all(teacherAddressFetch);
    const teacherDataFetch = teacherAddresses.map(address => call(Getters.getTeacherData, address));
    const teachersData = yield all(teacherDataFetch);
    yield put(TeacherCreators.setList(teachersData));
  } catch (e) {
    yield put(TeacherCreators.listHasErrored());
  }
}
export function* associateProfessor(examAddress, teacherAddress) {
  yield call(UniversityExam.associateTeacherToExam, teacherAddress, examAddress);
  const teacherData = yield call(Getters.getTeacherData, teacherAddress);
  return {
    professorAddress: teacherData.address,
    professorName: teacherData.name,
    professorSurname: teacherData.surname,
  };
}
function* associateProfessorTo(examAddress, teacherAddress, creators) {
  try {
    yield put(creators.listIsLoading());
    const teacher = yield call(associateProfessor, examAddress, teacherAddress);
    yield put(creators.setProfessor(examAddress, teacher));
  } catch (e) {
    yield put(creators.listHasErrored());
  }
}
export function* associateProfessorToExam({ examAddress, teacherAddress }) {
  yield call(associateProfessorTo, examAddress, teacherAddress, ExamsCreators);
}
export function* associateProfessorToCourseExam({ examAddress, teacherAddress }) {
  yield call(associateProfessorTo, examAddress, teacherAddress, CourseCreators);
}
export const creators = {
  addNewExamAction: (courseAddress, name, credits, mandatory) => (
    {
      type: ADD_NEW_EXAM,
      courseAddress,
      name,
      credits,
      mandatory,
    }
  ),
  getAllExamsAction: solarYear => (
    { type: GET_ALL_EXAMS, solarYear }
  ),
  getExamsByCourseAction: courseAddress => (
    { type: GET_EXAMS_BY_COURSE, courseAddress }
  ),
  getTeachers: () => (
    { type: GET_TEACHERS }
  ),
  associateProfessorToExamAction: (examAddress, teacherAddress) => (
    { type: APTE, examAddress, teacherAddress }
  ),
  associateProfessorToCourseExamAction: (examAddress, teacherAddress) => (
    { type: APTCE, examAddress, teacherAddress }
  ),
};

export default function* handler() {
  yield [
    fork(takeEvery, ADD_NEW_EXAM, addNewExam),
    fork(takeLatest, GET_ALL_EXAMS, getAllExams),
    fork(takeLatest, GET_EXAMS_BY_COURSE, getExamsByCourse),
    fork(takeLatest, GET_TEACHERS, getTeachers),
    fork(takeEvery, APTE, associateProfessorToExam),
    fork(takeEvery, APTCE, associateProfessorToCourseExam),
  ];
}

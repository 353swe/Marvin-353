import { call, put, fork, all, takeEvery, takeLatest } from 'redux-saga/effects';
import { creators as actionCreators } from '../ducks/Admin';
import {
  getStudentContractAddressAt, getStudentNumber, getNotApprovedStudentNumber,
  getNotApprovedStudentContractAddressAt,
  confirmStudent, removeStudent, denyStudent,
} from '../web3calls/UniversityStudent';

import {
  getTeacherContractAddressAt, getTeacherNumber,
  getNotApprovedTeacherNumber, getNotApprovedTeacherContractAddressAt,
  confirmTeacher, removeTeacher, denyTeacher,
} from '../web3calls/UniversityTeacher';

import { getName, getSurname, getPublicAddress } from '../web3calls/User';

import { getCourseContract } from '../web3calls/Student';
import { getName as getCourseName } from '../web3calls/Course';

import ROLES from '../util/logic/AccountEnum';


const actionType = type => `marvin/AdminSaga/${type}`;

export const GET_STUDENTS_LIST = actionType('GET_STUDENTS_LIST');
export const GET_TEACHERS_LIST = actionType('GET_TEACHERS_LIST');
export const GET_PENDING_STUDENTS_LIST = actionType('GET_PENDING_STUDENTS_LIST');
export const GET_PENDING_TEACHERS_LIST = actionType('GET_PENDING_TEACHERS_LIST');
export const APPROVE_USER = actionType('APPROVE_USER');
export const DELETE_USER = actionType('DELETE_USER');
export const DENY_USER = actionType('DENY_USER');

export function* getAllStudents() {
  yield put(actionCreators.listIsLoading());
  try {
    let num = yield call(getStudentNumber);
    num = Number(num);
    const apiCalls = Array(num).fill().map((_, i) => call(getStudentContractAddressAt, i));
    const studentsContracts = yield all(apiCalls);
    const apiNameCalls = Array(num).fill().map((_, i) =>
      call(getName, String(studentsContracts[i])));
    const studentsName = (yield all(apiNameCalls));
    const apiSurnameCalls = Array(num).fill().map((_, i) =>
      call(getSurname, String(studentsContracts[i])));
    const studentsSurname = (yield all(apiSurnameCalls));
    const apiCourseCalls = Array(num).fill().map((_, i) =>
      call(getCourseContract, String(studentsContracts[i])));
    const studentsCourseContract = yield all(apiCourseCalls);
    const apiCourseNameCalls = Array(num).fill().map((_, i) =>
      call(getCourseName, String(studentsCourseContract[i])));
    const studentsCourse = (yield all(apiCourseNameCalls));
    const apiPublicAddressCalls = Array(num).fill().map((_, i) =>
      call(getPublicAddress, String(studentsContracts[i])));
    const studentsPublicAddress = (yield all(apiPublicAddressCalls));
    const students = Array(num).fill().map((_, i) => ({
      contract: studentsContracts[i],
      address: studentsPublicAddress[i],
      name: studentsName[i],
      surname: studentsSurname[i],
      course: studentsCourse[i],
    }));
    // console.log(students);
    yield put(actionCreators.setStudentsList(students));
  } catch (e) {
    console.log(e);
    yield put(actionCreators.listHasErrored());
  }
}
export function* getPendingStudents() {
  yield put(actionCreators.listIsLoading());
  try {
    console.log('START');
    let num = yield call(getNotApprovedStudentNumber);
    console.log(num);
    num = Number(num);
    const apiCalls = Array(num).fill().map((_, i) =>
      call(getNotApprovedStudentContractAddressAt, i));
    const pendingStudentsContracts = yield all(apiCalls);

    const apiNameCalls = Array(num).fill().map((_, i) =>
      call(getName, String(pendingStudentsContracts[i])));
    const pendingStudentsName = (yield all(apiNameCalls));
    const apiSurnameCalls = Array(num).fill().map((_, i) =>
      call(getSurname, String(pendingStudentsContracts[i])));
    const pendingStudentsSurname = (yield all(apiSurnameCalls));
    const apiCourseCalls = Array(num).fill().map((_, i) =>
      call(getCourseContract, String(pendingStudentsContracts[i])));
    const pendingStudentsCourseContract = yield all(apiCourseCalls);
    const apiCourseNameCalls = Array(num).fill().map((_, i) =>
      call(getCourseName, String(pendingStudentsCourseContract[i])));
    const pendingStudentsCourse = (yield all(apiCourseNameCalls));
    const apiPublicAddressCalls = Array(num).fill().map((_, i) =>
      call(getPublicAddress, String(pendingStudentsContracts[i])));
    const pendingStudentsPublicAddress = (yield all(apiPublicAddressCalls));
    const pendingStudents = Array(num).fill().map((_, i) => ({
      contract: pendingStudentsContracts[i],
      address: pendingStudentsPublicAddress[i],
      name: pendingStudentsName[i],
      surname: pendingStudentsSurname[i],
      course: pendingStudentsCourse[i],
    }));
    // console.log(pendingStudents);
    yield put(actionCreators.setPendingStudentsList(pendingStudents));
  } catch (e) {
    console.log('Failed!');
    yield put(actionCreators.listHasErrored());
  }
}

export function* getAllTeachers() {
  yield put(actionCreators.listIsLoading());
  try {
    let num = yield call(getTeacherNumber);
    num = Number(num);
    const apiCalls = Array(num).fill().map((_, i) => call(getTeacherContractAddressAt, i));
    const teachersContracts = yield all(apiCalls);
    const apiNameCalls = Array(num).fill().map((_, i) =>
      call(getName, String(teachersContracts[i])));
    const teachersName = (yield all(apiNameCalls));
    const apiSurnameCalls = Array(num).fill().map((_, i) =>
      call(getSurname, String(teachersContracts[i])));
    const teachersSurname = (yield all(apiSurnameCalls));
    const apiPublicAddressCalls = Array(num).fill().map((_, i) =>
      call(getPublicAddress, String(teachersContracts[i])));
    const teachersPublicAddress = (yield all(apiPublicAddressCalls));
    const teachers = Array(num).fill().map((_, i) => ({
      contract: teachersContracts[i],
      address: teachersPublicAddress[i],
      name: teachersName[i],
      surname: teachersSurname[i],
    }));
    // console.log(teachers);
    yield put(actionCreators.setTeachersList(teachers));
  } catch (e) {
    console.log('Failed!');
    yield put(actionCreators.listHasErrored());
  }
}

export function* getPendingTeachers() {
  yield put(actionCreators.listIsLoading());
  try {
    let num = yield call(getNotApprovedTeacherNumber);
    num = Number(num);
    const apiCalls = Array(num).fill().map((_, i) =>
      call(getNotApprovedTeacherContractAddressAt, i));
    const pendingTeachersContracts = yield all(apiCalls);
    const apiNameCalls = Array(num).fill().map((_, i) =>
      call(getName, String(pendingTeachersContracts[i])));
    const pendingTeachersName = (yield all(apiNameCalls));
    const apiSurnameCalls = Array(num).fill().map((_, i) =>
      call(getSurname, String(pendingTeachersContracts[i])));
    const pendingTeachersSurname = (yield all(apiSurnameCalls));
    const apiPublicAddressCalls = Array(num).fill().map((_, i) =>
      call(getPublicAddress, String(pendingTeachersContracts[i])));
    const pendingTeachersPublicAddress = (yield all(apiPublicAddressCalls));
    const pendingTeachers = Array(num).fill().map((_, i) => ({
      contract: pendingTeachersContracts[i],
      address: pendingTeachersPublicAddress[i],
      name: pendingTeachersName[i],
      surname: pendingTeachersSurname[i],
    }));
    // console.log(pendingTeachers);
    yield put(actionCreators.setPendingTeachersList(pendingTeachers));
  } catch (e) {
    console.log('Failed!');
    yield put(actionCreators.listHasErrored());
  }
}

export function* approveUser(action) {
  yield put(actionCreators.listIsLoading());
  try {
    const contractData = action.address;
    const addressData = yield call(getPublicAddress, action.address);
    const nameData = yield call(getName, action.address);
    const surnameData = yield call(getSurname, action.address);
    const userData = {
      contract: contractData,
      address: addressData,
      name: nameData,
      surname: surnameData,
    };
    if (action.role === ROLES.UNCONFIRMED_STUDENT) {
      yield call(confirmStudent, action.address);
      const course = yield call(getCourseContract, action.address);
      userData.course = yield call(getCourseName, course);
    } else if (action.role === ROLES.UNCONFIRMED_TEACHER) {
      yield call(confirmTeacher, action.address);
    }
    yield put(actionCreators.confirmUser(action.role, contractData, userData));
  } catch (e) {
    console.log('Failed!');
    yield put(actionCreators.listHasErrored());
  }
}

export function* deleteUser(action) {
  yield put(actionCreators.listIsLoading());
  try {
    if (action.role === ROLES.STUDENT) {
      yield call(removeStudent, action.address);
    } else if (action.role === ROLES.TEACHER) {
      yield call(removeTeacher, action.address);
    }
    yield put(actionCreators.removeUser(action.role, action.address));
  } catch (e) {
    console.log(e);
    yield put(actionCreators.listHasErrored());
  }
}

export function* denyUser(action) {
  yield put(actionCreators.listIsLoading());
  try {
    if (action.role === ROLES.UNCONFIRMED_STUDENT) {
      yield call(denyStudent, action.address);
    } else if (action.role === ROLES.UNCONFIRMED_TEACHER) {
      yield call(denyTeacher, action.address);
    }
    yield put(actionCreators.unconfirmUser(action.role, action.address));
  } catch (e) {
    console.log('Failed!');
    yield put(actionCreators.listHasErrored());
  }
}

export const creators = {
  getAllStudentsAction: () => (
    { type: GET_STUDENTS_LIST }
  ),
  getAllTEachersAction: () => (
    { type: GET_TEACHERS_LIST }
  ),
  getPendingStudentsAction: () => (
    { type: GET_PENDING_STUDENTS_LIST }
  ),
  getPendingTEachersAction: () => (
    { type: GET_PENDING_TEACHERS_LIST }
  ),
  approveUserAction: (role, address) => (
    { type: APPROVE_USER, role, address }
  ),
  removeUserAction: (role, address) => (
    { type: DELETE_USER, role, address }
  ),
  denyUserAction: (role, address) => (
    { type: DENY_USER, role, address }
  ),
};

export default function* handler() {
  yield [
    fork(takeEvery, DELETE_USER, deleteUser),
    fork(takeEvery, DENY_USER, denyUser),
    fork(takeEvery, APPROVE_USER, approveUser),
    fork(takeLatest, GET_STUDENTS_LIST, getAllStudents),
    fork(takeLatest, GET_TEACHERS_LIST, getAllTeachers),
    fork(takeLatest, GET_PENDING_STUDENTS_LIST, getPendingStudents),
    fork(takeLatest, GET_PENDING_TEACHERS_LIST, getPendingTeachers),
  ];
}

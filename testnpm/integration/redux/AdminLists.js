import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import reducer, { creators } from '../../../src/ducks/Admin';
import * as sagas from '../../../src/sagas/AdminSaga';
import * as User from '../../../src/web3calls/User';
import * as Students from '../../../src/web3calls/UniversityStudent';
import { getCourseContract } from '../../../src/web3calls/Student';
import { getName } from '../../../src/web3calls/Course';
import * as Teachers from '../../../src/web3calls/UniversityTeacher';

const failedState =
  {
    loading: false,
    errored: true,
    studentsList: [],
    teachersList: [],
    pendingStudentsList: [],
    pendingTeachersList: [],
  };

describe('Admin lists', () => {
  it('should get all the students', () => expectSaga(sagas.getAllStudents, sagas.creators.getAllStudentsAction())
    .withReducer(reducer)
    .provide({
      call: (effect, next) => {
        if (effect.fn === Students.getStudentNumber) return 2;
        if (effect.fn === Students.getStudentContractAddressAt) {
          if (effect.args[0] === 0) return 'pippo';
          if (effect.args[0] === 1) return 'pluto';
        }
        if (effect.fn === User.getName) {
          if (effect.args[0] === 'pippo') return 'gambadilegno';
          if (effect.args[0] === 'pluto') return 'macchianera';
        }
        if (effect.fn === User.getSurname) {
          if (effect.args[0] === 'pippo') return 'plottigat';
          if (effect.args[0] === 'pluto') return 'bassotti';
        }
        if (effect.fn === getCourseContract) {
          if (effect.args[0] === 'pippo') return '0x0000';
          if (effect.args[0] === 'pluto') return '0x0001';
        }
        if (effect.fn === getName) {
          if (effect.args[0] === '0x0000') return 'ingegneria';
          if (effect.args[0] === '0x0001') return 'comunicazione';
        }
        if (effect.fn === User.getPublicAddress) {
          if (effect.args[0] === 'pippo') return '99999';
          if (effect.args[0] === 'pluto') return '88888';
        }
        return next();
      },
    })
    .hasFinalState({
      loading: false,
      errored: false,
      studentsList:
        [
          {
            contract: 'pippo',
            address: '99999',
            name: 'gambadilegno',
            surname: 'plottigat',
            course: 'ingegneria',
          },
          {
            contract: 'pluto',
            address: '88888',
            name: 'macchianera',
            surname: 'bassotti',
            course: 'comunicazione',
          }],
      teachersList: [],
      pendingStudentsList: [],
      pendingTeachersList: [],
    })
    .put(creators.listIsLoading())
    .run());
  it('should get an error if something goes wrong', () => expectSaga(sagas.getAllStudents, sagas.creators.getAllStudentsAction())
    .withReducer(reducer)
    .provide({
      call: (effect, next) => {
        if (effect.fn === Students.getStudentNumber) throwError(new Error());
        return next();
      },
    })
    .hasFinalState(failedState)
    .put(creators.listIsLoading())
    .run());
  it('should get all the pending students', () => expectSaga(sagas.getPendingStudents, sagas.creators.getPendingStudentsAction())
    .withReducer(reducer)
    .provide({
      call: (effect, next) => {
        if (effect.fn === Students.getNotApprovedStudentNumber) return 2;
        if (effect.fn === Students.getNotApprovedStudentContractAddressAt) {
          if (effect.args[0] === 0) return 'cane';
          if (effect.args[0] === 1) return 'gatto';
        }
        if (effect.fn === User.getName) {
          if (effect.args[0] === 'cane') return 'red';
          if (effect.args[0] === 'gatto') return 'toby';
        }
        if (effect.fn === User.getSurname) {
          if (effect.args[0] === 'cane') return 'tom';
          if (effect.args[0] === 'gatto') return 'jetty';
        }
        if (effect.fn === getCourseContract) {
          if (effect.args[0] === 'cane') return 'willie';
          if (effect.args[0] === 'gatto') return 'duffy';
        }
        if (effect.fn === getName) {
          if (effect.args[0] === 'willie') return 'geologia';
          if (effect.args[0] === 'duffy') return 'medicina';
        }
        if (effect.fn === User.getPublicAddress) {
          if (effect.args[0] === 'cane') return '333333';
          if (effect.args[0] === 'gatto') return '444444';
        }
        return next();
      },
    })
    .hasFinalState({
      loading: false,
      errored: false,
      studentsList: [],
      teachersList: [],
      pendingStudentsList: [
        {
          contract: 'cane',
          address: '333333',
          name: 'red',
          surname: 'tom',
          course: 'geologia',
        },
        {
          contract: 'gatto',
          address: '444444',
          name: 'toby',
          surname: 'jetty',
          course: 'medicina',
        }],
      pendingTeachersList: [],
    })
    .put(creators.listIsLoading())
    .run());
  it('should get an error if something goes wrong', () => expectSaga(sagas.getPendingStudents, sagas.creators.getPendingStudentsAction())
    .withReducer(reducer)
    .provide({
      call: (effect, next) => {
        if (effect.fn === Students.getNotApprovedStudentNumber) throwError(new Error());
        return next();
      },
    })
    .hasFinalState(failedState)
    .put(creators.listIsLoading())
    .run());
  it('should get all the teachers', () => expectSaga(sagas.getAllTeachers, sagas.creators.getAllTEachersAction())
    .withReducer(reducer)
    .provide({
      call: (effect, next) => {
        if (effect.fn === Teachers.getTeacherNumber) return 2;
        if (effect.fn === Teachers.getTeacherContractAddressAt) {
          if (effect.args[0] === 0) return 'luca';
          if (effect.args[0] === 1) return 'marco';
        }
        if (effect.fn === User.getName) {
          if (effect.args[0] === 'luca') return 'paperoga';
          if (effect.args[0] === 'marco') return 'sgrizzo';
        }
        if (effect.fn === User.getSurname) {
          if (effect.args[0] === 'luca') return 'turner';
          if (effect.args[0] === 'marco') return 'sparrow';
        }
        if (effect.fn === User.getPublicAddress) {
          if (effect.args[0] === 'luca') return '111111';
          if (effect.args[0] === 'marco') return '222222';
        }
        return next();
      },
    })
    .hasFinalState({
      loading: false,
      errored: false,
      studentsList: [],
      teachersList: [
        {
          contract: 'luca',
          address: '111111',
          name: 'paperoga',
          surname: 'turner',
        },
        {
          contract: 'marco',
          address: '222222',
          name: 'sgrizzo',
          surname: 'sparrow',
        }],
      pendingStudentsList: [],
      pendingTeachersList: [],
    })
    .put(creators.listIsLoading())
    .run());
  it('should get an error if something goes wrong', () => expectSaga(sagas.getAllTeachers, sagas.creators.getAllTEachersAction())
    .withReducer(reducer)
    .provide({
      call: (effect, next) => {
        if (effect.fn === Teachers.getNotApprovedTeacherNumber) throwError(new Error());
        return next();
      },
    })
    .hasFinalState(failedState)
    .put(creators.listIsLoading())
    .run());
  it('should get all the pending teachers', () => expectSaga(sagas.getPendingTeachers, sagas.creators.getPendingTEachersAction())
    .withReducer(reducer)
    .provide({
      call: (effect, next) => {
        if (effect.fn === Teachers.getNotApprovedTeacherNumber) return 2;
        if (effect.fn === Teachers.getNotApprovedTeacherContractAddressAt) {
          if (effect.args[0] === 0) return 'ale';
          if (effect.args[0] === 1) return 'franz';
        }
        if (effect.fn === User.getName) {
          if (effect.args[0] === 'ale') return 'tonno';
          if (effect.args[0] === 'franz') return 'sgombro';
        }
        if (effect.fn === User.getSurname) {
          if (effect.args[0] === 'ale') return 'mucca';
          if (effect.args[0] === 'franz') return 'toro';
        }
        if (effect.fn === User.getPublicAddress) {
          if (effect.args[0] === 'ale') return '555555';
          if (effect.args[0] === 'franz') return '6666666';
        }
        return next();
      },
    })
    .hasFinalState({
      loading: false,
      errored: false,
      studentsList: [],
      teachersList: [],
      pendingStudentsList: [],
      pendingTeachersList: [
        {
          contract: 'ale',
          address: '555555',
          name: 'tonno',
          surname: 'mucca',
        },
        {
          contract: 'franz',
          address: '6666666',
          name: 'sgombro',
          surname: 'toro',
        }],
    })
    .put(creators.listIsLoading())
    .run());
  it('should get an error if something goes wrong', () => expectSaga(sagas.getPendingTeachers, sagas.creators.getPendingTEachersAction())
    .withReducer(reducer)
    .provide({
      call: (effect, next) => {
        if (effect.fn === Teachers.getNotApprovedTeacherNumber) throwError(new Error());
        return next();
      },
    })
    .hasFinalState(failedState)
    .put(creators.listIsLoading())
    .run());
});

import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import reducer, { creators } from '../../../src/ducks/Admin';
import * as sagas from '../../../src/sagas/AdminSaga';
import * as User from '../../../src/web3calls/User';
import * as Students from '../../../src/web3calls/UniversityStudent';
import { getCourseContract } from '../../../src/web3calls/Student';
import { getName } from '../../../src/web3calls/Course';
import * as Teachers from '../../../src/web3calls/UniversityTeacher';
import ROLES from '../../../src/util/logic/AccountEnum';

const failedState = {
  loading: false,
  errored: true,
  studentsList: [],
  teachersList: [],
  pendingStudentsList: [],
  pendingTeachersList: [],
};

const filledState = {
  loading: false,
  errored: false,
  studentsList: [
    {
      contract: 'contratto1',
      address: 'indirizzo1',
      name: 'pippo',
      surname: 'inzaghi',
      course: 'farmacia',
    }],
  teachersList: [
    {
      contract: 'contratto2',
      address: 'indirizzo2',
      name: 'fabio',
      surname: 'cannavaro',
    }],
  pendingStudentsList: [
    {
      contract: 'contratto3',
      address: 'indirizzo3',
      name: 'gianluca',
      surname: 'zambrotta',
      course: 'informatica',
    }],
  pendingTeachersList: [
    {
      contract: 'contratto4',
      address: 'indirizzo4',
      name: 'rino',
      surname: 'gattuso',
    }],
};

describe('Admin approve', () => {
  describe('Confirm a user', () => {
    // 45
    it('should confirm the selected student', () => expectSaga(sagas.approveUser, sagas.creators.approveUserAction(ROLES.UNCONFIRMED_STUDENT, 'contratto3'))
      .withReducer(reducer, filledState)
      .provide({
        call: (effect, next) => {
          if (effect.fn === User.getPublicAddress) return 'indirizzo3';
          if (effect.fn === User.getName) return 'gianluca';
          if (effect.fn === User.getSurname) return 'zambrotta';
          if (effect.fn === Students.confirmStudent) return true;
          if (effect.fn === getCourseContract) return '00000';
          if (effect.fn === getName) return 'informatica';
          return next();
        },
      })
      .hasFinalState({
        loading: false,
        errored: false,
        studentsList: [
          {
            contract: 'contratto1',
            address: 'indirizzo1',
            name: 'pippo',
            surname: 'inzaghi',
            course: 'farmacia',
          },
          {
            contract: 'contratto3',
            address: 'indirizzo3',
            name: 'gianluca',
            surname: 'zambrotta',
            course: 'informatica',
          }],
        teachersList: [
          {
            contract: 'contratto2',
            address: 'indirizzo2',
            name: 'fabio',
            surname: 'cannavaro',
          }],
        pendingStudentsList: [],
        pendingTeachersList: [
          {
            contract: 'contratto4',
            address: 'indirizzo4',
            name: 'rino',
            surname: 'gattuso',
          }],
      })
      .put(creators.listIsLoading())
      .run());
    // 46
    it('should confirm the selected teacher', () => expectSaga(sagas.approveUser, sagas.creators.approveUserAction(ROLES.UNCONFIRMED_TEACHER, 'contratto4'))
      .withReducer(reducer, filledState)
      .provide({
        call: (effect, next) => {
          if (effect.fn === User.getPublicAddress) return 'indirizzo4';
          if (effect.fn === User.getName) return 'rino';
          if (effect.fn === User.getSurname) return 'gattuso';
          if (effect.fn === Teachers.confirmTeacher) return true;
          return next();
        },
      })
      .hasFinalState({
        loading: false,
        errored: false,
        studentsList: [
          {
            contract: 'contratto1',
            address: 'indirizzo1',
            name: 'pippo',
            surname: 'inzaghi',
            course: 'farmacia',
          },
        ],
        teachersList: [
          {
            contract: 'contratto2',
            address: 'indirizzo2',
            name: 'fabio',
            surname: 'cannavaro',
          },
          {
            contract: 'contratto4',
            address: 'indirizzo4',
            name: 'rino',
            surname: 'gattuso',
          }],
        pendingStudentsList: [
          {
            contract: 'contratto3',
            address: 'indirizzo3',
            name: 'gianluca',
            surname: 'zambrotta',
            course: 'informatica',
          }],
        pendingTeachersList: [],
      })
      .put(creators.listIsLoading())
      .run());
    // 47
    it('should fail if a student isn\'t in the pending list', () =>
      expectSaga(sagas.approveUser, sagas.creators.approveUserAction(ROLES.UNCONFIRMED_STUDENT, 'contratto5'))
        .withReducer(reducer)
        .provide({
          call: (effect, next) => {
            if (effect.fn === User.getPublicAddress) return 'indirizzo3';
            if (effect.fn === User.getName) return 'gianluca';
            if (effect.fn === User.getSurname) return 'zambrotta';
            if (effect.fn === Students.confirmStudent) throwError(new Error());
            if (effect.fn === getCourseContract) return '00000';
            if (effect.fn === getName) return 'informatica';
            return next();
          },
        })
        .hasFinalState(failedState)
        .run());
    // 48
    it('should fail if a teacher isn\'t in the pending list', () =>
      expectSaga(sagas.approveUser, sagas.creators.approveUserAction(ROLES.UNCONFIRMED_TEACHER, 'contratto5'))
        .withReducer(reducer)
        .provide({
          call: (effect, next) => {
            if (effect.fn === User.getPublicAddress) return 'indirizzo3';
            if (effect.fn === User.getName) return 'gianluca';
            if (effect.fn === User.getSurname) return 'zambrotta';
            if (effect.fn === Teachers.confirmTeacher) throwError(new Error());
            return next();
          },
        })
        .hasFinalState(failedState)
        .run());
  });
});

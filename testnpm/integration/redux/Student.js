import { expectSaga } from 'redux-saga-test-plan';
import reducer, { creators } from '../../../src/ducks/Student';
import * as sagas from '../../../src/sagas/StudentSaga';
import * as Student from '../../../src/web3calls/Student';
import { getCredits } from '../../../src/web3calls/Exam';
import { getExamData } from '../../../src/sagas/helpers/getters';
import { getCreditsToGraduate } from '../../../src/web3calls/Course';

const filledState = {
  errored: false,
  loading: false,
  examsList: [
    {
      address: 'pluto',
      name: 'calcolo',
      credits: 10,
      mandatory: 'yes',
      teacherAddress: '0x0000',
      teacherName: 'giulia',
      teacherSurname: 'zolla',
    },
    {
      address: 'tip',
      name: 'analisi',
      credits: 12,
      mandatory: 'yes',
      teacherAddress: '0x0001',
      teacherName: 'marco',
      teacherSurname: 'laMalfa',
    },
    {
      address: 'tap',
      name: 'fischio',
      credits: 6,
      mandatory: 'no',
      teacherAddress: '0x0002',
      teacherName: 'matteo',
      teacherSurname: 'lodi',
    },
  ],
};

describe('Student feature', () => {
  // 37
  it('should load all his exams', () => expectSaga(sagas.getExams, sagas.creators.getExamsAction('pippo'))
    .withReducer(reducer)
    .provide({
      call: (effect, next) => {
        if (effect.fn === Student.getExamNumber) return 3;
        if (effect.fn === Student.getExamContractAt) {
          if (effect.args[1] === 0) return 'pluto';
          if (effect.args[1] === 1) return 'tip';
          if (effect.args[1] === 2) return 'tap';
        }
        if (effect.fn === getExamData) {
          if (effect.args[0] === 'pluto') {
            return {
              address: 'pluto',
              name: 'calcolo',
              credits: 10,
              mandatory: 'yes',
              teacherAddress: '0x0000',
              teacherName: 'giulia',
              teacherSurname: 'zolla',
            };
          }
          if (effect.args[0] === 'tip') {
            return {
              address: 'tip',
              name: 'analisi',
              credits: 12,
              mandatory: 'yes',
              teacherAddress: '0x0001',
              teacherName: 'marco',
              teacherSurname: 'laMalfa',
            };
          }
          if (effect.args[0] === 'tap') {
            return {
              address: 'tap',
              name: 'fischio',
              credits: 6,
              mandatory: 'no',
              teacherAddress: '0x0002',
              teacherName: 'matteo',
              teacherSurname: 'lodi',
            };
          }
        }
        if (effect.fn === Student.getExamValuationAt) {
          if (effect.args[1] === 0) return 0;
          if (effect.args[1] === 1) return 30;
          if (effect.args[1] === 2) return 23;
        }
        if (effect.fn === Student.getExamSubscriptionAt) {
          if (effect.args[1] === 0) return false;
          if (effect.args[1] === 1) return true;
          if (effect.args[1] === 2) return true;
        }
        return next();
      },
    })
    .hasFinalState({
      errored: false,
      loading: false,
      possibleCredits: NaN,
      examsList: [
        {
          address: 'pluto',
          name: 'calcolo',
          credits: 10,
          mandatory: 'yes',
          teacherAddress: '0x0000',
          teacherName: 'giulia',
          teacherSurname: 'zolla',
          valuation: null,
          subscription: false,
        },
        {
          address: 'tip',
          name: 'analisi',
          credits: 12,
          mandatory: 'yes',
          teacherAddress: '0x0001',
          teacherName: 'marco',
          teacherSurname: 'laMalfa',
          valuation: 29,
          subscription: true,
        },
        {
          address: 'tap',
          name: 'fischio',
          credits: 6,
          mandatory: 'no',
          teacherAddress: '0x0002',
          teacherName: 'matteo',
          teacherSurname: 'lodi',
          valuation: 22,
          subscription: true,
        },
      ],
    })
    .put(creators.listIsLoading())
    .run());
  // 38
  it('should get all the student\'s credit', () => expectSaga(sagas.getExamsCredits, sagas.creators.getCreditsAction('pippo'))
    .withReducer(reducer)
    .provide({
      call: (effect, next) => {
        if (effect.fn === Student.getExamNumber) return 3;
        if (effect.fn === Student.getExamContractAt) {
          if (effect.args[1] === 0) return 'tip';
          if (effect.args[1] === 1) return 'tap';
          if (effect.args[1] === 2) return 'top';
        }
        if (effect.fn === Student.getExamValuationAt) {
          if (effect.args[1] === 0) return 30;
          if (effect.args[1] === 1) return 23;
          if (effect.args[1] === 2) return 15;
        }
        if (effect.fn === Student.getExamSubscriptionAt) {
          if (effect.args[1] === 0) return true;
          if (effect.args[1] === 1) return true;
          if (effect.args[1] === 2) return true;
        }
        if (effect.fn === getCredits) {
          if (effect.args[0] === 'tip') return 12;
          if (effect.args[0] === 'tap') return 6;
          if (effect.args[0] === 'top') return 15;
        }
        if (effect.fn === Student.getCourseContract) return 'goku';
        if (effect.fn === getCreditsToGraduate) return 180;
        return next();
      },
    })
    .hasFinalState({
      errored: false,
      loading: false,
      credits: 18,
      possibleCredits: 15,
      graduationCredits: 180,
    })
    .run());
  // 39
  it('should set 0 credits', () => expectSaga(sagas.getExamsCredits, sagas.creators.getCreditsAction('pippo'))
    .withReducer(reducer)
    .provide({
      call: (effect, next) => {
        if (effect.fn === Student.getExamNumber) return 3;
        if (effect.fn === Student.getExamContractAt) {
          if (effect.args[1] === 0) return 'tip';
          if (effect.args[1] === 1) return 'tap';
          if (effect.args[1] === 2) return 'top';
        }
        if (effect.fn === Student.getExamValuationAt) {
          if (effect.args[1] === 0) return 0;
          if (effect.args[1] === 1) return 17;
          if (effect.args[1] === 2) return 15;
        }
        if (effect.fn === Student.getExamSubscriptionAt) {
          if (effect.args[1] === 0) return true;
          if (effect.args[1] === 1) return false;
          if (effect.args[1] === 2) return false;
        }
        if (effect.fn === getCredits) {
          if (effect.args[0] === 'tip') return 12;
          if (effect.args[0] === 'tap') return 6;
          if (effect.args[0] === 'top') return 15;
        }
        if (effect.fn === Student.getCourseContract) return 'goku';
        if (effect.fn === getCreditsToGraduate) return 180;
        return next();
      },
    })
    .hasFinalState({
      errored: false,
      loading: false,
      credits: 0,
      possibleCredits: 12,
      graduationCredits: 180,
    })
    .run());
  // 40
  it('should enroll a student to an exam', () => expectSaga(sagas.enrollToExam, sagas.creators.enrollToExamAction('pippo', 'calcolo'))
    .withReducer(reducer, filledState)
    .provide({
      call: (effect, next) => {
        if (effect.fn === Student.getIndexOfExam) return 2;
        if (effect.fn === Student.enrollToOptionalExam) return true;
        if (effect.fn === getCredits) return 12;
        if (effect.fn === getExamData) {
          return {
            address: 'pluto',
            name: 'calcolo',
            credits: 10,
            mandatory: 'yes',
            teacherAddress: '0x0000',
            teacherName: 'giulia',
            teacherSurname: 'zolla',
          };
        }
        if (effect.fn === Student.getExamValuationAt) return 19;
        return next();
      },
    })
    .hasFinalState({
      errored: false,
      loading: false,
      examsList: [
        {
          address: 'pluto',
          name: 'calcolo',
          credits: 12,
          mandatory: 'yes',
          teacherAddress: '0x0000',
          teacherName: 'giulia',
          teacherSurname: 'zolla',
          valuation: 19,
          subscription: true,
        },
        {
          address: 'tip',
          name: 'analisi',
          credits: 12,
          mandatory: 'yes',
          teacherAddress: '0x0001',
          teacherName: 'marco',
          teacherSurname: 'laMalfa',
        },
        {
          address: 'tap',
          name: 'fischio',
          credits: 6,
          mandatory: 'no',
          teacherAddress: '0x0002',
          teacherName: 'matteo',
          teacherSurname: 'lodi',
        },
      ],
    })
    .run());
});

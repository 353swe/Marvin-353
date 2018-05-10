import { expectSaga } from 'redux-saga-test-plan';
import { expect } from 'chai';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import reducer, { creators } from '../../../src/ducks/TeacherExam';
import * as sagas from '../../../src/sagas/TeacherExamSaga';
import GentlyFail from './GentlyFail';
import * as Teacher from '../../../src/web3calls/Teacher';
import * as Exam from '../../../src/web3calls/Exam';
import * as Course from '../../../src/web3calls/Course';

const features = [sagas.getList];
const failedState = {
  loading: false,
  errored: true,
  list: [],
};

describe('TeacherExam feature', () => {
  GentlyFail(features, reducer, failedState);
  // 29
  it('should fail when the user does not have the permit', () => expectSaga(sagas.getList, sagas.creators.getList('nope'))
    .withReducer(reducer)
    .provide([
      [matchers.call.fn(Teacher.getExamNumber, 'nope'), throwError(new Error())],
    ])
    .hasFinalState(failedState)
    .run());
  // 30
  it('should throw an error when retrieving exam data fail', () => {
    const saga = expectSaga(sagas.getExamData, 'nope', 0)
      .provide([
        [matchers.call.fn(Teacher.getExamContractAt, 'nope', '0'), throwError(new Error())],
      ]);
    saga.run().then(() => {
      expect(false).to.be.true;
    }).catch(() => {
      expect(true).to.be.true;
    });
  });
  // 31
  it('should retrive the correct single exam data', () => expectSaga(sagas.getExamData, 'prof', 0)
    .withReducer(reducer, {
      loading: true,
      errored: false,
      list: [],
    })
    .provide([
      [matchers.call.fn(Teacher.getExamContractAt, 'prof', 0), 'examAddress'],
      [matchers.call.fn(Exam.getName, 'examAddress'), 'ABC'],
      [matchers.call.fn(Exam.getCourse, 'examAddress'), 'courseAddress'],
      [matchers.call.fn(Course.getName, 'courseAddress'), 'Well'],
    ])
    .hasFinalState({
      loading: true,
      errored: false,
      list: [{
        code: 'ABC',
        courseName: 'Well',
        index: 0,
        address: 'examAddress',
      }],
    })
    .run());
  // 32
  it('should gently fail when a single exam fail to retrieve the data', () => expectSaga(sagas.getList, sagas.creators.getList('prof'))
    .withReducer(reducer)
    .provide([
      [matchers.call.fn(Teacher.getExamNumber, 'prof'), 1],
      [matchers.call.fn(sagas.getExamData, 'prof', 0), throwError(new Error())],
    ])
    .hasFinalState({
      loading: false,
      errored: true,
      list: [],
    })
    .run());
  // 33
  it('should retrieve all the exams', () => expectSaga(sagas.getList, { userAddress: 'prof' })
    .withReducer(reducer)
    .provide([
      [matchers.call.fn(Teacher.getExamNumber, 'prof'), 0],
    ])
    .put(creators.listIsLoading())
    .put(creators.listHasFinished())
    .run());
});

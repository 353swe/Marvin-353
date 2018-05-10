import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import sagaStub from './stubs';
import * as sagas from '../../src/sagas/ManageExamsSaga';
import * as UniversityExam from '../../src/web3calls/UniversityExam';
import * as Getters from '../../src/sagas/helpers/getters';

describe('ManageExamsSaga', () => {
  describe('associateProfessor', () => {
    // 28
    it('should return the teacher data when everything goes right', () => expectSaga(sagaStub, sagas.associateProfessor, '1', '2')
      .provide([
        [matchers.call.fn(UniversityExam.associateTeacherToExam, '1', '2'), true],
        [matchers.call.fn(Getters.getTeacherData, '1'), {
          address: '1',
          name: 'Primo',
          surname: 'Levi',
        }],
      ])
      .put({
        professorAddress: '1',
        professorName: 'Primo',
        professorSurname: 'Levi',
      })
      .run());
    // 29
    it('should not catch the error if something goes wrong', () => expectSaga(sagaStub, sagas.associateProfessor, '1', '2')
      .provide([
        [matchers.call.fn(UniversityExam.associateTeacherToExam, '1', '2'), throwError(new Error())],
      ])
      .put('error')
      .run());
  });
});

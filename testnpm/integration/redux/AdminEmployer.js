import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import reducer, { creators } from '../../../src/ducks/AdminEmployer';
import * as sagas from '../../../src/sagas/AdminEmployerSaga';
import * as UniversityAdmin from '../../../src/web3calls/UniversityAdmin';
import GentlyFail from './GentlyFail';

const features = [sagas.addAdmin, sagas.removeAdmin, sagas.getAllAdmins];
const failedState = {
  loading: false,
  errored: true,
  adminAccount: [],
};
const filledState = {
  errored: false,
  loading: false,
  adminAccount: ['topolino', 'pippo', 'paperino'],
};
describe('AdminEmployer feature', () => {
  describe('add new admin', () => {
    // 1
    it('should succesfully add the admin provided', () => expectSaga(sagas.addAdmin, sagas.creators.addNewAdminAction('pippo'))
      .withReducer(reducer)
      .provide([
        [matchers.call.fn(UniversityAdmin.addNewAdmin), true],
      ])
      .hasFinalState({
        loading: false,
        errored: false,
        adminAccount: ['pippo'],
      })
      .put(creators.listIsLoading())
      .run());
    // 2
    it('should fail gently when add an admin that already exist', () => expectSaga(sagas.addAdmin, sagas.creators.addNewAdminAction('pippo'))
      .withReducer(reducer, filledState)
      .provide([
        [matchers.call.fn(UniversityAdmin.addNewAdmin), throwError(new Error())],
      ])
      .hasFinalState(Object.assign({}, filledState, { errored: true }))
      .run());
  });
  describe('remove admin', () => {
    // 3
    it('should remove the correct admin', () => expectSaga(sagas.removeAdmin, sagas.creators.removeAdminAction('pippo'))
      .withReducer(reducer, filledState)
      .provide([
        [matchers.call.fn(UniversityAdmin.removeAdmin), true],
      ])
      .hasFinalState({
        loading: false,
        errored: false,
        adminAccount: ['topolino', 'paperino'],
      })
      .run());
    // 4
    it('shouldnt remove an admin that does not exist', () => expectSaga(sagas.removeAdmin, sagas.creators.removeAdminAction('pluto'))
      .withReducer(reducer, filledState)
      .provide([
        [matchers.call.fn(UniversityAdmin.removeAdmin), true],
      ])
      .hasFinalState(filledState)
      .run());
  });
  describe('get admin list', () => {
    // 5
    it('should get the list', () => expectSaga(sagas.getAllAdmins, sagas.creators.getAllAdminsAction())
      .withReducer(reducer, failedState)
      .provide({
        call() {
          return true;
        },
        all() {
          return filledState.adminAccount;
        },
      })
      .hasFinalState(filledState)
      .run());
  });
  GentlyFail(features, reducer, failedState);
});

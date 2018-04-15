import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import reducer, { initialState, creators } from '../../../src/ducks/Session';
import * as sagas from '../../../src/sagas/SessionSaga';
import AccountEnum from '../../../src/util/logic/AccountEnum';
import { getRole, getData } from '../../../src/web3calls/Session';
import GentlyFail from './GentlyFail';

const features = [sagas.performLogin];
const failedState = Object.assign({}, initialState, { errored: true });
const userData = {
  UNIVERSITY: {},
  STUDENT: { name: 'Gianluca', surname: 'Marraffa', course: 'Informatica' },
  TEACHER: { name: 'Tullio', surname: 'Vardanega' },
  NOTLOGGED: {},
  ADMIN: {},
  UNCONFIRMED_STUDENT: { name: 'Studente', surname: 'Vero', course: 'Psicologia' },
  UNCONFIRMED_TEACHER: { name: 'Professore', surname: 'Bravo' },
};

describe('Session feature', () => {
  describe('login feature', () => {
    Object.keys(AccountEnum).forEach((role) => {
      const val = AccountEnum[role];
      it(`should login correctly with ${role}`, () => expectSaga(sagas.performLogin)
        .withReducer(reducer)
        .provide([
          [matchers.call.fn(getRole), val],
          // [matchers.call.fn(sagas.retrieveData, val), true],
          [matchers.call.fn(getData, val), userData[role]],
        ])
        .hasFinalState(Object.assign(
          {},
          initialState,
          { role: val },
          { data: Object.assign({}, initialState.data, userData[role]) },
        ))
        .put(creators.roleLoading())
        .put(creators.dataLoading())
        .run());
    });
  });
  GentlyFail(features, reducer, failedState);
});

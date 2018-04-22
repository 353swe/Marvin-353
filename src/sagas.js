import { fork } from 'redux-saga/effects';
import AdminEmployer from './sagas/AdminEmployerSaga';
import Session from './sagas/SessionSaga';
import ManageYears from './sagas/ManageYearsSaga';


export default function* sagas() {
  yield [
    fork(AdminEmployer),
    fork(Session),
    fork(ManageYears),
  ];
}

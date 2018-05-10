import { call, put } from 'redux-saga/effects';

export default function* sagaStub(saga, address) {
  try {
    const data = yield call(saga, address);
    yield put((data === undefined ? 'ok' : data));
  } catch (e) {
    console.log(e);
    yield put('error');
  }
}

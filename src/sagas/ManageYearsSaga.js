import { call, put, fork, takeLatest, takeEvery, all } from 'redux-saga/effects';
import { creators as actionCreators } from '../ducks/ManageYears';
import * as UniversityYear from '../web3calls/UniversityYear';
import * as Year from '../web3calls/Year';

const actionType = type => `marvin/ManageYearsSaga/${type}`;
const GET = actionType('GET');
const ADD = actionType('ADD');
const REMOVE = actionType('REMOVE');

export function* addYear(action) {
  const solarYear = Number(action.year);
  yield put(actionCreators.listIsLoading());
  try {
    yield call(UniversityYear.addNewAcademicYear, solarYear);
    yield put(actionCreators.pushAccademicYear(solarYear));
  } catch (e) {
    yield put(actionCreators.listHasErrored());
  }
}
export function* removeEmptyYear(action) {
  const solarYear = action.year;
  yield put(actionCreators.listIsLoading());
  try {
    yield call(UniversityYear.removeAcademicYear, solarYear);
    yield put(actionCreators.popEmptyYear(solarYear));
  } catch (e) {
    yield put(actionCreators.listHasErrored());
  }
}
export function* getAllYears() {
  yield put(actionCreators.listIsLoading());
  try {
    const yearNumber = yield call(UniversityYear.getAcademicYearNumber);
    const getYearsAddressCalls = Array(yearNumber).fill().map((_, i) => (
      call(UniversityYear.getAcademicYearContractAt, i)
    ));
    const contracts = yield all(getYearsAddressCalls);
    const getYearAddress = contracts.map(addr => call(Year.getSolarYear, addr));
    const solarYears = yield all(getYearAddress);
    yield put(actionCreators.setAccademicYearList(solarYears));
  } catch (e) {
    console.log('Fail to get years');
    yield put(actionCreators.listHasErrored());
  }
}

export const creators = {
  addYear: year => (
    { type: ADD, year }
  ),
  removeEmptyYear: year => (
    { type: REMOVE, year }
  ),
  getAllYears: () => (
    { type: GET }
  ),
};

export default function* handler() {
  yield [
    fork(takeLatest, GET, getAllYears),
    fork(takeEvery, ADD, addYear),
    fork(takeEvery, REMOVE, removeEmptyYear),
  ];
}

import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import reducer, { creators } from '../../../src/ducks/ManageYears';
import * as sagas from '../../../src/sagas/ManageYearsSaga';
import * as UniversityYear from '../../../src/web3calls/UniversityYear';
import * as Year from '../../../src/web3calls/Year';
import GentlyFail from './GentlyFail';

const features = [sagas.addYear, sagas.removeEmptyYear, sagas.getAllYears];
const failedState = {
  loading: false,
  errored: true,
  accademicYears: [],
};

describe('ManageYears feature', () => {
  GentlyFail(features, reducer, failedState);
  describe('Fetching existents solar years', () => {
    // 24
    it('should get an empty list', () => expectSaga(sagas.getAllYears, sagas.creators.getAllYears())
      .withReducer(reducer)
      .provide({
        call: () => 0,
        all: () => [],
      })
      .hasFinalState({
        loading: false,
        errored: false,
        accademicYears: [],
      })
      .put(creators.listIsLoading())
      .run());
    // 25
    it('should return the correct list', () => expectSaga(sagas.getAllYears, sagas.creators.getAllYears())
      .withReducer(reducer)
      .provide({
        call: (effect, next) => {
          const years = [2011, 2012, 2013];
          if (effect.fn === UniversityYear.getAcademicYearNumber) return 3;
          if (effect.fn === UniversityYear.getAcademicYearContractAt) return Number(effect.args[0]);
          if (effect.fn === Year.getSolarYear) return years[effect.args[0]];
          return next();
        },
      })
      .hasFinalState({
        loading: false,
        errored: false,
        accademicYears: [2011, 2012, 2013],
      })
      .put(creators.listIsLoading())
      .run());
    // 26
    it('should add a given year', () => expectSaga(sagas.addYear, sagas.creators.addYear(2011))
      .withReducer(reducer)
      .provide([
        [matchers.call.fn(UniversityYear.addNewAcademicYear, 2011), true],
      ])
      .hasFinalState({
        loading: false,
        errored: false,
        accademicYears: [2011],
      })
      .put(creators.listIsLoading())
      .run());
    // 27
    it('should remove an empty year', () => expectSaga(sagas.removeEmptyYear, sagas.creators.removeEmptyYear(2011))
      .withReducer(reducer, { loading: false, errored: false, accademicYears: [2011] })
      .provide([
        [matchers.call.fn(UniversityYear.removeAcademicYear, 2011), true],
      ])
      .hasFinalState({
        loading: false,
        errored: false,
        accademicYears: [],
      })
      .put(creators.listIsLoading())
      .run());
  });
});

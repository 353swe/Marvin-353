import { expect } from 'chai';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import reducer, { creators } from '../../../src/ducks/Booking';
import * as sagas from '../../../src/sagas/BookingSaga';
import * as Session from '../../../src/web3calls/Session';
import * as UniversityYear from '../../../src/web3calls/UniversityYear';
import * as Year from '../../../src/web3calls/Year';
import * as Course from '../../../src/web3calls/Course';
import { creators as sessionCreators } from '../../../src/sagas/SessionSaga';

describe('Booking feature', () => {
  // 6
  it('should compose the correct action type', () => {
    expect(sagas.creators.performLoad().type).to.equal('marvin/BookingSaga/LOAD');
    expect(sagas.creators.performSignUp().type).to.equal('marvin/BookingSaga/SIGNUP');
  });
  it('should retrive an empty course list when there are not courses', () => expectSaga(sagas.loadCourses, sagas.creators.performLoad(2018))
    .withReducer(reducer)
    .provide([
      [matchers.call.fn(UniversityYear.getAcademicYearContractByYear, 2018), '0x0'],
      [matchers.call.fn(Year.getCourseNumber, '0x0'), 0],
    ])
    .hasFinalState({
      loading: false,
      errored: false,
      availableCourses: {
        loading: false,
        errored: false,
      },
      listAddress: [],
      listNames: [],
    })
    .run());
  // 7
  it('should retrive the correct course list', () => expectSaga(sagas.loadCourses, sagas.creators.performLoad(2018))
    .withReducer(reducer)
    .provide({
      call: (effect, next) => {
        const courseContracts = ['0', '1', '2'];
        const courseName = ['Computer Science', 'History', 'Biology'];
        if (effect.fn === UniversityYear.getAcademicYearContractByYear) return '0x0';
        if (effect.fn === Year.getCourseNumber) return 3;
        if (effect.fn === Year.getCourseContractAt) return courseContracts[effect.args[1]];
        if (effect.fn === Course.getName) return courseName[Number(effect.args[0])];
        return next();
      },
    })
    .hasFinalState({
      loading: false,
      errored: false,
      availableCourses: {
        loading: false,
        errored: false,
      },
      listAddress: ['0', '1', '2'],
      listNames: ['Computer Science', 'History', 'Biology'],
    })
    .put(creators.listIsLoading())
    .run());
  // 8
  it('should fire the reducer when performing signup fail', () => expectSaga(sagas.signUp, sagas.creators.performSignUp('', '', ''))
    .withReducer(reducer)
    .provide([
      [matchers.call.fn(Session.signUp), throwError(new Error())],
    ])
    .hasFinalState({
      loading: false,
      errored: true,
      availableCourses: {
        loading: false,
        errored: false,
      },
      listAddress: [],
      listNames: [],
    })
    .put(creators.signUpLoading())
    .run());
  // 9
  it('should perform the login after a successful student signup', () => (
    expectSaga(
      sagas.signUp,
      sagas.creators.performSignUp('Mario', 'Rossi', '0x0'),
    )
      .provide([
        [matchers.call.fn(Session.signUp, 'Mario', 'Rossi', '0x0'), true],
      ])
      .put(sessionCreators.loginAction())
      .run()
  ));
  // 10
  it('should perform the login after a successful teacher signup', () => (
    expectSaga(
      sagas.signUp,
      sagas.creators.performSignUp('Mario', 'Rossi', ''),
    )
      .provide([
        [matchers.call.fn(Session.signUp, 'Mario', 'Bianchi', ''), true],
      ])
      .put(sessionCreators.loginAction())
      .run()
  ));
});

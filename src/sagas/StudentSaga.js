import { call, put, fork, all, takeEvery, takeLatest } from 'redux-saga/effects';
import { creators as actionCreators } from '../ducks/Student';
import * as studentExams from '../web3calls/Student';
import { getCredits } from '../web3calls/Exam';
import { getCreditsToGraduate } from '../web3calls/Course';
import { getExamData } from './helpers/getters';

const actionType = type => `marvin/StudentSaga/${type}`;

export const GET_EXAMS = actionType('GET_EXAMS');
export const ENROLL_TO_AN_EXAM = actionType('ENROLL_TO_AN_EXAM');
export const GET_CREDITS = actionType('GET_CREDITS');


export function* getExams(action) {
  yield put(actionCreators.listIsLoading());
  try {
    let num = yield call(studentExams.getExamNumber, action.address);
    num = Number(num);
    const apiExamContractCall = Array(num).fill().map((_, i) =>
      call(studentExams.getExamContractAt, action.address, i));
    const examsContract = yield all(apiExamContractCall);
    const apiExamDataCall = Array(num).fill().map((_, i) => call(getExamData, examsContract[i]));
    const examsData = yield all(apiExamDataCall);
    const apiExamValuationCall = Array(num).fill().map((_, i) =>
      call(studentExams.getExamValuationAt, action.address, i));
    const examsValuation = (yield all(apiExamValuationCall)).map(x => (x === 0 ? null : x));
    const apiExamSubscriptionCall = Array(num).fill().map((_, i) =>
      call(studentExams.getExamSubscriptionAt, action.address, i));
    const examsSubscription = yield all(apiExamSubscriptionCall);

    const personalExamsData = Array(num).fill().map((_, i) => ({
      address: examsData[i].address,
      name: examsData[i].name,
      credits: examsData[i].credits,
      mandatory: examsData[i].mandatory,
      teacherAddress: examsData[i].teacherAddress,
      teacherName: examsData[i].teacherName,
      teacherSurname: examsData[i].teacherSurname,
      valuation: examsValuation[i],
      subscription: examsSubscription[i],
    }));
    yield put(actionCreators.setExams(personalExamsData));
  } catch (e) {
    console.log('failed to get enrolled list');
    yield put(actionCreators.listHasErrored());
  }
}

export function* getExamsCredits(action) {
  try {
    let num = yield call(studentExams.getExamNumber, action.address);
    num = Number(num);
    const apiContractCall = Array(num).fill().map((_, i) =>
      call(studentExams.getExamContractAt, action.address, i));
    const contracts = yield all(apiContractCall);
    const apiExamsSubscriptionnCall = Array(num).fill().map((_, i) =>
      call(studentExams.getExamSubscriptionAt, action.address, i));
    const subscriptions = yield all(apiExamsSubscriptionnCall);
    const apiExamsValuationCall = Array(num).fill().map((_, i) =>
      call(studentExams.getExamValuationAt, action.address, i));
    let valuations = yield all(apiExamsValuationCall);
    valuations = valuations.map((valuation, i) => ({
      valuation,
      subscription: subscriptions[i],
      contract: contracts[i],
    }));
    let examsWithoutValuations = valuations;
    examsWithoutValuations = examsWithoutValuations.filter(x => x.subscription === true);
    examsWithoutValuations = examsWithoutValuations.filter(x => x.valuation <= 18);
    let possibleCredits = 0;
    if (examsWithoutValuations.length !== 0) {
      const apiCreditsCall = Array(examsWithoutValuations.length).fill().map((_, i) =>
        call(getCredits, examsWithoutValuations[i].contract));
      possibleCredits = yield all(apiCreditsCall);
      possibleCredits = possibleCredits.reduce((a, b) => a + b, 0);
    }
    valuations = valuations.filter(x => x.valuation > 18); // 18 because it indicate the vote 17
    let credits = 0;
    if (valuations.length !== 0) {
      const apiCreditsCall = Array(valuations.length).fill().map((_, i) =>
        call(getCredits, valuations[i].contract));
      credits = yield all(apiCreditsCall);
      credits = credits.reduce((a, b) => a + b, 0);
    }
    const courseContract = yield call(studentExams.getCourseContract, action.address);
    let graduationCredits = yield call(getCreditsToGraduate, courseContract);
    graduationCredits = Number(graduationCredits);
    yield put(actionCreators.setCredits(credits, possibleCredits, graduationCredits));
  } catch (e) {
    console.log('failed to get credits');
  }
}

export function* enrollToExam(action) {
  try {
    let index = yield call(studentExams.getIndexOfExam, action.addStudent, action.addExam);
    index = Number(index);
    yield call(studentExams.enrollToOptionalExam, action.addStudent, index);
    const exam = yield call(getExamData, action.addExam);
    const credits = yield call(getCredits, action.addExam);
    const examValuation = yield call(studentExams.getExamValuationAt, action.addStudent, index);
    exam.valuation = examValuation;
    exam.subscription = true;
    exam.credits = credits;
    console.log(exam);
    yield put(actionCreators.pushNewSubscription(exam));
  } catch (e) {
    console.log('failed to enroll to the exam');
  }
}

export const creators = {
  getExamsAction: address => (
    { type: GET_EXAMS, address }
  ),
  enrollToExamAction: (addStudent, addExam) => ( // exam address
    { type: ENROLL_TO_AN_EXAM, addStudent, addExam }
  ),
  getCreditsAction: address => (
    { type: GET_CREDITS, address }
  ),
};

export default function* handler() {
  yield [
    fork(takeLatest, GET_EXAMS, getExams),
    fork(takeLatest, GET_CREDITS, getExamsCredits),
    fork(takeEvery, ENROLL_TO_AN_EXAM, enrollToExam),
  ];
}

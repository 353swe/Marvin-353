import { call, put, fork, all, takeLatest, takeEvery } from 'redux-saga/effects';
import { creators as actionCreators } from '../ducks/Evaluator';
import * as User from '../web3calls/User';
import * as Student from '../web3calls/Student';
import * as Exam from '../web3calls/Exam';
import * as UniversityTeacher from '../web3calls/UniversityTeacher';
import * as Teacher from '../web3calls/Teacher';

const actionType = type => `marvin/EvaluatorSaga/${type}`;
const GET_LIST = actionType('GET_LIST');
const ASSIGN_VOTE = actionType('ASSIGN_VOTE');

export function* getStudentData(examAddress, studentIndex) {
  const studentAddress = yield call(Exam.getEnrolledContractAt, examAddress, studentIndex);
  if (studentAddress === null) throw new Error();
  const [studentName, studentSurname, examIndex] = yield all([
    call(User.getName, studentAddress),
    call(User.getSurname, studentAddress),
    call(Student.getIndexOfExam, studentAddress, examAddress),
  ]);
  const vote = yield call(Student.getExamValuationAt, studentAddress, examIndex);
  yield put(actionCreators.pushStudent({
    name: studentName,
    surname: studentSurname,
    studentAddress,
    studentIndex,
    vote,
  }));
}

export function* getList({ examAddress }) {
  yield put(actionCreators.setList([]));
  yield put(actionCreators.listIsLoading());
  try {
    const studentNumber = yield call(Exam.getEnrolledNumber, examAddress);
    console.log(`Students number:${yield studentNumber}`);
    const studentFetches = Array(Number(studentNumber)).fill().map((_, index) => (
      call(getStudentData, examAddress, index)
    ));
    yield all(studentFetches);
    yield put(actionCreators.listHasFinished());
  } catch (e) {
    yield put(actionCreators.listHasErrored());
  }
}

export function* assignVote({
  userAddress, examIndex, studentIndex, vote,
}) {
  yield put(actionCreators.voteIsLoading());
  try {
    const teacherAddress =
      yield call(UniversityTeacher.getTeacherContractFromPublicAddress, userAddress);
    yield call(Teacher.registerNewVoteStudentExam, teacherAddress, examIndex, studentIndex, vote);
    yield put(actionCreators.setVote(studentIndex, vote));
  } catch (e) {
    yield put(actionCreators.voteHasErrored());
  }
}

export const creators = {
  getList: examAddress => (
    { type: GET_LIST, examAddress }
  ),
  assignVote: (userAddress, examIndex, studentIndex, vote) => (
    {
      type: ASSIGN_VOTE,
      userAddress,
      examIndex,
      studentIndex,
      vote,
    }
  ),
};

export default function* handler() {
  yield [
    fork(takeLatest, GET_LIST, getList),
    fork(takeEvery, ASSIGN_VOTE, assignVote),
  ];
}

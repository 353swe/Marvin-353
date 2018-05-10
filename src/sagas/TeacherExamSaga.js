import { call, put, fork, takeLatest, all } from 'redux-saga/effects';
import { creators as actionCreators } from '../ducks/TeacherExam';
import * as Teacher from '../web3calls/Teacher';
import * as Exam from '../web3calls/Exam';
import * as Course from '../web3calls/Course';

const actionType = type => `marvin/TeacherExamSaga/${type}`;
const GET_LIST = actionType('GET_LIST');

export function* getExamData(userAddress, examIndex) {
  const examAddress = yield call(Teacher.getExamContractAt, userAddress, examIndex);
  const [examName, courseAddress] = yield all([
    call(Exam.getName, examAddress),
    call(Exam.getCourse, examAddress),
  ]);
  const courseName = yield call(Course.getName, courseAddress);
  yield put(actionCreators.pushExam({
    code: examName,
    courseName,
    index: examIndex,
    address: examAddress,
  }));
}

export function* getList({ userAddress }) {
  yield put(actionCreators.setList([]));
  yield put(actionCreators.listIsLoading());
  try {
    const examNumber = yield call(Teacher.getExamNumber, userAddress);
    const fetchExams = Array(Number(examNumber)).fill().map((_, id) => (
      call(getExamData, userAddress, id)
    ));
    yield all(fetchExams);
    yield put(actionCreators.listHasFinished());
  } catch (e) {
    yield put(actionCreators.listHasErrored());
  }
}
export const creators = {
  getList: userAddress => (
    { type: GET_LIST, userAddress }
  ),
};

export default function* handler() {
  yield [
    fork(takeLatest, GET_LIST, getList),
  ];
}

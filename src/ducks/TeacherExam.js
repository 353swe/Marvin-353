import Duck from 'extensible-duck';
import { copyNPush, ORDERING } from '../util/js_helpers';

const TeacherExamDuck = new Duck({
  namespace: 'marvin',
  store: 'TeacherExam',
  types: ['PUSH_EXAM', 'LIST_LOADING', 'LIST_ERRORED', 'LIST_FINISHED', 'SET_LIST'],
  initialState: {
    loading: false,
    errored: false,
    list: [],
  },
  reducer: (state, action, { types }) => {
    switch (action.type) {
      case (types.PUSH_EXAM):
        return {
          ...state,
          list: copyNPush(state.list, action.exam),
        };
      case (types.LIST_LOADING):
        return {
          ...state,
          loading: true,
        };
      case (types.LIST_ERRORED):
        return {
          ...state,
          loading: false,
          errored: true,
          list: [],
        };
      case (types.LIST_FINISHED):
        return {
          ...state,
          loading: false,
          errored: false,
        };
      case (types.SET_LIST):
        return {
          ...state,
          list: ((action.list === null || action.list === undefined) ? [] : action.list),
        };
      default:
        return state;
    }
  },
  selectors: {
    examsByCode: (state, order = ORDERING.ASC) => (
      state.teacherData.list.sort((el, next) => (el.code > next.code ? 1 : -1) * order)
    ),
    examsByCourse: (state, order = ORDERING.ASC) => (
      state.teacherData.list.sort((el, next) => (el.couseName > next.courseName ? 1 : -1) * order)
    ),
  },
  creators: ({ types }) => ({
    pushExam: exam => (
      { type: types.PUSH_EXAM, exam }
    ),
    listIsLoading: () => (
      { type: types.LIST_LOADING }
    ),
    listHasErrored: () => (
      { type: types.LIST_ERRORED }
    ),
    listHasFinished: () => (
      { type: types.LIST_FINISHED }
    ),
    setList: list => (
      { type: types.SET_LIST, list }
    ),
  }),
});
export const { creators, selectors, initialState } = TeacherExamDuck;
export default TeacherExamDuck.reducer;

import Duck from 'extensible-duck';
import { updateObjInArr } from '../util/js_helpers';

const CourseExamsDuck = new Duck({
  namespace: 'marvin',
  store: 'CourseExams',
  types: ['SET_COURSE', 'SET_LIST', 'SET_PROFESSOR', 'EXAM_INSERTED', 'LIST_LOADING', 'LIST_ERRORED'],
  initialState: {
    loading: false,
    errored: false,
    list: [],
  },
  reducer: (state, action, duck) => {
    const { types } = duck;
    switch (action.type) {
      case (types.LIST_LOADING):
        return {
          ...state,
          loading: true,
          errored: false,
        };
      case (types.LIST_ERRORED):
        return {
          ...state,
          loading: false,
          errored: true,
        };
      case (types.SET_LIST):
        return {
          ...state,
          loading: false,
          errored: false,
          list: action.list,
        };
      case (types.SET_PROFESSOR):
        return {
          ...state,
          loading: false,
          errored: false,
          list: updateObjInArr(
            state.list,
            obj => obj.address === action.examAddress,
            action.teacher,
          ),
        };
      case (types.EXAM_INSERTED):
        return {
          ...state,
          loading: false,
          errored: false,
        };
      default:
        return state;
    }
  },
  selectors: {

  },
  creators: ({ types }) => ({
    setList: list => (
      { type: types.SET_LIST, list }
    ),
    setProfessor: (examAddress, teacher) => (
      { type: types.SET_PROFESSOR, examAddress, teacher }
    ),
    listIsLoading: () => (
      { type: types.LIST_LOADING }
    ),
    listHasErrored: () => (
      { type: types.LIST_ERRORED }
    ),
    examInserted: () => (
      { type: types.EXAM_INSERTED }
    ),
  }),
});
export const { creators, selectors, initialState } = CourseExamsDuck;
export default CourseExamsDuck.reducer;

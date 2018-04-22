import Duck from 'extensible-duck';
import { copyNPush, copyNPop } from '../util/js_helpers';

const ManageYearsDuck = new Duck({
  namespace: 'marvin',
  store: 'ManageYears',
  types: [
    'SET_ACCADEMIC_YEAR_LIST',
    'POP_EMPTY_YEAR',
    'PUSH_ACCADEMIC_YEAR',
    'LIST_ERRORED',
    'LIST_LOADING',
  ],
  initialState: {
    loading: false,
    errored: false,
    accademicYears: [],
  },
  reducer: (state, action, duck) => {
    const { types } = duck;
    switch (action.type) {
      case (types.SET_ACCADEMIC_YEAR_LIST):
        return {
          ...state,
          accademicYears: action.list,
          errored: false,
          loading: false,
        };
      case (types.PUSH_ACCADEMIC_YEAR):
        return {
          ...state,
          loading: false,
          errored: false,
          accademicYears: copyNPush(state.accademicYears, action.year),
        };
      case (types.POP_EMPTY_YEAR):
        return {
          ...state,
          loading: false,
          errored: false,
          accademicYears: copyNPop(state.accademicYears, el => el === action.year),
        };
      case (types.LIST_ERRORED):
        return {
          ...state,
          errored: true,
          loading: false,
        };
      case (types.LIST_LOADING):
        return {
          ...state,
          loading: true,
        };
      default:
        return state;
    }
  },
  creators: duck => ({
    setAccademicYearList: list => (
      { type: duck.types.SET_ACCADEMIC_YEAR_LIST, list }
    ),
    popEmptyYear: year => (
      { type: duck.types.POP_EMPTY_YEAR, year }
    ),
    pushAccademicYear: year => (
      { type: duck.types.PUSH_ACCADEMIC_YEAR, year }
    ),
    listIsLoading: () => (
      { type: duck.types.LIST_LOADING }
    ),
    listHasErrored: () => (
      { type: duck.types.LIST_ERRORED }
    ),
  }),
});
export const { creators, selectors, initialState } = ManageYearsDuck;
export default ManageYearsDuck.reducer;

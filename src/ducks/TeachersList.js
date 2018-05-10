import Duck from 'extensible-duck';

const TeachersListDuck = new Duck({
  namespace: 'marvin',
  store: 'TeachersList',
  types: ['SET_LIST', 'SET_PROFESSOR', 'LIST_LOADING', 'LIST_ERRORED'],
  initialState: {},
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
    listIsLoading: () => (
      { type: types.LIST_LOADING }
    ),
    listHasErrored: () => (
      { type: types.LIST_ERRORED }
    ),
  }),
});
export const { creators, selectors, initialState } = TeachersListDuck;
export default TeachersListDuck.reducer;

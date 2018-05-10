import Duck from 'extensible-duck';

const initialDataState = {
  errored: false,
  loading: false,
  name: null,
  surname: null,
  contract: null,
};
const SessionDuck = new Duck({
  namespace: 'marvin',
  store: 'user',
  types: ['SET_ROLE', 'SET_CONTRACT', 'SET_DATA', 'CLEAN_DATA', 'ROLE_LOADING', 'DATA_LOADING'],
  initialState: {
    errored: false,
    loading: false,
    role: null,
    data: initialDataState,
  },
  reducer: (state, action, duck) => {
    const { types } = duck;
    const { initialState } = duck;
    switch (action.type) {
      case (types.SET_ROLE):
        return {
          ...state,
          role: action.role,
          errored: action.errored,
          loading: false,
        };
      case (types.SET_CONTRACT):
        return {
          ...state,
          contract: action.contract,
          errored: action.errored,
          loading: false,
        };
      case (types.SET_DATA):
        return {
          ...state,
          data: Object.assign({}, initialDataState, action.data),
        };
      case (types.CLEAN_DATA):
        return initialState;
      case (types.ROLE_LOADING):
        return {
          ...state,
          loading: true,
          errored: false,
        };
      case (types.DATA_LOADING):
        return {
          ...state,
          data: Object.assign({}, initialDataState, { loading: true, errored: false }),
        };
      default:
        return state;
    }
  },
  selectors: {
    isLogged: state => (state.user.role !== null),
  },
  creators: duck => ({
    setRole: (role, errored = false) => (
      { type: duck.types.SET_ROLE, role, errored }
    ),
    setContract: (contract, errored = false) => (
      { type: duck.types.SET_CONTRACT, contract, errored }
    ),
    setData: (data, errored = false) => ({
      type: duck.types.SET_DATA,
      data: Object.assign({}, initialDataState, data, { loading: false, errored }),
    }),
    cleanData: () => (
      { type: duck.types.CLEAN_DATA }
    ),
    roleLoading: () => (
      { type: duck.types.ROLE_LOADING }
    ),
    dataLoading: () => (
      { type: duck.types.DATA_LOADING }
    ),
  }),
});
export const { creators, selectors, initialState } = SessionDuck;
export default SessionDuck.reducer;

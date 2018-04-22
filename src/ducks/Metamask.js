import Duck from 'extensible-duck';

const MetamaskDuck = new Duck({
  namespace: 'marvin',
  store: 'metamask',
  types: ['LOGIN', 'LOGOUT', 'SET_ADDRESS', 'NOT_FOUND'],
  initialState: {
    present: true,
    account: '',
  },
  reducer: (state, action = {}, duck) => {
    const { types } = duck;
    const { initialState } = duck;
    switch (action.type) {
      case (types.LOGIN):
        return Object.assign({}, initialState, { present: true });
      case (types.LOGOUT):
        return {
          ...state,
          present: true,
          account: '',
        };
      case (types.SET_ADDRESS):
        if (typeof action.address !== 'undefined') {
          return {
            ...state,
            account: action.address,
          };
        }
        return state;
      case (types.NOT_FOUND):
        return Object.assign({}, initialState, { present: false });
      default:
        return state;
    }
  },
  selectors: {
    logged: state => (
      state.metamask.present &&
      state.metamask.account !== '' &&
      state.metamask.account !== null
    ),
  },
  creators: duck => ({
    login: () => (
      { type: duck.types.LOGIN }
    ),
    logout: () => (
      { type: duck.types.LOGOUT }
    ),
    setAddress: address => (
      { type: duck.types.SET_ADDRESS, address }
    ),
    notFound: () => (
      { type: duck.types.NOT_FOUND }
    ),
  }),
});
export const { creators, selectors, initialState } = MetamaskDuck;
export default MetamaskDuck.reducer;

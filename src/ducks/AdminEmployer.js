import Duck from 'extensible-duck';

const AdminEmployerDuck = new Duck({
  namespace: 'marvin',
  store: 'AdminEmployer',
  types: ['SET_ADMINS_LIST', 'POP_ADMIN', 'PUSH_ADMIN', 'LIST_ERRORED', 'LIST_LOADING'],
  initialState: {
    loading: false,
    errored: false,
    adminAccount: [],
  },
  reducer: (state, action, duck) => {
    const { types } = duck;
    let accounts;
    let idx;
    switch (action.type) {
      case (types.SET_ADMINS_LIST):
        return {
          ...state,
          adminAccount: action.account,
          loading: false,
          errored: false,
        };
      case (types.POP_ADMIN):
        accounts = Object.assign([], state.adminAccount);
        idx = accounts.findIndex(el => el === action.address);
        if (idx > -1) accounts.splice(idx, 1);
        return {
          ...state,
          adminAccount: accounts,
          loading: false,
        };
      case (types.PUSH_ADMIN):
        accounts = Object.assign([], state.adminAccount);
        accounts.push(action.address);
        return {
          ...state,
          adminAccount: accounts,
          loading: false,
        };
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
      default:
        return state;
    }
  },
  creators: duck => ({
    setAdminsList: account => (
      { type: duck.types.SET_ADMINS_LIST, account }
    ),
    popAdmin: address => (
      { type: duck.types.POP_ADMIN, address }
    ),
    pushAdmin: address => (
      { type: duck.types.PUSH_ADMIN, address }
    ),
    listIsLoading: () => (
      { type: duck.types.LIST_LOADING }
    ),
    listHasErrored: () => (
      { type: duck.types.LIST_ERRORED }
    ),
  }),
});
export const { creators, selectors } = AdminEmployerDuck;
export default AdminEmployerDuck.reducer;

import Duck from 'extensible-duck';
import { copyNPush, copyNPop } from '../util/js_helpers';

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
    switch (action.type) {
      case (types.SET_ADMINS_LIST):
        return {
          ...state,
          adminAccount: action.account,
          loading: false,
          errored: false,
        };
      case (types.POP_ADMIN):
        return {
          ...state,
          adminAccount: copyNPop(state.adminAccount, el => el === action.address),
          loading: false,
        };
      case (types.PUSH_ADMIN):
        return {
          ...state,
          adminAccount: copyNPush(state.adminAccount, action.address),
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
export const { creators, selectors, initialState } = AdminEmployerDuck;
export default AdminEmployerDuck.reducer;

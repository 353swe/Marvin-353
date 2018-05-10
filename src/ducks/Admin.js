import Duck from 'extensible-duck';
import { copyNPush, copyNPop } from '../util/js_helpers';
import ROLES from '../util/logic/AccountEnum';

const AdminDuck = new Duck({
  namespace: 'marvin',
  store: 'Admin',
  types: [
    'SET_STUDENTS_LIST',
    'SET_TEACHERS_LIST',
    'SET_PENDING_STUDENTS_LIST',
    'SET_PENDING_TEACHERS_LIST',
    'CONFIRM_USER',
    'REMOVE_USER',
    'UNCONFIRM_USER',
    'LIST_ERRORED',
    'LIST_LOADING',
  ],
  initialState: {
    loading: false,
    errored: false,
    studentsList: [],
    teachersList: [],
    pendingStudentsList: [],
    pendingTeachersList: [],
  },
  reducer: (state, action, duck) => {
    const { types } = duck;
    switch (action.type) {
      case (types.SET_STUDENTS_LIST):
        return {
          ...state,
          studentsList: action.account,
          loading: false,
          errored: false,
        };
      case (types.SET_TEACHERS_LIST):
        return {
          ...state,
          teachersList: action.account,
          loading: false,
          errored: false,
        };
      case (types.SET_PENDING_STUDENTS_LIST):
        return {
          ...state,
          pendingStudentsList: action.account,
          loading: false,
          errored: false,
        };
      case (types.SET_PENDING_TEACHERS_LIST):
        return {
          ...state,
          pendingTeachersList: action.account,
          loading: false,
          errored: false,
        };
      case (types.CONFIRM_USER):
        if (action.role === ROLES.UNCONFIRMED_STUDENT) { // is a non-approved student
          return {
            ...state,
            studentsList: copyNPush(state.studentsList, action.data),
            pendingStudentsList: copyNPop(state.pendingStudentsList, el =>
              el.contract === action.contract),
            loading: false,
            errored: false,
          };
        } else if (action.role === ROLES.UNCONFIRMED_TEACHER) { // is a non-approved teacher
          return {
            ...state,
            teachersList: copyNPush(state.teachersList, action.data),
            pendingTeachersList: copyNPop(state.pendingTeachersList, el =>
              el.contract === action.contract),
            loading: false,
            errored: false,
          };
        } break;
      case (types.REMOVE_USER):
        if (action.role === ROLES.STUDENT) { // is a  student
          return {
            ...state,
            studentsList: copyNPop(state.studentsList, el => el.contract === action.address),
            loading: false,
            errored: false,
          };
        } else if (action.role === ROLES.TEACHER) { // is a teacher
          return {
            ...state,
            teachersList: copyNPop(state.teachersList, el => el.contract === action.address),
            loading: false,
            errored: false,
          };
        } break;
      case (types.UNCONFIRM_USER):
        if (action.role === ROLES.UNCONFIRMED_STUDENT) { // is a non-approved student
          return {
            ...state,
            pendingStudentsList: copyNPop(state.pendingStudentsList, el =>
              el.contract === action.address),
            loading: false,
            errored: false,
          };
        } else if (action.role === ROLES.UNCONFIRMED_TEACHER) { // is a non-approved teacher
          return {
            ...state,
            pendingTeachersList: copyNPop(state.pendingTeachersList, el =>
              el.contract === action.address),
            loading: false,
            errored: false,
          };
        } break;
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
        break;
    }
    return state;
  },

  creators: duck => ({
    setStudentsList: account => (
      { type: duck.types.SET_STUDENTS_LIST, account }
    ),
    setTeachersList: account => (
      { type: duck.types.SET_TEACHERS_LIST, account }
    ),
    setPendingStudentsList: account => (
      { type: duck.types.SET_PENDING_STUDENTS_LIST, account }
    ),
    setPendingTeachersList: account => (
      { type: duck.types.SET_PENDING_TEACHERS_LIST, account }
    ),
    confirmUser: (role, contract, data) => (
      {
        type: duck.types.CONFIRM_USER,
        role,
        contract,
        data,
      }
    ),
    removeUser: (role, address) => (
      { type: duck.types.REMOVE_USER, role, address }
    ),
    unconfirmUser: (role, address) => (
      { type: duck.types.UNCONFIRM_USER, role, address }
    ),
    listIsLoading: () => (
      { type: duck.types.LIST_LOADING }
    ),
    listHasErrored: () => (
      { type: duck.types.LIST_ERRORED }
    ),
  }),
});
export const { creators, selectors } = AdminDuck;
export default AdminDuck.reducer;

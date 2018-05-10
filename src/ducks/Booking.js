import Duck from 'extensible-duck';

const BookingDuck = new Duck({
  namespace: 'marvin',
  store: 'Booking',
  types: ['LIST_LOADING', 'LIST_ERRORED', 'SIGNUP_LOADING', 'SIGNUP_ERRORED', 'SET_COURSES_ADDRESSES', 'SET_COURSES_NAMES'],
  initialState: {
    loading: false,
    errored: false,
    availableCourses: {
      loading: false,
      errored: false,
    },
    listAddress: [],
    listNames: [],
  },
  reducer: (state, action, duck) => {
    const { types } = duck;
    switch (action.type) {
      case (types.LIST_LOADING):
        return {
          ...state,
          availableCourses: Object.assign({}, state.availableCourses, { loading: true }),
        };
      case (types.LIST_ERRORED):
        return {
          ...state,
          availableCourses: Object.assign(
            {},
            state.availableCourses,
            { loading: false, errored: true },
          ),
        };
      case (types.SET_COURSES_ADDRESSES):
        return {
          ...state,
          availableCourses: {
            errored: false,
            loading: false,
          },
          listAddress: action.coursesAddress,
        };
      case (types.SET_COURSES_NAMES):
        return {
          ...state,
          availableCourses: {
            errored: false,
            loading: false,
          },
          listNames: action.coursesNames,
        };
      case (types.SIGNUP_LOADING):
        return {
          ...state,
          loading: true,
        };
      case (types.SIGNUP_ERRORED):
        return {
          ...state,
          loading: false,
          errored: true,
        };
      default:
        return state;
    }
  },
  selectors: {

  },
  creators: ({ types }) => ({
    listIsLoading: () => (
      { type: types.LIST_LOADING }
    ),
    listHasErrored: () => (
      { type: types.LIST_ERRORED }
    ),
    setCoursesAddress: coursesAddress => (
      { type: types.SET_COURSES_ADDRESSES, coursesAddress }
    ),
    setCoursesNames: coursesNames => (
      { type: types.SET_COURSES_NAMES, coursesNames }
    ),
    signUpLoading: () => (
      { type: types.SIGNUP_LOADING }
    ),
    signUpErrored: () => (
      { type: types.SIGNUP_ERRORED }
    ),
  }),
});
export const { creators, selectors, initialState } = BookingDuck;
export default BookingDuck.reducer;

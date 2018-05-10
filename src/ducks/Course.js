import Duck from 'extensible-duck';

const CourseDuck = new Duck({
  namespace: 'marvin',
  store: 'Course',
  types: ['PUSH_NEW_COURSE', 'SET_COURSES_LIST', 'SET_EXAMS_LIST', 'LIST_LOADING', 'LIST_ERRORED'],
  initialState: {
    loading: false,
    errored: false,
    coursesList: [],
  },

  reducer: (state, action, duck) => {
    const { types } = duck;
    // const { initialState } = duck;
    switch (action.type) {
      case (types.PUSH_NEW_COURSE):
        return {
          ...state,
          loading: false,
        };
      case (types.SET_COURSES_LIST):
        return {
          ...state,
          coursesList: action.course,
          loading: false,
          errored: false,
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
    setCoursesList: course => (
      { type: duck.types.SET_COURSES_LIST, course }
    ),
    pushNewCourse: () => (
      { type: duck.types.PUSH_NEW_COURSE }
    ),
    listIsLoading: () => (
      { type: duck.types.LIST_LOADING }
    ),
    listHasErrored: () => (
      { type: duck.types.LIST_ERRORED }
    ),
  }),
});
export const { creators, selectors, initialState } = CourseDuck;
export default CourseDuck.reducer;

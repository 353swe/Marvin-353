import Duck from 'extensible-duck';
const --Name--Duck = new Duck({
  namespace: 'marvin',
  store: '',
  types: [],
  initialState: {},
  reducer: (state, action, duck) => {
    const { types } = duck;
    const { initialState } = duck;
    switch(action.type){

    }
  },
  selectors: {

  },
  creators: duck => ({

  })
});
export const { creators, selectors } = --Name--Duck;
export default --Name--Duck.reducer;

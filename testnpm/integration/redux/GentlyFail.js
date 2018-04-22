import { expectSaga } from 'redux-saga-test-plan';

export default function GentlyFail(features, reducer, failedState) {
  describe('when web3 is down', () => {
    features.forEach((feature) => {
      it(`${String(feature).split(' ')[1]} should fail gently`, () => expectSaga(feature, {})
        .withReducer(reducer)
        .hasFinalState(failedState)
        .run());
    });
  });
}

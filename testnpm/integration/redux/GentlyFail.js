import { expectSaga } from 'redux-saga-test-plan';

export default function GentlyFail(features, reducer, failedState) {
  describe('when web3 is down', () => {
    features.forEach((feature) => {
      // 49
      it(`${String(feature).split(' ')[1]} should fail gently`, () => expectSaga(feature, {})
        .withReducer(reducer)
        .provide({
          call: () => {
            throw new Error('Gently fail!');
          },
        })
        .hasFinalState(failedState)
        .run());
    });
  });
}

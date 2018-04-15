import { assert } from 'chai';
import FakeProvider from 'web3-fake-provider';
import getUniversityInstance from '../../src/web3calls/UniversityContractSupplier';


describe('UniversityContractSupplier', () => {
  beforeEach('Init a mock of web3', () => {
    global.web3 = { currentProvider: new FakeProvider() };
  });

  it('should get a void instance', () => {
    const contract = getUniversityInstance();
    assert.equal(contract !== {}, true);
  });

  it('should return the same instance', () => {
    const contract1 = getUniversityInstance();
    const contract2 = getUniversityInstance();
    const contract3 = getUniversityInstance();
    assert.equal(contract1, contract2);
    assert.equal(contract2, contract3);
  });
});

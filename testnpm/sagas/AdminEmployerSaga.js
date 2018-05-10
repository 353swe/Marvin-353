import { put, call } from 'redux-saga/effects';
import { expect } from 'chai';
import { getAllAdmins } from '../../src/sagas/AdminEmployerSaga';
import { getAdminNumber } from '../../src/web3calls/UniversityAdmin';
import { creators } from '../../src/ducks/AdminEmployer';

describe('university saga getAllAdmins', () => {
  // 26
  it('should use the correct flow', () => {
    const it = getAllAdmins();
    expect(it.next().value).to.deep.equal(put(creators.listIsLoading()));
    expect(it.next().value).to.deep.equal(call(getAdminNumber));
    it.next(3);
    expect(it.next([1, 2, 3]).value).to.deep.equal(put(creators.setAdminsList([1, 2, 3])));
  });
  // 27
  it('should handle errors', () => {
    const it = getAllAdmins();
    it.next();
    it.next();
    expect(it.next(() => (null)).value).to.deep.equal(put(creators.listHasErrored()));
  });
});

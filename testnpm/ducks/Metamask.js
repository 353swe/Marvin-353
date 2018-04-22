import { expect } from 'chai';
import Metamask, { creators, selectors, initialState } from '../../src/ducks/Metamask';

describe('Metamask duck', () => {
  describe('logged selector', () => {
    it('should return false when metamask is not present', () => {
      expect(selectors.logged({ metamask: { present: false } })).to.be.false;
    });
    it('should return false when metamask is present but no account is provided', () => {
      expect(selectors.logged({ metamask: { present: true, account: '' } })).to.be.false;
      expect(selectors.logged({ metamask: { present: true, account: null } })).to.be.false;
    });
    it('should return false when metamask is not present but an account is provided', () => {
      expect(selectors.logged({ metamask: { present: false, account: 'an\'account' } })).to.be.false;
    });
    it('should retrun true when metamask is present and an account is provided', () => {
      expect(selectors.logged({ metamask: { present: true, account: 'an\'account' } })).to.be.true;
    });
  });
  describe('reducer', () => {
    it('should return the correct initialState', () => {
      expect(Metamask(initialState, {})).to.deep.equal({ present: true, account: '' });
    });
    it('should set present to false when NOT_FOUND action is dispatched', () => {
      expect(Metamask(initialState, creators.notFound())).to.deep.equal({ present: false, account: '' });
    });
    it('should set the account when SET_ADDRESS action is dispatched', () => {
      expect(Metamask(initialState, creators.setAddress('address'))).to.deep.equal({ present: true, account: 'address' });
    });
    it('should reinitiate the state when the LOGOUT action is provided', () => {
      expect(Metamask(initialState), creators.logout()).to.deep.equal({ present: true, account: '' });
    });
    it('should set present to true when the LOGIN action si provided', () => {
      expect(Metamask({}, creators.login())).to.deep.equal({ present: true, account: '' });
    });
    it('should return the same state when no address is provided', () => {
      expect(Metamask({}, creators.setAddress())).to.deep.equal({});
    });
  });
});

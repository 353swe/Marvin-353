const University = artifacts.require('./contracts/University.sol');
const { assert } = require('chai');
// const expect = require('chai').expect;
// const BigNumber = require('bignumber.js');
//
// accounts[0] University

contract('University', (accounts) => {
  let contract;

  // WARNING!
  // await throw error if the modifier isn't satisfied
  beforeEach('Deploy University contract on blockchain', async () => {
    contract = await University.new({ from: accounts[0] });
  });

  it('Should say University is Founder', async () => {
    assert.equal(await contract.isUniversityFounder.call(accounts[0]), true);
  });

  it('Should say random user is not Founder', async () => {
    assert.equal(await contract.isUniversityFounder.call(accounts[1]), false);
  });

  it('Founder should have role 1', async () => {
    assert.equal(await contract.getRoleByAddress.call(accounts[0]), 1);
  });

  it('If not founder shouldn\'t have role 1', async () => {
    assert.equal(await contract.getRoleByAddress.call(accounts[1]), 0);
  });

  it('Should login Universtiy with value 1!', async () => {
    assert.equal(await contract.login.call({ from: accounts[0] }), 1);
  });

  it('Should login user not registred with value 0!', async () => {
    assert.equal(await contract.login.call({ from: accounts[1] }), 0);
  });
});

const UniversityAdmin = artifacts.require('./contracts/UniversityAdmin.sol');
const { assert } = require('chai');
// const expect = require('chai').expect;
// const BigNumber = require('bignumber.js');

contract('UniversityAdmin', (accounts) => {
  let contract;

  beforeEach('Deploy University contract on blockchain', async () => {
    contract = await UniversityAdmin.new({ from: accounts[0] });
  });

  it('Should say only University is registered', async () => {
    assert.equal(await contract.isUniversityFounder.call(accounts[0]), true);
    assert.equal(await contract.isUniversityFounder.call(accounts[1]), false);
    assert.equal(await contract.isUniversityFounder.call(accounts[2]), false);
    assert.equal(await contract.isUniversityFounder.call(accounts[3]), false);
  });

  it('Should login with university with code 0', async () => {
    assert.equal(await contract.login.call({ from: accounts[0] }), 1);
    assert.equal(await contract.login.call({ from: accounts[1] }), 0);
    assert.equal(await contract.login.call({ from: accounts[2] }), 0);
  });

  it('Should add new admin!', async () => {
    await contract.addNewAdmin(accounts[1], { from: accounts[0] });
    assert.equal(await contract.isAdmin.call(accounts[1]), true);
  });

  it('Should login with code 2 if is an admin', async () => {
    await contract.addNewAdmin(accounts[1], { from: accounts[0] });
    assert.equal(await contract.login.call({ from: accounts[1] }), 2);
  });

  it('Should register the admin number', async () => {
    assert.equal(await contract.getAdminNumber(), 0);
    await contract.addNewAdmin(accounts[1], { from: accounts[0] });
    assert.equal(await contract.getAdminNumber(), 1);
    await contract.addNewAdmin(accounts[2], { from: accounts[0] });
    assert.equal(await contract.getAdminNumber(), 2);
    await contract.addNewAdmin(accounts[3], { from: accounts[0] });
    assert.equal(await contract.getAdminNumber(), 3);
    await contract.addNewAdmin(accounts[4], { from: accounts[0] });
    assert.equal(await contract.getAdminNumber(), 4);
  });

  it('Should return the correct admin', async () => {
    await contract.addNewAdmin(accounts[1], { from: accounts[0] });
    assert.equal(await contract.getAdminAt(0), accounts[1]);
  });

  it('Should remove an admin', async () => {
    await contract.addNewAdmin(accounts[1], { from: accounts[0] });
    await contract.removeAdmin(accounts[1], { from: accounts[0] });
    assert.equal(await contract.getAdminAt(0), 0);
    assert.equal(await contract.getAdminNumber(), 0);
  });

  it('Should not add existing admin', async () => {
    await contract.addNewAdmin(accounts[1], { from: accounts[0] });
    try {
      await contract.addNewAdmin(accounts[1], { from: accounts[0] });
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });

  it('Only founder can add new admin', async () => {
    try {
      await contract.addNewAdmin(accounts[1], { from: accounts[1] });
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });

  it('Only founder can remove an admin', async () => {
    await contract.addNewAdmin(accounts[1], { from: accounts[0] });
    try {
      await contract.removeAdmin(accounts[1], { from: accounts[1] });
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });
  it('Should not remove an invalid admin', async () => {
    await contract.addNewAdmin(accounts[1], { from: accounts[0] });
    try {
      await contract.removeAdmin(0, { from: accounts[0] });
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });
});


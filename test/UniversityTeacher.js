const UniversityTeacher = artifacts.require('./contracts/UniversityTeacher.sol');
const { assert } = require('chai');
// const expect = require('chai').expect;
// const BigNumber = require('bignumber.js');

contract('UniversityTeacher', (accounts) => {
  let contract;

  beforeEach('Deploy University contract on blockchain', async () => {
    contract = await UniversityTeacher.new({ from: accounts[0] });
  });
  // 18
  it('Should say University founder isn\'t a teacher', async () => {
    assert.equal(await contract.isTeacher.call(accounts[0]), false);
    await contract.addNewAdmin(accounts[5]);
    assert.equal(await contract.isAdmin.call(accounts[5]), true);
  });
  // 19
  it('Should say University has no teachers and no unconfirmed teacher', async () => {
    assert.equal(await contract.getTeacherNumber.call(), 0);
    assert.equal(await contract.getNonApprovedTeacherNumber.call(), 0);
  });
  // 20
  it('Everyone not registered can ask for an account', async () => {
    await contract.requestTeacherAccount('name', 'surname', { from: accounts[1] });
    assert.equal(await contract.getNonApprovedTeacherNumber.call(), 1);
    const askingAccount = await contract.getNotApprovedTeacherContractAddressAt.call(0);
    assert.equal(String(askingAccount).length, 42);
    assert.equal(await contract.getTeacherNumber.call(), 0);
  });
  // 21
  it('A registered user can\'t ask a teacher account', async () => {
    try {
      await contract.requestTeacherAccount('name', 'surname', { from: accounts[0] });
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });
  // 22
  it('An user can\'t ask two times an account', async () => {
    await contract.requestTeacherAccount('name', 'surname', { from: accounts[1] });
    try {
      await contract.requestTeacherAccount('name', 'surname', { from: accounts[1] });
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });
  // 23
  it('An admin can confirm the account', async () => {
    await contract.addNewAdmin(accounts[1], { from: accounts[0] });
    await contract.requestTeacherAccount('name', 'surname', { from: accounts[2] });
    await contract.confirmTeacher(
      await contract.getNotApprovedTeacherContractAddressAt.call(0),
      { from: accounts[1] },
    );
    assert.equal(await contract.getTeacherNumber.call(), 1);
  });
  // 24
  it('Only the admin can confirm the account', async () => {
    await contract.addNewAdmin(accounts[1], { from: accounts[0] });
    await contract.requestTeacherAccount('name', 'surname', { from: accounts[2] });
    try {
      await contract.confirmTeacher(
        await contract.getNotApprovedTeacherContractAddressAt.call(0),
        { from: accounts[0] },
      );
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });
  // 25
  it('Souldn\'t confirm invalid contract address', async () => {
    await contract.addNewAdmin(accounts[1], { from: accounts[0] });
    try {
      await contract.confirmTeacher(accounts[4], { from: accounts[1] });
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });
  // 26
  it('An invalid teacher contract shouldn\'t be removed', async () => {
    await contract.addNewAdmin(accounts[1], { from: accounts[0] });
    try {
      await contract.removeTeacher(accounts[4], { from: accounts[1] });
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });
  // 27
  it('A non approved teacher contract shouldn\'t be removed', async () => {
    await contract.addNewAdmin(accounts[1], { from: accounts[0] });
    await contract.requestTeacherAccount('name', 'surname', { from: accounts[2] });
    try {
      await contract.removeTeacher(accounts[2], { from: accounts[1] });
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });
  // 28
  it('Should ask, approve and remove a teacher', async () => {
    await contract.addNewAdmin(accounts[1], { from: accounts[0] });
    await contract.requestTeacherAccount('name', 'surname', { from: accounts[2] });
    assert.equal(await contract.getTeacherNumber.call(), 0);
    assert.equal(await contract.isNotConfirmedTeacher.call(accounts[2]), true);
    const askingAccount = await contract.getNotApprovedTeacherContractAddressAt.call(0);
    assert.equal(String(askingAccount).length, 42);
    // confirm
    await contract.confirmTeacher(
      await contract.getNotApprovedTeacherContractAddressAt.call(0),
      { from: accounts[1] },
    );
    assert.equal(await contract.isNotConfirmedTeacher.call(accounts[2]), false);
    assert.equal(await contract.getTeacherNumber.call(), 1);
    const confirmedAccount = await contract.getTeacherContractAddressAt.call(0);
    assert.equal(confirmedAccount, askingAccount);
    const confirmedAccountFromPublicAddress =
      await contract.getTeacherContractFromPublicAddress.call(accounts[2]);
    assert.equal(confirmedAccount, confirmedAccountFromPublicAddress);
    // remove
    await contract.removeTeacher(
      await contract.getTeacherContractFromPublicAddress.call(accounts[2]),
      { from: accounts[1] },
    );
    assert.equal(await contract.isNotConfirmedTeacher.call(accounts[2]), false);
    assert.equal(await contract.getTeacherNumber.call(), 0);
  });
  // 29
  it('Should ask but not approve a denied teacher', async () => {
    await contract.addNewAdmin(accounts[1], { from: accounts[0] });
    await contract.requestTeacherAccount('name', 'surname', { from: accounts[2] });
    assert.equal(await contract.getTeacherNumber.call(), 0);
    assert.equal(await contract.isNotConfirmedTeacher.call(accounts[2]), true);
    const askingAccount = await contract.getNotApprovedTeacherContractAddressAt.call(0);
    assert.equal(String(askingAccount).length, 42);
    // not confirm
    await contract.denyTeacher(
      await contract.getNotApprovedTeacherContractAddressAt.call(0),
      { from: accounts[1] },
    );
    assert.equal(await contract.isNotConfirmedTeacher.call(accounts[2]), false);
    assert.equal(await contract.getTeacherNumber.call(), 0);
  });
  // 30
  it('Should get the correct role for asking teacher and confirmed teacher', async () => {
    await contract.addNewAdmin(accounts[1], { from: accounts[0] });
    await contract.requestTeacherAccount('name', 'surname', { from: accounts[2] });
    await contract.requestTeacherAccount('name', 'surname', { from: accounts[3] });
    // confirm [2]
    await contract.confirmTeacher(
      await contract.getNotApprovedTeacherContractAddressAt.call(0),
      { from: accounts[1] },
    );
    assert.equal(await contract.getRoleByAddress.call(accounts[2]), 3);
    assert.equal(await contract.getRoleByAddress.call(accounts[3]), 13);
  });
  // 31
  it('Should not remove teacher with invalid address', async () => {
    try {
      await contract.removeTeacher(accounts[1], { from: accounts[0] });
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });
  // 32
  it('Should not confirm teacher with invalid address', async () => {
    try {
      await contract.confirmTeacher(accounts[3], { from: accounts[0] });
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });
});


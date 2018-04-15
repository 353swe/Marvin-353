const UniversityYear = artifacts.require('./contracts/UniversityYear.sol');
const Year = artifacts.require('./contracts/Year.sol');
const { assert } = require('chai');
// const expect = require('chai').expect;
// const BigNumber = require('bignumber.js');

contract('UniversityYear', (accounts) => {
  let university;

  beforeEach('Deploy University contract on blockchain', async () => {
    university = await UniversityYear.new({ from: accounts[0] });
  });
  it('Should add new academic year', async () => {
    assert.equal(await university.getAcademicYearNumber.call(), 0);
    await university.addNewAcademicYear(2018, { from: accounts[0] });
    assert.equal(await university.getAcademicYearNumber.call(), 1);
    const year = Year.at(await university.getAcademicYearContractByYear.call(2018));
    assert.equal(await year.getSolarYear.call(), 2018);
  });
  it('Should add and the remove academic year', async () => {
    await university.addNewAcademicYear(2018, { from: accounts[0] });
    const yearBefore = Year.at(await university.getAcademicYearContractByYear.call(2018));
    assert.equal(await yearBefore.getSolarYear.call(), 2018);
    await university.removeAcademicYear(2018, { from: accounts[0] });
    assert.equal(await university.getAcademicYearNumber.call(), 0);
    assert.equal(await university.getAcademicYearContractByYear.call(2018), 0);
  });
  it('Should not add the same year two time', async () => {
    await university.addNewAcademicYear(2018, { from: accounts[0] });
    try {
      await university.addNewAcademicYear(2018, { from: accounts[0] });
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });
  it('Should not remove invalid academic year', async () => {
    try {
      await university.removeAcademicYear(2018, { from: accounts[0] });
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });
  it('Shouldn\'t remove not empty academic year', async () => {
    await university.addNewAcademicYear(2018, { from: accounts[0] });
    const year = Year.at(await university.getAcademicYearContractByYear.call(2018));
    // add an admin
    await university.addNewAdmin(accounts[1], { from: accounts[0] });
    // add a course
    await year.addNewCourse(1, 2, { from: accounts[1] });
    try {
      await university.removeAcademicYear(2018, { from: accounts[0] });
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });
  it('Should get the same address from index and year', async () => {
    await university.addNewAcademicYear(2018, { from: accounts[0] });
    assert.equal(
      await university.getAcademicYearContractByYear.call(2018),
      await university.getAcademicYearContractAt.call(0),
    );
  });
});

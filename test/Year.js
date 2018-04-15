const Year = artifacts.require('./contracts/Year.sol');
const UniversityYear = artifacts.require('./contracts/UniversityYear.sol');
const Course = artifacts.require('./contracts/Course.sol');
const { assert } = require('chai');

contract('User', (accounts) => {
  let contract;
  let university;

  beforeEach('Deploy year contract on blockchain', async () => {
    university = await UniversityYear.new({ from: accounts[0] });
    await university.addNewAcademicYear(2018, { from: accounts[0] });
    contract = Year.at(await university.getAcademicYearContractByYear.call(2018));
    await university.addNewAdmin(accounts[1], { from: accounts[0] });
  });

  it('Should have the correct default data', async () => {
    assert.equal(await contract.getSolarYear.call(), 2018);
    assert.equal(await contract.getCourseNumber.call(), 0);
  });

  it('Should add a new course and retrieve it', async () => {
    assert.equal(await contract.getCourseNumber.call(), 0);
    await contract.addNewCourse(
      0x1234567890000000000000000000000000000000000000000000000000000000,
      180,
      { from: accounts[1] },
    );
    assert.equal(await contract.getCourseNumber.call(), 1);
    const course = Course.at(await contract.getCourseContractAt.call(0));
    assert.equal(
      await course.getName.call(),
      0x1234567890000000000000000000000000000000000000000000000000000000,
    );
    assert.equal(await course.getCreditsToGraduate.call(), 180);
    assert.equal(await course.getSolarYear.call(), 2018);
    assert.equal(await contract.getCourseNumber.call(), 1);
  });

  it('Only admin can add new course', async () => {
    await contract.addNewCourse('abc', 180, { from: accounts[1] });
    try {
      await contract.addNewCourse('abc', 180, { from: accounts[0] });
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });
});

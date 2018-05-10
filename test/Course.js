const UniversityExam = artifacts.require('./contracts/UniversityExam.sol');
const Year = artifacts.require('./contracts/Year.sol');
const Course = artifacts.require('./contracts/Course.sol');
const { assert } = require('chai');

contract('Course', (accounts) => {
  let university;
  let year;
  let course;

  beforeEach('Deploy Student contract on blockchain', async () => {
    university = await UniversityExam.new({ from: accounts[0] });
    // add an admin
    await university.addNewAdmin(accounts[1], { from: accounts[0] });
    // add a teacher
    await university.requestTeacherAccount(
      0x7b00000000000000000000000000000000000000000000000000000000000000,
      456,
      { from: accounts[2] },
    );
    await university.confirmTeacher(
      await university.getNotApprovedTeacherContractAddressAt.call(0),
      { from: accounts[1] },
    );
    // add a year
    await university.addNewAcademicYear(2018, { from: accounts[0] }, { from: accounts[0] });
    year = Year.at(await university.getAcademicYearContractByYear.call(2018));
    // add a course
    await year.addNewCourse(123, 180, { from: accounts[1] });
    course = Course.at(await year.getCourseContractAt.call(0));
  });
  // 82
  it('Should have the correct data', async () => {
    assert.equal(await course.getExamNumber.call(), 0);
    assert.equal(
      await course.getName.call(),
      0x7b00000000000000000000000000000000000000000000000000000000000000,
    );
    assert.equal(await course.getCreditsToGraduate.call(), 180);
    assert.equal(await course.getSolarYear.call(), 2018);
  });
  // 83
  it('Should add an exam', async () => {
    assert.equal(await course.getExamNumber.call(), 0);
    await course.addNewExam(123, 12, true, { from: accounts[1] });
    assert.equal(await course.getExamNumber.call(), 1);
  });
  // 84
  it('Only the admin can add an exam', async () => {
    try {
      await course.addNewExam(123, 12, true, { from: accounts[2] });
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });
});


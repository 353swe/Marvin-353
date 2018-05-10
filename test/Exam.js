const UniversityExam = artifacts.require('./contracts/UniversityExam.sol');
const Year = artifacts.require('./contracts/Year.sol');
const Course = artifacts.require('./contracts/Course.sol');
const Exam = artifacts.require('./contracts/Exam.sol');
const { assert } = require('chai');

contract('Exam', (accounts) => {
  let university;
  let year;
  let course;
  let exam1;
  let exam2;

  beforeEach('Deploy Student contract on blockchain', async () => {
    university = await UniversityExam.new({ from: accounts[0] });
    // add an admin
    await university.addNewAdmin(accounts[1], { from: accounts[0] });
    // add a teacher
    await university.requestTeacherAccount(123, 456, { from: accounts[2] });
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
    // add some exam
    await course.addNewExam(
      0x7b00000000000000000000000000000000000000000000000000000000000000,
      12,
      true,
      { from: accounts[1] },
    );
    exam1 = Exam.at(await course.getExamContractAt.call(0));
    await course.addNewExam(456, 10, false, { from: accounts[1] });
    exam2 = Exam.at(await course.getExamContractAt.call(1));
  });
  // 77
  it('Should have the correct data', async () => {
    assert.equal(await exam1.getEnrolledNumber.call(), 0);
    assert.equal(await exam1.getCourse.call(), course.address);
    assert.equal(await exam1.getTeacherContract.call(), 0);
    assert.equal(await exam1.getObligatoriness.call(), true);
    assert.equal(await exam2.getObligatoriness.call(), false);
    assert.equal(await exam1.getCredits.call(), 12);
    assert.equal(
      await exam1.getName.call(),
      0x7b00000000000000000000000000000000000000000000000000000000000000,
    );
  });
  // 78
  it('A student should enroll to the exam', async () => {
    assert.equal(await exam2.getEnrolledNumber.call(), 0);
    await exam2.addMeAsSubscriber({ from: accounts[3] });
    assert.equal(await exam2.getEnrolledNumber.call(), 1);
  });
  // 79
  it('Only the admin can add an exam', async () => {
    try {
      await course.addNewExam(123, 12, true, { from: accounts[2] });
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });
  // 80
  it('Shouldn\'t remove a subscriber if not from University', async () => {
    try {
      await exam1.removeSubscriber(21312312, { from: accounts[2] });
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });
  // 81
  it('Shouldn\'t subscribe two times', async () => {
    await exam1.addMeAsSubscriber({ from: accounts[7] });
    try {
      await exam1.addMeAsSubscriber({ from: accounts[7] });
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });
});


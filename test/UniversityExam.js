const UniversityExam = artifacts.require('./contracts/UniversityExam.sol');
const Teacher = artifacts.require('./contracts/Teacher.sol');
const Year = artifacts.require('./contracts/Year.sol');
const Course = artifacts.require('./contracts/Course.sol');
const Exam = artifacts.require('./contracts/Exam.sol');
const { assert } = require('chai');
// const expect = require('chai').expect;
// const BigNumber = require('bignumber.js');

contract('UniversityExam', (accounts) => {
  let university;
  let teacher;
  let year;
  let course;
  let exam;

  beforeEach('Deploy University contract on blockchain', async () => {
    university = await UniversityExam.new({ from: accounts[0] });
    // add an admin
    await university.addNewAdmin(accounts[1], { from: accounts[0] });
    // add a teacher
    await university.requestTeacherAccount(123, 456, { from: accounts[2] });
    await university.confirmTeacher(
      await university.getNotApprovedTeacherContractAddressAt.call(0),
      { from: accounts[1] },
    );
    teacher = Teacher.at(await university.getTeacherContractFromPublicAddress.call(accounts[2]));
    // add a year
    await university.addNewAcademicYear(2018, { from: accounts[0] });
    year = Year.at(await university.getAcademicYearContractByYear.call(2018));
    // add a course
    await year.addNewCourse(123, 180, { from: accounts[1] });
    course = Course.at(await year.getCourseContractAt.call(0));
    // add an exam
    await course.addNewExam(123, 12, true, { from: accounts[1] });
    exam = await Exam.at(await course.getExamContractAt.call(0));
  });
  // 48
  it('An admin can associate a teacher to an exam', async () => {
    await university.associateTeacherToExam(
      teacher.address,
      exam.address,
      { from: accounts[1] },
    );
    assert.equal(await exam.getTeacherContract.call(), teacher.address);
  });
  // 49
  it('The exam has to be removed to be reassigned to another teacher', async () => {
    await university.associateTeacherToExam(
      teacher.address,
      exam.address,
      { from: accounts[1] },
    );
    assert.equal(await teacher.getExamNumber.call(), 1);
    // add a teacher2
    await university.requestTeacherAccount(123, 456, { from: accounts[4] });
    await university.confirmTeacher(
      await university.getNotApprovedTeacherContractAddressAt.call(0),
      { from: accounts[1] },
    );
    const teacher2 =
      Teacher.at(await university.getTeacherContractFromPublicAddress.call(accounts[4]));
    await university.associateTeacherToExam(
      teacher2.address,
      exam.address,
      { from: accounts[1] },
    );
    assert.equal(await exam.getTeacherContract.call(), teacher2.address);
    assert.equal(await teacher2.getExamNumber.call(), 1);
    assert.equal(await teacher.getExamNumber.call(), 0);
  });
  // 50
  it('Only an admin can associate a teacher to an exam', async () => {
    try {
      await university.associateTeacherToExam(
        teacher.address,
        exam.address,
        { from: accounts[0] },
      );
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });
  // 51
  it('Cannot associate a wrong admin address', async () => {
    try {
      await university.associateTeacherToExam(
        0,
        exam.address,
        { from: accounts[0] },
      );
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });
  // 52
  it('Cannot associate a wrong exam address', async () => {
    try {
      await university.associateTeacherToExam(
        teacher.address,
        0,
        { from: accounts[0] },
      );
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });
});


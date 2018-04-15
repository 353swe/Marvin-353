const UniversityExam = artifacts.require('./contracts/UniversityExam.sol');
const Teacher = artifacts.require('./contracts/Teacher.sol');
const Year = artifacts.require('./contracts/Year.sol');
const Course = artifacts.require('./contracts/Course.sol');
const Exam = artifacts.require('./contracts/Exam.sol');
const { assert } = require('chai');
// const expect = require('chai').expect;
// const BigNumber = require('bignumber.js');

contract('UniversityStudent', (accounts) => {
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
    await university.associateTeacherToExam(
      teacher.address,
      exam.address,
      { from: accounts[1] },
    );
  });
  it('Should have correct default data', async () => {
    assert.equal(await university.getStudentNumber.call(), 0);
    assert.equal(await university.getNotApprovedStudentNumber.call(), 0);
  });
  it('Should ask and confirm a student', async () => {
    assert.equal(await university.getStudentNumber.call(), 0);
    assert.equal(await university.getNotApprovedStudentNumber.call(), 0);
    await university.requestStudentAccount(1, 2, course.address, { from: accounts[3] });
    assert.equal(await university.getStudentNumber.call(), 0);
    assert.equal(await university.getNotApprovedStudentNumber.call(), 1);
    await university.confirmStudent(
      await university.getNotApprovedStudentContractAddressAt.call(0),
      { from: accounts[1] },
    );
    assert.equal(await university.getStudentNumber.call(), 1);
    assert.equal(await university.getNotApprovedStudentNumber.call(), 0);
    assert.equal(
      await university.getStudentContractFromPublicAddress.call(accounts[3]),
      await university.getStudentContractAddressAt.call(0),
    );
  });
  it('Should ask and confirm a student 2', async () => {
    // add a new course
    await year.addNewCourse(123, 180, { from: accounts[1] });
    const course2 = Course.at(await year.getCourseContractAt.call(0));
    assert.equal(await university.getStudentNumber.call(), 0);
    assert.equal(await university.getNotApprovedStudentNumber.call(), 0);
    await university.requestStudentAccount(1, 2, course2.address, { from: accounts[3] });
    assert.equal(await university.getStudentNumber.call(), 0);
    assert.equal(await university.getNotApprovedStudentNumber.call(), 1);
    await university.confirmStudent(
      await university.getNotApprovedStudentContractAddressAt.call(0),
      { from: accounts[1] },
    );
    assert.equal(await university.getStudentNumber.call(), 1);
    assert.equal(await university.getNotApprovedStudentNumber.call(), 0);
    assert.equal(
      await university.getStudentContractFromPublicAddress.call(accounts[3]),
      await university.getStudentContractAddressAt.call(0),
    );
  });
  it('Should ask, confirm and delete a student', async () => {
    await university.requestStudentAccount(1, 2, course.address, { from: accounts[3] });
    await university.confirmStudent(
      await university.getNotApprovedStudentContractAddressAt.call(0),
      { from: accounts[1] },
    );
    await university.removeStudent(
      await university.getStudentContractAddressAt.call(0),
      { from: accounts[1] },
    );
    assert.equal(await university.getStudentNumber.call(), 0);
    assert.equal(await university.getNotApprovedStudentNumber.call(), 0);
  });
  it('Should ask, but not confirm a student', async () => {
    await university.requestStudentAccount(1, 2, course.address, { from: accounts[3] });
    assert.equal(await university.getStudentNumber.call(), 0);
    assert.equal(await university.getNotApprovedStudentNumber.call(), 1);
    await university.denyStudent(
      await university.getNotApprovedStudentContractAddressAt.call(0),
      { from: accounts[1] },
    );
    assert.equal(await university.getStudentNumber.call(), 0);
    assert.equal(await university.getNotApprovedStudentNumber.call(), 0);
  });
  it('Should not confirm invalid student', async () => {
    try {
      await university.confirmStudent(123, { from: accounts[1] });
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });
  it('Should not remove invalid student', async () => {
    try {
      await university.denyStudent(123, { from: accounts[1] });
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });
  it('Should not remove invalid student', async () => {
    try {
      await university.denyStudent(0, { from: accounts[1] });
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });
});

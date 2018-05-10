const Student = artifacts.require('./contracts/Student.sol');
const Teacher = artifacts.require('./contracts/Teacher.sol');
const UniversityExam = artifacts.require('./contracts/UniversityExam.sol');
const Year = artifacts.require('./contracts/Year.sol');
const Course = artifacts.require('./contracts/Course.sol');
const Exam = artifacts.require('./contracts/Exam.sol');
const { assert } = require('chai');

contract('Student', (accounts) => {
  let university;
  let teacher;
  let student;
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
    teacher = Teacher.at(await university.getTeacherContractFromPublicAddress.call(accounts[2]));
    // add a year
    await university.addNewAcademicYear(2018, { from: accounts[0] }, { from: accounts[0] });
    year = Year.at(await university.getAcademicYearContractByYear.call(2018));
    // add a course
    await year.addNewCourse(123, 180, { from: accounts[1] });
    course = Course.at(await year.getCourseContractAt.call(0));
    // add some exam
    await course.addNewExam(123, 12, true, { from: accounts[1] });
    exam1 = Exam.at(await course.getExamContractAt.call(0));
    await course.addNewExam(456, 10, false, { from: accounts[1] });
    exam2 = Exam.at(await course.getExamContractAt.call(1));
    // associate exams to teacher
    await university.associateTeacherToExam(
      teacher.address,
      exam1.address,
      { from: accounts[1] },
    );
    await university.associateTeacherToExam(
      teacher.address,
      exam2.address,
      { from: accounts[1] },
    );
    // add a student
    await university.requestStudentAccount(123, 456, course.address, { from: accounts[3] });
    await university.confirmStudent(
      await university.getNotApprovedStudentContractAddressAt.call(0),
      { from: accounts[1] },
    );
    student = Student.at(await university.getStudentContractFromPublicAddress.call(accounts[3]));
  });
  // 63
  it('Should get the correct number of exams', async () => {
    assert.equal(await student.getExamNumber.call(), 2);
  });
  // 64
  it('Should get course contract address', async () => {
    assert.equal(await student.getCourseContract.call(), course.address);
  });
  // 65
  it('Should get exams contract addresses', async () => {
    assert.equal(await student.getExamContractAt.call(0), exam1.address);
    assert.equal(await student.getExamContractAt.call(1), exam2.address);
  });
  // 66
  it('Should get the correct default subscription', async () => {
    assert.equal(await student.getExamSubscriptionAt.call(0), true);
    assert.equal(await student.getExamSubscriptionAt.call(1), false);
    assert.equal(await student.getExamValuationAt.call(0), 0);
    assert.equal(await student.getExamValuationAt.call(1), 0);
  });
  // 67
  it('The student can enroll to an optional exam', async () => {
    assert.equal(await student.getExamSubscriptionAt.call(1), false);
    student.enrollToOptionalExam(1, { from: accounts[3] });
    assert.equal(await student.getExamSubscriptionAt.call(1), true);
  });
  // 68
  it('The student can\'t enroll to an exam not optional', async () => {
    try {
      assert.equal(await student.enrollToOptionalExam(0), { from: accounts[3] });
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });
  // 69
  it('The student can\'t enroll two times at the same exam', async () => {
    await student.enrollToOptionalExam(1, { from: accounts[3] });
    try {
      assert.equal(await student.enrollToOptionalExam(1), { from: accounts[3] });
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });
  // 70
  it('Only the student can enroll to an optional exam', async () => {
    try {
      await student.enrollToOptionalExam(1, { from: accounts[2] });
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });
  // 71
  it('Should return the index of the exam', async () => {
    assert.equal(await student.getIndexOfExam.call(exam1.address), 0);
  });
  // 72
  it('Should revert if the exam doesn\'t exist', async () => {
    try {
      assert.equal(await student.getIndexOfExam.call(accounts[0]), 0);
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });
  // 73
  it('Should not register a valuation if not the correct professor', async () => {
    try {
      assert.equal(await student.registerValuation(0, 20, { from: accounts[7] }));
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });
});

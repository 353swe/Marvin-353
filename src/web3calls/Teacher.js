const contract = require('truffle-contract');
const contractTeacherJson = require('../../build/contracts/Teacher.json');

function getTeacherContract(address) {
  const contractTeacher = contract(contractTeacherJson);
  contractTeacher.setProvider(web3.currentProvider);
  return contractTeacher.at(address);
}

function getExamNumber(address) {
  console.log('Teacher getExamNumber');
  const contractInstance = getTeacherContract(address);
  return contractInstance.then(instance =>
    instance.getExamNumber.call());
}

function getExamContractAt(address, _index) {
  console.log('Teacher getExamContractAt');
  const contractInstance = getTeacherContract(address);
  return contractInstance.then(instance =>
    instance.getExamContractAt(_index));
}

function registerNewVoteStudentExam(address, _examindex, _student, _valuation) {
  console.log('Teacher registerNewVoteStudentExam');
  const contractInstance = getTeacherContract(address);
  return contractInstance.then(instance =>
    instance.registerNewVoteStudentExam(
      _examindex,
      _student,
      _valuation,
      { from: web3.eth.accounts[0] },
    ));
}

export { getExamNumber, getExamContractAt, registerNewVoteStudentExam };

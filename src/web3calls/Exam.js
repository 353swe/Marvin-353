const contract = require('truffle-contract');
const contractExamJson = require('../../build/contracts/Exam.json');

function getExamContract(address) {
  const contractExam = contract(contractExamJson);
  contractExam.setProvider(web3.currentProvider);
  return contractExam.at(address);
}

function getEnrolledNumber(address) {
  console.log('Exam getEnrolledNumber');
  const contractInstance = getExamContract(address);
  return contractInstance.then(instance =>
    instance.getEnrolledNumber.call());
}

function getEnrolledContractAt(address, _index) {
  console.log('Exam getEnrolledContractAt');
  const contractInstance = getExamContract(address);
  return contractInstance.then(instance =>
    instance.getEnrolledContractAt(_index));
}

function getCourse(address) {
  console.log('Exam getCourse');
  const contractInstance = getExamContract(address);
  return contractInstance.then(instance =>
    instance.getCourse.call());
}

function getName(address) {
  console.log('Exam getName');
  const contractInstance = getExamContract(address);
  return contractInstance.then(instance =>
    instance.getName.call());
}

function getTeacherContract(address) {
  console.log('Exam getTeacherContract');
  const contractInstance = getExamContract(address);
  return contractInstance.then(instance =>
    instance.getTeacherContract.call());
}

function getObligatoriness(address) {
  console.log('Exam getObligatoriness');
  const contractInstance = getExamContract(address);
  return contractInstance.then(instance =>
    instance.getObligatoriness.call());
}

function getCredits(address) {
  console.log('Exam getCredits');
  const contractInstance = getExamContract(address);
  return contractInstance.then(instance =>
    instance.getCredits.call());
}

function addMeAsSubscriber(address) {
  console.log('Exam addMeAsSubscriber');
  const contractInstance = getExamContract(address);
  return contractInstance.then(instance =>
    instance.addMeAsSubscriber({ from: web3.eth.accounts[0] }));
}

export {
  getEnrolledNumber,
  getEnrolledContractAt,
  getCourse,
  getName,
  getTeacherContract,
  getObligatoriness,
  getCredits,
  addMeAsSubscriber,
};

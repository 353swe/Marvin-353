const contract = require('truffle-contract');
const contractStudentJson = require('../../build/contracts/Student.json');

function getStudentContract(address) {
  const contractStudent = contract(contractStudentJson);
  contractStudent.setProvider(web3.currentProvider);
  return contractStudent.at(address);
}

function getCourseContract(address) {
  console.log('Student getCourseContract');
  const contractInstance = getStudentContract(address);
  return contractInstance.then(instance =>
    instance.getCourseContract.call());
}

function getExamNumber(address) {
  console.log('Student getExamNumber');
  const contractInstance = getStudentContract(address);
  return contractInstance.then(instance =>
    instance.getExamNumber.call().then(Number));
}

function getExamContractAt(address, _index) {
  console.log('Student getExamContractAt');
  const contractInstance = getStudentContract(address);
  return contractInstance.then(instance =>
    instance.getExamContractAt(_index));
}

function getExamSubscriptionAt(address, _index) {
  console.log('Student getExamSubscriptionAt');
  const contractInstance = getStudentContract(address);
  return contractInstance.then(instance =>
    instance.getExamSubscriptionAt(_index).then(Boolean));
}

function getExamValuationAt(address, _index) {
  console.log('Student getExamValuationAt');
  const contractInstance = getStudentContract(address);
  return contractInstance.then(instance =>
    instance.getExamValuationAt(_index).then((valuation) => {
      let correctEvaluation = Number(valuation);
      if (correctEvaluation !== 0) correctEvaluation -= 1;
      return correctEvaluation;
    }));
}

function enrollToOptionalExam(address, _index) {
  console.log('Student enrollToOptionalExam');
  const contractInstance = getStudentContract(address);
  return contractInstance.then(instance =>
    instance.enrollToOptionalExam(_index, { from: web3.eth.accounts[0] }));
}

function getIndexOfExam(address, exam) {
  console.log('Student getIndexOfExam');
  const contractInstance = getStudentContract(address);
  return contractInstance.then(instance =>
    instance.getIndexOfExam(exam).then(Number));
}


export {
  getCourseContract,
  getExamNumber,
  getExamContractAt,
  getExamSubscriptionAt,
  getExamValuationAt,
  enrollToOptionalExam,
  getIndexOfExam,
};

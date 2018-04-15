const contract = require('truffle-contract');
const contractCourseJson = require('../../build/contracts/Course.json');

function getCourseContract(address) {
  const contractCourse = contract(contractCourseJson);
  contractCourse.setProvider(web3.currentProvider);
  return contractCourse.at(address);
}

function getExamNumber(address) {
  console.log('Course getExamNumber');
  const contractInstance = getCourseContract(address);
  return contractInstance.then(instance =>
    instance.getExamNumber.call());
}

function getExamContractAt(address, _index) {
  console.log('Course getExamContractAt');
  const contractInstance = getCourseContract(address);
  return contractInstance.then(instance =>
    instance.getExamContractAt(_index));
}

function getName(address) {
  console.log('Course getName');
  const contractInstance = getCourseContract(address);
  return contractInstance.then(instance =>
    instance.getName.call());
}

function getCreditsToGraduate(address) {
  console.log('Course getCreditsToGraduate');
  const contractInstance = getCourseContract(address);
  return contractInstance.then(instance =>
    instance.getCreditsToGraduate.call());
}

function getSolarYear(address) {
  console.log('Course getSolarYear');
  const contractInstance = getCourseContract(address);
  return contractInstance.then(instance =>
    instance.getSolarYear.call());
}

function addNewExam(address, _name, _credits, _obbligatoriety) {
  console.log('Course addNewExam');
  const contractInstance = getCourseContract(address);
  return contractInstance.then(instance =>
    instance.addNewExam(
      _name,
      _credits,
      _obbligatoriety,
      { from: web3.eth.accounts[0] },
    ));
}

export {
  getExamNumber,
  getExamContractAt,
  getName,
  getCreditsToGraduate,
  getSolarYear,
  addNewExam,
};

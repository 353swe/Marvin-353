const contract = require('truffle-contract');
const contractYearJson = require('../../build/contracts/Year.json');

function getYearContract(address) {
  const contractYear = contract(contractYearJson);
  contractYear.setProvider(web3.currentProvider);
  return contractYear.at(address);
}

function getCourseNumber(address) {
  console.log('Year getCourseNumber');
  const contractInstance = getYearContract(address);
  return contractInstance.then(instance =>
    instance.getCourseNumber.call());
}

function getCourseContractAt(address, _index) {
  console.log('Year getCourseContractAt');
  const contractInstance = getYearContract(address);
  return contractInstance.then(instance =>
    instance.getCourseContractAt(_index));
}


function getSolarYear(address) {
  console.log('Year getSolarYear');
  const contractInstance = getYearContract(address);
  return contractInstance.then(instance =>
    instance.getSolarYear());
}

function addNewCourse(address, _name, _creditsForGraduation) {
  console.log('Year addNewCourse');
  const contractInstance = getYearContract(address);
  return contractInstance.then(instance =>
    instance.addNewCourse(
      _name,
      _creditsForGraduation,
      { from: web3.eth.accounts[0] },
    ));
}

export { getCourseNumber, getCourseContractAt, getSolarYear, addNewCourse };

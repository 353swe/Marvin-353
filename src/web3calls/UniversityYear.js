import getUniversityInstance from './UniversityContractSupplier';

function getAcademicYearNumber() {
  console.log('get academic year number');
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.getAcademicYearNumber.call().then(Number));
}

function getAcademicYearContractAt(_index) {
  console.log(`get academic year contract at ${_index}`);
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.getAcademicYearContractAt.call(_index));
}

function getAcademicYearContractByYear(_year) {
  console.log(`get academic year contract by year ${_year}`);
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.getAcademicYearContractByYear.call(_year));
}

function addNewAcademicYear(_year) {
  console.log(`add academic year, year ${_year}`);
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.addNewAcademicYear(_year, { from: web3.eth.accounts[0] }));
}

function removeAcademicYear(_year) {
  console.log(`remove academic year, year ${_year}`);
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.removeAcademicYear(_year, { from: web3.eth.accounts[0] }));
}

export {
  getAcademicYearNumber,
  getAcademicYearContractAt,
  getAcademicYearContractByYear,
  addNewAcademicYear,
  removeAcademicYear,
};

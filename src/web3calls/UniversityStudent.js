import getUniversityInstance from './UniversityContractSupplier';

function getStudentNumber() {
  console.log('get student number');
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.getStudentNumber.call());
}

function getStudentContractAddressAt(_index) {
  console.log(`get student contract address at ${_index}`);
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.getStudentContractAddressAt.call(_index));
}

function getNotApprovedStudentNumber() {
  console.log('get not approved student number');
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.getNotApprovedStudentNumber.call());
}

function getNotApprovedStudentContractAddressAt(_index) {
  console.log(`get not approved student contract address at ${_index}`);
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.getNotApprovedStudentContractAddressAt.call(_index));
}

function getStudentContractFromPublicAddress(_address) {
  console.log(`get student contract from public address ${_address}`);
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.getStudentContractFromPublicAddress.call(_address));
}

function isStudent(_address) {
  console.log(`is ${_address} a student address?`);
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.isStudent.call(_address));
}

function isNotConfirmedStudent(_address) {
  console.log(`is ${_address} a not confirmed student address?`);
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.isNotConfirmedStudent.call(_address));
}

function requestStudentAccount(_name, _surname, _course) {
  console.log(`request student account for ${_name} ${_surname} for course ${_course}`);
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.requestStudentAccount(
      _name,
      _surname,
      _course,
      { from: web3.eth.accounts[0] },
    ));
}

function confirmStudent(_student) {
  console.log(`confirm student contract at ${_student}`);
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.confirmStudent(_student, { from: web3.eth.accounts[0] }));
}

function denyStudent(_student) {
  console.log(`deny student contract at ${_student}`);
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.denyStudent(_student, { from: web3.eth.accounts[0] }));
}

function removeStudent(_student) {
  console.log(`remove student contract at ${_student}`);
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.removeStudent(_student, { from: web3.eth.accounts[0] }));
}

export {
  getStudentNumber,
  getStudentContractAddressAt,
  getNotApprovedStudentNumber,
  getNotApprovedStudentContractAddressAt,
  getStudentContractFromPublicAddress,
  isStudent,
  isNotConfirmedStudent,
  requestStudentAccount,
  confirmStudent,
  denyStudent,
  removeStudent,
};


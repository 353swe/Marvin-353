import getUniversityInstance from './UniversityContractSupplier';

function getTeacherNumber() {
  console.log('get teacher number');
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.getTeacherNumber.call().then(Number));
}

function getTeacherContractAddressAt(_index) {
  console.log(`get teacher contract address at ${_index}`);
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.getTeacherContractAddressAt.call(_index));
}

function getNotApprovedTeacherNumber() {
  console.log('get not approved teacher number');
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.getNonApprovedTeacherNumber.call().then(Number));
}

function getNotApprovedTeacherContractAddressAt(_index) {
  console.log(`get not approved teacher contract address at ${_index}`);
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.getNotApprovedTeacherContractAddressAt.call(_index));
}

function getTeacherContractFromPublicAddress(_address) {
  console.log(`get teacher contract from public address ${_address}`);
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.getTeacherContractFromPublicAddress.call(_address));
}

function isTeacher(_address) {
  console.log(`is ${_address} a teacher address?`);
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.isTeacher.call(_address));
}

function isNotConfirmedTeacher(_address) {
  console.log(`is ${_address} a not confirmed teacher address?`);
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.isNotConfirmedTeacher.call(_address));
}

function requestTeacherAccount(_name, _surname) {
  console.log(`request teacher account for ${_name} ${_surname}`);
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.requestTeacherAccount(
      _name,
      _surname,
      { from: web3.eth.accounts[0] },
    ));
}

function confirmTeacher(_teacher) {
  console.log(`confirm teacher contract at ${_teacher}`);
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.confirmTeacher(_teacher, { from: web3.eth.accounts[0] }));
}

function denyTeacher(_teacher) {
  console.log(`deny teacher contract at ${_teacher}`);
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.denyTeacher(_teacher, { from: web3.eth.accounts[0] }));
}

function removeTeacher(_teacher) {
  console.log(`remove teacher contract at ${_teacher}`);
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.removeTeacher(_teacher, { from: web3.eth.accounts[0] }));
}

export {
  getTeacherNumber,
  getTeacherContractAddressAt,
  getNotApprovedTeacherNumber,
  getNotApprovedTeacherContractAddressAt,
  getTeacherContractFromPublicAddress,
  isTeacher,
  isNotConfirmedTeacher,
  requestTeacherAccount,
  confirmTeacher,
  denyTeacher,
  removeTeacher,
};

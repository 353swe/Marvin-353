import getUniversityInstance from './UniversityContractSupplier';

function associateTeacherToExam(_teacher, _exam) {
  console.log(`associate teacher ${_teacher} to exam ${_exam}`);
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.associateTeacherToExam(_teacher, _exam, { from: web3.eth.accounts[0] }));
}

export { associateTeacherToExam }; // eslint-disable-line

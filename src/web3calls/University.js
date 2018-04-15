import getUniversityInstance from './UniversityContractSupplier';

function isUniversityFounder(address) {
  console.log('isUniversityFounder');
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.isUniversityFounder(address));
}

function getRoleByAddress(address) {
  console.log('getRoleByAddress');
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.getRoleByAddress(address));
}

function login() {
  console.log('login');
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.login({ from: web3.eth.accounts[0] }));
}

export { isUniversityFounder, getRoleByAddress, login };

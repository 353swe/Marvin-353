import getUniversityInstance from './UniversityContractSupplier';

function isAdmin() {
  console.log('is admin');
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.isAdmin.call());
}

function getAdminAt(adminIndex) {
  console.log(`getting admin at ${adminIndex}`);
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.getAdminAt.call(adminIndex)).then(adminAddress => adminAddress);
}

function getAdminNumber() {
  console.log('getting admin number');
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.getAdminNumber.call());
}

function addNewAdmin(addressToAdd) {
  console.log(`adding ${addressToAdd}`);
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.addNewAdmin(addressToAdd, { from: web3.eth.accounts[0] }));
}

function removeAdmin(addressToRemove) {
  console.log(`removing ${addressToRemove}`);
  const contractUniversityAdmin = getUniversityInstance();
  return contractUniversityAdmin.then(instance =>
    instance.removeAdmin(addressToRemove, { from: web3.eth.accounts[0], gas: 60000 }));
}

export { isAdmin, getAdminAt, getAdminNumber, addNewAdmin, removeAdmin };


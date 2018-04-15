const contract = require('truffle-contract');
const contractUserJson = require('../../build/contracts/User.json');

function getUserContract(address) {
  const contractUser = contract(contractUserJson);
  contractUser.setProvider(web3.currentProvider);
  return contractUser.at(address);
}

function getPublicAddress(address) {
  console.log('User getPublicAddress');
  const contractInstance = getUserContract(address);
  return contractInstance.then(instance =>
    instance.getPublicAddress.call());
}

function getName(address) {
  console.log('User getName');
  const contractInstance = getUserContract(address);
  return contractInstance.then(instance =>
    instance.getName.call());
}

function getSurname(address) {
  console.log('User getSurname');
  const contractInstance = getUserContract(address);
  return contractInstance.then(instance =>
    instance.getSurname.call());
}

export { getPublicAddress, getName, getSurname };

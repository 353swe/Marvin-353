import { toText } from '../util/web3/textConverter';

const contract = require('truffle-contract');
const contractUserJson = require('../../build/contracts/User.json');

function getUserContract(address) {
  const contractUser = contract(contractUserJson);
  contractUser.setProvider(web3.currentProvider);
  return contractUser.at(address);
}

function getPublicAddress(address) {
  console.log(`User getPublicAddress of ${address}`);
  const contractInstance = getUserContract(address);
  return contractInstance.then(instance =>
    instance.getPublicAddress.call());
}

function getName(address) {
  console.log(`User getName of ${address}`);
  const contractInstance = getUserContract(address);
  return contractInstance.then(instance =>
    instance.getName.call().then(toText));
}

function getSurname(address) {
  console.log(`User getSurname of ${address}`);
  const contractInstance = getUserContract(address);
  return contractInstance.then(instance =>
    instance.getSurname.call().then(toText));
}

export { getPublicAddress, getName, getSurname };

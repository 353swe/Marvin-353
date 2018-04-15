const contract = require('truffle-contract');
const contractUniversityJson = require('../../build/contracts/UniversityExam.json');

let contractUniversityInstance;

function getUniversityInstance() {
  if (!contractUniversityInstance) {
    const contractUniversity = contract(contractUniversityJson);
    contractUniversity.setProvider(web3.currentProvider);
    contractUniversityInstance = contractUniversity.deployed();
  }
  return contractUniversityInstance;
}

export default getUniversityInstance;

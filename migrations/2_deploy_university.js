var UniversityExam = artifacts.require("UniversityExam");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(UniversityExam);
};


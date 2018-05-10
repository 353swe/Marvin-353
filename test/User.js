const User = artifacts.require('./contracts/User.sol');
const { assert } = require('chai');

contract('User', (accounts) => {
  let contract;

  beforeEach('Deploy User contract on blockchain', async () => {
    contract = await User.new(
      web3.fromAscii('mario'),
      web3.fromAscii('rossi'),
      accounts[1],
      { from: accounts[0] },
    );
  });

  function bytes32ToString(stringToConvert) {
    return web3.toAscii(stringToConvert).replace(/\u0000/g, '');
  }
  // 53
  it('Should give the deployed User', async () => {
    assert.equal(bytes32ToString(await contract.getName.call()), 'mario');
    assert.equal(bytes32ToString(await contract.getSurname.call()), 'rossi');

    assert.equal(await contract.getPublicAddress.call(), accounts[1]);
  });
});

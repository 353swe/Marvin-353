var HDWalletProvider = require('truffle-hdwallet-provider');

var infura_apikey = 'XXXXXXXXXXXXXXXXXXXXX';
var mnemonic = 'insert your 12 word seed here';

module.exports = {
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks: {
    develop: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '5777',
    },
    coverage: {
      /* Per il coverage, ma anche per i test in generale, potremmo usare testrpc (che usa ganache)
       per fissare una mnemonica in modo da avere sempre gli stessi account su cui fare i test"
       */
      host: 'localhost',
      network_id: '*',
      port: 8545,
      gas: 0xfffffffffff,
      gasPrice: 0x01
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"+infura_apikey),
      network_id: 3,
      gas: 4500000,
    }
  },
  mocha: {
    enableTimeouts: false,
    reporter: 'eth-gas-reporter',
    reporterOptions: {
      currency: 'EUR',
    },
  },
};

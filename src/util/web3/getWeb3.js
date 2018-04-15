import Web3 from 'web3';
import { store } from '../../store';
import { creators } from '../../ducks/Metamask';

const getWeb3 = new Promise(((resolve, reject) => {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', () => {
    let web3 = null;

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      console.log('Metamask!');
      web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log('No Metamask!');
      store.dispatch(creators.notFound());
      reject();// execute promise reject and go back to index
    }
    resolve(web3);
  });
}));

export default getWeb3;

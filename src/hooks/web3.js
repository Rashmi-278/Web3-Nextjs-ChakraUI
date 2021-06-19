import {useState} from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: '27c055962ba24a18bf065c508f0ba40f',
      },
    },
  };

  const web3Modal = new Web3Modal({
    network: 'kovan',
    cacheProvider: true,
    providerOptions,
  });

  export function useWeb3modal() {
      const [provider, setProvider] = useState(undefined);
      const [error, setError] = useState(null);

      if( web3Modal.cacheProvider && !provider ) {
          connectWallet();
      }

      async function connectWallet() {
          try {
              // web3modal is interface for web3 wallets
              // ethers.js is an interface for web3wallet with our frontend 
            const externalProvider = await web3Modal.connect();
            const ethersProvider = new ethers.providers.Web3Provider(
                externalProvider,
            )
            setProvider(ethersProvider)
          } catch (error) {
              setError('NO_WALLET_CONNECTED');
              console.log(error);
          }
      }
      function disconnectWallet(){
        web3Modal.clearCachedProvider();
        setProvider(undefined);
      }

      return { connectWallet, disconnectWallet, provider, error };
  }
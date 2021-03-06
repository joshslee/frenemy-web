

// NPM
import React, { useState, useEffect } from 'react'
import { StyleSheet, css } from 'aphrodite';
import { ToastContainer, toast } from 'react-toastify';
import detectEthereumProvider from "@metamask/detect-provider";
import amplitude from 'amplitude-js';

// PHASER 
import phaserGame from './PhaserGame'

// SCREEN
import StartScreen from './screens/StartScreen';
import CharacterSelection from "./screens/CharacterSelectionScreen";
import BattleScreen from "./screens/BattleScreen";
import POAPScreen from './screens/PoapScreen';

// ASSETS
import metamaskIcon from "./assets/metamask.png";

// WEB3
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import ENS from "ethjs-ens";

// UTILS
import { abbreviateEthAddress } from "./utils/helpers";
import { sendAmpEvent } from "./utils/events";

const { 
  REACT_APP_ALCHEMY_URL,
  REACT_APP_AMPLITUDE_KEY
} = process.env;

// ALCHEMY
const web3 = createAlchemyWeb3(REACT_APP_ALCHEMY_URL || "");
window.web3 = web3;

if (web3 && web3.currentProvider) {
  web3.currentProvider.sendAsync = web3?.currentProvider?.send;
  const provider = web3.currentProvider;
  const network = "1";
  const ens = new ENS({ provider, network });
  window.ens = ens;
}

// AMPLITUDE
const amp = amplitude.getInstance().init(REACT_APP_AMPLITUDE_KEY);
window.amp = amp;

function App() {

  const [ethAddressOne, setEthAddressOne] = useState("");
  const [ethAddressTwo, setEthAddressTwo] = useState("");

  const [ethNetworkChainId, setEthNetworkChainId] = useState(null);

  const [p1Character, setP1Character] = useState(null);
  const [p2Character, setP2Character] = useState(null);

  const [currScreen, setCurrScreen] = useState(0); // index of active screen
  const [gameData, setGameData] = useState([]);

  useEffect(() => {
    connectMetamask();
  }, []);

  useEffect(() => {
    console.log("page changed called");
    sendAmpEvent(currScreen)
  }, [currScreen]);


  /**
   * METAMASK FUNCTIONS
   */
   async function connectMetamask() {
    const provider = await detectEthereumProvider();
    if (!window.ethereum || !provider) return null;
    // we want to choose metamask's provider
    if (window.ethereum !== provider) window.ethereum = provider;
    const isMetamaskUnlocked = await window.ethereum._metamask.isUnlocked();
    if (isMetamaskUnlocked) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(_handleAccountsChanged)
        .catch(_handleError);
      _addEthEventListeners();
    } else {
      _handleDisconnect();
      await window.ethereum.enable();
    }
  
  }

  /**
   * Adds EventListeners to detect changes
   * @returns null
   */
  function _addEthEventListeners() {
    window.ethereum.on("connect", _handleConnect);
    window.ethereum.on("disconnect", _handleDisconnect);
    window.ethereum.on("accountsChanged", _handleAccountsChanged);
    window.ethereum.on("chainChanged", _handleChainChanged);
    window.ethereum.on("message", _handleMetamaskMessage);
  }


  async function _handleConnect(data) {}

  function _handleDisconnect(_error) {}

  function _handleAccountsChanged(accounts) {
    if (!accounts.length) return _handleDisconnect();
    const account = accounts[0];
    if (ethAddressOne === account) return;
    setEthAddressOne(account); 
    const address = abbreviateEthAddress(account);
    toast.dismiss();
    return toast(
      `Metamask connected: ${address}`, 
      { 
        position: toast.POSITION.TOP_RIGHT,
        pauseOnHover: true,
        icon: <img src={metamaskIcon} className={css(styles.snesIcon)} />
      }
    );
  }

  function _handleChainChanged(chainIdHex) {
    const chainId = parseInt(chainIdHex, 16);
    if (ethNetworkChainId == chainId) return;
    setEthNetworkChainId(chainId);
    const mapIdToName = {
      1: "Ethereum Main Network",
      4: "Rinkeby Test Network",
          /**   Hex   Dec    Network Name
          0x1	   1	   Ethereum Main Network (Mainnet)
          0x3	   3	   Ropsten Test Network
          0x4	   4	   Rinkeby Test Network
          0x5	   5	   Goerli Test Network
          0x2a	 42	   Kovan Test Network
    */
    }
    if (chainId !== 1 && chainId !== 4) {
      return toast.error(
        "Please switch to Mainnet or Rinkeby Network.",
        {
          position: toast.POSITION.TOP_RIGHT,
          closeOnClick: true,
          autoClose: false
        }
      )
    }
    toast.dismiss();
    return toast(
      `Chain changed to: ${mapIdToName[chainId]}`, 
      { 
        position: toast.POSITION.TOP_RIGHT,
        pauseOnHover: true,
        icon: <img src={metamaskIcon} className={css(styles.snesIcon)} />
      }
    );
  }

  function _handleError(err) {
    let metamaskErrorMessage = "";

    switch (err?.code) {
      case 4001:
        // request rejected by user
        break;
      case -32602:
        // params invalid
        break;
      case -32603:
        // internal error
        break;
      case -32002:
        metamaskErrorMessage = "Please unlock your Metamask Wallet to connect.";
        break;
      default:
        metamaskErrorMessage =
          err?.message || "Hm something went wrong. Please try again later!";
        break;
    }


    return toast.error(
      metamaskErrorMessage, 
      { 
        position: toast.POSITION.TOP_RIGHT,
        pauseOnHover: true,
        icon: <img src={metamaskIcon} className={css(styles.snesIcon)} />
      }
    );
  }

  function _handleMetamaskMessage(message) {
    console.log("message", message);
  }

  function onGameConfirmation(apiGameData, onGameConfirmationCallback) {
    setGameData(apiGameData);
    onGameConfirmationCallback();
  }

  const props = {
    ethAddressOne,
    ethAddressTwo,
    p1Character, 
    p2Character,
    setEthAddressOne,
    setEthAddressTwo,
    setP1Character,
    setP2Character,
    setCurrScreen,
    onGameConfirmation,
    //api data
    gameData
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className={css(styles.root)}>
          <ToastContainer 
            newestOnTop={true}
            draggable={false}
          />
          { currScreen === 0 ? <StartScreen {...props} />
          : currScreen === 1 ? <CharacterSelection {...props} /> 
          : currScreen === 2 ? <BattleScreen {...props} /> 
          : currScreen === 3 && <POAPScreen {...props} />}
        </div>
      </header>
    </div>
  )
}

export default App

const styles = StyleSheet.create({
  root: {
    position: "relative",
    width: "100%",
    height: 900,
    minWidth: 1000,
    maxWidth:  1200,
  },
  snesIcon: {
    opacity: 1,
    height: 25,
    marginLeft: 5,
    boxSizing: "border-box"
  },
});

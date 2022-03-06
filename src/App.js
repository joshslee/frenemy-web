// STYLES
import './App.css'
import 'react-toastify/dist/ReactToastify.css';

// NPM
import React, { useState, useEffect } from 'react'
import { StyleSheet, css } from 'aphrodite';
import { ToastContainer, toast } from 'react-toastify';
import detectEthereumProvider from "@metamask/detect-provider";

// PHASER 
import phaserGame from './PhaserGame'

// COMPONENTS
import Column from "./components/Column";
import Row from "./components/Row";
import TextInput from "./components/TextInput";
import Button from './components/Button';

// ASSETS
import snesIcon from "./assets/snes-controller.png";
import invalidAddressIcon from "./assets/snes-controller-missing.png";
import metamaskIcon from "./assets/metamask.png";

// WEB3
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import ENS from "ethjs-ens";
import { checkIfValidENS, isValidEthAddress } from "./utils/web3Interact";
import { Colors } from './utils/colors';
import { abbreviateEthAddress } from "./utils/helpers";


const { REACT_APP_ALCHEMY_URL } = process.env;

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

// const handleClick = () => {
//   const scene = phaserGame.scene.keys.helloworld;
//   scene.createEmitter()
// }

function App() {
  // ADDRESS STATES
  const [isValidatingAddress, setIsValidatingAddress] = useState(false);

  const [ethAddressOne, setEthAddressOne] = useState("");
  const [ethAddressTwo, seEtthAddressTwo] = useState("");

  const [isEthAddressOneValid, setIsEthAddressOneValid] = useState(null);
  const [isEthAddressTwoValid, setIsEthAddressTwoValid] = useState(null)

  const [ethAddressOneError, setEthAddressOneError] = useState(null);
  const [ethAddressTwoError, setEthAddressTwoError] = useState(null);

  const [ethNetworkChainId, setEthNetworkChainId] = useState(null);

  const [isReadyToStart, setIsReadyToStart] = useState(false);
  const [currScreen, setCurrScreen] = useState(0); // index of active screen

  useEffect(() => {
    connectMetamask();
  }, [])

  /**
   * METAMASK FUNCTIONS
   */

   async function connectMetamask() {
    if (!window.ethereum) return null;
    const provider = await detectEthereumProvider();
    if (!provider) return null;
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


  function handleTextInput(e) {
    const key = e.target.id;
    const value = e.target.value;

    return key === "input-player1"
      ? setEthAddressOne(value)
      : seEtthAddressTwo(value);
  };

  async function isValidAddress(address) {
    const isValidAddress = await isValidEthAddress(address);
    const isValidEns = await checkIfValidENS(address);
    return (isValidAddress || isValidEns);
  }

  async function onSubmitAddress(e) {
    e && e.preventDefault();
    try {
      resetInputState();
      setIsValidatingAddress(true);
      const [isAddressOneValid, isAddressTwoValid] = await Promise.all([
        isValidAddress(ethAddressOne),
        isValidAddress(ethAddressTwo)
      ]);
      setIsValidatingAddress(false);
      return (isAddressOneValid && isAddressTwoValid)
        ? handleSuccess()
        : handleError(isAddressOneValid, isAddressTwoValid);      

    } catch (error) {
      return toast.error(
        error?.message || "Hm something went wrong. Please try again!", 
        { position: toast.POSITION.TOP_LEFT }
      );
    }
  }

  function handleSuccess() {
    // todo: move user to next game state or screen
    return toast.success(
      "Valid Addresses!", 
      { position: toast.POSITION.TOP_RIGHT }
    );
  }

  function resetInputState() {
    setEthAddressOneError(false);
    setEthAddressTwoError(false);
  }

  function handleError(isAddressOneValid, isAddressTwoValid) {
    let errMessage;
    
    setIsEthAddressOneValid(isAddressOneValid);
    setIsEthAddressTwoValid(isAddressTwoValid);

    if (isAddressOneValid && !isAddressTwoValid) {
      errMessage = "Player 2: Invalid Eth Address";
    } else if (isAddressTwoValid && !isAddressOneValid) {
      errMessage = "Player 1: Invalid Eth Address";
    } else if (!isAddressOneValid && !isAddressTwoValid) {
      errMessage = "Invalid Ethereum Addresses";
    }

    return toast.error(
      errMessage, 
      { 
        position: toast.POSITION.TOP_RIGHT,
        pauseOnHover: true,
        icon: <img src={invalidAddressIcon} className={css(styles.snesIcon)} />
      }
    );
  }

  function formatInputProps() {
    const inputOneStatus = isValidatingAddress ? "loading" : isEthAddressOneValid === true ? "success" : isEthAddressOneValid === false ? "error" : null;
    const inputTwoStatus = isValidatingAddress ? "loading" : isEthAddressTwoValid === true ? "success" : isEthAddressTwoValid === false ? "error" : null;
    ;
    const inputOne = {
      key: "input-player1",
      id: "input-player1",
      name: "Player 1",
      placeholder: "Eth Address or ENS",
      value: ethAddressOne,
      required: true,
      onChange: handleTextInput,
      disabled: isValidatingAddress
      // onClick: connectMetamask
    };

    const inputTwo = {
      ...inputOne,
      key: "input-player2",
      id: "input-player2",
      name: "Player 2",
      value: ethAddressTwo,
    };

    // library breaks when status is null 
    if (inputOneStatus) {
      inputOne.status = inputOneStatus;
    }
    if (inputTwoStatus) {
      inputTwo.status = inputTwoStatus;
    }

    return [inputOne, inputTwo];
  }

  const [inputOneProps, inputTwoProps] = formatInputProps();

  const buttonProps = {
    type: "submit",
    disabled: isValidatingAddress,
    label: isValidatingAddress ? "Loading..." : "START!"
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className={css(styles.root)}>
          <ToastContainer 
            newestOnTop={true}
            draggable={false}
            // theme={"dark"}
          />
          <form onSubmit={onSubmitAddress}>
            <Row
              overrideStyles={{
                justifyContent: "space-evenly",
                padding: "30px 0px",
                boxSizing: "border-box",
                position: "absolute",
                height: "unset",
                bottom: 180,
                width: "100%",
                maxWidth: 1014
              }}
            >
              <TextInput {...inputOneProps} />
              <TextInput {...inputTwoProps} />
            </Row>
            <Row
              overrideStyles={{
                position: "absolute",
                bottom: 50,
                boxSizing: "border-box",
                height: "unset",
                width: "100%",
                maxWidth: 1014
              }}
            >
              <Button {...buttonProps}>
                {}
              </Button>
            </Row>
          </form>
        </div>
      </header>
    </div>
  )
}

export default App

const styles = StyleSheet.create({
  root: {
    position: "relative",
    maxWidth:  1014,
    width: "100%",
    height: 773,
  },
  toast: {

  },
  snesIcon: {
    width: 40,
    padding: "0 10px 5px 0"
  }
});

// STYLES
import './App.css'
import 'react-toastify/dist/ReactToastify.css';

// NPM
import React, { useState, useEffect } from 'react'
import logo from './logo.svg'
import { StyleSheet, css } from 'aphrodite';
import { ToastContainer, toast } from 'react-toastify';
// import { Button, ThemeWrapper } from 'retro-ui'


// PHASER 
import phaserGame from './PhaserGame'

// COMPONENTS
import Column from "./components/Column";
import Row from "./components/Row";
import TextInput from "./components/TextInput";
import Button from './components/Button';


// WEB3
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import ENS from "ethjs-ens";
import { checkIfValidENS } from "./utils/web3Interact";
import { Colors } from './utils/colors';


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

  const [ethAddressOneError, setEthAddressOneError] = useState(null);
  const [ethAddressTwoError, setEthAddressTwoError] = useState(null);

  const [isReadyToStart, setIsReadyToStart] = useState(false);
  const [currScreen, setCurrScreen] = useState(0); // index of active screen


  function handleTextInput(e) {
    const key = e.target.id;
    const value = e.target.value;

    return key === "input-player1"
      ? setEthAddressOne(value)
      : seEtthAddressTwo(value);
  };

  async function isValidAddress(address) {
    const isValidEthAddress = await _isValidEthAddress(address);
    const isValidEns = await _isValidENS(address);
    return (isValidEthAddress || isValidEns);
  }


  function _isValidEthAddress(address) {
    return window.web3.utils.isAddress(address);
  }

  function _isValidENS(address) {
    return checkIfValidENS(address);
  }

  async function onSubmitAddress(e) {
    console.log("validating addresses");
    e && e.preventDefault();
    try {
      setIsValidatingAddress(true);
      const [isAddressOneValid, isAddressTwoValid] = await Promise.all([
        isValidAddress(ethAddressOne),
        isValidAddress(ethAddressTwo)
      ]);
      setIsValidatingAddress(false);
      console.log("isAddressOneValid, isAddressTwoValid", isAddressOneValid, isAddressTwoValid)
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

  function handleError(isAddressOneValid, isAddressTwoValid) {
    let errMessage;

    if (isAddressOneValid && !isAddressTwoValid) {
      errMessage = "Invalid Eth Address or ENS for Player 2";
      setEthAddressTwoError(true);
    } else if (isAddressTwoValid && !isAddressOneValid) {
      errMessage = "Invalid Eth Address or ENS for Player 1";
      setEthAddressOneError(true);
    } else if (!isAddressOneValid && !isAddressTwoValid) {
      errMessage = "Invalid Ethereum Addresses";
      setEthAddressOneError(true);
      setEthAddressTwoError(true);
    }

    return toast.error(
      errMessage, 
      { 
        position: toast.POSITION.TOP_RIGHT,
        pauseOnHover: true,
        
      }
    );
  }

  function formatInputProps() {
    const inputOneStatus = isValidatingAddress ? "disabled" :  ethAddressOneError ? "error" : isReadyToStart ? "success" :  null;
    const inputTwoStatus = isValidatingAddress ? "disabled" :  ethAddressTwoError ? "error" : isReadyToStart ? "success" :  null
    ;
    const inputOne = {
      key: "input-player1",
      id: "input-player1",
      name: "Player 1",
      placeholder: "Eth Address or ENS",
      value: ethAddressOne,
      required: true,
      onChange: handleTextInput,
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
            theme={"dark"}
          />
          <form onSubmit={onSubmitAddress}>
            <Row
              overrideStyles={{
                justifyContent: "space-between",
                padding: "30px 0px",
                boxSizing: "border-box",
                position: "absolute",
                height: "unset",
                bottom: 150,
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
    fontFamily: "Ready Player 2", 
    fontWeight: "bolder",
    background: Colors.charcoal(),
    color: Colors.gray()
  }
});

// STYLES
import './App.css'
import 'react-toastify/dist/ReactToastify.css';

// NPM
import React, { useState, useEffect } from 'react'
import logo from './logo.svg'
import { StyleSheet, css } from 'aphrodite';
import { ToastContainer, toast } from 'react-toastify';

// PHASER 
import phaserGame from './PhaserGame'
import HelloWorldScene from './scenes/HelloWorldScene'

// COMPONENTS
import Column from "./components/Column";
import Row from "./components/Row";
import TextInput from "./components/TextInput";

// WEB3
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

const { REACT_APP_ALCHEMY_URL } = process.env;

// ALCHEMY
declare global {
  interface Window { web3: any; }
}
const web3 = createAlchemyWeb3(REACT_APP_ALCHEMY_URL || "");
window.web3 = web3;

const handleClick = () => {
  const scene = phaserGame.scene.keys.helloworld as HelloWorldScene
  scene.createEmitter()
}

function App() {
  const [ethAddressOne, setEthAddressOne] = useState("");
  const [ethAddressTwo, seEtthAddressTwo] = useState("");

  const [isGameInitalized, setIsGameInitalized] = useState(false); // bool: is game started?
  const [currScreen, setCurrScreen] = useState(0); // index of active screen


  function handleTextInput(key: string, value: string) {
    return key === "ethAddressOne"
      ? setEthAddressOne(value)
      : seEtthAddressTwo(value);
  };

  function isValidAddress(ethAddress: string) {
    if (web3.utils.isAddress(ethAddress)) return true;
    throw new Error("Please enter in valid eth address.")
  }

  async function onSubmitAddress(e: Event) {
    e && e.preventDefault();
    try {
      // check if addresses are valid
      isValidAddress(ethAddressOne);
      isValidAddress(ethAddressTwo);
      // make api call with server
      
    } catch (error: any) {
      // show toast
      const errorMessage = error?.message;
      toast.error(
        errorMessage, 
        { position: toast.POSITION.TOP_LEFT }
      );
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <Column>
          <Row>
            <TextInput onChange={handleTextInput} />
            <TextInput onChange={handleTextInput} />
          </Row>
        </Column>
      </header>
    </div>
  )
}

export default App


{/* <img src={logo} className="App-logo" alt="logo" />
        <p>Just a vanilla create-react-app overlaying a Phaser canvas :)</p>
        <a
          className="App-link"
          href="https://github.com/kevinshen56714/create-react-phaser3-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Source
        </a>
        <button className="App-button" onClick={handleClick}>
          Or click me
        </button> */}
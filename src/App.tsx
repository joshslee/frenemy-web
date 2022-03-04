// STYLES
import './App.css'
import 'react-toastify/dist/ReactToastify.css';


// NPM
import React, { useState, useEffect } from 'react'
import logo from './logo.svg'
import { StyleSheet, css } from 'aphrodite';
import { ToastContainer, toast } from 'react-toastify';
import { Button, ThemeWrapper } from 'retro-ui'


// PHASER 
import phaserGame from './PhaserGame'
import HelloWorldScene from './scenes/HelloWorldScene'

// COMPONENTS
import Column from "./components/Column";
import Row from "./components/Row";
import TextInput from "./components/TextInput";
// import { Button } from 'nes-design';


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
  // ADDRESS STATES
  const [isValidatingAddressOne, setIsValidatingAddressOne] = useState(false);
  const [isValidatingAddressTwo, setIsValidatingAddressTwo] = useState(false);

  const [ethAddressOne, setEthAddressOne] = useState("");
  const [ethAddressTwo, seEtthAddressTwo] = useState("");

  const [isReadyToStart, setIsReadyToStart] = useState(false);
  const [currScreen, setCurrScreen] = useState(0); // index of active screen


  function handleTextInput(e: any) {
    const key = e.target.id;
    const value = e.target.value;

    return key === "input-player1"
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
      console.log("success");
    } catch (error: any) {
      // show toast
      const errorMessage = error?.message;
      toast.error(
        errorMessage, 
        { position: toast.POSITION.TOP_LEFT }
      );
    }
  }

  const textInputOne = {
    key: "input-player1",
    id: "input-player1",
    name: "Player 1",
    placeholder: "Eth Address",
    value: ethAddressOne,
    onChange: handleTextInput
  };

  const textInputTwo = {
    ...textInputOne,
    key: "input-player2",
    id: "input-player2",
    name: "Player 2",
    placeholder: "Eth Address",
    value: ethAddressTwo,
  }

  return (
    <ThemeWrapper>
      <div className="App">
        <header className="App-header">
          <div className={css(styles.root)}>
            <Row
              overrideStyles={{
                justifyContent: "space-between",
                padding: "30px 0px",
                boxSizing: "border-box",
                position: "absolute",
                height: "unset",
                bottom: 150
              }}
            >
              <TextInput {...textInputOne} />
              <TextInput {...textInputTwo} />
            </Row>
            <Row
              overrideStyles={{
                position: "absolute",
                bottom: 0,
                // padding: "30px 50px",
                boxSizing: "border-box",
                height: "unset",
              }}
            >
              <Button>{'START!'}</Button>
            </Row>
          </div>
        </header>
      </div>
    </ThemeWrapper>
  )
}

export default App

const styles = StyleSheet.create({
  root: {
    position: "relative",
    width: 1014,
    height: 773,
   
  }
})
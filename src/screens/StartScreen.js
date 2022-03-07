// NPM
import { useState } from 'react'
import { StyleSheet, css } from 'aphrodite';
import { toast } from 'react-toastify';

// COMPONENTS
import Screen from "./Screen";
import GameHeader from '../components/GameHeader';
import Row from "../components/Row";
import TextInput from "../components/TextInput";
import Button from '../components/Button';

// ASSETS
import invalidAddressIcon from "../assets/snes-controller-missing.png";

// WEB3
import { checkIfValidENS, isValidEthAddress } from "../utils/web3Interact";

// UTILS
import { Colors } from '../utils/colors';

const StartScreen = ({
  ethAddressOne,
  ethAddressTwo,
  setEthAddressOne,
  setEthAddressTwo,
  setCurrScreen
}) => {
  
  // ADDRESS STATES
  const [isValidatingAddress, setIsValidatingAddress] = useState(false);

  const [isEthAddressOneValid, setIsEthAddressOneValid] = useState(null);
  const [isEthAddressTwoValid, setIsEthAddressTwoValid] = useState(null)


  function handleTextInput(e) {
    const key = e.target.id;
    const value = e.target.value;

    return key === "input-player1"
      ? setEthAddressOne(value)
      : setEthAddressTwo(value);
  };

  async function isValidAddress(address) {
    const isValidAddress = await isValidEthAddress(address);
    const isValidEns = await checkIfValidENS(address);
    return (isValidAddress || isValidEns);
  }

  async function onSubmitAddress(e) {
    e && e.preventDefault();
    try {
      setIsValidatingAddress(true);
      const [isAddressOneValid, isAddressTwoValid] = await Promise.all([
        isValidAddress(ethAddressOne),
        isValidAddress(ethAddressTwo)
      ]);
      setIsValidatingAddress(false);
      return (isAddressOneValid && isAddressTwoValid)
        ? handleSuccess() // make call ba k
        : handleError(isAddressOneValid, isAddressTwoValid);      

    } catch (error) {
      return toast.error(
        error?.message || "Hm something went wrong. Please try again!", 
        { position: toast.POSITION.TOP_LEFT }
      );
    }
  }

  function handleSuccess() {
    toast.success(
      "Valid Addresses!", 
      { position: toast.POSITION.TOP_RIGHT }
    );
    // move user to next screen
    setCurrScreen(1)
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
    <Screen backgroundColor={Colors.pink()}>
      <div style={styles.content}>
        <GameHeader />
        <form style={styles.formContainer} onSubmit={onSubmitAddress}>
          <Row overrideStyles={styles.inputRow}>
            <TextInput {...inputOneProps} />
            <TextInput {...inputTwoProps} />
          </Row>
          <Row overrideStyles={styles.buttonRow}>
            <Button {...buttonProps} />
          </Row>
        </form>
      </div>
    </Screen>
  )
};

const styles = {
  content: {

  },
  formContainer: {
    padding: "30px 0 0 0",
    boxSizing: "border-box",
    width: "100%"
  },
  inputRow: {
    justifyContent: "space-evenly",
    padding: 30,
    boxSizing: "border-box",
    height: "unset",
    width: "100%",
    minWidth: 800,
    maxWidth: 1200,
    margin: "0 auto"
  },
  buttonRow: {
    boxSizing: "border-box",
    height: "unset",
    width: "100%",
    minWidth: 800,
    maxWidth: 1200,
    margin: "0 auto",
    paddingTop: 30
  }
}


export default StartScreen;
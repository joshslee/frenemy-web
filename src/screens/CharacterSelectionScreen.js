// NPM
import React, { useState, useEffect } from 'react'
import { StyleSheet, css } from 'aphrodite';
import { ToastContainer, toast } from 'react-toastify';

// Components
import Screen from "./Screen";
import Row from "../components/Row";
import Button from "../components/Button";
import CharacterCard from "../components/CharacterCard";
import CharacterAvatar from "../components/CharacterAvatar";

// Assets
import arrowRight from "../assets/arrow-right.png";
import snesController from "../assets/snes-controller.png";

// Utils
import { PLAYABLE_CHARACTERS  } from "../utils/constants";
import { Colors } from '../utils/colors';


const CharacterSelectionScreen = ({ 
  ethAddressOne, 
  ethAddressTwo, 
  setP1Character,
  setP2Character,
  setCurrScreen 
}) => {

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedCharacterP1, setSelectedCharacterP1] = useState(null);
  const [selectedCharacterP2, setSelectedCharacterP2] = useState(PLAYABLE_CHARACTERS[0]);


  function onClickFight(e) {
    e && e.stopPropagation();
    if (selectedCharacterP1 && selectedCharacterP2) {
      setIsConfirmed(true);
      setP1Character(selectedCharacterP1);
      setP2Character(selectedCharacterP2);
      return setCurrScreen(2)
    }
    return toast(
      "P1: please choose a character", 
      { 
        position: toast.POSITION.TOP_RIGHT,
        pauseOnHover: true,
        icon: <img src={snesController} className={css(styles.snesIcon)} />
      }
    );
  }

  return (
    <Screen backgroundColor={Colors.pink()}>
      <div className={css(styles.container)}>
        <img 
          src={arrowRight} 
          className={css(styles.backButton)} 
          draggable={false}
          alt="back-arrow"
          onClick={() => setCurrScreen(0)}
        />

        <div className={css(styles.header)}>
          {"Select your Hero!"}
        </div>
        <Row>
          {PLAYABLE_CHARACTERS.map(character => (
            <CharacterCard
              key={`${character.name.toLowerCase()}`}
              character={character}
              selectedCharacterP1={selectedCharacterP1}
              selectedCharacterP2={selectedCharacterP2}
              onClick={setSelectedCharacterP1}
            />
          ))}
        </Row>
        <Row justifyContent={"space-between"} style={styles.characters}>
          <CharacterAvatar 
            key={"player1-avatar"} 
            character={selectedCharacterP1}
            isPlayerOne={true}
            address={ethAddressOne}
            isConfirmed={isConfirmed}
          />
          <h4 className={css(styles.linearText)}>{"VS"}</h4>
          <CharacterAvatar 
            key={"player2-avatar"} 
            character={selectedCharacterP2} 
            isPlayerOne={false}
            address={ethAddressTwo}
            isConfirmed={isConfirmed}
          />
        </Row>
        <Row style={styles.buttonContainer}>
          <Button 
            disabled={!selectedCharacterP1 || !selectedCharacterP2}
            label={"FIGHT!"}
            onClick={onClickFight}
          />
        </Row>
      </div>
    </Screen>
  )
};


const styles = StyleSheet.create({
  container: {
    position: "relative",
    padding: "0 0 20px 0",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    transform: "rotateY(180deg)",
    width: 50,
    cursor: "pointer",
    ":hover": {
      opacity: 0.7
    }
  },
  header: {
    color: Colors.blue(),
    padding: "30px 0",
  },
  characters: {
    paddingTop: 30
  },
  buttonContainer: {
    marginTop: 20
  },
  linearText: {
    background: `-webkit-linear-gradient(${Colors.orange()}, ${Colors.red()})`,
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    filter: 'drop-shadow(3px 3px 1px #333)'
  },
  snesIcon: {
    opacity: 1,
    height: 25,
    marginLeft: 5,
    boxSizing: "border-box"
  },
});

export default CharacterSelectionScreen;
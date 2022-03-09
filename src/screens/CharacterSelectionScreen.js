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
import { fetchGameData } from "../utils/api";

const CharacterSelectionScreen = ({ 
  ethAddressOne, 
  ethAddressTwo, 
  setP1Character,
  setP2Character,
  setCurrScreen,
  onGameConfirmation
}) => {

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedCharacterP1, setSelectedCharacterP1] = useState(null);
  const [selectedCharacterP2, setSelectedCharacterP2] = useState(PLAYABLE_CHARACTERS[0]);
  const [isFetching, setIsFetching] = useState(false);
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    _fetchGameData();
  }, [])

  async function _fetchGameData() {
    if (isFetching || gameData) return;
    setIsFetching(true);
    const _gameData = await fetchGameData(ethAddressOne, ethAddressTwo);
    setGameData(_gameData);
    setIsFetching(false);
    console.log("game", _gameData)
    return _gameData;
  }

  async function onClickFight(e) {
    e && e.stopPropagation();
    if (!selectedCharacterP1 && selectedCharacterP2) {
      return toast("P1: please select a hero", 
        { 
          position: toast.POSITION.TOP_RIGHT,
          pauseOnHover: true,
          icon: <img src={snesController} className={css(styles.snesIcon)} />
        }
      );
    }

    if (selectedCharacterP1.name === selectedCharacterP2.name) {
      return toast(
        "P1: cannot select same hero as P2 for demo!",
        { 
          position: toast.POSITION.TOP_RIGHT,
          pauseOnHover: true,
        }
      );
    }

    try {
      setIsConfirmed(true);
      setP1Character(selectedCharacterP1);
      setP2Character(selectedCharacterP2);
      toast("Preparing Battle...",
      { 
        position: toast.POSITION.TOP_RIGHT,
        pauseOnHover: true,
        icon: <img src={snesController} className={css(styles.snesIcon)} />,
      });
      
      if (!gameData) {
        const _gameData = await fetchGameData(ethAddressOne, ethAddressTwo);
        return onGameConfirmation(_gameData, () => {
          setTimeout(() => setCurrScreen(2), 2000)
        })
      } 
      return onGameConfirmation(gameData, () => {
        setTimeout(() => setCurrScreen(2), 2000)
      })
    } catch (err) {
      return toast.error("Hm something went wrong. Please try again!", { 
        position: toast.POSITION.TOP_RIGHT,
        pauseOnHover: true,
      })
    }
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
              isConfirmed={isConfirmed}
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
            disabled={!selectedCharacterP1 || !selectedCharacterP2 || isConfirmed}
            label={isConfirmed ? "Loading..." : "FIGHT!"}
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
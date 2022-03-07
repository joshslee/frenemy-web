// NPM
import React, { useState, useEffect } from 'react'
import { StyleSheet, css } from 'aphrodite';
import { ToastContainer, toast } from 'react-toastify';
import ProgressBar from "@ramonak/react-progress-bar";

// Components
import Screen from "./Screen";
import Row from "../components/Row";
import Button from "../components/Button";
import Character from "../components/Character";
import TextBox from "../components/TextBox";

// Assets
import beachBackground from "../assets/background/beach.gif";
import koWhite from "../assets/ko-white.png";
import koGold from "../assets/ko-gold.png";

// Utils
import { Colors } from '../utils/colors';



const BattleScreen = ({
  ethAddressOne, 
  ethAddressTwo, 
  p1Character,
  p2Character,
  setCurrScreen 
}) => {

  const [battlePhase, setBattlePhase] = useState(0);
  const [p1Health, setP1Health] = useState(100);
  const [p2Health, setP2Health] = useState(100);
  const [isBattleFinished, setIsBattleFinished] = useState(false);

  return (
    <Screen>
      <div className={css(styles.content)}>
        <div className={css(styles.background)}>
          <Row justifyContent={"space-between"} style={styles.healthbarRow}>
            <ProgressBar 
              completed={p1Health}
              className="wrapper"
              barContainerClassName="container"
              completedClassName="barCompleted"
              labelClassName="label"
            />
            <img 
              src={isBattleFinished ? koGold : koWhite} 
              className={css(styles.koIcon)} 
            />
            <ProgressBar 
              completed={p2Health}
              className="wrapper"
              barContainerClassName="container"
              completedClassName="barCompleted"
              labelClassName="label"
            />

          </Row>
          <Row justifyContent={"space-between"} style={styles.characterRow}>
            <div className={css(styles.player1)}>
              <Character character={p1Character} isPlayerOne={true} />
            </div>
            <div className={css(styles.player2)}>
              <Character character={p2Character} isPlayerOne={false} />
            </div>
          </Row>
        </div>
        <TextBox 
          title={"Battle Phase 1"}
          body={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
        />
      </div>
    </Screen>
  )
};


const styles = StyleSheet.create({
  content: {
    position: "relative",
    boxSizing: "border-box",
    width: "100%",
    height: "100%"
  },
  background: {
    position: "relative",
    backgroundImage: `url(${beachBackground})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%",
    height: 680
  },
  koIcon: {
    // height: 60
  },
  healthbarRow: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: 20,
    boxSizing: "border-box"
  },
  characterRow: {
    position: "absolute",
    bottom: 110,
    left: 0,
    padding: "0 30px",
    boxSizing: "border-box"
    // height: 200
  }
  
  
});

export default BattleScreen;
// NPM
import React, { useState, useMemo, useEffect } from 'react'
import { StyleSheet, css } from 'aphrodite';
import { ToastContainer, toast } from 'react-toastify';
import ProgressBar from "@ramonak/react-progress-bar";

// Components
import Screen from "./Screen";
import Row from "../components/Row";
import Character from "../components/Character";
import TextBox from "../components/TextBox";
import FireAttack from "../components/Sprites/FireAttack";
import CatAttack from "../components/Sprites/CatAttack";


// Assets
import beachBackground from "../assets/background/beach.gif";
import koWhite from "../assets/ko-white.png";
import koGold from "../assets/ko-gold.png";
import fightText from "../assets/fight.png";

// Utils
import { Colors } from '../utils/colors';
import { abbreviateEthAddress } from "../utils/helpers";

import { 
  PLAYABLE_CHARACTERS, 
  ATTACK_DURATION,
  DAMAGE_DURATION 
} from "../utils/constants";


const BattleScreen = ({
  ethAddressOne, 
  ethAddressTwo, 
  p1Character,
  p2Character,
  setCurrScreen,
  gameData
}) => {

  const [battleRound, setBattleRound] = useState(0); // 3 battle rounds
  const [phase, setPhase] = useState(0); // 4 phase per round
  const [summary, setSummary] = useState([]); // summary of winner
  
  const [showOverlay, setShowOverlay] = useState(true);
  const [countDown, setCountDown] = useState(3);
  const [isBattleFinished, setIsBattleFinished] = useState(false);

  const [p1Health, setP1Health] = useState(100);
  const [p2Health, setP2Health] = useState(100);

  const [p1State, setP1State] = useState("standing");
  const [p2State, setP2State] = useState("standing");

  const [showP1Fireball, setShowP1Fireball] = useState(false);
  const [showP2Fireball, setShowP2Fireball] = useState(false);

  const p1Name = useMemo(() => abbreviateEthAddress(ethAddressOne), [ethAddressOne]);
  const p2Name = useMemo(() => abbreviateEthAddress(ethAddressTwo), [ethAddressTwo]);

  const [topic, setTopic] = useState("");
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");

  useEffect(() => {
    const countDownInterval = setInterval(() => {
      if (countDown === 0) {
        setTimeout(() => setShowOverlay(false), 500);
        return clearInterval(countDownInterval)
      }
      setCountDown(prevCount => prevCount - 1);
    }, 1000);

    return () => clearInterval(countDownInterval);
  })
  

  function initbattleRound(e) {
    if (isBattleFinished) {
      setCurrScreen(3)
    };

    const currentStep = gameData?.steps[battleRound];
    const { topic, text1, text2, winner1 } = currentStep;

    switch(phase) {
      case 0:
        setTopic(topic);
        break;
      case 1:
        setText1(`PLAYER1:${text1.slice(42)}`);
        break;
      case 2:
        setText2(`PLAYER2:${text2.slice(42)}`);
        break;
      case 3:
        const winner = winner1 ? "PLAYER1" : "PLAYER2";
        setText3(`${winner} wins and inflicts damage!`)
        initAttackSequence(winner1);
        break;
      default:
        return;
    }
    setPhase(phase + 1);
  }

  function initAttackSequence(isP1RoundWinner) {
    const { damage } = gameData?.steps[battleRound];

    isP1RoundWinner
      ? playerOneAttack(damage, onAttackEnd)
      : playerTwoAttack(damage, onAttackEnd);
  };

  function onAttackEnd() {
    const _battleRound = battleRound + 1;
    if (_battleRound === 3) {
      const { success: didP1Win } = gameData;
      setIsBattleFinished(true);
      onBattleEnd(didP1Win);
    };
    setBattleRound(_battleRound);
    resetPhase();
  }

  function resetPhase() {
    setPhase(0);
    setTopic("");
    setText1("");
    setText2("");
    setText3("");
  }

  
  function onBattleEnd(isP1Winner) {
    if (isP1Winner) {
      setP1State("victory");
      setP2State("defeat");
      setText1("PLAYER1 Wins!")
    } else {
      setP1State("defeat");
      setP2State("victory");
      setText1("PLAYER2 Wins!")
    }
  }


  function playerOneAttack(damage, callback) {  
    setP1State("attack");
    setShowP1Fireball(true);
    return setTimeout(() => {
      setP2State("injured");
      setP1State("standing");
      setP2Health(Math.max(0, p2Health - damage));
      setTimeout(() => {
        setShowP1Fireball(false);
        setP2State("standing");
        setSummary([...summary, p1Character]);
        callback();
      }, DAMAGE_DURATION)
    }, ATTACK_DURATION)
    
  };

  function playerTwoAttack(damage, callback) {
    setP2State("attack");
    setShowP2Fireball(true);
    setTimeout(() => {
      setP1State("injured");
      setP2State("standing");
      setP1Health(Math.max(0, p1Health - damage));
      setTimeout(() => {
        setShowP2Fireball(false);
        setP1State("standing");
        setSummary([...summary, p2Character]);
        callback();
      }, DAMAGE_DURATION)
    }, ATTACK_DURATION)
  };


  const textboxProps = {
    topic,
    text1,
    text2,
    text3,
    isBattleFinished,
    summary,
    p1Character,
    gameData,
    p1Name,
    p2Name
  }

 
  return (
    <Screen>
      <div className={css(styles.content)} onClick={initbattleRound}>
        {showOverlay && (
          <div className={css(styles.overlay)}>
            {countDown > 0 && <h1 className={css(styles.countDown)}>{countDown}</h1>}
            {countDown === 0 && (<img src={fightText} className={css(styles.fightText)} />)}
          </div>
        )}
        <div className={css(styles.background)}>
          <Row justifyContent={"space-between"} style={styles.healthbarRow}>
            <ProgressBar 
              completed={p1Health}
              maxCompleted={100}
              customLabel={(
                <span className={css(styles.healthbarLabel, styles.p1Label)}>
                  <img src={p1Character?.thumbnail} className={css(styles.thumbnail)} />
                  {p1Name}
                </span>
              )}
              baseBgColor={Colors.red()}
              bgColor={"rgb(255, 255, 0)"}
              height={"55"}
              borderRadius={0}
              className="wrapper"
              labelClassName="label"
            />
            <img 
              src={isBattleFinished ? koGold: koWhite} 
              className={css(styles.koIcon)} 
            />
            <ProgressBar 
              completed={p2Health}
              maxCompleted={100}
              customLabel={(
                <span className={css(styles.healthbarLabel, styles.p2Label)}>
                  <img src={p2Character?.thumbnail} className={css(styles.thumbnail)} />
                  {p2Name}
                </span>
              )}
              baseBgColor={Colors.red()}
              bgColor={"rgb(255, 255, 0)"}
              height={"55"}
              borderRadius={0}
              className="wrapper"
              labelClassName="label"
            />
          </Row>
          <Row justifyContent={"space-between"} alignItems={"flex-end"} style={styles.characterRow}>
            <div className={css(styles.player1)}>
              <Character 
                character={p1Character}
                isPlayerOne={true}
                status={p1State}
              />
            </div>
            <FireAttack 
              play={showP1Fireball} 
            />
            <CatAttack
              play={showP2Fireball}
            />
            <div className={css(styles.player2)}>
              <Character 
                character={p2Character} 
                isPlayerOne={false} 
                status={p2State}
              />
            </div>
          </Row>
        </div>
        <TextBox 
          title={battleRound < 3 ? `Round ${battleRound + 1}` : "FIGHT OVER"}
          {...textboxProps}
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
  countDown: {
    fontSize: 60,
    background: `-webkit-linear-gradient(${Colors.orange()}, ${Colors.red()})`,
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    filter: 'drop-shadow(3px 3px 1px #333)'
  },
  fightText: {
    height: "40%",
  },
  background: {
    position: "relative",
    backgroundImage: `url(${beachBackground})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%",
    height: 620
  },
  overlay: {
    zIndex: 3,
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    background: Colors.darkGray(0.8),
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  healthbarRow: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: 20,
    boxSizing: "border-box"
  },
  healthbarLabel: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  p1Label: {
    //todo: make this modular style
    background: `-webkit-linear-gradient(${Colors.blue()}, ${Colors.p1Blue()})`,
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    filter: 'drop-shadow(3px 3px 1px #333)'
  },
  p2Label: {
    background: `-webkit-linear-gradient(red, ${Colors.red()})`,
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    filter: 'drop-shadow(3px 3px 1px #333)'
  },
  thumbnail: {
    height: 50,
    width: 50,
    userSelect: "none",
    marginRight: 5
  },
  characterRow: {
    position: "absolute",
    bottom: 60,
    left: 0,
    padding: "0 30px",
    boxSizing: "border-box"
  }
  
  
});

export default BattleScreen;
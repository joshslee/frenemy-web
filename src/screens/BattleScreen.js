// NPM
import React, { useState, useMemo, useEffect } from 'react'
import { StyleSheet, css } from 'aphrodite';
import { ToastContainer, toast } from 'react-toastify';
import ProgressBar from "@ramonak/react-progress-bar";

// Components
import Screen from "./Screen";
import Row from "../components/Row";
import Button from "../components/Button";
import Character from "../components/Character";
import TextBox from "../components/TextBox";
import FireAttack from "../components/Sprites/FireAttack";
import CatAttack from "../components/Sprites/CatAttack";


// Assets
import beachBackground from "../assets/background/beach.gif";
import koWhite from "../assets/ko-white.png";
import koGold from "../assets/ko-gold.png";
import p1Win from "../assets/1p-win.png";

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
  gameData
}) => {

  const [battlePhase, setBattlePhase] = useState(0);
  const [battleText, setBattleText] = useState("");
  const [isBattleFinished, setIsBattleFinished] = useState(false);

  const [p1Health, setP1Health] = useState(100);
  const [p2Health, setP2Health] = useState(100);

  const [p1State, setP1State] = useState("standing");
  const [p2State, setP2State] = useState("standing");

  const [showP1Fireball, setShowP1Fireball] = useState(false);
  const [showP2Fireball, setShowP2Fireball] = useState(false);

  const p1Name = useMemo(() => abbreviateEthAddress(ethAddressOne), [ethAddressOne]);
  const p2Name = useMemo(() => abbreviateEthAddress(ethAddressTwo), [ethAddressTwo]);

  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");


  useEffect(() => {
    if (battlePhase >= 3) return;
    initBattlePhase()
  }, [battlePhase])

  function calculateDamageByPhase() {
    switch (battlePhase) {
      case 0:
        return 75;
      case 1:
        return 50;
      case 2:
        return 50;
      default:
        return null;
    }
  };

  function onAttackSequence(isP1Winner) {
    const damage = calculateDamageByPhase();

    isP1Winner
      ? playerOneAttack(damage, onAttackEnd)
      : playerTwoAttack(damage, onAttackEnd);
  };

  function onAttackEnd() {
    const _battlePhase = battlePhase + 1;
    setBattlePhase(_battlePhase);

    if (_battlePhase === 3) {
      setIsBattleFinished(true)
      onBattleEnd("p1")
    }
  }

  
  function onBattleEnd(winner) {
    if (winner === "p1") {
      setP1State("victory");
      setP2State("defeat");
    } else {
      setP1State("defeat");
      setP2State("victory");
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
        callback();
      }, DAMAGE_DURATION)
    }, ATTACK_DURATION)
  };

  function initBattlePhase() {
    const currentStep = gameData?.steps[battlePhase];
    const { text1, text2, winner1 } = currentStep;

    setText1(`${p1Name}${text1.slice(42)}`);
    setText2(`${p2Name}${text2.slice(42)}`)
    onAttackSequence(winner1);
  }

 
  return (
    <Screen>
      <div className={css(styles.content)} >
        <div className={css(styles.background)}>
          <Row justifyContent={"space-between"} style={styles.healthbarRow}>
            <ProgressBar 
              completed={p1Health}
              maxCompleted={100}
              customLabel={p1Name}
              baseBgColor={Colors.red()}
              bgColor={"rgb(255, 255, 0)"}
              height={55}
              borderRadius={0}
              className="wrapper"
              labelClassName="label"
            />
            <img 
              src={isBattleFinished ? p1Win : koWhite} 
              className={css(styles.koIcon)} 
            />
            <ProgressBar 
              completed={p2Health}
              maxCompleted={100}
              customLabel={p2Name}
              baseBgColor={Colors.red()}
              bgColor={"rgb(255, 255, 0)"}
              height={55}
              borderRadius={0}
              className="wrapper"
              labelClassName="label"
            />
          </Row>
          {/* <Row justifyContent={"space-between"} style={styles.healthbarRow}>
            {p1State === "winner" && (
              <img src={p1Win} className={css(styles.p1Wi)}
            )}
          </Row> */}
          <Row justifyContent={"space-between"} alignItems={"flex-end"} style={styles.characterRow}>
            <div className={css(styles.player1)}>
              <Character 
                character={p1Character}
                character={PLAYABLE_CHARACTERS[1]}
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
                character={PLAYABLE_CHARACTERS[0]}
                isPlayerOne={false} 
                status={p2State}
              />
            </div>
          </Row>
        </div>
        <TextBox 
          title={`Battle Phase ${battlePhase + 1} `}
          text1={text1}
          text2={text2}
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
    height: 620
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
    bottom: 60,
    left: 0,
    padding: "0 30px",
    boxSizing: "border-box"
    // height: 200
  }
  
  
});

export default BattleScreen;
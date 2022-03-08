// NPM
import { useState, useRef, useEffect, useMemo } from 'react'
import { StyleSheet, css } from 'aphrodite';
import { Colors } from "../utils/colors";

import Column from './Column';

import Spritesheet from 'react-responsive-spritesheet';
import explosionSprite from "../assets/spritesheets/explosion.png";
import { abbreviateEthAddress } from "../utils/helpers";

import punkSpeech from "../assets/characters/cryptopunk/speech/selection.png";
import catSpeech from "../assets/characters/coolcat/speech/selection.png";


const CharacterAvatar = ({ 
  character, 
  address, 
  isPlayerOne, 
  isConfirmed,
}) => {
  const spritesheetRef = useRef();
  const [showCharacter, setShowCharacter] = useState(false);

  useEffect(() => {
    if (!spritesheetRef.current) return;
    setShowCharacter(false);
    spritesheetRef?.current?.goToAndPlay(0)
  }, [character, isConfirmed]);

  const abbrevAddress = useMemo(() => abbreviateEthAddress(address), [address]);
  const playerSummary = useMemo(() => formatPlayerSummary(), [address])

  function formatPlayerSummary() {
    return (isPlayerOne ? "P1:" : "P2:") + abbrevAddress; 
  }


  if (!character) {
    return (
      <Column>
        <div style={{ height: 300, width: "50%"}}></div>
        <div className={css(styles.container)}>
            <p className={css(isPlayerOne ? styles.player1 : styles.player2)}>{playerSummary}</p>
            <h2 className={css(styles.name)}>{"Choosing..."}</h2>
        </div>
      </Column>
    )
  }


  return (
    <Column>

      <div className={css(styles.avatar)} style={{ animation: isConfirmed ? null : "bounce 0.8s ease-in-out infinite"}}>
        {isConfirmed && (
           <img 
            className={css(isPlayerOne ? styles.p1Speech : styles.p2Speech)}
            src={isPlayerOne ? punkSpeech : catSpeech}
            draggable={false}
          />
        )}
        <img 
          className={css(styles.image, !isPlayerOne && styles.reverseImage, showCharacter && styles.showImage)}
          src={isConfirmed ? character?.victory : character?.standing}
          draggable={false}
        />
        <Spritesheet
          getInstance={spritesheet => {
            spritesheetRef.current = spritesheet;
          }}
          style={{ 
            height: 300, 
            width: 300,
            position: "absolute",
            bottom: 0,
            left: '50%',
            transform: 'translate(-50%, 0)',
          }}
          image={explosionSprite}
          widthFrame={128} 
          heightFrame={128}
          steps={13}
          fps={20}
          autoplay={true}
          loop={true}
          onLoopComplete={(spritesheet) => {
            spritesheet.pause();
            setShowCharacter(true)
          }}
        />
      </div>
      <div className={css(styles.container)}>
          <p className={css(isPlayerOne ? styles.player1 : styles.player2)}>{`P1: ${abbrevAddress}`}</p>
          <h2 className={css(styles.name)}>{character?.name}</h2>
      </div>
    </Column>
  )
};


const styles = StyleSheet.create({
  image: {
    userSelect: "none",
    opacity: 0,
    zIndex: -1,
    height: 300,
  },
  reverseImage: {
    transform: "rotateY(180deg)",
  },
  showImage: {
    opacity: 1,
    zIndex: "auto",
    height: 300,
  },
  avatar: {
    position: "relative",
  },
  p1Speech: {
    width: 300,
    position: "absolute",
    top: 0,
    left: 40
  },
  p2Speech: {
    width: 300,
    position: "absolute",
    top: 0,
    right: 90,
    zIndex: 1
  },
  container: {

  },
  player1: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.p1Blue()
  },
  player2: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.red()
  },
  name: {
    margin: "0 0 30px 0",
    textTransform: "uppercase",
    background: `-webkit-linear-gradient(${Colors.orange()}, ${Colors.red()})`,
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    filter: 'drop-shadow(3px 3px 1px #333)'

  }
});

export default CharacterAvatar;
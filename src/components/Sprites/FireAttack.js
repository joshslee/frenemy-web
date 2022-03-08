// NPM
import React, { useState, useRef, useEffect, useMemo } from 'react'
import { StyleSheet, css } from 'aphrodite';

import Spritesheet from 'react-responsive-spritesheet';
import fireAttackSprite from "../../assets/spritesheets/fire-attack.png";
import fireAttackEnd from "../../assets/spritesheets/fire-end.png";

const FireAttack = ({ play = false, reverse = false }) => {
  const spritesheetRef = useRef();
  const [widthFrame, setWidthFrame] = useState(144);
  const [heightFrame, setHeightFrame] = useState(180);

  const [isHidden, setIsHidden] = useState(false);
  const [showFireEnd, setShowFireEnd] = useState(false);
  const [shouldMoveForward, setShouldMoveForward] = useState(false);

  useEffect(() => {
    const spritesheet = spritesheetRef?.current;
    setWidthByFrame(144);
    if (spritesheet && play && isHidden) {
      resetState(spritesheet);
    } 
  }, [play]);

  function resetState(spritesheet) {
    setIsHidden(false);
    setShowFireEnd(false);
    setShouldMoveForward(false);
    setTimeout(() => {
      spritesheet.play()
    }, 400)
  }

  function setWidthByFrame(currFrame) {
    switch(currFrame) {
      case 1:
        return setWidthFrame(210);
      case 2:
        if (widthFrame < 230) {
          return setWidthFrame(240);
        }
      case 3:
        return setWidthFrame(360);
      case 4:
        return setWidthFrame(144);
      case 5:
      default:
        return setWidthFrame(144);
    }

  }

  function onEnterFrame() {
    return new Array(4).fill(1).map((_, i) => ({
      frame: i + 1,
      callback: () => setWidthByFrame(i+1)
    }));
  }

  if (!play) return null;

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" ,height: 300    }}>
      { showFireEnd ? (
        <img src={fireAttackEnd} className={css(styles.fireAttackEnd, isHidden && styles.hidden)} />
      ) : (
        <Spritesheet
          className={shouldMoveForward ? "fireball" : null}
          getInstance={spritesheet => {
            spritesheetRef.current = spritesheet;
          }}
          style={{ 
            marginLeft: -400, 
            paddingBottom: 50,
            opacity: isHidden ? 0 : 1,
            zIndex: 2
          }}
          image={fireAttackSprite}
          widthFrame={widthFrame}
          heightFrame={heightFrame}
          steps={4}
          fps={5}
          loop={true}
          onEnterFrame={onEnterFrame()}
          onLoopComplete={(spritesheet) => {
            spritesheet.pause();
            setShouldMoveForward(true);
            setTimeout(() => {
              setShowFireEnd(true);
              setTimeout(() => {
                setIsHidden(true);
              }, 200)
            }, 1000)
          }}
        />
      )}
    </div>
  )
};

const styles = StyleSheet.create({
  fireAttackEnd: {
    transform: "translate(360px)",
    opacity: 1,
    transition: "all ease-in-out 0.2s",
    zIndex: 2
  },
  hidden: {
    opacity: 0,
    transform: "translate(360px, -30px)",

  }
})


export default FireAttack;
// NPM
import React, { useState, useRef, useEffect, useMemo } from 'react'
import { StyleSheet, css } from 'aphrodite';

import Spritesheet from 'react-responsive-spritesheet';
import ccFireball from "../../assets/characters/coolcat/fireball.png";

const CatAttack = ({ play = false, reverse = false }) => {

  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if (play && !isShown) {
      setIsShown(true);
      setTimeout(() => {
        setIsShown(false)
      }, 1200)
    }
  }, [play]);

  return (
    <div className={css(styles.container, isShown ? styles.moving : styles.hidden)}>
      <img src={ccFireball} className={css(styles.fireball)} draggable={false} />
    </div>
  )
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 300,
    marginRight: -500
  }, 
  moving: {
    animation: "back 1.2s"
  },
  fireball: {
    transform: "rotateY(180deg)",
    opacity: 1,
    transition: "all ease-in-out 0.2s",
    zIndex: 2,
    width: 200,
    useSelect: "none"
  },
  hidden: {
    opacity: 0,
    transform: "translate(-560px, -30px)",

  }
})


export default CatAttack;
// NPM
import React, { useState, useRef, useEffect, useMemo } from 'react'
import { StyleSheet, css } from 'aphrodite';

import speechBubble from "../assets/characters/cryptopunk/speech/victory.png";

const Character = ({ character, status, isPlayerOne }) => {

  function movementStylesByStatus() {
    switch(status) {
      case "injured":
        return "blinker 0.4s linear infinite";
      case "defeat":
        return null;
      default:
        return "bounce 0.8s ease-in-out infinite"
    }
  };

  function avatarStyleByStatus() {
    const classNames = [styles.image];

    if (!isPlayerOne) {
      classNames.push(styles.reverseImage);
    }

    if (status === "defeat") {
      classNames.push(styles.defeat)
    }

    return classNames;
  };

  return (
    <div 
      className={css(styles.avatar)} 
      style={{ animation: movementStylesByStatus() }}
    >
      <img 
        className={css(avatarStyleByStatus())}
        src={character[status]}
        draggable={false}
      />
      {status === "victory" && (
        <img 
          draggable={false}
          className={css(styles.speechBubble)} 
          src={speechBubble} 
          alt={"speech bubble"}
        />
      )}
    </div>
  )
};

const styles = StyleSheet.create({
  image: {
    userSelect: "none",
    height: 300,
  },
  defeat: {
    marginBottom: -30,
    height: 120
  },
  reverseImage: {
    transform: "rotateY(180deg)",
  },
  avatar: {
    position: "relative",
  },
  speechBubble: {
    width: 400,
    position: "absolute",
    top: -20,
    left: 20
    
  },
});

export default Character;
// NPM
import React, { useState, useRef, useEffect, useMemo } from 'react'
import { StyleSheet, css } from 'aphrodite';
import { Colors } from "../utils/colors";
import { dimensionStyles } from "../utils/styles";

import Column from './Column';
import Row from "./Row";

import Spritesheet from 'react-responsive-spritesheet';
import explosionSprite from "../assets/spritesheets/explosion.png";
import { abbreviateEthAddress } from "../utils/helpers";

const Character = ({ character, status, isPlayerOne }) => {

  function movementStylesByStatus() {
    switch(status) {
      case "injured":
        return "blinker 1s linear infinite";
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
});

export default Character;
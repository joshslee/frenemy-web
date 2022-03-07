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

const Character = ({ character, isPlayerOne }) => {

  function characterImageByState() {

  };

  return (
    <div className={css(styles.avatar)} style={{ animation: "bounce 0.8s ease-in-out infinite"}}>
      <img 
        className={css(styles.image, !isPlayerOne && styles.reverseImage)}
        src={character?.standing}
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
  reverseImage: {
    transform: "rotateY(180deg)",
  },
  avatar: {
    position: "relative",
  },
});

export default Character;
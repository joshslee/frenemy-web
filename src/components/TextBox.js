// NPM
import React, { useState, useRef, useEffect, useMemo } from 'react'
import { StyleSheet, css } from 'aphrodite';
import { Colors } from "../utils/colors";

import Column from './Column';
import Row from "./Row";

import Spritesheet from 'react-responsive-spritesheet';
import explosionSprite from "../assets/spritesheets/explosion.png";
import { abbreviateEthAddress } from "../utils/helpers";
import { dimensionStyles, corneredBorderStyles } from "../utils/styles";
import { RetroUIBorder } from "../utils/styles";



const TextBox = (props) => {
  const { title, body } = props;

  return (
    <Column justifyContent={"flex-start"} alignItems={'flex-start'} style={styles.container}>
      <h4 className={css(styles.title)}>{title}</h4>
      <p className={css(styles.body)}>{body} </p>
    </Column>
  )
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    boxSizing: "border-box",
    height: "calc(100% - 690px)",
    width: "calc(100% - 10px)",
    background: Colors.gray(),
    padding: 20,
    margin: 5,
    boxShadow: RetroUIBorder({ color: Colors.darkGray(), borderX: 5, borderY: 7.5 }),
    zIndex: 1
  },
  title: {
    position: "absolute",
    top: -40,
    margin: 0
  },
  body: {
    margin: 0,
    padding: 0,
    fontSize: 18,
    textAlign: "left",
    lineHeight: 1.6
  }
});

export default TextBox;


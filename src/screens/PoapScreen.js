// NPM
import React, { useState, useMemo, useEffect } from 'react'
import { StyleSheet, css } from 'aphrodite';
import { ToastContainer, toast } from 'react-toastify';
import ProgressBar from "@ramonak/react-progress-bar";

// Components
import Screen from "./Screen";
import Column from "../components/Column";
import Button from "../components/Button";
import Character from "../components/Character";
import TextBox from "../components/TextBox";
import FireAttack from "../components/Sprites/FireAttack";

// Assets

import frenemyPOAP from "../assets/frenemy-poap.gif";

// Utils
import { Colors } from '../utils/colors';
import { abbreviateEthAddress } from "../utils/helpers";
import { dimensionStyles } from "../utils/styles";

import { 
  PLAYABLE_CHARACTERS, 
  ATTACK_DURATION,
  DAMAGE_DURATION 
} from "../utils/constants";


const POAPScreen = () => {
  return (
    <Screen backgroundColor={Colors.pink()}>
      <Column justifyContent={"flex-start"} alignItems={"center"}>
        <h2 className={css(styles.title)}>{"Thanks for participating in our demo!"}</h2>
        <a 
          href={"https://app.poap.xyz/claim-websites/frenemy-v1"}
          target="_blank"
          rel="noreferrer"
          className={css(styles.link)}
        >
          <img src={frenemyPOAP} className={css(styles.poap)} />
          <Button style={styles.button} label={"Claim Exclusive POAP"} /> 
        </a>
      </Column>
    </Screen>
  )
};


const styles = StyleSheet.create({
  poap: {
    ...dimensionStyles({ width: 350, height: 350 }),
    borderRadius: "100%",
    boxShadow: `0 0 20px ${Colors.darkGray()}`,

  },
  title: {
    fontSize: 30,
    textAlign: "left",
    maxWidth: 725,
    lineHeight: 2,
    // margin: 0,
    background: `-webkit-linear-gradient(${Colors.orange()}, ${Colors.red()})`,
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    filter: 'drop-shadow(3px 3px 1px #333)',
    textTransform: "uppercase",
    padding: "50px 0 50px 0",

  },
  link: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "unset",
    fontFamily: "Press Start 2P",
    color: Colors.blue(),
  },
  button: {
    marginTop: 60,
    fontSize: 20
  }
});

export default POAPScreen;

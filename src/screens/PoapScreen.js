// NPM
import React, { useState, useMemo, useEffect } from 'react'
import { StyleSheet, css } from 'aphrodite';
import { ToastContainer, toast } from 'react-toastify';
import ProgressBar from "@ramonak/react-progress-bar";

// Components
import Screen from "./Screen";
import Column from "../components/Column";
import Row from "../components/Row";

import CreditScreen from './CreditScreen';
import { PLAYABLE_CHARACTERS  } from "../utils/constants";

// Assets
import frenemyPOAP from "../assets/frenemy-poap.gif";

// Utils
import { Colors } from '../utils/colors';
import { dimensionStyles } from "../utils/styles";
import twitterIcon from "../assets/twitter.svg"
import discordIcon from "../assets/discord.png"
import { sendAmpEvent } from "../utils/events";

const coolCat = PLAYABLE_CHARACTERS[0].victory;
const cryptopunk = PLAYABLE_CHARACTERS[1].victory;

const POAPScreen = () => {

  return (
    <Screen backgroundColor={Colors.medCharcoal()} style={styles.wrapper}>
      <Column justifyContent={"flex-start"} alignItems={"center"} style={styles.content}>
        <img src={coolCat} className={css(styles.cat)} draggable={false} />
        <img src={cryptopunk} className={css(styles.punk)} draggable={false} />

        <Row justifyContent={"space-between"} alignItems={"flex-start"} style={styles.header}> 
          <h2 className={css(styles.title)}>{"Thanks for playing the Frenemy Fighter demo!"}</h2>
          <a 
            href={"https://app.poap.xyz/claim-websites/frenemy-v1"}
            target="_blank"
            rel="noreferrer"
            className={css(styles.link)}
            onClick={() => sendAmpEvent("poap")}
          >
            <img src={frenemyPOAP} className={css(styles.poap)} />
            <p>Click for exclusive POAP!</p>
          </a>
        </Row>
        <Row justifyContent={"flex-start"} alignItems={"center"} style={styles.header} >
          <h2 className={css(styles.title)}>{"Frenemies:"}</h2>
          <a 
            href={"https://twitter.com/BeMyFrenemy"}
            target="_blank"
            rel="noreferrer"
          >
            <img src={twitterIcon} className={css(styles.twitterIcon)} draggable={false} />
          </a>
          <a 
            href={"https://discord.gg/4FHC9Er6GE"}
            target="_blank"
            rel="noreferrer"
          >
            <img src={discordIcon} className={css(styles.discordIcon)} draggable={false} />
          </a>

        </Row>
        <CreditScreen />
      </Column>
    </Screen>
  )
};


const styles = StyleSheet.create({
  wrapper: {
    minWidth: "unset"
  },
  content: {
    position: "relative",
    height: "100%",
    width: "100%"
  },
  poap: {
    ...dimensionStyles({ width: 200, height: 200 }),
    borderRadius: "100%",
    boxShadow: `0 0 20px ${Colors.darkGray()}`,

  },
  cat: {
    position: "absolute",
    height: 150,
    top: 200,
    left: 50
  },
  punk: {
    position: "absolute",
    height: 150,
    top: 350,
    right: 60,
    transform: "rotateY(180deg)",
  },
  header: {
    padding: "20px 50px",
    boxSizing: "border-box"
  },
  title: {
    fontSize: 30,
    textAlign: "left",
    lineHeight: 2,
    background: `-webkit-linear-gradient(${Colors.orange()}, ${Colors.red()})`,
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    filter: 'drop-shadow(3px 3px 1px #222)',
    textTransform: "uppercase",
    padding: "20px 20px 0 0",
  },
  subtitle: {
    fontSize: 20,
    textAlign: "left",
    maxWidth: 725,
    lineHeight: 2,
    margin: "0 auto 0 auto"
  },
  link: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "unset",
    textTransform: "uppercase",
    fontFamily: "Press Start 2P",
    color: Colors.blue(),
    lineHeight: 1.6,
    fontSize: 14,
    marginTop: 30,
    ":hover": {
      textDecoration: "underline"
    }
  },
  button: {
    marginTop: 60,
    fontSize: 20
  },
  twitterIcon: {
    width: 60,
    padding: "20px 20px 0 0",
    ":hover": {
      opacity: 0.7
    }
  },
  discordIcon: {
    height: 75,
    padding: "20px 20px 0 0",
    ":hover": {
      opacity: 0.7
    }
  }
});

export default POAPScreen;

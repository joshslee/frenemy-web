import { useState } from "react";
import { StyleSheet, css } from "aphrodite";
import ethCoin from "../assets/eth-coin.png";


import { Colors } from "../utils/colors";
import {  RetroUIBorder } from "../utils/styles";

const Button = (props) => {

  return (
    <button className={css(styles.button, props.style && props.style, props.disabled && styles.disabled)} {...props}>
      {props.label}
      <img src={ethCoin} className={css(styles.ethCoin) + " ethCoin"} />
    </button>
  )
};

const styles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "none",
    fontFamily: "'Press Start 2P',monospace",
    boxShadow: RetroUIBorder(),
    cursor: "pointer",
    textTransform: "uppercase",
    fontSize: 30,
    padding: "20px 40px",
    backgroundColor: Colors.yellow(),
    color: Colors.darkGray(),
    ":active": {
      boxShadow: RetroUIBorder({ color: Colors.darkYellow()}),
      color: Colors.blue(),
    },
    ":hover": {
      boxShadow: RetroUIBorder({ color: Colors.darkYellow()}),
      color: Colors.blue(),
    },
    ":hover .ethCoin": {
      animation: "spinX 0.4s infinite"
    },
  },
  disabled: {
    opacity: 0.7,
    cursor: "not-allowed"
  },
  ethCoin: {
    height: 40,
    marginLeft: 5,
  }
});

export default Button;
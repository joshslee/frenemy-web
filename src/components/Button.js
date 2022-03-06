import { useState } from "react";
import { StyleSheet, css } from "aphrodite";

import { Colors } from "../utils/colors";
import {  RetroUIBorder } from "../utils/styles";

const Button = (props) => {

  return (
    <button className={css(styles.button)} {...props}>
      {props.label}
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
    ":hover": {
      opacity: 0.7
    }
  }
});

export default Button;
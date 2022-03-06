import { useState } from "react";
import { StyleSheet, css } from "aphrodite";

import { Colors } from "../utils/colors";
import { RetroUIBorder } from "../utils/styles";

export default function TextInput(props) {

  function formatInputStyleByStatus() {
    
  }

  return (
    <div className={css(styles.inputContainer)}>
      <label className={css(styles.label)}>{props.name}</label>
      <input
        className={css(styles.input)}
        style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", borderSize: 5 }}
        {...props}
      />
    </div>
  )
};

const styles = StyleSheet.create({ 
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    padding: "0 15px",
    color: Colors.darkGray(),
  },
  label: {
    paddingBottom: 20,
    fontSize: 20,
  },
  input: {
    height: 60,
    minWidth: 300,
    padding: 15,
    width: "100%",
    boxSizing: "border-box",
    boxShadow: RetroUIBorder({ borderX: 5, borderY: 7.5 }),
    // boxShadow: "0 4px #4d5256, 0 -4px #4d5256, 4px 0 #4d5256, -4px 0 #4d5256",
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 18,
    textOverflow: "ellipsis",
    border: "none",
    highlight: "none",
    outline: "none",
    cursor: "pointer",
    ":hover": {
      boxShadow: RetroUIBorder({ color: Colors.blue(), borderX: 5, borderY: 7.5 }),
    },
    ":active": {
      boxShadow: RetroUIBorder({ color: Colors.blue(),borderX: 5, borderY: 7.5 }),
    }
  }
})
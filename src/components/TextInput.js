import { useState } from "react";
import { StyleSheet, css } from "aphrodite";
import { ETH_WALLET_PLACEHOLDER } from "../utils/constants";
import { Input } from 'retro-ui'


import Column from "./Column";

export default function TextInput(props) {

  return (
    <div className={css(styles.inputContainer)}>
      <Input 
        style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", borderSize: 5 }}
        {...props}
      />
    </div>
  )
};

const styles = StyleSheet.create({ 
  inputContainer: {
    width: "50%",
    padding: "0 15px"
  },
  input: {
    color: "#000",
    // height: 60,
    // minWidth: 300,
    // padding: 15,
    width: "100%",
    boxSizing: "border-box",
    // borderRaidus: 5,
  }
})
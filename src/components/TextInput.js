import { useState } from "react";
import { aphrodite, css } from "aphrodite";
import { ETH_WALLET_PLACEHOLDER } from "../utils/constants";

export default function TextInput(props) {

  const [_text, _setText] = useState("");

  const onChange = (e) => {
    const text = e.target.value;
    _setText(text);
    props.onChange && props.onChange(text)
  }

  const inputProps = {
    ...props,
    onChange,
    value: _text
  }

  return (
    <input 
      className={css(styles.input)}
      {...inputProps}
    />
  )
};

const styles = StyleSheet.create({ 
  input: {
    height: 45,
    minWidth: 300,
    padding: 15,
    boxSizing: "border-box",
    borderRaidus: 5,
  }
})
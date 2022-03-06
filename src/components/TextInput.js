import { useState } from "react";
import { StyleSheet, css } from "aphrodite";

import { Colors } from "../utils/colors";
import { RetroUIBorder } from "../utils/styles";
import snesController from "../assets/snes-controller.png";

export default function TextInput(props) {
  const { status } = props;

  const [isFocused, setIsFocused] = useState(false);

  function formatInputStyleByStatus() {
    const classNames = [styles.input];
    if (status) {
      classNames.push(styles[status]);
    }
    return classNames;
  }

  function handleClick(e) {
    e && e.stopPropagation();
    console.log("handle click called")
    props?.onClick();
  }


  return (
    <div className={css(styles.inputContainer)} onClick={handleClick}>
      <div className={css(styles.labelContainer)}>
        <label className={css(styles.label, isFocused && styles.focused) + " input-label"}>
          {props.name}
        </label>
        <img src={snesController} className={css(styles.icon) + " icon"} />
      </div>
      <input
        className={css(formatInputStyleByStatus()) + " input"}
        {...props}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  )
};
//  const InputIcon = ({ status }) => {
//   if (status === "error") {
//     return <img src={snesControllerMissing} className={css(styles.errorIcon) + " icon"} />
//   }
//   return <img src={snesController} className={css(styles.icon) + " icon"} />
// }

const styles = StyleSheet.create({ 
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    padding: "0 15px",
    color: Colors.darkGray(),
    height: 130,
    minHeight: 130,
    maxHeight: 130,
    ":hover": {
      color: Colors.blue()
    },
    ":hover .input-label": {
      color: Colors.blue()
    },
    ":hover .input": {
      boxShadow: RetroUIBorder({ color: Colors.blue(),borderX: 5, borderY: 7.5 }),
    },
    ":hover .icon": {
      opacity: 1,
      animation: "spinX 0.4s infinite"

    }
  },
  labelContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 20,
  },
  label: {
    fontSize: 20,
  },
  focused:  {
    color: Colors.blue()
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
    // animation: 
  
    ":active": {
      boxShadow: RetroUIBorder({ color: Colors.blue(),borderX: 5, borderY: 7.5 }),
    },
    ":focus": {
      boxShadow: RetroUIBorder({ color: Colors.blue(),borderX: 5, borderY: 7.5 }),
    },
    
  },
  success: {
    boxShadow: RetroUIBorder({ color: Colors.green(), borderX: 5, borderY: 7.5 }),
    backgroundColor: Colors.green(0.6)
  },
  error: {
    boxShadow: RetroUIBorder({ color: Colors.red(), borderX: 5, borderY: 7.5 }),
    backgroundColor: Colors.red(0.6),
    animation: "shake 0.2s ease-in-out 0s 2"
  },
  loading: {
    cursor: "disabled",
    boxShadow: RetroUIBorder({ color: Colors.darkYellow(), borderX: 5, borderY: 7.5 }),
    backgroundColor: Colors.yellow()
  },
  icon: {
    opacity: 1,
    height: 25,
    marginLeft: 5,
    boxSizing: "border-box"
  },
  errorIcon: {
    opacity: 1,
    height: 40,
    marginLeft: 5,
  }
})
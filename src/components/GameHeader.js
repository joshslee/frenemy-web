import { useState } from "react";
import { StyleSheet, css } from "aphrodite";

// ASSETS
import titleImage from "../assets/title.png";

// UTILS
import { Colors } from '../utils/colors';
import { GAME_SUBTITLE } from "../utils/constants";


const GameHeader = () => {
  const [imageDidLoad, setImageDidLoad] = useState(false);


  return (
    <div className={css(styles.titleContainer, !imageDidLoad && styles.hidden)}>
      <img
        className={css(styles.title) + " glimmer"} 
        src={titleImage} 
        alt={"Frenzy Fighter"} 
        onLoad={() => setImageDidLoad(true)} 
      />
      <h3 className={css(styles.subtitle)}>
        {GAME_SUBTITLE}
      </h3>
    </div>
  )
};

const styles = StyleSheet.create({
  titleContainer: {
    paddingTop: 30,
    minHeight: 460,
    opacity: 1,
    transition: "all ease-in 0.1s"
  },
  hidden: {
    opacity: 0
  },
  title: {
    position: "relative",
    overflow: "hidden",
    width: "55%",
    margin: "0 auto",
    userSelect: "none",
  },
  subtitle: {
    fontSize: 24,
    color: Colors.blue(),
    textShadow: `3px 3px 1px ${Colors.darkGray()}`,
    userSelect: "none"
  }
})

export default GameHeader;
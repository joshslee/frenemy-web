
// ASSETS
import { StyleSheet, css } from "aphrodite";
import titleImage from "../assets/title.png";

// UTILS
import { Colors } from '../utils/colors';
import { GAME_SUBTITLE } from "../utils/constants";


const GameHeader = () => {

  return (
    <div className={css(styles.titleContainer)}>
      <img className={css(styles.title)} src={titleImage} alt={"Frenzy Fighter"} />
      <h3 className={css(styles.subtitle)}>
        {GAME_SUBTITLE}
      </h3>
    </div>
  )
};

const styles = StyleSheet.create({
  titleContainer: {
    paddingTop: 30
  },
  title: {
    width: "55%",
    margin: "0 auto"
  },
  subtitle: {
    fontSize: 24,
    color: Colors.blue(),
    textShadow: `3px 3px 1px ${Colors.darkGray()}`
  }
})

export default GameHeader;
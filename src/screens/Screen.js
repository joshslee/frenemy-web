import { StyleSheet, css } from "aphrodite";

const Screen = ({ backgroundColor = "#FFF", style, children }) => {

  return (
    <div className={css(styles.screen, style && style)} style={{ backgroundColor }}>
      {children}
    </div>
  )
};


const styles = StyleSheet.create({
  screen: {
    minWidth: 1100,
    maxWidth:  1200,
    width: "100%",
    height: "100%",
    margin: "0 auto"
  }
});


export default Screen;
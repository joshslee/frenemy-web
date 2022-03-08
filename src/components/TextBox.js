// NPM
import { StyleSheet, css } from 'aphrodite';
import { Colors } from "../utils/colors";

import Row from './Row';
import Column from './Column';

import p1Wins from "../assets/1p-win.png";
import { RetroUIBorder } from "../utils/styles";
import { dimensionStyles } from "../utils/styles";



const TextBox = (props) => {
  const { 
    title,
    topic,
    text1,
    text2,
    text3,
    summary,
    isBattleFinished
  } = props;

  return (
    <Column justifyContent={"flex-start"} alignItems={'flex-start'} style={styles.container}>
      <Row justifyContent={"flex-start"} width={"100%"} style={styles.titleContainer}>
        <h4 className={css(styles.title)}>{title}</h4>
        {summary.map(roundWinner => (
          <div className={css(styles.thumbnailContainer)}>
            <img src={roundWinner?.thumbnail} className={css(styles.winnerThumbnail)} />
          </div>
        ))}
      </Row>
      {isBattleFinished ? (
        <img src={p1Wins} className={css(styles.winLogo)} />
      ) : (
        <>
          {topic && <p className={css(styles.topic)}>{topic}</p>}
          {text1 && <p className={css(styles.p1Text)}>{`>${text1}`}</p>}
          {text2 && <p className={css(styles.p2Text)}>{`>${text2}`}</p>}
          {text3 && <p className={css(styles.p3Text)}>{text3} </p>}
        </>
      )}
      <div className={css(styles.userdirections)}>
        {"Click to Continue"}
      </div>
    </Column>
  )
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    boxSizing: "border-box",
    height: "calc(100% - 630px)",
    width: "calc(100% - 10px)",
    background: Colors.gray(),
    padding: 20,
    margin: 5,
    boxShadow: RetroUIBorder({ color: Colors.darkGray(), borderX: 5, borderY: 7.5 }),
    zIndex: 1,
    // overflow: "scroll"
  },
  titleContainer: {
    position: "absolute",
    height: 50,
    top: -50,
  },
  title: {
    margin: 0,
    background: `-webkit-linear-gradient(${Colors.orange()}, ${Colors.red()})`,
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    filter: 'drop-shadow(3px 3px 1px #333)'

  },
  thumbnailContainer: {
    backgroundColor: Colors.gray(),
    borderRadius: "100%",
    ...dimensionStyles({ width: 48, height: 48 }),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
    border: `1px solid ${Colors.darkGray()}`,
    // boxShadow: `0px 0px 5px ${Colors.darkGray()}`
  },
  winnerThumbnail: {
    ...dimensionStyles({ width: 30, height: 30 }),
  },
  winLogo: {
    margin: "0 auto",
    height: 70
  },
  userdirections: {
    position: "absolute",
    fontSize: 20,
    bottom: 20,
    right: 20
  },
  topic: {
    margin: 0,
    marginTop: -10,
    padding: 0,
    fontSize: 25,
    whiteSpace: "pre-wrap",
    textAlign: "left",
    lineHeight: 2,
    color: Colors.purple(),
    textShadow: `0px 0px 3px ${Colors.gray()}`
  },
  p1Text: {
    margin: 0,
    padding: 0,
    fontSize: 20,
    whiteSpace: "pre-wrap",
    textAlign: "left",
    lineHeight: 2,
    color: Colors.p1Blue(),
  },
  p2Text: {
    margin: 0,
    padding: 0,
    fontSize: 20,
    whiteSpace: "pre-wrap",
    textAlign: "left",
    lineHeight: 2,
    color: Colors.red()
  },
  p3Text: {
    margin: 0,
    paddingTop: 10,
    fontSize: 24,
    color: Colors.purple(),
    textShadow: `0px 0px 3px ${Colors.gray()}`
    // fontWeight: "bold",
    // background: `-webkit-linear-gradient(${Colors.orange()}, ${Colors.red()})`,
    // "-webkit-background-clip": "text",
    // "-webkit-text-fill-color": "transparent",
    // filter: 'drop-shadow(0px 0px 1px #333)'
  }
});

export default TextBox;


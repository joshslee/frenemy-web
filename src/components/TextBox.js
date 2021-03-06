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
    isBattleFinished,
    p1Character,
    gameData,
    p1Name,
    p2Name
  } = props;

  function renderSummaryText() {
    const didP1Win = gameData.success;

    return didP1Win 
      ? (
        <>
          <p className={css(styles.topic)}>{"THE BLOCKCHAIN HAS SPOKEN:"}</p>
          <p className={css(styles.p1Text)}>{`${p1Name} is the BIGGEST, BADDEST degen!!`}</p>
          <p className={css(styles.p2Text)}>{`${p2Name} is a lil paperhanded b!@#$`}</p>
          <p className={css(styles.winnerText)}>{"Player 1 Wins"} </p>
        </>
      ) : (
        <>
          <p className={css(styles.topic)}>{"THE BLOCKCHAIN HAS SPOKEN:"}</p>
          <p className={css(styles.p2Text)}>{`${p2Name} is the BIGGEST, BADDEST degen!!`}</p>
          <p className={css(styles.p1Text)}>{`${p1Name} is a lil paperhanded b!@#$`}</p>
          <p className={css(styles.winnerText)}>{"Player 2 Wins"} </p>
        </>
      )
  }

  return (
    <div className={css(styles.root)}>
      <Row justifyContent={"flex-start"} width={"100%"} style={styles.titleContainer}>
        <h4 className={css(styles.title)}>{title}</h4>
        {summary.map(roundWinner => (
          <div className={css(styles.thumbnailContainer, roundWinner.name === p1Character?.name ? styles.p1Thumbnail : styles.p2Thumbnail)}>
            <img src={roundWinner?.thumbnail} className={css(styles.winnerThumbnail)} draggable={false} />
          </div>
        ))}
      </Row>
      <Column justifyContent={"flex-start"} alignItems={'flex-start'} style={styles.container}>
        
        {isBattleFinished ? (
          renderSummaryText()
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
    </div>
  )
};

const styles = StyleSheet.create({
  root: {
    position: "relative", 
    height: "calc(100% - 630px)",
    width: "calc(100% - 10px)",
    boxSizing: "border-box",
  },
  container: {
    position: "relative",
    boxSizing: "border-box",
    width: "100%", 
    height: "100%",
    background: Colors.gray(),
    padding: 20,
    margin: 5,
    boxShadow: RetroUIBorder({ color: Colors.darkGray(), borderX: 5, borderY: 7.5 }),
    zIndex: 1,
    userSelect: "none",
    overflow: "scroll"
  },
  titleContainer: {
    position: "absolute",
    height: 50,
    top: -50,
    left: 20,
    zIndex: 2
  },
  title: {
    margin: 0,
    background: `-webkit-linear-gradient(${Colors.orange()}, ${Colors.red()})`,
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    filter: 'drop-shadow(3px 3px 1px #333)'

  },
  winnerText: {
    textTransform: "uppercase",
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
    border: `2px solid ${Colors.darkGray()}`,
    userSelect: "none"
  },
  winnerThumbnail: {
    ...dimensionStyles({ width: 30, height: 30 }),
  },
  p1Thumbnail: {
    backgroundColor: Colors.p1Blue()
  },
  p2Thumbnail: {
    backgroundColor: Colors.red()
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


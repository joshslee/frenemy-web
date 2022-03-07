// NPM
import React, { useState, useEffect, useMemo } from 'react'
import { StyleSheet, css } from 'aphrodite';
import { Colors } from "../utils/colors";
import { dimensionStyles, corneredBorderStyles } from "../utils/styles";

const CharacterCard = ({ 
  character, 
  selectedCharacterP1,
  selectedCharacterP2,
  onClick 
}) => {

  const { name, thumbnail, isLocked } = character;
  const isPlayerOne = selectedCharacterP1?.name === name;
  const isPlayerTwo = selectedCharacterP2?.name === name;
  const isActive = isPlayerOne || isPlayerTwo;

  function formatOverlayStyles() {
    const classNames = [styles.p1Overlay];
    
    if (isPlayerTwo) {
      classNames.push(styles.p2Overlay)
    }
    if (isActive) {
      classNames.push(styles.activePlayerOverlay)
    }
    return classNames;
  }; 

  function formatBorderOverlayStyles() {
    const classNames = [styles.overlay];

    if (isPlayerOne && isPlayerTwo) {
      classNames.push(styles.activeOverlayP1N2)
    } else if (isPlayerOne) {
      classNames.push(styles.activeOverlayP1);
    } else if (isPlayerTwo) {
      classNames.push(styles.activeOverlayP2)
    }

    return classNames;
  }

  function renderPlayerOverlay() {
    if (isPlayerOne && isPlayerTwo) {
      return (
        <>
          <div className={css(styles.p1Overlay, styles.activePlayerOverlay)}>
            {"P1"}
          </div>
          <div className={css(styles.p2BottomOverlay, styles.activePlayerOverlay)}>
            {"P2"}
          </div>
        </>
      )
    } 

    return (
      <div className={css(formatOverlayStyles()) + " player-overlay"}>
        {isPlayerTwo ? "P2" : "P1"}
      </div>
    )
  }


  return (
    <div className={css(styles.card, isLocked && styles.disabled)} onClick={() => onClick(character)}>
      <div className={css(formatBorderOverlayStyles()) + " card-overlay" + `${isActive && " glimmer"}`} />
      {renderPlayerOverlay()}
      <img src={thumbnail} className={css(styles.image) + " character-image"} />
    </div>
  )
};

const styles = StyleSheet.create({
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    border: `5px solid ${Colors.darkGray(0.3)}`,
    borderRadius: 3,
    margin: "20px 10px",
    boxSizing: "border-box",
    backgroundColor: "#FFF",
    ...dimensionStyles({ width: 135, height: 135}),
    ":hover .card-overlay": {
      ...corneredBorderStyles({ color: Colors.p1Blue()})
    },
    ":hover .player-overlay": {
      display: "block"
    },
    ":hover .character-image": {
      transform: "scale(1)",
      // transition: ""
    }
  },
  disabled: {
    background: Colors.darkGray(0.7),
    pointerEvents: "none",
    cursor: "disabled"
  },
  overlay: {
    position: "absolute",
    overflow: "hidden",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    zIndex: 1,
    ...dimensionStyles({ width: 125, height: 125}),
  },
  activeOverlayP1: {
    ...corneredBorderStyles({ color: Colors.p1Blue()})
  },
  activeOverlayP2: {
    ...corneredBorderStyles({ color: Colors.red()})
  },
  activeOverlayP1N2: {
    ...corneredBorderStyles({ color: Colors.purple()})

  },
  p1Overlay: {
    position: "absolute",
    top: -23,
    fontWeight: "bold",
    left: '50%',
    transform: 'translate(-50%, 0)',
    color: Colors.p1Blue(),
    zIndex: 1,
    display: "none"
  },
  p2BottomOverlay: {
    position: "absolute",
    bottom: -23,
    fontWeight: "bold",
    left: '50%',
    transform: 'translate(-50%, 0)',
    color: Colors.red(),
    zIndex: 1,
    display: "none"
  },
  p2Overlay: {
    color: Colors.red()
  },
  activePlayerOverlay: {
    display: "block"
  },
  image: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    overflow: "hidden",
    transform: "scale(0.85)",
    border: "none",
    ...dimensionStyles({ width: 125, height: 125}),
  },
  playerCursor: {
    position: "absolute",
    top: -20,
    left: 0,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    fontSize: 25
  }
});

export default CharacterCard;
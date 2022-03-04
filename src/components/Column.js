import React from "react";
import { StyleSheet, css } from "aphrodite";

const Column = ({ 
  justifyContent = "center",
  alignItems = "center",
  height = "100%",
  width = "100%",
  overrideStyles = {}, 
  children
}) => {

  const style = {
    justifyContent,
    alignItems,
    height,
    width,
    ...overrideStyles
  };

  return (
    <div className={css(styles.flexCol)} style={...style}>
      {children}
    </div>
  )

}

const styles = StyleSheet.create({
  flexCol: {
   display: "flex",
   flexDirection: "column"
  }
});

export default Column;
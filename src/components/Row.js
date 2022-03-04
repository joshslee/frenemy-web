import React from "react";
import { StyleSheet, css } from "aphrodite";

const Row = ({ 
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
    <div className={css(styles.row)} style={...style}>
      {children}
    </div>
  )

}

const styles = StyleSheet.create({
  row: {
   display: "flex",
  }
});

export default Row;
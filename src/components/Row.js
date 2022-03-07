import React from "react";
import { StyleSheet, css } from "aphrodite";

const Row = ({ 
  justifyContent = "center",
  alignItems = "center",
  width = "100%",
  overrideStyles = {},
  children,
  style
}) => {

  const flexStyles = {
    justifyContent,
    alignItems,
    width,
    ...overrideStyles
  };

  return (
    <div className={css(styles.row, style && style)} style={flexStyles} >
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
import { Colors } from "./colors";


export const getStyles = ({type, color, style}) => {
  switch(type) {
    case "h1":
      return HEADER_ONE_STYLES(color, style)
    case "h2":
    case "h3":
    case "p":
    default:
      return null;
  }
}
export const HEADER_ONE_STYLES = (color = Colors.blue(), style = {}) => ({
  fontSize: 24,
  color,
  stroke: color,
  strokeThickness: 1,
  boundsAlignH: "center", 
  boundsAlignV: "middle",
  ...style
})

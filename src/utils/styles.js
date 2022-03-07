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
  fontSize: 20,
  color,
  boundsAlignH: "center", 
  boundsAlignV: "middle",
  shadow: {
    color: Colors.lightCharcoal(),
    blur: 1,
    offsetX: 2,
    offsetY: 2,
    fill: true,
  },
  ...style
})

export const RetroUIBorder = (args = {}) => {
  const { color = Colors.darkGray(0.9), borderX = 10, borderY = 15} = args;
  return `0 ${borderY}px ${color}, 0 -${borderY}px ${color}, ${borderX}px 0 ${color}, -${borderX}px 0 ${color}`
}

export const dimensionStyles = ({ width = 0, height = 0 }) => ({
  width,
  minWidth: width,
  maxWidth: width,
  height,
  minHeight: height,
  maxHeight: height
})

export const corneredBorderStyles = (args = {}) => {
  const { color } = args;

  return {
    background:
      `linear-gradient(to right, ${color} 5px, transparent 5px) 0 0,
      linear-gradient(to right, ${color} 5px, transparent 5px) 0 100%,
      linear-gradient(to left, ${color} 5px, transparent 5px) 100% 0,
      linear-gradient(to left, ${color} 5px, transparent 5px) 100% 100%,
      linear-gradient(to bottom, ${color} 5px, transparent 5px) 0 0,
      linear-gradient(to bottom, ${color} 5px, transparent 5px) 100% 0,
      linear-gradient(to top, ${color} 5px, transparent 5px) 0 100%,
      linear-gradient(to top, ${color} 5px, transparent 5px) 100% 100%`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "20px 20px",
  }
}
// const color = (name: string, code) => `var(--${name}, ${code})`;
// const alias = () =>
import { Color, SemanticColor } from "./color";

const pallete = {
  white: new Color("white", `#ffffff`),
  darkGray: new Color("dark-gray", `#2a3439`),
  gray: new Color("gray", `#676e71`),
  lightGray: new Color("light-gray", `#e1e1e1`),
  red: new Color("red", `#a72145`),
  green: new Color("green", `#0b7261`),
  purple: new Color("purple", `#2e2459`),
  yellow: new Color("yellow", `#ffc832`),
  lightBlue: new Color("light-blue", `#4299bf`),
};

const semanticColors = {
  bodyBackground: new SemanticColor("body-background", pallete.white),
  borderColor: new SemanticColor("border-color", pallete.lightGray),
  linkColor: new SemanticColor("link-color", pallete.lightBlue),
  footerGray: new SemanticColor("footer-gray", pallete.darkGray),
};

const breakpoints = {
  medium: "30em",
  large: "60em",
};

const media = {
  notSmall: `screen and (min-width: ${breakpoints.medium})`,
  medium: `screen and (min-width: ${breakpoints.medium}) and (max-width: ${breakpoints.large})`,
  large: `screen and (min-width: ${breakpoints.large})`,
};

const spacings = {
  px: "1px",
  "0": "0",
  "1": "0.25rem",
  "2": "0.5rem",
  "3": "0.75rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "8": "2rem",
  "10": "2.5rem",
  "12": "3rem",
  "14": "3.5rem",
  "16": "4rem",
  "20": "5rem",
  "24": "6rem",
  "32": "8rem",
  "40": "10rem",
  "48": "12rem",
  "56": "14rem",
  "64": "16rem",
};

const borderRadiuses = {
  none: "0",
  sm: "0.125rem",
  default: "0.375rem",
  md: "0.75rem",
  lg: "1.5rem",
  full: "9999px",
};
const borderWidths = {
  default: "1px",
  "0": "0",
  "2": "2px",
  "4": "4px",
  "8": "8px",
};

const boxShadows = {
  xs: "0 0 0 1px rgba(0, 0, 0, 0.05)",
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  default: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl:
    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
  outline: "0 0 0 3px rgba(66, 153, 225, 0.5)",
  none: "none",
};

const _fontFamilies = {
  sans: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    '"Noto Sans"',
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Noto Color Emoji"',
  ],
  serif: ["Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
};

const fontFamilies = {
  hero: ["Alfa Slab One", ..._fontFamilies.serif],
  heading: ['"Fira Sans"', ..._fontFamilies.sans],
  content: ['"Fira Sans"', ..._fontFamilies.sans],
  codeBlocks: [
    "Menlo",
    "Monaco",
    "Consolas",
    '"Liberation Mono"',
    '"Courier New"',
    "monospace",
  ],
  mono: [
    "Menlo",
    "Monaco",
    "Consolas",
    '"Liberation Mono"',
    '"Courier New"',
    "monospace",
  ],
};

const fontSizes = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "4rem",
};

const fontWeights = {
  hairline: "100",
  thin: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900",
};

const letterSpacings = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
};

const lineHeights = {
  none: "1",
  tight: "1.25",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2",
  "3": ".75rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "7": "1.75rem",
  "8": "2rem",
  "9": "2.25rem",
  "10": "2.5rem",
};

export const DefaultTheme = {
  colorPallete: pallete,
  colors: semanticColors,
  breakpoint: breakpoints,
  media: media,
  spacing: spacings,
  borderRadius: borderRadiuses,
  borderWidth: borderWidths,
  boxShadow: boxShadows,
  fontFamily: fontFamilies,
  fontSize: fontSizes,
  fontWeight: fontWeights,
  letterSpacing: letterSpacings,
  lineHeight: lineHeights,
};

// we are using the tailwind theme as a starting point
export type Theme = typeof DefaultTheme;

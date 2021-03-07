import { css } from "../typed-styled-components";
import { DefaultTheme } from "../theme";

function createThemeVariables(type: "dark" | "light") {
  return ({ theme }: { theme: typeof DefaultTheme }) => {
    const variablesStr = Object.values(theme.colors)
      .map((color) => color.varDefinition(type))
      .join("");
    return variablesStr;
  };
}
function createColorPalleteVariables() {
  return ({ theme }: { theme: typeof DefaultTheme }) => {
    const variablesStr = Object.values(theme.colorPallete)
      .map((color) => color.varDefinition())
      .join("");
    return variablesStr;
  };
}

export const cssThemeColors = css`
  /* deafult light mode color */
  :root {
    ${createColorPalleteVariables()}
    ${createThemeVariables("light")}
  }
  @media (prefers-color-scheme: dark) {
    :root {
      ${createThemeVariables("dark")}
    }
  }
`;

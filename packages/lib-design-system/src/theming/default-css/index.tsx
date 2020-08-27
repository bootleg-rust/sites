import { Div } from "../../atoms";
import { styled, css, createGlobalStyle } from "../typed-styled-components";
import { cssResetStyle } from "./css-reset";
import { cssThemeColors } from "./colors";

export const defaultPageStyle = css`
  html,
  html > body,
  html > body > #root {
    flex: 1;
    height: 100%;
    margin: 0;
    overflow: hidden;

    font-family: ${({ theme }) => theme.fontFamily.content.join(", ")};
    background-color: ${({ theme }) => theme.colors.background.var};
    font-size: 1.5rem;
    line-height: 1.6;

    display: flex;
    flex-grow: 1;
    flex-direction: column;
  }

  html > body > #root {
    overflow: auto;
  }

  /* change font size depending on width */
  html {
    font-size: 62.5%;
  }

  @media ${({ theme }) => theme.media.notSmall} {
    html {
      font-size: 75%;
    }
  }
`;

export const GlobalCssResetStyle = createGlobalStyle`
${cssResetStyle}
`;
export const GlobalCssThemeColors = createGlobalStyle`
  ${cssThemeColors}
`;
export const GlobalDefaultPageStyle = createGlobalStyle`
  ${defaultPageStyle}
`;

export const CssResetStyle = styled(Div)`
  ${cssResetStyle}
`;
export const CssThemeColors = styled(Div)`
  ${cssThemeColors}
`;
export const DefaultPageStyle = styled(Div)`
  ${defaultPageStyle}
`;

import React from "react";
import { createGlobalStyle } from "../typed-styled-components";
import { TempPortedStyle } from "./rust-lang-org";
import { CssResetStyle } from "./css-reset";

export const ThemeDefaultPageStyle = createGlobalStyle`
  html,
  html > body,
  html > body > #root {
    display: flex;
    flex: 1;
    height: 100%;
    margin: 0;
    overflow: hidden;

    font-family: ${({ theme }) => theme.fontFamily.content.join(", ")};
    background-color: ${({ theme }) => theme.colors.bodyBackground};
    font-size: 1.5rem;
    line-height: 1.6;

    display: flex;
    flex-direction: column;
  }

  html > body > #root {
    overflow: auto;
  }

  /* change font size depending on width */
  html {
    font-size: 62.5%;
  }

  @media screen and (min-width: 30em) {
    html {
      font-size: 75%;
    }
  }

  p {
    margin-top: 0;
    margin-bottom: 2.5rem;
  }

  /* TODO: maybe move into <Ul /> and <Ol /> components? */
  ul {
    list-style: circle;
    padding-left: 1.5em;
  }

  ol {
    list-style: decimal;
    padding-left: 1.5em;
  }
`;

export function ThemeDefaultStyle() {
  return (
    <>
      <CssResetStyle />
      <ThemeDefaultPageStyle />
      <TempPortedStyle />
    </>
  );
}

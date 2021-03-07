import { css } from "../typed-styled-components";

// TODO: don't use these here
const gray = `#2a3439`;
const lightGray = `#e1e1e1`;
const red = `#a72145`;
const green = `#0b7261`;
const purple = `#2e2459`;
const yellow = `#ffc832`;

/* stylelint-disable */

export const TempPortedStyle = css`
  /* --- CODE */
  code {
    line-height: 1.6;
    padding: 0.2rem 0.5rem;
    margin: 0 0.2rem;
    font-size: 90%;
    white-space: nowrap;
    border: 1px solid ${lightGray};
    border-radius: 4px;
    overflow: auto;
  }

  pre > code {
    display: block;
    white-space: pre;
  }

  code.code-header {
    background-color: rgba(127, 127, 127, 0.25);
    font-size: 2rem;
    display: inline-block;
    margin: 0 0 3px 0;
  }
  /* --- NAV */
  .nav a {
    color: ${gray};
  }

  /* --- FERRIS */
  #ferris img {
    display: block;
    margin: 0 auto;
  }

  #ferris-error {
    width: 80%;
  }

  /* --- SECTIONS */

  section header {
    padding: {
      top: 10px;
      bottom: 30px;
    }
    h2 {
      font-size: 3rem;
      font-weight: 800;
    }
  }

  section {
    padding: 30px 0 60px 0;

    header {
      padding: 30px 0 60px 0;
      display: inline-block;

      h2 {
        margin: 0;
        padding: 0;
        letter-spacing: 1px;
        font-size: 4.2rem;
        line-height: 1.25;
      }
    }

    h2 {
      font-family: ${({ theme }) => theme.fontFamily.heading.join(", ")};
      font-weight: 800;
    }

    h3 {
      font-weight: 600;
      line-height: 1.3;
    }

    p {
      margin-top: 0;
      margin-bottom: 30px;
    }
  }

  section .container {
    padding-top: 20px;
  }

  /* --- SECTION COLORS */
  .red {
    background-color: ${red};
    color: white;
    .highlight {
      background-color: ${purple};
    }
    a {
      color: white;
      text-decoration: underline;
    }
    .button.button-secondary {
      background-color: ${purple};
      border-color: ${purple};
      color: white;
      text-decoration: none;
      &:hover,
      &:focus {
        border-color: white;
      }
    }
  }

  .green {
    background-color: ${green};
    color: white;
    .highlight {
      background-color: ${purple};
    }
    a {
      color: white;
      text-decoration: underline;
    }
    .button.button-secondary {
      background-color: ${purple};
      border-color: ${purple};
      color: white;
      text-decoration: none;
      &:hover,
      &:focus {
        border-color: white;
      }
    }
  }

  .white {
    color: black;
    .highlight {
      background-color: ${yellow};
    }
    a {
      color: ${gray};
      text-decoration: underline;
    }
    .button.button-secondary {
      background-color: ${yellow};
      border-color: ${yellow};
      color: ${gray};
      text-decoration: none;
      &:hover,
      &:focus {
        border-color: ${gray};
      }
    }
  }

  .purple {
    background-color: ${purple};
    color: white;
    .highlight {
      background-color: ${red};
    }
    a {
      color: white;
      text-decoration: underline;
    }
    .button.button-secondary {
      background-color: ${red};
      border-color: ${red};
      color: white;
      text-decoration: none;
      &:hover,
      &:focus {
        border-color: white;
      }
    }
  }

  /* --- HEADERS & SMALLER ON SMALLER SCREENS */

  header h1 {
    font-family: ${({ theme }) => theme.fontFamily.hero.join(", ")};
    font-size: 8rem;
    margin-bottom: 0;
    margin-top: 0;
    line-height: 1.2;
    font-weight: 300;
    letter-spacing: 1px;
  }

  header h2 {
    font-size: 4.2rem;
    line-height: 1.25;
    font-weight: 300;
  }

  /* Temporary HACK: switch away from this when we switch to using Tachyons for
  the page titles -- at that time, we should make a simple component class that
  just composes those classes.
  This hard-coded value for the break-point matches what is in Skeleton. */
  @media screen and (max-width: 550px) {
    header {
      h1 {
        font-size: 4rem;
      }

      h2.subtitle {
        font-size: 2.5rem;
        line-height: 1.1;
      }

      .button.button-primary.button-download {
        padding: 5px;
        font-size: 1.5em;
        margin-top: 20px;
      }
    }
  }

  /* --- HEADER & SECTIONS */

  header h1,
  section h2 {
    z-index: 999999;
    position: relative;
    letter-spacing: 1px;
    font-weight: 300;
  }

  section h3 {
    margin-top: 0;
    line-height: 1.3;
  }

  section p {
    line-height: 1.6;
  }

  /* --- FOOTER */
  footer {
    padding: 30px 0;
    background-color: ${({ theme }) => theme.colors.invertedBackground.var};
    color: white;

    p {
      margin: 0;
    }

    ul {
      margin-top: 0;
    }

    li {
      margin-bottom: 1rem;
    }

    a {
      color: ${yellow};
      text-decoration: none;

      &:hover {
        color: ${yellow};
        text-decoration: underline;
      }
    }
  }

  footer h4 {
    font-size: 1.2em;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 2rem;
  }

  footer img {
    width: 40px;
    padding: 0 10px;
  }

  footer .attribution {
    text-align: center;
    padding-top: 30px;
  }

  footer .languages {
    color: ${gray};
  }
  /* --- BLOCKQUOTE */

  blockquote {
    font-size: 1.5em;
    line-height: 1.2em;
    position: relative;
    border-bottom: 1px dotted ${gray};
    padding: 5px;
    color: ${gray};
  }

  blockquote::before {
    content: "“";
    color: ${gray};
    font-size: 3em;
    position: absolute;
    left: -50px;
    top: 20px;
  }
`;

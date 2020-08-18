import { styled } from "../theming/typed-styled-components";
import { DefaultFlex, DefaultBlock } from "./_shared";

// TODO: these styles were taken from rust-lang.org
// --- Highlight

// .highlight {
//   height: 12px;
//   position: relative;
//   top: 0;
//   left: -10px;
//   width: 120%;
//   max-width: 90vw;
//   line-height: 1.6;
//   border-radius: 2px;
// }

// @media screen and (max-width: 769px) {
//   .highlight {
//     border-bottom-left-radius: 0;
//     border-top-left-radius: 0;
//   }
// }

// --- Subtitle??

// h2.subtitle {
//   margin: 0;
//   font-family: $body-font;
//   font-size: 3rem;
//   font-weight: 600;
//   color: $gray;
// }

// MDN content section elements docs https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Content_sectioning

export const Main = DefaultFlex("main");
export const Nav = DefaultFlex("nav");
export const Section = DefaultFlex("section");
export const Article = DefaultFlex("address");
export const Aside = DefaultFlex("aside");
export const H1 = styled(DefaultFlex("h1"))`
  line-height: 1.2;
  font-family: ${({ theme }) => theme.fontFamily.hero.join(",")};
  font-size: ${({ theme }) => theme.fontSize["6xl"]};
  @media ${({ theme }) => theme.media.notSmall} {
    font-size: 8rem;
  }
`;
export const H2 = styled(DefaultFlex("h2"))`
  font-family: ${({ theme }) => theme.fontFamily.heading.join(",")};
`;
export const H3 = styled(DefaultFlex("h3"))`
  font-family: ${({ theme }) => theme.fontFamily.heading.join(",")};
`;
export const H4 = styled(DefaultFlex("h4"))`
  font-family: ${({ theme }) => theme.fontFamily.heading.join(",")};
`;
export const H5 = styled(DefaultFlex("h5"))`
  font-family: ${({ theme }) => theme.fontFamily.heading.join(",")};
`;
export const H6 = styled(DefaultFlex("h6"))`
  font-family: ${({ theme }) => theme.fontFamily.heading.join(",")};
`;
export const HeadingGroup = DefaultFlex("hgroup");
export const Header = DefaultFlex("header");
export const Footer = DefaultFlex("footer");

export const Address = DefaultBlock("address");

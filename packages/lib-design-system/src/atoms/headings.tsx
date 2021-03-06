import { flx } from "@pseudo-su/flex-elements";
import { styled } from "../theming/typed-styled-components";

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

export const H1 = styled(flx.h1)`
  font-family: ${({ theme }) => theme.fontFamily.heading.join(",")};
`;
export const H2 = styled(flx.h2)`
  font-family: ${({ theme }) => theme.fontFamily.heading.join(",")};
`;
export const H3 = styled(flx.h3)`
  font-family: ${({ theme }) => theme.fontFamily.heading.join(",")};
`;
export const H4 = styled(flx.h4)`
  font-family: ${({ theme }) => theme.fontFamily.heading.join(",")};
`;
export const H5 = styled(flx.h5)`
  font-family: ${({ theme }) => theme.fontFamily.heading.join(",")};
`;
export const H6 = styled(flx.h6)`
  font-family: ${({ theme }) => theme.fontFamily.heading.join(",")};
`;

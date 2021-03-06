import { styled } from "../theming/typed-styled-components";
import { flx } from "@pseudo-su/flex-elements";

export const HeroHeading = styled(flx.h1)`
  line-height: 1.2;
  font-family: ${({ theme }) => theme.fontFamily.hero.join(",")};
  font-size: ${({ theme }) => theme.fontSize["6xl"]};
  @media ${({ theme }) => theme.media.notSmall} {
    font-size: 8rem;
  }
`;

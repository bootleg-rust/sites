import { styled } from "../theming/typed-styled-components";
import { H1 } from "../atoms";

export const HeroHeading = styled(H1)`
  line-height: 1.2;
  font-family: ${({ theme }) => theme.fontFamily.hero.join(",")};
  font-size: ${({ theme }) => theme.fontSize["6xl"]};
  @media ${({ theme }) => theme.media.notSmall} {
    font-size: 8rem;
  }
`;

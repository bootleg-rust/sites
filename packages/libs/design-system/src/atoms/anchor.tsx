import { flx } from "@pseudo-su/flex-elements";
import { styled } from "../theming/typed-styled-components";
// MDN inline text elements https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Inline_text_semantics

export const Anchor = styled(flx.a)`
  color: ${({ theme }) => theme.colors.link.var};
  text-decoration: underline;
`;

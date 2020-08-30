import { styled } from "../theming/typed-styled-components";
import { DefaultInline } from "./_shared";
// MDN inline text elements https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Inline_text_semantics

export const Anchor = styled(DefaultInline("a"))`
  color: ${({ theme }) => theme.colors.link.var};
  text-decoration: underline;
`;
export const Abbreviation = DefaultInline("abbr");
export const BringAttentionTo = DefaultInline("b");
export const Citation = DefaultInline("cite");
export const Code = DefaultInline("code");
export const Definition = DefaultInline("dfn");
export const Emphasis = DefaultInline("em");
export const IdiomaticText = DefaultInline("i");
export const KeyboardInput = DefaultInline("kbd");
export const MarkText = DefaultInline("mark");
export const InlineQuotation = DefaultInline("q");
export const StrikeThrough = DefaultInline("s");
export const SampleOutput = DefaultInline("samp");
export const Small = DefaultInline("small");
export const Span = DefaultInline("span");
export const Strong = DefaultInline("strong");
export const Sub = DefaultInline("sub");
export const Sup = DefaultInline("sup");
export const Time = DefaultInline("time");
export const UnarticulatedAnnotation = DefaultInline("u");
export const Variable = DefaultInline("var");
export const DeletedText = DefaultInline("del");
export const InsertedText = DefaultInline("ins");

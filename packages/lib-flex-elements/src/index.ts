import styled from "styled-components";
import { DefaultFlex, DefaultBlock, DefaultInline } from "./_shared";

// TODO: add default paragraph config to design system
// margin-top: 0;
// margin-bottom: 2.5rem;

// TODO: default link style to design system
// color: ${({ theme }) => theme.colors.link.var};
// text-decoration: underline;

export const flx = {
  // MDN content section elements docs https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Content_sectioning
  // Flex
  main: DefaultFlex("main"),
  nav: DefaultFlex("nav"),
  section: DefaultFlex("section"),
  article: DefaultFlex("article"),
  aside: DefaultFlex("aside"),
  h1: DefaultFlex("h1"),
  h2: DefaultFlex("h2"),
  h3: DefaultFlex("h3"),
  h4: DefaultFlex("h4"),
  h5: DefaultFlex("h5"),
  h6: DefaultFlex("h6"),
  hgroup: DefaultFlex("hgroup"),
  header: DefaultFlex("header"),
  footer: DefaultFlex("footer"),
  address: DefaultBlock("address"),

  // MDN form elements docs https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Forms
  // select/option
  datalist: DefaultBlock("datalist"),
  option: DefaultBlock("option"),
  optgroup: DefaultBlock("optgroup"),
  select: DefaultBlock("select"),
  // Form elements
  button: DefaultBlock("button"),
  fieldset: DefaultFlex("fieldset"),
  form: DefaultFlex("form"),
  input: DefaultBlock("input"),
  label: DefaultBlock("label"),
  legend: DefaultBlock("legend"),
  meter: DefaultBlock("meter"),
  output: DefaultBlock("output"),
  progress: DefaultBlock("progress"),
  textarea: DefaultBlock("textarea"),

  // MDN table content docs https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Table_content
  caption: styled.caption``,
  col: styled.col``,
  colgroup: styled.colgroup``,
  table: styled.table``,
  tbody: styled.tbody``,
  td: styled.td``,
  tfoot: styled.tfoot``,
  th: styled.th``,
  thead: styled.thead``,
  tr: styled.tr``,

  // MDN text content elements https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Text_content
  ol: DefaultFlex("ol"),
  ul: DefaultFlex("ul"),
  dl: DefaultFlex("dl"),
  dd: DefaultFlex("dd"),
  dt: DefaultFlex("dt"),
  li: DefaultFlex("li"),
  figure: DefaultFlex("figure"),
  figcaption: DefaultBlock("figcaption"),

  blockquote: DefaultBlock("blockquote"),
  div: DefaultFlex("div"),
  hr: styled.hr``,

  p: DefaultBlock("p"),
  pre: DefaultBlock("pre"),

  // MDN inline text elements https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Inline_text_semantics
  a: DefaultInline("a"),
  abbr: DefaultInline("abbr"),
  b: DefaultInline("b"),
  cite: DefaultInline("cite"),
  code: DefaultInline("code"),
  dfn: DefaultInline("dfn"),
  em: DefaultInline("em"),
  i: DefaultInline("i"),
  kbd: DefaultInline("kbd"),
  mark: DefaultInline("mark"),
  q: DefaultInline("q"),
  s: DefaultInline("s"),
  samp: DefaultInline("samp"),
  small: DefaultInline("small"),
  span: DefaultInline("span"),
  strong: DefaultInline("strong"),
  sub: DefaultInline("sub"),
  sup: DefaultInline("sup"),
  time: DefaultInline("time"),
  u: DefaultInline("u"),
  var: DefaultInline("var"),
  del: DefaultInline("del"),
  ins: DefaultInline("ins"),
};

// eslint-disable-next-line import/no-default-export
export default flx;

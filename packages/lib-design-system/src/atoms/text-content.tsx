/* eslint-disable react/forbid-elements */
import { styled } from "../theming/typed-styled-components";
import { DefaultFlex, DefaultBlock } from "./_shared";

// TODO: should these be an option for the <List /> components?
// ul {
//   list-style: circle;
//   padding-left: 1.5em;
// }

// ol {
//   list-style: decimal;
//   padding-left: 1.5em;
// }

const ListItem = DefaultFlex("li");
const _OrderedList = DefaultFlex("ol");
const OrderedList = _OrderedList as typeof _OrderedList & {
  Item: typeof ListItem;
};
OrderedList.Item = ListItem;
const _UnorderedList = DefaultFlex("ul");
const UnorderedList = _UnorderedList as typeof _OrderedList & {
  Item: typeof ListItem;
};
UnorderedList.Item = ListItem;

const _DefinitionList = DefaultFlex("dl");
const _Term = DefaultFlex("li");
const _Definition = DefaultFlex("li");
const DefinitionList = _DefinitionList as typeof _DefinitionList & {
  Term: typeof _Term;
  Definition: typeof _Definition;
};
DefinitionList.Term = _Term;
DefinitionList.Definition = _Definition;

const _Figure = DefaultFlex("figure");
const _FigureCaption = DefaultBlock("figcaption");
const Figure = _Figure as typeof _Figure & {
  Caption: typeof _FigureCaption;
};
Figure.Caption = _FigureCaption;

// MDN text content elements https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Text_content

export const Blockquote = DefaultBlock("blockquote");
export { DefinitionList };
export const Div = DefaultFlex("div");
export { Figure };
export const HorizontalRule = styled.hr``;
export { OrderedList, UnorderedList, ListItem };
export const Paragraph = styled(DefaultBlock("p"))`
  margin-top: 0;
  margin-bottom: 2.5rem;
`;
export const Preformatted = DefaultBlock("pre");

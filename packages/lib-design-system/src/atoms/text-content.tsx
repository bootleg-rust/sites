/* eslint-disable react/forbid-elements */
import { flx } from "@pseudo-su/flex-elements";
import { styled } from "../theming/typed-styled-components";

// TODO: should these be an option for the <List /> components?
// ul {
//   list-style: circle;
//   padding-left: 1.5em;
// }

// ol {
//   list-style: decimal;
//   padding-left: 1.5em;
// }

export const Paragraph = styled(flx.p)`
  margin-top: 0;
  margin-bottom: 2.5rem;
`;

const ListItem = styled(flx.li)``;

// -- ordered list
const _OrderedList = styled(flx.ol)``;
const OrderedList = _OrderedList as typeof _OrderedList & {
  Item: typeof ListItem;
};
OrderedList.Item = ListItem;

// -- unordered list
const _UnorderedList = styled(flx.ul)``;
const UnorderedList = _UnorderedList as typeof _UnorderedList & {
  Item: typeof ListItem;
};
UnorderedList.Item = ListItem;

// -- definition list
const _DefinitionList = styled(flx.dl)``;
const _Term = styled(flx.dt)``;
const _Definition = styled(flx.dd)``;
const DefinitionList = _DefinitionList as typeof _DefinitionList & {
  Term: typeof _Term;
  Definition: typeof _Definition;
};
DefinitionList.Term = _Term;
DefinitionList.Definition = _Definition;

// -- figure & caption
const _Figure = styled(flx.figure)``;
const _FigureCaption = styled(flx.figcaption)``;
const Figure = _Figure as typeof _Figure & {
  Caption: typeof _FigureCaption;
};
Figure.Caption = _FigureCaption;

// MDN text content elements https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Text_content
export { DefinitionList };
export { Figure };
export { OrderedList, UnorderedList, ListItem };

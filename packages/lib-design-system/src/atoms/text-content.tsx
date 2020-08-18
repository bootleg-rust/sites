/* eslint-disable react/forbid-elements */
import React from "react";
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

const List_ = DefaultFlex("div");
const Item = DefaultFlex("li");

type ListOrderRequired =
  | {
      ordered: true;
      unordered?: boolean;
    }
  | {
      ordered?: boolean;
      unordered: true;
    };

function List({
  ordered,
  unordered,
  ...props
}: React.ComponentProps<typeof List_> & ListOrderRequired) {
  if (!(ordered || unordered) && process.env.NODE_ENV === "development") {
    throw new Error(
      "<List> component required `ordered` or `unordered` flag. ",
    );
  }
  const as = ordered ? "ol" : "ul";
  return <List_ as={as} {...props} />;
}

List.Item = Item;

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
// TODO: need to do something like this for all elements if they have args
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Div = DefaultFlex("div");
export { Figure };
export const HorizontalRule = styled.hr``;
export { List };
export const Paragraph = styled(DefaultBlock("p"))`
  margin-top: 0;
  margin-bottom: 2.5rem;
`;
export const Preformatted = DefaultBlock("pre");

import React from "react";
import { styled } from "../theming";

type BlockFlex = {
  block: boolean;
  flex: boolean;
};

const flexOrBlockOrInline = ({ block, flex }: BlockFlex) => {
  if (flex) return "flex";
  if (block) return "block";
  return "inline";
};

export const Blockquote = styled.blockquote``;
export const Code = styled.code``;
export const Anchor = styled.a<BlockFlex>`
  display: ${flexOrBlockOrInline};
`;
export const Text = styled.span<BlockFlex>`
  display: ${flexOrBlockOrInline};
`;

const List_ = styled.div``;
const Item = styled.li``;

export function List({
  ref,
  children,
}: {
  ref: any;
  children: React.ReactNode;
}) {
  return <List_ ref={ref}>{children}</List_>;
}

List.Item = Item;

export const Paragraph = styled.p``;

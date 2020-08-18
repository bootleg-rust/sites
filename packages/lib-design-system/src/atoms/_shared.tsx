import React from "react";
import { styled, css } from "../theming/typed-styled-components";

type FlexJustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around";

type FlexAlignContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "stretch";

type FlexAlignItems =
  | "flex-start"
  | "flex-end"
  | "center"
  | "baseline"
  | "stretch";

type FlexAlignSelf =
  | "auto"
  | "flex-start"
  | "flex-end"
  | "center"
  | "baseline"
  | "stretch";

type FlexOptions = {
  basis?: string;
  gap?: string;
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
  grow?: number | true;
  shrink?: number | true;

  justify?: FlexJustifyContent;
  alignContent?: FlexAlignContent;
  alignItems?: FlexAlignItems;
  alignSelf?: FlexAlignSelf;

  wrap?: boolean;
  wrapReverse?: boolean;
};

type BlockFlag = {
  block?: boolean;
};

type FlexFlag = {
  flex?: boolean;
};

type HiddenFlag = {
  hidden?: boolean;
};

function setFlexOptions({
  basis,
  gap,
  direction,
  grow,
  shrink,
  wrap,
  wrapReverse,
  justify,
  alignContent,
  alignItems,
  alignSelf,
}: FlexOptions & Partial<BlockFlag> & Partial<FlexFlag>) {
  // prettier-ignore
  {
    // Basis
    const _gap = (gap) ? css`gap: ${gap};` : "";
    const _basis = (basis) ? css`flex-basis: ${basis};` : "";
    // Direction
    const _direction = css`flex-direction: ${direction || "column"};`;
    // Number values
    const _grow = (grow === true) ? css`flex-grow: 1;` : css`flex-grow: ${grow || 0};`
    const _shrink = (shrink === true) ? css`flex-shrink: 1;` : css`flex-shrink: ${shrink || 0};`;

    const _justify = (justify) ? css`justify-content: ${justify};` : "";
    const _alignContent = (alignContent) ? css`align-content: ${alignContent};` : "";
    const _alignItems = (alignItems) ? css`align-items: ${alignItems};` : "";
    const _alignSelf = (alignSelf) ? css`align-self: ${alignSelf};` : "";

    // Wrap
    let _wrap = null;
    if (wrap) _wrap = css`flex-wrap: wrap;`;
    if (!wrap && wrapReverse) _wrap = css`flex-wrap: wrap-reverse;`;

    return css`
      display: flex;
      ${_justify}
      ${_alignContent}
      ${_alignItems}
      ${_alignSelf}
      ${_gap}
      ${_basis}
      ${_direction}
      ${_grow}
      ${_shrink}
      ${_wrap || ""}
    `;
  }
}

function setHiddenCss({ hidden }: HiddenFlag) {
  if (hidden) {
    return css`
      border: 0;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    `;
  }
  return ``;
}

function setDisplayDefaults(displayDefault: "inline" | "block" | "flex") {
  return ({
    block,
    flex,
    hidden,
    basis,
    gap,
    direction,
    grow,
    shrink,
    wrap,
    wrapReverse,
    justify,
    alignContent,
    alignItems,
    alignSelf,
  }: FlexOptions &
    Partial<BlockFlag> &
    Partial<FlexFlag> &
    Partial<HiddenFlag>) => {
    const displayArg = block ? "block" : "flex";
    const display = !block && !flex ? displayDefault : displayArg;
    if (display === "block") {
      return css`
        display: block;
        ${setHiddenCss({ hidden })}
      `;
    }
    if (display === "inline") {
      return css`
        display: inline;
        ${setHiddenCss({ hidden })}
      `;
    }
    return css`
      ${setFlexOptions({
        basis,
        gap,
        direction,
        grow,
        shrink,
        wrap,
        wrapReverse,
        justify,
        alignContent,
        alignItems,
        alignSelf,
      })}
      ${setHiddenCss({ hidden })}
    `;
  };
}

// TODO: Types for these that allow infering the element are needed

export type DefaultToFlexOptions = BlockFlag & FlexOptions & HiddenFlag;
export type DefaultToBlockOptions = FlexFlag & FlexOptions & HiddenFlag;
export type DefaultToInlineOptions = FlexFlag &
  BlockFlag &
  FlexOptions &
  HiddenFlag;

export const defaultToInline = setDisplayDefaults("inline");
export const defaultToFlex = setDisplayDefaults("flex");
export const defaultToBlock = setDisplayDefaults("block");

// TODO: consolidate these into one

export function DefaultFlex(element: string) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  return styled(
    ({
      flex,
      block,
      hidden,

      basis,
      gap,
      direction,
      grow,
      shrink,
      wrap,
      wrapReverse,
      justify,
      alignContent,
      alignItems,
      alignSelf,

      ...rest
    }): React.ReactElement<string> => React.createElement(element, rest),
  )<DefaultToFlexOptions>`
    ${defaultToFlex}
  `;
  /* eslint-enable no-unused-vars */
}

export function DefaultBlock(element: string) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  return styled(
    ({
      flex,
      block,
      hidden,

      basis,
      gap,
      direction,
      grow,
      shrink,
      wrap,
      wrapReverse,
      justify,
      alignContent,
      alignItems,
      alignSelf,

      ...rest
    }): React.ReactElement => React.createElement(element, rest),
  )<DefaultToBlockOptions>`
    ${defaultToBlock}
  `;
  /* eslint-enable no-unused-vars */
}

export function DefaultInline(element: string) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  return styled(
    ({
      flex,
      block,
      hidden,

      basis,
      gap,
      direction,
      grow,
      shrink,
      wrap,
      wrapReverse,
      justify,
      alignContent,
      alignItems,
      alignSelf,

      ...rest
    }): React.ReactElement => React.createElement(element, rest),
  )<DefaultToInlineOptions>`
    ${defaultToInline}
  `;
  /* eslint-enable no-unused-vars */
}

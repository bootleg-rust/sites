import React, { useMemo } from "react";
import cheerio from "cheerio";
import {
  FluentConfigProvider,
  FluentConfigProviderProps,
} from "@ssr-kit/toolbox";

// TODO: WTF

// function parseMarkup(str: string): Array<Node> {
//   const dom = new JSDOM(str);
//   const childNodes = dom.window.document.body.childNodes;
//   console.log(str);
//   console.log(childNodes);
//   return [...childNodes];
// }

function parseMarkup(str: string): Array<Node> {
  const doc = cheerio.load(str);
  // const childNodes = documents[0].childNodes;
  // TODO: fix
  let nodes: any[] = [];
  const body = doc.root().each((el) => {
    console.log("EL", el);
  });
  console.log("ROOT attr", body.attr("nodeName"));
  console.log("ROOT textContent", body.attr("textContent"));
  // for (const doc of root.root.name) {
  //   nodes = [...nodes, ...(doc.children || [])];
  // }

  return [];
}

export function FluentServerConfigProvider({
  children,
  staticRef,
}: FluentConfigProviderProps) {
  return (
    <FluentConfigProvider staticRef={staticRef} parseMarkup={parseMarkup}>
      {children}
    </FluentConfigProvider>
  );
}

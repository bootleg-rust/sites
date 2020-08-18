import React from "react";
import {
  Div,
  H1,
  Anchor,
  Paragraph,
  List,
} from "@bootleg-rust/lib-design-system";
import atomicDesignProcess from "./atomic-design-process.png";

// eslint-disable-next-line import/no-default-export
export default {
  title: "Summary",
};

export function AtomicDesign() {
  return (
    <Div>
      <H1>
        Atomic design (
        <Anchor href="https://atomicdesign.bradfrost.com/chapter-2/#the-atomic-design-methodology">
          https://atomicdesign.bradfrost.com/chapter-2/#the-atomic-design-methodology
        </Anchor>
        )
        <Anchor href="https://atomicdesign.bradfrost.com/chapter-2/#the-atomic-design-methodology">
          https://atomicdesign.bradfrost.com/chapter-2/#the-atomic-design-methodology
        </Anchor>
        https://bradfrost.com/blog/post/atomic-web-design/
      </H1>
      <Paragraph>
        Atomic design is a methodology composed of five distinct stages working
        together to create interface design systems in a more deliberate and
        hierarchical manner.
      </Paragraph>
      <br />
      <Paragraph>The five stages of atomic design are:</Paragraph>
      <br />
      <List unordered>
        <List.Item>Atoms</List.Item>
        <List.Item>Molecules</List.Item>
        <List.Item>Organisms</List.Item>
        <List.Item>Templates</List.Item>
        <List.Item>Pages</List.Item>
      </List>
      <br />

      <img
        src={atomicDesignProcess}
        alt="atomic design process including atoms, molecules, organisms, templates and pages"
      />
    </Div>
  );
}

AtomicDesign.story = {
  name: "Atomic design",
};

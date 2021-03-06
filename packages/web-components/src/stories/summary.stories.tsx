import React from "react";
import {
  Paragraph,
  UnorderedList,
  ListItem,
} from "@bootleg-rust/lib-design-system";
import { flx } from "@pseudo-su/flex-elements";
import { StorybookWrapper } from "./shared";
import atomicDesignProcess from "./atomic-design-process.png";

// eslint-disable-next-line import/no-default-export
export default {
  title: "Summary",
};

export function AtomicDesign() {
  return (
    <StorybookWrapper>
      <flx.div>
        <flx.h1>
          Atomic design (
          <flx.a href="https://atomicdesign.bradfrost.com/chapter-2/#the-atomic-design-methodology">
            https://atomicdesign.bradfrost.com/chapter-2/#the-atomic-design-methodology
          </flx.a>
          )
          <flx.a href="https://atomicdesign.bradfrost.com/chapter-2/#the-atomic-design-methodology">
            https://atomicdesign.bradfrost.com/chapter-2/#the-atomic-design-methodology
          </flx.a>
          https://bradfrost.com/blog/post/atomic-web-design/
        </flx.h1>
        <Paragraph>
          Atomic design is a methodology composed of five distinct stages
          working together to create interface design systems in a more
          deliberate and hierarchical manner.
        </Paragraph>
        <br />
        <Paragraph>The five stages of atomic design are:</Paragraph>
        <br />
        <UnorderedList>
          <ListItem>Atoms</ListItem>
          <ListItem>Molecules</ListItem>
          <ListItem>Organisms</ListItem>
          <ListItem>Templates</ListItem>
          <ListItem>Pages</ListItem>
        </UnorderedList>
        <br />

        <img
          src={atomicDesignProcess}
          alt="atomic design process including atoms, molecules, organisms, templates and pages"
        />
      </flx.div>
    </StorybookWrapper>
  );
}

AtomicDesign.story = {
  name: "Atomic design",
};

import React from "react";
import atomicDesignProcess from "./atomic-design-process.png";

export default {
  title: "Summary",
};

export function AtomicDesign() {
  return (
    <div>
      <h1>
        Atomic design (
        <a href="https://atomicdesign.bradfrost.com/chapter-2/#the-atomic-design-methodology">
          https://atomicdesign.bradfrost.com/chapter-2/#the-atomic-design-methodology
        </a>
        )
      </h1>
      <p>
        Atomic design is a methodology composed of five distinct stages working
        together to create interface design systems in a more deliberate and
        hierarchical manner.
      </p>
      <br />
      <p>The five stages of atomic design are:</p>
      <br />
      <ul>
        <li>Atoms</li>
        <li>Molecules</li>
        <li>Organisms</li>
        <li>Templates</li>
        <li>Pages</li>
      </ul>
      <br />

      <img
        src={atomicDesignProcess}
        alt="atomic design process including atoms, molecules, organisms, templates and pages"
      />
    </div>
  );
}

AtomicDesign.story = {
  name: "Atomic design",
};

import React from "react";
import { StorybookWrapper } from "./shared";

// eslint-disable-next-line import/no-default-export
export default {
  title: "Test",
};

export function TestStory() {
  return <StorybookWrapper>Hello World</StorybookWrapper>;
}

TestStory.story = {
  name: "Test story",
};

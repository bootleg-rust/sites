import React from "react";
import { StorybookWrapper } from "./shared";

export default {
  title: "Test",
};

export function TestStory() {
  return <StorybookWrapper>Hello World</StorybookWrapper>;
}

TestStory.story = {
  name: "Test story",
};

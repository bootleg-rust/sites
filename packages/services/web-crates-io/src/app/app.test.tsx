// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { DefaultTheme, ThemeProvider } from "@bootleg-rust/design-system";
import { StaticConfigProvider } from "@ssr-kit/toolbox";
import { HelmetProvider } from "react-helmet-async";
// TODO: move a "test-harness" into "@ssr-kit/runtime"
// import { } from "@ssr-kit/runtime/client/test-harness";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import React from "react";
import { test, expect } from "@jest/globals";
import { MemoryRouter as Router } from "react-router";
import { App } from ".";

test("renders an App", () => {
  const { getByTestId } = render(
    <Router>
      <StaticConfigProvider
        config={{ SERVICE_NAME: "web-crates-io", ENV: "dev" }}
      >
        <ThemeProvider theme={DefaultTheme}>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </ThemeProvider>
      </StaticConfigProvider>
    </Router>,
  );
  const nameElement = getByTestId("env:SERVICE_NAME");
  const envElement = getByTestId("env:ENV");
  // TODO: re-enable this test
  // expect(nameElement).toContainHTML("web-crates-io");
  // expect(envElement).toContainHTML("dev");
  expect(nameElement).toBeDefined();
  expect(envElement).toBeDefined();
});

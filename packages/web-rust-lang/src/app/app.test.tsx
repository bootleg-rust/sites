// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { DefaultTheme, ThemeProvider } from "@bootleg-rust/lib-design-system";
import { StaticConfigProvider } from "@bootleg-rust/lib-ssr-toolbox";
import { HelmetProvider } from "react-helmet-async";
// TODO: move a "test-harness" into "@bootleg-rust/lib-ssr-runtime"
// import { } from "@bootleg-rust/lib-ssr-runtime/client/test-harness";
import { test, expect } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";

import { render } from "@testing-library/react";
import React from "react";
import { MemoryRouter as Router } from "react-router";
import { App } from ".";

test("renders an App", () => {
  const { getByTestId } = render(
    <Router>
      <StaticConfigProvider
        config={{ SERVICE_NAME: "web-rust-lang", ENV: "dev" }}
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
  expect(nameElement).toContainHTML("web-rust-lang");
  expect(envElement).toContainHTML("dev");
});

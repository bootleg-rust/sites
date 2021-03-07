import { ThemeProvider, DefaultTheme } from "@bootleg-rust/design-system";
import {
  defaultErrorReporter,
  defaultLogger,
  ErrorReporterProvider,
  LoggerProvider,
  StaticConfigProvider,
} from "@ssr-kit/toolbox";
import React, { useRef } from "react";
import { BrowserRouter as Router } from "react-router-dom";

export function StorybookWrapper({ children }: { children: React.ReactNode }) {
  const { window } = global as any;
  const defaultConfig = {};
  const windowConfig = window.__CONFIG_DATA__ || null;
  const parentWindowConfig = window?.parent?.window?.__CONFIG_DATA__ || null;
  const configRef = useRef(parentWindowConfig || windowConfig || defaultConfig);
  return (
    <StaticConfigProvider config={configRef.current}>
      <ErrorReporterProvider reporter={defaultErrorReporter}>
        <LoggerProvider logger={defaultLogger}>
          <ThemeProvider theme={DefaultTheme}>
            <Router>{children}</Router>
          </ThemeProvider>
        </LoggerProvider>
      </ErrorReporterProvider>
    </StaticConfigProvider>
  );
}

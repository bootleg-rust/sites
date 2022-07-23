/* global window, document */
import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import {
  Logger,
  defaultErrorReporter,
  defaultLogger,
  LoggerProvider,
  ErrorReporterProvider,
  StaticConfigProvider,
  ConfigProviderProps,
} from "@ssr-kit/toolbox";
import { StyleSheetManager } from "styled-components";
import { FluentClientConfigProvider } from "./src/fluent/client";

type HydrateConfig = {
  logger?: Logger;
  // errorReporter?: ErrorReporter;
  // TODO: fix type
  Render: any;
};

function getConfig() {
  const win = window as any;
  const config = win.__CONFIG_DATA__;
  return config;
}

export function ClientConfigProvider({ children }: ConfigProviderProps) {
  const config = useRef(getConfig());

  return (
    <StaticConfigProvider config={config.current}>
      {children}
    </StaticConfigProvider>
  );
}

export function hydrate({
  // errorReporter = defaultErrorReporter,
  logger = defaultLogger,
  Render,
}: HydrateConfig) {
  return (() => {
    ReactDOM.hydrate(
      <React.StrictMode>
        <HelmetProvider>
          <StyleSheetManager
            disableVendorPrefixes={process.env.NODE_ENV === "development"}
          >
            <ClientConfigProvider>
              <ErrorReporterProvider reporter={defaultErrorReporter}>
                <LoggerProvider logger={logger}>
                  <BrowserRouter>
                    <FluentClientConfigProvider>
                      <Render />
                    </FluentClientConfigProvider>
                  </BrowserRouter>
                </LoggerProvider>
              </ErrorReporterProvider>
            </ClientConfigProvider>
          </StyleSheetManager>
        </HelmetProvider>
      </React.StrictMode>,
      document.querySelector("#root"),
    );
  })();
}

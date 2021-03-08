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
  I18nProvider,
} from "@ssr-kit/toolbox";
import { StyleSheetManager } from "styled-components";

type HydrateConfig = {
  logger?: Logger;
  // errorReporter?: ErrorReporter;
  render(): React.ReactElement;
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

// TODO: Pass this in as config
const defaultLanguage = "en-US";
const supportedLanguages = [
  "en-US",
  "es",
  "fr",
  "it",
  "ja",
  "pt-BR",
  "ru",
  "tr",
  "zh-CN",
  "zh-TW",
];

export function hydrate({
  // errorReporter = defaultErrorReporter,
  logger = defaultLogger,
  render,
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
                    <I18nProvider
                      supportedLanguages={supportedLanguages}
                      defaultLanguage={defaultLanguage}
                    >
                      {render()}
                    </I18nProvider>
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

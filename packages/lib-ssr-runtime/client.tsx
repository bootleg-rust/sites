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
} from "@bootleg-rust/lib-ssr-toolbox";

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

export function hydrate({
  // errorReporter = defaultErrorReporter,
  logger = defaultLogger,
  render,
}: HydrateConfig) {
  return (() => {
    ReactDOM.hydrate(
      <React.StrictMode>
        <HelmetProvider>
          <ClientConfigProvider>
            <ErrorReporterProvider reporter={defaultErrorReporter}>
              <LoggerProvider logger={logger}>
                <BrowserRouter>{render()}</BrowserRouter>
              </LoggerProvider>
            </ErrorReporterProvider>
          </ClientConfigProvider>
        </HelmetProvider>
      </React.StrictMode>,
      document.getElementById("root"),
    );
  })();
}

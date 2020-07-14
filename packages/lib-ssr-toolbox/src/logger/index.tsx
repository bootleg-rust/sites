import React, { createContext, useContext, useMemo } from "react";

export interface Logger {
  debug(...args: any[]): void;
  info(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
}

/* eslint-disable no-console */
export const defaultLogger: Logger = {
  debug: (...args: any[]) =>
    process.env.NODE_ENV !== "production" && console.error(...args),
  info: console.log,
  warn: console.warn,
  error: console.error,
};
/* eslint-enable no-console */

type ContextState = {
  logger: Logger;
};

const LoggerContext = createContext<ContextState | null>(null);

type ProviderProps = {
  children?: React.ReactChild;
  logger: Logger;
};

export function LoggerProvider({ children, logger }: ProviderProps) {
  const ctx = useMemo(() => ({ logger }), [logger]);
  return (
    <LoggerContext.Provider value={ctx}>{children}</LoggerContext.Provider>
  );
}

export function useLogger() {
  const context = useContext(LoggerContext);

  if (process.env.NODE_ENV !== "production") {
    if (!context) {
      throw new Error(
        "useLogger must only be called from within an LoggerContext provider",
      );
    }
  }
  return context?.logger;
}

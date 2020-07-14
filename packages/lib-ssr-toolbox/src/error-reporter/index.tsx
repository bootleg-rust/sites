import React, { createContext, useContext, useMemo } from "react";

export interface ErrorReporter {
  sendError(error: any): void;
}

/* eslint-disable no-console */
export const defaultErrorReporter: ErrorReporter = {
  sendError: (...args: any[]) =>
    process.env.NODE_ENV !== "production" && console.error(...args),
};
/* eslint-enable no-console */

type ContextState = {
  errorReporter: ErrorReporter;
};

const ErrorReporterContext = createContext<ContextState | null>(null);

type ProviderProps = {
  children?: React.ReactChild;
  reporter: ErrorReporter;
};

export function ErrorReporterProvider({ children, reporter }: ProviderProps) {
  const ctx = useMemo(() => ({ errorReporter: reporter }), [reporter]);
  return (
    <ErrorReporterContext.Provider value={ctx}>
      {children}
    </ErrorReporterContext.Provider>
  );
}

export function useErrorReporter() {
  const context = useContext(ErrorReporterContext);

  if (process.env.NODE_ENV !== "production") {
    if (!context) {
      throw new Error(
        "useErrorReporter must only be called from within an ErrorReporterContext provider",
      );
    }
  }
  return context?.errorReporter;
}

import React, { createContext, useContext, useMemo } from "react";
import { FluentConfigData, FluentConfigProviderProps } from "./types";

const FluentServerContext = createContext<FluentConfigData | null>(null);

type AllOptional<T> = {
  [P in keyof T]: T[P] | null;
};

export function FluentConfigProvider({
  children,
  staticRef,
  parseMarkup,
  initialResources,
}: FluentConfigProviderProps) {
  const ctx = useMemo(() => ({
    staticRef: staticRef || {},
    parseMarkup,
    initialResources,
  }), [staticRef, initialResources, parseMarkup]);
  return (
    <FluentServerContext.Provider value={ctx}>
      {children}
    </FluentServerContext.Provider>
  );
}


export function useFluentConfig(): AllOptional<FluentConfigData> {
  const context = useContext(FluentServerContext);

  if (!context) {
    return {
      staticRef: null,
      initialResources: null,
      parseMarkup: null,
    };
  }

  return context;
}

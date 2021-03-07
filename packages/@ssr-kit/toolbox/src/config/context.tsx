import React, { createContext, useContext } from "react";
import { ConfigState, ConfigProviderProps } from "./types";

export const ConfigContext = createContext<ConfigState | null>(null);

export function StaticConfigProvider({
  children,
  config,
}: { config: any } & ConfigProviderProps) {
  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
}

export function useConfig<T = ConfigState>() {
  const context = useContext(ConfigContext);

  if (process.env.NODE_ENV !== "production") {
    if (!context) {
      throw new Error(
        "useConfig must only be called from within an ConfigContext provider",
      );
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return context! as T;
}

export function createUseConfig<T>() {
  return (): T => {
    return useConfig<T>();
  };
}

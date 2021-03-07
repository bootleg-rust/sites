import React, { createContext } from "react";
import { HttpContextData } from "./types";

export const HttpContext = createContext<HttpContextData | null>(null);

type ProviderProps = {
  children?: React.ReactChild;
  context: HttpContextData;
};

export function HttpProvider({ children, context }: ProviderProps) {
  return (
    <HttpContext.Provider value={context}>{children}</HttpContext.Provider>
  );
}

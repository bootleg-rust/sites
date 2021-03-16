import { createContext } from "react";
import { LocationValuesContextData } from "./types";

export const LocationValuesContext = createContext<LocationValuesContextData | null>(
  null,
);

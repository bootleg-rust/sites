import { useContext } from "react";
import React, { useMemo } from "react";
import { LocationValuesContext } from "./context";
import {
  LocationValuesContextData,
  LocationValuesProviderProps,
} from "./types";

export function LocationValuesProvider({
  children,
  host,
  hostname,
  href,
  origin,
  port,
  protocol,
}: LocationValuesProviderProps) {
  const ctx = useMemo(() => {
    return {
      host,
      hostname,
      href,
      origin,
      port: port || "",
      protocol,
    };
  }, []);
  return (
    <LocationValuesContext.Provider value={ctx}>
      {children}
    </LocationValuesContext.Provider>
  );
}

type Location = LocationValuesContextData;

export function useLocationValues(): Location {
  const ctx = useContext(LocationValuesContext);

  const protocol =
    ctx?.protocol ?? globalThis.location.protocol.replace(/:$/, "");

  return {
    host: ctx?.host || globalThis.location.host,
    hostname: ctx?.hostname || globalThis.location.hostname,
    href: ctx?.href || globalThis.location.href,
    origin: ctx?.origin || globalThis.location.origin,
    port: ctx?.port || globalThis.location.port,
    protocol,
    // pathname
    // search
    // hash
  };
}

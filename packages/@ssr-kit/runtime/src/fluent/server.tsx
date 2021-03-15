import React, { useMemo } from "react";
import cheerio from "cheerio";
import {
  FluentConfigProvider,
  FluentConfigProviderProps,
} from "@ssr-kit/toolbox";

export function FluentServerConfigProvider({
  children,
  staticRef,
}: FluentConfigProviderProps) {
  return (
    <FluentConfigProvider staticRef={staticRef}>
      {children}
    </FluentConfigProvider>
  );
}

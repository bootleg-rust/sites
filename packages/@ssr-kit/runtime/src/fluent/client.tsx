import React, { useMemo } from "react";
import { FluentConfigProvider, FluentConfigProviderProps } from "@ssr-kit/toolbox";

function getLocaleData() {
  const win = window as any;
  const localeData = win.__LOCALE_DATA__;
  return localeData;
}

export function FluentClientConfigProvider({ children }: { children: React.ReactNode }) {
  const localeData = useMemo(() => getLocaleData(), []);
  return (
    <FluentConfigProvider initialResources={localeData}>
      {children}
    </FluentConfigProvider>
  );
}

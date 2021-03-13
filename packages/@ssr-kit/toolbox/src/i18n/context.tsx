import React, { createContext, useCallback, useContext, useMemo } from "react";
import {
  Routes,
  Route,
  useResolvedPath,
  useNavigate,
  useLocation,
} from "react-router";
import {
  I18nProps,
  I18nData,
  I18nLocale,
  I18nLocaleArg,
  I18nAvailableLocalesArg,
  I18nDirection,
} from "./types";

const I18nContext = createContext<I18nData | null>(null);

export function useI18n() {
  const ctx = useContext(I18nContext);

  if (!ctx) {
    throw new Error("I18nProvider required");
  }

  return ctx;
}

export function I18nProvider({
  children,
  availableLocales,
  defaultLocale,
}: I18nProps) {
  const originalBasePath = useResolvedPath(".").pathname;
  return (
    <Routes>
      {Object.keys(availableLocales).map((locale) => {
        return (
          <Route
            path={`/${locale}/*`}
            key={locale}
            element={
              <_I18nProvider
                originalBasePath={originalBasePath}
                availableLocales={availableLocales}
                defaultLocale={defaultLocale}
                locale={locale}
              >
                {children}
              </_I18nProvider>
            }
          />
        );
      })}
      <Route
        path="/*"
        element={
          <_I18nProvider
            originalBasePath={originalBasePath}
            availableLocales={availableLocales}
            defaultLocale={defaultLocale}
            locale={defaultLocale}
          >
            {children}
          </_I18nProvider>
        }
      />
    </Routes>
  );
}

const LocaleDefaults = {
  emoji: null,
  direction: I18nDirection.LTR,
};

function buildLocales(
  localeOptions: I18nAvailableLocalesArg,
): Map<string, I18nLocale> {
  const locales = new Map();
  for (const [code, localeOption] of Object.entries(localeOptions)) {
    const localeData: I18nLocaleArg =
      typeof localeOption === "string" ? { name: localeOption } : localeOption;
    const normalized: I18nLocale = { code, ...LocaleDefaults, ...localeData };

    if (!normalized.isActive || normalized.isActive()) {
      locales.set(normalized.code, normalized);
    }
  }

  return locales;
}

function _I18nProvider({
  children,
  availableLocales: availableLocalesArg,
  defaultLocale: defaultLocaleArg,
  locale: localeArg,
  originalBasePath,
}: I18nProps & { locale: string; originalBasePath: string }) {
  const basePath = useResolvedPath(".").pathname;
  const currentLanguagePrefix = basePath.replace(originalBasePath, "");

  const location = useLocation();
  const navigate = useNavigate();

  const navigateToLocale = useCallback(
    (newLocale: string) => {
      const replacePrefix = basePath === "/" ? "" : basePath;

      const newLocaleBaseUrl = originalBasePath === "/" ? "" : originalBasePath;
      const newLocalePrefix =
        newLocale === defaultLocaleArg ? originalBasePath : `${newLocaleBaseUrl}/${newLocale}`;
      const newPath = location.pathname.replace(replacePrefix, newLocalePrefix);
      const newPathNoTrailingSlash = newPath.endsWith("/")
        ? newPath.slice(0, -1)
        : newPath;

      navigate({
        pathname: newPathNoTrailingSlash || "/",
        search: location.search,
      });
    },
    [location, defaultLocaleArg, basePath, navigate],
  );

  const context = useMemo(() => {
    const availableLocales = buildLocales(availableLocalesArg);
    return {
      availableLocales,
      defaultLocale: availableLocales.get(defaultLocaleArg) as I18nLocale,
      locale: availableLocales.get(localeArg) as I18nLocale,
      basePath,
      navigateToLocale,
    };
  }, [
    availableLocalesArg,
    defaultLocaleArg,
    localeArg,
    basePath,
    navigateToLocale,
  ]);

  return (
    <I18nContext.Provider value={context}>{children}</I18nContext.Provider>
  );
}

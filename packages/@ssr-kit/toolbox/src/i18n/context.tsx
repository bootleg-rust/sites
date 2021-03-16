import React, { createContext, useCallback, useContext, useMemo } from "react";
import {
  Routes,
  Route,
  useResolvedPath,
  useNavigate,
  useLocation,
} from "react-router";
import { Path } from "history";
import {
  I18nProps,
  I18nData,
  I18nLocale,
  I18nLocaleArg,
  I18nAvailableLocalesArg,
  I18nDirection,
} from "./types";

const I18nPublicContext = createContext<I18nData | null>(null);

const InternalRootContext = createContext<{
  originalBasePath: Path;
  availableLocalesArg: I18nAvailableLocalesArg;
  defaultLocaleArg: string;
} | null>(null);

const InternalMountedContext = createContext<{
  mountedBasePath: Path;
  urlDerivedLocaleString: string;
} | null>(null);

export function useI18n() {
  const ctx = useContext(I18nPublicContext);

  if (!ctx) {
    throw new Error("I18nProvider required");
  }

  return ctx;
}

function InternalRootProvider({
  defaultLocaleArg,
  availableLocalesArg,
  children,
}: {
  defaultLocaleArg: string;
  availableLocalesArg: I18nAvailableLocalesArg;
  children: React.ReactNode;
}) {
  const originalBasePath = useResolvedPath(".");
  const ctx = useMemo(() => {
    return { originalBasePath, defaultLocaleArg, availableLocalesArg };
  }, [originalBasePath, defaultLocaleArg, availableLocalesArg]);
  return (
    <InternalRootContext.Provider value={ctx}>
      {children}
    </InternalRootContext.Provider>
  );
}

function InternalMountedProvider({
  locale: urlDerivedLocaleString,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  const mountedBasePath = useResolvedPath(".");
  const ctx = useMemo(() => {
    return {
      mountedBasePath,
      urlDerivedLocaleString,
    };
  }, [mountedBasePath, urlDerivedLocaleString]);
  return (
    <InternalMountedContext.Provider value={ctx}>
      {children}
    </InternalMountedContext.Provider>
  );
}

function useInternalRootContext() {
  const ctx = useContext(InternalRootContext);

  if (!ctx) {
    throw new Error("I18nProvider InternalRootContext required");
  }

  return ctx;
}

function useInternalMountedContext() {
  const ctx = useContext(InternalMountedContext);

  if (!ctx) {
    throw new Error("I18nProvider InternalRootContext required");
  }

  return ctx;
}

export function I18nProvider({
  children,
  availableLocales: availableLocalesArg,
  defaultLocale: defaultLocaleArg,
}: I18nProps) {
  return (
    <InternalRootProvider
      availableLocalesArg={availableLocalesArg}
      defaultLocaleArg={defaultLocaleArg}
    >
      <Routes>
        {Object.keys(availableLocalesArg).map((locale) => {
          return (
            <Route
              path={`/${locale}/*`}
              key={locale}
              element={
                <InternalMountedProvider locale={locale}>
                  <_I18nProvider>{children}</_I18nProvider>
                </InternalMountedProvider>
              }
            />
          );
        })}
        <Route
          path="/*"
          element={
            <InternalMountedProvider locale={defaultLocaleArg}>
              <_I18nProvider>{children}</_I18nProvider>
            </InternalMountedProvider>
          }
        />
      </Routes>
    </InternalRootProvider>
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

enum localeIncludeStrategy {
  OMIT = "omit",
  INCLUDE = "include",
}

// type localeIncludeStrategyArg = `${localeIncludeStrategy}`;
type localeIncludeStrategyArg = "omit" | "include";

export function useI18nAlternatePathResolver() {
  const { originalBasePath, defaultLocaleArg } = useInternalRootContext();
  const { mountedBasePath } = useInternalMountedContext();
  const location = useLocation();

  const resolver = useCallback(
    (
      newLocale: I18nLocale | string,
      opts: {
        defaultLocaleStrategy?: localeIncludeStrategyArg;
      } = {},
    ): Path => {
      // Set defaults
      opts.defaultLocaleStrategy =
        opts.defaultLocaleStrategy || localeIncludeStrategy.OMIT;

      const localeStrategy = opts.defaultLocaleStrategy as localeIncludeStrategy;

      if (localeStrategy === localeIncludeStrategy.OMIT) {
        const newLocaleCode =
          typeof newLocale === "string" ? newLocale : newLocale.code;

        const replacePrefix =
          mountedBasePath.pathname === "/" ? "" : mountedBasePath.pathname;

        const newLocaleBaseUrl =
          originalBasePath.pathname === "/" ? "" : originalBasePath;
        const newLocalePrefix =
          newLocaleCode === defaultLocaleArg
            ? originalBasePath.pathname
            : `${newLocaleBaseUrl}/${newLocaleCode}`;
        const newPath = location.pathname.replace(
          replacePrefix,
          newLocalePrefix,
        );
        const newPathNoTrailingSlash = newPath.endsWith("/")
          ? newPath.slice(0, -1)
          : newPath;

        return {
          pathname: newPathNoTrailingSlash || "/",
          search: location.search,
          hash: location.hash,
        };
      }
      if (localeStrategy === localeIncludeStrategy.INCLUDE) {
        const newLocaleCode =
          typeof newLocale === "string" ? newLocale : newLocale.code;

        const replacePrefix =
          mountedBasePath.pathname === "/" ? "" : mountedBasePath.pathname;

        const newLocaleBaseUrl =
          originalBasePath.pathname === "/" ? "" : originalBasePath;
        const newLocalePrefix = `${newLocaleBaseUrl}/${newLocaleCode}`;
        const newPath = location.pathname.replace(
          replacePrefix,
          newLocalePrefix,
        );
        const newPathNoTrailingSlash = newPath.endsWith("/")
          ? newPath.slice(0, -1)
          : newPath;

        return {
          pathname: newPathNoTrailingSlash || "/",
          search: location.search,
          hash: location.hash,
        };
      }
      throw new Error("Unexpected localeStrategy");
    },
    [
      originalBasePath,
      mountedBasePath,
      defaultLocaleArg,
      location.hash,
      location.pathname,
      location.search,
    ],
  );

  return resolver;
}

function _I18nProvider({ children }: { children?: React.ReactNode }) {
  const { availableLocalesArg, defaultLocaleArg } = useInternalRootContext();
  const { urlDerivedLocaleString } = useInternalMountedContext();
  const alternatePathResolver = useI18nAlternatePathResolver();

  const navigate = useNavigate();

  const navigateToLocale = useCallback(
    (newLocale: I18nLocale | string) => {
      const newPath = alternatePathResolver(newLocale);
      navigate(newPath);
    },
    [navigate, alternatePathResolver],
  );

  const context = useMemo(() => {
    const availableLocales = buildLocales(availableLocalesArg);
    return {
      availableLocales,
      defaultLocale: availableLocales.get(defaultLocaleArg) as I18nLocale,
      locale: availableLocales.get(urlDerivedLocaleString) as I18nLocale,
      navigateToLocale,
    };
  }, [
    availableLocalesArg,
    defaultLocaleArg,
    urlDerivedLocaleString,
    navigateToLocale,
  ]);

  return (
    <I18nPublicContext.Provider value={context}>
      {children}
    </I18nPublicContext.Provider>
  );
}

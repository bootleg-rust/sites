import React, { createContext, useCallback, useContext, useMemo } from "react";
import {
  Routes,
  Route,
  useResolvedPath,
  useNavigate,
  useLocation,
} from "react-router";
import { I18nProps, I18nData } from "./types";

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
  supportedLanguages,
  defaultLanguage,
}: I18nProps) {
  return (
    <Routes>
      {supportedLanguages.map((lang) => {
        return (
          <Route
            path={`/${lang}/*`}
            key="lang"
            element={
              <_I18nProvider
                supportedLanguages={supportedLanguages}
                defaultLanguage={defaultLanguage}
                lang={lang}
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
            supportedLanguages={supportedLanguages}
            defaultLanguage={defaultLanguage}
            lang={defaultLanguage}
          >
            {children}
          </_I18nProvider>
        }
      />
    </Routes>
  );
}

function _I18nProvider({
  children,
  supportedLanguages,
  defaultLanguage,
  lang,
}: I18nProps & { lang: string }) {
  const basePath = useResolvedPath(".").pathname;

  const location = useLocation();
  const navigate = useNavigate();

  const navigateToLanguage = useCallback(
    (newLang: string) => {
      const replacePrefix = basePath === '/' ? '' : basePath;
      const newLangPrefix = newLang === defaultLanguage ? '' : `/${newLang}`;
      const newPath = location.pathname.replace(replacePrefix, newLangPrefix);
      const newPathNoTrailingSlash = newPath.endsWith('/') ? newPath.slice(0, -1) : newPath;
      navigate({
        pathname: newPathNoTrailingSlash || "/",
        search: location.search,
      });
    },
    [location, defaultLanguage, basePath, navigate, lang, defaultLanguage, basePath],
  );

  const context = useMemo(
    () => ({
      supportedLanguages,
      defaultLanguage,
      lang,
      basePath,
      navigateToLanguage,
    }),
    [supportedLanguages, defaultLanguage, lang, basePath, navigateToLanguage],
  );

  return (
    <I18nContext.Provider value={context}>{children}</I18nContext.Provider>
  );
}

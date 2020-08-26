import React from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import {
  HttpStatus,
  CacheControl,
  TwitterCard,
  OpenGraph,
} from "@bootleg-rust/lib-ssr-toolbox";
import { Helmet } from "react-helmet-async";
import { Route, Switch, useRouteMatch, useHistory } from "react-router";
import {
  createGlobalStyle,
  GlobalCssResetStyle,
  GlobalCssThemeColors,
  GlobalDefaultPageStyle,
  Div,
  Main,
} from "@bootleg-rust/lib-design-system";
import { useConfig } from "./config";
import { TopNav, SiteFooter } from "./layout";
import { Homepage, FerrisErrorSection } from "./pages";

import "@bootleg-rust/lib-design-system/src/theming/fonts/index.scss";

const GlobalAppStyles = createGlobalStyle``;

function ApplicationProviders({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

const defaultLanguage = "en-US";
const supportedLanguages = [
  "en-US",
  "es",
  "fr",
  "it",
  "ja",
  "pt-BR",
  "ru",
  "tr",
  "zh-CN",
  "zh-TW",
];

const matchLangs = new RegExp(
  // ^(\/(en\-US|es|fr|it|ja|pt\-BR|ru|tr|zh\-CN|zh\-TW))?(\/.*)?$
  `^(\\/(${supportedLanguages.join("|")}))?(\\/.*)?$`,
);

function PageContent() {
  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const isIndex = (str: string) => str === match.url;
  const navigateToLanguage = (lang: string) => {
    const newUrlLang = lang === defaultLanguage ? "" : "/" + lang;
    const regexMatch = matchLangs.exec(location.pathname);
    const oldUrlLang = regexMatch ? regexMatch[1] : null;
    const urlPath = regexMatch ? regexMatch[3] : null;
    const newPath = oldUrlLang
      ? location.pathname.replace(oldUrlLang, newUrlLang)
      : newUrlLang + (urlPath || "");
    history.push({
      ...location,
      pathname: newPath,
    });
  };
  return (
    <>
      <AnimateSharedLayout type="crossfade">
        <TopNav
          title={
            <AnimatePresence>
              {!isIndex(location.pathname) ? (
                <motion.span layoutId="main-heading">Rust</motion.span>
              ) : null}
            </AnimatePresence>
          }
          onSelectLanguage={navigateToLanguage}
        />
        <Main grow>
          {/* Routing */}
          <Switch>
            <Route exact path={match.path + "/"} component={Homepage} />

            {/* Page not found 404 */}
            <Route
              render={() => (
                <>
                  <HttpStatus code={404} />
                  <FerrisErrorSection code={404} />
                </>
              )}
            />
          </Switch>
          <SiteFooter onSelectLanguage={navigateToLanguage} />
        </Main>
      </AnimateSharedLayout>
    </>
  );
}

function LocalisedPageContent() {
  return (
    <>
      <Switch>
        {supportedLanguages.map((lang) => {
          return (
            <Route
              path={`/:lang(${lang})`}
              key="lang"
              component={PageContent}
            />
          );
        })}
        <Route component={PageContent} />
      </Switch>
    </>
  );
}

export function App() {
  const config = useConfig();
  return (
    <ApplicationProviders>
      {/* Default page config */}
      <CacheControl
        maxAge={config.SSR_CACHING_DEFAULT_MAX_AGE}
        sharedMaxAge={config.SSR_CACHING_DEFAULT_SHARED_MAX_AGE}
        public
      />
      <Helmet
        defaultTitle="Bootleg rust-lang.org"
        titleTemplate="%s - Bootleg rust-lang.org"
      >
        <html lang="en" />
        <base href="/" />
        <meta
          name="description"
          content="A language empowering everyone to build reliable and efficient software."
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta charSet="UTF-8" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Helmet>
      <>
        {/* OpenGraph and twitter */}
        <TwitterCard
          card="summary"
          site="@rustlang"
          creator="@rustlang"
          title=""
          description="A language empowering everyone to build reliable and efficient software."
        />
        <TwitterCard.Image
          url="https://www.rust-lang.org/static/images/rust-social-wide.jpg"
          alt="Rust logo"
        />

        <OpenGraph
          type="website"
          locale="en_US"
          description="A language empowering everyone to build reliable and efficient software."
        />
        <OpenGraph.Image
          url="https://www.rust-lang.org/static/images/rust-social-wide.jpg"
          alt="Rust logo"
        />
      </>

      {/* Global design-system styles */}
      <GlobalCssResetStyle />
      <GlobalCssThemeColors />
      <GlobalDefaultPageStyle />
      {/* Global app styles */}
      <GlobalAppStyles />

      <LocalisedPageContent />
      {/* Test data */}
      <Div data-testid="env:SERVICE_NAME" style={{ display: "none" }}>
        {config.SERVICE_NAME}
      </Div>
      <Div data-testid="env:ENV" style={{ display: "none" }}>
        {config.ENV}
      </Div>
    </ApplicationProviders>
  );
}

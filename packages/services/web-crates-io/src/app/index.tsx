import React from "react";
import {
  HttpStatus,
  CacheControl,
  Redirect,
  useI18n,
  I18nProvider,
} from "@ssr-kit/toolbox";
import { Helmet } from "react-helmet-async";
import { Route, Routes, useParams } from "react-router";
import {
  createGlobalStyle,
  GlobalCssResetStyle,
  GlobalCssThemeColors,
  GlobalDefaultPageStyle,
  H1,
} from "@bootleg-rust/design-system";
import { flx } from "@pseudo-su/flex-elements";
import { useConfig } from "./config";
import { CrateSearchResults } from "./features/crate-search";
import { Dashboard } from "./features/dashboard";
import { PageLayout } from "./layout";
import ferrisErrorImg from "./ferris-error.png";

import "@bootleg-rust/design-system/src/theming/fonts/index.scss";

const GlobalAppStyles = createGlobalStyle``;

function QueryCrateSearchPage() {
  return (
    <>
      <H1>Search by query string</H1>
      <CrateSearchResults />
    </>
  );
}

function ExploreCrateSearchPage() {
  return (
    <>
      <H1>Explore all crates</H1>
      <CrateSearchResults />
    </>
  );
}

function UserCrateSearchPage() {
  const { userId } = useParams();
  return (
    <>
      <H1>Search crates for user {userId}</H1>
      <CrateSearchResults />
    </>
  );
}

function TeamCrateSearchPage() {
  const { teamId } = useParams();
  return (
    <>
      <H1>Search crates for team {teamId}</H1>
      <CrateSearchResults />
    </>
  );
}

export function CrateDetailsPage() {
  const { crateId } = useParams();
  // latest version
  // reverse_dependencies
  return <>CrateDetails {crateId}</>;
}

const defaultLocale = "en-US";

const onlyInDev = () => process.env.NODE_ENV === "development";

const availableLocales = {
  "en-US": { name: "English" },
  "en-PR": { name: "Pirate", emoji: "🏴‍☠️", isHidden: onlyInDev },
};

function ApplicationProviders({ children }: { children?: React.ReactNode }) {
  return (
    <Routes>
      <Route
        path="/base-url/*"
        element={
          <I18nProvider
            availableLocales={availableLocales}
            defaultLocale={defaultLocale}
          >
            {children}
          </I18nProvider>
        }
      />
    </Routes>
  );
}

function PageContent() {
  return (
    <PageLayout>
      {/* Routing */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/redirect" element={<Redirect to=".." />} />
        <Route
          path="/redirect-permanently"
          element={<Redirect to=".." movedPermanently />}
        />

        {/* Search crates */}
        <Route path="/crates/*" element={<QueryCrateSearchPage />} />
        <Route path="/crates/explore/*" element={<ExploreCrateSearchPage />} />
        <Route
          path="/crates/user/:userId/*"
          element={<UserCrateSearchPage />}
        />
        <Route
          path="/crates/team/:teamId/*"
          element={<TeamCrateSearchPage />}
        />

        {/* View individual crate */}
        <Route path="/crates/:crateId" element={<CrateDetailsPage />} />

        {/* Page not found 404 */}
        <Route
          path="/*"
          element={
            <>
              <HttpStatus code={404} />
              ERROR 404!
              <img src={ferrisErrorImg} />
            </>
          }
        />
      </Routes>
    </PageLayout>
  );
}

function GlobalPageMetadata() {
  const config = useConfig();
  const { locale } = useI18n();

  return (
    <>
      {/* Default page config */}
      <CacheControl
        maxAge={config.SSR_CACHING_DEFAULT_MAX_AGE}
        sharedMaxAge={config.SSR_CACHING_DEFAULT_SHARED_MAX_AGE}
        public
      />
      <Helmet
        defaultTitle="Bootleg crates.io"
        titleTemplate="%s - Bootleg crates.io"
      >
        <html lang={locale.code} dir={locale.direction} />
        <base href="/" />
        <meta
          name="description"
          content="An unofficial re-write of the crates.io website"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta charSet="UTF-8" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="An unofficial re-write of the crates.io website"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo227.png" />
      </Helmet>
    </>
  );
}

export function App() {
  const config = useConfig();
  return (
    <ApplicationProviders>
      <GlobalPageMetadata />

      {/* Global design-system styles */}
      <GlobalCssResetStyle />
      <GlobalCssThemeColors />
      <GlobalDefaultPageStyle />
      {/* Global app styles */}
      <GlobalAppStyles />

      <PageContent />

      {/* Test data */}
      <flx.div data-testid="env:SERVICE_NAME" style={{ display: "none" }}>
        {config.SERVICE_NAME}
      </flx.div>
      <flx.div data-testid="env:ENV" style={{ display: "none" }}>
        {config.ENV}
      </flx.div>
    </ApplicationProviders>
  );
}

import React from "react";
import {
  HttpStatus,
  CacheControl,
  Redirect,
} from "@bootleg-rust/lib-ssr-toolbox";
import { Helmet } from "react-helmet-async";
import { Route, Switch } from "react-router";
import { createGlobalStyle } from "styled-components";
import { ThemeDefaultStyle } from "@bootleg-rust/lib-design-system";
import { useConfig } from "./config";
import { CrateDetails } from "./features/crate-details";
import { CrateSearchResults } from "./features/crate-search";
import { Dashboard } from "./features/dashboard";
import { PageLayout } from "./layout";
import ferrisErrorImg from "./ferris-error.png";

import "@bootleg-rust/lib-design-system/src/theming/fonts/index.scss";

const AppGlobalStyles = createGlobalStyle``;

function QueryCrateSearch() {
  return (
    <>
      <div>Search by query string</div>
      <CrateSearchResults />
    </>
  );
}

function ExploreCrateSearch() {
  return (
    <>
      <div>Explore all crates</div>
      <CrateSearchResults />
    </>
  );
}

function UserCrateSearch({ userId }: { userId: string }) {
  return (
    <>
      <div>Search crates for user {userId}</div>
      <CrateSearchResults />
    </>
  );
}

function TeamCrateSearch({ teamId }: { teamId: string }) {
  return (
    <>
      <div>Search crates for team {teamId}</div>
      <CrateSearchResults />
    </>
  );
}

function ApplicationProviders({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
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
        defaultTitle="Bootleg crates.io"
        titleTemplate="%s - Bootleg crates.io"
      >
        <html lang="en" />
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
      <ThemeDefaultStyle />
      <AppGlobalStyles />
      <PageLayout>
        {/* Routing */}
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/redirect" render={() => <Redirect to="/" />} />
          <Route
            exact
            path="/redirect-permanently"
            render={() => <Redirect to="/" movedPermanently />}
          />

          {/* Search crates */}
          <Route exact path="/crates" component={QueryCrateSearch} />
          <Route exact path="/crates/explore" component={ExploreCrateSearch} />
          <Route
            exact
            path="/crates/user/:userId"
            component={UserCrateSearch}
          />
          <Route
            exact
            path="/crates/team/:teamId"
            component={TeamCrateSearch}
          />

          {/* View individual crate */}
          <Route exact path="/crates/:crateId" component={CrateDetails} />

          {/* Page not found 404 */}
          <Route
            render={() => (
              <>
                <HttpStatus code={404} />
                ERROR 404!
                <img src={ferrisErrorImg} />
              </>
            )}
          />
        </Switch>
      </PageLayout>
      {/* Test data */}
      <div data-testid="env:SERVICE_NAME" style={{ display: "none" }}>
        {config.SERVICE_NAME}
      </div>
      <div data-testid="env:ENV" style={{ display: "none" }}>
        {config.ENV}
      </div>
    </ApplicationProviders>
  );
}

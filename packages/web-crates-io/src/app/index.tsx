import { HttpStatus, useConfig } from "@bootleg-rust/lib-ssr-toolbox";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Route, Switch } from "react-router";
import { Link, Redirect } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { ThemeDefaultStyle } from "@bootleg-rust/lib-design-system";
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
      <Helmet
        defaultTitle="Bootleg crates.io"
        titleTemplate="%s - Bootleg crates.io"
      >
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
        <div style={{ margin: "0 auto" }}>
          <div>
            <Link to="/">dashboard</Link> |<Link to="/crates">query</Link> |
            <Link to="/crates/explore">explore</Link> |
            <Link to="/crates/user/123">user 123</Link> |
            <Link to="/crates/team/123">team 123</Link> |
            <Link to="/crates/123">crate 123</Link>
          </div>

          {/* Routing */}

          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/redirect" render={() => <Redirect to="/" />} />

            {/* Search crates */}
            <Route exact path="/crates" component={QueryCrateSearch} />
            <Route
              exact
              path="/crates/explore"
              component={ExploreCrateSearch}
            />
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
        </div>
      </PageLayout>
      {/* Test data */}
      <div data-testid="env:SITE" style={{ display: "none" }}>
        {config.SITE}
      </div>
      <div data-testid="env:ENV" style={{ display: "none" }}>
        {config.ENV}
      </div>
    </ApplicationProviders>
  );
}

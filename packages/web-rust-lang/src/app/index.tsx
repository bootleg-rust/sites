import { HttpStatus, useConfig } from "@bootleg-rust/lib-ssr-toolbox";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Route, Switch } from "react-router";
import { createGlobalStyle } from "styled-components";
import { ThemeDefaultStyle } from "@bootleg-rust/lib-design-system";
import { PageLayout } from "./layout";
import { Homepage, FerrisErrorPage } from "./pages";

import "@bootleg-rust/lib-design-system/src/theming/fonts/index.scss";

const AppGlobalStyles = createGlobalStyle``;

function ApplicationProviders({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function App() {
  const config = useConfig();
  return (
    <ApplicationProviders>
      {/* Default page config */}
      <Helmet
        defaultTitle="Bootleg rust-lang.org"
        titleTemplate="%s - Bootleg rust-lang.org"
      >
        <base href="/" />
        <meta
          name="description"
          content="An unofficial re-write of the rust-lang.org website"
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
        {/* TODO: remove the need for tachyons here as capability is moved into the design system */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/tachyons@4/css/tachyons.min.css"
        ></link>
      </Helmet>
      <ThemeDefaultStyle />
      <AppGlobalStyles />
      <PageLayout>
        <div style={{ margin: "0 auto" }}>
          {/* Routing */}
          <Switch>
            <Route exact path="/" component={Homepage} />

            {/* Page not found 404 */}
            <Route
              render={() => (
                <>
                  <HttpStatus code={404} />
                  <FerrisErrorPage code={404} />
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

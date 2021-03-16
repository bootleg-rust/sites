import React from "react";
import { useLocation, useResolvedPath } from "react-router-dom";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import {
  HttpStatus,
  CacheControl,
  TwitterCard,
  OpenGraph,
  useI18n,
  I18nProvider,
  I18nDirection,
  I18nFluentProvider,
  useI18nAlternatePathResolver,
  // useLocationValues,
} from "@ssr-kit/toolbox";
import { Helmet } from "react-helmet-async";
import { Route, Routes } from "react-router";
import {
  createGlobalStyle,
  GlobalCssResetStyle,
  GlobalCssThemeColors,
  GlobalDefaultPageStyle,
} from "@bootleg-rust/design-system";
import { flx } from "@pseudo-su/flex-elements";
import { Localized, useLocalizedMessage } from "@bootleg-rust/features";
import { useConfig } from "./config";
import { TopNav, SiteFooter } from "./layout";
import { Homepage, FerrisErrorSection } from "./pages";
import { localizationResources } from "./locales";

import rustSocialWideJpg from "./rust-social-wide.jpg";

import "@bootleg-rust/design-system/src/theming/fonts/index.scss";

const GlobalAppStyles = createGlobalStyle``;

const defaultLocale = "en-US";

const onlyInDev = () => process.env.NODE_ENV === "development";

const availableLocales = {
  "en-US": { name: "English", emoji: "🇺🇸" },
  es: { name: "Español", emoji: "🇪🇸" },
  fr: { name: "Français", emoji: "🇫🇷" },
  it: { name: "Italiano", emoji: "🇮🇹" },
  ja: { name: "日本語", emoji: "🇯🇵" },
  "pt-BR": { name: "Português", emoji: "🇧🇷" },
  ru: { name: "Русский", emoji: "🇷🇺" },
  tr: { name: "Türkçe", emoji: "🇹🇷" },
  "zh-CN": { name: "简体中文", emoji: "🇨🇳" },
  "zh-TW": { name: "正體中文", emoji: "🇹🇼" },

  // IN-PROGRESS languages
  de: { name: "Deutsch", emoji: "🇩🇪", isActive: onlyInDev },
  fa: {
    name: "فارسی",
    emoji: "🇮🇷",
    isActive: onlyInDev,
    direction: I18nDirection.RTL,
  },
  ko: { name: "한국어", emoji: "🇰🇷", isActive: onlyInDev },
  pl: { name: "Polskie", emoji: "🇵🇱", isActive: onlyInDev },
  he: {
    name: "עברית",
    emoji: "🇮🇱",
    direction: I18nDirection.RTL,
    isActive: onlyInDev,
  },
  "xx-AU": {
    // Upside down back to front
    name: "ɥsılbuə",
    direction: I18nDirection.RTL,
    isActive: onlyInDev,
  },
};

function ApplicationProviders({ children }: { children?: React.ReactNode }) {
  return (
    <I18nProvider
      availableLocales={availableLocales}
      defaultLocale={defaultLocale}
    >
      <I18nFluentProvider resources={localizationResources}>
        {children}
      </I18nFluentProvider>
    </I18nProvider>
  );
}

function SupportedLanguagesMetadata() {
  const { defaultLocale, availableLocales } = useI18n();
  const alternatePathResolver = useI18nAlternatePathResolver();

  return (
    <Helmet>
      <link
        rel="alternate"
        href={alternatePathResolver(defaultLocale).pathname}
        hrefLang="x-default"
      ></link>
      {[...availableLocales].map(([, alternateLocale], idx) => {
        const alternatePath = alternatePathResolver(alternateLocale, {
          defaultLocaleStrategy: "include",
        });
        return (
          <link
            key={idx}
            rel="alternate"
            href={alternatePath.pathname}
            hrefLang={alternateLocale.code}
          ></link>
        );
      })}
    </Helmet>
  );
}

function GlobalPageMetadata() {
  const { locale } = useI18n();
  // TODO: use locationValues to build absolute URLs because
  // meta tags require them
  // const locationValues = useLocationValues();

  // Page title
  const titleMessage = useLocalizedMessage("index-title");

  const pageTitlePrefix = "(Unofficial)";
  const localizedTitle = titleMessage?.formattedMessage || "";
  const pageTitle = `${pageTitlePrefix} ${localizedTitle}`;
  const pageTitleTemplate = `%s - ${pageTitle}`;

  const descriptionMessage = useLocalizedMessage("meta-description");
  const metaDescription = descriptionMessage?.formattedMessage || "";
  const logoAltMessage = useLocalizedMessage("nav-logo-alt");
  const navLogoAlt = logoAltMessage?.formattedMessage || "";

  // Twitter card meta

  // OpenGraph meta
  return (
    <>
      <Helmet defaultTitle={pageTitle} titleTemplate={pageTitleTemplate}>
        <html lang={locale.code} dir={locale.direction} />
        <base href="/" />
        <meta
          name="description"
          content={descriptionMessage?.formattedMessage || ""}
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

      <SupportedLanguagesMetadata />

      {/* OpenGraph and twitter */}
      {/* TODO: Fix image URLs */}
      <TwitterCard
        card="summary"
        site="@rustlang"
        creator="@rustlang"
        title={pageTitle}
        description={metaDescription}
      />
      <TwitterCard.Image url={rustSocialWideJpg} alt={navLogoAlt} />

      <OpenGraph type="website" locale="en_US" description={metaDescription} />
      <OpenGraph.Image url={rustSocialWideJpg} alt={navLogoAlt} />
    </>
  );
}

function Error404Page() {
  const titleMessage = useLocalizedMessage("error404-page-title", {});
  return (
    <>
      <Helmet>
        <title>{titleMessage?.formattedMessage}</title>
      </Helmet>
      <HttpStatus code={404} />
      <FerrisErrorSection code={404} />
    </>
  );
}

function PageContent() {
  const { navigateToLocale } = useI18n();
  const currentLocation = useLocation();
  const relativeLocation = useResolvedPath(".");
  const isIndex = currentLocation.pathname === relativeLocation.pathname;

  return (
    <>
      <GlobalPageMetadata />
      <AnimateSharedLayout type="crossfade">
        <TopNav
          title={
            <AnimatePresence>
              {!isIndex ? (
                <motion.span layoutId="main-heading">
                  <Localized id="rust" />
                </motion.span>
              ) : null}
            </AnimatePresence>
          }
          onSelectLocale={navigateToLocale}
        />
        <flx.main grow justify="center">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/*" element={<Error404Page />} />
          </Routes>
        </flx.main>
        <SiteFooter onSelectLocale={navigateToLocale} />
      </AnimateSharedLayout>
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

      {/* Global design-system styles */}
      <GlobalCssResetStyle />
      <GlobalCssThemeColors />
      <GlobalDefaultPageStyle />

      {/* Global app styles */}
      <GlobalAppStyles />

      {/* Render the application */}
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

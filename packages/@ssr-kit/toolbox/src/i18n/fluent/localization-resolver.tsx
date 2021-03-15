import React, { useMemo, useEffect, useState } from "react";
import { isServer } from "../../is-client-server";
import { FluentBundle, FluentResource } from "@fluent/bundle";
import {
  ReactLocalization,
  LocalizationProvider,
  MarkupParser,
} from "@fluent/react";
import { useI18n } from "../context";
import { I18nLocale } from "../types";
import {
  ResourceMode,
  ResourcesArg,
  RemoteResource,
  EmbeddedResource,
  EmbeddedProviderProps,
  RemoteProviderProps,
  FluentProviderProps,
} from "./types";
import { useFluentConfig } from "./config-context";

function makeEmbeddedLocalizations(
  resourcesArg: ResourcesArg<EmbeddedResource>,
  locales: I18nLocale[],
  parseMarkup: MarkupParser | null,
): ReactLocalization {
  const bundles: FluentBundle[] = Object.entries(resourcesArg)
    .map(([localeCode, embeddedResources]) => {
      if (!locales.find((l) => l.code === localeCode)) {
        return null;
      }
      const bundle = new FluentBundle(localeCode);
      for (let messages of embeddedResources) {
        const resource = new FluentResource(messages.data);
        bundle.addResource(resource);
      }
      return bundle;
    })
    .filter(Boolean) as FluentBundle[];
  const localization = new ReactLocalization(bundles, parseMarkup);

  return localization;
}

function useLocales() {
  const { locale, defaultLocale } = useI18n();

  const locales = useMemo(() => {
    // TODO: figure out how should this allow multiple locales?
    return [locale];
  }, [locale, defaultLocale]);

  return locales;
}

function EmbeddingFluentProvider({
  resources,
  children,
}: EmbeddedProviderProps) {
  const locales = useLocales();
  const { parseMarkup, staticRef } = useFluentConfig();

  const localization = useMemo(() => {
    return makeEmbeddedLocalizations(resources, locales, parseMarkup || null);
  }, [locales]);

  if (staticRef) {
    let filteredResources = {} as any;

    for (const locale of locales) {
      filteredResources[locale.code] = resources[locale.code];
    }

    staticRef.resources = filteredResources;
  }

  return (
    <LocalizationProvider l10n={localization} children={<>{children}</>} />
  );
}

async function fetchMessages(
  resources: ResourcesArg<RemoteResource>,
  locale: string,
): Promise<[string, string]> {
  const localeResources = resources[locale];
  const messages = await Promise.all(
    localeResources.map(async (l) => {
      const response = await fetch(l.url);
      const messages = await response.text();

      return messages;
    }),
  );

  return [locale, messages.join("\n")];
}

function* lazilyParsedBundles(fetchedMessages: Array<[string, string]>) {
  for (let [locale, messages] of fetchedMessages) {
    let resource = new FluentResource(messages);
    let bundle = new FluentBundle(locale);
    bundle.addResource(resource);
    yield bundle;
  }
}

async function fetchLocalization(
  resources: ResourcesArg<RemoteResource>,
  currentLocales: Array<I18nLocale>,
): Promise<ReactLocalization> {
  let fetchedMessages = await Promise.all(
    currentLocales.map((locale) => fetchMessages(resources, locale.code)),
  );

  let bundles = lazilyParsedBundles(fetchedMessages);

  return new ReactLocalization(bundles);
}

function FetchingFluentProvider({ resources, children }: RemoteProviderProps) {
  const locales = useLocales();
  const { initialResources } = useFluentConfig();
  const initialLocalization = useMemo(() => {
    if (!initialResources) {
      return new ReactLocalization([]);
    }
    return makeEmbeddedLocalizations(initialResources, locales, null);
  }, []);
  const [localization, setLocalization] = useState<ReactLocalization>(
    initialLocalization,
  );

  // TODO: this is super simple fetching logic, should make it more suspense-y
  useEffect(() => {
    if (!initialResources) {
      fetchLocalization(resources, locales).then(setLocalization);
    }
  }, []);

  useEffect(() => {
    const alreadyHaveAllResources = locales.every(locale => {
      return initialResources && Object.keys(initialResources).includes(locale.code)
    })
    if (alreadyHaveAllResources) return;

    fetchLocalization(resources, locales).then(setLocalization);
  }, [locales]);

  return (
    <LocalizationProvider l10n={localization} children={<>{children}</>} />
  );
}

const defaultMode = isServer ? ResourceMode.EMBEDDED : ResourceMode.REMOTE;

export function I18nFluentProvider(props: FluentProviderProps) {
  const _props = { ...props, mode: props.mode || defaultMode };

  if (
    _props.mode === ResourceMode.EMBEDDED ||
    (_props.mode === ResourceMode.AUTO && isServer)
  ) {
    const { resources, children } = props as EmbeddedProviderProps;
    return (
      <EmbeddingFluentProvider
        mode={ResourceMode.EMBEDDED}
        resources={resources}
        children={children}
      />
    );
  } else {
    const { resources, children } = props as RemoteProviderProps;
    return (
      <FetchingFluentProvider
        mode={ResourceMode.REMOTE}
        resources={resources}
        children={children}
      />
    );
  }
}

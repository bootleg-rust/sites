import React, { useMemo, createContext, useContext } from "react";
import { useLocalization } from "@fluent/react";
import { FluentVariable } from "@fluent/bundle";
import { useI18n } from "@ssr-kit/toolbox";
import parse from "html-react-parser";

type LocalizedVarsProp = Record<string, FluentVariable>;

type LocalizedProps = {
  id: string;
  vars?: LocalizedVarsProp;
  attrs?: Record<string, boolean>;
  fallback?: React.ReactNode;
  element?: React.ReactNode;
};

export function useLocalizedMessage(
  id: string,
  {
    vars,
    attrs,
  }: {
    vars?: LocalizedVarsProp;
    attrs?: Record<string, boolean>;
  },
) {
  const { locale } = useI18n();
  const { l10n: localizations } = useLocalization();

  const result = useMemo(() => {

    // TODO: does this need to support getting from multiple bundles?
    const bundle = localizations.getBundle(id);

    if (!bundle) {
      return null;
    }

    const message = bundle.getMessage(id);

    if (!message) {
      return null;
    }

    const errors: Array<Error> = [];
    let formattedMessage: string | null = null;

    if (message.value) {
      formattedMessage = bundle.formatPattern(message.value, vars, errors);
    }

    const formattedAttrs = {} as Record<string, string>;

    if (attrs) {
      const attrsToTranslate = Object.entries(attrs).filter(([, flag]) => flag);
      for (const [attrName] of attrsToTranslate) {
        formattedAttrs[attrName] = bundle.formatPattern(attrName, vars, errors);
      }
    }

    return {
      formattedMessage,
      formattedAttrs,
      errors,
    } as LocalizedContextData;
  }, [attrs, id, locale.code, localizations, vars]);

  return result;
}

type LocalizedContextData = {
  formattedMessage: string | null;
  formattedAttrs: Record<string, string | null>;
  errors: Array<Error>;
};

const LocalizedContext = createContext<LocalizedContextData | null>(null);

export function Localized({
  id,
  vars,
  attrs,
  element,
  fallback,
}: LocalizedProps): React.ReactElement | null {
  const ctx = useLocalizedMessage(id, { vars, attrs });

  console.log(ctx);

  if (attrs || element) {
    return (
      <LocalizedContext.Provider value={ctx}>
        {element}
      </LocalizedContext.Provider>
    );
  }

  const content = ctx?.formattedMessage
    ? parse(ctx?.formattedMessage)
    : fallback;

  return <>{content || id}</>;
}

export function useLocalizedContext() {
  const context = useContext(LocalizedContext);

  if (process.env.NODE_ENV !== "production") {
    if (!context) {
      throw new Error(
        "useErrorReporter must only be called from within an ErrorReporterContext provider",
      );
    }
  }

  return {
    message: context?.formattedMessage,
    attrs: context?.formattedAttrs,
    errors: context?.errors,
  };
}

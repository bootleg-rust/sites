export enum I18nDirection {
  LTR = "ltr",
  RTL = "rtl",
}

export type I18nLocale = {
  code: string;
  name: string;
  direction: I18nDirection;
  emoji: string | null;
  isActive?(): boolean;
};

export type I18nLocales = Map<string, I18nLocale>;

export type I18nData = {
  availableLocales: I18nLocales;
  defaultLocale: I18nLocale;
  locale: I18nLocale;
  basePath: string;
  navigateToLocale(locale: string): void;
};

export type I18nLocaleArg = {
  name: string;
  emoji?: string;
  direction?: I18nDirection;
};

export type I18nAvailableLocalesArg = {
  [code: string]: I18nLocaleArg | string;
};

export type I18nProps = {
  children?: React.ReactNode;
  availableLocales: I18nAvailableLocalesArg;
  defaultLocale: string;
};

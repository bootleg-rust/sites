export type I18nData = {
  supportedLanguages: string[];
  defaultLanguage: string;
  lang: string;
  basePath: string;
  navigateToLanguage(lang: string): void;
};

export type I18nProps = {
  children?: React.ReactNode;
  supportedLanguages: string[];
  defaultLanguage: string;
};

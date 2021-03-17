import { createUseConfig } from "@ssr-kit/toolbox";

export type UniversalConfig = {
  NODE_ENV: string;
  ENV: string;
  SERVICE_NAME: string;
  PACKAGE_VERSION: string;
  SERVICE_INSTANCE_NAME: string;
  SSR_CACHING_DEFAULT_MAX_AGE: number;
  SSR_CACHING_DEFAULT_SHARED_MAX_AGE: number;
  LOCALIZATION_ENABLE_LOCALES: string[];
};

export const useConfig = createUseConfig<UniversalConfig>();

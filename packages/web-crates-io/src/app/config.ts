import { createUseConfig } from "@bootleg-rust/lib-ssr-toolbox/src/config/context";

export type UniversalConfig = {
  NODE_ENV: string;
  ENV: string;
  SERVICE_NAME: string;
  PACKAGE_VERSION: string;
  SERVICE_INSTANCE_NAME: string;
  CRATES_IO_BASEURL: string;
  API_BASEURL: string;
  SSR_CACHING_DEFAULT_MAX_AGE: number;
  SSR_CACHING_DEFAULT_SHARED_MAX_AGE: number;
};

export const useConfig = createUseConfig<UniversalConfig>();

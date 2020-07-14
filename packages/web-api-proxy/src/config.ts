import {
  Config,
  ConfigProvider,
  ServiceDefaults,
  SiteReferences,
  AssetCachingConfigProvider,
} from "@bootleg-rust/lib-config";
import packageJSON from "../package.json";

export const Service = new ConfigProvider({
  schema: {},
  derivedValues: () => {
    return {};
  },
  universalWhitelist: [],
});

export type UniversalConfig = {
  NODE_ENV: string;
  ENV: string;
  SERVICE_NAME: string;
  PACKAGE_VERSION: string;
  SERVICE_INSTANCE_NAME: string;
  CRATES_IO_BASEURL: string;
  API_BASEURL: string;
};

export type ServerConfig = UniversalConfig & {
  ASSET_CACHING_HASHED_DEFAULT_MAX_AGE: number;
  ASSET_CACHING_HASHED_DEFAULT_SHARED_MAX_AGE: number;
  ASSET_CACHING_UNHASHED_DEFAULT_MAX_AGE: number;
  ASSET_CACHING_UNHASHED_DEFAULT_SHARED_MAX_AGE: number;
  PORT: number;
};

const { config, universalConfig } = Config({
  providers: [
    ServiceDefaults,
    Service,
    SiteReferences,
    AssetCachingConfigProvider,
  ],
  packageJSON,
}) as {
  config: ServerConfig;
  universalConfig: UniversalConfig;
};

export { config, universalConfig };

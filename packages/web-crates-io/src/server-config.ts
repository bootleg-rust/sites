import {
  Config,
  ConfigProvider,
  ServiceDefaults,
  SiteReferences,
  SSRCachingConfigProvider,
  AssetCachingConfigProvider,
} from "@bootleg-rust/lib-config";
import packageJSON from "../package.json";
import { UniversalConfig } from "./app/config";

export const Service = new ConfigProvider({
  schema: {},
  derivedValues: () => {
    return {};
  },
  universalWhitelist: [],
});

export type ServerConfig = UniversalConfig & {
  ASSET_CACHING_HASHED_DEFAULT_MAX_AGE: number;
  ASSET_CACHING_HASHED_DEFAULT_SHARED_MAX_AGE: number;
  ASSET_CACHING_UNHASHED_DEFAULT_MAX_AGE: number;
  ASSET_CACHING_UNHASHED_DEFAULT_SHARED_MAX_AGE: number;
  SSR_CACHING_MAXIMUM_MAX_AGE: number;
  SSR_CACHING_MAXIMUM_SHARED_MAX_AGE: number;
  PORT: number;
};

const { config, universalConfig } = Config({
  providers: [
    ServiceDefaults,
    Service,
    SiteReferences,
    SSRCachingConfigProvider,
    AssetCachingConfigProvider,
  ],
  packageJSON,
}) as {
  config: ServerConfig;
  universalConfig: UniversalConfig;
};

export { config, universalConfig };

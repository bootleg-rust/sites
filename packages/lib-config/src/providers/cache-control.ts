import { num } from "envalid";
import { CacheFor } from "@bootleg-rust/lib-ssr-toolbox";
import { ConfigProvider } from "../config";

export const AssetCachingConfigProvider = new ConfigProvider({
  schema: {
    ASSET_CACHING_HASHED_DEFAULT_MAX_AGE: num({ default: CacheFor.OneWeek }),
    ASSET_CACHING_HASHED_DEFAULT_SHARED_MAX_AGE: num({
      default: CacheFor.OneCalendarYear,
    }),
    ASSET_CACHING_UNHASHED_DEFAULT_MAX_AGE: num({
      default: CacheFor.FiveMinutes,
    }),
    ASSET_CACHING_UNHASHED_DEFAULT_SHARED_MAX_AGE: num({
      default: CacheFor.ThirtyMinutes,
    }),
  },
  derivedValues: () => {
    return {};
  },
  universalWhitelist: [] as const,
});

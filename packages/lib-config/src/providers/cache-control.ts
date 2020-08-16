import { num } from "envalid";
import { CacheFor } from "@bootleg-rust/lib-ssr-toolbox";
import { ConfigProvider } from "../config";

export const AssetCachingConfigProvider = new ConfigProvider({
  schema: {
    ASSET_CACHING_HASHED_DEFAULT_MAX_AGE: num({ default: CacheFor.FourWeeks }),
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

export const SSRCachingConfigProvider = new ConfigProvider({
  schema: {
    SSR_CACHING_DEFAULT_MAX_AGE: num({
      default: CacheFor.FiveMinutes,
    }),
    SSR_CACHING_DEFAULT_SHARED_MAX_AGE: num({
      default: CacheFor.ThirtyMinutes,
    }),
    SSR_CACHING_MAXIMUM_MAX_AGE: num({
      default: CacheFor.OneWeek,
    }),
    SSR_CACHING_MAXIMUM_SHARED_MAX_AGE: num({
      default: CacheFor.OneCalendarYear,
    }),
  },
  derivedValues: () => {
    return {};
  },
  universalWhitelist: [
    "SSR_CACHING_DEFAULT_MAX_AGE",
    "SSR_CACHING_DEFAULT_SHARED_MAX_AGE",
  ] as const,
});

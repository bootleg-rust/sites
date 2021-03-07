import { CacheFor } from "@ssr-kit/toolbox";

export type CacheControlSettings = {
  maxAge: number;
  sharedMaxAge: number;
};

export const defaultSsrCacheControlMaximums: CacheControlSettings = {
  maxAge: CacheFor.OneWeek,
  sharedMaxAge: CacheFor.OneCalendarYear,
};

export type AssetCacheControlConfig = {
  hashed: CacheControlSettings;
  notHashed: CacheControlSettings;
};
export type SSRCacheControlMaximums = CacheControlSettings;

export const defaultAssetCacheControl: AssetCacheControlConfig = {
  hashed: {
    maxAge: CacheFor.OneDay,
    sharedMaxAge: CacheFor.OneWeek,
  },
  notHashed: {
    maxAge: CacheFor.FiveMinutes,
    sharedMaxAge: CacheFor.ThirtyMinutes,
  },
};

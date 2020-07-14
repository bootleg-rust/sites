import { CacheFor } from "@bootleg-rust/lib-ssr-toolbox";

export type CacheControlSettings = {
  maxAge: number;
  sMaxAge: number;
};

export type AssetCacheControlConfig = {
  hashed: CacheControlSettings;
  notHashed: CacheControlSettings;
};

export const defaultAssetCacheControl: AssetCacheControlConfig = {
  hashed: {
    maxAge: CacheFor.OneDay,
    sMaxAge: CacheFor.OneWeek,
  },
  notHashed: {
    maxAge: CacheFor.FiveMinutes,
    sMaxAge: CacheFor.ThirtyMinutes,
  },
};

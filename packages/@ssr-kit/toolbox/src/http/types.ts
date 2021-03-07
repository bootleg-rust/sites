export type HttpContextData = {
  cacheControl: CacheControlOptions[];
  statusCode: number;
  redirectLocation?: string;
};

export type CacheControlOptions = {
  // flags
  private?: true;
  public?: true;
  noStore?: true;
  noCache?: true;
  noTransform?: true;
  mustRevalidate?: true;
  proxyRevalidate?: true;
  immutable?: true;
  // Values
  staleIfError?: number;
  staleWhileRevalidate?: number;
  maxAge?: number;
  sharedMaxAge?: number;
};

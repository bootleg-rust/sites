import React, { useContext } from "react";
import { HttpContext } from "./context";
import { CacheControlOptions, HttpContextData } from "./types";

function anyPresent(...values: any[]) {
  for (const value of values) {
    if (typeof value !== "undefined") return true;
  }
  return false;
}

function lowestInteger(...numbers: Array<number | undefined>) {
  const integers = numbers.filter((num) =>
    Number.isInteger(num as number),
  ) as number[];
  if (integers.length < 1) return;
  return Math.min(...integers);
}

// prettier-ignore
export function reconcileCacheControlOptions(ctx: HttpContextData): CacheControlOptions {
  // eslint-disable-next-line unicorn/no-reduce
  return ctx.cacheControl.reduce((acc, current) => {
    // Flags
    if (anyPresent(acc.private, current.private)) acc.private = true;
    if (anyPresent(acc.public, current.public)) acc.public = true;
    if (anyPresent(acc.noStore, current.noStore)) acc.noStore = true;
    if (anyPresent(acc.noCache, current.noCache)) acc.noCache = true;
    if (anyPresent(acc.noTransform, current.noTransform)) acc.noTransform = true;
    if (anyPresent(acc.mustRevalidate, current.mustRevalidate)) acc.mustRevalidate = true;
    if (anyPresent(acc.proxyRevalidate, current.proxyRevalidate)) acc.proxyRevalidate = true;
    if (anyPresent(acc.immutable, current.immutable)) acc.immutable = true;

    // Values
    if (anyPresent(acc.staleIfError, current.staleIfError)) acc.staleIfError = lowestInteger(acc.staleIfError, current.staleIfError);
    if (anyPresent(acc.staleWhileRevalidate, current.staleWhileRevalidate)) acc.staleWhileRevalidate = lowestInteger(acc.staleWhileRevalidate, current.staleWhileRevalidate);
    if (anyPresent(acc.maxAge, current.maxAge)) acc.maxAge = lowestInteger(acc.maxAge, current.maxAge);
    if (anyPresent(acc.sharedMaxAge, current.sharedMaxAge)) acc.sharedMaxAge = lowestInteger(acc.sharedMaxAge, current.sharedMaxAge);
    return acc
  }, {});
}

export function CacheControl({
  children,
  ...cacheControlOptions
}: { children?: React.ReactNode } & CacheControlOptions) {
  const ctx = useContext(HttpContext);
  // TODO: This might not work properly with suspense, figure out how to prevent adding
  // a new item for renders that aren't "committed"
  ctx?.cacheControl.push(cacheControlOptions);
  return <>{children}</>;
}

const OneMinute = 60;
const OneHour = OneMinute * 60;
const OneDay = OneHour * 24;
const OneWeek = OneDay * 7;

const FiveMinutes = OneMinute * 5;
const ThirtyMinutes = OneMinute * 30;

const FourWeeks = OneWeek * 4;

const OneCalendarYear = OneDay * 365;

export const CacheFor = {
  OneMinute,
  OneHour,
  OneDay,
  OneWeek,
  FiveMinutes,
  ThirtyMinutes,
  FourWeeks,
  OneCalendarYear,
};

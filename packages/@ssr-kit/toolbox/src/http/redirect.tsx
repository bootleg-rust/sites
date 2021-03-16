import React, { useContext } from "react";

import { Navigate, NavigateProps, useResolvedPath } from "react-router";
import { isServer } from "../is-client-server";
import { HttpContext } from "./context";

export interface RedirectProps {
  movedPermanently?: boolean;
}

export function Redirect({
  movedPermanently,
  ...navigateProps
}: NavigateProps & RedirectProps) {
  const ctx = useContext(HttpContext);
  const resolvedPath = useResolvedPath(navigateProps.to);

  if (ctx) {
    // TODO: This might not work properly with suspense, figure out how to prevent adding
    // a new item for renders that aren't "committed"
    ctx.redirectPath = resolvedPath;
    if (movedPermanently) {
      ctx.statusCode.push(301);
    }
  }

  if (isServer) {
    return null;
  }

  return <Navigate {...navigateProps} />;
}

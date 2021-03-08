import React, { useContext } from "react";

import { Navigate, NavigateProps, useResolvedPath } from "react-router";
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
      ctx.statusCode = 301;
    }
  }

  return <Navigate {...navigateProps} />;
}

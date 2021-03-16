import React, { useContext } from "react";
import { HttpContext } from "./context";

export function HttpStatus({
  code,
  children,
}: {
  code: number;
  children?: React.ReactNode;
}) {
  // TODO: This might not work properly with suspense, figure out how to prevent adding
  // a new item for renders that aren't "committed"
  const ctx = useContext(HttpContext);
  if (ctx) ctx.statusCode.push(code);
  return <>{children}</>;
}

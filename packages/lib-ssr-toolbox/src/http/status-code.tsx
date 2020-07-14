import React from "react";
import { Route } from "react-router";

export function HttpStatus({
  code,
  children,
}: {
  code: number;
  children?: React.ReactNode;
}) {
  return (
    <Route
      render={({ staticContext }) => {
        const c = staticContext as any;
        if (c) c.status = code;
        return children;
      }}
    />
  );
}

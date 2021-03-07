import { useContext, useEffect } from "react";
import { useHistory, useRouteMatch, generatePath } from "react-router";
import { createLocation, LocationDescriptor } from "history";
import { HttpContext } from "./context";

export interface RedirectProps {
  to: LocationDescriptor;
  push?: boolean;
  movedPermanently?: boolean;
}

export function Redirect({ to, push, movedPermanently }: RedirectProps): null {
  const ctx = useContext(HttpContext);
  const history = useHistory();
  const match = useRouteMatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const method = push ? history.push : history.replace;
  /* eslint-disable unicorn/no-nested-ternary */
  const location = createLocation(
    match
      ? typeof to === "string"
        ? generatePath(to, match.params)
        : {
            ...to,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            pathname: generatePath(to.pathname!, match.params),
          }
      : to,
  );
  /* eslint-enable unicorn/no-nested-ternary */

  useEffect(() => {
    const method = push ? history.push : history.replace;
    method(location);
  }, [push, history, location]);

  if (ctx) {
    // TODO: This might not work properly with suspense, figure out how to prevent adding
    // a new item for renders that aren't "committed"
    ctx.redirectLocation = history.createHref(location);
    if (movedPermanently) {
      ctx.statusCode = 301;
    }
  }

  return null;
}

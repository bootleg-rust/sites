import React from "react";
import { createPath } from "history";
import {
  LinkProps,
  useLocation,
  useNavigate,
  useHref,
  useResolvedPath,
} from "react-router-dom";
import { Anchor } from "@bootleg-rust/design-system";

function isModifiedEvent(event: React.MouseEvent) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

/**
 * TODO: copied from react-router-dom <Link /> because it doesn't support providing an alternate
 * base component (<Anchor /> instead of <a />).
 */
export const SiteLink = React.forwardRef<
  HTMLAnchorElement,
  LinkProps & React.ComponentProps<typeof Anchor>
>(function LinkWithRef(
  { onClick, replace: replaceProp = false, state, target, to, ...rest },
  ref,
) {
  const href = useHref(to);
  const navigate = useNavigate();
  const location = useLocation();
  const path = useResolvedPath(to);

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (onClick) onClick(event);
    if (
      !event.defaultPrevented && // onClick prevented default
      event.button === 0 && // Ignore everything but left clicks
      (!target || target === "_self") && // Let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // Ignore clicks with modifier keys
    ) {
      event.preventDefault();

      // If the URL hasn't changed, a regular <a> will do a replace instead of
      // a push, so do the same here.
      const replace =
        !!replaceProp || createPath(location) === createPath(path);

      navigate(to, { replace, state });
    }
  }

  return (
    <Anchor
      {...rest}
      href={href}
      onClick={handleClick}
      ref={ref}
      target={target}
    />
  );
});

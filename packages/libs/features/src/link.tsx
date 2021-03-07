import React from "react";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import { Anchor } from "@bootleg-rust/design-system";

type LinkAnchorProps = {
  shouldNavigate?: boolean;
  navigate(): void;
} & React.ComponentProps<typeof Anchor>;

const SiteAnchor = React.forwardRef<HTMLAnchorElement, LinkAnchorProps>(
  function _SiteAnchor(props: any, ref: any) {
    const { navigate, shouldNavigate, ...passthrough } = props;
    return (
      <Anchor
        ref={ref}
        onClick={(e: any) => {
          e.preventDefault();
          if (shouldNavigate) {
            navigate();
          }
        }}
        {...passthrough}
      />
    );
  },
);

// SiteLink alias of react-router-com <Link /> except it defaults to using the <Anchor />
// tag in the copmponent library
type Props = React.ComponentProps<typeof Anchor> &
  React.ComponentProps<typeof ReactRouterLink>;

export function SiteLink(props: Props) {
  const { Component = SiteAnchor, ...passthrough } = props;
  const location = useLocation();
  // TODO: should make this work if you pass other valid props as the
  // `to` value not just strings.
  const shouldNavigate = props.to !== location.pathname;
  return (
    <ReactRouterLink
      component={Component}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      shouldNavigate={shouldNavigate}
      {...passthrough}
    />
  );
}

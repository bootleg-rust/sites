// import { Cubes, FormSearch, Github } from "grommet-icons";
import React from "react";
import { styled, H4 } from "@bootleg-rust/lib-design-system";
import { flx } from "@pseudo-su/flex-elements";
import { SiteLink } from "@bootleg-rust/lib-features";
// import { ReactComponent as RustLogo } from "./rust-logo-blk.svg";

const ProfileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const HeaderSearch = styled(flx.div)`
  border: 1px solid black;
  padding: 4px;
  padding-left: 8px;
  position: relative;
  top: 1px;
`;

function Header() {
  return (
    <flx.div direction="row">
      <SiteLink flex justify="center" alignItems="center" to="/">
        {/* <RustLogo style={{ minWidth: 60 }} /> */}
        <H4>bootleg-crates.io</H4>
      </SiteLink>
      <HeaderSearch justify="center" grow>
        <flx.span block>🔍</flx.span>
      </HeaderSearch>
      <flx.div justify="center" alignItems="center">
        <ProfileImage src={"https://github.com/pseudo-su.png"} alt="gravatar" />
      </flx.div>
    </flx.div>
  );
}

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <flx.div>
      <Header />
      <flx.div style={{ margin: "0 auto" }}>
        <flx.div direction="row">
          <SiteLink to="/">dashboard</SiteLink> |
          <SiteLink to="/crates">query</SiteLink> |
          <SiteLink to="/crates/explore">explore</SiteLink> |
          <SiteLink to="/crates/user/123">user 123</SiteLink> |
          <SiteLink to="/crates/team/123">team 123</SiteLink> |
          <SiteLink to="/crates/123">crate 123</SiteLink>
        </flx.div>
        {children}
      </flx.div>
    </flx.div>
  );
}

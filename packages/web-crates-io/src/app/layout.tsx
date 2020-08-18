// import { Cubes, FormSearch, Github } from "grommet-icons";
import React from "react";
import { Link } from "react-router-dom";
import { styled, Div, H4, Span, Anchor } from "@bootleg-rust/lib-design-system";
// import { ReactComponent as RustLogo } from './rust-logo-blk.svg';

function SiteLink(
  props: React.ComponentProps<Link> & React.ComponentProps<typeof Anchor>,
) {
  return <Link component={Anchor} {...props} />;
}

const ProfileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const HeaderSearch = styled(Div)`
  border: 1px solid black;
  padding: 4px;
  padding-left: 8px;
  position: relative;
  top: 1px;
`;

function Header() {
  return (
    <Div direction="row">
      <SiteLink flex justify="center" alignItems="center" to="/">
        {/* <RustLogo style={{ minWidth: 60 }} /> */}
        <H4>bootleg-crates.io</H4>
      </SiteLink>
      <HeaderSearch justify="center" grow>
        <Span block>🔍</Span>
      </HeaderSearch>
      <Div justify="center" alignItems="center">
        <ProfileImage src={"http://github.com/pseudo-su.png"} alt="gravatar" />
      </Div>
    </Div>
  );
}

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <Div>
      <Header />
      <Div style={{ margin: "0 auto" }}>
        <Div direction="row">
          <Link to="/">dashboard</Link> |<Link to="/crates">query</Link> |
          <Link to="/crates/explore">explore</Link> |
          <Link to="/crates/user/123">user 123</Link> |
          <Link to="/crates/team/123">team 123</Link> |
          <Link to="/crates/123">crate 123</Link>
        </Div>
        {children}
      </Div>
    </Div>
  );
}

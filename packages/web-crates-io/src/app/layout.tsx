// import { Cubes, FormSearch, Github } from "grommet-icons";
import React from "react";
import { Link } from "react-router-dom";
import { H4 } from "@bootleg-rust/lib-design-system";
// import { ReactComponent as RustLogo } from './rust-logo-blk.svg';

function Header() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        paddingLeft: 6,
        paddingRight: 6,
        borderBottom: "1px solid black",
        marginBottom: 16,
      }}
    >
      <Link
        to="/"
        style={{ minWidth: 250, textDecoration: "none", color: "black" }}
      >
        {/* <RustLogo style={{ minWidth: 60 }} /> */}
        <H4>bootleg-crates.io</H4>
      </Link>
      <div
        style={{
          flex: 1,
          margin: "auto",
          border: "1px solid black",
          borderRadius: 4,
          padding: 4,
          marginRight: 20,
        }}
      >
        <span style={{ paddingLeft: 8, position: "relative", top: 1 }}>🔍</span>
      </div>
      <div style={{ margin: "auto" }}>
        <img
          style={{ width: 36, height: 36, borderRadius: "50%" }}
          src={"http://github.com/pseudo-su.png"}
          alt="gravatar"
        />
      </div>
    </div>
  );
}

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div style={{ margin: "0 auto" }}>
        <div>
          <Link to="/">dashboard</Link> |<Link to="/crates">query</Link> |
          <Link to="/crates/explore">explore</Link> |
          <Link to="/crates/user/123">user 123</Link> |
          <Link to="/crates/team/123">team 123</Link> |
          <Link to="/crates/123">crate 123</Link>
        </div>
        {children}
      </div>
    </div>
  );
}

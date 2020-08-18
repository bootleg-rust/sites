import React from "react";
import { useRouteMatch } from "react-router";
import {
  css,
  Nav,
  Div,
  Anchor,
  Span,
  List,
} from "@bootleg-rust/lib-design-system";
import { LanguageSelect } from "./_language-select";
import rustLogoSvg from "./rust-logo-blk.svg";

const navLogoCss = css`
  img {
    width: 80px;
  }
  ${Span} {
    font-family: ${({ theme }) => theme.fontFamily.hero.join(", ")};
    font-size: ${({ theme }) => theme.fontSize["5xl"]};
  }

  @media ${({ theme }) => theme.media.large} {
    justify-content: flex-start;
  }
`;

function NavLogo({ children }: { children?: React.ReactNode }) {
  const match = useRouteMatch<{ lang?: string }>();
  const href = `/${
    match.params.lang === "en-US" ? "" : match.params.lang || ""
  }`;
  return (
    <Div grow={1} css={navLogoCss} direction="row" justify="center">
      <Anchor href={href} flex direction="row" alignItems="center">
        <img alt="Rust Logo" src={rustLogoSvg} />
        <Span flex direction="column" justify="center">
          {children}
        </Span>
      </Anchor>
    </Div>
  );
}

const linksCss = css`
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;

  text-align: center;

  margin-top: ${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  padding-top: ${({ theme }) => theme.spacing[2]};
  padding-bottom: ${({ theme }) => theme.spacing[2]};

  ${List.Item} {
    flex-basis: 20%;
    justify-content: center;
    color: #2a3439;
    text-decoration: underline;

    padding: ${({ theme }) => theme.spacing[2]};
    ${Anchor} {
      padding-bottom: 0;
    }
  }

  @media ${({ theme }) => theme.media.notSmall} {
    padding-left: ${({ theme }) => theme.spacing[8]};
    padding-right: ${({ theme }) => theme.spacing[8]};

    ${List.Item} {
      flex-basis: 0;
      padding-left: ${({ theme }) => theme.spacing[8]};
      padding-right: ${({ theme }) => theme.spacing[8]};
    }
  }

  @media ${({ theme }) => theme.media.large} {
    justify-content: flex-end;
  }
`;

function NavLinks() {
  return (
    <List ordered css={linksCss}>
      <List.Item>
        <Anchor href="/tools/install" flex>
          Install
        </Anchor>
      </List.Item>
      <List.Item>
        <Anchor href="/learn" flex>
          Learn
        </Anchor>
      </List.Item>
      <List.Item>
        <Anchor href="https://play.rust-lang.org/" flex>
          Playground
        </Anchor>
      </List.Item>
      <List.Item>
        <Anchor href="/tools" flex>
          Tools
        </Anchor>
      </List.Item>
      <List.Item>
        <Anchor href="/governance" flex>
          Governance
        </Anchor>
      </List.Item>
      <List.Item>
        <Anchor href="/community" flex>
          Community
        </Anchor>
      </List.Item>
      <List.Item>
        <Anchor href="https://blog.rust-lang.org/" flex>
          Blog
        </Anchor>
      </List.Item>
    </List>
  );
}

export function TopNav({
  title,
  onSelectLanguage,
}: {
  title: React.ReactNode;
  onSelectLanguage(locale: string): void;
}) {
  return (
    <Nav
      css={css`
        ._lang-select {
          justify-content: center;
        }
        @media ${({ theme }) => theme.media.notSmall} {
          padding: ${({ theme }) => theme.spacing[4]};
          padding-top: 0;
        }
        @media ${({ theme }) => theme.media.large} {
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: flex-end;
          padding: ${({ theme }) => theme.spacing[4]};
          padding-top: 0;

          ._lang-select {
            justify-content: flex-end;
          }
        }
      `}
    >
      <NavLogo>{title}</NavLogo>
      <NavLinks />
      <LanguageSelect
        onChange={(e) => onSelectLanguage(e.target.value)}
        className="_lang-select"
      />
    </Nav>
  );
}

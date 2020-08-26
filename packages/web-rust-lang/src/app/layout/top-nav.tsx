import React from "react";
import { useRouteMatch } from "react-router";
import {
  css,
  Nav,
  Div,
  Anchor,
  Span,
  UnorderedList,
  ListItem,
} from "@bootleg-rust/lib-design-system";
import { SiteLink } from "@bootleg-rust/lib-features";
import { LanguageSelect } from "./_language-select";
import rustLogoSvg from "./rust-logo-blk.svg";

const navLogoCss = css`
  img {
    width: 80px;
    max-width: 80px;
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
      <SiteLink to={href} flex direction="row" alignItems="center">
        <img alt="Rust Logo" src={rustLogoSvg} />
        <Span flex direction="column" justify="center">
          {children}
        </Span>
      </SiteLink>
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

  ${ListItem} {
    justify-content: center;
    text-decoration: underline;
    flex-basis: 20%;
    color: ${({ theme }) => theme.colors.textMuted.var};

    padding: ${({ theme }) => theme.spacing[2]};
    ${Anchor} {
      padding-bottom: 0;
    }
  }

  @media ${({ theme }) => theme.media.notSmall} {
    padding-left: ${({ theme }) => theme.spacing[8]};
    padding-right: ${({ theme }) => theme.spacing[8]};

    ${ListItem} {
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
    <UnorderedList css={linksCss}>
      <ListItem>
        <SiteLink to="/tools/install" flex>
          Install
        </SiteLink>
      </ListItem>
      <ListItem>
        <SiteLink to="/learn" flex>
          Learn
        </SiteLink>
      </ListItem>
      <ListItem>
        <Anchor href="https://play.rust-lang.org/" flex>
          Playground
        </Anchor>
      </ListItem>
      <ListItem>
        <SiteLink to="/tools" flex>
          Tools
        </SiteLink>
      </ListItem>
      <ListItem>
        <SiteLink to="/governance" flex>
          Governance
        </SiteLink>
      </ListItem>
      <ListItem>
        <SiteLink to="/community" flex>
          Community
        </SiteLink>
      </ListItem>
      <ListItem>
        <Anchor href="https://blog.rust-lang.org/" flex>
          Blog
        </Anchor>
      </ListItem>
    </UnorderedList>
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

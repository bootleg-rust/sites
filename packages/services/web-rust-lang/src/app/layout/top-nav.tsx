import React from "react";
import {
  css,
  Anchor,
  UnorderedList,
  ListItem,
} from "@bootleg-rust/design-system";
import { flx } from "@pseudo-su/flex-elements";
import {
  SiteLink,
  Localized,
  useLocalizedMessage,
} from "@bootleg-rust/features";
import { LanguageSelect } from "./_language-select";
import rustLogoSvg from "./rust-logo-blk.svg";

const navLogoCss = css`
  img {
    width: 80px;
    max-width: 80px;
  }
  ${flx.span} {
    font-family: ${({ theme }) => theme.fontFamily.hero.join(", ")};
    font-size: ${({ theme }) => theme.fontSize["5xl"]};
  }

  ${Anchor} {
    color: ${({ theme }) => theme.colors.text.var};
    text-decoration: none;
  }

  @media ${({ theme }) => theme.media.large} {
    justify-content: flex-start;
  }
`;

function NavLogo({ children }: { children?: React.ReactNode }) {
  const logoAltText = useLocalizedMessage("nav-logo-alt", {});
  return (
    <flx.div grow={1} css={navLogoCss} direction="row" justify="center">
      <SiteLink to="." flex direction="row" alignItems="center">
        <img alt={logoAltText?.formattedMessage || ""} src={rustLogoSvg} />
        <flx.span flex direction="column" justify="center">
          {children}
        </flx.span>
      </SiteLink>
    </flx.div>
  );
}

const linksCss = css`
  white-space: nowrap;
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

    padding: ${({ theme }) => theme.spacing[2]};
    ${Anchor} {
      color: ${({ theme }) => theme.colors.textMuted.var};
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
        <SiteLink to="./tools/install" flex>
          <Localized id="nav-install" />
        </SiteLink>
      </ListItem>
      <ListItem>
        <SiteLink to="./learn" flex>
          <Localized id="nav-learn" />
        </SiteLink>
      </ListItem>
      <ListItem>
        <Anchor href="https://play.rust-lang.org/" flex>
          <Localized id="nav-playground" />
        </Anchor>
      </ListItem>
      <ListItem>
        <SiteLink to="./tools" flex>
          <Localized id="nav-tools" />
        </SiteLink>
      </ListItem>
      <ListItem>
        <SiteLink to="./governance" flex>
          <Localized id="nav-governance" />
        </SiteLink>
      </ListItem>
      <ListItem>
        <SiteLink to="./community" flex>
          <Localized id="nav-community" />
        </SiteLink>
      </ListItem>
      <ListItem>
        <Anchor href="https://blog.rust-lang.org/" flex>
          <Localized id="nav-blog" />
        </Anchor>
      </ListItem>
    </UnorderedList>
  );
}

export function TopNav({
  title,
  onSelectLocale,
}: {
  title: React.ReactNode;
  onSelectLocale(locale: string): void;
}) {
  return (
    <flx.nav
      css={css`
        ._lang-select {
          justify-content: center;
        }
        @media ${({ theme }) => theme.media.notSmall} {
          padding: 0 ${({ theme }) => theme.spacing[4]};
        }
        @media ${({ theme }) => theme.media.large} {
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: flex-end;
          padding: 0 ${({ theme }) => theme.spacing[4]};

          ._lang-select {
            justify-content: flex-end;
          }
        }
      `}
    >
      <NavLogo>{title}</NavLogo>
      <NavLinks />
      <LanguageSelect
        onChange={(e) => onSelectLocale(e.target.value)}
        className="_lang-select"
      />
    </flx.nav>
  );
}

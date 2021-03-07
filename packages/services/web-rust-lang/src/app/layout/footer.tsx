import React from "react";
import {
  styled,
  css,
  Anchor,
  UnorderedList,
  ListItem,
  H4,
} from "@bootleg-rust/design-system";
import { flx } from "@pseudo-su/flex-elements";
import { SiteLink } from "@bootleg-rust/features";
import { PageCentered } from "../sections";
import { LanguageSelect } from "./_language-select";

import discordLogo from "./discord.svg";
import githubLogo from "./github.svg";
import twitterLogo from "./twitter.svg";
import youtubeLogo from "./youtube.svg";

const footerCss = css`
  padding-bottom: ${({ theme }) => theme.spacing[16]};
  color: ${({ theme }) => theme.colors.invertedText.var};
  background-color: ${({ theme }) => theme.colors.invertedBackground.var};

  ._bottom-text {
    text-align: center;
  }

  ${Anchor} {
    color: ${({ theme }) => theme.colors.invertedAccent.var};
  }
`;

const FooterContent = styled(PageCentered)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[8]};

  & > *:not(:last-child) {
    min-width: 260px;
    flex-basis: 20%;
    flex-grow: 1;
  }
  & > *:last-child {
    flex-basis: 100px;
  }
`;

export function SiteFooter({
  onSelectLanguage,
}: {
  onSelectLanguage(locale: string): void;
}) {
  return (
    <flx.footer css={footerCss}>
      <FooterContent>
        <GetHelp onSelectLanguage={onSelectLanguage} />
        <TermsAndPolicies />
        <SocialIcons />
      </FooterContent>
      <flx.div className="_bottom-text" alignItems="center" justify="center">
        <flx.div block>
          <flx.span>Maintained by the Rust Team. See a bug? </flx.span>
          <Anchor
            css={`
              white-space: nowrap;
            `}
            href="https://github.com/rust-lang/www.rust-lang.org/issues/new/choose"
          >
            File an issue!
          </Anchor>
        </flx.div>
        <flx.div block>
          Looking for the{" "}
          <Anchor href="https://prev.rust-lang.org">previous website</Anchor>?
        </flx.div>
      </flx.div>
    </flx.footer>
  );
}

const FooterColumn = styled(flx.div)`
  ${H4} {
    font-size: ${({ theme }) => theme.fontSize["3xl"]};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    margin-bottom: ${({ theme }) => theme.spacing["8"]};
  }

  ${ListItem} {
    font-size: ${({ theme }) => theme.fontSize["2xl"]};
    line-height: ${({ theme }) => theme.lineHeight.loose};
  }
`;

type SocialIconProps = {
  imageUrl: string;
  socialUrl: string;
  alt: string;
  title: string;
};

const SocialIconAnchor = styled(Anchor)`
  img {
    width: 40px;
  }
`;

function SocialIcon({ socialUrl, imageUrl, alt, title }: SocialIconProps) {
  return (
    <SocialIconAnchor href={socialUrl}>
      <img src={imageUrl} alt={alt} title={title} />
    </SocialIconAnchor>
  );
}

function GetHelp({
  onSelectLanguage,
}: {
  onSelectLanguage(locale: string): void;
}) {
  return (
    <FooterColumn grow>
      <H4>Get help!</H4>
      <UnorderedList>
        <ListItem>
          <SiteLink to="/learn">Documentation</SiteLink>
        </ListItem>
        <ListItem>
          <Anchor href="http://forge.rust-lang.org">
            Rust Forge (Contributor Documentation)
          </Anchor>
        </ListItem>
        <ListItem>
          <Anchor href="https://users.rust-lang.org">
            Ask a Question on the Users Forum
          </Anchor>
        </ListItem>
        <ListItem>
          <Anchor href="http://ping.rust-lang.org">Check Website Status</Anchor>
        </ListItem>
      </UnorderedList>
      <LanguageSelect onChange={(e) => onSelectLanguage(e.target.value)} />
    </FooterColumn>
  );
}

function TermsAndPolicies() {
  return (
    <FooterColumn grow>
      <H4>Terms and policies</H4>
      <UnorderedList>
        <ListItem>
          <SiteLink to="/policies/code-of-conduct">Code of Conduct</SiteLink>
        </ListItem>
        <ListItem>
          <SiteLink to="/policies/licenses">Licenses</SiteLink>
        </ListItem>
        <ListItem>
          <SiteLink to="/policies/media-guide">
            Logo Policy and Media Guide
          </SiteLink>
        </ListItem>
        <ListItem>
          <SiteLink to="/policies/security">Security Disclosures</SiteLink>
        </ListItem>
        <ListItem>
          <SiteLink to="/policies/privacy">Privacy Notice</SiteLink>
        </ListItem>
        <ListItem>
          <SiteLink to="/policies">All Policies</SiteLink>
        </ListItem>
      </UnorderedList>
    </FooterColumn>
  );
}

function SocialIcons() {
  return (
    <FooterColumn grow>
      <H4>Social</H4>
      <flx.div direction="row" wrap gap="1.6rem">
        <SocialIcon
          socialUrl="https://twitter.com/rustlang"
          imageUrl={twitterLogo}
          alt="twitter logo"
          title="Twitter"
        />
        <SocialIcon
          socialUrl="https://www.youtube.com/channel/UCaYhcUwRBNscFNUKTjgPFiA"
          imageUrl={youtubeLogo}
          alt="youtube logo"
          title="YouTube"
        />
        <SocialIcon
          socialUrl="https://discord.gg/rust-lang"
          imageUrl={discordLogo}
          alt="discord logo"
          title="Discord"
        />
        <SocialIcon
          socialUrl="https://github.com/rust-lang"
          imageUrl={githubLogo}
          alt="github logo"
          title="GitHub"
        />
      </flx.div>
    </FooterColumn>
  );
}

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
import {
  SiteLink,
  Localized,
  useLocalizedString,
} from "@bootleg-rust/features";
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
  onSelectLocale,
}: {
  onSelectLocale(locale: string): void;
}) {
  return (
    <flx.footer css={footerCss}>
      <FooterContent>
        <GetHelp onSelectLocale={onSelectLocale} />
        <TermsAndPolicies />
        <SocialIcons />
      </FooterContent>
      <flx.div className="_bottom-text" alignItems="center" justify="center">
        <flx.div block>
          {/* TODO: check this */}
          <Localized id="footer-attribution" />
          {/* <flx.span>Maintained by the Rust Team. See a bug? </flx.span>
          <Anchor
            css={`
              white-space: nowrap;
            `}
            href="https://github.com/rust-lang/www.rust-lang.org/issues/new/choose"
          >
            File an issue!
          </Anchor> */}
        </flx.div>
        <flx.div block>
          {/* TODO: check this */}
          <Localized id="footer-old-site" />
          {/* Looking for the{" "}
          <Anchor href="https://prev.rust-lang.org">previous website</Anchor>? */}
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

function GetHelp({ onSelectLocale }: { onSelectLocale(locale: string): void }) {
  return (
    <FooterColumn grow>
      <H4>
        <Localized id="footer-get-help" />
      </H4>
      <UnorderedList>
        <ListItem>
          <SiteLink to="./learn">
            <Localized id="footer-doc" />
          </SiteLink>
        </ListItem>
        <ListItem>
          <Anchor href="http://forge.rust-lang.org">
            <Localized id="footer-sup-doc" />
          </Anchor>
        </ListItem>
        <ListItem>
          <Anchor href="https://users.rust-lang.org">
            <Localized id="footer-ask" />
          </Anchor>
        </ListItem>
        <ListItem>
          <Anchor href="http://ping.rust-lang.org">
            <Localized id="footer-status" />
          </Anchor>
        </ListItem>
      </UnorderedList>
      <LanguageSelect onChange={(e) => onSelectLocale(e.target.value)} />
    </FooterColumn>
  );
}

function TermsAndPolicies() {
  return (
    <FooterColumn grow>
      <H4>
        <Localized id="footer-policies" />
      </H4>
      <UnorderedList>
        <ListItem>
          <SiteLink to="./policies/code-of-conduct">
            <Localized id="footer-coc" />
          </SiteLink>
        </ListItem>
        <ListItem>
          <SiteLink to="./policies/licenses">
            <Localized id="footer-licenses" />
          </SiteLink>
        </ListItem>
        <ListItem>
          <SiteLink to="./policies/media-guide">
            <Localized id="footer-media" />
          </SiteLink>
        </ListItem>
        <ListItem>
          <SiteLink to="./policies/security">
            <Localized id="footer-security" />
          </SiteLink>
        </ListItem>
        <ListItem>
          <SiteLink to="./policies/privacy">
            <Localized id="policies-privacy-link" />
          </SiteLink>
        </ListItem>
        <ListItem>
          <SiteLink to="./policies">
            <Localized id="footer-policies-all" />
          </SiteLink>
        </ListItem>
      </UnorderedList>
    </FooterColumn>
  );
}

function SocialIcons() {
  // NOTE: these aren't properly localized
  const twitterTitle = "Twitter";
  const twitterAlt = "twitter logo";
  const youtubeTitle = "Youtube";
  const youtubeAlt = useLocalizedString("footer-alt-youtube");
  const discordTitle = "Discord";
  const discordAlt = "discord logo";
  const githubTitle = "Github";
  const githubAlt = "github logo";

  return (
    <FooterColumn grow>
      <H4>
        <Localized id="footer-social" />
      </H4>
      <flx.div direction="row" wrap gap="1.6rem">
        <SocialIcon
          socialUrl="https://twitter.com/rustlang"
          title={twitterTitle}
          alt={twitterAlt}
          imageUrl={twitterLogo}
        />
        <SocialIcon
          socialUrl="https://www.youtube.com/channel/UCaYhcUwRBNscFNUKTjgPFiA"
          title={youtubeTitle}
          alt={youtubeAlt}
          imageUrl={youtubeLogo}
        />
        <SocialIcon
          socialUrl="https://discord.gg/rust-lang"
          title={discordTitle}
          alt={discordAlt}
          imageUrl={discordLogo}
        />
        <SocialIcon
          socialUrl="https://github.com/rust-lang"
          title={githubTitle}
          alt={githubAlt}
          imageUrl={githubLogo}
        />
      </flx.div>
    </FooterColumn>
  );
}

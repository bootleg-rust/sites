import React from "react";
import {
  styled,
  css,
  Div,
  Anchor,
  List,
  Footer,
  H4,
  Paragraph,
} from "@bootleg-rust/lib-design-system";
import { CenteredContent } from "./_shared";
import { LanguageSelect } from "./_language-select";

import discordLogo from "./discord.svg";
import githubLogo from "./github.svg";
import twitterLogo from "./twitter.svg";
import youtubeLogo from "./youtube.svg";

type SocialIconProps = {
  imageUrl: string;
  socialUrl: string;
  alt: string;
  title: string;
};

const SocialIconStyle = styled(Anchor)`
  img {
    width: 40px;
  }
`;

function SocialIcon({ socialUrl, imageUrl, alt, title }: SocialIconProps) {
  return (
    <SocialIconStyle href={socialUrl}>
      <img src={imageUrl} alt={alt} title={title} />
    </SocialIconStyle>
  );
}

function GetHelp({
  onSelectLanguage,
}: {
  onSelectLanguage(locale: string): void;
}) {
  return (
    <Div grow>
      <H4>Get help!</H4>
      <List unordered>
        <List.Item>
          <Anchor href="/learn">Documentation</Anchor>
        </List.Item>
        <List.Item>
          <Anchor href="http://forge.rust-lang.org">
            Rust Forge (Contributor Documentation)
          </Anchor>
        </List.Item>
        <List.Item>
          <Anchor href="https://users.rust-lang.org">
            Ask a Question on the Users Forum
          </Anchor>
        </List.Item>
        <List.Item>
          <Anchor href="http://ping.rust-lang.org">Check Website Status</Anchor>
        </List.Item>
      </List>
      <LanguageSelect onChange={(e) => onSelectLanguage(e.target.value)} />
    </Div>
  );
}

function TermsAndPolicies() {
  return (
    <Div grow>
      <H4>Terms and policies</H4>
      <List unordered>
        <List.Item>
          <Anchor href="/policies/code-of-conduct">Code of Conduct</Anchor>
        </List.Item>
        <List.Item>
          <Anchor href="/policies/licenses">Licenses</Anchor>
        </List.Item>
        <List.Item>
          <Anchor href="/policies/media-guide">
            Logo Policy and Media Guide
          </Anchor>
        </List.Item>
        <List.Item>
          <Anchor href="/policies/security">Security Disclosures</Anchor>
        </List.Item>
        <List.Item>
          <Anchor href="/policies/privacy">Privacy Notice</Anchor>
        </List.Item>
        <List.Item>
          <Anchor href="/policies">All Policies</Anchor>
        </List.Item>
      </List>
    </Div>
  );
}

function SocialIcons() {
  return (
    <Div grow>
      <H4>Social</H4>
      <Div direction="row" wrap gap="20px">
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
      </Div>
    </Div>
  );
}

const footerCss = css`
  padding-top: 30px;
  padding-bottom: 30px;
  color: white;
  background-color: #2a3439;
`;

const Content = styled(CenteredContent)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2em;
`;

export function SiteFooter({
  onSelectLanguage,
}: {
  onSelectLanguage(locale: string): void;
}) {
  return (
    <Footer css={footerCss}>
      <Content>
        <GetHelp onSelectLanguage={onSelectLanguage} />
        <TermsAndPolicies />
        <SocialIcons />
      </Content>
      <Div alignItems="center" justify="center">
        <Paragraph>
          Maintained by the Rust Team. See a bug?{" "}
          <Anchor href="https://github.com/rust-lang/www.rust-lang.org/issues/new/choose">
            File an issue!
          </Anchor>
        </Paragraph>
        <Paragraph>
          Looking for the{" "}
          <Anchor href="https://prev.rust-lang.org">previous website</Anchor>?
        </Paragraph>
      </Div>
    </Footer>
  );
}

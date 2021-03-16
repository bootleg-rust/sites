import React from "react";
import { Localized, useLocalizedString } from "@bootleg-rust/features";
import { motion, AnimatePresence } from "framer-motion";
import {
  css,
  styled,
  useTheme,
  HeroHeading,
  H2,
  Anchor,
  Paragraph,
  H3,
} from "@bootleg-rust/design-system";
import { flx } from "@pseudo-su/flex-elements";
import {
  PageSectionCentered,
  PageHeaderCentered,
  SectionHeader,
} from "../sections";

import cliSvg from "./cli.svg";
import webassemblySvg from "./webassembly.svg";
import networkingSvg from "./networking.svg";
import embeddedSvg from "./embedded.svg";
import npmLogoSvg from "./npm-logo.svg";
import yelpLogoPng from "./yelp-logo.png";

const CURRENT_VERSION_NUMBER = "1.50.0";
const CURRENT_VERSION_BLOG_URL =
  "https://blog.rust-lang.org/2021/02/11/Rust-1.50.0.html";

export function Homepage() {
  return (
    <>
      <HomepageHeader />
      <SectionWhyRust />
      <SectionBuildInRust />
      <SectionInProduction />
      <SectionGetInvolved />
      <SectionThanks />
    </>
  );
}

const AnchorButton = styled(Anchor)`
  width: 100%;

  text-align: center;
  text-transform: uppercase;
  background-color: var(--default-accent);
  text-decoration: none;
  border-width: 1px;
  border-color: transparent;
  color: black;
  font-size: 2.25rem;
  padding: 20px;
  font-weight: 600;
  border-radius: 4px;

  &:active,
  &:hover {
    border-color: black;
  }
`;

export function HomepageHeader() {
  return (
    <PageHeaderCentered
      direction="row"
      gap="1rem"
      css={css`
        flex-grow: 1;
        flex-flow: wrap;
      `}
    >
      <flx.div
        grow
        basis={"65%"}
        css={`
          min-width: 65%;
        `}
      >
        <HeroHeading
          block
          css={css`
            line-height: 1.4;
          `}
        >
          <AnimatePresence>
            <motion.span layoutId="main-heading" animate={{ opacity: 1 }}>
              <Localized id="rust" />
            </motion.span>
          </AnimatePresence>
        </HeroHeading>
        <H2
          css={css`
            line-height: 1.2;
            font-size: 2.25rem;

            @media ${({ theme }) => theme.media.notSmall} {
              font-size: 3rem;
            }
          `}
        >
          <Localized id="tagline" vars={{ linebreak: "<br />" }} />
        </H2>
      </flx.div>
      <flx.div
        css={css`
          justify-content: center;
          align-items: center;
          flex-basis: 33%;
          padding: 1rem;
          flex-grow: 1;
        `}
      >
        <AnchorButton
          css={css`
            white-space: nowrap;
            @media ${({ theme }) => theme.media.large} {
              max-width: 340px;
            }
          `}
          href="/learn/get-started"
        >
          <Localized id="get-started" />
        </AnchorButton>
        <flx.div>
          <Anchor
            css={css`
              margin-top: 1rem;
              text-align: center;
              line-height: 2;
              @media ${({ theme }) => theme.media.notSmall} {
                font-size: 2.25rem;
              }
            `}
            href={CURRENT_VERSION_BLOG_URL}
          >
            <Localized
              id="homepage-version"
              vars={{ number: CURRENT_VERSION_NUMBER }}
            />
          </Anchor>
        </flx.div>
      </flx.div>
    </PageHeaderCentered>
  );
}

function SectionWhyRust() {
  const theme = useTheme();
  return (
    <PageSectionCentered
      id="language-values"
      brand={{
        background: theme.colors.brandGreen,
        foreground: theme.colors.brandText,
        accent: theme.colors.brandPurple,
        link: theme.colors.invertedText,
      }}
    >
      <SectionHeader>
        <H2>
          <Localized id="why-rust" />
        </H2>
      </SectionHeader>
      <flx.div>
        <flx.section>
          <H3>
            <Localized id="language-values-performance" />
          </H3>
          <Paragraph>
            <Localized id="language-values-performance-blurb" />
          </Paragraph>
        </flx.section>
        <flx.section>
          <H3>
            <Localized id="language-values-reliability" />
          </H3>
          <Paragraph>
            <Localized id="language-values-reliability-blurb" />
          </Paragraph>
        </flx.section>
        <flx.section>
          <H3>
            <Localized id="language-values-productivity" />
          </H3>
          <Paragraph>
            <Localized id="language-values-productivity-blurb" />
          </Paragraph>
        </flx.section>
      </flx.div>
    </PageSectionCentered>
  );
}

function SectionBuildInRust() {
  const theme = useTheme();
  const cliAlt = useLocalizedString("domains-cli-alt");
  const wasmAlt = useLocalizedString("domains-wasm-alt");
  const netAlt = useLocalizedString("domains-net-alt");
  const embeddedAlt = useLocalizedString("domains-embedded-alt");

  return (
    <PageSectionCentered
      brand={{
        background: theme.colors.brandPurple,
        foreground: theme.colors.brandText,
        accent: theme.colors.brandRed,
        link: theme.colors.invertedText,
      }}
    >
      <SectionHeader>
        <H2>
          <Localized id="domains-title" />
        </H2>
      </SectionHeader>

      <flx.div>
        <Paragraph>
          <Localized id="domains-blurb" />
        </Paragraph>
      </flx.div>

      <flx.div>
        <flx.div>
          <flx.div>
            <img src={cliSvg} alt={cliAlt} />
          </flx.div>
          <flx.div>
            <H3>
              <Localized id="domains-cli" />
            </H3>
            <Paragraph>
              <Localized id="domains-cli-blurb" />
            </Paragraph>
            <Anchor href="/what/cli">
              <Localized id="cli-learn-more" />
            </Anchor>
          </flx.div>
        </flx.div>

        <flx.div>
          <flx.div>
            <img src={webassemblySvg} alt={wasmAlt} />
          </flx.div>
          <flx.div>
            <H3>
              <Localized id="domains-wasm" />
            </H3>
            <Paragraph>
              <Localized id="domains-wasm-blurb" />
            </Paragraph>
            <Anchor href="/what/wasm">
              <Localized id="wasm-learn-more" />
            </Anchor>
          </flx.div>
        </flx.div>

        <flx.div>
          <flx.div>
            <img src={networkingSvg} alt={netAlt} />
          </flx.div>
          <flx.div>
            <H3>
              <Localized id="domains-net" />
            </H3>
            <Paragraph>
              <Localized id="domains-net-blurb" />
            </Paragraph>
            <Anchor href="/what/networking">
              <Localized id="net-learn-more" />
            </Anchor>
          </flx.div>
        </flx.div>

        <flx.div>
          <flx.div>
            <img src={embeddedSvg} alt={embeddedAlt} />
          </flx.div>
          <flx.div>
            <H3>
              <Localized id="domains-embedded" />
            </H3>
            <Paragraph>
              <Localized id="domains-embedded-blurb" />
            </Paragraph>
            <Anchor href="/what/embedded">
              <Localized id="embedded-learn-more" />
            </Anchor>
          </flx.div>
        </flx.div>
      </flx.div>
    </PageSectionCentered>
  );
}

function SectionInProduction() {
  const npmAlt = useLocalizedString("production-testimonial-npm-alt");
  const yelpAlt = useLocalizedString("production-testimonial-yelp-alt");
  return (
    <PageSectionCentered>
      <SectionHeader>
        <H2>
          <Localized id="production-title" />
        </H2>
      </SectionHeader>
      <flx.div>
        <Paragraph>
          <Localized id="production-blurb" />
        </Paragraph>
      </flx.div>
      <flx.div>
        <flx.div>
          <flx.div>
            <flx.blockquote>
              <Localized id="production-testimonial-npm" />
            </flx.blockquote>
            <Paragraph>
              – <Localized id="testimonial-npm-attribution" />
            </Paragraph>
          </flx.div>
          <flx.div>
            <Anchor href="https://www.npmjs.com/">
              <img src={npmLogoSvg} alt={npmAlt} />
            </Anchor>
          </flx.div>
        </flx.div>
        <flx.hr />
        <flx.div>
          <flx.div>
            <Anchor href="https://www.youtube.com/watch?v=u6ZbF4apABk">
              <img src={yelpLogoPng} alt={yelpAlt} />
            </Anchor>
          </flx.div>
          <flx.div>
            <flx.blockquote>
              <Localized id="production-testimonial-yelp" />
            </flx.blockquote>
            <Paragraph>
              – <Localized id="production-testimonial-yelp-attribution" />
            </Paragraph>
          </flx.div>
        </flx.div>
      </flx.div>
      <Anchor href="/production">
        <Localized id="learn-more" />
      </Anchor>
    </PageSectionCentered>
  );
}

function SectionGetInvolved() {
  const theme = useTheme();
  return (
    <PageSectionCentered
      brand={{
        background: theme.colors.brandRed,
        foreground: theme.colors.brandText,
        accent: theme.colors.brandPurple,
        link: theme.colors.invertedText,
      }}
    >
      <SectionHeader>
        <H2>
          <Localized id="get-involved" />
        </H2>
      </SectionHeader>
      <flx.div>
        <flx.div id="read-rust">
          <H3>
            <Localized id="get-involved-read-rust" />
          </H3>
          <Paragraph>
            <Localized id="involved-read-rust-blurb" />
          </Paragraph>
          <Anchor href="learn">
            <Localized id="involved-read-rust-link" />
          </Anchor>
        </flx.div>
        <flx.div id="watch-rust">
          <H3>
            <Localized id="get-involved-watch-rust" />
          </H3>
          <Paragraph>
            <Localized id="involved-watch-rust-blurb" />
          </Paragraph>
          <Anchor href="https://www.youtube.com/channel/UCaYhcUwRBNscFNUKTjgPFiA">
            <Localized id="involved-watch-rust-link" />
          </Anchor>
        </flx.div>
      </flx.div>
      <flx.div>
        <H3>
          <Localized id="get-involved-contribute" />
        </H3>
        <Paragraph>
          <Localized id="involved-contribute-blurb" />
        </Paragraph>
        <Anchor href="https://rustc-dev-guide.rust-lang.org/getting-started.html">
          <Localized id="involved-contribute-link" />
        </Anchor>
      </flx.div>
    </PageSectionCentered>
  );
}

function SectionThanks() {
  return (
    <PageSectionCentered>
      <SectionHeader>
        <H2>
          <Localized id="thanks-title" />
        </H2>
      </SectionHeader>
      <flx.div>
        <Paragraph>
          <Localized id="thanks-blurb" />
        </Paragraph>
      </flx.div>
      <flx.div>
        <flx.div id="individual-code">
          <H3>
            <Localized id="thanks-individuals-header" />
          </H3>
          <Paragraph>
            <Localized id="thanks-individuals-blurb" />
          </Paragraph>
          <Anchor href="https://thanks.rust-lang.org/">
            <Localized id="thanks-indiviuals-link" />
          </Anchor>
        </flx.div>
        <flx.div id="company-sponsorships">
          <H3>
            <Localized id="thanks-companies-header" />
          </H3>
          <Paragraph>
            <Localized id="thanks-companies-blurb" />
          </Paragraph>
          <Anchor href="/sponsors">
            <Localized id="thanks-companies-link" />
          </Anchor>
        </flx.div>
      </flx.div>
    </PageSectionCentered>
  );
}

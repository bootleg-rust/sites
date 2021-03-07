import React from "react";
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
      <flx.div grow>
        <HeroHeading
          block
          css={css`
            line-height: 1.4;
          `}
        >
          <AnimatePresence>
            <motion.span layoutId="main-heading" animate={{ opacity: 1 }}>
              Rust
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
          A language empowering everyone <br /> to build reliable and efficient
          software.
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
            @media ${({ theme }) => theme.media.large} {
              max-width: 340px;
            }
          `}
          href="/learn/get-started"
        >
          Get Started
        </AnchorButton>
        <flx.div>
          <Anchor
            css={css`
              text-align: center;
              line-height: 2;
              @media ${({ theme }) => theme.media.notSmall} {
                font-size: 2.25rem;
              }
            `}
            href="https://blog.rust-lang.org/2020/08/03/Rust-1.45.2.html"
          >
            Version 1.45.2
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
        <H2>Why Rust?</H2>
      </SectionHeader>
      <flx.div>
        <flx.section>
          <H3>Performance</H3>
          <Paragraph>
            Rust is blazingly fast and memory-efficient: with no runtime or
            garbage collector, it can power performance-critical services, run
            on embedded devices, and easily integrate with other languages.
          </Paragraph>
        </flx.section>
        <flx.section>
          <H3>Reliability</H3>
          <Paragraph>
            Rust’s rich type system and ownership model guarantee memory-safety
            and thread-safety — enabling you to eliminate many classes of bugs
            at compile-time.
          </Paragraph>
        </flx.section>
        <flx.section>
          <H3>Productivity</H3>
          <Paragraph>
            Rust has great documentation, a friendly compiler with useful error
            messages, and top-notch tooling — an integrated package manager and
            build tool, smart multi-editor support with auto-completion and type
            inspections, an auto-formatter, and more.
          </Paragraph>
        </flx.section>
      </flx.div>
    </PageSectionCentered>
  );
}
function SectionBuildInRust() {
  const theme = useTheme();
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
        <H2>Build it in Rust</H2>
      </SectionHeader>

      <flx.div>
        <Paragraph>
          In 2018, the Rust community decided to improve programming experience
          for a few distinct domains (see{" "}
          <Anchor href="https://blog.rust-lang.org/2018/03/12/roadmap.html">
            the 2018 roadmap
          </Anchor>
          ). For these, you can find many high-quality crates and some awesome
          guides on how to get started.
        </Paragraph>
      </flx.div>

      <flx.div>
        <flx.div>
          <flx.div>
            <img src={cliSvg} alt="terminal" />
          </flx.div>
          <flx.div>
            <H3>Command Line</H3>
            <Paragraph>
              Whip up a CLI tool quickly with Rust’s robust ecosystem. Rust
              helps you maintain your app with confidence and distribute it with
              ease.
            </Paragraph>
            <Anchor href="/what/cli">Building Tools</Anchor>
          </flx.div>
        </flx.div>

        <flx.div>
          <flx.div>
            <img src={webassemblySvg} alt="gear with puzzle piece elements" />
          </flx.div>
          <flx.div>
            <H3>WebAssembly</H3>
            <Paragraph>
              Use Rust to supercharge your JavaScript, one module at a time.
              Publish to npm, bundle with webpack, and you’re off to the races.
            </Paragraph>
            <Anchor href="/what/wasm">Writing Web Apps</Anchor>
          </flx.div>
        </flx.div>

        <flx.div>
          <flx.div>
            <img src={networkingSvg} alt="a cloud with nodes" />
          </flx.div>
          <flx.div>
            <H3>Networking</H3>
            <Paragraph>
              Predictable performance. Tiny resource footprint. Rock-solid
              reliability. Rust is great for network services.
            </Paragraph>
            <Anchor href="/what/networking">Working On Servers</Anchor>
          </flx.div>
        </flx.div>

        <flx.div>
          <flx.div>
            <img src={embeddedSvg} alt="an embedded device chip" />
          </flx.div>
          <flx.div>
            <H3>Embedded</H3>
            <Paragraph>
              Targeting low-resource devices? Need low-level control without
              giving up high-level conveniences? Rust has you covered.
            </Paragraph>
            <Anchor href="/what/embedded">Starting With Embedded</Anchor>
          </flx.div>
        </flx.div>
      </flx.div>
    </PageSectionCentered>
  );
}

function SectionInProduction() {
  return (
    <PageSectionCentered>
      <SectionHeader>
        <H2>Rust in production</H2>
      </SectionHeader>
      <flx.div>
        <Paragraph>
          Hundreds of companies around the world are using Rust in production
          today for fast, low-resource, cross-platform solutions. Software you
          know and love, like{" "}
          <Anchor href="https://hacks.mozilla.org/2017/08/inside-a-super-fast-css-engine-quantum-css-aka-stylo/">
            Firefox
          </Anchor>
          ,
          <Anchor href="https://blogs.dropbox.com/tech/2016/06/lossless-compression-with-brotli/">
            Dropbox
          </Anchor>
          , and{" "}
          <Anchor href="https://blog.cloudflare.com/cloudflare-workers-as-a-serverless-rust-platform/">
            Cloudflare
          </Anchor>
          , uses Rust.{" "}
          <flx.strong>
            From startups to large corporations, from embedded devices to
            scalable web services, Rust is a great fit.
          </flx.strong>
        </Paragraph>
      </flx.div>
      <flx.div>
        <flx.div>
          <flx.div>
            <flx.blockquote>
              My biggest compliment to Rust is that it's boring, and this is an
              amazing compliment.
            </flx.blockquote>
            <Paragraph>– Chris Dickinson, Engineer at npm, Inc</Paragraph>
          </flx.div>
          <flx.div>
            <Anchor href="https://www.npmjs.com/">
              <img src={npmLogoSvg} alt="npm Logo" />
            </Anchor>
          </flx.div>
        </flx.div>
        <flx.hr />
        <flx.div>
          <flx.div>
            <Anchor href="https://www.youtube.com/watch?v=u6ZbF4apABk">
              <img src={yelpLogoPng} alt="Yelp Logo" />
            </Anchor>
          </flx.div>
          <flx.div>
            <flx.blockquote>
              All the documentation, the tooling, the community is great - you
              have all the tools to succeed in writing Rust code.
            </flx.blockquote>
            <Paragraph>– Antonio Verardi, Infrastructure Engineer</Paragraph>
          </flx.div>
        </flx.div>
      </flx.div>
      <Anchor href="/production">Learn More</Anchor>
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
        <H2>Get involved</H2>
      </SectionHeader>
      <flx.div>
        <flx.div id="read-rust">
          <H3>Read Rust</H3>
          <Paragraph>
            We love documentation! Take a look at the books available online, as
            well as key blog posts and user guides.
          </Paragraph>
          <Anchor href="learn">Read the book</Anchor>
        </flx.div>
        <flx.div id="watch-rust">
          <H3>Watch Rust</H3>
          <Paragraph>
            The Rust community has a dedicated YouTube channel collecting a huge
            range of presentations and tutorials.
          </Paragraph>
          <Anchor href="https://www.youtube.com/channel/UCaYhcUwRBNscFNUKTjgPFiA">
            Watch the Videos
          </Anchor>
        </flx.div>
      </flx.div>
      <flx.div>
        <H3>Contribute code</H3>
        <Paragraph>
          Rust is truly a community effort, and we welcome contribution from
          hobbyists and production users, from newcomers and seasoned
          professionals. Come help us make the Rust experience even better!
        </Paragraph>
        <Anchor href="https://rustc-dev-guide.rust-lang.org/getting-started.html">
          Read Contribution Guide
        </Anchor>
      </flx.div>
    </PageSectionCentered>
  );
}

function SectionThanks() {
  return (
    <PageSectionCentered>
      <SectionHeader>
        <H2>Thanks</H2>
      </SectionHeader>
      <flx.div>
        <Paragraph>
          Rust would not exist without the generous contributions of time, work,
          and resources from individuals and companies. We are very grateful for
          the support!
        </Paragraph>
      </flx.div>
      <flx.div>
        <flx.div id="individual-code">
          <H3>Individuals</H3>
          <Paragraph>
            Rust is a community project and is very thankful for the many
            community contributions it receives.
          </Paragraph>
          <Anchor href="https://thanks.rust-lang.org/">
            See individual contributors
          </Anchor>
        </flx.div>
        <flx.div id="company-sponsorships">
          <H3>Corporate sponsors</H3>
          <Paragraph>
            The Rust project receives support from companies through the
            donation of infrastructure.
          </Paragraph>
          <Anchor href="/sponsors">See sponsors</Anchor>
        </flx.div>
      </flx.div>
    </PageSectionCentered>
  );
}

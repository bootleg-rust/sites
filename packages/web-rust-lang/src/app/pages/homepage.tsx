import React from "react";
import {
  Header,
  Div,
  H1,
  H2,
  Anchor,
  Paragraph,
  Section,
  H3,
  Blockquote,
  Strong,
  HorizontalRule,
} from "@bootleg-rust/lib-design-system";

export function Homepage() {
  return (
    <>
      <Header>
        <Div>
          <Div>
            <H1>Rust</H1>
            <H2>
              A language empowering everyone <br /> to build reliable and
              efficient software.
            </H2>
          </Div>
          <Div>
            <Anchor href="/learn/get-started">Get Started</Anchor>
            <Paragraph>
              <Anchor href="https://blog.rust-lang.org/2020/08/03/Rust-1.45.2.html">
                Version 1.45.2
              </Anchor>
            </Paragraph>
          </Div>
        </Div>
      </Header>

      <Section id="language-values">
        <Div>
          <Header>
            <H2>Why Rust?</H2>
            <Div />
          </Header>
          <Div>
            <Section>
              <H3>Performance</H3>
              <Paragraph>
                Rust is blazingly fast and memory-efficient: with no runtime or
                garbage collector, it can power performance-critical services,
                run on embedded devices, and easily integrate with other
                languages.
              </Paragraph>
            </Section>
            <Section>
              <H3>Reliability</H3>
              <Paragraph>
                Rust’s rich type system and ownership model guarantee
                memory-safety and thread-safety — enabling you to eliminate many
                classes of bugs at compile-time.
              </Paragraph>
            </Section>
            <Section>
              <H3>Productivity</H3>
              <Paragraph>
                Rust has great documentation, a friendly compiler with useful
                error messages, and top-notch tooling — an integrated package
                manager and build tool, smart multi-editor support with
                auto-completion and type inspections, an auto-formatter, and
                more.
              </Paragraph>
            </Section>
          </Div>
        </Div>
      </Section>

      <Section>
        <Div>
          <Header>
            <H2>Build it in Rust</H2>
            <Div />
          </Header>

          <Div>
            <Paragraph>
              In 2018, the Rust community decided to improve programming
              experience for a few distinct domains (see{" "}
              <Anchor href="https://blog.rust-lang.org/2018/03/12/roadmap.html">
                the 2018 roadmap
              </Anchor>
              ). For these, you can find many high-quality crates and some
              awesome guides on how to get started.
            </Paragraph>
          </Div>

          <Div>
            <Div>
              <Div>
                <img src="/static/images/cli.svg" alt="terminal" />
              </Div>
              <Div>
                <H3>Command Line</H3>
                <Paragraph>
                  Whip up a CLI tool quickly with Rust’s robust ecosystem. Rust
                  helps you maintain your app with confidence and distribute it
                  with ease.
                </Paragraph>
                <Anchor href="/what/cli">Building Tools</Anchor>
              </Div>
            </Div>

            <Div>
              <Div>
                <img
                  src="/static/images/webassembly.svg"
                  alt="gear with puzzle piece elements"
                />
              </Div>
              <Div>
                <H3>WebAssembly</H3>
                <Paragraph>
                  Use Rust to supercharge your JavaScript, one module at a time.
                  Publish to npm, bundle with webpack, and you’re off to the
                  races.
                </Paragraph>
                <Anchor href="/what/wasm">Writing Web Apps</Anchor>
              </Div>
            </Div>

            <Div>
              <Div>
                <img
                  src="/static/images/networking.svg"
                  alt="a cloud with nodes"
                />
              </Div>
              <Div>
                <H3>Networking</H3>
                <Paragraph>
                  Predictable performance. Tiny resource footprint. Rock-solid
                  reliability. Rust is great for network services.
                </Paragraph>
                <Anchor href="/what/networking">Working On Servers</Anchor>
              </Div>
            </Div>

            <Div>
              <Div>
                <img
                  src="/static/images/embedded.svg"
                  alt="an embedded device chip"
                />
              </Div>
              <Div>
                <H3>Embedded</H3>
                <Paragraph>
                  Targeting low-resource devices? Need low-level control without
                  giving up high-level conveniences? Rust has you covered.
                </Paragraph>
                <Anchor href="/what/embedded">Starting With Embedded</Anchor>
              </Div>
            </Div>
          </Div>
        </Div>
      </Section>

      <Section>
        <Div>
          <Header>
            <H2>Rust in production</H2>
            <Div />
          </Header>
          <Div>
            <Paragraph>
              Hundreds of companies around the world are using Rust in
              production today for fast, low-resource, cross-platform solutions.
              Software you know and love, like{" "}
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
              <Strong>
                From startups to large corporations, from embedded devices to
                scalable web services, Rust is a great fit.
              </Strong>
            </Paragraph>
          </Div>
          <Div>
            <Div>
              <Div>
                <Blockquote>
                  My biggest compliment to Rust is that it's boring, and this is
                  an amazing compliment.
                </Blockquote>
                <Paragraph>– Chris Dickinson, Engineer at npm, Inc</Paragraph>
              </Div>
              <Div>
                <Anchor href="https://www.npmjs.com/">
                  <img src="/static/images/user-logos/npm.svg" alt="npm Logo" />
                </Anchor>
              </Div>
            </Div>
            <HorizontalRule />
            <Div>
              <Div>
                <Anchor href="https://www.youtube.com/watch?v=u6ZbF4apABk">
                  <img
                    src="/static/images/user-logos/yelp.png"
                    alt="Yelp Logo"
                  />
                </Anchor>
              </Div>
              <Div>
                <Blockquote>
                  All the documentation, the tooling, the community is great -
                  you have all the tools to succeed in writing Rust code.
                </Blockquote>
                <Paragraph>
                  – Antonio Verardi, Infrastructure Engineer
                </Paragraph>
              </Div>
            </Div>
          </Div>
          <Anchor href="/production">Learn More</Anchor>
        </Div>
      </Section>

      <Section>
        <Div>
          <Header>
            <H2>Get involved</H2>
            <Div />
          </Header>
          <Div>
            <Div id="read-rust">
              <H3>Read Rust</H3>
              <Paragraph>
                We love documentation! Take a look at the books available
                online, as well as key blog posts and user guides.
              </Paragraph>
              <Anchor href="learn">Read the book</Anchor>
            </Div>
            <Div id="watch-rust">
              <H3>Watch Rust</H3>
              <Paragraph>
                The Rust community has a dedicated YouTube channel collecting a
                huge range of presentations and tutorials.
              </Paragraph>
              <Anchor href="https://www.youtube.com/channel/UCaYhcUwRBNscFNUKTjgPFiA">
                Watch the Videos
              </Anchor>
            </Div>
          </Div>
          <Div>
            <H3>Contribute code</H3>
            <Paragraph>
              Rust is truly a community effort, and we welcome contribution from
              hobbyists and production users, from newcomers and seasoned
              professionals. Come help us make the Rust experience even better!
            </Paragraph>
            <Anchor href="https://rustc-dev-guide.rust-lang.org/getting-started.html">
              Read Contribution Guide
            </Anchor>
          </Div>
        </Div>
      </Section>

      <Section>
        <Div>
          <Header>
            <H2>Thanks</H2>
            <Div />
          </Header>
          <Div>
            <Paragraph>
              Rust would not exist without the generous contributions of time,
              work, and resources from individuals and companies. We are very
              grateful for the support!
            </Paragraph>
          </Div>
          <Div>
            <Div id="individual-code">
              <H3>Individuals</H3>
              <Paragraph>
                Rust is a community project and is very thankful for the many
                community contributions it receives.
              </Paragraph>
              <Anchor href="https://thanks.rust-lang.org/">
                See individual contributors
              </Anchor>
            </Div>
            <Div id="company-sponsorships">
              <H3>Corporate sponsors</H3>
              <Paragraph>
                The Rust project receives support from companies through the
                donation of infrastructure.
              </Paragraph>
              <Anchor href="/sponsors">See sponsors</Anchor>
            </Div>
          </Div>
        </Div>
      </Section>
    </>
  );
}

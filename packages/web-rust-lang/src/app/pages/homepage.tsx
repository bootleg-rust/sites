import React from "react";

export function Homepage() {
  return (
    <>
      <main>
        <header className="mt3 mb6 w-100 mw-none ph3 mw8-m mw9-l center">
          <div className="flex flex-column flex-row-l">
            <div className="w-70-l mw8-l">
              <h1>Rust</h1>
              <h2 className="mt4 mb0 f2 f1-ns">
                A language empowering everyone <br className="dn db-ns" /> to
                build reliable and efficient software.
              </h2>
            </div>
            <div className="w-30-l flex-column pl0-l pr0-l pl3 pr3">
              <a
                className="button button-download ph4 mt0 w-100"
                href="/learn/get-started"
              >
                Get Started
              </a>
              <p className="tc f3 f2-l mt3">
                <a
                  href="https://blog.rust-lang.org/2020/08/03/Rust-1.45.2.html"
                  className="download-link"
                >
                  Version 1.45.2
                </a>
              </p>
            </div>
          </div>
        </header>

        <section id="language-values" className="green">
          <div className="w-100 mw-none ph3 mw8-m mw9-l center f3">
            <header className="pb0">
              <h2>Why Rust?</h2>
              <div className="highlight"></div>
            </header>
            <div className="flex-none flex-l">
              <section className="w-100 pv2 pv0-l mt4">
                <h3 className="f2 f1-l">Performance</h3>
                <p className="f3 lh-copy">
                  Rust is blazingly fast and memory-efficient: with no runtime
                  or garbage collector, it can power performance-critical
                  services, run on embedded devices, and easily integrate with
                  other languages.
                </p>
              </section>
              <section className="w-100 pv2 pv0-l mt4 mh5-l">
                <h3 className="f2 f1-l">Reliability</h3>
                <p className="f3 lh-copy">
                  Rust’s rich type system and ownership model guarantee
                  memory-safety and thread-safety — enabling you to eliminate
                  many classes of bugs at compile-time.
                </p>
              </section>
              <section className="w-100 pv2 pv0-l mt4">
                <h3 className="f2 f1-l">Productivity</h3>
                <p className="f3 lh-copy">
                  Rust has great documentation, a friendly compiler with useful
                  error messages, and top-notch tooling — an integrated package
                  manager and build tool, smart multi-editor support with
                  auto-completion and type inspections, an auto-formatter, and
                  more.
                </p>
              </section>
            </div>
          </div>
        </section>

        <section className="purple">
          <div className="w-100 mw-none ph3 mw8-m mw9-l center f3">
            <header>
              <h2>Build it in Rust</h2>
              <div className="highlight"></div>
            </header>

            <div className="flex-none flex-l flex-row">
              <p className="flex-grow-1 pb2">
                In 2018, the Rust community decided to improve programming
                experience for a few distinct domains (see{" "}
                <a href="https://blog.rust-lang.org/2018/03/12/roadmap.html">
                  the 2018 roadmap
                </a>
                ). For these, you can find many high-quality crates and some
                awesome guides on how to get started.
              </p>
            </div>

            <div className="flex-none flex-l flex-row">
              <div className="flex flex-row flex-column-l justify-between-l mw8 measure-wide-l w-100 mt5 mt2-l">
                <div className="v-top tc-l">
                  <img
                    src="/static/images/cli.svg"
                    alt="terminal"
                    className="mw3 mw4-ns"
                  />
                </div>
                <div className="v-top pl4 pl0-l pt0 pt3-l measure-wide-l flex-l flex-column-l flex-auto-l justify-between-l">
                  <h3 className="tc-l">Command Line</h3>
                  <p className="flex-grow-1">
                    Whip up a CLI tool quickly with Rust’s robust ecosystem.
                    Rust helps you maintain your app with confidence and
                    distribute it with ease.
                  </p>
                  <a href="/what/cli" className="button button-secondary">
                    Building Tools
                  </a>
                </div>
              </div>

              <div className="flex flex-row flex-column-l justify-between-l mw8 measure-wide-l w-100 mt5 mt2-l pl4-l">
                <div className="v-top tc-l">
                  <img
                    src="/static/images/webassembly.svg"
                    alt="gear with puzzle piece elements"
                    className="mw3 mw4-ns"
                  />
                </div>
                <div className="v-top pl4 pl0-l pt0 pt3-l measure-wide-l flex-l flex-column-l flex-auto-l justify-between-l">
                  <h3 className="tc-l">WebAssembly</h3>
                  <p className="flex-grow-1">
                    Use Rust to supercharge your JavaScript, one module at a
                    time. Publish to npm, bundle with webpack, and you’re off to
                    the races.
                  </p>
                  <a href="/what/wasm" className="button button-secondary">
                    Writing Web Apps
                  </a>
                </div>
              </div>

              <div className="flex flex-row flex-column-l justify-between-l mw8 measure-wide-l w-100 mt5 mt2-l pl4-l">
                <div className="v-top tc-l">
                  <img
                    src="/static/images/networking.svg"
                    alt="a cloud with nodes"
                    className="mw3 mw4-ns"
                  />
                </div>
                <div className="v-top pl4 pl0-l pt0 pt3-l measure-wide-l flex-l flex-column-l flex-auto-l justify-between-l">
                  <h3 className="tc-l">Networking</h3>
                  <p className="flex-grow-1">
                    Predictable performance. Tiny resource footprint. Rock-solid
                    reliability. Rust is great for network services.
                  </p>
                  <a
                    href="/what/networking"
                    className="button button-secondary"
                  >
                    Working On Servers
                  </a>
                </div>
              </div>

              <div className="flex flex-row flex-column-l justify-between-l mw8 measure-wide-l w-100 mt5 mt2-l pl4-l">
                <div className="v-top tc-l">
                  <img
                    src="/static/images/embedded.svg"
                    alt="an embedded device chip"
                    className="mw3 mw4-ns"
                  />
                </div>
                <div className="v-top pl4 pl0-l pt0 pt3-l measure-wide-l flex-l flex-column-l flex-auto-l justify-between-l">
                  <h3 className="tc-l">Embedded</h3>
                  <p className="flex-grow-1">
                    Targeting low-resource devices? Need low-level control
                    without giving up high-level conveniences? Rust has you
                    covered.
                  </p>
                  <a href="/what/embedded" className="button button-secondary">
                    Starting With Embedded
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="white production">
          <div className="w-100 mw-none ph3 mw8-m mw9-l center">
            <header>
              <h2>Rust in production</h2>
              <div className="highlight"></div>
            </header>
            <div className="description">
              <p className="lh-copy f2">
                Hundreds of companies around the world are using Rust in
                production today for fast, low-resource, cross-platform
                solutions. Software you know and love, like{" "}
                <a href="https://hacks.mozilla.org/2017/08/inside-a-super-fast-css-engine-quantum-css-aka-stylo/">
                  Firefox
                </a>
                ,
                <a href="https://blogs.dropbox.com/tech/2016/06/lossless-compression-with-brotli/">
                  Dropbox
                </a>
                , and{" "}
                <a href="https://blog.cloudflare.com/cloudflare-workers-as-a-serverless-rust-platform/">
                  Cloudflare
                </a>
                , uses Rust.{" "}
                <strong>
                  From startups to large corporations, from embedded devices to
                  scalable web services, Rust is a great fit.
                </strong>
              </p>
            </div>
            <div className="testimonials">
              <div className="testimonial flex-none flex-l">
                <div className="w-100 w-70-l" id="npm-testimonial">
                  <blockquote className="lh-title-ns">
                    My biggest compliment to Rust is that it's boring, and this
                    is an amazing compliment.
                  </blockquote>
                  <p className="attribution">
                    – Chris Dickinson, Engineer at npm, Inc
                  </p>
                </div>
                <div className="w-100 w-30-l tc">
                  <a href="https://www.npmjs.com/">
                    <img
                      src="/static/images/user-logos/npm.svg"
                      alt="npm Logo"
                      className="w-33 w-60-ns h-auto"
                    />
                  </a>
                </div>
              </div>
              <hr />
              <div className="testimonial flex-none flex-l">
                <div className="w-100 w-30-l tc">
                  <a href="https://www.youtube.com/watch?v=u6ZbF4apABk">
                    <img
                      src="/static/images/user-logos/yelp.png"
                      alt="Yelp Logo"
                      className="w-80"
                    />
                  </a>
                </div>
                <div className="w-100 w-70-l" id="yelp-testimonial">
                  <blockquote>
                    All the documentation, the tooling, the community is great -
                    you have all the tools to succeed in writing Rust code.
                  </blockquote>
                  <p className="attribution">
                    – Antonio Verardi, Infrastructure Engineer
                  </p>
                </div>
              </div>
            </div>
            <a href="/production" className="button button-secondary">
              Learn More
            </a>
          </div>
        </section>

        <section className="get-involved red">
          <div className="w-100 mw-none ph3 mw8-m mw9-l center f3">
            <header>
              <h2>Get involved</h2>
              <div className="highlight"></div>
            </header>
            <div className="flex flex-column flex-row-l">
              <div
                id="read-rust"
                className="mw-50-l mr4-l pt0 flex flex-column justify-between-l"
              >
                <h3>Read Rust</h3>
                <p className="flex-grow-1">
                  We love documentation! Take a look at the books available
                  online, as well as key blog posts and user guides.
                </p>
                <a href="learn" className="button button-secondary">
                  Read the book
                </a>
              </div>
              <div
                id="watch-rust"
                className="mw-50-l pt3 pt0-l flex flex-column justify-between-l"
              >
                <h3>Watch Rust</h3>
                <p className="flex-grow-1">
                  The Rust community has a dedicated YouTube channel collecting
                  a huge range of presentations and tutorials.
                </p>
                <a
                  href="https://www.youtube.com/channel/UCaYhcUwRBNscFNUKTjgPFiA"
                  className="button button-secondary"
                >
                  Watch the Videos
                </a>
              </div>
            </div>
            <div className="pt3">
              <h3>Contribute code</h3>
              <p>
                Rust is truly a community effort, and we welcome contribution
                from hobbyists and production users, from newcomers and seasoned
                professionals. Come help us make the Rust experience even
                better!
              </p>
              <a
                href="https://rustc-dev-guide.rust-lang.org/getting-started.html"
                className="button button-secondary"
              >
                Read Contribution Guide
              </a>
            </div>
          </div>
        </section>

        <section className="white thanks">
          <div className="w-100 mw-none ph3 mw8-m mw9-l center">
            <header>
              <h2>Thanks</h2>
              <div className="highlight"></div>
            </header>
            <div className="description">
              <p className="lh-copy f2">
                Rust would not exist without the generous contributions of time,
                work, and resources from individuals and companies. We are very
                grateful for the support!
              </p>
            </div>
            <div className="flex flex-column flex-row-l">
              <div
                id="individual-code"
                className="mw-50-l mr4-l pt0 flex flex-column justify-between-l"
              >
                <h3>Individuals</h3>
                <p className="flex-grow-1">
                  Rust is a community project and is very thankful for the many
                  community contributions it receives.
                </p>
                <a
                  href="https://thanks.rust-lang.org/"
                  className="button button-secondary"
                >
                  See individual contributors
                </a>
              </div>
              <div
                id="company-sponsorships"
                className="mw-50-l pt3 pt0-l flex flex-column justify-between-l"
              >
                <h3>Corporate sponsors</h3>
                <p className="flex-grow-1">
                  The Rust project receives support from companies through the
                  donation of infrastructure.
                </p>
                <a href="/sponsors" className="button button-secondary">
                  See sponsors
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

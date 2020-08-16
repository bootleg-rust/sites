import React from "react";

function Header() {
  return (
    <nav className="flex flex-row justify-center justify-end-l items-center flex-wrap ph2 pl3-ns pr4-ns pb3">
      <div className="brand flex-auto w-100 w-auto-l self-start tc tl-l">
        <a href="/" className="brand">
          <img
            className="v-mid ml0-l"
            alt="Rust Logo"
            src="/static/images/rust-logo-blk.svg"
          />

          <span className="dib ml1 ml0-l">Rust</span>
        </a>
      </div>

      <ul className="nav list w-100 w-auto-l flex flex-none flex-row flex-wrap justify-center justify-end-l items-center pv2 ph0 ph4-ns">
        <li className="tc pv2 ph2 ph4-ns flex-20-s">
          <a href="/tools/install">Install</a>
        </li>
        <li className="tc pv2 ph2 ph4-ns flex-20-s">
          <a href="/learn">Learn</a>
        </li>
        <li className="tc pv2 ph2 ph4-ns flex-20-s">
          <a href="https://play.rust-lang.org/">Playground</a>
        </li>
        <li className="tc pv2 ph2 ph4-ns flex-20-s">
          <a href="/tools">Tools</a>
        </li>
        <li className="tc pv2 ph2 ph4-ns flex-20-s">
          <a href="/governance">Governance</a>
        </li>
        <li className="tc pv2 ph2 ph4-ns flex-20-s">
          <a href="/community">Community</a>
        </li>
        <li className="tc pv2 ph2 ph4-ns flex-20-s">
          <a href="https://blog.rust-lang.org/">Blog</a>
        </li>
      </ul>

      <div className=" w-100 w-auto-l flex-none flex justify-center pv4 pv-0-l languages">
        <label htmlFor="language-nav" className="hidden">
          Language
        </label>
        <select id="language-nav" data-current-lang="en-US">
          <option title="English (en-US)" value="en-US">
            English (en-US)
          </option>
          <option title="Español (es)" value="es">
            Español (es)
          </option>
          <option title="Français (fr)" value="fr">
            Français (fr)
          </option>
          <option title="Italiano (it)" value="it">
            Italiano (it)
          </option>
          <option title="日本語 (ja)" value="ja">
            日本語 (ja)
          </option>
          <option title="Português (pt-BR)" value="pt-BR">
            Português (pt-BR)
          </option>
          <option title="Русский (ru)" value="ru">
            Русский (ru)
          </option>
          <option title="Türkçe (tr)" value="tr">
            Türkçe (tr)
          </option>
          <option title="简体中文 (zh-CN)" value="zh-CN">
            简体中文 (zh-CN)
          </option>
          <option title="正體中文 (zh-TW)" value="zh-TW">
            正體中文 (zh-TW)
          </option>
        </select>
      </div>
    </nav>
  );
}
function Footer() {
  return (
    <footer>
      <div className="w-100 mw-none ph3 mw8-m mw9-l center f3">
        <div className="flex flex-column flex-row-ns pv0-l">
          <div
            className="flex flex-column mw8 w-100 measure-wide-l pv2 pv5-m pv2-ns ph4-m ph4-l"
            id="get-help"
          >
            <h4>Get help!</h4>
            <ul>
              <li>
                <a href="/learn">Documentation</a>
              </li>
              <li>
                <a href="http://forge.rust-lang.org">
                  Rust Forge (Contributor Documentation)
                </a>
              </li>
              <li>
                <a href="https://users.rust-lang.org">
                  Ask a Question on the Users Forum
                </a>
              </li>
              <li>
                <a href="http://ping.rust-lang.org">Check Website Status</a>
              </li>
            </ul>
            <div className="languages">
              <label htmlFor="language-footer" className="hidden">
                Language
              </label>
              <select id="language-footer">
                <option title="English (en-US)" value="en-US">
                  English (en-US)
                </option>
                <option title="Español (es)" value="es">
                  Español (es)
                </option>
                <option title="Français (fr)" value="fr">
                  Français (fr)
                </option>
                <option title="Italiano (it)" value="it">
                  Italiano (it)
                </option>
                <option title="日本語 (ja)" value="ja">
                  日本語 (ja)
                </option>
                <option title="Português (pt-BR)" value="pt-BR">
                  Português (pt-BR)
                </option>
                <option title="Русский (ru)" value="ru">
                  Русский (ru)
                </option>
                <option title="Türkçe (tr)" value="tr">
                  Türkçe (tr)
                </option>
                <option title="简体中文 (zh-CN)" value="zh-CN">
                  简体中文 (zh-CN)
                </option>
                <option title="正體中文 (zh-TW)" value="zh-TW">
                  正體中文 (zh-TW)
                </option>
              </select>
            </div>
          </div>
          <div className="flex flex-column mw8 w-100 measure-wide-l pv2 pv5-m pv2-ns ph4-m ph4-l">
            <h4>Terms and policies</h4>
            <ul>
              <li>
                <a href="/policies/code-of-conduct">Code of Conduct</a>
              </li>
              <li>
                <a href="/policies/licenses">Licenses</a>
              </li>
              <li>
                <a href="/policies/media-guide">Logo Policy and Media Guide</a>
              </li>
              <li>
                <a href="/policies/security">Security Disclosures</a>
              </li>
              <li>
                <a href="/policies/privacy">Privacy Notice</a>
              </li>
              <li>
                <a href="/policies">All Policies</a>
              </li>
            </ul>
          </div>
          <div className="flex flex-column mw8 w-100 measure-wide-l pv2 pv5-m pv2-ns ph4-m ph4-l">
            <h4>Social</h4>
            <div className="flex flex-row flex-wrap">
              <a href="https://twitter.com/rustlang">
                <img
                  src="/static/images/twitter.svg"
                  alt="twitter logo"
                  title="Twitter"
                />
              </a>
              <a href="https://www.youtube.com/channel/UCaYhcUwRBNscFNUKTjgPFiA">
                <img
                  className="pv2"
                  src="/static/images/youtube.svg"
                  alt="youtube logo"
                  title="YouTube"
                />
              </a>
              <a href="https://discord.gg/rust-lang">
                <img
                  src="/static/images/discord.svg"
                  alt="discord logo"
                  title="Discord"
                />
              </a>
              <a href="https://github.com/rust-lang">
                <img
                  src="/static/images/github.svg"
                  alt="github logo"
                  title="GitHub"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="attribution">
          <p>
            Maintained by the Rust Team. See a bug?
            <a href="https://github.com/rust-lang/www.rust-lang.org/issues/new/choose">
              File an issue!
            </a>
          </p>
          <p>
            Looking for the{" "}
            <a href="https://prev.rust-lang.org">previous website</a>?
          </p>
        </div>
      </div>
    </footer>
  );
}

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div style={{ margin: "0 auto" }}>{children}</div>
      <Footer />
    </>
  );
}

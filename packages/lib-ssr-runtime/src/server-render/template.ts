import { HelmetData } from "react-helmet-async";
import serialize from "serialize-javascript";

const NODE_ENV = process.env.NODE_ENV;

type PreRenderArgs = {
  assets: any;
  helmet?: HelmetData;
  lang?: string;
};

type PostRenderArgs = {
  assets: any;
  ssrData: any;
  configData: any;
};

const defaultLang = "en";

export function streamOpenHTML({
  assets,
  helmet,
  lang = defaultLang,
}: PreRenderArgs) {
  // prettier-ignore
  const tags = {
    razzleJsPreload: `<link rel="preload" as="script" href="${String(assets.client.js)}">`,
    razzleCss: assets.client.css ? `<link rel="stylesheet"  href="${String(assets.client.css)}">` : "",
    helmetHtmlAttributes: helmet ? helmet.htmlAttributes.toString() : `lang="${lang}"`,
    helmetBodyAttributes: helmet ? helmet.bodyAttributes.toString() : ``,
    helmetBase: helmet ? helmet.base.toString() : "",
    helmetTitle: helmet ? helmet.title.toString() : "",
    helmetMetas: helmet ? helmet.meta.toString() : "",
    helmetLinks: helmet ? helmet.link.toString() : "",
  };
  return `
    <!doctype html>
    <html ${tags.helmetHtmlAttributes}>
      <head>
          ${tags.helmetBase || ""}

          ${tags.helmetTitle || ""}

          ${tags.helmetMetas}

          ${tags.helmetLinks}
          ${tags.razzleCss}
          ${tags.razzleJsPreload}
      </head>
      <body ${tags.helmetBodyAttributes}>
          <div id="root">
  `.trim();
}

export function streamCloseHTML({
  assets,
  ssrData,
  configData,
}: PostRenderArgs) {
  // prettier-ignore
  const tags = {
    razzleJS: `<script src="${String(assets.client.js)}" defer${NODE_ENV === "production" ? "" : " crossorigin"}></script>`,
    inlinedConfig: `
    <script>
      window.__CONFIG_DATA__ = ${serialize(configData, { isJSON: true })};
      window.__SSR_DATA__ = ${serialize(ssrData, { isJSON: true })};
    </script>
    `.replace(/\s{2,}/g,' ').trim(),
  };
  return `
          </div>
          <div id="modal-root"></div>
          ${tags.razzleJS}
          ${tags.inlinedConfig}
      </body>
    </html>`.trim();
}

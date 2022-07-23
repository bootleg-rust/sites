import { HelmetServerState } from "react-helmet-async";
import serialize from "serialize-javascript";

const NODE_ENV = process.env.NODE_ENV;

type PreRenderArgs = {
  assets: any;
  helmet?: HelmetServerState;
  lang?: string;
};

type PostRenderArgs = {
  assets: any;
  ssrData: any;
  configData: any;
  cspNonce: string;
  localizationData: any;
};

export function streamOpenHTML({ assets, helmet }: PreRenderArgs) {

  // prettier-ignore
  const tags = {
    razzleJsPreload: `<link rel="preload" as="script" href="${String(assets.client.js)}">`,
    razzleCss: assets.client.css ? `<link rel="stylesheet"  href="${String(assets.client.css)}">` : "",
    helmetHtmlAttributes: helmet ? helmet.htmlAttributes.toString() : ``,
    helmetBodyAttributes: helmet ? helmet.bodyAttributes.toString() : ``,
    helmetBase: helmet ? helmet.base.toString() : "",
    helmetTitle: helmet ? helmet.title.toString() : "",
    helmetMetas: helmet ? helmet.meta.toString() : "",
    helmetLinks: helmet ? helmet.link.toString() : "",
  };
  const responseString = `
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
  return responseString;
}

export function streamCloseHTML({
  assets,
  ssrData,
  configData,
  cspNonce,
  localizationData,
}: PostRenderArgs) {
  // prettier-ignore
  const tags = {
    razzleJS: `<script src="${String(assets.client.js)}" defer${NODE_ENV === "production" ? "" : " crossorigin"}></script>`,
    inlinedConfig: `
    <script nonce=${serialize(cspNonce, { isJSON: true })}>
      window.__CONFIG_DATA__ = ${serialize(configData, { isJSON: true })};
      window.__SSR_DATA__ = ${serialize(ssrData, { isJSON: true })};
      window.__LOCALE_DATA__ = ${serialize(localizationData, { isJSON: true })};
    </script>
    `.replace(/\s{2,}/g,' ').trim(),
  };

  const responseString = `
          </div>
          <div id="modal-root"></div>
          ${tags.inlinedConfig}
          ${tags.razzleJS}
      </body>
    </html>`.trim();
  return responseString;
}

import path from "path";
import fs from "fs";
import Koa from "koa";
import serialize from "serialize-javascript";

export type ServeIndexTemplateConfig = {
  universalConfig: any;
  template: string;
};

export function serveIndexTemplate({
  universalConfig,
  template = "index-template.html",
}: ServeIndexTemplateConfig) {
  const templateFile = path.join(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    process.env.RAZZLE_ASSETS_MANIFEST!,
    "..",
    template,
  );
  const indexTemplate = fs.readFileSync(templateFile).toString();

  return (ctx: Koa.Context) => {
    const c = serialize(universalConfig, { isJSON: true });
    const cspNonce = ctx.state.cspNonce;
    const configTag = `<script nonce=${serialize(cspNonce, {
      isJSON: true,
    })}>window.__CONFIG_DATA__ = ${c};</script>`;
    const data = indexTemplate.replace(/<\/head>/g, `${configTag}</head>`);
    ctx.status = 200;
    ctx.body = data;
    return;
  };
}

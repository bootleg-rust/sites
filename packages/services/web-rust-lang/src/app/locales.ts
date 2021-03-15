/* eslint-disable import/no-unresolved */
import { isServer, isClient } from "@ssr-kit/toolbox";

import commonResources from "./locales/*.ftl";

import de from "./locales/de/*.ftl";
import enUS from "./locales/en-US/*.ftl";
import es from "./locales/es/*.ftl";
import fa from "./locales/fa/*.ftl";
import fr from "./locales/fr/*.ftl";
import it from "./locales/it/*.ftl";
import ja from "./locales/ja/*.ftl";
import ko from "./locales/ko/*.ftl";
import pl from "./locales/pl/*.ftl";
import ptBR from "./locales/pt-BR/*.ftl";
import ru from "./locales/ru/*.ftl";
import tr from "./locales/tr/*.ftl";
import xxAU from "./locales/xx-AU/*.ftl";
import zhCN from "./locales/zh-CN/*.ftl";
import zhTW from "./locales/zh-TW/*.ftl";

export const localizationResources = {
  de: [...de, ...commonResources],
  "en-US": [...enUS, ...commonResources],
  es: [...es, ...commonResources],
  fa: [...fa, ...commonResources],
  fr: [...fr, ...commonResources],
  it: [...it, ...commonResources],
  ja: [...ja, ...commonResources],
  ko: [...ko, ...commonResources],
  pl: [...pl, ...commonResources],
  "pt-BR": [...ptBR, ...commonResources],
  ru: [...ru, ...commonResources],
  tr: [...tr, ...commonResources],
  "xx-AU": [...xxAU, ...commonResources],
  "zh-CN": [...zhCN, ...commonResources],
  "zh-TW": [...zhTW, ...commonResources],
};

// TODO: This is a super hacky way to get around the fact that I need
// to fix the fluent webpack/razzle plugin

if (isServer) {
  for (const [_key, values] of Object.entries(localizationResources)) {
    const key = _key as keyof typeof localizationResources;
    localizationResources[key] = values.map((mod) => {
      return {
        data: mod.default,
      };
    });
  }
}

if (isClient) {
  for (const [_key, values] of Object.entries(localizationResources)) {
    const key = _key as keyof typeof localizationResources;
    localizationResources[key] = values.map((url) => {
      return {
        url,
      };
    });
  }
}

import React from "react";
import { useRouteMatch } from "react-router";
import { css, Select } from "@bootleg-rust/design-system";
import { flx } from "@pseudo-su/flex-elements";

const selectCss = css`
  flex-direction: row;
  align-items: center;

  padding-top: ${({ theme }) => theme.spacing[8]};
  padding-bottom: ${({ theme }) => theme.spacing[8]};

  color: black;

  ${flx.select} {
    text-align: center;
  }
`;

export function LanguageSelect({
  onChange,
  ...props
}: {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
} & React.ComponentProps<typeof flx.div>) {
  const match = useRouteMatch<{ lang: string }>();
  const lang = match.params.lang || "en-US";
  return (
    <flx.div css={selectCss} {...props}>
      <Select
        value={lang}
        data-current-lang={lang}
        onChange={onChange}
        aria-label="Language"
        title="Language"
      >
        <Select.Option title="English (en-US)" value="en-US">
          {/* English 🇺🇸 (en-US) */}
          English (en-US)
        </Select.Option>
        <Select.Option title="Español (es)" value="es">
          {/* Español 🇪🇸 (es) */}
          Español (es)
        </Select.Option>
        <Select.Option title="Français (fr)" value="fr">
          {/* Français 🇫🇷 (fr) */}
          Français (fr)
        </Select.Option>
        <Select.Option title="Italiano (it)" value="it">
          {/* Italiano 🇮🇹 (it) */}
          Italiano (it)
        </Select.Option>
        <Select.Option title="日本語 (ja)" value="ja">
          {/* 日本語 🇯🇵 (ja) */}
          日本語 (ja)
        </Select.Option>
        <Select.Option title="Português (pt-BR)" value="pt-BR">
          {/* Português 🇧🇷 (pt-BR) */}
          Português (pt-BR)
        </Select.Option>
        <Select.Option title="Русский (ru)" value="ru">
          {/* Русский 🇷🇺 (ru) */}
          Русский (ru)
        </Select.Option>
        <Select.Option title="Türkçe (tr)" value="tr">
          {/* Türkçe 🇹🇷 (tr) */}
          Türkçe (tr)
        </Select.Option>
        <Select.Option title="简体中文 (zh-CN)" value="zh-CN">
          {/* 简体中文 🇨🇳 (zh-CN) */}
          简体中文 (zh-CN)
        </Select.Option>
        <Select.Option title="正體中文 (zh-TW)" value="zh-TW">
          {/* 正體中文 🇹🇼 (zh-TW) */}
          正體中文 (zh-TW)
        </Select.Option>
      </Select>
    </flx.div>
  );
}

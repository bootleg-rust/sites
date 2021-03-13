import React from "react";
import { css, Select } from "@bootleg-rust/design-system";
import { flx } from "@pseudo-su/flex-elements";
import { useI18n } from "@ssr-kit/toolbox";

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
  const { locale, availableLocales } = useI18n();

  return (
    <flx.div css={selectCss} {...props}>
      <Select
        value={locale.code}
        onChange={onChange}
        aria-label="Language"
        title="Language"
      >
        {Array.from(availableLocales, ([code, { name }]) => (
          <Select.Option title={`${name} (${code})`} value={code} key={code}>
            {name} ({code})
          </Select.Option>
        ))}
      </Select>
    </flx.div>
  );
}

import React from "react";
import { css } from "@bootleg-rust/lib-design-system";
import { flx } from "@pseudo-su/flex-elements";

export function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <flx.header block>
      <flx.div
        css={`
          display: inline-block;
          font-size: 3rem;
          line-height: 1.25;
          padding-top: 10px;
          padding-bottom: 30px;
          font-weight: 800;
        `}
      >
        {children}
        <flx.div
          block
          css={css`
            position: relative;
            height: 1rem;
            margin-left: -1rem;
            width: calc(100% + 3.5rem);
            max-width: 90vw;
            background-color: ${({ theme }) => theme.colors.accent.var};
          `}
        />
      </flx.div>
    </flx.header>
  );
}

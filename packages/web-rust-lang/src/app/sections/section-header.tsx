import React from "react";
import { css, Div, Header } from "@bootleg-rust/lib-design-system";

export function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <Header block>
      <Div
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
        <Div
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
      </Div>
    </Header>
  );
}

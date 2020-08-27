import React from "react";
import {
  styled,
  css,
  Div,
  Section,
  Header,
} from "@bootleg-rust/lib-design-system";

const CenteredWrapper = styled(Div)`
  justify-content: center;
  align-items: center;

  padding-top: ${({ theme }) => theme.spacing[16]};
  padding-bottom: ${({ theme }) => theme.spacing[16]};
  padding-left: ${({ theme }) => theme.spacing[5]};
  padding-right: ${({ theme }) => theme.spacing[5]};

  & > * {
    /* max content width */
    width: 1128px;
    max-width: 100%;
  }
`;

export function PageCentered({ ...props }: React.ComponentProps<typeof Div>) {
  return (
    <CenteredWrapper>
      <Div {...props} />
    </CenteredWrapper>
  );
}

export function PageSectionCentered({
  ...props
}: React.ComponentProps<typeof Section>) {
  return (
    <CenteredWrapper
      css={css`
        padding-bottom: ${({ theme }) => theme.spacing[32]};
      `}
    >
      <Section {...props} />
    </CenteredWrapper>
  );
}

export function PageHeaderCentered({
  ...props
}: React.ComponentProps<typeof Header>) {
  return (
    <CenteredWrapper
      css={css`
        padding-top: ${({ theme }) => theme.spacing[8]};
      `}
    >
      <Header {...props} />
    </CenteredWrapper>
  );
}

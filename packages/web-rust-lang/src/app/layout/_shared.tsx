import React from "react";
import { styled, Div } from "@bootleg-rust/lib-design-system";

const CenteredSectionStyle = styled(Div)`
  justify-content: center;
  align-items: center;

  padding-top: ${({ theme }) => theme.spacing[16]};
  padding-bottom: ${({ theme }) => theme.spacing[16]};
  padding-left: ${({ theme }) => theme.spacing[5]};
  padding-right: ${({ theme }) => theme.spacing[5]};

  & > ${Div} {
    /* max content width */
    width: 1128px;
    max-width: 100%;
  }
`;

export function CenteredSection({
  ...props
}: React.ComponentProps<typeof Div>) {
  return (
    <CenteredSectionStyle>
      <Div {...props} />
    </CenteredSectionStyle>
  );
}

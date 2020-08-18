import React from "react";
import { styled, Div } from "@bootleg-rust/lib-design-system";

const CenteredContentStyle = styled(Div)`
  justify-content: center;
  align-items: center;

  padding-top: 4rem;
  padding-bottom: 4rem;
  padding-left: 1rem;
  padding-right: 1rem;

  & > ${Div} {
    width: 1128px;
    max-width: 100%;
  }
`;

export function CenteredContent({
  ...props
}: React.ComponentProps<typeof Div>) {
  return (
    <CenteredContentStyle>
      <Div {...props} />
    </CenteredContentStyle>
  );
}

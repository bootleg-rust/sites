import React from "react";
import { styled, Header, Div, H1, H2 } from "@bootleg-rust/lib-design-system";
import { CenteredSection } from "../layout/_shared";
import ferrisErrorImg from "./ferris-img.png";

const Content = styled(CenteredSection)`
  text-align: center;
  gap: ${({ theme }) => theme.spacing[10]};

  ${H2} {
    font-size: ${({ theme }) => theme.fontSize["3xl"]};
    color: ${({ theme }) => theme.colors.textMuted.var};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    line-height: ${({ theme }) => theme.lineHeight.tight};
  }
  ._ferris {
    img {
      width: 80%;
      max-width: 100%;
    }
  }

  @media ${({ theme }) => theme.media.notSmall} {
    ${H2} {
      font-size: ${({ theme }) => theme.fontSize["5xl"]};
    }
  }

  @media ${({ theme }) => theme.media.large} {
    flex-direction: row;
    text-align: left;
    justify-items: flex-start;

    ._error-message {
      align-items: flex-start;
    }
    ._ferris img {
      width: 305px;
    }
  }
`;

export function FerrisErrorSection({ code }: { code: number }) {
  return (
    <Header grow justify="center">
      <Content alignItems="center">
        <Div alignItems="center" justify="center" className="_error-message">
          <H1>{code}</H1>
          <H2>Whoops, this page doesn’t exist :-(</H2>
        </Div>
        <Div justify="center" alignItems="center" grow className="_ferris">
          <img src={ferrisErrorImg} alt="404 not found image" />
        </Div>
      </Content>
    </Header>
  );
}

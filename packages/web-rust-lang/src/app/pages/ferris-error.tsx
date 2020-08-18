import React from "react";
import { styled, Header, Div, H1, H2 } from "@bootleg-rust/lib-design-system";
import { CenteredContent } from "../layout/_shared";
import ferrisErrorImg from "./ferris-img.png";

const Content = styled(CenteredContent)`
  gap: 2.5em;
  text-align: center;

  ${H2} {
    font-size: 2.5rem;
    color: #2a3439;
    font-weight: 600;
    line-height: 1.25;
  }
  ._ferris {
    img {
      width: 80%;
      max-width: 100%;
    }
  }

  @media ${({ theme }) => theme.media.notSmall} {
    ${H2} {
      font-size: 3rem;
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

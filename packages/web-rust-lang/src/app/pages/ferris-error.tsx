import React from "react";
import { styled, Div, HeroHeading, H2 } from "@bootleg-rust/lib-design-system";
import { PageHeaderCentered } from "../sections";
import ferrisErrorImg from "./ferris-img.png";

const PageHeader = styled(PageHeaderCentered)`
  text-align: center;
  gap: ${({ theme }) => theme.spacing[10]};

  ${H2} {
    font-size: ${({ theme }) => theme.fontSize["3xl"]};
    color: ${({ theme }) => theme.colors.colorMuted.var};
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
    <PageHeader alignItems="center">
      <Div alignItems="center" justify="center" className="_error-message">
        <HeroHeading>{code}</HeroHeading>
        <H2>Whoops, this page doesn’t exist :-(</H2>
      </Div>
      <Div justify="center" alignItems="center" grow className="_ferris">
        <img src={ferrisErrorImg} alt="404 not found image" />
      </Div>
    </PageHeader>
  );
}

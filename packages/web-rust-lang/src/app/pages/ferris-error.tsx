import React from "react";
import { styled, HeroHeading } from "@bootleg-rust/lib-design-system";
import { flx } from "@pseudo-su/flex-elements";
import { PageHeaderCentered } from "../sections";
import ferrisErrorImg from "./ferris-img.png";

const PageHeader = styled(PageHeaderCentered)`
  text-align: center;
  gap: ${({ theme }) => theme.spacing[10]};

  ${flx.h2} {
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
    ${flx.h2} {
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
      <flx.div alignItems="center" justify="center" className="_error-message">
        <HeroHeading>{code}</HeroHeading>
        <flx.h2>Whoops, this page doesn’t exist :-(</flx.h2>
      </flx.div>
      <flx.div justify="center" alignItems="center" grow className="_ferris">
        <img src={ferrisErrorImg} alt="404 not found image" />
      </flx.div>
    </PageHeader>
  );
}

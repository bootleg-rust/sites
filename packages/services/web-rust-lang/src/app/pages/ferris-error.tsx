import React from "react";
import { styled, HeroHeading, H2 } from "@bootleg-rust/design-system";
import { flx } from "@pseudo-su/flex-elements";
import { Localized, useLocalizedString } from "@bootleg-rust/features";
import { PageHeaderCentered } from "../sections";
import ferrisErrorImg from "./ferris-img.png";

const PageHeader = styled(PageHeaderCentered)`
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
  const imgAlt = useLocalizedString("error404-img-alt");
  return (
    <PageHeader alignItems="center">
      <flx.div alignItems="center" justify="center" className="_error-message">
        <HeroHeading>{code}</HeroHeading>
        <H2>
          <Localized id="error404-subtitle" />
        </H2>
      </flx.div>
      <flx.div justify="center" alignItems="center" grow className="_ferris">
        <img src={ferrisErrorImg} alt={imgAlt} />
      </flx.div>
    </PageHeader>
  );
}

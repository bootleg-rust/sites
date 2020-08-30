import React from "react";
import {
  styled,
  css,
  Div,
  Section,
  Header,
  SemanticColor,
} from "@bootleg-rust/lib-design-system";

type SectionBrandConfig = {
  foreground?: SemanticColor;
  background?: SemanticColor;
  accent?: SemanticColor;
  link?: SemanticColor;
};

const CenteredWrapper = styled(Div)<{
  brand?: SectionBrandConfig;
}>`
  justify-content: center;
  align-items: center;

  padding-top: ${({ theme }) => theme.spacing[12]};
  padding-bottom: ${({ theme }) => theme.spacing[12]};
  padding-left: ${({ theme }) => theme.spacing[5]};
  padding-right: ${({ theme }) => theme.spacing[5]};

  ${({ theme, brand }) => {
    if (!brand) {
      return css``;
    }

    return css`
      ${brand.background && theme.colors.background.redefine(brand.background)}
      ${brand.foreground && theme.colors.text.redefine(brand.foreground)}
      ${brand.accent && theme.colors.accent.redefine(brand.accent)}
      ${brand.link && theme.colors.link.redefine(brand.link)}

      background-color: ${({ theme }) => theme.colors.background.var};
      color: ${({ theme }) => theme.colors.text.var};
    `;
  }}

  & > * {
    /* max content width */
    width: 1128px;
    max-width: 100%;
  }
`;

export function PageCentered({
  brand,
  ...props
}: React.ComponentProps<typeof Div> & {
  brand?: SectionBrandConfig;
}) {
  return (
    <CenteredWrapper brand={brand}>
      <Div {...props} />
    </CenteredWrapper>
  );
}

export function PageSectionCentered({
  brand,
  ...props
}: React.ComponentProps<typeof Section> & {
  brand?: SectionBrandConfig;
}) {
  return (
    <CenteredWrapper
      brand={brand}
      css={css`
        padding-bottom: ${({ theme }) => theme.spacing[24]};
      `}
    >
      <Section {...props} />
    </CenteredWrapper>
  );
}

export function PageHeaderCentered({
  brand,
  ...props
}: React.ComponentProps<typeof Header> & {
  brand?: SectionBrandConfig;
}) {
  return (
    <CenteredWrapper
      brand={brand}
      css={css`
        padding-top: ${({ theme }) => theme.spacing[8]};
        padding-bottom: ${({ theme }) => theme.spacing[32]};
      `}
    >
      <Header {...props} />
    </CenteredWrapper>
  );
}

import baseStyled, { ThemedStyledInterface } from "styled-components";
import { Theme } from "./theme";

export const styled = baseStyled as ThemedStyledInterface<Theme>;

import React, { useContext } from "react";
import {
  ThemeProvider as UntypedThemeProvider,
  ThemeContext as UntypedThemeContext,
  BaseThemeProviderComponent,
} from "styled-components";
import { Theme } from "./theme";

export const ThemeProvider = UntypedThemeProvider as BaseThemeProviderComponent<
  Theme
>;
export const ThemeContext = UntypedThemeContext as React.Context<Theme>;

// retype the useTheme hook
export function useTheme(): Theme {
  return useContext(ThemeContext);
}

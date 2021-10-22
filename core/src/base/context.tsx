import React, { createContext, useContext } from "react";
import { defaultTheme, Theme } from "./theme";

export const ThemeContext = createContext<Theme>(defaultTheme);

export const useTheme = () => useContext(ThemeContext);

export interface ThemeProviderProps {
  theme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme, children }) => (
  <ThemeContext.Provider value={theme ?? defaultTheme}>{children}</ThemeContext.Provider>
);

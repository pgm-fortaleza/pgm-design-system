import tokens from "../dist/tokens/tokens.json";

export type PgmThemeName = "portal" | "processos" | "divida";
export type PgmMode = "light" | "dark";
export type PgmTokenValues = { [name: string]: string | number };

interface PgmTheme {
  name: string;
  status: string;
  modes: { light: PgmTokenValues; dark?: PgmTokenValues };
}

export const base: PgmTokenValues = tokens.base;
export const themes = tokens.themes as { [name in PgmThemeName]: PgmTheme };

export function themeValues(theme: PgmThemeName, mode: PgmMode): PgmTokenValues {
  const modes = themes[theme].modes;
  return (mode === "dark" && modes.dark) || modes.light;
}

function channel(value: number) {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string) {
  const value = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16));
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrast(foreground: string, background: string) {
  const [a, b] = [luminance(foreground), luminance(background)].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
}

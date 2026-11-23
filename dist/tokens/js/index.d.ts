export type PgmThemeName = "portal" | "processos" | "divida";
export type PgmMode = "light" | "dark";
export type PgmThemeStatus = "approved" | "provisional";
export type PgmTokenValues = { [cssVariableName: string]: string | number };

export interface PgmTheme {
  name: string;
  status: PgmThemeStatus;
  modes: { light: PgmTokenValues; dark?: PgmTokenValues };
}

export declare const base: PgmTokenValues;
export declare const themes: { [name in PgmThemeName]: PgmTheme };

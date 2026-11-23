import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import StyleDictionary from "style-dictionary";

const OUT = "dist/tokens";
const BASE = ["tokens/base/*.json"];
const seeds = JSON.parse(readFileSync("tokens/themes/seeds.json"));

export const THEMES = {
  portal: { name: "Portal PGM", status: "approved", modes: ["light"] },
  processos: { name: seeds.processos.name, status: seeds.processos.status, modes: ["light", "dark"] },
  divida: { name: seeds.divida.name, status: seeds.divida.status, modes: ["light", "dark"] },
};

const fromBase = (token) => token.filePath.includes("tokens/base/");
const fromTheme = (token) => token.filePath.includes("tokens/themes/");

async function build(source, files, filter) {
  const sd = new StyleDictionary({
    source,
    log: { verbosity: "silent" },
    platforms: {
      css: { transformGroup: "css", prefix: "pgm", buildPath: `${OUT}/`, files },
    },
  });
  await sd.buildAllPlatforms();
  const tokens = await sd.getPlatformTokens("css");
  return Object.fromEntries(tokens.allTokens.filter(filter).map((token) => [token.name, token.$value]));
}

function scss(values) {
  return Object.entries(values).map(([name, value]) => `$${name}: ${value};`).join("\n") + "\n";
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(`${OUT}/scss`, { recursive: true });
mkdirSync(`${OUT}/js`, { recursive: true });

const base = await build(
  BASE,
  [{ destination: "css/base.css", format: "css/variables", filter: fromBase, options: { outputReferences: true } }],
  fromBase,
);
writeFileSync(`${OUT}/scss/_base.scss`, scss(base));

const themes = {};
const themesCss = [];

for (const [slug, theme] of Object.entries(THEMES)) {
  themes[slug] = { name: theme.name, status: theme.status, modes: {} };
  const css = [];

  for (const mode of theme.modes) {
    const dark = mode === "dark";
    const selector = dark
      ? `[data-pgm-theme="${slug}"][data-pgm-mode="dark"]`
      : `[data-pgm-theme="${slug}"]`;
    const destination = `css/.${slug}-${mode}.css`;
    const values = await build(
      [...BASE, `tokens/themes/${slug}/${mode}.json`],
      [{ destination, format: "css/variables", filter: fromTheme, options: { selector } }],
      fromTheme,
    );

    themes[slug].modes[mode] = values;
    writeFileSync(`${OUT}/scss/_${slug}-${mode}.scss`, scss(values));

    const block = readFileSync(`${OUT}/${destination}`, "utf8");
    rmSync(`${OUT}/${destination}`);
    themesCss.push(block);
    css.push(dark
      ? block.replace(selector, `:root[data-pgm-mode="dark"], ${selector}`)
      : block.replace(selector, `:root, ${selector}`));
  }

  writeFileSync(`${OUT}/css/${slug}.css`, css.join("\n"));
}

writeFileSync(`${OUT}/css/themes.css`, themesCss.join("\n"));

const data = { base, themes };
const json = JSON.stringify(data, null, 2);
writeFileSync(`${OUT}/tokens.json`, `${json}\n`);
writeFileSync(`${OUT}/js/index.mjs`, `export const base = ${JSON.stringify(base, null, 2)};\n\nexport const themes = ${JSON.stringify(themes, null, 2)};\n`);
writeFileSync(`${OUT}/js/index.cjs`, `module.exports = ${json};\n`);
writeFileSync(`${OUT}/js/index.d.ts`, `export type PgmThemeName = ${Object.keys(THEMES).map((slug) => `"${slug}"`).join(" | ")};
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
`);

console.log(`${OUT}: base ${Object.keys(base).length} tokens, ${Object.keys(themes).length} themes`);

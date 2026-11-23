import { readFileSync, writeFileSync } from "node:fs";
import {
  Hct,
  SchemeTonalSpot,
  argbFromHex,
  customColor,
  hexFromArgb,
} from "@material/material-color-utilities";

const ROLES = [
  "primary", "onPrimary", "primaryContainer", "onPrimaryContainer",
  "primaryFixed", "primaryFixedDim", "onPrimaryFixed", "onPrimaryFixedVariant",
  "secondary", "onSecondary", "secondaryContainer", "onSecondaryContainer",
  "secondaryFixed", "secondaryFixedDim", "onSecondaryFixed", "onSecondaryFixedVariant",
  "tertiary", "onTertiary", "tertiaryContainer", "onTertiaryContainer",
  "tertiaryFixed", "tertiaryFixedDim", "onTertiaryFixed", "onTertiaryFixedVariant",
  "error", "onError", "errorContainer", "onErrorContainer",
  "surfaceDim", "surface", "surfaceBright",
  "surfaceContainerLowest", "surfaceContainerLow", "surfaceContainer",
  "surfaceContainerHigh", "surfaceContainerHighest",
  "onSurface", "onSurfaceVariant", "outline", "outlineVariant",
  "inverseSurface", "inverseOnSurface", "inversePrimary", "shadow", "scrim",
];

const kebab = (name) => name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
const color = (argb) => ({ $type: "color", $value: hexFromArgb(argb).toUpperCase() });

const seeds = JSON.parse(readFileSync(new URL("../tokens/themes/seeds.json", import.meta.url)));
const { custom, ...themes } = seeds;

for (const [slug, theme] of Object.entries(themes)) {
  const source = argbFromHex(theme.seed);

  for (const mode of ["light", "dark"]) {
    const dark = mode === "dark";
    const scheme = new SchemeTonalSpot(Hct.fromInt(source), dark, 0);
    const tokens = {};

    for (const role of ROLES) {
      tokens[kebab(role)] = color(scheme[role]);
    }

    for (const [name, value] of Object.entries(custom)) {
      const group = customColor(source, { name, value: argbFromHex(value), blend: true })[mode];
      tokens[name] = color(group.color);
      tokens[`on-${name}`] = color(group.onColor);
      tokens[`${name}-container`] = color(group.colorContainer);
      tokens[`on-${name}-container`] = color(group.onColorContainer);
    }

    tokens["brand-product"] = { $type: "color", $value: theme.seed.toUpperCase() };

    const file = new URL(`../tokens/themes/${slug}/${mode}.json`, import.meta.url);
    writeFileSync(file, `${JSON.stringify({ sys: { color: tokens } }, null, 2)}\n`);
    console.log(`tokens/themes/${slug}/${mode}.json`);
  }
}

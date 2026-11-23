import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync("package.json"));
const seeds = JSON.parse(readFileSync("tokens/themes/seeds.json"));
const tokens = JSON.parse(readFileSync("dist/tokens/tokens.json"));

const css = ["base.css", "portal.css", "themes.css"]
  .map((file) => readFileSync(`dist/tokens/css/${file}`, "utf8"))
  .join("\n");

const themes = Object.fromEntries(Object.entries(tokens.themes).map(([slug, theme]) => [slug, {
  name: theme.name,
  status: theme.status,
  modes: Object.keys(theme.modes),
  seed: seeds[slug] ? seeds[slug].seed : theme.modes.light["pgm-sys-color-brand-product"],
}]));
const values = Object.fromEntries(Object.entries(tokens.themes).map(([slug, theme]) => [slug, theme.modes]));

const page = readFileSync("catalog/template.html", "utf8")
  .replace("/*__TOKENS__*/", () => css)
  .replace("/*__META__*/", () => JSON.stringify({ themes, values }))
  .replaceAll("__VERSION__", pkg.version);

mkdirSync("dist/catalog", { recursive: true });
writeFileSync("dist/catalog/page.html", page);
writeFileSync("dist/catalog/index.html", `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${page.slice(0, page.indexOf("</style>\n\n<header")) + "</style>"}
</head>
<body>
${page.slice(page.indexOf("<header"))}
</body>
</html>
`);
console.log("dist/catalog/index.html");

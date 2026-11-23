# PGM Design System

Tokens no padrão Material Design 3 (cores, tipografia, cantos e espaçamentos) e componentes React, compartilhados entre o **Portal PGM**, o **Ágilis Processos** e o **Ágilis Dívida**, sistemas da Procuradoria Geral do Município de Fortaleza.

**Storybook:** https://pgm-fortaleza.github.io/pgm-design-system/

O catálogo visual das paletas sai em `dist/catalog/index.html` a cada build e fica disponível em cada pull request como artefato **catalogo-de-paletas** do workflow CI.

## Temas

| Tema | Arquivo | Modos | Situação |
|---|---|---|---|
| Portal PGM | `tokens/css/portal.css` | claro | em uso nas telas novas do Portal |
| Ágilis Processos | `tokens/css/processos.css` | claro e escuro | provisório |
| Ágilis Dívida | `tokens/css/divida.css` | claro e escuro | provisório |

Os temas dos Ágilis são gerados pelo Material Design 3 a partir das cores atuais dos sistemas (`tokens/themes/seeds.json`). Eles valem até o design definir a paleta final; aí basta trocar a cor-semente ou os valores e liberar uma nova versão.

Todos os temas têm os mesmos papéis (`primary`, `on-primary`, `surface-container`, `info`, `success`, `warning`...). Um componente escrito com `var(--pgm-sys-color-primary)` funciona em qualquer produto.

## Instalar

Não há registry npm. Instale uma versão fixa direto do repositório:

```sh
npm i github:pgm-fortaleza/pgm-design-system#v0.1.0
```

As versões estão em [Releases](https://github.com/pgm-fortaleza/pgm-design-system/releases).

## Usar

CSS (um produto por aplicação):

```js
import "@pgm/design-system/tokens/css/base.css";
import "@pgm/design-system/tokens/css/processos.css";
```

- `base.css`: tipografia, espaçamento, cantos, elevação e cores institucionais, iguais em todos os produtos.
- `<produto>.css`: cores do produto em `:root`. O modo escuro entra com `data-pgm-mode="dark"` no `<html>`.
- `themes.css`: os três produtos juntos, escolhidos por `data-pgm-theme="portal|processos|divida"`. Usado pelo catálogo.

SCSS, para valores em tempo de build:

```scss
@use "@pgm/design-system/tokens/scss/processos-light" as theme;

.badge { background: theme.$pgm-sys-color-primary-container; }
```

JavaScript/TypeScript:

```ts
import { themes } from "@pgm/design-system/tokens";

themes.divida.modes.dark["pgm-sys-color-primary"];
```

## Desenvolver

Node 24 (`nvm use`).

```sh
npm ci
npm run build
open dist/catalog/index.html
```

- `tokens/base/*.json`: tokens comuns, no formato DTCG.
- `tokens/themes/<produto>/<modo>.json`: cores de cada produto.
- `npm run themes`: regera os temas dos Ágilis a partir de `tokens/themes/seeds.json`. O tema do Portal é mantido à mão.
- `npm run build`: gera `dist/tokens` (CSS, SCSS, JS e `tokens.json`) com Style Dictionary e o catálogo em `dist/catalog`.

## Liberar uma versão

1. No pull request, crie um changeset com `npm run changeset` e rode `npm run version` para subir a versão e o `CHANGELOG.md`.
2. Depois do merge, rode o workflow **Release** em Actions → Release → Run workflow, na `main`.
3. O workflow compila, grava `dist/tokens` num commit da branch `release`, cria a tag `vX.Y.Z` e publica a release com o trecho do changelog. É essa tag que os sistemas instalam.

## Storybook

Documentação viva das fundações (cores, tipografia, cantos, elevação, espaçamento e ícones) e dos componentes, com troca de tema e modo, controles e relatório de acessibilidade.

- Publicado em https://pgm-fortaleza.github.io/pgm-design-system/ pelo workflow **Storybook** a cada merge na `main`.
- Local (Node 24, `nvm use`): `npm run storybook` abre em `http://localhost:6006`.
- Build estático: `npm run build-storybook` gera `storybook-static/`. Em cada pull request, o workflow CI deixa essa pasta como artefato **storybook**.

Histórias ficam junto do componente (`src/components/<Nome>/<Nome>.stories.tsx`); as fundações ficam em `src/foundations`.

## Contribuições

O desenvolvimento é feito pela equipe da PGM Fortaleza. Pull requests de forks são fechados automaticamente.

## Licença

[Apache License 2.0](LICENSE). Os nomes e marcas "PGM", "Portal PGM" e "Ágilis" não estão incluídos na licença (ver [NOTICE](NOTICE)).

## Documentação

- [Estudo e plano](docs/estudo.md)

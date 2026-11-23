# PGM Design System

Tokens no padrão Material Design 3 (cores, tipografia, cantos e espaçamentos) e componentes React, compartilhados entre o **Portal PGM**, o **Ágilis Processos** e o **Ágilis Dívida**, sistemas da Procuradoria Geral do Município de Fortaleza.

**Storybook:** https://pgm-fortaleza.github.io/pgm-design-system/

## Temas

| Tema | Arquivo | Modos |
|---|---|---|
| Portal PGM | `tokens/css/portal.css` | claro |
| Ágilis Processos | `tokens/css/processos.css` | claro e escuro |
| Ágilis Dívida | `tokens/css/divida.css` | claro e escuro |

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

Componentes React (React 18 ou superior), com o CSS deles importado uma vez na aplicação:

```tsx
import "@pgm/design-system/ui/style.css";
import { Button, StatusTag, Table } from "@pgm/design-system/ui";
```

Os componentes, suas propriedades e exemplos estão no Storybook.

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
- `npm run build`: gera `dist/tokens` (CSS, SCSS, JS e `tokens.json`) com Style Dictionary, o catálogo em `dist/catalog` e os componentes em `dist/ui` (JS, CSS e tipos).

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

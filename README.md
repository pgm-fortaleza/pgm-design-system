# PGM Design System

Cores, tipografia, cantos e espaçamentos (tokens) no padrão Material Design 3, compartilhados entre o **Portal PGM**, o **Ágilis Processos** e o **Ágilis Dívida**.

O catálogo visual das paletas sai em `dist/catalog/index.html` a cada build e fica disponível no MR como **Catalogo de paletas** (artefato do job `build`).

## Temas

| Tema | Arquivo | Modos | Situação |
|---|---|---|---|
| Portal PGM | `tokens/css/portal.css` | claro | em uso nas telas novas do Portal |
| Ágilis Processos | `tokens/css/processos.css` | claro e escuro | provisório |
| Ágilis Dívida | `tokens/css/divida.css` | claro e escuro | provisório |

Os temas dos Ágilis são gerados pelo Material Design 3 a partir das cores atuais dos sistemas (`tokens/themes/seeds.json`). Eles valem até o design definir a paleta final; aí basta trocar a cor-semente ou os valores e liberar uma nova versão.

Todos os temas têm os mesmos papéis (`primary`, `on-primary`, `surface-container`, `info`, `success`, `warning`...). Um componente escrito com `var(--pgm-sys-color-primary)` funciona em qualquer produto.

## Instalar

Não há registry npm. Cada sistema instala uma versão fixa direto do repositório:

```sh
npm i git+https://gitlab.fortaleza.ce.gov.br/devpgm/pgm-design-system.git#v0.1.0
```

No CI do sistema, antes do `npm ci`:

```sh
git config --global url."https://gitlab-ci-token:${CI_JOB_TOKEN}@gitlab.fortaleza.ce.gov.br/".insteadOf "https://gitlab.fortaleza.ce.gov.br/"
```

O projeto do sistema precisa estar na lista de acesso do job token deste repositório (Settings > CI/CD > Job token permissions).

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

Node 18 ou superior.

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

1. No MR, crie um changeset com `npm run changeset` e rode `npm run version` para subir a versão e o `CHANGELOG.md`.
2. Depois do merge, rode o job manual `release` na pipeline da `main`.
3. O job compila, grava `dist/tokens` num commit da branch `release` e cria a tag `vX.Y.Z`. É essa tag que os sistemas instalam.

O job usa a variável `RELEASE_TOKEN` (token de projeto com `write_repository`).

## Storybook

Documentação viva das fundações (cores, tipografia, cantos, elevação, espaçamento e ícones) e dos componentes, com troca de tema e modo, controles e relatório de acessibilidade.

- Publicado em http://pages.pgm.for.br/pgm-design-system/ (rede da PGM ou VPN), atualizado até 10 minutos depois de cada merge na `main`.
- Local (Node 24, `nvm use`): `npm run storybook` abre em `http://localhost:6006`.
- Build estático: `npm run build-storybook` gera `storybook-static/`. No CI, o job `storybook` deixa essa pasta como artefato **Storybook**.

Histórias ficam junto do componente (`src/components/<Nome>/<Nome>.stories.tsx`); as fundações ficam em `src/foundations`.

## Documentação

- [Estudo e plano](docs/estudo.md)

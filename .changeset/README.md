# Changesets

Todo MR que muda tokens ou componentes traz um arquivo aqui, criado com `npm run changeset`:

- `patch`: ajuste visual (ex.: raio do botão);
- `minor`: token, componente ou propriedade nova;
- `major`: mudança que quebra uso (token renomeado ou removido).

Antes de liberar uma versão, `npm run version` junta os arquivos, sobe a versão no `package.json` e atualiza o `CHANGELOG.md`.

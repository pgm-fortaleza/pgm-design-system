# Estudo: identidade visual única para Portal e Ágilis

Outubro de 2026. Equipe de desenvolvimento da PGM Fortaleza.

## Resumo

O Portal PGM e os dois Ágilis (Processos e Dívida) estão sendo redesenhados no padrão Material Design 3. Hoje cada sistema guarda as próprias cores e os próprios componentes, e os dois Ágilis têm dezenas de componentes copiados um do outro que já divergiram.

A proposta é ter **uma biblioteca única** com as cores, letras, cantos, espaçamentos e, depois, os componentes. Os três sistemas instalam essa biblioteca por versão. Uma mudança feita uma vez, como deixar os botões menos arredondados, chega a todos como uma atualização revisada em cada sistema.

A primeira entrega já está pronta: a biblioteca com as cores dos três produtos e um catálogo visual das paletas.

## O problema

| | Ágilis Processos | Ágilis Dívida | Portal PGM |
|---|---|---|---|
| Base das telas | React 17, MUI v5 e v4, styled-components | React 18, MUI v5 | React 16, Bootstrap 4, Material Web nas telas novas |
| Cores | arquivo próprio (azul `#1EB1E7`) | arquivo próprio (verde `#1ECAA1`) | tokens MD3 (laranja da PGM) |

- **40 componentes com o mesmo nome** nos dois Ágilis. Só 5 são idênticos; o resto já divergiu. O `Select`, por exemplo, tem 310 linhas de diferença entre um sistema e outro, e o `Tab` tem 641.
- **Cada ajuste visual vira três trabalhos**, com risco de cada sistema ficar de um jeito.
- O Portal já separa as telas novas (cores MD3) das antigas. Uma tentativa de aplicar as cores novas nas telas antigas deixou tudo laranja e foi revertida. A biblioteca segue a mesma regra: só as telas novas usam.

## O que o mercado usa

- **Tokens de design**: cores, letras e medidas guardadas num formato padrão (W3C Design Tokens, estável desde outubro de 2025) e convertidas automaticamente para CSS, SCSS e JavaScript. A ferramenta mais usada para isso é o Style Dictionary.
- **Biblioteca separada dos sistemas**, com catálogo visual, controle de versão e changelog.
- **Bases prontas descartadas**:
  - o Material Web, do Google, entrou em modo de manutenção e não recebe novidades;
  - o MUI ainda não tem Material Design 3 nativo, e o Portal não usa MUI.

## A decisão

1. **Um repositório próprio**, `devpgm/pgm-design-system`, com um pacote só (`@pgm/design-system`) dividido em partes:
   - `tokens`: cores, tipografia, cantos, espaçamento e sombra (entregue);
   - `ui`: componentes React (botão, janela, campos, tabela...), escritos uma vez para os três sistemas;
   - `agilis`: blocos de negócio que hoje estão copiados nos dois Ágilis, como os painéis de dívida.
2. **Um tema por produto, com os mesmos papéis.** "Principal", "Superfície", "Sucesso" existem em todos os temas, só a cor muda. Um componente feito para o Portal funciona no Ágilis sem ajuste.
3. **Instalação por versão fixa**, direto do GitLab, sem depender de registry de pacotes:
   `git+https://gitlab.fortaleza.ce.gov.br/devpgm/pgm-design-system.git#v0.1.0`
4. **Atualização revisada em cada sistema.** Quando sai uma versão nova, um robô (Renovate) abre sozinho um pedido de atualização (MR) em cada sistema. Cada equipe revisa, testa no próprio CI e publica no próprio deploy. Se algo quebrar num sistema, os outros não são afetados.

### Exemplo: botões menos arredondados

1. Muda-se o token de canto do botão na biblioteca e sai a versão `0.1.1`.
2. O Renovate abre um MR em cada sistema trocando `v0.1.0` por `v0.1.1`.
3. Cada sistema aprova e publica quando quiser.

## O que foi entregue na v0.1.0

- **Repositório** `devpgm/pgm-design-system` com build automático no CI.
- **Tokens dos três produtos**:
  - Portal PGM: exatamente os valores em uso hoje (178 tokens conferidos um a um), mais a escala de cantos arredondados;
  - Ágilis Processos e Ágilis Dívida: proposta provisória, com modo claro e escuro, gerada pelo Material Design 3 a partir das cores atuais de cada sistema.
- **Catálogo de paletas**: página que mostra cada produto em modo claro e escuro, com uma tela de exemplo, todas as cores com o contraste de acessibilidade, comparação lado a lado dos três produtos, tipografia, cantos, espaçamento e sombras.
- **Processo de versão**: changelog e job de release que gera a tag instalável.

Nenhum sistema foi alterado nesta entrega. Ligar o Portal à biblioteca exige deploy e homologação e fica para o próximo card.

## Próximos passos

| Card | O que é | Depende de |
|---|---|---|
| DS-01 | **Definir as cores dos sistemas Ágilis**: manter azul e verde no padrão novo ou usar o laranja da PGM | — |
| DS-02 | **Criar a biblioteca visual compartilhada** | entregue (v0.1.0) |
| DS-03 | **Portal passa a usar a biblioteca**, sem mudança na tela | DS-02 |
| DS-04 | **Atualização automática nos sistemas** (Renovate) | DS-02 |
| DS-05 | **Ágilis no novo padrão de cores**, só nas telas novas | DS-01, DS-02 |
| DS-06 | **Botões, janelas e etiquetas iguais nos três sistemas** | DS-03, DS-05 |
| DS-07 | **Campos de formulário, tabelas e avisos iguais nos três sistemas** | DS-06 |
| DS-08 | **Unificar os painéis de dívida dos dois Ágilis** (opcional) | DS-05 |

O DS-01 é a única decisão de produto pendente: sem ele, os temas dos Ágilis continuam provisórios.

## Riscos

- **Acesso dos runners ao repositório**: o CI de cada sistema precisa baixar a biblioteca do GitLab com o token do job. Será validado no DS-03.
- **Portal em versões antigas** (React 16, TypeScript 3.7): a biblioteca entrega CSS e JavaScript já compilados para funcionar nessas versões.
- **Renovate**: depende de o runner conseguir baixar a imagem do robô. Será validado no DS-04.

## Fontes

- [W3C Design Tokens: primeira versão estável](https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/)
- [Style Dictionary](https://styledictionary.com)
- [Material Web](https://material-web.dev)
- [MUI: planos para Material Design 3](https://mui.com/blog/material-ui-2024-updates/)
- [Renovate: dependências por tag git](https://docs.renovatebot.com/modules/datasource/git-tags/)
- [GitLab: job token](https://docs.gitlab.com/ci/jobs/ci_job_token/)

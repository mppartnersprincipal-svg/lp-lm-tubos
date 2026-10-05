# Dashboard no Looker Studio: LP LM Tubos

Roteiro para montar o painel de resultados da landing page em cerca de 20 minutos, usando o GA4 da LP (`G-WBE4K48M82`, propriedade "LP - LM Tubos").
O mesmo roteiro serve para outras LPs da agência: troque a propriedade e os nomes dos eventos.

## Antes de começar (sem isto o painel fica vazio)

- [ ] GTM publicado com o acionador "CE - whatsapp_click (sem formulário)" em **não é igual a** `form`
- [ ] GA4: eventos principais `whatsapp_click` e `generate_lead` criados (Admin → Exibição de dados → Eventos principais)
- [ ] GA4: dimensões personalizadas criadas (Admin → Definições personalizadas), ambas com escopo **Evento**:
  - "Origem do WhatsApp", parâmetro `whatsapp_origem`
  - "Origem do lead", parâmetro `lead_origem`
- [ ] Pelo menos 24–48 h de dados depois disso

## 1. Criar o relatório e a fonte de dados

1. Acesse lookerstudio.google.com, clique em **Criar** e depois em **Relatório**.
2. Escolha o conector **Google Analytics**, selecione a conta e a propriedade **LP - LM Tubos** e clique em **Adicionar**.
3. Renomeie o relatório para **"LM Tubos · Resultados da LP"**.
4. Em **Arquivo → Configurações do relatório**:
   - Período padrão: **Últimos 28 dias**
   - Comparação: **Período anterior**
5. Tema: em **Tema e layout → Personalizar**, use:
   - cor principal `#2C2A7C` (navy);
   - cor de destaque `#E53013` (vermelho);
   - fundo `#F4F4F5`.

> Se as dimensões "Origem do WhatsApp" e "Origem do lead" não aparecerem na lista de campos, vá em **Recurso → Gerenciar fontes de dados → Editar → Atualizar campos**.

## 2. Layout da página

Tamanho da página: 1200 × 1600 (Tema e layout → Layout). Monte de cima para baixo:

```
[ Logo + título ]                                    [ Controle de período ]
[ Sessões ][ Usuários ][ Cliques WhatsApp ][ Leads formulário ][ Taxa de conversão ]
[ Linha: sessões x conversões por dia (largura total) ]
[ Tabela: origem / mídia / campanha ]      [ Barras: botão que gerou o WhatsApp ]
[ Pizza: dispositivo ]  [ Mapa: estados ]  [ Tabela: páginas de entrada ]
```

## 3. Gráficos, um por um

### 3.1 Cabeçalho
- **Imagem:** insira `site/assets/logo/logo-lm-tubos.png`.
- **Texto:** "Resultados da landing page · www.lmtubos.com".
- **Controle de período:** Inserir → Controle de período, no canto direito.

### 3.2 Visão geral (5 cartões de pontuação)

Use **Inserir → Visão geral** cinco vezes:

| Cartão | Métrica | Filtro (Adicionar um filtro) |
|---|---|---|
| Sessões | Sessões | — |
| Usuários | Total de usuários | — |
| Cliques no WhatsApp | Contagem de eventos | Incluir **Nome do evento** = `whatsapp_click` **E** Origem do WhatsApp diferente de `form` |
| Leads do formulário | Contagem de eventos | Incluir **Nome do evento** = `generate_lead` |
| Taxa de conversão | Taxa de eventos principais da sessão | — |

Em todos, ative **Estilo → Comparação com período anterior** (seta verde/vermelha).

> Por que excluir `form` dos cliques: o envio do formulário também gera um `whatsapp_click` com origem `form`. Excluindo, os botões e o formulário não se somam duas vezes.

### 3.3 Evolução diária (série temporal)
- **Inserir → Gráfico de série temporal**, largura total.
- Dimensão: **Data**.
- Métricas:
  - **Sessões**;
  - **Eventos principais**, renomeado para "Conversões".
- Estilo: Conversões no **eixo direito**, em vermelho `#E53013`.

### 3.4 De onde vêm os visitantes (tabela)
- **Inserir → Tabela**.
- Dimensões:
  - **Origem/mídia da sessão**;
  - **Campanha da sessão**.
- Métricas:
  - **Sessões**;
  - **Eventos principais**;
  - **Taxa de eventos principais da sessão**.
- Classificar por Eventos principais (decrescente), 10 linhas por página.
- Aqui aparecem as UTMs dos anúncios: `google / cpc`, `facebook / paid` etc.

### 3.5 Qual botão gera WhatsApp (barras)
- **Inserir → Gráfico de barras** (horizontal).
- Dimensão: **Origem do WhatsApp**.
- Métrica: **Contagem de eventos**.
- Filtro: Nome do evento = `whatsapp_click`.
- Ordenar decrescente.
- Valores possíveis: `hero`, `header`, `flutuante`, `destaque-conexoes`, `destaque-sprinklers`, `destaque-tubos`, `produtos-lista`, `estoque`, `orientacao`, `servicos`, `como-funciona`, `cta-final`, `rodape`, `form`.

### 3.6 Dispositivo (pizza)
- **Inserir → Gráfico de pizza** (rosca).
- Dimensão: **Categoria do dispositivo**.
- Métrica: **Sessões**.

### 3.7 Estados (mapa)
- **Inserir → Mapa geográfico**.
- Dimensão: **Região**, com zoom em **Brasil**.
- Métrica: **Sessões**.
- Serve para acompanhar o Norte e o Nordeste, que são o foco comercial.

### 3.8 Páginas de entrada (tabela pequena)
- **Inserir → Tabela**.
- Dimensão: **Página de destino + string de consulta**.
- Métricas: **Sessões** e **Eventos principais**.
- Mostra se há tráfego chegando direto em `/#orcamento` ou por outras URLs.

## 4. Compartilhar com o cliente

1. Clique em **Compartilhar → Gerenciar acesso**.
2. Adicione o e-mail do cliente como **Leitor**.
3. Opcional: **Compartilhar → Agendar envio de e-mail**, toda segunda-feira às 8h, em PDF.

## 5. Leitura rápida (para a reunião com o cliente)

| Métrica | O que observar |
|---|---|
| Taxa de conversão | Para LP de WhatsApp, algo entre 5% e 15% costuma ser saudável |
| Origem/mídia | Qual canal (Google Ads ou Meta) traz mais conversas |
| Botão que gera WhatsApp | Se o `flutuante` e o `hero` dominam, o topo da página está funcionando |
| Dispositivo | Normalmente a maioria é celular; se o celular converter menos, revisar a versão mobile |
| Estados | Confirma se os anúncios estão alcançando Norte e Nordeste |

> Os números do GA4 e do Google Ads não batem 100%: o Ads conta a conversão pela data do clique no anúncio, e quem recusa cookies entra de forma modelada. Para custo por conversão, use o próprio Google Ads.

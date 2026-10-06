# URLs com UTM dos anúncios (Google Ads) da LM Tubos

Padrão usado em todos os grupos:

| Parâmetro | Valor | Para quê |
|---|---|---|
| `utm_source` | `google` | origem |
| `utm_medium` | `cpc` | mídia paga (o painel e o GA4 classificam como Google Ads) |
| `utm_campaign` | nome da campanha, em minúsculas e com hífen | aparece no painel e na mensagem do WhatsApp para o comercial (`[origem: google / <campanha>]`) |
| `utm_content` | nome do grupo de anúncios | no painel, aba "UTMs", mostra qual grupo trouxe o contato |
| `utm_term` | `{keyword}` | o Google troca pela palavra-chave que acionou o anúncio |

A marcação automática (gclid) está ligada na conta, então o Ads e o GA4 também identificam o clique sozinhos. As UTMs servem para o painel `/dashboard` e para o Roberto ver a campanha na mensagem do WhatsApp.

Todas levam para o topo da página (`https://www.lmtubos.com/`), onde estão o título e o botão principal.

## Opção recomendada: URL final limpa + sufixo por grupo

Em cada grupo de anúncios: **Configurações do grupo → Opções de URL do grupo → Sufixo do URL final**. A **URL final** dos anúncios fica só `https://www.lmtubos.com/`.

### Campanha A. [MP] - [S] - Materiais Contra Incêndio - Brasil

| Grupo | Sufixo do URL final |
|---|---|
| Conexões e Válvulas Ranhuradas | `utm_source=google&utm_medium=cpc&utm_campaign=materiais-contra-incendio-brasil&utm_content=conexoes-valvulas-ranhuradas&utm_term={keyword}` |
| Sprinklers | `utm_source=google&utm_medium=cpc&utm_campaign=materiais-contra-incendio-brasil&utm_content=sprinklers&utm_term={keyword}` |
| Mangueiras de Incêndio | `utm_source=google&utm_medium=cpc&utm_campaign=materiais-contra-incendio-brasil&utm_content=mangueiras-de-incendio&utm_term={keyword}` |
| Bombas de Incêndio | `utm_source=google&utm_medium=cpc&utm_campaign=materiais-contra-incendio-brasil&utm_content=bombas-de-incendio&utm_term={keyword}` |
| Tubos Para Incêndio | `utm_source=google&utm_medium=cpc&utm_campaign=materiais-contra-incendio-brasil&utm_content=tubos-para-incendio&utm_term={keyword}` |
| Alarme e Detecção | `utm_source=google&utm_medium=cpc&utm_campaign=materiais-contra-incendio-brasil&utm_content=alarme-e-deteccao&utm_term={keyword}` |

### Campanha B. [MP] - [S] - Tubos Aço Carbono - Brasil

| Grupo | Sufixo do URL final |
|---|---|
| (grupo único) | `utm_source=google&utm_medium=cpc&utm_campaign=tubos-aco-carbono-brasil&utm_content=tubos-aco-carbono&utm_term={keyword}` |

## Alternativa: URL completa na URL final de cada anúncio

```
A · Conexões e Válvulas Ranhuradas
https://www.lmtubos.com/?utm_source=google&utm_medium=cpc&utm_campaign=materiais-contra-incendio-brasil&utm_content=conexoes-valvulas-ranhuradas&utm_term={keyword}

A · Sprinklers
https://www.lmtubos.com/?utm_source=google&utm_medium=cpc&utm_campaign=materiais-contra-incendio-brasil&utm_content=sprinklers&utm_term={keyword}

A · Mangueiras de Incêndio
https://www.lmtubos.com/?utm_source=google&utm_medium=cpc&utm_campaign=materiais-contra-incendio-brasil&utm_content=mangueiras-de-incendio&utm_term={keyword}

A · Bombas de Incêndio
https://www.lmtubos.com/?utm_source=google&utm_medium=cpc&utm_campaign=materiais-contra-incendio-brasil&utm_content=bombas-de-incendio&utm_term={keyword}

A · Tubos Para Incêndio
https://www.lmtubos.com/?utm_source=google&utm_medium=cpc&utm_campaign=materiais-contra-incendio-brasil&utm_content=tubos-para-incendio&utm_term={keyword}

A · Alarme e Detecção
https://www.lmtubos.com/?utm_source=google&utm_medium=cpc&utm_campaign=materiais-contra-incendio-brasil&utm_content=alarme-e-deteccao&utm_term={keyword}

B · Tubos Aço Carbono
https://www.lmtubos.com/?utm_source=google&utm_medium=cpc&utm_campaign=tubos-aco-carbono-brasil&utm_content=tubos-aco-carbono&utm_term={keyword}
```

## Cuidados

- **Não use as duas formas ao mesmo tempo**, senão os parâmetros se repetem na URL.
- Use `{keyword}` exatamente assim, com chaves e em minúsculas.
- Teste com **"Testar"** no campo de URL do Google Ads: tem que abrir a LP normalmente.
- Abrir o link de dentro do painel do Ads, com o `{keyword}` sem trocar, é contado como **"Direto"** no painel. É de propósito, para não poluir os números.

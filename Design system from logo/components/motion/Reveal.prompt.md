Wrapper que faz fade-up quando o elemento entra na tela. Use em títulos de seção e grids (delay escalonado de 80ms por item).

```jsx
<Reveal><h2>Linhas de produto</h2></Reveal>
{items.map((it,i)=><Reveal key={it} delay={i*80}>…</Reveal>)}
```

Respeita prefers-reduced-motion. Não use em conteúdo acima da dobra crítico (hero deve estar visível imediatamente).

Modal centralizado com faixa da marca no topo; usar para orçamento rápido e confirmações.

```jsx
<Dialog open={o} title="Pedir orçamento" onClose={()=>setO(false)} footer={<Button>Enviar</Button>}>…</Dialog>
```

Fecha no backdrop e no ×. Rodapé opcional em cinza claro.

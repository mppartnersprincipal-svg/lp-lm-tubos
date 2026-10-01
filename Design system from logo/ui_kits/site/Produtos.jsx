export function Produtos({go,NS}){
  const {Button,Badge,ProductCard,Tag,Tabs,Switch,Checkbox,Reveal}=NS;
  const [cat,setCat]=React.useState("todos"); const [pe,setPe]=React.useState(false);
  const wrap={maxWidth:"var(--container-max)",margin:"0 auto",padding:"0 var(--gutter)"};
  const items=[["Tubo de aço pintado vermelho","tubos","DN 1″ a 8″ · ranhurado ou roscado · barras de 6 m","Pronta entrega","success"],["Acoplamento ranhurado rígido","tubos","DN 1″ a 8″ · EPDM","Pronta entrega","success"],["Curva 90° ranhurada","tubos","DN 1″ a 8″ · ferro dúctil",null],["Válvula gaveta importada","valvulas","Haste ascendente · flangeada","Importado","primary"],["Válvula de governo e alarme","valvulas","Com trim completo","Importado","primary"],["Válvula borboleta com supervisão","valvulas","Wafer · indicador de posição","Pronta entrega","success"],["Registro de recalque","valvulas","Passeio e coluna",null],["Conjunto motobomba","bombas","Principal + jockey · painel","Sob encomenda","warning"],["Sprinkler pendente 68 °C","sprinklers","K 5,6 · resposta padrão","Pronta entrega","success"],["Sprinkler upright 79 °C","sprinklers","K 5,6 · resposta rápida","Pronta entrega","success"],["Abrigo de hidrante","hidrantes","Sobrepor e embutir","Pronta entrega","success"],["Mangueira de incêndio tipo 2","hidrantes","1½″ e 2½″ · 15 e 30 m","Pronta entrega","success"]];
  const tabs=[{value:"todos",label:"Todos"},{value:"tubos",label:"Tubos e conexões"},{value:"valvulas",label:"Válvulas e registros"},{value:"bombas",label:"Bombas"},{value:"sprinklers",label:"Sprinklers"},{value:"hidrantes",label:"Hidrantes e acessórios"}];
  const list=items.filter(i=>(cat==="todos"||i[1]===cat)&&(!pe||i[3]==="Pronta entrega"));
  return <main>
    <section style={{background:"var(--surface-subtle)",borderBottom:"1px solid var(--border-default)"}}>
      <div style={{...wrap,padding:"56px var(--gutter) 0"}}>
        <span style={{font:"var(--type-eyebrow)",letterSpacing:"var(--tracking-caps)",color:"var(--color-primary)"}}>CATÁLOGO</span>
        <h1 style={{marginTop:10,letterSpacing:"var(--tracking-tight)"}}>Produtos</h1>
        <p style={{font:"var(--type-lead)",color:"var(--text-muted)",marginTop:12,maxWidth:640}}>Sem preço no site: cada projeto tem quantidade, prazo e frete diferentes. Monte a lista e peça o orçamento.</p>
        <div style={{marginTop:32}}><Tabs items={tabs} value={cat} onChange={setCat}/></div>
      </div>
    </section>
    <section style={{...wrap,padding:"32px var(--gutter) var(--section-y)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:16,flexWrap:"wrap",marginBottom:24}}>
        <span style={{font:"var(--type-body-sm)",color:"var(--text-muted)"}} aria-live="polite">{list.length} {list.length===1?"item":"itens"}{cat!=="todos"||pe?" · ":""}{(cat!=="todos"||pe)&&<a href="#" onClick={e=>{e.preventDefault();setCat("todos");setPe(false);}} style={{color:"var(--color-primary)"}}>limpar filtros</a>}</span>
        <Switch label="Somente pronta entrega" checked={pe} onChange={setPe}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24}}>
        {list.map(([t,c,d,b,tone],i)=><Reveal key={t+cat+pe} delay={(i%3)*70}><ProductCard compact title={t} description={d} badge={b} badgeTone={tone} cta="Adicionar ao orçamento" onCta={()=>go("contato")}/></Reveal>)}
      </div>
      {list.length===0&&<div style={{padding:"64px 0",textAlign:"center",display:"grid",gap:12,justifyItems:"center"}}><span style={{font:"var(--type-h4)"}}>Nenhum item de pronta entrega nesta categoria</span><span style={{color:"var(--text-muted)"}}>Peça o orçamento mesmo assim: informamos o prazo.</span><Button variant="secondary" onClick={()=>go("contato")} arrow>Pedir orçamento</Button></div>}
    </section>
  </main>;
}
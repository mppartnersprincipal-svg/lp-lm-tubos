export function Footer({go,NS}){
  const {Logo}=NS;
  const col={display:"grid",gap:10,alignContent:"start",font:"var(--type-body-sm)",color:"var(--text-on-inverse-muted)"};
  const h={font:"var(--type-eyebrow)",letterSpacing:"var(--tracking-caps)",color:"#fff",marginBottom:6};
  return <footer style={{background:"var(--surface-inverse-deep)",color:"#fff"}}>
    <div style={{maxWidth:"var(--container-max)",margin:"0 auto",padding:"56px var(--gutter) 32px",display:"grid",gridTemplateColumns:"1.4fr 1fr 1fr 1fr",gap:40}}>
      <div style={col}><Logo variant="inverse" height={48} base="../../assets" style={{marginBottom:8}}/><span>Distribuidora de materiais para sistemas de combate a incêndio. 6 anos de mercado, sede em Goiânia e entrega para todo o Brasil, com foco no Norte e Nordeste.</span></div>
      <div style={col}><span style={h}>Produtos</span>{["Tubos e conexões","Válvulas e registros","Bombas","Sprinklers","Hidrantes e acessórios"].map(x=><a key={x} href="#" onClick={e=>{e.preventDefault();go("produtos")}} style={{color:"inherit"}}>{x}</a>)}</div>
      <div style={col}><span style={h}>Empresa</span><a href="#" onClick={e=>{e.preventDefault();go("home")}} style={{color:"inherit"}}>Sobre a LM Tubos</a><a href="#" onClick={e=>{e.preventDefault();go("contato")}} style={{color:"inherit"}}>Contato</a><span>@lmtubos</span></div>
      <div style={col}><span style={h}>Atendimento</span><span style={{color:"#fff",font:"var(--type-h5)"}}>(62) 98558-7373</span><span>vendas01@lmtubos.com.br</span><span>Rua Pedro Galvão, Qd. 2 Lt. 17<br/>Jardim Imperial · Goiânia – GO<br/>CEP 74.492-215</span></div>
    </div>
    <div style={{borderTop:"1px solid rgba(255,255,255,.12)"}}><div style={{maxWidth:"var(--container-max)",margin:"0 auto",padding:"16px var(--gutter)",display:"flex",justifyContent:"space-between",font:"var(--type-caption)",color:"var(--text-on-inverse-muted)"}}><span>© LM Tubos Materiais · CNPJ 39.770.705/0001-23</span><span>www.lmtubos.com.br</span></div></div>
  </footer>;
}
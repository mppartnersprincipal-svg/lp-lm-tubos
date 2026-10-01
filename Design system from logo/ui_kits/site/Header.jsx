export function Header({page,go,NS}){
  const {Button,Logo}=NS;
  const [scrolled,setS]=React.useState(false);
  React.useEffect(()=>{const f=()=>setS(window.scrollY>40); f(); window.addEventListener("scroll",f,{passive:true}); return ()=>window.removeEventListener("scroll",f);},[]);
  const links=[["home","Início"],["produtos","Produtos"],["contato","Contato"]];
  return <header style={{position:"sticky",top:0,zIndex:50,background:scrolled?"rgba(255,255,255,.92)":"#fff",backdropFilter:scrolled?"blur(10px)":"none",boxShadow:scrolled?"var(--shadow-sm)":"var(--shadow-xs)",transition:"box-shadow var(--dur-base), background var(--dur-base)"}}>
    <div style={{background:"var(--surface-inverse)",color:"var(--text-on-inverse-muted)",font:"var(--type-caption)",display:"grid",gridTemplateRows:scrolled?"0fr":"1fr",transition:"grid-template-rows var(--dur-slow) var(--ease-out)"}}>
      <div style={{overflow:"hidden"}}><div style={{maxWidth:"var(--container-max)",margin:"0 auto",padding:"7px var(--gutter)",display:"flex",justifyContent:"space-between",gap:16,flexWrap:"wrap"}}>
        <span>Material completo contra incêndio, a pronta entrega para todo o Brasil.</span>
        <span style={{display:"flex",gap:20}}><span>(62) 98558-7373</span><span>vendas01@lmtubos.com.br</span><span>Goiânia – GO</span></span>
      </div></div>
    </div>
    <div style={{maxWidth:"var(--container-max)",margin:"0 auto",padding:(scrolled?"8px":"14px")+" var(--gutter)",display:"flex",alignItems:"center",gap:32,transition:"padding var(--dur-slow) var(--ease-out)"}}>
      <a href="#" onClick={e=>{e.preventDefault();go("home")}} style={{display:"block"}}><Logo height={scrolled?36:44} base="../../assets" style={{transition:"height var(--dur-slow) var(--ease-out)"}}/></a>
      <nav style={{display:"flex",gap:4,marginLeft:"auto"}}>
        {links.map(([k,l])=><NavLink key={k} active={page===k} onClick={()=>go(k)}>{l}</NavLink>)}
      </nav>
      <Button variant="whatsapp" size={scrolled?"sm":"md"} href="https://wa.me/5562985587373">Orçamento no WhatsApp</Button>
    </div>
    <div style={{height:4,background:"var(--brand-stripe)"}}/>
  </header>;
}
function NavLink({active,onClick,children}){
  const [h,setH]=React.useState(false);
  return <a href="#" onClick={e=>{e.preventDefault();onClick()}} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{position:"relative",padding:"10px 14px",font:"var(--type-label)",fontFamily:"var(--font-display)",color:active?"var(--color-primary)":h?"var(--color-secondary)":"var(--text-heading)",transition:"color var(--dur-fast)"}}>
    {children}
    <span aria-hidden style={{position:"absolute",left:14,right:14,bottom:4,height:3,borderRadius:2,background:"var(--color-primary)",transform:"scaleX("+(active||h?1:0)+")",transformOrigin:active?"left":h?"left":"right",transition:"transform var(--dur-base) var(--ease-out)"}}/>
  </a>;
}
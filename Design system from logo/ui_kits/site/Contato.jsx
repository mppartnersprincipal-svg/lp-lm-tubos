export function Contato({go,NS}){
  const {Button,Input,Select,Checkbox,Radio,Toast,Card}=NS;
  const [sent,setSent]=React.useState(false); const [busy,setBusy]=React.useState(false); const [lista,setLista]=React.useState("");
  const submit=e=>{e.preventDefault();setBusy(true);setTimeout(()=>{setBusy(false);setSent(true);},900);};
  const wrap={maxWidth:"var(--container-max)",margin:"0 auto",padding:"0 var(--gutter)"};
  return <main>
    <section style={{...wrap,padding:"64px var(--gutter) var(--section-y)",display:"grid",gridTemplateColumns:"1.2fr .8fr",gap:64,alignItems:"start"}}>
      <div>
        <span style={{font:"var(--type-eyebrow)",letterSpacing:"var(--tracking-caps)",color:"var(--color-primary)"}}>ORÇAMENTO</span>
        <h1 style={{marginTop:10,letterSpacing:"var(--tracking-tight)"}}>Envie sua lista de materiais</h1>
        <p style={{font:"var(--type-lead)",color:"var(--text-muted)",marginTop:12}}>Retornamos com preço, disponibilidade e prazo em até 1 hora útil.</p>
        <form onSubmit={submit} style={{display:"grid",gap:20,marginTop:36}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}><Input label="Nome" placeholder="Seu nome"/><Input label="Empresa" placeholder="Razão social ou obra"/></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 120px",gap:20}}><Input label="WhatsApp" placeholder="(62) 9 0000-0000"/><Input label="E-mail" type="email" placeholder="voce@empresa.com.br"/><Select label="UF" placeholder="UF" options={["GO","PA","MA","CE","AM","PE","BA","TO","DF","SP"]}/></div>
          <Input label="Lista de materiais" multiline rows={6} value={lista} onChange={e=>setLista(e.target.value)} placeholder={"Ex.:\n40 barras tubo 2½″ ranhurado pintado\n80 acoplamentos rígidos 2½″\n120 sprinklers pendentes 68 °C"} hint={lista.trim()?lista.trim().split("\n").filter(Boolean).length+" linha(s) — cada linha vira um item do orçamento":"Pode colar a lista do projeto ou anexar depois pelo WhatsApp."}/>
          <div style={{display:"grid",gap:10}}><span style={{font:"var(--type-label)"}}>Entrega</span><div style={{display:"flex",gap:24,flexWrap:"wrap"}}><Radio name="ent" label="Retirada em Goiânia"/><Radio name="ent" label="Entrega na obra" defaultChecked/></div></div>
          <Checkbox label="Tenho urgência (obra parada)" description="Priorizamos itens de pronta entrega."/>
          <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:8}}><Button size="lg" type="submit" loading={busy} arrow>Enviar pedido de orçamento</Button><Button size="lg" variant="whatsapp" href="https://wa.me/5562985587373">Prefiro pelo WhatsApp</Button></div>
        </form>
      </div>
      <div style={{display:"grid",gap:20,position:"sticky",top:110}}>
        <Card variant="inverse" padding={28}>
          <span style={{font:"var(--type-eyebrow)",letterSpacing:"var(--tracking-caps)",color:"var(--lm-red-300)"}}>ATENDIMENTO COMERCIAL</span>
          <div style={{font:"var(--type-h3)",color:"#fff",marginTop:10}}>(62) 98558-7373</div>
          <div style={{color:"var(--text-on-inverse-muted)",marginTop:6}}>vendas01@lmtubos.com.br<br/>Segunda a sexta, 8h às 18h</div>
        </Card>
        <Card padding={28}>
          <span style={{font:"var(--type-eyebrow)",letterSpacing:"var(--tracking-caps)",color:"var(--color-primary)"}}>LOJA E ESTOQUE</span>
          <p style={{marginTop:10}}>Rua Pedro Galvão, Qd. 2 Lt. 17<br/>Jardim Imperial · Goiânia – GO<br/>CEP 74.492-215</p>
          <div style={{marginTop:16,aspectRatio:"16/9",borderRadius:"var(--radius-sm)",background:"url(../../assets/fachada-loja.jpg) center/cover"}}/>
        </Card>
      </div>
    </section>
    {sent&&<div style={{position:"fixed",right:24,bottom:24,zIndex:100}}><Toast tone="success" title="Pedido enviado" description="Retornamos em até 1 hora útil." onClose={()=>setSent(false)}/></div>}
  </main>;
}
export function Home({go,NS}){
  const {Button,Badge,ProductCard,Card,Tag,Reveal,Counter,Marquee,Accordion}=NS;
  const [y,setY]=React.useState(0);
  React.useEffect(()=>{const f=()=>setY(window.scrollY); window.addEventListener("scroll",f,{passive:true}); return ()=>window.removeEventListener("scroll",f);},[]);
  const wrap={maxWidth:"var(--container-max)",margin:"0 auto",padding:"0 var(--gutter)"};
  const eyebrow={font:"var(--type-eyebrow)",letterSpacing:"var(--tracking-caps)",color:"var(--color-primary)",textTransform:"uppercase"};
  const cats=[["Tubos e conexões","Pintados, ranhurados e roscados. Pronta entrega.","Pronta entrega","success"],["Válvulas e registros","Nacionais e importadas: gaveta, borboleta, retenção, governo.","Importado","primary"],["Bombas de incêndio","Conjuntos motobomba e acessórios.",null],["Sprinklers","Bicos pendentes, uprights e laterais.","Pronta entrega","success"],["Hidrantes e acessórios","Abrigos, mangueiras, esguichos, adaptadores e chaves.","Pronta entrega","success"],["Material ranhurado","Acoplamentos, curvas, tês e flanges ranhurados.","Destaque","solid"]];
  return <main>
    <section style={{position:"relative",overflow:"hidden",color:"#fff",background:"var(--surface-inverse-deep)"}}>
      <div aria-hidden style={{position:"absolute",inset:"-12% 0",background:"url(../../assets/fachada-loja.jpg) center 35%/cover",transform:"translateY("+(y*0.25)+"px) scale(1.05)",willChange:"transform"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,rgba(20,19,58,.92) 0%,rgba(20,19,58,.75) 55%,rgba(20,19,58,.35) 100%)"}}/>
      <div style={{...wrap,position:"relative",padding:"96px var(--gutter) 88px",maxWidth:"var(--container-max)"}}>
        <div style={{maxWidth:640,display:"grid",gap:22}}>
          <span style={{...eyebrow,color:"var(--lm-red-300)",animation:"lm-fade-up .6s var(--ease-out) both"}}>Goiânia · GO — entrega para todo o Brasil</span>
          <h1 style={{color:"#fff",font:"var(--type-display)",fontSize:"clamp(40px,5vw,64px)",letterSpacing:"var(--tracking-tight)",textWrap:"balance",animation:"lm-fade-up .7s .1s var(--ease-out) both"}}>Material completo contra incêndio, a pronta entrega.</h1>
          <p style={{font:"var(--type-lead)",color:"var(--lm-navy-100)",maxWidth:540,animation:"lm-fade-up .7s .2s var(--ease-out) both"}}>Tubos pintados, conexões ranhuradas, válvulas importadas, bombas, sprinklers e hidrantes. Preço e prazo em minutos pelo WhatsApp.</p>
          <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:8,animation:"lm-fade-up .7s .3s var(--ease-out) both"}}><Button size="lg" href="https://wa.me/5562985587373" arrow>Pedir orçamento</Button><Button size="lg" variant="inverse" onClick={()=>go("produtos")}>Ver produtos</Button></div>
          <span style={{font:"var(--type-caption)",color:"var(--lm-navy-100)",animation:"lm-fade-in 1s .6s both"}}>Sem cadastro · resposta em até 1 hora útil</span>
        </div>
      </div>
      <div style={{position:"relative",background:"rgba(255,255,255,.08)",backdropFilter:"blur(6px)",borderTop:"1px solid rgba(255,255,255,.15)"}}>
        <div style={{...wrap,display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24,padding:"22px var(--gutter)"}}>
          {[[<Counter value={6} suffix=" anos"/>,"de mercado"],[<Counter value={27} suffix=" estados"/>,"atendidos, foco Norte e Nordeste"],[<><Counter value={1200} prefix="+"/> itens</>,"a pronta entrega em Goiânia"],[<Counter value={1} suffix="h útil"/>,"retorno de orçamento"]].map(([a,b],i)=><div key={i} style={{display:"grid",gap:2}}><span style={{font:"var(--type-h4)",color:"#fff"}}>{a}</span><span style={{font:"var(--type-body-sm)",color:"var(--lm-navy-100)"}}>{b}</span></div>)}
        </div>
      </div>
    </section>
    <Marquee inverse items={["Tubos pintados","Conexões ranhuradas","Válvulas importadas","Bombas de incêndio","Sprinklers","Hidrantes","Mangueiras","Abrigos"]}/>

    <section style={{...wrap,padding:"var(--section-y) var(--gutter)"}}>
      <Reveal style={{display:"flex",justifyContent:"space-between",alignItems:"end",gap:24,marginBottom:40,flexWrap:"wrap"}}>
        <div style={{display:"grid",gap:10}}><span style={eyebrow}>Linhas de produto</span><h2 style={{letterSpacing:"var(--tracking-tight)"}}>Tudo para o sistema de combate a incêndio</h2></div>
        <Button variant="outline" onClick={()=>go("produtos")} arrow>Catálogo completo</Button>
      </Reveal>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24}}>
        {cats.map(([t,d,b,tone],i)=><Reveal key={t} delay={(i%3)*90}><ProductCard title={t} description={d} badge={b} badgeTone={tone} onCta={()=>go("contato")}/></Reveal>)}
      </div>
    </section>

    <section style={{background:"var(--surface-subtle)"}}>
      <div style={{...wrap,padding:"var(--section-y) var(--gutter)",display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center"}}>
        <Reveal style={{display:"grid",gap:18}}>
          <span style={eyebrow}>Material ranhurado</span>
          <h2 style={{letterSpacing:"var(--tracking-tight)"}}>Ranhurado a pronta entrega, do tubo ao acoplamento</h2>
          <p style={{font:"var(--type-lead)",color:"var(--text-muted)"}}>Montagem rápida sem solda, menos horas de instalação e estoque completo de acoplamentos rígidos e flexíveis, curvas, tês, reduções e flanges.</p>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{["DN 1″ a 8″","Acoplamentos","Curvas 45° e 90°","Tês e cruzetas","Flanges"].map(x=><Tag key={x}>{x}</Tag>)}</div>
          <div><Button variant="secondary" onClick={()=>go("contato")} arrow>Falar com vendas</Button></div>
        </Reveal>
        <Reveal delay={150}><div style={{aspectRatio:"4/3",background:"radial-gradient(circle at 30% 30%,var(--lm-gray-100),var(--lm-gray-300))",borderRadius:"var(--radius-xl)",display:"grid",placeItems:"center",color:"var(--text-muted)",font:"var(--type-caption)",transform:"translateY("+((y-1400)*-0.04)+"px)",transition:"transform 60ms linear"}}>foto: tubos e conexões ranhuradas no estoque</div></Reveal>
      </div>
    </section>

    <section style={{...wrap,padding:"var(--section-y) var(--gutter)"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24}}>
        {[["Peça","Envie a lista de materiais ou o projeto pelo WhatsApp ou formulário."],["Receba","Orçamento com preço, disponibilidade e prazo em até 1 hora útil."],["Instale","Retire em Goiânia ou receba na obra, em qualquer estado."]].map(([t,d],i)=><Reveal key={t} delay={i*100}><Card padding={28} interactive style={{height:"100%"}}><span style={{font:"var(--type-h2)",color:"var(--color-primary)",fontFamily:"var(--font-display)",lineHeight:1}}>0{i+1}</span><h4 style={{marginTop:14}}>{t}</h4><p style={{marginTop:8,color:"var(--text-muted)"}}>{d}</p></Card></Reveal>)}
      </div>
    </section>

    <section style={{background:"var(--surface-subtle)"}}>
      <div style={{...wrap,padding:"var(--section-y) var(--gutter)",display:"grid",gridTemplateColumns:".8fr 1.2fr",gap:64,alignItems:"start"}}>
        <Reveal style={{display:"grid",gap:12,position:"sticky",top:120}}><span style={eyebrow}>Dúvidas frequentes</span><h2 style={{letterSpacing:"var(--tracking-tight)"}}>Antes de pedir o orçamento</h2><p style={{color:"var(--text-muted)"}}>Não achou a resposta? Chame no WhatsApp.</p></Reveal>
        <Reveal delay={120}><Accordion items={[{title:"Qual o prazo de entrega para o Norte e Nordeste?",content:"Itens de pronta entrega saem de Goiânia em até 2 dias úteis. O transporte leva de 3 a 10 dias conforme o estado e a transportadora."},{title:"Vocês vendem tubo já pintado?",content:"Sim. Tubos de aço pintados em vermelho, ranhurados ou roscados, DN 1″ a 8″, a pronta entrega."},{title:"Trabalham com válvulas importadas?",content:"Sim: gaveta, borboleta com supervisão, retenção e válvula de governo e alarme, com trim completo."},{title:"Qual o pedido mínimo?",content:"Não há pedido mínimo. Para pequenas quantidades, a retirada em Goiânia costuma ser a opção mais rápida."},{title:"Como envio a lista de materiais?",content:"Pelo WhatsApp (foto, PDF ou planilha) ou pelo formulário de contato. Retornamos em até 1 hora útil."}]}/></Reveal>
      </div>
    </section>

    <section style={{background:"var(--surface-inverse)",color:"#fff",position:"relative",overflow:"hidden"}}>
      <div aria-hidden style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(135deg,rgba(255,255,255,.04) 0 10px,transparent 10px 40px)",backgroundSize:"40px 40px",animation:"lm-stripe-slide 3s linear infinite"}}/>
      <div style={{...wrap,position:"relative",padding:"64px var(--gutter)",display:"flex",justifyContent:"space-between",alignItems:"center",gap:32,flexWrap:"wrap"}}>
        <div style={{display:"grid",gap:8}}><h2 style={{color:"#fff",letterSpacing:"var(--tracking-tight)"}}>Precisa de preço e prazo hoje?</h2><p style={{font:"var(--type-lead)",color:"var(--lm-navy-100)"}}>Atendimento comercial de segunda a sexta, 8h às 18h.</p></div>
        <div style={{display:"flex",gap:12,flexWrap:"wrap"}}><Button size="lg" variant="whatsapp" href="https://wa.me/5562985587373">(62) 98558-7373</Button><Button size="lg" variant="inverse" onClick={()=>go("contato")} arrow>Enviar lista</Button></div>
      </div>
    </section>
  </main>;
}
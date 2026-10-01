import React from "react";
/** Faixa rolante contínua (logos de marcas, categorias, cidades atendidas). Pausa no hover. */
export function Marquee({items=[],speed=30,separator="•",inverse,style}){
  const [paused,setP]=React.useState(false);
  const row=items.map((it,i)=>React.createElement(React.Fragment,{key:i},React.createElement("span",{style:{padding:"0 28px",whiteSpace:"nowrap"}},it),React.createElement("span",{"aria-hidden":true,style:{color:"var(--color-primary)"}},separator)));
  return React.createElement("div",{onMouseEnter:()=>setP(true),onMouseLeave:()=>setP(false),style:{overflow:"hidden",background:inverse?"var(--surface-inverse-deep)":"var(--surface-subtle)",color:inverse?"#fff":"var(--text-heading)",font:"var(--type-label)",fontFamily:"var(--font-display)",textTransform:"uppercase",letterSpacing:"var(--tracking-wide)",padding:"14px 0",maskImage:"linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)",WebkitMaskImage:"linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)",...style}},
    React.createElement("div",{style:{display:"flex",width:"max-content",animation:"lm-marquee "+speed+"s linear infinite",animationPlayState:paused?"paused":"running"}},row,row));
}

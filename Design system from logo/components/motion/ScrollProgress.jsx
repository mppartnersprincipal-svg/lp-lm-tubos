import React from "react";
/** Barra fina no topo mostrando o progresso de leitura da página. */
export function ScrollProgress({color="var(--color-primary)",height=3}){
  const [p,setP]=React.useState(0);
  React.useEffect(()=>{const f=()=>{const d=document.documentElement; const max=d.scrollHeight-d.clientHeight; setP(max>0?window.scrollY/max:0);}; f(); window.addEventListener("scroll",f,{passive:true}); window.addEventListener("resize",f); return ()=>{window.removeEventListener("scroll",f);window.removeEventListener("resize",f);};},[]);
  return React.createElement("div",{"aria-hidden":true,style:{position:"fixed",top:0,left:0,height,width:"100%",zIndex:100,pointerEvents:"none"}},React.createElement("div",{style:{height:"100%",width:(p*100)+"%",background:color,transition:"width 80ms linear"}}));
}

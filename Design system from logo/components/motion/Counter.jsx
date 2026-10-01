import React from "react";
function lmOnVisible(el, cb, {threshold=0.15, once=true}={}){
  let seen=false; const check=()=>{ if(!el) return; const r=el.getBoundingClientRect(); const vh=window.innerHeight||document.documentElement.clientHeight; const visible=r.top < vh*(1-0.08) - r.height*threshold && r.bottom > r.height*threshold; if(visible&&!seen){seen=true;cb(true); if(once) stop();} else if(!visible&&seen&&!once){seen=false;cb(false);} };
  let io=null; try{ io=new IntersectionObserver(es=>{es.forEach(e=>{ if(e.isIntersecting&&!seen){seen=true;cb(true); if(once) stop();} else if(!e.isIntersecting&&seen&&!once){seen=false;cb(false);} });},{threshold,rootMargin:"0px 0px -8% 0px"}); io.observe(el);}catch(e){}
  const stop=()=>{ io&&io.disconnect(); window.removeEventListener("scroll",check); window.removeEventListener("resize",check); clearInterval(tm); };
  window.addEventListener("scroll",check,{passive:true}); window.addEventListener("resize",check); const tm=setInterval(check,400); check(); requestAnimationFrame(check);
  return stop;
}
/** Número que conta de 0 até value quando entra na tela. */
export function Counter({value,prefix="",suffix="",duration=1400,decimals=0,style}){
  const ref=React.useRef(null); const [n,setN]=React.useState(0);
  React.useEffect(()=>{let raf; const run=()=>{const t0=performance.now(); const tick=(t)=>{const p=Math.min(1,(t-t0)/duration); const e=1-Math.pow(1-p,3); setN(value*e); if(p<1) raf=requestAnimationFrame(tick);}; raf=requestAnimationFrame(tick);};
    const stop=lmOnVisible(ref.current,()=>run(),{threshold:.3}); return ()=>{stop();cancelAnimationFrame(raf);};},[value]);
  return React.createElement("span",{ref,style:{fontVariantNumeric:"tabular-nums",...style}},prefix+n.toFixed(decimals).replace(".",",")+suffix);
}

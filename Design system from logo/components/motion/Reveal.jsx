import React from "react";
function lmOnVisible(el, cb, {threshold=0.15, once=true}={}){
  let seen=false; const check=()=>{ if(!el) return; const r=el.getBoundingClientRect(); const vh=window.innerHeight||document.documentElement.clientHeight; const visible=r.top < vh*(1-0.08) - r.height*threshold && r.bottom > r.height*threshold; if(visible&&!seen){seen=true;cb(true); if(once) stop();} else if(!visible&&seen&&!once){seen=false;cb(false);} };
  let io=null; try{ io=new IntersectionObserver(es=>{es.forEach(e=>{ if(e.isIntersecting&&!seen){seen=true;cb(true); if(once) stop();} else if(!e.isIntersecting&&seen&&!once){seen=false;cb(false);} });},{threshold,rootMargin:"0px 0px -8% 0px"}); io.observe(el);}catch(e){}
  const stop=()=>{ io&&io.disconnect(); window.removeEventListener("scroll",check); window.removeEventListener("resize",check); clearInterval(tm); };
  window.addEventListener("scroll",check,{passive:true}); window.addEventListener("resize",check); const tm=setInterval(check,400); check(); requestAnimationFrame(check);
  return stop;
}
/** Revela o conteúdo ao entrar no viewport. delay em ms para escalonar. */
export function Reveal({delay=0,as="div",threshold=0.15,once=true,style,children,...rest}){
  const ref=React.useRef(null); const [inView,setIn]=React.useState(false);
  React.useEffect(()=>lmOnVisible(ref.current,setIn,{threshold,once}),[]);
  return React.createElement(as,{ref,className:"lm-reveal"+(inView?" is-in":""),style:{transitionDelay:delay+"ms",...style},...rest},children);
}

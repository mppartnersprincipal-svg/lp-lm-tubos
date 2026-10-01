import React from "react";
const wrap=(label,hint,error,ctrl,id)=>React.createElement("label",{htmlFor:id,style:{display:"grid",gap:6,font:"var(--type-label)",color:"var(--text-heading)"}},label&&React.createElement("span",null,label),ctrl,(error||hint)&&React.createElement("span",{style:{font:"var(--type-caption)",color:error?"var(--color-danger)":"var(--text-muted)"}},error||hint));
const box=(focus,error,extra)=>({height:"var(--control-h-md)",padding:"0 14px",font:"var(--type-body)",color:"var(--text-body)",background:"#fff",border:"1px solid "+(error?"var(--color-danger)":focus?"var(--border-focus)":"var(--border-strong)"),borderRadius:"var(--radius-control)",outline:"none",boxShadow:focus?"var(--shadow-focus)":"none",width:"100%",transition:"box-shadow var(--dur-fast)",...extra});
export function Input({label,hint,error,multiline,rows=4,style,id,...rest}){
  const [fo,setFo]=React.useState(false); const _id=id||React.useId();
  const ctrl=React.createElement(multiline?"textarea":"input",{id:_id,rows:multiline?rows:undefined,onFocus:()=>setFo(true),onBlur:()=>setFo(false),style:box(fo,error,multiline?{height:"auto",padding:"12px 14px",resize:"vertical"}:{}),...rest});
  return wrap(label,hint,error,ctrl,_id);
}

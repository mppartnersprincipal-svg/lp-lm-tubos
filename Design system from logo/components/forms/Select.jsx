import React from "react";
const wrap=(label,hint,error,ctrl,id)=>React.createElement("label",{htmlFor:id,style:{display:"grid",gap:6,font:"var(--type-label)",color:"var(--text-heading)"}},label&&React.createElement("span",null,label),ctrl,(error||hint)&&React.createElement("span",{style:{font:"var(--type-caption)",color:error?"var(--color-danger)":"var(--text-muted)"}},error||hint));
const box=(focus,error,extra)=>({height:"var(--control-h-md)",padding:"0 14px",font:"var(--type-body)",color:"var(--text-body)",background:"#fff",border:"1px solid "+(error?"var(--color-danger)":focus?"var(--border-focus)":"var(--border-strong)"),borderRadius:"var(--radius-control)",outline:"none",boxShadow:focus?"var(--shadow-focus)":"none",width:"100%",transition:"box-shadow var(--dur-fast)",...extra});
export function Select({label,hint,error,options=[],placeholder,id,...rest}){
  const [fo,setFo]=React.useState(false); const _id=id||React.useId();
  const ctrl=React.createElement("select",{id:_id,onFocus:()=>setFo(true),onBlur:()=>setFo(false),defaultValue:rest.value===undefined?"":undefined,style:box(fo,error,{appearance:"none",backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%232B2A6F' stroke-width='2'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E\")",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",paddingRight:36}),...rest},
    placeholder&&React.createElement("option",{value:"",disabled:true},placeholder),
    options.map(o=>React.createElement("option",{key:o.value??o,value:o.value??o},o.label??o)));
  return wrap(label,hint,error,ctrl,_id);
}

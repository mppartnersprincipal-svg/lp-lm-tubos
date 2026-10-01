import React from "react";
export function Tag({selected,onClick,onRemove,children,style}){
  const [h,setH]=React.useState(false);
  return React.createElement("span",{onClick,onMouseEnter:()=>setH(true),onMouseLeave:()=>setH(false),style:{display:"inline-flex",alignItems:"center",gap:6,height:32,padding:"0 12px",font:"var(--type-label)",color:selected?"#fff":"var(--text-heading)",background:selected?"var(--color-secondary)":h?"var(--lm-gray-100)":"var(--surface-subtle)",border:"1px solid "+(selected?"var(--color-secondary)":"var(--border-default)"),borderRadius:"var(--radius-pill)",cursor:onClick?"pointer":"default",transition:"background var(--dur-fast)",userSelect:"none",whiteSpace:"nowrap",...style}},
    children, onRemove&&React.createElement("button",{onClick:(e)=>{e.stopPropagation();onRemove();},"aria-label":"Remover",style:{all:"unset",cursor:"pointer",lineHeight:0,marginLeft:2,opacity:.7}},"×"));
}

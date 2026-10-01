import React from "react";
export function Dialog({open,title,onClose,children,footer,width=520}){
  if(!open) return null;
  return React.createElement("div",{onClick:onClose,style:{position:"fixed",inset:0,background:"rgba(20,19,58,.55)",display:"grid",placeItems:"center",zIndex:1000,padding:24,animation:"lm-fade-in var(--dur-base) var(--ease-out)",backdropFilter:"blur(4px)"}},
    React.createElement("div",{role:"dialog","aria-modal":true,onClick:e=>e.stopPropagation(),style:{width:"100%",maxWidth:width,background:"#fff",borderRadius:"var(--radius-xl)",boxShadow:"var(--shadow-lg)",overflow:"hidden",animation:"lm-scale-in var(--dur-slow) var(--ease-spring)"}},
      React.createElement("div",{style:{height:4,background:"var(--brand-stripe)"}}),
      React.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"20px 24px 0"}},React.createElement("h4",null,title),
        React.createElement("button",{onClick:onClose,"aria-label":"Fechar",style:{all:"unset",cursor:"pointer",fontSize:24,lineHeight:1,color:"var(--text-muted)",padding:4}},"×")),
      React.createElement("div",{style:{padding:"16px 24px 24px",font:"var(--type-body)"}},children),
      footer&&React.createElement("div",{style:{display:"flex",justifyContent:"flex-end",gap:12,padding:"16px 24px",background:"var(--surface-subtle)"}},footer)));
}

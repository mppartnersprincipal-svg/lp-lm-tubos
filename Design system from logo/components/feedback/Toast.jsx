import React from "react";
export function Toast({tone="info",title,description,onClose,action}){
  const c={info:"var(--color-info)",success:"var(--color-success)",warning:"var(--color-warning)",danger:"var(--color-danger)"}[tone];
  return React.createElement("div",{role:"status",style:{display:"flex",gap:12,alignItems:"flex-start",width:"100%",maxWidth:420,padding:"14px 16px",background:"var(--surface-inverse)",color:"#fff",borderRadius:"var(--radius-lg)",boxShadow:"var(--shadow-md)",animation:"lm-fade-up var(--dur-slow) var(--ease-spring)",borderLeft:"4px solid "+c}},
    React.createElement("div",{style:{flex:1,display:"grid",gap:2}},React.createElement("div",{style:{font:"var(--type-label)",color:"#fff"}},title),description&&React.createElement("div",{style:{font:"var(--type-body-sm)",color:"var(--text-on-inverse-muted)"}},description)),
    action, onClose&&React.createElement("button",{onClick:onClose,"aria-label":"Fechar",style:{all:"unset",cursor:"pointer",color:"var(--text-on-inverse-muted)",fontSize:18,lineHeight:1}},"×"));
}

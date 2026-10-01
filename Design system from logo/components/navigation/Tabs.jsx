import React from "react";
export function Tabs({items=[],value,defaultValue,onChange,variant="underline"}){
  const [v,setV]=React.useState(defaultValue??items[0]?.value); const cur=value??v;
  return React.createElement("div",{role:"tablist",style:{display:"flex",gap:variant==="pill"?8:0,borderBottom:variant==="underline"?"1px solid var(--border-default)":"none"}},
    items.map(it=>{const on=it.value===cur; return React.createElement("button",{key:it.value,role:"tab","aria-selected":on,onClick:()=>{setV(it.value);onChange&&onChange(it.value);},
      style:variant==="underline"?{all:"unset",cursor:"pointer",padding:"12px 16px",font:"var(--type-label)",fontFamily:"var(--font-display)",color:on?"var(--color-secondary)":"var(--text-muted)",boxShadow:on?"inset 0 -3px 0 var(--color-primary)":"none",transition:"color var(--dur-fast)"}
      :{all:"unset",cursor:"pointer",padding:"0 16px",height:36,font:"var(--type-label)",color:on?"#fff":"var(--text-heading)",background:on?"var(--color-secondary)":"var(--surface-subtle)",borderRadius:"var(--radius-pill)"}},it.label);}));
}

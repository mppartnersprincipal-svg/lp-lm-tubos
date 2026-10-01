import React from "react";
export function Switch({label,checked,defaultChecked,onChange,disabled}){
  const [c,setC]=React.useState(!!defaultChecked); const on=checked!==undefined?checked:c;
  const toggle=()=>{if(disabled)return; if(checked===undefined)setC(!on); onChange&&onChange(!on);};
  return React.createElement("label",{onClick:(e)=>{e.preventDefault();toggle();},style:{display:"inline-flex",alignItems:"center",gap:10,cursor:disabled?"not-allowed":"pointer",opacity:disabled?.5:1,font:"var(--type-body)",userSelect:"none"}},
    React.createElement("span",{role:"switch","aria-checked":on,style:{width:40,height:22,borderRadius:"var(--radius-pill)",background:on?"var(--color-secondary)":"var(--lm-gray-300)",position:"relative",transition:"background var(--dur-fast)",flex:"0 0 auto"}},
      React.createElement("span",{style:{position:"absolute",top:3,left:on?21:3,width:16,height:16,borderRadius:"50%",background:"#fff",boxShadow:"var(--shadow-xs)",transition:"left var(--dur-fast) var(--ease-standard)"}})),
    label);
}

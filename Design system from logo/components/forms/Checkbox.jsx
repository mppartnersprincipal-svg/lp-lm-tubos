import React from "react";
export function Checkbox({label,checked,defaultChecked,onChange,disabled,name,value,description}){
  const [c,setC]=React.useState(!!defaultChecked); const on=checked!==undefined?checked:c;
  const toggle=()=>{if(disabled)return; if(checked===undefined)setC(!on); onChange&&onChange(!on);};
  return React.createElement("label",{onClick:(e)=>{e.preventDefault();toggle();},style:{display:"inline-flex",alignItems:"flex-start",gap:10,cursor:disabled?"not-allowed":"pointer",opacity:disabled?.5:1,font:"var(--type-body)",color:"var(--text-body)",userSelect:"none"}},
    React.createElement("input",{type:"checkbox",name,value,checked:on,readOnly:true,style:{position:"absolute",opacity:0,width:0,height:0}}),
    React.createElement("span",{"aria-hidden":true,style:{flex:"0 0 auto",width:20,height:20,marginTop:2,borderRadius:"var(--radius-xs)",border:"2px solid "+(on?"var(--color-secondary)":"var(--lm-gray-400)"),background:on?"var(--color-secondary)":"#fff",display:"grid",placeItems:"center",transition:"all var(--dur-fast)"}},
      on&&React.createElement("svg",{width:12,height:12,viewBox:"0 0 12 12"},React.createElement("path",{d:"M2 6.5l2.5 2.5L10 3.5",fill:"none",stroke:"#fff",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"}))),
    React.createElement("span",{style:{display:"grid",gap:2}},label,description&&React.createElement("span",{style:{font:"var(--type-caption)",color:"var(--text-muted)"}},description)));
}

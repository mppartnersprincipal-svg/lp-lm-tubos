import React from "react";
export function Radio({label,checked,defaultChecked,onChange,disabled,name,value,description}){
  const [c,setC]=React.useState(!!defaultChecked); const on=checked!==undefined?checked:c;
  const toggle=()=>{if(disabled)return; if(checked===undefined)setC(!on); onChange&&onChange(!on);};
  return React.createElement("label",{onClick:(e)=>{e.preventDefault();toggle();},style:{display:"inline-flex",alignItems:"flex-start",gap:10,cursor:disabled?"not-allowed":"pointer",opacity:disabled?.5:1,font:"var(--type-body)",color:"var(--text-body)",userSelect:"none"}},
    React.createElement("input",{type:"radio",name,value,checked:on,readOnly:true,style:{position:"absolute",opacity:0,width:0,height:0}}),
    React.createElement("span",{"aria-hidden":true,style:{flex:"0 0 auto",width:20,height:20,marginTop:2,borderRadius:"50%",border:"2px solid "+(on?"var(--color-secondary)":"var(--lm-gray-400)"),background:"#fff",display:"grid",placeItems:"center",transition:"all var(--dur-fast)"}},
      on&&React.createElement("span",{style:{width:10,height:10,borderRadius:"50%",background:"var(--color-secondary)"}})),
    React.createElement("span",{style:{display:"grid",gap:2}},label,description&&React.createElement("span",{style:{font:"var(--type-caption)",color:"var(--text-muted)"}},description)));
}

import React from "react";
import { Badge } from "../core/Badge.jsx";
import { Button } from "../core/Button.jsx";
/** Card de produto/categoria do catálogo. image = url; sem imagem mostra placeholder cinza. */
export function ProductCard({title,description,image,badge,badgeTone="success",cta="Pedir orçamento",onCta,href,compact}){
  const [h,setH]=React.useState(false);
  return React.createElement("article",{onMouseEnter:()=>setH(true),onMouseLeave:()=>setH(false),style:{display:"grid",gridTemplateRows:compact?"1fr":"200px 1fr",alignContent:"start",background:"var(--surface-card)",border:"1px solid var(--border-default)",borderRadius:"var(--radius-lg)",overflow:"hidden",transition:"box-shadow var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out), border-color var(--dur-base)",boxShadow:h?"var(--shadow-md)":"none",transform:h?"translateY(-6px)":"none",borderColor:h?"var(--lm-navy-100)":"var(--border-default)"}},
    !compact&&React.createElement("div",{style:{position:"relative",overflow:"hidden",background:"var(--lm-gray-100)",display:"grid",placeItems:"center",color:"var(--lm-gray-400)",font:"var(--type-caption)"}},React.createElement("div",{style:{position:"absolute",inset:0,background:image?"url("+image+") center/cover":"radial-gradient(circle at 30% 30%,var(--lm-gray-50),var(--lm-gray-200))",transition:"transform var(--dur-slow) var(--ease-out)",transform:h?"scale(1.06)":"scale(1)"}}),!image&&React.createElement("span",{style:{position:"relative"}},"foto do produto"),badge&&React.createElement(Badge,{tone:badgeTone,style:{position:"absolute",top:12,left:12}},badge)),
    React.createElement("div",{style:{padding:20,display:"grid",gap:8,alignContent:"start"}},
      compact&&badge&&React.createElement(Badge,{tone:badgeTone,style:{justifySelf:"start"}},badge),
      React.createElement("h5",{style:{font:"var(--type-h5)",color:"var(--text-heading)"}},title),
      description&&React.createElement("p",{style:{font:"var(--type-body-sm)",color:"var(--text-muted)"}},description),
      React.createElement("div",{style:{marginTop:8}},React.createElement(Button,{variant:h?"primary":"outline",size:"sm",href,onClick:onCta,arrow:true},cta))));
}

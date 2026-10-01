import React from "react";
export function Tooltip({content,placement="top",children}){
  const [o,setO]=React.useState(false);
  const pos={top:{bottom:"calc(100% + 8px)",left:"50%",transform:"translateX(-50%)"},bottom:{top:"calc(100% + 8px)",left:"50%",transform:"translateX(-50%)"},left:{right:"calc(100% + 8px)",top:"50%",transform:"translateY(-50%)"},right:{left:"calc(100% + 8px)",top:"50%",transform:"translateY(-50%)"}}[placement];
  return React.createElement("span",{onMouseEnter:()=>setO(true),onMouseLeave:()=>setO(false),onFocus:()=>setO(true),onBlur:()=>setO(false),style:{position:"relative",display:"inline-flex"}},children,
    o&&React.createElement("span",{role:"tooltip",style:{position:"absolute",...pos,background:"var(--lm-gray-900)",color:"#fff",font:"var(--type-caption)",padding:"6px 10px",borderRadius:"var(--radius-sm)",whiteSpace:"nowrap",zIndex:10,boxShadow:"var(--shadow-sm)"}},content));
}

import React from "react";
export function Card({variant="tint",padding=24,interactive,children,style,...rest}){
  const [h,setH]=React.useState(false);
  const base={tint:{background:"var(--surface-tint)",border:"1px solid transparent"},outline:{background:"var(--surface-card)",border:"1px solid var(--border-default)"},elevated:{background:"var(--surface-card)",border:"1px solid transparent",boxShadow:"var(--shadow-sm)"},inverse:{background:"var(--surface-inverse)",color:"#fff",border:"1px solid transparent"}}[variant];
  return React.createElement("div",{onMouseEnter:()=>setH(true),onMouseLeave:()=>setH(false),style:{padding,borderRadius:"var(--radius-lg)",transition:"box-shadow var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard)",...base,...(interactive&&h?{boxShadow:"var(--shadow-md)",transform:"translateY(-4px)",cursor:"pointer"}:{}),...style},...rest},children);
}

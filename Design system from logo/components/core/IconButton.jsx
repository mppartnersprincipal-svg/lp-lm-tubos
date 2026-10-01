import React from "react";
export function IconButton({label,variant="ghost",size="md",disabled,children,style,...rest}){
  const [h,setH]=React.useState(false);
  const d={ghost:["transparent","var(--surface-subtle)","var(--text-heading)"],outline:["transparent","var(--color-secondary-soft)","var(--color-secondary)"],primary:["var(--color-primary)","var(--color-primary-hover)","#fff"],secondary:["var(--color-secondary)","var(--color-secondary-hover)","#fff"]}[variant];
  const px={sm:36,md:44,lg:52}[size];
  return React.createElement("button",{"aria-label":label,title:label,disabled,onMouseEnter:()=>setH(true),onMouseLeave:()=>setH(false),
    style:{width:px,height:px,display:"inline-grid",placeItems:"center",background:h&&!disabled?d[1]:d[0],color:d[2],border:variant==="outline"?"2px solid var(--color-secondary)":"2px solid transparent",borderRadius:"var(--radius-pill)",transform:h&&!disabled?"var(--lift)":"none",cursor:disabled?"not-allowed":"pointer",opacity:disabled?.5:1,transition:"background var(--dur-fast), transform var(--dur-base) var(--ease-spring)",...style},...rest},children);
}

import React from "react";
export function Badge({tone="neutral",children,style}){
  const t={neutral:["var(--lm-gray-100)","var(--text-body)"],primary:["var(--color-primary-soft)","var(--lm-red-700)"],secondary:["var(--color-secondary-soft)","var(--color-secondary)"],success:["var(--color-success-soft)","var(--color-success)"],warning:["var(--color-warning-soft)","var(--color-warning)"],danger:["var(--color-danger-soft)","var(--color-danger)"],solid:["var(--color-primary)","#fff"],inverse:["var(--surface-inverse)","#fff"]}[tone];
  return React.createElement("span",{style:{display:"inline-flex",alignItems:"center",height:22,padding:"0 8px",font:"var(--type-eyebrow)",letterSpacing:"var(--tracking-wide)",textTransform:"uppercase",background:t[0],color:t[1],borderRadius:"var(--radius-pill)",padding:"0 10px",whiteSpace:"nowrap",...style}},children);
}

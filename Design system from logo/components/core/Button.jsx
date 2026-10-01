import React from "react";
const V = {
  primary:{bg:"var(--color-primary)",hover:"var(--color-primary-hover)",active:"var(--color-primary-active)",fg:"var(--text-on-primary)",border:"transparent",shadow:"var(--shadow-primary)"},
  secondary:{bg:"var(--color-secondary)",hover:"var(--color-secondary-hover)",active:"var(--lm-navy-900)",fg:"#fff",border:"transparent",shadow:"var(--shadow-secondary)"},
  outline:{bg:"transparent",hover:"var(--color-secondary-soft)",active:"var(--lm-navy-100)",fg:"var(--color-secondary)",border:"var(--color-secondary)"},
  ghost:{bg:"transparent",hover:"var(--surface-subtle)",active:"var(--lm-gray-100)",fg:"var(--text-heading)",border:"transparent"},
  whatsapp:{bg:"var(--color-whatsapp)",hover:"var(--color-whatsapp-hover)",active:"#178a43",fg:"#fff",border:"transparent",shadow:"var(--shadow-whatsapp)"},
  inverse:{bg:"#fff",hover:"var(--lm-gray-100)",active:"var(--lm-gray-200)",fg:"var(--color-secondary)",border:"transparent",shadow:"0 10px 24px -8px rgba(0,0,0,.35)"},
};
const S = { sm:{h:"var(--control-h-sm)",px:"18px",fs:"var(--text-sm)"}, md:{h:"var(--control-h-md)",px:"24px",fs:"var(--text-md)"}, lg:{h:"var(--control-h-lg)",px:"32px",fs:"var(--text-lg)"} };
const Arrow = ({active}) => React.createElement("svg",{width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2.5,strokeLinecap:"round",strokeLinejoin:"round",style:{transition:"transform var(--dur-base) var(--ease-spring)",transform:active?"translateX(4px)":"none",flex:"0 0 auto"}},React.createElement("path",{d:"M5 12h14"}),React.createElement("path",{d:"m13 6 6 6-6 6"}));
/** CTA em pílula com elevação no hover, seta animada (arrow) e feedback de pressão. */
export function Button({variant="primary",size="md",iconLeft,iconRight,arrow,fullWidth,disabled,loading,href,children,style,...rest}){
  const [st,setSt]=React.useState("idle");
  const v=V[variant]||V.primary, s=S[size]||S.md;
  const hov=st!=="idle"&&!disabled&&!loading;
  const bg = disabled? v.bg : st==="active"? v.active : st==="hover"? v.hover : v.bg;
  const Tag = href? "a":"button";
  return React.createElement(Tag,{href,disabled:disabled||loading,"aria-busy":loading||undefined,
    onMouseEnter:()=>setSt("hover"),onMouseLeave:()=>setSt("idle"),onMouseDown:()=>setSt("active"),onMouseUp:()=>setSt("hover"),onFocus:()=>setSt("hover"),onBlur:()=>setSt("idle"),
    style:{position:"relative",display:fullWidth?"flex":"inline-flex",width:fullWidth?"100%":undefined,alignItems:"center",justifyContent:"center",gap:10,height:s.h,padding:"0 "+s.px,
      font:"var(--type-button)",fontSize:s.fs,letterSpacing:"0.01em",color:v.fg,background:bg,border:"2px solid "+v.border,borderRadius:"var(--radius-button)",cursor:disabled?"not-allowed":"pointer",opacity:disabled?.5:1,
      textDecoration:"none",whiteSpace:"nowrap",boxShadow:hov&&v.shadow?v.shadow:"none",
      transition:"background var(--dur-fast) var(--ease-standard), transform var(--dur-base) var(--ease-spring), box-shadow var(--dur-base) var(--ease-standard)",
      transform:disabled?"none":st==="active"?"translateY(0) scale(.98)":st==="hover"?"var(--lift)":"none",...style},...rest},
    loading?React.createElement("span",{style:{width:16,height:16,border:"2px solid currentColor",borderRightColor:"transparent",borderRadius:"50%",animation:"lm-spin .7s linear infinite"}}):iconLeft,
    React.createElement("span",{style:{opacity:loading?.7:1}},children),
    arrow?React.createElement(Arrow,{active:hov}):iconRight);
}

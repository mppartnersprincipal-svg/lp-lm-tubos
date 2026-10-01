import React from "react";
/** Lista expansível (FAQ, especificações). Um item aberto por vez por padrão. */
export function Accordion({items=[],defaultOpen=0,multiple}){
  const [open,setOpen]=React.useState(()=>new Set(defaultOpen==null?[]:[defaultOpen]));
  const toggle=i=>setOpen(s=>{const n=new Set(multiple?s:[]); if(s.has(i)) n.delete(i); else n.add(i); return n;});
  return React.createElement("div",{style:{display:"grid",borderTop:"1px solid var(--border-default)"}},
    items.map((it,i)=>{const on=open.has(i); return React.createElement("div",{key:i,style:{borderBottom:"1px solid var(--border-default)"}},
      React.createElement("button",{onClick:()=>toggle(i),"aria-expanded":on,style:{all:"unset",cursor:"pointer",display:"flex",width:"100%",alignItems:"center",justifyContent:"space-between",gap:16,padding:"20px 4px",font:"var(--type-h5)",color:on?"var(--color-primary)":"var(--text-heading)",transition:"color var(--dur-fast)"}},
        React.createElement("span",null,it.title),
        React.createElement("span",{style:{width:32,height:32,borderRadius:"50%",border:"1px solid var(--border-default)",display:"grid",placeItems:"center",flex:"0 0 auto",background:on?"var(--color-primary)":"transparent",color:on?"#fff":"var(--text-heading)",transition:"all var(--dur-base) var(--ease-standard)"}},
          React.createElement("svg",{width:14,height:14,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2.5,strokeLinecap:"round",style:{transition:"transform var(--dur-base) var(--ease-spring)",transform:on?"rotate(45deg)":"none"}},React.createElement("path",{d:"M12 5v14M5 12h14"})))),
      React.createElement("div",{style:{display:"grid",gridTemplateRows:on?"1fr":"0fr",transition:"grid-template-rows var(--dur-slow) var(--ease-out)"}},
        React.createElement("div",{style:{overflow:"hidden"}},React.createElement("div",{style:{padding:"0 48px 20px 4px",font:"var(--type-body)",color:"var(--text-muted)",maxWidth:720}},it.content))));}));
}

import React from "react";
/** Wordmark LM Tubos. base = caminho até a pasta assets/ */
export function Logo({variant="default",height=44,base="./assets",style}){
  const src = base+"/"+(variant==="inverse"?"lm-tubos-logo-horizontal-inverse.svg":variant==="square"?"lm-tubos-logo.svg":"lm-tubos-logo-horizontal.svg");
  return React.createElement("img",{src,alt:"LM Tubos — Materiais contra incêndio",style:{height,width:"auto",display:"block",...style}});
}

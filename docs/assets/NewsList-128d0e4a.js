import{u as R,l as b,r as h,q as a,t as d,F as c,v as V,n as v,y as t,x as e,A as y,B as u,D as m,w as _}from"./index-44df7b82.js";import{R as x}from"./index.esm-68a6513a.js";import{a as D,b as T,c as B,V as n,d as L,e as q}from"./_plugin-vue_export-helper-f363d9aa.js";import{V as j}from"./lazy-95dad051.js";import{V as w}from"./VContainer-4274982d.js";import{V as p}from"./VRow-0b051f03.js";import{V as g}from"./VChip-67906d3c.js";const A=["onClick"],E={key:1},U=m("hr",null,null,-1),O={__name:"NewsList",props:{compact:{type:Boolean,required:!1,default:!1}},setup(N){const S=N,$=R(),{news:C}=b($),i=h(!1),o=h(null);function k(f){const[s,l,r]=f.split("T")[0].split("-");return`${l}/${r}/${s}`}function F(f){o.value=C.value.find(({id:s})=>s===f),i.value=!0}return(f,s)=>(a(),d(c,null,[(a(!0),d(c,null,V(v(C),l=>(a(),_(p,{key:l.id},{default:e(()=>[t(n,null,{default:e(()=>[t(D,{class:"mx-auto"},{default:e(()=>[t(T,null,{default:e(()=>[m("a",{href:"javascript:void(0)",onClick:r=>F(l.id)},u(l.title),9,A)]),_:2},1024),t(B,null,{default:e(()=>[t(w,null,{default:e(()=>[t(p,null,{default:e(()=>[t(n,{class:"news-date"},{default:e(()=>[m("span",null,u(k(l.datetime)),1)]),_:2},1024),t(n,{class:"news-type"},{default:e(()=>[(a(!0),d(c,null,V(l.type,r=>(a(),_(g,{key:r.id},{default:e(()=>[y(u(r.type),1)]),_:2},1024))),128))]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024),S.compact?(a(),d("br",E)):(a(),_(q,{key:0},{default:e(()=>[t(v(x),{document:l.description},null,8,["document"])]),_:2},1024))]),_:2},1024)]),_:2},1024)]),_:2},1024))),128)),t(L,{modelValue:i.value,"onUpdate:modelValue":s[1]||(s[1]=l=>i.value=l),width:"auto"},{default:e(()=>[t(D,{width:"800"},{actions:e(()=>[t(j,{class:"ms-auto",text:"Close",onClick:s[0]||(s[0]=l=>i.value=!1)})]),default:e(()=>[t(T,null,{default:e(()=>[y(u(o.value.title)+" ",1),U]),_:1}),t(B,null,{default:e(()=>[t(w,null,{default:e(()=>[t(p,null,{default:e(()=>[t(n,{class:"news-date"},{default:e(()=>[m("span",null,u(k(o.value.datetime)),1)]),_:1}),t(n,{class:"news-type"},{default:e(()=>[(a(!0),d(c,null,V(o.value.type,l=>(a(),_(g,{key:l.id},{default:e(()=>[y(u(l.type),1)]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})]),_:1}),t(w,null,{default:e(()=>[t(p,null,{default:e(()=>[t(n,null,{default:e(()=>[t(v(x),{document:o.value.description},null,8,["document"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])],64))}};export{O as _};

import{l as R,m as b,r as h,v as a,w as d,F as c,x as V,y as _,z as e,A as t,G as m,D as u,C as v,t as y}from"./index-6c7a25e9.js";import{R as x}from"./index.esm-1b20326f.js";import{a as n,V as p}from"./VRow-353a3bec.js";import{V as D,a as T,b as B,c as L}from"./VCard-0acddbf6.js";import{a as w}from"./_plugin-vue_export-helper-8fb97a2a.js";import{V as g}from"./VChip-22dcae2e.js";import{V as j}from"./VBtn-c47791ad.js";import{V as q}from"./VDialog-36c6f2d9.js";const z=["onClick"],A={key:1},E=m("hr",null,null,-1),P={__name:"NewsList",props:{compact:{type:Boolean,required:!1,default:!1}},setup(N){const S=N,$=R(),{news:C}=b($),i=h(!1),o=h(null);function k(f){const[s,l,r]=f.split("T")[0].split("-");return`${l}/${r}/${s}`}function F(f){o.value=C.value.find(({id:s})=>s===f),i.value=!0}return(f,s)=>(a(),d(c,null,[(a(!0),d(c,null,V(y(C),l=>(a(),_(p,{key:l.id},{default:e(()=>[t(n,null,{default:e(()=>[t(D,{class:"mx-auto"},{default:e(()=>[t(T,null,{default:e(()=>[m("a",{href:"javascript:void(0)",onClick:r=>F(l.id)},u(l.title),9,z)]),_:2},1024),t(B,null,{default:e(()=>[t(w,null,{default:e(()=>[t(p,null,{default:e(()=>[t(n,{class:"news-date"},{default:e(()=>[m("span",null,u(k(l.datetime)),1)]),_:2},1024),t(n,{class:"news-type"},{default:e(()=>[(a(!0),d(c,null,V(l.type,r=>(a(),_(g,{key:r.id},{default:e(()=>[v(u(r.type),1)]),_:2},1024))),128))]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024),S.compact?(a(),d("br",A)):(a(),_(L,{key:0},{default:e(()=>[t(y(x),{document:l.description},null,8,["document"])]),_:2},1024))]),_:2},1024)]),_:2},1024)]),_:2},1024))),128)),t(q,{modelValue:i.value,"onUpdate:modelValue":s[1]||(s[1]=l=>i.value=l),width:"auto"},{default:e(()=>[t(D,{width:"800"},{actions:e(()=>[t(j,{class:"ms-auto",text:"Close",onClick:s[0]||(s[0]=l=>i.value=!1)})]),default:e(()=>[t(T,null,{default:e(()=>[v(u(o.value.title)+" ",1),E]),_:1}),t(B,null,{default:e(()=>[t(w,null,{default:e(()=>[t(p,null,{default:e(()=>[t(n,{class:"news-date"},{default:e(()=>[m("span",null,u(k(o.value.datetime)),1)]),_:1}),t(n,{class:"news-type"},{default:e(()=>[(a(!0),d(c,null,V(o.value.type,l=>(a(),_(g,{key:l.id},{default:e(()=>[v(u(l.type),1)]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})]),_:1}),t(w,null,{default:e(()=>[t(p,null,{default:e(()=>[t(n,null,{default:e(()=>[t(y(x),{document:o.value.description},null,8,["document"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])],64))}};export{P as _};
import{u as L,l as q,c as y,n as f,q as u,w as i,x as t,t as p,F as m,v,y as n,A as h,B as g,C as x,E as k,G as I,D as o}from"./index-b738886b.js";import{g as w,a as B}from"./assetUtils-5f33f739.js";import{V as T,a as N}from"./VRow-4056fee9.js";import{V as A,a as $,b as D,c as E}from"./VCard-74a58573.js";import{V as C,_ as F}from"./_plugin-vue_export-helper-48bff84e.js";import{V as R,a as G,b as H,d as M}from"./VList-d9423999.js";import"./index-70809ef4.js";import"./VAvatar-54a2fc16.js";import"./index-b6dfd16c.js";const O=["src","width","height","alt"],W={__name:"StaffList",setup(r){const d=L(),{staff:l}=q(d),V=y(()=>(l.value.sort((e,s)=>(e.sequence===void 0&&(e.sequence=999),s.sequence===void 0&&(s.sequence=999),e.sequence-s.sequence)),l.value.reduce((e,s,c)=>(c%2==0?e.push([s]):e[e.length-1].push(s))&&e,[])));return(e,s)=>f(l)?(u(),i(C,{key:0},{default:t(()=>[(u(!0),p(m,null,v(V.value,(c,S)=>(u(),i(T,{key:S},{default:t(()=>[(u(!0),p(m,null,v(c,a=>(u(),i(N,{key:a.id},{default:t(()=>[n(A,null,{default:t(()=>[n($,null,{default:t(()=>[h(g(a.name),1)]),_:2},1024),n(D,null,{default:t(()=>[h(g(a.title),1)]),_:2},1024),n(E,{class:"d-flex"},{default:t(()=>[a.picture?(u(),p("img",{key:0,src:a.picture.url,width:f(w)(a.picture.details.image.width,a.picture.details.image.height),height:f(B)(a.picture.details.image.width,a.picture.details.image.height),alt:a.name,class:"mx-auto"},null,8,O)):x("",!0)]),_:2},1024)]),_:2},1024)]),_:2},1024))),128))]),_:2},1024))),128))]),_:1})):x("",!0)}};const j={__name:"CouncilList",setup(r){const d=L(),{council:l}=q(d),V=y(()=>(l.value.sort((e,s)=>(e.sequence===void 0&&(e.sequence=999),s.sequence===void 0&&(s.sequence=999),e.sequence-s.sequence)),l.value));return(e,s)=>f(l)?(u(),i(C,{key:0},{default:t(()=>[n(R,null,{default:t(()=>[(u(!0),p(m,null,v(V.value,c=>(u(),i(G,{key:c.id},{default:t(()=>[n(H,null,{default:t(()=>[h(g(c.name),1)]),_:2},1024),n(M,null,{default:t(()=>[h(g(c.role),1)]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1})):x("",!0)}};const _=r=>(k("data-v-1fae1fa4"),r=r(),I(),r),z=_(()=>o("h2",null,"Our Leaders",-1)),J=_(()=>o("hr",null,null,-1)),K=_(()=>o("h3",null,"Staff",-1)),P=_(()=>o("br",null,null,-1)),Q=_(()=>o("h3",null,"Church Council",-1)),U={__name:"Leaders",setup(r){return(d,l)=>(u(),i(C,{class:"leaders"},{default:t(()=>[z,J,K,n(W),P,Q,n(j)]),_:1}))}},ne=F(U,[["__scopeId","data-v-1fae1fa4"]]);export{ne as default};

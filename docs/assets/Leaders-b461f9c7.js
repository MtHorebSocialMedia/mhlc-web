import{u as L,l as q,c as y,q as f,t as u,x as i,y as t,v as p,F as m,w as v,z as n,B as h,C as g,D as x,G as k,H as I,E as o}from"./index-50a6e3e1.js";import{g as w,a as B}from"./assetUtils-e649c0c9.js";import{V as T,a as N}from"./VRow-fa9f80fe.js";import{V as $,a as A,b as D,c as E}from"./VCard-22b29211.js";import{a as C,_ as F}from"./_plugin-vue_export-helper-55a6661b.js";import{V as H,a as R,b as z,d as G}from"./VList-9e8fe5ee.js";import"./VAvatar-27d676bc.js";import"./index-58d7a400.js";import"./index-74dee712.js";const M=["src","width","height","alt"],O={__name:"StaffList",setup(r){const d=L(),{staff:l}=q(d),V=y(()=>(l.value.sort((e,s)=>(e.sequence===void 0&&(e.sequence=999),s.sequence===void 0&&(s.sequence=999),e.sequence-s.sequence)),l.value.reduce((e,s,c)=>(c%2==0?e.push([s]):e[e.length-1].push(s))&&e,[])));return(e,s)=>f(l)?(u(),i(C,{key:0},{default:t(()=>[(u(!0),p(m,null,v(V.value,(c,S)=>(u(),i(T,{key:S},{default:t(()=>[(u(!0),p(m,null,v(c,a=>(u(),i(N,{key:a.id},{default:t(()=>[n($,null,{default:t(()=>[n(A,null,{default:t(()=>[h(g(a.name),1)]),_:2},1024),n(D,null,{default:t(()=>[h(g(a.title),1)]),_:2},1024),n(E,{class:"d-flex"},{default:t(()=>[a.picture?(u(),p("img",{key:0,src:a.picture.url,width:f(w)(a.picture.details.image.width,a.picture.details.image.height),height:f(B)(a.picture.details.image.width,a.picture.details.image.height),alt:a.name,class:"mx-auto"},null,8,M)):x("",!0)]),_:2},1024)]),_:2},1024)]),_:2},1024))),128))]),_:2},1024))),128))]),_:1})):x("",!0)}};const W={__name:"CouncilList",setup(r){const d=L(),{council:l}=q(d),V=y(()=>(l.value.sort((e,s)=>(e.sequence===void 0&&(e.sequence=999),s.sequence===void 0&&(s.sequence=999),e.sequence-s.sequence)),l.value));return(e,s)=>f(l)?(u(),i(C,{key:0},{default:t(()=>[n(H,null,{default:t(()=>[(u(!0),p(m,null,v(V.value,c=>(u(),i(R,{key:c.id},{default:t(()=>[n(z,null,{default:t(()=>[h(g(c.name),1)]),_:2},1024),n(G,null,{default:t(()=>[h(g(c.role),1)]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1})):x("",!0)}};const _=r=>(k("data-v-1fae1fa4"),r=r(),I(),r),j=_(()=>o("h2",null,"Our Leaders",-1)),J=_(()=>o("hr",null,null,-1)),K=_(()=>o("h3",null,"Staff",-1)),P=_(()=>o("br",null,null,-1)),Q=_(()=>o("h3",null,"Church Council",-1)),U={__name:"Leaders",setup(r){return(d,l)=>(u(),i(C,{class:"leaders"},{default:t(()=>[j,J,K,n(O),P,Q,n(W)]),_:1}))}},ne=F(U,[["__scopeId","data-v-1fae1fa4"]]);export{ne as default};

import"./index.esm-7f500599.js";import{g as _,a as p}from"./assetUtils-ecf428a4.js";import{_ as C}from"./RichContentRenderer-48a696b8.js";import{l as w,m as B,v as a,w as s,t as e,y as r,z as l,C as I,D as k,E as i,W as h,A as m,c as V,X as x,G as y,x as A,F as b,H as S,I as K}from"./index-a5008ef7.js";import{V as N}from"./VAlert-75283021.js";import{_ as $,a as E}from"./_plugin-vue_export-helper-92672ba5.js";import{V as f,a as v}from"./VRow-f5909456.js";import"./VBtn-6c8f9f75.js";const H={key:1,class:"content"},R={key:0},z={key:1},D=["src","width","height"],F=["src","width","height"],P={__name:"ContentBlock",props:{contentBlockKey:{type:String,required:!0}},setup(o){const d=o,g=w(),{contentBlocks:n,contentAssistEnabled:c}=B(g),t=n.value[d.contentBlockKey];return(u,L)=>(a(),s("div",{class:h(e(c)?"content-block outlined":"content-block")},[e(c)?(a(),r(N,{key:0,icon:"mdi-file-document-outline"},{default:l(()=>[I(k(o.contentBlockKey),1)]),_:1})):i("",!0),e(t)?(a(),s("div",H,[e(t).title?(a(),s("h3",R,k(e(t).title),1)):i("",!0),e(t).title?(a(),s("hr",z)):i("",!0),e(t).image&&e(t).imageAlignment!=="bottom"?(a(),s("img",{key:2,src:e(t).image.url,width:e(_)(e(t).image.details.image.width,e(t).image.details.image.height),height:e(p)(e(t).image.details.image.width,e(t).image.details.image.height),class:h(e(t).imageAlignment),alt:"Content Block Image"},null,10,D)):i("",!0),m(C,{content:e(t).content},null,8,["content"]),e(t).image&&e(t).imageAlignment==="bottom"?(a(),s("img",{key:3,src:e(t).image.url,width:e(_)(e(t).image.details.image.width,e(t).image.details.image.height),height:e(p)(e(t).image.details.image.width,e(t).image.details.image.height),class:h(e(t).imageAlignment),alt:"Content Block Image"},null,10,F)):i("",!0)])):i("",!0)],2))}};const T=o=>(S("data-v-bd343657"),o=o(),K(),o),W=T(()=>y("hr",null,null,-1)),q=["src","width","height"],G={__name:"Content",setup(o){const d=w(),{contentPages:g}=B(d),n=V(()=>{const c=x.currentRoute.value.path;return g.value[c]});return(c,t)=>(a(),r(E,{class:"content-page"},{default:l(()=>[y("h2",null,k(n.value.title),1),W,n.value.headerImage?(a(),r(f,{key:0},{default:l(()=>[m(v,null,{default:l(()=>[y("img",{src:n.value.headerImage.url,width:e(_)(n.value.headerImage.details.image.width,n.value.headerImage.details.image.height),height:e(p)(n.value.headerImage.details.image.width,n.value.headerImage.details.image.height),alt:"Header Image"},null,8,q)]),_:1})]),_:1})):i("",!0),(a(!0),s(b,null,A(n.value.contentBlocks,u=>(a(),r(f,{key:u.key},{default:l(()=>[m(v,null,{default:l(()=>[m(P,{contentBlockKey:u.key},null,8,["contentBlockKey"])]),_:2},1024)]),_:2},1024))),128))]),_:1}))}},Z=$(G,[["__scopeId","data-v-bd343657"]]);export{Z as default};

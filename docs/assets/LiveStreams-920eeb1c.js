import{p as S,ab as B,L as I,a1 as $,ac as D,c as L,r as H,v as d,w as T,A as e,z as t,y as f,B as N,C as i,D as h,ad as P,E as V,G as p,F,l as M,m as O,t as a,H as j,I as A}from"./index-6c7a25e9.js";import{_ as E}from"./logo193x185-7d7a5dcc.js";import{V as y,a as b}from"./VCard-0acddbf6.js";import{V as g,a as w,_ as R}from"./_plugin-vue_export-helper-8fb97a2a.js";import{V as q}from"./VAvatar-ec6189a6.js";import{V as C}from"./VBtn-c47791ad.js";import{V as v,a as n}from"./VRow-353a3bec.js";import{V as z}from"./VDialog-36c6f2d9.js";import{V as G}from"./VAlert-837d156d.js";import"./index-369948d6.js";import"./forwardRefs-8348545e.js";import"./dialog-transition-1c62b893.js";const U=S({disabled:Boolean,modelValue:{type:Boolean,default:null},...B()},"VHover"),Y=I()({name:"VHover",props:U(),emits:{"update:modelValue":l=>!0},setup(l,c){let{slots:o}=c;const r=$(l,"modelValue"),{runOpenDelay:_,runCloseDelay:s}=D(l,u=>!l.disabled&&(r.value=u));return()=>{var u;return(u=o.default)==null?void 0:u.call(o,{isHovering:r.value,props:{onMouseenter:_,onMouseleave:s}})}}}),J=p("hr",null,null,-1),K=["src"],m={__name:"VideoCard",props:{video:{type:Object,required:!0}},setup(l){const c=l,o=L(()=>{const[,_,s]=c.video.title.split("-");return`${s} - ${_}`}),r=H(!1);return(_,s)=>(d(),T(F,null,[e(Y,null,{default:t(({isHovering:u,props:k})=>[l.video?(d(),f(y,N({key:0},k,{class:{"on-hover":u},elevation:u?16:2,variant:"outlined"}),{default:t(()=>[e(b,null,{default:t(()=>[e(g,{color:"red"},{default:t(()=>[i("mdi-youtube")]),_:1}),i(" "+h(o.value),1)]),_:1}),e(q,{src:E,class:"mx-auto",width:"193",height:"185"}),e(P,{"model-value":u,class:"align-center justify-center",contained:""},{default:t(()=>[e(C,{icon:"mdi-play",onClick:s[0]||(s[0]=ee=>r.value=!0)})]),_:2},1032,["model-value"])]),_:2},1040,["class","elevation"])):V("",!0)]),_:1}),e(z,{modelValue:r.value,"onUpdate:modelValue":s[2]||(s[2]=u=>r.value=u),width:"auto"},{default:t(()=>[e(y,{width:"800"},{actions:t(()=>[e(C,{class:"ms-auto",text:"Close",onClick:s[1]||(s[1]=u=>r.value=!1)})]),default:t(()=>[e(b,null,{default:t(()=>[i(h(o.value)+" ",1),J]),_:1}),e(w,null,{default:t(()=>[e(v,null,{default:t(()=>[e(n,{class:"d-flex"},{default:t(()=>[p("iframe",{id:"player",class:"mx-auto",type:"text/html",width:"640",height:"390",src:`http://www.youtube.com/embed/${l.video.id}`,frameborder:"0",allowfullscreen:""},null,8,K)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])],64))}};const x=l=>(j("data-v-b35cccb5"),l=l(),A(),l),Q=x(()=>p("h2",null,"Live Streams",-1)),W=x(()=>p("hr",null,null,-1)),X=["href"],Z={__name:"LiveStreams",setup(l){const c=M(),{videoList:o,churchInfo:r}=O(c);return(_,s)=>(d(),f(w,{class:"video-list"},{default:t(()=>[Q,W,e(v,null,{default:t(()=>[e(n,null,{default:t(()=>[e(G,null,{default:t(()=>[i(" Choose a recent live stream below to view or visit our "),e(g,{color:"red"},{default:t(()=>[i("mdi-youtube")]),_:1}),p("a",{href:a(r).youTube,target:"_blank"},"YouTube Channel",8,X),i(" to see the full list of videos! ")]),_:1})]),_:1})]),_:1}),a(o)&&a(o).length>0?(d(),f(v,{key:0},{default:t(()=>[e(n,null,{default:t(()=>[e(m,{video:a(o)[0]},null,8,["video"])]),_:1})]),_:1})):V("",!0),a(o)&&a(o).length>2?(d(),f(v,{key:1},{default:t(()=>[e(n,{cols:"7"},{default:t(()=>[e(m,{video:a(o)[1]},null,8,["video"])]),_:1}),e(n,{cols:"5"},{default:t(()=>[e(m,{video:a(o)[2]},null,8,["video"])]),_:1})]),_:1})):V("",!0),a(o)&&a(o).length>4?(d(),f(v,{key:2},{default:t(()=>[e(n,{cols:"5"},{default:t(()=>[e(m,{video:a(o)[3]},null,8,["video"])]),_:1}),e(n,{cols:"7"},{default:t(()=>[e(m,{video:a(o)[4]},null,8,["video"])]),_:1})]),_:1})):V("",!0)]),_:1}))}},me=R(Z,[["__scopeId","data-v-b35cccb5"]]);export{me as default};
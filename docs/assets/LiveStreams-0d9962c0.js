import{p as S,ab as B,L as I,a1 as $,ac as D,c as L,r as H,v as d,w as T,A as e,z as t,y as v,B as N,C as i,D as h,ad as P,E as V,G as p,F,l as M,m as O,t as a,H as j,I as A}from"./index-a5008ef7.js";import{_ as E}from"./logo193x185-7d7a5dcc.js";import{V as y,a as b}from"./VCard-2a029651.js";import{V as g,a as w,_ as R}from"./_plugin-vue_export-helper-92672ba5.js";import{V as q}from"./VAvatar-dc12ed04.js";import{V as C}from"./VBtn-6c8f9f75.js";import{V as f,a as n}from"./VRow-f5909456.js";import{V as z}from"./VDialog-901759e8.js";import{V as G}from"./VAlert-75283021.js";import"./index-02cd3fe2.js";import"./forwardRefs-8348545e.js";import"./dialog-transition-2fe7e829.js";const U=S({disabled:Boolean,modelValue:{type:Boolean,default:null},...B()},"VHover"),Y=I()({name:"VHover",props:U(),emits:{"update:modelValue":o=>!0},setup(o,c){let{slots:l}=c;const r=$(o,"modelValue"),{runOpenDelay:m,runCloseDelay:s}=D(o,u=>!o.disabled&&(r.value=u));return()=>{var u;return(u=l.default)==null?void 0:u.call(l,{isHovering:r.value,props:{onMouseenter:m,onMouseleave:s}})}}}),J=p("hr",null,null,-1),K=["src","title"],_={__name:"VideoCard",props:{video:{type:Object,required:!0}},setup(o){const c=o,l=L(()=>{const[,m,s]=c.video.title.split("-");return`${s} - ${m}`}),r=H(!1);return(m,s)=>(d(),T(F,null,[e(Y,null,{default:t(({isHovering:u,props:k})=>[o.video?(d(),v(y,N({key:0},k,{class:{"on-hover":u},elevation:u?16:2,variant:"outlined"}),{default:t(()=>[e(b,null,{default:t(()=>[e(g,{color:"red"},{default:t(()=>[i("mdi-youtube")]),_:1}),i(" "+h(l.value),1)]),_:1}),e(q,{src:E,class:"mx-auto",width:"193",height:"185"}),e(P,{"model-value":u,class:"align-center justify-center",contained:""},{default:t(()=>[e(C,{icon:"mdi-play",onClick:s[0]||(s[0]=ee=>r.value=!0)})]),_:2},1032,["model-value"])]),_:2},1040,["class","elevation"])):V("",!0)]),_:1}),e(z,{modelValue:r.value,"onUpdate:modelValue":s[2]||(s[2]=u=>r.value=u),width:"auto"},{default:t(()=>[e(y,{width:"800"},{actions:t(()=>[e(C,{class:"ms-auto",text:"Close",onClick:s[1]||(s[1]=u=>r.value=!1)})]),default:t(()=>[e(b,null,{default:t(()=>[i(h(l.value)+" ",1),J]),_:1}),e(w,null,{default:t(()=>[e(f,null,{default:t(()=>[e(n,{class:"d-flex"},{default:t(()=>[p("iframe",{id:"player",class:"mx-auto",type:"text/html",width:"640",height:"390",src:`http://www.youtube.com/embed/${o.video.id}`,title:o.video.title,allowfullscreen:""},null,8,K)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])],64))}};const x=o=>(j("data-v-b35cccb5"),o=o(),A(),o),Q=x(()=>p("h2",null,"Live Streams",-1)),W=x(()=>p("hr",null,null,-1)),X=["href"],Z={__name:"LiveStreams",setup(o){const c=M(),{videoList:l,churchInfo:r}=O(c);return(m,s)=>(d(),v(w,{class:"video-list"},{default:t(()=>[Q,W,e(f,null,{default:t(()=>[e(n,null,{default:t(()=>[e(G,null,{default:t(()=>[i(" Choose a recent live stream below to view or visit our "),e(g,{color:"red"},{default:t(()=>[i("mdi-youtube")]),_:1}),p("a",{href:a(r).youTube,target:"_blank"},"YouTube Channel",8,X),i(" to see the full list of videos! ")]),_:1})]),_:1})]),_:1}),a(l)&&a(l).length>0?(d(),v(f,{key:0},{default:t(()=>[e(n,null,{default:t(()=>[e(_,{video:a(l)[0]},null,8,["video"])]),_:1})]),_:1})):V("",!0),a(l)&&a(l).length>2?(d(),v(f,{key:1},{default:t(()=>[e(n,{cols:"7"},{default:t(()=>[e(_,{video:a(l)[1]},null,8,["video"])]),_:1}),e(n,{cols:"5"},{default:t(()=>[e(_,{video:a(l)[2]},null,8,["video"])]),_:1})]),_:1})):V("",!0),a(l)&&a(l).length>4?(d(),v(f,{key:2},{default:t(()=>[e(n,{cols:"5"},{default:t(()=>[e(_,{video:a(l)[3]},null,8,["video"])]),_:1}),e(n,{cols:"7"},{default:t(()=>[e(_,{video:a(l)[4]},null,8,["video"])]),_:1})]),_:1})):V("",!0)]),_:1}))}},_e=R(Z,[["__scopeId","data-v-b35cccb5"]]);export{_e as default};
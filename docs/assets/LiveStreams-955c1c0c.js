import{p as S,J as B,V as $,c as D,r as I,t as d,v as H,z as e,y as t,x as f,A as L,B as i,C as h,D as V,E as p,F as T,u as N,l as P,q as a,G as F,H as M}from"./index-bbbb7ae6.js";import{_ as O}from"./logo193x185-7d7a5dcc.js";import{V as y,a as b}from"./VCard-56b24c34.js";import{V as g,a as x,_ as j}from"./_plugin-vue_export-helper-f10cdba6.js";import{V as q}from"./VAvatar-64cfbca3.js";import{m as A,u as E,V as R}from"./VOverlay-c2190ae6.js";import{V as C}from"./VBtn-83152033.js";import{V as v,a as n}from"./VRow-2acea49a.js";import{V as z}from"./VDialog-ae5f9b4c.js";import{V as G}from"./VAlert-e82da36d.js";import"./index-d6d79046.js";import"./forwardRefs-e658ad70.js";const J=S({disabled:Boolean,modelValue:{type:Boolean,default:null},...A()},"VHover"),U=B()({name:"VHover",props:J(),emits:{"update:modelValue":l=>!0},setup(l,c){let{slots:o}=c;const r=$(l,"modelValue"),{runOpenDelay:m,runCloseDelay:s}=E(l,u=>!l.disabled&&(r.value=u));return()=>{var u;return(u=o.default)==null?void 0:u.call(o,{isHovering:r.value,props:{onMouseenter:m,onMouseleave:s}})}}}),Y=p("hr",null,null,-1),K=["src"],_={__name:"VideoCard",props:{video:{type:Object,required:!0}},setup(l){const c=l,o=D(()=>{const[,m,s]=c.video.title.split("-");return`${s} - ${m}`}),r=I(!1);return(m,s)=>(d(),H(T,null,[e(U,null,{default:t(({isHovering:u,props:k})=>[l.video?(d(),f(y,L({key:0},k,{class:{"on-hover":u},elevation:u?16:2,variant:"outlined"}),{default:t(()=>[e(b,null,{default:t(()=>[e(g,{color:"red"},{default:t(()=>[i("mdi-youtube")]),_:1}),i(" "+h(o.value),1)]),_:1}),e(q,{src:O,class:"mx-auto",width:"193",height:"185"}),e(R,{"model-value":u,class:"align-center justify-center",contained:""},{default:t(()=>[e(C,{icon:"mdi-play",onClick:s[0]||(s[0]=ee=>r.value=!0)})]),_:2},1032,["model-value"])]),_:2},1040,["class","elevation"])):V("",!0)]),_:1}),e(z,{modelValue:r.value,"onUpdate:modelValue":s[2]||(s[2]=u=>r.value=u),width:"auto"},{default:t(()=>[e(y,{width:"800"},{actions:t(()=>[e(C,{class:"ms-auto",text:"Close",onClick:s[1]||(s[1]=u=>r.value=!1)})]),default:t(()=>[e(b,null,{default:t(()=>[i(h(o.value)+" ",1),Y]),_:1}),e(x,null,{default:t(()=>[e(v,null,{default:t(()=>[e(n,{class:"d-flex"},{default:t(()=>[p("iframe",{id:"player",class:"mx-auto",type:"text/html",width:"640",height:"390",src:`http://www.youtube.com/embed/${l.video.id}`,frameborder:"0",allowfullscreen:""},null,8,K)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])],64))}};const w=l=>(F("data-v-b35cccb5"),l=l(),M(),l),Q=w(()=>p("h2",null,"Live Streams",-1)),W=w(()=>p("hr",null,null,-1)),X=["href"],Z={__name:"LiveStreams",setup(l){const c=N(),{videoList:o,churchInfo:r}=P(c);return(m,s)=>(d(),f(x,{class:"video-list"},{default:t(()=>[Q,W,e(v,null,{default:t(()=>[e(n,null,{default:t(()=>[e(G,null,{default:t(()=>[i(" Choose a recent live stream below to view or visit our "),e(g,{color:"red"},{default:t(()=>[i("mdi-youtube")]),_:1}),p("a",{href:a(r).youTube,target:"_blank"},"YouTube Channel",8,X),i(" to see the full list of videos! ")]),_:1})]),_:1})]),_:1}),a(o)&&a(o).length>0?(d(),f(v,{key:0},{default:t(()=>[e(n,null,{default:t(()=>[e(_,{video:a(o)[0]},null,8,["video"])]),_:1})]),_:1})):V("",!0),a(o)&&a(o).length>2?(d(),f(v,{key:1},{default:t(()=>[e(n,{cols:"7"},{default:t(()=>[e(_,{video:a(o)[1]},null,8,["video"])]),_:1}),e(n,{cols:"5"},{default:t(()=>[e(_,{video:a(o)[2]},null,8,["video"])]),_:1})]),_:1})):V("",!0),a(o)&&a(o).length>4?(d(),f(v,{key:2},{default:t(()=>[e(n,{cols:"5"},{default:t(()=>[e(_,{video:a(o)[3]},null,8,["video"])]),_:1}),e(n,{cols:"7"},{default:t(()=>[e(_,{video:a(o)[4]},null,8,["video"])]),_:1})]),_:1})):V("",!0)]),_:1}))}},_e=j(Z,[["__scopeId","data-v-b35cccb5"]]);export{_e as default};

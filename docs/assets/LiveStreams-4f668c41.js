import{p as S,I as B,T as I,c as $,r as D,n as r,z as T,t as e,w as t,q as v,B as L,v as i,x as h,C as V,D as p,F as H,u as N,l as P,y as a,E as j,G as q}from"./index-5066347d.js";import{_ as F}from"./logo193x185-021c3c97.js";import{a as y,b,V as d,d as M,_ as O}from"./_plugin-vue_export-helper-78efbbbb.js";import{a as g,q as E,V as C}from"./lazy-8855a7fb.js";import{i as R,j as z,h as A,V as f}from"./forwardRefs-15342fa7.js";import{V as w}from"./VContainer-be2d34ae.js";import{V as G}from"./VAlert-82edfb26.js";const U=S({disabled:Boolean,modelValue:{type:Boolean,default:void 0},...R()},"VHover"),Y=B()({name:"VHover",props:U(),emits:{"update:modelValue":o=>!0},setup(o,c){let{slots:l}=c;const n=I(o,"modelValue"),{runOpenDelay:_,runCloseDelay:s}=z(o,u=>!o.disabled&&(n.value=u));return()=>{var u;return(u=l.default)==null?void 0:u.call(l,{isHovering:n.value,props:{onMouseenter:_,onMouseleave:s}})}}}),J=p("hr",null,null,-1),K=["src"],m={__name:"VideoCard",props:{video:{type:Object,required:!0}},setup(o){const c=o,l=$(()=>{const[,_,s]=c.video.title.split("-");return`${s} - ${_}`}),n=D(!1);return(_,s)=>(r(),T(H,null,[e(Y,null,{default:t(({isHovering:u,props:k})=>[o.video?(r(),v(y,L({key:0},k,{class:{"on-hover":u},elevation:u?16:2,variant:"outlined"}),{default:t(()=>[e(b,null,{default:t(()=>[e(g,{color:"red"},{default:t(()=>[i("mdi-youtube")]),_:1}),i(" "+h(l.value),1)]),_:1}),e(E,{src:F,class:"mx-auto",width:"193",height:"185"}),e(A,{"model-value":u,class:"align-center justify-center",contained:""},{default:t(()=>[e(C,{icon:"mdi-play",onClick:s[0]||(s[0]=ee=>n.value=!0)})]),_:2},1032,["model-value"])]),_:2},1040,["class","elevation"])):V("",!0)]),_:1}),e(M,{modelValue:n.value,"onUpdate:modelValue":s[2]||(s[2]=u=>n.value=u),width:"auto"},{default:t(()=>[e(y,{width:"800"},{actions:t(()=>[e(C,{class:"ms-auto",text:"Close",onClick:s[1]||(s[1]=u=>n.value=!1)})]),default:t(()=>[e(b,null,{default:t(()=>[i(h(l.value)+" ",1),J]),_:1}),e(w,null,{default:t(()=>[e(f,null,{default:t(()=>[e(d,{class:"d-flex"},{default:t(()=>[p("iframe",{id:"player",class:"mx-auto",type:"text/html",width:"640",height:"390",src:`http://www.youtube.com/embed/${o.video.id}`,frameborder:"0",allowfullscreen:""},null,8,K)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])],64))}};const x=o=>(j("data-v-b35cccb5"),o=o(),q(),o),Q=x(()=>p("h2",null,"Live Streams",-1)),W=x(()=>p("hr",null,null,-1)),X=["href"],Z={__name:"LiveStreams",setup(o){const c=N(),{videoList:l,churchInfo:n}=P(c);return(_,s)=>(r(),v(w,{class:"video-list"},{default:t(()=>[Q,W,e(f,null,{default:t(()=>[e(d,null,{default:t(()=>[e(G,null,{default:t(()=>[i(" Choose a recent live stream below to view or visit our "),e(g,{color:"red"},{default:t(()=>[i("mdi-youtube")]),_:1}),p("a",{href:a(n).youTube,target:"_blank"},"YouTube Channel",8,X),i(" to see the full list of videos! ")]),_:1})]),_:1})]),_:1}),a(l)&&a(l).length>0?(r(),v(f,{key:0},{default:t(()=>[e(d,null,{default:t(()=>[e(m,{video:a(l)[0]},null,8,["video"])]),_:1})]),_:1})):V("",!0),a(l)&&a(l).length>2?(r(),v(f,{key:1},{default:t(()=>[e(d,{cols:"7"},{default:t(()=>[e(m,{video:a(l)[1]},null,8,["video"])]),_:1}),e(d,{cols:"5"},{default:t(()=>[e(m,{video:a(l)[2]},null,8,["video"])]),_:1})]),_:1})):V("",!0),a(l)&&a(l).length>4?(r(),v(f,{key:2},{default:t(()=>[e(d,{cols:"5"},{default:t(()=>[e(m,{video:a(l)[3]},null,8,["video"])]),_:1}),e(d,{cols:"7"},{default:t(()=>[e(m,{video:a(l)[4]},null,8,["video"])]),_:1})]),_:1})):V("",!0)]),_:1}))}},de=O(Z,[["__scopeId","data-v-b35cccb5"]]);export{de as default};

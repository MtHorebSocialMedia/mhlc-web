import{c as L,h as $,b as D,p as z,q as R,d as p,j as F,k as j,i as q,e as w,r as E,s as M,f as O,l as J,V as K,g as d}from"./_plugin-vue_export-helper-8fb97a2a.js";import{p as N,an as U,J as G,T as H,P as Q,K as W,L as X,a1 as Y,c as o,M as Z,U as ee,aq as ae,R as te,au as le,A as t,B as ne}from"./index-6c7a25e9.js";import{V as se}from"./VBtn-c47791ad.js";const oe=L("v-alert-title"),re=["success","info","warning","error"],ie=N({border:{type:[Boolean,String],validator:e=>typeof e=="boolean"||["top","end","bottom","start"].includes(e)},borderColor:String,closable:Boolean,closeIcon:{type:U,default:"$close"},closeLabel:{type:String,default:"$vuetify.close"},icon:{type:[Boolean,String,Function,Object],default:null},modelValue:{type:Boolean,default:!0},prominent:Boolean,title:String,text:String,type:{type:String,validator:e=>re.includes(e)},...G(),...$(),...H(),...D(),...z(),...R(),...p(),...Q(),...W(),...F({variant:"flat"})},"VAlert"),ve=X()({name:"VAlert",props:ie(),emits:{"click:close":e=>!0,"update:modelValue":e=>!0},setup(e,v){let{emit:m,slots:a}=v;const r=Y(e,"modelValue"),n=o(()=>{if(e.icon!==!1)return e.type?e.icon??`$${e.type}`:e.icon}),y=o(()=>({color:e.color??e.type,variant:e.variant})),{themeClasses:f}=Z(e),{colorClasses:k,colorStyles:b,variantClasses:V}=j(y),{densityClasses:P}=q(e),{dimensionStyles:C}=ee(e),{elevationClasses:g}=w(e),{locationStyles:x}=E(e),{positionClasses:S}=M(e),{roundedClasses:_}=O(e),{textColorClasses:A,textColorStyles:B}=ae(te(e,"borderColor")),{t:T}=le(),i=o(()=>({"aria-label":T(e.closeLabel),onClick(s){r.value=!1,m("click:close",s)}}));return()=>{const s=!!(a.prepend||n.value),h=!!(a.title||e.title),I=!!(a.close||e.closable);return r.value&&t(e.tag,{class:["v-alert",e.border&&{"v-alert--border":!!e.border,[`v-alert--border-${e.border===!0?"start":e.border}`]:!0},{"v-alert--prominent":e.prominent},f.value,k.value,P.value,g.value,S.value,_.value,V.value,e.class],style:[b.value,C.value,x.value,e.style],role:"alert"},{default:()=>{var c,u;return[J(!1,"v-alert"),e.border&&t("div",{key:"border",class:["v-alert__border",A.value],style:B.value},null),s&&t("div",{key:"prepend",class:"v-alert__prepend"},[a.prepend?t(d,{key:"prepend-defaults",disabled:!n.value,defaults:{VIcon:{density:e.density,icon:n.value,size:e.prominent?44:28}}},a.prepend):t(K,{key:"prepend-icon",density:e.density,icon:n.value,size:e.prominent?44:28},null)]),t("div",{class:"v-alert__content"},[h&&t(oe,{key:"title"},{default:()=>{var l;return[((l=a.title)==null?void 0:l.call(a))??e.title]}}),((c=a.text)==null?void 0:c.call(a))??e.text,(u=a.default)==null?void 0:u.call(a)]),a.append&&t("div",{key:"append",class:"v-alert__append"},[a.append()]),I&&t("div",{key:"close",class:"v-alert__close"},[a.close?t(d,{key:"close-defaults",defaults:{VBtn:{icon:e.closeIcon,size:"x-small",variant:"text"}}},{default:()=>{var l;return[(l=a.close)==null?void 0:l.call(a,{props:i.value})]}}):t(se,ne({key:"close-btn",icon:e.closeIcon,size:"x-small",variant:"text"},i.value),null)])]}})}}});export{ve as V};

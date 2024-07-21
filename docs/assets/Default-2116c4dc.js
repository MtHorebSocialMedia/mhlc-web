import{_ as He}from"./logo193x185-7d7a5dcc.js";import{p as j,i as le,c as b,r as ae,a as H,e as pe,b as O,g as Ce,n as oe,d as Se,f as Fe,s as we,o as Ue,h as Oe,j as je,k as Ke,u as ne,l as se,m as ue,q as c,t as v,v as B,w as Z,x as I,y as t,z as e,A as F,B as u,C as p,F as P,D as Ie,E as L,G as Je,H as Ze,I as ke,J as re,K as xe,L as qe,S as Xe,M as ye,N as Ge}from"./index-36c4139c.js";import{u as $e,V as y}from"./VBtn-78255440.js";import{V as ee,a as U,b as M,u as We}from"./VList-d8388aa6.js";import{V as te}from"./VMenu-14436864.js";import{V as S,c as Ye,m as Qe,a as et,b as tt,u as at,d as lt,e as ot,f as nt,g as st,h as ut}from"./index-40a6a7b4.js";import{V as k,a as w}from"./VRow-779c532d.js";import{V as N,_ as rt,m as ie,u as de,a as Le}from"./_plugin-vue_export-helper-1c413193.js";import{V as he,a as ge}from"./VCard-6e58e9e6.js";import{V as be}from"./VDialog-9d842082.js";import{_ as it}from"./NewsList-6cb27163.js";import"./index-d3eea8aa.js";import"./index-122ca1d5.js";import"./VAvatar-aebda271.js";import"./VOverlay-66aa598d.js";import"./forwardRefs-e658ad70.js";import"./index.esm-81aa6dd6.js";import"./VChip-0a5a6de9.js";const q=Symbol.for("vuetify:layout"),Re=Symbol.for("vuetify:layout-item"),Ve=1e3,dt=j({overlaps:{type:Array,default:()=>[]},fullHeight:Boolean},"layout"),ct=j({name:{type:String},order:{type:[Number,String],default:0},absolute:Boolean},"layout-item");function ft(){const a=le(q);if(!a)throw new Error("[Vuetify] Could not find injected layout");return{layoutIsReady:oe(),getLayoutItem:a.getLayoutItem,mainRect:a.mainRect,mainStyles:a.mainStyles}}function mt(a){const s=le(q);if(!s)throw new Error("[Vuetify] Could not find injected layout");const l=a.id??`layout-item-${Fe()}`,i=Ce("useLayoutItem");Se(Re,{id:l});const r=we(!1);Ue(()=>r.value=!0),Oe(()=>r.value=!1);const _=oe(),{layoutItemStyles:o,layoutItemScrimStyles:n}=s.register(i,{...a,active:b(()=>r.value?!1:a.active.value),id:l});return je(()=>s.unregister(l)),{layoutItemStyles:o,layoutRect:s.layoutRect,layoutItemScrimStyles:n,layoutIsReady:_}}const _t=(a,s,l,i)=>{let r={top:0,left:0,right:0,bottom:0};const _=[{id:"",layer:{...r}}];for(const o of a){const n=s.get(o),d=l.get(o),V=i.get(o);if(!n||!d||!V)continue;const f={...r,[n.value]:parseInt(r[n.value],10)+(V.value?parseInt(d.value,10):0)};_.push({id:o,layer:f}),r=f}return _};function vt(a){const s=le(q,null),l=b(()=>s?s.rootZIndex.value-100:Ve),i=ae([]),r=H(new Map),_=H(new Map),o=H(new Map),n=H(new Map),d=H(new Map),{resizeRef:V,contentRect:f}=$e(),h=pe(()=>{const g=[...new Set([...o.values()].map(m=>m.value))].sort((m,z)=>m-z),x=[];for(const m of g){const z=i.value.filter(C=>{var A;return((A=o.get(C))==null?void 0:A.value)===m});x.push(...z)}return _t(x,r,_,n)}),K=b(()=>!Array.from(d.values()).some(g=>g.value)),R=b(()=>h.value[h.value.length-1].layer),J=b(()=>({"--v-layout-left":O(R.value.left),"--v-layout-right":O(R.value.right),"--v-layout-top":O(R.value.top),"--v-layout-bottom":O(R.value.bottom),...K.value?void 0:{transition:"none"}})),E=pe(()=>h.value.slice(1).map((g,x)=>{let{id:m}=g;const{layer:z}=h.value[x],C=_.get(m),A=r.get(m);return{id:m,...z,size:Number(C.value),position:A.value}})),ce=g=>E.value.find(x=>x.id===g),X=Ce("createLayout"),fe=oe();Se(q,{register:(g,x)=>{let{id:m,order:z,position:C,layoutSize:A,elementSize:D,active:me,disableTransitions:_e,absolute:Me}=x;o.set(m,z),r.set(m,C),_.set(m,A),n.set(m,me),_e&&d.set(m,_e);const ve=Ke(Re,X==null?void 0:X.vnode).indexOf(g);ve>-1?i.value.splice(ve,0,m):i.value.push(m);const G=b(()=>E.value.findIndex(T=>T.id===m)),W=b(()=>l.value+h.value.length*2-G.value*2),Pe=b(()=>{const T=C.value==="left"||C.value==="right",Y=C.value==="right",Ee=C.value==="bottom",Q=D.value??A.value,De=Q===0?"%":"px",Te={[C.value]:0,zIndex:W.value,transform:`translate${T?"X":"Y"}(${(me.value?0:-(Q===0?100:Q))*(Y||Ee?-1:1)}${De})`,position:Me.value||l.value!==Ve?"absolute":"fixed",...K.value?void 0:{transition:"none"}};if(G.value<0)throw new Error(`Layout item "${m}" is missing`);const $=E.value[G.value];if(!$)throw new Error(`[Vuetify] Could not find layout item "${m}"`);return{...Te,height:T?`calc(100% - ${$.top}px - ${$.bottom}px)`:D.value?`${D.value}px`:void 0,left:Y?void 0:`${$.left}px`,right:Y?`${$.right}px`:void 0,top:C.value!=="bottom"?`${$.top}px`:void 0,bottom:C.value!=="top"?`${$.bottom}px`:void 0,width:T?D.value?`${D.value}px`:void 0:`calc(100% - ${$.left}px - ${$.right}px)`}}),Ne=b(()=>({zIndex:W.value-1}));return{layoutItemStyles:Pe,layoutItemScrimStyles:Ne,zIndex:W}},unregister:g=>{o.delete(g),r.delete(g),_.delete(g),n.delete(g),d.delete(g),i.value=i.value.filter(x=>x!==g)},mainRect:R,mainStyles:J,getLayoutItem:ce,items:E,layoutRect:f,rootZIndex:l,layoutIsReady:fe});const Ae=b(()=>["v-layout",{"v-layout--full-height":a.fullHeight}]),Be=b(()=>({zIndex:s?l.value:void 0,position:s?"relative":void 0,overflow:s?"hidden":void 0}));return{layoutClasses:Ae,layoutStyles:Be,getLayoutItem:ce,items:E,layoutRect:f,layoutIsReady:fe,layoutRef:V}}const pt={__name:"Menu",setup(a){const s=ne(),{menuItems:l}=se(s),{lgAndUp:i}=ue();return(r,_)=>c(i)?(v(!0),B(P,{key:0},Z(c(l),o=>(v(),I(te,{key:o.id,"open-on-hover":""},{activator:t(({props:n})=>[e(y,F({color:"primary",ref_for:!0},n,{to:o.path,variant:"text"}),{default:t(()=>[u(p(o.label),1)]),_:2},1040,["to"])]),default:t(()=>[o.children.length>0?(v(),I(ee,{key:0},{default:t(()=>[(v(!0),B(P,null,Z(o.children,n=>(v(),I(U,{key:n.id},{default:t(()=>[e(M,null,{default:t(()=>[e(y,{to:n.path,plain:""},{default:t(()=>[u(p(n.label),1)]),_:2},1032,["to"])]),_:2},1024)]),_:2},1024))),128))]),_:2},1024)):Ie("",!0)]),_:2},1024))),128)):(v(),I(te,{key:1},{activator:t(({props:o})=>[e(y,F(o,{icon:""}),{default:t(()=>[e(S,null,{default:t(()=>[u("mdi-menu")]),_:1})]),_:2},1040)]),default:t(()=>[e(ee,null,{default:t(()=>[(v(!0),B(P,null,Z(c(l),(o,n)=>(v(),I(U,{key:n,value:n},{default:t(()=>[!o.children||o.children.length==0?(v(),I(M,{key:0},{default:t(()=>[e(y,F({color:"primary",ref_for:!0},r.props,{to:o.path,variant:"text"}),{default:t(()=>[e(S),u(" "+p(o.label),1)]),_:2},1040,["to"])]),_:2},1024)):(v(),I(M,{key:1},{default:t(()=>[e(te,{location:"start"},{activator:t(({props:d})=>[e(y,F({color:"primary",ref_for:!0},d,{variant:"text"}),{default:t(()=>[e(S,null,{default:t(()=>[u("mdi-menu-left")]),_:1}),u(" "+p(o.label),1)]),_:2},1040)]),default:t(()=>[e(ee,null,{default:t(()=>[(v(!0),B(P,null,Z(o.children,(d,V)=>(v(),I(U,{key:V,value:V},{default:t(()=>[e(M,null,{default:t(()=>[e(y,F({color:"primary",ref_for:!0},r.props,{to:d.path,variant:"text"}),{default:t(()=>[u(p(d.label),1)]),_:2},1040,["to"])]),_:2},1024)]),_:2},1032,["value"]))),128))]),_:2},1024)]),_:2},1024)]),_:2},1024))]),_:2},1032,["value"]))),128)),e(U,{value:c(l).length},{default:t(()=>[e(M,null,{default:t(()=>[e(y,{color:"primary",to:"/donate",variant:"text"},{default:t(()=>[e(S),u(" Donate ")]),_:1})]),_:1})]),_:1},8,["value"]),e(U,{value:c(l).length+1},{default:t(()=>[e(M,null,{default:t(()=>[e(y,{color:"primary",to:"/newsletter",variant:"text"},{default:t(()=>[e(S),u(" Join the Newsletter ")]),_:1})]),_:1})]),_:1},8,["value"])]),_:1})]),_:1}))}};const yt=Ye("v-spacer","div","VSpacer"),ht=["width","height"],gt=L("br",null,null,-1),bt={key:0},Vt=L("br",null,null,-1),Ct=L("br",null,null,-1),St={key:1},wt=L("hr",null,null,-1),It=L("br",null,null,-1),kt=L("hr",null,null,-1),xt={__name:"AppBar",setup(a){const s=ne(),{churchInfo:l,menuItems:i}=se(s),{lgAndUp:r,smAndUp:_,xs:o}=ue(),n=ae(!1),d=ae(!1);return(V,f)=>(v(),B(P,null,[e(N,{class:"header"},{default:t(()=>[e(k,null,{default:t(()=>[e(w,{cols:"4"},{default:t(()=>[L("img",{width:c(o)?135:193,height:c(o)?130:185,src:He},null,8,ht),gt,u(" "+p(c(l).slogan),1)]),_:1}),e(yt),e(w,{cols:"8"},{default:t(()=>[e(N,null,{default:t(()=>[e(k,null,{default:t(()=>[e(w,{class:"social"},{default:t(()=>[e(y,{icon:""},{default:t(()=>[e(S,{color:"#4267B2"},{default:t(()=>[u("mdi-facebook")]),_:1})]),_:1}),e(y,{icon:""},{default:t(()=>[e(S,{color:"#833AB4"},{default:t(()=>[u("mdi-instagram")]),_:1})]),_:1}),e(y,{icon:""},{default:t(()=>[e(S,{color:"red"},{default:t(()=>[u("mdi-youtube")]),_:1})]),_:1})]),_:1})]),_:1}),e(k,null,{default:t(()=>[e(w,{class:"contact"},{default:t(()=>[c(_)?(v(),B("span",bt,[u(p(c(l).streetAddress),1),Vt,u(" "+p(c(l).city)+", "+p(c(l).state)+" "+p(c(l).zipCode),1),Ct,u(" "+p(c(l).phoneNumber),1)])):(v(),B("span",St,[e(y,{icon:"",onClick:f[0]||(f[0]=h=>n.value=!0)},{default:t(()=>[e(S,{color:"blue"},{default:t(()=>[u("mdi-map-marker")]),_:1})]),_:1}),e(y,{icon:"",onClick:f[1]||(f[1]=h=>d.value=!0)},{default:t(()=>[e(S,{color:"green"},{default:t(()=>[u("mdi-phone")]),_:1})]),_:1})]))]),_:1})]),_:1}),e(k,null,{default:t(()=>[e(w,{class:"menu"},{default:t(()=>[e(pt)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),e(be,{modelValue:n.value,"onUpdate:modelValue":f[3]||(f[3]=h=>n.value=h),width:"auto"},{default:t(()=>[e(he,{width:"400"},{actions:t(()=>[e(y,{class:"ms-auto",text:"Close",onClick:f[2]||(f[2]=h=>n.value=!1)})]),default:t(()=>[e(ge,null,{default:t(()=>[e(S,{color:"blue"},{default:t(()=>[u("mdi-map-marker")]),_:1}),u(" Mt. Horeb Lutheran Church "),wt]),_:1}),e(N,null,{default:t(()=>[e(k,null,{default:t(()=>[e(w,null,{default:t(()=>[u(p(c(l).streetAddress),1),It,u(" "+p(c(l).city)+", "+p(c(l).state)+" "+p(c(l).zipCode),1)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),e(be,{modelValue:d.value,"onUpdate:modelValue":f[5]||(f[5]=h=>d.value=h),width:"auto"},{default:t(()=>[e(he,{width:"400"},{actions:t(()=>[e(y,{class:"ms-auto",text:"Close",onClick:f[4]||(f[4]=h=>d.value=!1)})]),default:t(()=>[e(ge,null,{default:t(()=>[e(S,{color:"green"},{default:t(()=>[u("mdi-phone")]),_:1}),u(" Mt. Horeb Lutheran Church "),kt]),_:1}),e(N,null,{default:t(()=>[e(k,null,{default:t(()=>[e(w,null,{default:t(()=>[u(p(c(l).phoneNumber),1)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])],64))}};const ze=a=>(Je("data-v-267553dc"),a=a(),Ze(),a),$t=ze(()=>L("img",{width:"300",height:"88","data-src":"https://mthoreb.net/wp-content/uploads/2022/09/ELCA_4_Color_Secondary.png",class:"elca image wp-image-12330 attachment-full size-full ls-is-cached lazyloaded",alt:"ELCA Logo",style:{"--smush-placeholder-width":"300px","--smush-placeholder-aspect-ratio":"300/88","max-width":"100%",height:"auto"},decoding:"async",loading:"lazy",src:"https://mthoreb.net/wp-content/uploads/2022/09/ELCA_4_Color_Secondary.png"},null,-1)),Lt=ze(()=>L("h3",null,"Recent News",-1)),Rt={__name:"SideBar",setup(a){return(s,l)=>(v(),I(N,null,{default:t(()=>[e(k,{class:"justify-center"},{default:t(()=>[$t]),_:1}),e(k,null,{default:t(()=>[e(w,null,{default:t(()=>[e(y,{color:"red",block:"",onClick:l[0]||(l[0]=i=>s.$router.push("/donate"))},{default:t(()=>[u(" Donate Online ")]),_:1})]),_:1})]),_:1}),e(k,null,{default:t(()=>[e(w,null,{default:t(()=>[e(y,{color:"red",block:"",onClick:l[1]||(l[1]=i=>s.$router.push("/newsletter"))},{default:t(()=>[u(" Join the Newsletter ")]),_:1})]),_:1})]),_:1}),e(k,null,{default:t(()=>[e(w,null,{default:t(()=>[Lt,e(it,{compact:""})]),_:1})]),_:1})]),_:1}))}},zt=rt(Rt,[["__scopeId","data-v-267553dc"]]);const At=j({...ie(),...dt({fullHeight:!0}),...ke()},"VApp"),Bt=re()({name:"VApp",props:At(),setup(a,s){let{slots:l}=s;const i=xe(a),{layoutClasses:r,getLayoutItem:_,items:o,layoutRef:n}=vt(a),{rtlClasses:d}=qe();return de(()=>e("div",{ref:n,class:["v-application",i.themeClasses.value,r.value,d.value,a.class],style:[a.style]},[e("div",{class:"v-application__wrap"},[e(Xe,null,{default:()=>{var V;return[e(P,null,[(V=l.default)==null?void 0:V.call(l)])]}})])])),{getLayoutItem:_,items:o,theme:i}}});const Mt=j({app:Boolean,color:String,height:{type:[Number,String],default:"auto"},...Qe(),...ie(),...et(),...ct(),...tt(),...Le({tag:"footer"}),...ke()},"VFooter"),Pt=re()({name:"VFooter",props:Mt(),setup(a,s){let{slots:l}=s;const{themeClasses:i}=xe(a),{backgroundColorClasses:r,backgroundColorStyles:_}=at(ye(a,"color")),{borderClasses:o}=lt(a),{elevationClasses:n}=ot(a),{roundedClasses:d}=nt(a),V=we(32),{resizeRef:f}=$e(J=>{J.length&&(V.value=J[0].target.clientHeight)}),h=b(()=>a.height==="auto"?V.value:parseInt(a.height,10)),{layoutItemStyles:K,layoutIsReady:R}=mt({id:a.name,order:b(()=>parseInt(a.order,10)),position:b(()=>"bottom"),layoutSize:h,elementSize:b(()=>a.height==="auto"?void 0:h.value),active:b(()=>a.app),absolute:ye(a,"absolute")});return de(()=>e(a.tag,{ref:f,class:["v-footer",i.value,r.value,o.value,n.value,d.value,a.class],style:[_.value,a.app?K.value:{height:O(a.height)},a.style]},l)),a.app?R:{}}});const Nt=j({scrollable:Boolean,...ie(),...st(),...Le({tag:"main"})},"VMain"),Et=re()({name:"VMain",props:Nt(),setup(a,s){let{slots:l}=s;const{dimensionStyles:i}=ut(a),{mainStyles:r,layoutIsReady:_}=ft(),{ssrBootStyles:o}=We();return de(()=>e(a.tag,{class:["v-main",{"v-main--scrollable":a.scrollable},a.class],style:[r.value,o.value,i.value,a.style]},{default:()=>{var n,d;return[a.scrollable?e("div",{class:"v-main__scroller"},[(n=l.default)==null?void 0:n.call(l)]):(d=l.default)==null?void 0:d.call(l)]}})),_}}),la={__name:"Default",setup(a){const s=ne(),{churchInfo:l}=se(s),{lgAndUp:i}=ue();return(r,_)=>{const o=Ge("router-view");return v(),I(Bt,null,{default:t(()=>[e(xt),e(Et,null,{default:t(()=>[e(N,{class:"main-container fill-height"},{default:t(()=>[e(k,{class:"fill-height"},{default:t(()=>[e(w,{class:"main-view"},{default:t(()=>[e(o)]),_:1}),c(i)?(v(),I(w,{key:0,cols:"3",class:"side-view"},{default:t(()=>[e(zt)]),_:1})):Ie("",!0)]),_:1})]),_:1})]),_:1}),e(Pt,null,{default:t(()=>[u(p(c(l).footer),1)]),_:1})]),_:1})}}};export{la as default};

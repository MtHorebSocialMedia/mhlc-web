import{aA as Q,r as W,ad as Te,h as F,P as $,ay as Se,an as mt,p as S,a2 as A,c as d,aB as U,aw as $e,aC as _e,aD as gt,aE as ht,aF as yt,t as o,F as Re,y as pe,H as q,I as T,J as X,Z as ze,L,g as Y,d as bt,b as Ne,i as Ct,a as St,T as Oe,o as _t,X as Ae,$ as pt,k as kt,B as oe,aG as wt,j as k,S as se,aH as xt,aI as It,aJ as Bt,s as O,aK as ue,aa as Vt,K as De,ap as He,aL as Pt,aM as ke,V as ce,Y as Et,aN as Lt,aO as we,Q as ie,R as Me,aq as Tt,a4 as $t,U as Rt}from"./index-5066347d.js";import{m as D,a as K,u as R}from"./VContainer-be2d34ae.js";const We=["top","bottom"],zt=["start","end","left","right"];function Nt(e,t){let[a,n]=e.split(" ");return n||(n=Q(We,a)?"start":Q(zt,a)?"top":"center"),{side:xe(a,t),align:xe(n,t)}}function xe(e,t){return e==="start"?t?"right":"left":e==="end"?t?"left":"right":e}function Bn(e){return{side:{center:"center",top:"bottom",bottom:"top",left:"right",right:"left"}[e.side],align:e.align}}function Vn(e){return{side:e.side,align:{center:"center",top:"bottom",bottom:"top",left:"right",right:"left"}[e.align]}}function Pn(e){return{side:e.align,align:e.side}}function En(e){return Q(We,e.side)?"y":"x"}function Ot(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"content";const a=W(),n=W();if(Te){const s=new ResizeObserver(i=>{e==null||e(i,s),i.length&&(t==="content"?n.value=i[0].contentRect:n.value=i[0].target.getBoundingClientRect())});F(()=>{s.disconnect()}),$(a,(i,l)=>{l&&(s.unobserve(Se(l)),n.value=void 0),i&&s.observe(Se(i))},{flush:"post"})}return{resizeRef:a,contentRect:mt(n)}}const Ge=S({border:[Boolean,Number,String]},"border");function je(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:A();return{borderClasses:d(()=>{const n=U(e)?e.value:e.border,s=[];if(n===!0||n==="")s.push(`${t}--border`);else if(typeof n=="string"||n===0)for(const i of String(n).split(" "))s.push(`border-${i}`);return s})}}const At=[null,"default","comfortable","compact"],Fe=S({density:{type:String,default:"default",validator:e=>At.includes(e)}},"density");function Ue(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:A();return{densityClasses:d(()=>`${t}--density-${e.density}`)}}const qe=S({elevation:{type:[Number,String],validator(e){const t=parseInt(e);return!isNaN(t)&&t>=0&&t<=24}}},"elevation");function Xe(e){return{elevationClasses:d(()=>{const a=U(e)?e.value:e.elevation,n=[];return a==null||n.push(`elevation-${a}`),n})}}const de=S({rounded:{type:[Boolean,Number,String],default:void 0}},"rounded");function ve(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:A();return{roundedClasses:d(()=>{const n=U(e)?e.value:e.rounded,s=[];if(n===!0||n==="")s.push(`${t}--rounded`);else if(typeof n=="string"||n===0)for(const i of String(n).split(" "))s.push(`rounded-${i}`);return s})}}function fe(e){return $e(()=>{const t=[],a={};if(e.value.background)if(_e(e.value.background)){if(a.backgroundColor=e.value.background,!e.value.text&&gt(e.value.background)){const n=ht(e.value.background);if(n.a==null||n.a===1){const s=yt(n);a.color=s,a.caretColor=s}}}else t.push(`bg-${e.value.background}`);return e.value.text&&(_e(e.value.text)?(a.color=e.value.text,a.caretColor=e.value.text):t.push(`text-${e.value.text}`)),{colorClasses:t,colorStyles:a}})}function Z(e,t){const a=d(()=>({text:U(e)?e.value:t?e[t]:null})),{colorClasses:n,colorStyles:s}=fe(a);return{textColorClasses:n,textColorStyles:s}}function Ie(e,t){const a=d(()=>({background:U(e)?e.value:t?e[t]:null})),{colorClasses:n,colorStyles:s}=fe(a);return{backgroundColorClasses:n,backgroundColorStyles:s}}const Dt=["elevated","flat","tonal","outlined","text","plain"];function Ht(e,t){return o(Re,null,[e&&o("span",{key:"overlay",class:`${t}__overlay`},null),o("span",{key:"underlay",class:`${t}__underlay`},null)])}const Ye=S({color:String,variant:{type:String,default:"elevated",validator:e=>Dt.includes(e)}},"variant");function Mt(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:A();const a=d(()=>{const{variant:i}=pe(e);return`${t}--variant-${i}`}),{colorClasses:n,colorStyles:s}=fe(d(()=>{const{variant:i,color:l}=pe(e);return{[["elevated","flat"].includes(i)?"background":"text"]:l}}));return{colorClasses:n,colorStyles:s,variantClasses:a}}const Ke=S({divided:Boolean,...Ge(),...D(),...Fe(),...qe(),...de(),...K(),...q(),...Ye()},"VBtnGroup"),Be=T()({name:"VBtnGroup",props:Ke(),setup(e,t){let{slots:a}=t;const{themeClasses:n}=X(e),{densityClasses:s}=Ue(e),{borderClasses:i}=je(e),{elevationClasses:l}=Xe(e),{roundedClasses:r}=ve(e);ze({VBtn:{height:"auto",color:L(e,"color"),density:L(e,"density"),flat:!0,variant:L(e,"variant")}}),R(()=>o(e.tag,{class:["v-btn-group",{"v-btn-group--divided":e.divided},n.value,i.value,s.value,l.value,r.value,e.class],style:e.style},a))}}),Wt=S({modelValue:{type:null,default:void 0},multiple:Boolean,mandatory:[Boolean,String],max:Number,selectedClass:String,disabled:Boolean},"group"),Gt=S({value:null,disabled:Boolean,selectedClass:String},"group-item");function jt(e,t){let a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0;const n=Y("useGroupItem");if(!n)throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");const s=bt();Ne(Symbol.for(`${t.description}:id`),s);const i=Ct(t,null);if(!i){if(!a)return i;throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${t.description}`)}const l=L(e,"value"),r=d(()=>!!(i.disabled.value||e.disabled));i.register({id:s,value:l,disabled:r},n),F(()=>{i.unregister(s)});const u=d(()=>i.isSelected(s)),h=d(()=>u.value&&[i.selectedClass.value,e.selectedClass]);return $(u,m=>{n.emit("group:selected",{value:m})}),{id:s,isSelected:u,toggle:()=>i.select(s,!u.value),select:m=>i.select(s,m),selectedClass:h,value:l,disabled:r,group:i}}function Ft(e,t){let a=!1;const n=St([]),s=Oe(e,"modelValue",[],c=>c==null?[]:Je(n,pt(c)),c=>{const f=qt(n,c);return e.multiple?f:f[0]}),i=Y("useGroup");function l(c,f){const _=c,y=Symbol.for(`${t.description}:id`),C=kt(y,i==null?void 0:i.vnode).indexOf(f);C>-1?n.splice(C,0,_):n.push(_)}function r(c){if(a)return;u();const f=n.findIndex(_=>_.id===c);n.splice(f,1)}function u(){const c=n.find(f=>!f.disabled);c&&e.mandatory==="force"&&!s.value.length&&(s.value=[c.id])}_t(()=>{u()}),F(()=>{a=!0});function h(c,f){const _=n.find(y=>y.id===c);if(!(f&&(_!=null&&_.disabled)))if(e.multiple){const y=s.value.slice(),x=y.findIndex(g=>g===c),C=~x;if(f=f??!C,C&&e.mandatory&&y.length<=1||!C&&e.max!=null&&y.length+1>e.max)return;x<0&&f?y.push(c):x>=0&&!f&&y.splice(x,1),s.value=y}else{const y=s.value.includes(c);if(e.mandatory&&y)return;s.value=f??!y?[c]:[]}}function m(c){if(e.multiple,s.value.length){const f=s.value[0],_=n.findIndex(C=>C.id===f);let y=(_+c)%n.length,x=n[y];for(;x.disabled&&y!==_;)y=(y+c)%n.length,x=n[y];if(x.disabled)return;s.value=[n[y].id]}else{const f=n.find(_=>!_.disabled);f&&(s.value=[f.id])}}const b={register:l,unregister:r,selected:s,select:h,disabled:L(e,"disabled"),prev:()=>m(n.length-1),next:()=>m(1),isSelected:c=>s.value.includes(c),selectedClass:d(()=>e.selectedClass),items:d(()=>n),getItemIndex:c=>Ut(n,c)};return Ne(t,b),b}function Ut(e,t){const a=Je(e,[t]);return a.length?e.findIndex(n=>n.id===a[0]):-1}function Je(e,t){const a=[];return t.forEach(n=>{const s=e.find(l=>Ae(n,l.value)),i=e[n];(s==null?void 0:s.value)!=null?a.push(s.id):i!=null&&a.push(i.id)}),a}function qt(e,t){const a=[];return t.forEach(n=>{const s=e.findIndex(i=>i.id===n);if(~s){const i=e[s];a.push(i.value!=null?i.value:s)}}),a}const Qe=Symbol.for("vuetify:v-btn-toggle"),Xt=S({...Ke(),...Wt()},"VBtnToggle");T()({name:"VBtnToggle",props:Xt(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:a}=t;const{isSelected:n,next:s,prev:i,select:l,selected:r}=Ft(e,Qe);return R(()=>{const u=Be.filterProps(e);return o(Be,oe({class:["v-btn-toggle",e.class]},u,{style:e.style}),{default:()=>{var h;return[(h=a.default)==null?void 0:h.call(a,{isSelected:n,next:s,prev:i,select:l,selected:r})]}})}),{next:s,prev:i,select:l}}});const Yt=S({defaults:Object,disabled:Boolean,reset:[Number,String],root:[Boolean,String],scoped:Boolean},"VDefaultsProvider"),te=T(!1)({name:"VDefaultsProvider",props:Yt(),setup(e,t){let{slots:a}=t;const{defaults:n,disabled:s,reset:i,root:l,scoped:r}=wt(e);return ze(n,{reset:i,root:l,scoped:r,disabled:s}),()=>{var u;return(u=a.default)==null?void 0:u.call(a)}}});const Kt=["x-small","small","default","large","x-large"],me=S({size:{type:[String,Number],default:"default"}},"size");function ge(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:A();return $e(()=>{let a,n;return Q(Kt,e.size)?a=`${t}--size-${e.size}`:e.size&&(n={width:k(e.size),height:k(e.size)}),{sizeClasses:a,sizeStyles:n}})}const Jt=S({color:String,start:Boolean,end:Boolean,icon:se,...D(),...me(),...K({tag:"i"}),...q()},"VIcon"),ne=T()({name:"VIcon",props:Jt(),setup(e,t){let{attrs:a,slots:n}=t;const s=W(),{themeClasses:i}=X(e),{iconData:l}=xt(d(()=>s.value||e.icon)),{sizeClasses:r}=ge(e),{textColorClasses:u,textColorStyles:h}=Z(L(e,"color"));return R(()=>{var b,c;const m=(b=n.default)==null?void 0:b.call(n);return m&&(s.value=(c=It(m).filter(f=>f.type===Bt&&f.children&&typeof f.children=="string")[0])==null?void 0:c.children),o(l.value.component,{tag:e.tag,icon:l.value.icon,class:["v-icon","notranslate",i.value,r.value,u.value,{"v-icon--clickable":!!a.onClick,"v-icon--start":e.start,"v-icon--end":e.end},e.class],style:[r.value?void 0:{fontSize:k(e.size),height:k(e.size),width:k(e.size)},h.value,e.style],role:a.onClick?"button":void 0,"aria-hidden":!a.onClick},{default:()=>[m]})}),{}}});function Ze(e,t){const a=W(),n=O(!1);if(ue){const s=new IntersectionObserver(i=>{e==null||e(i,s),n.value=!!i.find(l=>l.isIntersecting)},t);F(()=>{s.disconnect()}),$(a,(i,l)=>{l&&(s.unobserve(l),n.value=!1),i&&s.observe(i)},{flush:"post"})}return{intersectionRef:a,isIntersecting:n}}const Qt=S({bgColor:String,color:String,indeterminate:[Boolean,String],modelValue:{type:[Number,String],default:0},rotate:{type:[Number,String],default:0},width:{type:[Number,String],default:4},...D(),...me(),...K({tag:"div"}),...q()},"VProgressCircular"),Zt=T()({name:"VProgressCircular",props:Qt(),setup(e,t){let{slots:a}=t;const n=20,s=2*Math.PI*n,i=W(),{themeClasses:l}=X(e),{sizeClasses:r,sizeStyles:u}=ge(e),{textColorClasses:h,textColorStyles:m}=Z(L(e,"color")),{textColorClasses:b,textColorStyles:c}=Z(L(e,"bgColor")),{intersectionRef:f,isIntersecting:_}=Ze(),{resizeRef:y,contentRect:x}=Ot(),C=d(()=>Math.max(0,Math.min(100,parseFloat(e.modelValue)))),g=d(()=>Number(e.width)),w=d(()=>u.value?Number(e.size):x.value?x.value.width:Math.max(g.value,32)),P=d(()=>n/(1-g.value/w.value)*2),I=d(()=>g.value/w.value*P.value),z=d(()=>k((100-C.value)/100*s));return Vt(()=>{f.value=i.value,y.value=i.value}),R(()=>o(e.tag,{ref:i,class:["v-progress-circular",{"v-progress-circular--indeterminate":!!e.indeterminate,"v-progress-circular--visible":_.value,"v-progress-circular--disable-shrink":e.indeterminate==="disable-shrink"},l.value,r.value,h.value,e.class],style:[u.value,m.value,e.style],role:"progressbar","aria-valuemin":"0","aria-valuemax":"100","aria-valuenow":e.indeterminate?void 0:C.value},{default:()=>[o("svg",{style:{transform:`rotate(calc(-90deg + ${Number(e.rotate)}deg))`},xmlns:"http://www.w3.org/2000/svg",viewBox:`0 0 ${P.value} ${P.value}`},[o("circle",{class:["v-progress-circular__underlay",b.value],style:c.value,fill:"transparent",cx:"50%",cy:"50%",r:n,"stroke-width":I.value,"stroke-dasharray":s,"stroke-dashoffset":0},null),o("circle",{class:"v-progress-circular__overlay",fill:"transparent",cx:"50%",cy:"50%",r:n,"stroke-width":I.value,"stroke-dasharray":s,"stroke-dashoffset":z.value},null)]),a.default&&o("div",{class:"v-progress-circular__content"},[a.default({value:C.value})])]})),{}}}),et=S({height:[Number,String],maxHeight:[Number,String],maxWidth:[Number,String],minHeight:[Number,String],minWidth:[Number,String],width:[Number,String]},"dimension");function tt(e){return{dimensionStyles:d(()=>({height:k(e.height),maxHeight:k(e.maxHeight),maxWidth:k(e.maxWidth),minHeight:k(e.minHeight),minWidth:k(e.minWidth),width:k(e.width)}))}}const Ve={center:"center",top:"bottom",bottom:"top",left:"right",right:"left"},nt=S({location:String},"location");function at(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,a=arguments.length>2?arguments[2]:void 0;const{isRtl:n}=De();return{locationStyles:d(()=>{if(!e.location)return{};const{side:i,align:l}=Nt(e.location.split(" ").length>1?e.location:`${e.location} center`,n.value);function r(h){return a?a(h):0}const u={};return i!=="center"&&(t?u[Ve[i]]=`calc(100% - ${r(i)}px)`:u[i]=0),l!=="center"?t?u[Ve[l]]=`calc(100% - ${r(l)}px)`:u[l]=0:(i==="center"?u.top=u.left="50%":u[{top:"left",bottom:"left",left:"top",right:"top"}[i]]="50%",u.transform={top:"translateX(-50%)",bottom:"translateX(-50%)",left:"translateY(-50%)",right:"translateY(-50%)",center:"translate(-50%, -50%)"}[i]),u})}}const en=S({absolute:Boolean,active:{type:Boolean,default:!0},bgColor:String,bgOpacity:[Number,String],bufferValue:{type:[Number,String],default:0},clickable:Boolean,color:String,height:{type:[Number,String],default:4},indeterminate:Boolean,max:{type:[Number,String],default:100},modelValue:{type:[Number,String],default:0},reverse:Boolean,stream:Boolean,striped:Boolean,roundedBar:Boolean,...D(),...nt({location:"top"}),...de(),...K(),...q()},"VProgressLinear"),tn=T()({name:"VProgressLinear",props:en(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:a}=t;const n=Oe(e,"modelValue"),{isRtl:s,rtlClasses:i}=De(),{themeClasses:l}=X(e),{locationStyles:r}=at(e),{textColorClasses:u,textColorStyles:h}=Z(e,"color"),{backgroundColorClasses:m,backgroundColorStyles:b}=Ie(d(()=>e.bgColor||e.color)),{backgroundColorClasses:c,backgroundColorStyles:f}=Ie(e,"color"),{roundedClasses:_}=ve(e),{intersectionRef:y,isIntersecting:x}=Ze(),C=d(()=>parseInt(e.max,10)),g=d(()=>parseInt(e.height,10)),w=d(()=>parseFloat(e.bufferValue)/C.value*100),P=d(()=>parseFloat(n.value)/C.value*100),I=d(()=>s.value!==e.reverse),z=d(()=>e.indeterminate?"fade-transition":"slide-x-transition"),H=d(()=>e.bgOpacity==null?e.bgOpacity:parseFloat(e.bgOpacity));function M(v){if(!y.value)return;const{left:p,right:V,width:E}=y.value.getBoundingClientRect(),N=I.value?E-v.clientX+(V-E):v.clientX-p;n.value=Math.round(N/E*C.value)}return R(()=>o(e.tag,{ref:y,class:["v-progress-linear",{"v-progress-linear--absolute":e.absolute,"v-progress-linear--active":e.active&&x.value,"v-progress-linear--reverse":I.value,"v-progress-linear--rounded":e.rounded,"v-progress-linear--rounded-bar":e.roundedBar,"v-progress-linear--striped":e.striped},_.value,l.value,i.value,e.class],style:[{bottom:e.location==="bottom"?0:void 0,top:e.location==="top"?0:void 0,height:e.active?k(g.value):0,"--v-progress-linear-height":k(g.value),...r.value},e.style],role:"progressbar","aria-hidden":e.active?"false":"true","aria-valuemin":"0","aria-valuemax":e.max,"aria-valuenow":e.indeterminate?void 0:P.value,onClick:e.clickable&&M},{default:()=>[e.stream&&o("div",{key:"stream",class:["v-progress-linear__stream",u.value],style:{...h.value,[I.value?"left":"right"]:k(-g.value),borderTop:`${k(g.value/2)} dotted`,opacity:H.value,top:`calc(50% - ${k(g.value/4)})`,width:k(100-w.value,"%"),"--v-progress-linear-stream-to":k(g.value*(I.value?1:-1))}},null),o("div",{class:["v-progress-linear__background",m.value],style:[b.value,{opacity:H.value,width:k(e.stream?w.value:100,"%")}]},null),o(He,{name:z.value},{default:()=>[e.indeterminate?o("div",{class:"v-progress-linear__indeterminate"},[["long","short"].map(v=>o("div",{key:v,class:["v-progress-linear__indeterminate",v,c.value],style:f.value},null))]):o("div",{class:["v-progress-linear__determinate",c.value],style:[f.value,{width:k(P.value,"%")}]},null)]}),a.default&&o("div",{class:"v-progress-linear__content"},[a.default({value:P.value,buffer:w.value})])]})),{}}}),nn=S({loading:[Boolean,String]},"loader");function an(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:A();return{loaderClasses:d(()=>({[`${t}--loading`]:e.loading}))}}function Ln(e,t){var n;let{slots:a}=t;return o("div",{class:`${e.name}__loader`},[((n=a.default)==null?void 0:n.call(a,{color:e.color,isActive:e.active}))||o(tn,{absolute:e.absolute,active:e.active,color:e.color,height:"2",indeterminate:!0},null)])}const sn=["static","relative","fixed","absolute","sticky"],ln=S({position:{type:String,validator:e=>sn.includes(e)}},"position");function rn(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:A();return{positionClasses:d(()=>e.position?`${t}--${e.position}`:void 0)}}function on(){const e=Y("useRoute");return d(()=>{var t;return(t=e==null?void 0:e.proxy)==null?void 0:t.$route})}function Tn(){var e,t;return(t=(e=Y("useRouter"))==null?void 0:e.proxy)==null?void 0:t.$router}function un(e,t){const a=Pt("RouterLink"),n=d(()=>!!(e.href||e.to)),s=d(()=>(n==null?void 0:n.value)||ke(t,"click")||ke(e,"click"));if(typeof a=="string")return{isLink:n,isClickable:s,href:L(e,"href")};const i=e.to?a.useLink(e):void 0,l=on();return{isLink:n,isClickable:s,route:i==null?void 0:i.route,navigate:i==null?void 0:i.navigate,isActive:i&&d(()=>{var r,u,h;return e.exact?l.value?((h=i.isExactActive)==null?void 0:h.value)&&Ae(i.route.value.query,l.value.query):(u=i.isExactActive)==null?void 0:u.value:(r=i.isActive)==null?void 0:r.value}),href:d(()=>e.to?i==null?void 0:i.route.value.href:e.href)}}const cn=S({href:String,replace:Boolean,to:[String,Object],exact:Boolean},"router");let ae=!1;function $n(e,t){let a=!1,n,s;Te&&(ce(()=>{window.addEventListener("popstate",i),n=e==null?void 0:e.beforeEach((l,r,u)=>{ae?a?t(u):u():setTimeout(()=>a?t(u):u()),ae=!0}),s=e==null?void 0:e.afterEach(()=>{ae=!1})}),Et(()=>{window.removeEventListener("popstate",i),n==null||n(),s==null||s()}));function i(l){var r;(r=l.state)!=null&&r.replaced||(a=!0,setTimeout(()=>a=!1))}}function dn(e,t){$(()=>{var a;return(a=e.isActive)==null?void 0:a.value},a=>{e.isLink.value&&a&&t&&ce(()=>{t(!0)})},{immediate:!0})}const le=Symbol("rippleStop"),vn=80;function Pe(e,t){e.style.transform=t,e.style.webkitTransform=t}function re(e){return e.constructor.name==="TouchEvent"}function st(e){return e.constructor.name==="KeyboardEvent"}const fn=function(e,t){var b;let a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},n=0,s=0;if(!st(e)){const c=t.getBoundingClientRect(),f=re(e)?e.touches[e.touches.length-1]:e;n=f.clientX-c.left,s=f.clientY-c.top}let i=0,l=.3;(b=t._ripple)!=null&&b.circle?(l=.15,i=t.clientWidth/2,i=a.center?i:i+Math.sqrt((n-i)**2+(s-i)**2)/4):i=Math.sqrt(t.clientWidth**2+t.clientHeight**2)/2;const r=`${(t.clientWidth-i*2)/2}px`,u=`${(t.clientHeight-i*2)/2}px`,h=a.center?r:`${n-i}px`,m=a.center?u:`${s-i}px`;return{radius:i,scale:l,x:h,y:m,centerX:r,centerY:u}},ee={show(e,t){var f;let a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(!((f=t==null?void 0:t._ripple)!=null&&f.enabled))return;const n=document.createElement("span"),s=document.createElement("span");n.appendChild(s),n.className="v-ripple__container",a.class&&(n.className+=` ${a.class}`);const{radius:i,scale:l,x:r,y:u,centerX:h,centerY:m}=fn(e,t,a),b=`${i*2}px`;s.className="v-ripple__animation",s.style.width=b,s.style.height=b,t.appendChild(n);const c=window.getComputedStyle(t);c&&c.position==="static"&&(t.style.position="relative",t.dataset.previousPosition="static"),s.classList.add("v-ripple__animation--enter"),s.classList.add("v-ripple__animation--visible"),Pe(s,`translate(${r}, ${u}) scale3d(${l},${l},${l})`),s.dataset.activated=String(performance.now()),setTimeout(()=>{s.classList.remove("v-ripple__animation--enter"),s.classList.add("v-ripple__animation--in"),Pe(s,`translate(${h}, ${m}) scale3d(1,1,1)`)},0)},hide(e){var i;if(!((i=e==null?void 0:e._ripple)!=null&&i.enabled))return;const t=e.getElementsByClassName("v-ripple__animation");if(t.length===0)return;const a=t[t.length-1];if(a.dataset.isHiding)return;a.dataset.isHiding="true";const n=performance.now()-Number(a.dataset.activated),s=Math.max(250-n,0);setTimeout(()=>{a.classList.remove("v-ripple__animation--in"),a.classList.add("v-ripple__animation--out"),setTimeout(()=>{var r;e.getElementsByClassName("v-ripple__animation").length===1&&e.dataset.previousPosition&&(e.style.position=e.dataset.previousPosition,delete e.dataset.previousPosition),((r=a.parentNode)==null?void 0:r.parentNode)===e&&e.removeChild(a.parentNode)},300)},s)}};function it(e){return typeof e>"u"||!!e}function G(e){const t={},a=e.currentTarget;if(!(!(a!=null&&a._ripple)||a._ripple.touched||e[le])){if(e[le]=!0,re(e))a._ripple.touched=!0,a._ripple.isTouch=!0;else if(a._ripple.isTouch)return;if(t.center=a._ripple.centered||st(e),a._ripple.class&&(t.class=a._ripple.class),re(e)){if(a._ripple.showTimerCommit)return;a._ripple.showTimerCommit=()=>{ee.show(e,a,t)},a._ripple.showTimer=window.setTimeout(()=>{var n;(n=a==null?void 0:a._ripple)!=null&&n.showTimerCommit&&(a._ripple.showTimerCommit(),a._ripple.showTimerCommit=null)},vn)}else ee.show(e,a,t)}}function Ee(e){e[le]=!0}function B(e){const t=e.currentTarget;if(t!=null&&t._ripple){if(window.clearTimeout(t._ripple.showTimer),e.type==="touchend"&&t._ripple.showTimerCommit){t._ripple.showTimerCommit(),t._ripple.showTimerCommit=null,t._ripple.showTimer=window.setTimeout(()=>{B(e)});return}window.setTimeout(()=>{t._ripple&&(t._ripple.touched=!1)}),ee.hide(t)}}function lt(e){const t=e.currentTarget;t!=null&&t._ripple&&(t._ripple.showTimerCommit&&(t._ripple.showTimerCommit=null),window.clearTimeout(t._ripple.showTimer))}let j=!1;function rt(e){!j&&(e.keyCode===we.enter||e.keyCode===we.space)&&(j=!0,G(e))}function ot(e){j=!1,B(e)}function ut(e){j&&(j=!1,B(e))}function ct(e,t,a){const{value:n,modifiers:s}=t,i=it(n);if(i||ee.hide(e),e._ripple=e._ripple??{},e._ripple.enabled=i,e._ripple.centered=s.center,e._ripple.circle=s.circle,Lt(n)&&n.class&&(e._ripple.class=n.class),i&&!a){if(s.stop){e.addEventListener("touchstart",Ee,{passive:!0}),e.addEventListener("mousedown",Ee);return}e.addEventListener("touchstart",G,{passive:!0}),e.addEventListener("touchend",B,{passive:!0}),e.addEventListener("touchmove",lt,{passive:!0}),e.addEventListener("touchcancel",B),e.addEventListener("mousedown",G),e.addEventListener("mouseup",B),e.addEventListener("mouseleave",B),e.addEventListener("keydown",rt),e.addEventListener("keyup",ot),e.addEventListener("blur",ut),e.addEventListener("dragstart",B,{passive:!0})}else!i&&a&&dt(e)}function dt(e){e.removeEventListener("mousedown",G),e.removeEventListener("touchstart",G),e.removeEventListener("touchend",B),e.removeEventListener("touchmove",lt),e.removeEventListener("touchcancel",B),e.removeEventListener("mouseup",B),e.removeEventListener("mouseleave",B),e.removeEventListener("keydown",rt),e.removeEventListener("keyup",ot),e.removeEventListener("dragstart",B),e.removeEventListener("blur",ut)}function mn(e,t){ct(e,t,!1)}function gn(e){delete e._ripple,dt(e)}function hn(e,t){if(t.value===t.oldValue)return;const a=it(t.oldValue);ct(e,t,a)}const yn={mounted:mn,unmounted:gn,updated:hn},bn=S({active:{type:Boolean,default:void 0},symbol:{type:null,default:Qe},flat:Boolean,icon:[Boolean,String,Function,Object],prependIcon:se,appendIcon:se,block:Boolean,slim:Boolean,stacked:Boolean,ripple:{type:[Boolean,Object],default:!0},text:String,...Ge(),...D(),...Fe(),...et(),...qe(),...Gt(),...nn(),...nt(),...ln(),...de(),...cn(),...me(),...K({tag:"button"}),...q(),...Ye({variant:"elevated"})},"VBtn"),Rn=T()({name:"VBtn",directives:{Ripple:yn},props:bn(),emits:{"group:selected":e=>!0},setup(e,t){let{attrs:a,slots:n}=t;const{themeClasses:s}=X(e),{borderClasses:i}=je(e),{colorClasses:l,colorStyles:r,variantClasses:u}=Mt(e),{densityClasses:h}=Ue(e),{dimensionStyles:m}=tt(e),{elevationClasses:b}=Xe(e),{loaderClasses:c}=an(e),{locationStyles:f}=at(e),{positionClasses:_}=rn(e),{roundedClasses:y}=ve(e),{sizeClasses:x,sizeStyles:C}=ge(e),g=jt(e,e.symbol,!1),w=un(e,a),P=d(()=>{var v;return e.active!==void 0?e.active:w.isLink.value?(v=w.isActive)==null?void 0:v.value:g==null?void 0:g.isSelected.value}),I=d(()=>(g==null?void 0:g.disabled.value)||e.disabled),z=d(()=>e.variant==="elevated"&&!(e.disabled||e.flat||e.border)),H=d(()=>{if(!(e.value===void 0||typeof e.value=="symbol"))return Object(e.value)===e.value?JSON.stringify(e.value,null,0):e.value});function M(v){var p;I.value||w.isLink.value&&(v.metaKey||v.ctrlKey||v.shiftKey||v.button!==0||a.target==="_blank")||((p=w.navigate)==null||p.call(w,v),g==null||g.toggle())}return dn(w,g==null?void 0:g.select),R(()=>{var he,ye;const v=w.isLink.value?"a":e.tag,p=!!(e.prependIcon||n.prepend),V=!!(e.appendIcon||n.append),E=!!(e.icon&&e.icon!==!0),N=(g==null?void 0:g.isSelected.value)&&(!w.isLink.value||((he=w.isActive)==null?void 0:he.value))||!g||((ye=w.isActive)==null?void 0:ye.value);return ie(o(v,{type:v==="a"?void 0:"button",class:["v-btn",g==null?void 0:g.selectedClass.value,{"v-btn--active":P.value,"v-btn--block":e.block,"v-btn--disabled":I.value,"v-btn--elevated":z.value,"v-btn--flat":e.flat,"v-btn--icon":!!e.icon,"v-btn--loading":e.loading,"v-btn--slim":e.slim,"v-btn--stacked":e.stacked},s.value,i.value,N?l.value:void 0,h.value,b.value,c.value,_.value,y.value,x.value,u.value,e.class],style:[N?r.value:void 0,m.value,f.value,C.value,e.style],disabled:I.value||void 0,href:w.href.value,onClick:M,value:H.value},{default:()=>{var be;return[Ht(!0,"v-btn"),!e.icon&&p&&o("span",{key:"prepend",class:"v-btn__prepend"},[n.prepend?o(te,{key:"prepend-defaults",disabled:!e.prependIcon,defaults:{VIcon:{icon:e.prependIcon}}},n.prepend):o(ne,{key:"prepend-icon",icon:e.prependIcon},null)]),o("span",{class:"v-btn__content","data-no-activator":""},[!n.default&&E?o(ne,{key:"content-icon",icon:e.icon},null):o(te,{key:"content-defaults",disabled:!E,defaults:{VIcon:{icon:e.icon}}},{default:()=>{var Ce;return[((Ce=n.default)==null?void 0:Ce.call(n))??e.text]}})]),!e.icon&&V&&o("span",{key:"append",class:"v-btn__append"},[n.append?o(te,{key:"append-defaults",disabled:!e.appendIcon,defaults:{VIcon:{icon:e.appendIcon}}},n.append):o(ne,{key:"append-icon",icon:e.appendIcon},null)]),!!e.loading&&o("span",{key:"loader",class:"v-btn__loader"},[((be=n.loader)==null?void 0:be.call(n))??o(Zt,{color:typeof e.loading=="boolean"?void 0:e.loading,indeterminate:!0,size:"23",width:"2"},null)])]}}),[[Me("ripple"),!I.value&&e.ripple,null]])}),{}}}),Cn=S({transition:{type:[Boolean,String,Object],default:"fade-transition",validator:e=>e!==!0}},"transition"),J=(e,t)=>{let{slots:a}=t;const{transition:n,disabled:s,...i}=e,{component:l=He,...r}=typeof n=="object"?n:{};return Tt(l,oe(typeof n=="string"?{name:s?"":n}:r,i,{disabled:s}),a)};function Sn(e){return{aspectStyles:d(()=>{const t=Number(e.aspectRatio);return t?{paddingBottom:String(1/t*100)+"%"}:void 0})}}const vt=S({aspectRatio:[String,Number],contentClass:String,inline:Boolean,...D(),...et()},"VResponsive"),Le=T()({name:"VResponsive",props:vt(),setup(e,t){let{slots:a}=t;const{aspectStyles:n}=Sn(e),{dimensionStyles:s}=tt(e);return R(()=>{var i;return o("div",{class:["v-responsive",{"v-responsive--inline":e.inline},e.class],style:[s.value,e.style]},[o("div",{class:"v-responsive__sizer",style:n.value},null),(i=a.additional)==null?void 0:i.call(a),a.default&&o("div",{class:["v-responsive__content",e.contentClass]},[a.default()])])}),{}}});function _n(e,t){if(!ue)return;const a=t.modifiers||{},n=t.value,{handler:s,options:i}=typeof n=="object"?n:{handler:n,options:{}},l=new IntersectionObserver(function(){var b;let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],u=arguments.length>1?arguments[1]:void 0;const h=(b=e._observe)==null?void 0:b[t.instance.$.uid];if(!h)return;const m=r.some(c=>c.isIntersecting);s&&(!a.quiet||h.init)&&(!a.once||m||h.init)&&s(m,r,u),m&&a.once?ft(e,t):h.init=!0},i);e._observe=Object(e._observe),e._observe[t.instance.$.uid]={init:!1,observer:l},l.observe(e)}function ft(e,t){var n;const a=(n=e._observe)==null?void 0:n[t.instance.$.uid];a&&(a.observer.unobserve(e),delete e._observe[t.instance.$.uid])}const pn={mounted:_n,unmounted:ft},kn=pn,wn=S({alt:String,cover:Boolean,draggable:{type:[Boolean,String],default:void 0},eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},sizes:String,src:{type:[String,Object],default:""},crossorigin:String,referrerpolicy:String,srcset:String,position:String,...vt(),...D(),...Cn()},"VImg"),zn=T()({name:"VImg",directives:{intersect:kn},props:wn(),emits:{loadstart:e=>!0,load:e=>!0,error:e=>!0},setup(e,t){let{emit:a,slots:n}=t;const s=Y("VImg"),i=O(""),l=W(),r=O(e.eager?"loading":"idle"),u=O(),h=O(),m=d(()=>e.src&&typeof e.src=="object"?{src:e.src.src,srcset:e.srcset||e.src.srcset,lazySrc:e.lazySrc||e.src.lazySrc,aspect:Number(e.aspectRatio||e.src.aspect||0)}:{src:e.src,srcset:e.srcset,lazySrc:e.lazySrc,aspect:Number(e.aspectRatio||0)}),b=d(()=>m.value.aspect||u.value/h.value||0);$(()=>e.src,()=>{c(r.value!=="idle")}),$(b,(v,p)=>{!v&&p&&l.value&&C(l.value)}),$t(()=>c());function c(v){if(!(e.eager&&v)&&!(ue&&!v&&!e.eager)){if(r.value="loading",m.value.lazySrc){const p=new Image;p.src=m.value.lazySrc,C(p,null)}m.value.src&&ce(()=>{var p;a("loadstart",((p=l.value)==null?void 0:p.currentSrc)||m.value.src),setTimeout(()=>{var V;if(!s.isUnmounted)if((V=l.value)!=null&&V.complete){if(l.value.naturalWidth||_(),r.value==="error")return;b.value||C(l.value,null),r.value==="loading"&&f()}else b.value||C(l.value),y()})})}}function f(){var v;s.isUnmounted||(y(),C(l.value),r.value="loaded",a("load",((v=l.value)==null?void 0:v.currentSrc)||m.value.src))}function _(){var v;s.isUnmounted||(r.value="error",a("error",((v=l.value)==null?void 0:v.currentSrc)||m.value.src))}function y(){const v=l.value;v&&(i.value=v.currentSrc||v.src)}let x=-1;F(()=>{clearTimeout(x)});function C(v){let p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:100;const V=()=>{if(clearTimeout(x),s.isUnmounted)return;const{naturalHeight:E,naturalWidth:N}=v;E||N?(u.value=N,h.value=E):!v.complete&&r.value==="loading"&&p!=null?x=window.setTimeout(V,p):(v.currentSrc.endsWith(".svg")||v.currentSrc.startsWith("data:image/svg+xml"))&&(u.value=1,h.value=1)};V()}const g=d(()=>({"v-img__img--cover":e.cover,"v-img__img--contain":!e.cover})),w=()=>{var V;if(!m.value.src||r.value==="idle")return null;const v=o("img",{class:["v-img__img",g.value],style:{objectPosition:e.position},src:m.value.src,srcset:m.value.srcset,alt:e.alt,crossorigin:e.crossorigin,referrerpolicy:e.referrerpolicy,draggable:e.draggable,sizes:e.sizes,ref:l,onLoad:f,onError:_},null),p=(V=n.sources)==null?void 0:V.call(n);return o(J,{transition:e.transition,appear:!0},{default:()=>[ie(p?o("picture",{class:"v-img__picture"},[p,v]):v,[[Rt,r.value==="loaded"]])]})},P=()=>o(J,{transition:e.transition},{default:()=>[m.value.lazySrc&&r.value!=="loaded"&&o("img",{class:["v-img__img","v-img__img--preload",g.value],style:{objectPosition:e.position},src:m.value.lazySrc,alt:e.alt,crossorigin:e.crossorigin,referrerpolicy:e.referrerpolicy,draggable:e.draggable},null)]}),I=()=>n.placeholder?o(J,{transition:e.transition,appear:!0},{default:()=>[(r.value==="loading"||r.value==="error"&&!n.error)&&o("div",{class:"v-img__placeholder"},[n.placeholder()])]}):null,z=()=>n.error?o(J,{transition:e.transition,appear:!0},{default:()=>[r.value==="error"&&o("div",{class:"v-img__error"},[n.error()])]}):null,H=()=>e.gradient?o("div",{class:"v-img__gradient",style:{backgroundImage:`linear-gradient(${e.gradient})`}},null):null,M=O(!1);{const v=$(b,p=>{p&&(requestAnimationFrame(()=>{requestAnimationFrame(()=>{M.value=!0})}),v())})}return R(()=>{const v=Le.filterProps(e);return ie(o(Le,oe({class:["v-img",{"v-img--booting":!M.value},e.class],style:[{width:k(e.width==="auto"?u.value:e.width)},e.style]},v,{aspectRatio:b.value,"aria-label":e.alt,role:e.alt?"img":void 0}),{additional:()=>o(Re,null,[o(w,null,null),o(P,null,null),o(H,null,null),o(I,null,null),o(z,null,null)]),default:n.default}),[[Me("intersect"),{handler:c,options:e.options},null,{once:!0}]])}),{currentSrc:i,image:l,state:r,naturalWidth:u,naturalHeight:h}}}),Nn=S({eager:Boolean},"lazy");function On(e,t){const a=O(!1),n=d(()=>a.value||e.eager||t.value);$(t,()=>a.value=!0);function s(){e.eager||(a.value=!1)}return{isBooted:a,hasContent:n,onAfterLeave:s}}export{Z as A,Cn as B,nn as C,an as D,cn as E,Ye as F,un as G,Mt as H,kn as I,Ht as J,Wt as K,Ln as L,J as M,me as N,ge as O,Nt as P,Bn as Q,yn as R,Vn as S,Pn as T,En as U,Rn as V,Tn as W,$n as X,ne as a,qe as b,de as c,Ie as d,je as e,Xe as f,ve as g,Ft as h,te as i,tn as j,Gt as k,Nn as l,Ge as m,jt as n,On as o,wn as p,zn as q,et as r,nt as s,ln as t,Ot as u,tt as v,at as w,rn as x,Fe as y,Ue as z};

import{g as Ae,h as Be,i as Re,e as ye}from"./VTextField-b15fd226.js";import{p as E,aa as oe,ag as De,I as Fe,J as Z,V as J,f as Ce,c as y,d as _e,ah as fe,ac as Oe,M as _,z as c,s as L,r as N,Z as Le,A as M,_ as Me,$ as Ee,F as Y,i as Ue,ai as ae,aj as ce,n as me,U as Se,Y as K,m as He,W as Ve,a2 as re,ak as $e,a3 as de,g as qe,al as Ne,b as ne,X as Ke,ae as ze,am as Ge,B as je}from"./index-bbbb7ae6.js";import{f as We}from"./forwardRefs-e658ad70.js";import{m as Xe,c as Ye,V as Je,a as be}from"./VList-56b7e13a.js";import{m as Ze}from"./index-d6d79046.js";import{g as Qe,b as el}from"./VOverlay-c2190ae6.js";import{V as ll}from"./VMenu-2293072d.js";import{m as ue,p as tl,u as Q,R as nl,V as ve,q as al,o as ol,g as ul,k as il,l as rl,n as sl}from"./_plugin-vue_export-helper-f10cdba6.js";import{u as ke}from"./VBtn-83152033.js";import{a as cl}from"./VAvatar-64cfbca3.js";import{V as dl}from"./VChip-90fc3bbb.js";const Ie=Symbol.for("vuetify:selection-control-group"),we=E({color:String,disabled:{type:Boolean,default:null},defaultsTarget:String,error:Boolean,id:String,inline:Boolean,falseIcon:oe,trueIcon:oe,ripple:{type:[Boolean,Object],default:!0},multiple:{type:Boolean,default:null},name:String,readonly:{type:Boolean,default:null},modelValue:null,type:String,valueComparator:{type:Function,default:De},...ue(),...tl(),...Fe()},"SelectionControlGroup"),vl=E({...we({defaultsTarget:"VSelectionControl"})},"VSelectionControlGroup");Z()({name:"VSelectionControlGroup",props:vl(),emits:{"update:modelValue":e=>!0},setup(e,r){let{slots:n}=r;const i=J(e,"modelValue"),o=Ce(),d=y(()=>e.id||`v-selection-control-group-${o}`),m=y(()=>e.name||d.value),a=new Set;return _e(Ie,{modelValue:i,forceUpdate:()=>{a.forEach(t=>t())},onForceUpdate:t=>{a.add(t),fe(()=>{a.delete(t)})}}),Oe({[e.defaultsTarget]:{color:_(e,"color"),disabled:_(e,"disabled"),density:_(e,"density"),error:_(e,"error"),inline:_(e,"inline"),modelValue:i,multiple:y(()=>!!e.multiple||e.multiple==null&&Array.isArray(i.value)),name:m,falseIcon:_(e,"falseIcon"),trueIcon:_(e,"trueIcon"),readonly:_(e,"readonly"),ripple:_(e,"ripple"),type:_(e,"type"),valueComparator:_(e,"valueComparator")}}),Q(()=>{var t;return c("div",{class:["v-selection-control-group",{"v-selection-control-group--inline":e.inline},e.class],style:e.style,role:e.type==="radio"?"radiogroup":void 0},[(t=n.default)==null?void 0:t.call(n)])}),{}}});const xe=E({label:String,baseColor:String,trueValue:null,falseValue:null,value:null,...ue(),...we()},"VSelectionControl");function fl(e){const r=Ue(Ie,void 0),{densityClasses:n}=al(e),i=J(e,"modelValue"),o=y(()=>e.trueValue!==void 0?e.trueValue:e.value!==void 0?e.value:!0),d=y(()=>e.falseValue!==void 0?e.falseValue:!1),m=y(()=>!!e.multiple||e.multiple==null&&Array.isArray(i.value)),a=y({get(){const p=r?r.modelValue.value:i.value;return m.value?ae(p).some(g=>e.valueComparator(g,o.value)):e.valueComparator(p,o.value)},set(p){if(e.readonly)return;const g=p?o.value:d.value;let S=g;m.value&&(S=p?[...ae(i.value),g]:ae(i.value).filter(f=>!e.valueComparator(f,o.value))),r?r.modelValue.value=S:i.value=S}}),{textColorClasses:t,textColorStyles:V}=ol(y(()=>{if(!(e.error||e.disabled))return a.value?e.color:e.baseColor})),{backgroundColorClasses:P,backgroundColorStyles:T}=ul(y(()=>a.value&&!e.error&&!e.disabled?e.color:e.baseColor)),v=y(()=>a.value?e.trueIcon:e.falseIcon);return{group:r,densityClasses:n,trueValue:o,falseValue:d,model:a,textColorClasses:t,textColorStyles:V,backgroundColorClasses:P,backgroundColorStyles:T,icon:v}}const pe=Z()({name:"VSelectionControl",directives:{Ripple:nl},inheritAttrs:!1,props:xe(),emits:{"update:modelValue":e=>!0},setup(e,r){let{attrs:n,slots:i}=r;const{group:o,densityClasses:d,icon:m,model:a,textColorClasses:t,textColorStyles:V,backgroundColorClasses:P,backgroundColorStyles:T,trueValue:v}=fl(e),p=Ce(),g=L(!1),S=L(!1),f=N(),x=y(()=>e.id||`input-${p}`),A=y(()=>!e.disabled&&!e.readonly);o==null||o.onForceUpdate(()=>{f.value&&(f.value.checked=a.value)});function q(b){A.value&&(g.value=!0,ce(b.target,":focus-visible")!==!1&&(S.value=!0))}function B(){g.value=!1,S.value=!1}function z(b){b.stopPropagation()}function ee(b){if(!A.value){f.value&&(f.value.checked=a.value);return}e.readonly&&o&&me(()=>o.forceUpdate()),a.value=b.target.checked}return Q(()=>{var H,j;const b=i.label?i.label({label:e.label,props:{for:x.value}}):e.label,[G,U]=Le(n),O=c("input",M({ref:f,checked:a.value,disabled:!!e.disabled,id:x.value,onBlur:B,onFocus:q,onInput:ee,"aria-disabled":!!e.disabled,"aria-label":e.label,type:e.type,value:v.value,name:e.name,"aria-checked":e.type==="checkbox"?a.value:void 0},U),null);return c("div",M({class:["v-selection-control",{"v-selection-control--dirty":a.value,"v-selection-control--disabled":e.disabled,"v-selection-control--error":e.error,"v-selection-control--focused":g.value,"v-selection-control--focus-visible":S.value,"v-selection-control--inline":e.inline},d.value,e.class]},G,{style:e.style}),[c("div",{class:["v-selection-control__wrapper",t.value],style:V.value},[(H=i.default)==null?void 0:H.call(i,{backgroundColorClasses:P,backgroundColorStyles:T}),Me(c("div",{class:["v-selection-control__input"]},[((j=i.input)==null?void 0:j.call(i,{model:a,textColorClasses:t,textColorStyles:V,backgroundColorClasses:P,backgroundColorStyles:T,inputNode:O,icon:m.value,props:{onFocus:q,onBlur:B,id:x.value}}))??c(Y,null,[m.value&&c(ve,{key:"icon",icon:m.value},null),O])]),[[Ee("ripple"),e.ripple&&[!e.disabled&&!e.readonly,null,["center","circle"]]]])]),b&&c(Ae,{for:x.value,onClick:z},{default:()=>[b]})])}),{isFocused:g,input:f}}}),ml=E({indeterminate:Boolean,indeterminateIcon:{type:oe,default:"$checkboxIndeterminate"},...xe({falseIcon:"$checkboxOff",trueIcon:"$checkboxOn"})},"VCheckboxBtn"),hl=Z()({name:"VCheckboxBtn",props:ml(),emits:{"update:modelValue":e=>!0,"update:indeterminate":e=>!0},setup(e,r){let{slots:n}=r;const i=J(e,"indeterminate"),o=J(e,"modelValue");function d(t){i.value&&(i.value=!1)}const m=y(()=>i.value?e.indeterminateIcon:e.falseIcon),a=y(()=>i.value?e.indeterminateIcon:e.trueIcon);return Q(()=>{const t=Se(pe.filterProps(e),["modelValue"]);return c(pe,M(t,{modelValue:o.value,"onUpdate:modelValue":[V=>o.value=V,d],class:["v-checkbox-btn",e.class],style:e.style,type:"checkbox",falseIcon:m.value,trueIcon:a.value,"aria-checked":i.value?"mixed":void 0}),n)}),{}}});const gl=E({renderless:Boolean,...ue()},"VVirtualScrollItem"),yl=Z()({name:"VVirtualScrollItem",inheritAttrs:!1,props:gl(),emits:{"update:height":e=>!0},setup(e,r){let{attrs:n,emit:i,slots:o}=r;const{resizeRef:d,contentRect:m}=ke(void 0,"border");K(()=>{var a;return(a=m.value)==null?void 0:a.height},a=>{a!=null&&i("update:height",a)}),Q(()=>{var a,t;return e.renderless?c(Y,null,[(a=o.default)==null?void 0:a.call(o,{itemRef:d})]):c("div",M({ref:d,class:["v-virtual-scroll__item",e.class],style:e.style},n),[(t=o.default)==null?void 0:t.call(o)])})}}),Vl=-1,bl=1,se=100,pl=E({itemHeight:{type:[Number,String],default:null},height:[Number,String]},"virtual");function Cl(e,r){const n=He(),i=L(0);Ve(()=>{i.value=parseFloat(e.itemHeight||0)});const o=L(0),d=L(Math.ceil((parseInt(e.height)||n.height.value)/(i.value||16))||1),m=L(0),a=L(0),t=N(),V=N();let P=0;const{resizeRef:T,contentRect:v}=ke();Ve(()=>{T.value=t.value});const p=y(()=>{var l;return t.value===document.documentElement?n.height.value:((l=v.value)==null?void 0:l.height)||parseInt(e.height)||0}),g=y(()=>!!(t.value&&V.value&&p.value&&i.value));let S=Array.from({length:r.value.length}),f=Array.from({length:r.value.length});const x=L(0);let A=-1;function q(l){return S[l]||i.value}const B=$e(()=>{const l=performance.now();f[0]=0;const s=r.value.length;for(let I=1;I<=s-1;I++)f[I]=(f[I-1]||0)+q(I-1);x.value=Math.max(x.value,performance.now()-l)},x),z=K(g,l=>{l&&(z(),P=V.value.offsetTop,B.immediate(),$(),~A&&me(()=>{de&&window.requestAnimationFrame(()=>{te(A),A=-1})}))});fe(()=>{B.clear()});function ee(l,s){const I=S[l],k=i.value;i.value=k?Math.min(i.value,s):s,(I!==s||k!==i.value)&&(S[l]=s,B())}function b(l){return l=re(l,0,r.value.length-1),f[l]||0}function G(l){return Sl(f,l)}let U=0,O=0,H=0;K(p,(l,s)=>{s&&($(),l<s&&requestAnimationFrame(()=>{O=0,$()}))});function j(){if(!t.value||!V.value)return;const l=t.value.scrollTop,s=performance.now();s-H>500?(O=Math.sign(l-U),P=V.value.offsetTop):O=l-U,U=l,H=s,$()}function W(){!t.value||!V.value||(O=0,H=0,$())}let le=-1;function $(){cancelAnimationFrame(le),le=requestAnimationFrame(ie)}function ie(){if(!t.value||!p.value)return;const l=U-P,s=Math.sign(O),I=Math.max(0,l-se),k=re(G(I),0,r.value.length),h=l+p.value+se,w=re(G(h)+1,k+1,r.value.length);if((s!==Vl||k<o.value)&&(s!==bl||w>d.value)){const C=b(o.value)-b(k),R=b(w)-b(d.value);Math.max(C,R)>se?(o.value=k,d.value=w):(k<=0&&(o.value=k),w>=r.value.length&&(d.value=w))}m.value=b(o.value),a.value=b(r.value.length)-b(d.value)}function te(l){const s=b(l);!t.value||l&&!s?A=l:t.value.scrollTop=s}const u=y(()=>r.value.slice(o.value,d.value).map((l,s)=>({raw:l,index:s+o.value})));return K(r,()=>{S=Array.from({length:r.value.length}),f=Array.from({length:r.value.length}),B.immediate(),$()},{deep:!0}),{containerRef:t,markerRef:V,computedItems:u,paddingTop:m,paddingBottom:a,scrollToIndex:te,handleScroll:j,handleScrollend:W,handleItemResize:ee}}function Sl(e,r){let n=e.length-1,i=0,o=0,d=null,m=-1;if(e[n]<r)return n;for(;i<=n;)if(o=i+n>>1,d=e[o],d>r)n=o-1;else if(d<r)m=o,i=o+1;else return d===r?o:i;return m}const kl=E({items:{type:Array,default:()=>[]},renderless:Boolean,...pl(),...ue(),...il()},"VVirtualScroll"),Il=Z()({name:"VVirtualScroll",props:kl(),setup(e,r){let{slots:n}=r;const i=qe("VVirtualScroll"),{dimensionStyles:o}=rl(e),{containerRef:d,markerRef:m,handleScroll:a,handleScrollend:t,handleItemResize:V,scrollToIndex:P,paddingTop:T,paddingBottom:v,computedItems:p}=Cl(e,_(e,"items"));return Ne(()=>e.renderless,()=>{function g(){var x,A;const f=(arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1)?"addEventListener":"removeEventListener";d.value===document.documentElement?(document[f]("scroll",a,{passive:!0}),document[f]("scrollend",t)):((x=d.value)==null||x[f]("scroll",a,{passive:!0}),(A=d.value)==null||A[f]("scrollend",t))}Ke(()=>{d.value=Qe(i.vnode.el,!0),g(!0)}),fe(g)}),Q(()=>{const g=p.value.map(S=>c(yl,{key:S.index,renderless:e.renderless,"onUpdate:height":f=>V(S.index,f)},{default:f=>{var x;return(x=n.default)==null?void 0:x.call(n,{item:S.raw,index:S.index,...f})}}));return e.renderless?c(Y,null,[c("div",{ref:m,class:"v-virtual-scroll__spacer",style:{paddingTop:ne(T.value)}},null),g,c("div",{class:"v-virtual-scroll__spacer",style:{paddingBottom:ne(v.value)}},null)]):c("div",{ref:d,class:["v-virtual-scroll",e.class],onScrollPassive:a,onScrollend:t,style:[o.value,e.style]},[c("div",{ref:m,class:"v-virtual-scroll__container",style:{paddingTop:ne(T.value),paddingBottom:ne(v.value)}},[g])])}),{scrollToIndex:P}}});function wl(e,r){const n=L(!1);let i;function o(a){cancelAnimationFrame(i),n.value=!0,i=requestAnimationFrame(()=>{i=requestAnimationFrame(()=>{n.value=!1})})}async function d(){await new Promise(a=>requestAnimationFrame(a)),await new Promise(a=>requestAnimationFrame(a)),await new Promise(a=>requestAnimationFrame(a)),await new Promise(a=>{if(n.value){const t=K(n,()=>{t(),a()})}else a()})}async function m(a){var P,T;if(a.key==="Tab"&&((P=r.value)==null||P.focus()),!["PageDown","PageUp","Home","End"].includes(a.key))return;const t=(T=e.value)==null?void 0:T.$el;if(!t)return;(a.key==="Home"||a.key==="End")&&t.scrollTo({top:a.key==="Home"?0:t.scrollHeight,behavior:"smooth"}),await d();const V=t.querySelectorAll(":scope > :not(.v-virtual-scroll__spacer)");if(a.key==="PageDown"||a.key==="Home"){const v=t.getBoundingClientRect().top;for(const p of V)if(p.getBoundingClientRect().top>=v){p.focus();break}}else{const v=t.getBoundingClientRect().bottom;for(const p of[...V].reverse())if(p.getBoundingClientRect().bottom<=v){p.focus();break}}}return{onListScroll:o,onListKeydown:m}}const xl=E({chips:Boolean,closableChips:Boolean,closeText:{type:String,default:"$vuetify.close"},openText:{type:String,default:"$vuetify.open"},eager:Boolean,hideNoData:Boolean,hideSelected:Boolean,listProps:{type:Object},menu:Boolean,menuIcon:{type:oe,default:"$dropdown"},menuProps:{type:Object},multiple:Boolean,noDataText:{type:String,default:"$vuetify.noDataText"},openOnClear:Boolean,itemColor:String,...Xe({itemChildren:!1})},"Select"),Pl=E({...xl(),...Se(Be({modelValue:null,role:"combobox"}),["validationValue","dirty","appendInnerIcon"]),...Ze({transition:{component:el}})},"VSelect"),Ul=Z()({name:"VSelect",props:Pl(),emits:{"update:focused":e=>!0,"update:modelValue":e=>!0,"update:menu":e=>!0},setup(e,r){let{slots:n}=r;const{t:i}=ze(),o=N(),d=N(),m=N(),a=J(e,"menu"),t=y({get:()=>a.value,set:u=>{var l;a.value&&!u&&((l=d.value)!=null&&l.ΨopenChildren)||(a.value=u)}}),{items:V,transformIn:P,transformOut:T}=Ye(e),v=J(e,"modelValue",[],u=>P(u===null?[null]:ae(u)),u=>{const l=T(u);return e.multiple?l:l[0]??null}),p=y(()=>typeof e.counterValue=="function"?e.counterValue(v.value):typeof e.counterValue=="number"?e.counterValue:v.value.length),g=Re(),S=y(()=>v.value.map(u=>u.value)),f=L(!1),x=y(()=>t.value?e.closeText:e.openText);let A="",q;const B=y(()=>e.hideSelected?V.value.filter(u=>!v.value.some(l=>e.valueComparator(l,u))):V.value),z=y(()=>e.hideNoData&&!B.value.length||e.readonly||(g==null?void 0:g.isReadonly.value)),ee=y(()=>{var u;return{...e.menuProps,activatorProps:{...((u=e.menuProps)==null?void 0:u.activatorProps)||{},"aria-haspopup":"listbox"}}}),b=N(),{onListScroll:G,onListKeydown:U}=wl(b,o);function O(u){e.openOnClear&&(t.value=!0)}function H(){z.value||(t.value=!t.value)}function j(u){var h,w;if(!u.key||e.readonly||g!=null&&g.isReadonly.value)return;["Enter"," ","ArrowDown","ArrowUp","Home","End"].includes(u.key)&&u.preventDefault(),["Enter","ArrowDown"," "].includes(u.key)&&(t.value=!0),["Escape","Tab"].includes(u.key)&&(t.value=!1),u.key==="Home"?(h=b.value)==null||h.focus("first"):u.key==="End"&&((w=b.value)==null||w.focus("last"));const l=1e3;function s(C){const R=C.key.length===1,D=!C.ctrlKey&&!C.metaKey&&!C.altKey;return R&&D}if(e.multiple||!s(u))return;const I=performance.now();I-q>l&&(A=""),A+=u.key.toLowerCase(),q=I;const k=V.value.find(C=>C.title.toLowerCase().startsWith(A));if(k!==void 0){v.value=[k];const C=B.value.indexOf(k);de&&window.requestAnimationFrame(()=>{var R;C>=0&&((R=m.value)==null||R.scrollToIndex(C))})}}function W(u){let l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;if(!u.props.disabled)if(e.multiple){const s=v.value.findIndex(k=>e.valueComparator(k.value,u.value)),I=l??!~s;if(~s){const k=I?[...v.value,u]:[...v.value];k.splice(s,1),v.value=k}else I&&(v.value=[...v.value,u])}else{const s=l!==!1;v.value=s?[u]:[],me(()=>{t.value=!1})}}function le(u){var l;(l=b.value)!=null&&l.$el.contains(u.relatedTarget)||(t.value=!1)}function $(){var u;f.value&&((u=o.value)==null||u.focus())}function ie(u){f.value=!0}function te(u){if(u==null)v.value=[];else if(ce(o.value,":autofill")||ce(o.value,":-webkit-autofill")){const l=V.value.find(s=>s.title===u);l&&W(l)}else o.value&&(o.value.value="")}return K(t,()=>{if(!e.hideSelected&&t.value&&v.value.length){const u=B.value.findIndex(l=>v.value.some(s=>e.valueComparator(s.value,l.value)));de&&window.requestAnimationFrame(()=>{var l;u>=0&&((l=m.value)==null||l.scrollToIndex(u))})}}),K(()=>e.items,(u,l)=>{t.value||f.value&&!l.length&&u.length&&(t.value=!0)}),Q(()=>{const u=!!(e.chips||n.chip),l=!!(!e.hideNoData||B.value.length||n["prepend-item"]||n["append-item"]||n["no-data"]),s=v.value.length>0,I=ye.filterProps(e),k=s||!f.value&&e.label&&!e.persistentPlaceholder?void 0:e.placeholder;return c(ye,M({ref:o},I,{modelValue:v.value.map(h=>h.props.value).join(", "),"onUpdate:modelValue":te,focused:f.value,"onUpdate:focused":h=>f.value=h,validationValue:v.externalValue,counterValue:p.value,dirty:s,class:["v-select",{"v-select--active-menu":t.value,"v-select--chips":!!e.chips,[`v-select--${e.multiple?"multiple":"single"}`]:!0,"v-select--selected":v.value.length,"v-select--selection-slot":!!n.selection},e.class],style:e.style,inputmode:"none",placeholder:k,"onClick:clear":O,"onMousedown:control":H,onBlur:le,onKeydown:j,"aria-label":i(x.value),title:i(x.value)}),{...n,default:()=>c(Y,null,[c(ll,M({ref:d,modelValue:t.value,"onUpdate:modelValue":h=>t.value=h,activator:"parent",contentClass:"v-select__content",disabled:z.value,eager:e.eager,maxHeight:310,openOnClick:!1,closeOnContentClick:!1,transition:e.transition,onAfterLeave:$},ee.value),{default:()=>[l&&c(Je,M({ref:b,selected:S.value,selectStrategy:e.multiple?"independent":"single-independent",onMousedown:h=>h.preventDefault(),onKeydown:U,onFocusin:ie,onScrollPassive:G,tabindex:"-1","aria-live":"polite",color:e.itemColor??e.color},e.listProps),{default:()=>{var h,w,C;return[(h=n["prepend-item"])==null?void 0:h.call(n),!B.value.length&&!e.hideNoData&&(((w=n["no-data"])==null?void 0:w.call(n))??c(be,{title:i(e.noDataText)},null)),c(Il,{ref:m,renderless:!0,items:B.value},{default:R=>{var ge;let{item:D,index:X,itemRef:F}=R;const he=M(D.props,{ref:F,key:X,onClick:()=>W(D,null)});return((ge=n.item)==null?void 0:ge.call(n,{item:D,index:X,props:he}))??c(be,M(he,{role:"option"}),{prepend:Pe=>{let{isSelected:Te}=Pe;return c(Y,null,[e.multiple&&!e.hideSelected?c(hl,{key:D.value,modelValue:Te,ripple:!1,tabindex:"-1"},null):void 0,D.props.prependAvatar&&c(cl,{image:D.props.prependAvatar},null),D.props.prependIcon&&c(ve,{icon:D.props.prependIcon},null)])}})}}),(C=n["append-item"])==null?void 0:C.call(n)]}})]}),v.value.map((h,w)=>{function C(F){F.stopPropagation(),F.preventDefault(),W(h,!1)}const R={"onClick:close":C,onKeydown(F){F.key!=="Enter"&&F.key!==" "||(F.preventDefault(),F.stopPropagation(),C(F))},onMousedown(F){F.preventDefault(),F.stopPropagation()},modelValue:!0,"onUpdate:modelValue":void 0},D=u?!!n.chip:!!n.selection,X=D?Ge(u?n.chip({item:h,index:w,props:R}):n.selection({item:h,index:w})):void 0;if(!(D&&!X))return c("div",{key:h.value,class:"v-select__selection"},[u?n.chip?c(sl,{key:"chip-defaults",defaults:{VChip:{closable:e.closableChips,size:"small",text:h.title}}},{default:()=>[X]}):c(dl,M({key:"chip",closable:e.closableChips,size:"small",text:h.title,disabled:h.props.disabled},R),null):X??c("span",{class:"v-select__selection-text"},[h.title,e.multiple&&w<v.value.length-1&&c("span",{class:"v-select__selection-comma"},[je(",")])])])})]),"append-inner":function(){var R;for(var h=arguments.length,w=new Array(h),C=0;C<h;C++)w[C]=arguments[C];return c(Y,null,[(R=n["append-inner"])==null?void 0:R.call(n,...w),e.menuIcon?c(ve,{class:"v-select__menu-icon",icon:e.menuIcon},null):void 0])}})}),We({isFocused:f,menu:t,select:W},o)}});export{Ul as V};

import{i as U,s as j,d as K,aB as I,ai as Se,r as w,p as P,V as Q,c as v,j as he,g as Je,M as p,f as Xe,X as Ye,aA as Qe,aJ as Ze,aa as T,J as M,z as d,_ as be,a9 as et,as as G,I as ne,Y as tt,K as ae,aK as nt,$ as at,F as ce,b as de,A as ve,ag as lt,aL as A,U as pe,ac as it,ap as st}from"./index-bbbb7ae6.js";import{V as rt}from"./index-c47c17e5.js";import{m as F,f as R,u as D,n as Z,c as ut,b as Ce,p as ke,k as we,d as Ie,e as Ve,s as ot,r as Ae,R as ct,x as dt,h as Pe,v as vt,q as Le,l as Be,i as Oe,j as _e,y as ft,V as fe,o as Me,g as yt}from"./_plugin-vue_export-helper-f10cdba6.js";import{M as mt}from"./index-d6d79046.js";import{a as ye}from"./VAvatar-64cfbca3.js";const ee=Symbol.for("vuetify:list");function xe(){const e=U(ee,{hasPrepend:j(!1),updateHasPrepend:()=>null}),i={hasPrepend:j(!1),updateHasPrepend:t=>{t&&(i.hasPrepend.value=t)}};return K(ee,i),e}function Te(){return U(ee,null)}const le=e=>{const i={activate:t=>{let{id:n,value:l,activated:a}=t;return n=I(n),e&&!l&&a.size===1&&a.has(n)||(l?a.add(n):a.delete(n)),a},in:(t,n,l)=>{let a=new Set;if(t!=null)for(const s of Se(t))a=i.activate({id:s,value:!0,activated:new Set(a),children:n,parents:l});return a},out:t=>Array.from(t)};return i},je=e=>{const i=le(e);return{activate:n=>{let{activated:l,id:a,...s}=n;a=I(a);const r=l.has(a)?new Set([a]):new Set;return i.activate({...s,id:a,activated:r})},in:(n,l,a)=>{let s=new Set;if(n!=null){const r=Se(n);r.length&&(s=i.in(r.slice(0,1),l,a))}return s},out:(n,l,a)=>i.out(n,l,a)}},gt=e=>{const i=le(e);return{activate:n=>{let{id:l,activated:a,children:s,...r}=n;return l=I(l),s.has(l)?a:i.activate({id:l,activated:a,children:s,...r})},in:i.in,out:i.out}},St=e=>{const i=je(e);return{activate:n=>{let{id:l,activated:a,children:s,...r}=n;return l=I(l),s.has(l)?a:i.activate({id:l,activated:a,children:s,...r})},in:i.in,out:i.out}},ht={open:e=>{let{id:i,value:t,opened:n,parents:l}=e;if(t){const a=new Set;a.add(i);let s=l.get(i);for(;s!=null;)a.add(s),s=l.get(s);return a}else return n.delete(i),n},select:()=>null},Fe={open:e=>{let{id:i,value:t,opened:n,parents:l}=e;if(t){let a=l.get(i);for(n.add(i);a!=null&&a!==i;)n.add(a),a=l.get(a);return n}else n.delete(i);return n},select:()=>null},bt={open:Fe.open,select:e=>{let{id:i,value:t,opened:n,parents:l}=e;if(!t)return n;const a=[];let s=l.get(i);for(;s!=null;)a.push(s),s=l.get(s);return new Set(a)}},ie=e=>{const i={select:t=>{let{id:n,value:l,selected:a}=t;if(n=I(n),e&&!l){const s=Array.from(a.entries()).reduce((r,m)=>{let[y,g]=m;return g==="on"&&r.push(y),r},[]);if(s.length===1&&s[0]===n)return a}return a.set(n,l?"on":"off"),a},in:(t,n,l)=>{let a=new Map;for(const s of t||[])a=i.select({id:s,value:!0,selected:new Map(a),children:n,parents:l});return a},out:t=>{const n=[];for(const[l,a]of t.entries())a==="on"&&n.push(l);return n}};return i},De=e=>{const i=ie(e);return{select:n=>{let{selected:l,id:a,...s}=n;a=I(a);const r=l.has(a)?new Map([[a,l.get(a)]]):new Map;return i.select({...s,id:a,selected:r})},in:(n,l,a)=>{let s=new Map;return n!=null&&n.length&&(s=i.in(n.slice(0,1),l,a)),s},out:(n,l,a)=>i.out(n,l,a)}},pt=e=>{const i=ie(e);return{select:n=>{let{id:l,selected:a,children:s,...r}=n;return l=I(l),s.has(l)?a:i.select({id:l,selected:a,children:s,...r})},in:i.in,out:i.out}},Ct=e=>{const i=De(e);return{select:n=>{let{id:l,selected:a,children:s,...r}=n;return l=I(l),s.has(l)?a:i.select({id:l,selected:a,children:s,...r})},in:i.in,out:i.out}},kt=e=>{const i={select:t=>{let{id:n,value:l,selected:a,children:s,parents:r}=t;n=I(n);const m=new Map(a),y=[n];for(;y.length;){const h=y.shift();a.set(h,l?"on":"off"),s.has(h)&&y.push(...s.get(h))}let g=r.get(n);for(;g;){const h=s.get(g),b=h.every(o=>a.get(o)==="on"),u=h.every(o=>!a.has(o)||a.get(o)==="off");a.set(g,b?"on":u?"off":"indeterminate"),g=r.get(g)}return e&&!l&&Array.from(a.entries()).reduce((b,u)=>{let[o,c]=u;return c==="on"&&b.push(o),b},[]).length===0?m:a},in:(t,n,l)=>{let a=new Map;for(const s of t||[])a=i.select({id:s,value:!0,selected:new Map(a),children:n,parents:l});return a},out:(t,n)=>{const l=[];for(const[a,s]of t.entries())s==="on"&&!n.has(a)&&l.push(a);return l}};return i},$=Symbol.for("vuetify:nested"),Ne={id:j(),root:{register:()=>null,unregister:()=>null,parents:w(new Map),children:w(new Map),open:()=>null,openOnSelect:()=>null,activate:()=>null,select:()=>null,activatable:w(!1),selectable:w(!1),opened:w(new Set),activated:w(new Set),selected:w(new Map),selectedValues:w([])}},wt=P({activatable:Boolean,selectable:Boolean,activeStrategy:[String,Function,Object],selectStrategy:[String,Function,Object],openStrategy:[String,Object],opened:null,activated:null,selected:null,mandatory:Boolean},"nested"),It=e=>{let i=!1;const t=w(new Map),n=w(new Map),l=Q(e,"opened",e.opened,u=>new Set(u),u=>[...u.values()]),a=v(()=>{if(typeof e.activeStrategy=="object")return e.activeStrategy;if(typeof e.activeStrategy=="function")return e.activeStrategy(e.mandatory);switch(e.activeStrategy){case"leaf":return gt(e.mandatory);case"single-leaf":return St(e.mandatory);case"independent":return le(e.mandatory);case"single-independent":default:return je(e.mandatory)}}),s=v(()=>{if(typeof e.selectStrategy=="object")return e.selectStrategy;if(typeof e.selectStrategy=="function")return e.selectStrategy(e.mandatory);switch(e.selectStrategy){case"single-leaf":return Ct(e.mandatory);case"leaf":return pt(e.mandatory);case"independent":return ie(e.mandatory);case"single-independent":return De(e.mandatory);case"classic":default:return kt(e.mandatory)}}),r=v(()=>{if(typeof e.openStrategy=="object")return e.openStrategy;switch(e.openStrategy){case"list":return bt;case"single":return ht;case"multiple":default:return Fe}}),m=Q(e,"activated",e.activated,u=>a.value.in(u,t.value,n.value),u=>a.value.out(u,t.value,n.value)),y=Q(e,"selected",e.selected,u=>s.value.in(u,t.value,n.value),u=>s.value.out(u,t.value,n.value));he(()=>{i=!0});function g(u){const o=[];let c=u;for(;c!=null;)o.unshift(c),c=n.value.get(c);return o}const h=Je("nested"),b={id:j(),root:{opened:l,activatable:p(e,"activatable"),selectable:p(e,"selectable"),activated:m,selected:y,selectedValues:v(()=>{const u=[];for(const[o,c]of y.value.entries())c==="on"&&u.push(o);return u}),register:(u,o,c)=>{o&&u!==o&&n.value.set(u,o),c&&t.value.set(u,[]),o!=null&&t.value.set(o,[...t.value.get(o)||[],u])},unregister:u=>{if(i)return;t.value.delete(u);const o=n.value.get(u);if(o){const c=t.value.get(o)??[];t.value.set(o,c.filter(f=>f!==u))}n.value.delete(u),l.value.delete(u)},open:(u,o,c)=>{h.emit("click:open",{id:u,value:o,path:g(u),event:c});const f=r.value.open({id:u,value:o,opened:new Set(l.value),children:t.value,parents:n.value,event:c});f&&(l.value=f)},openOnSelect:(u,o,c)=>{const f=r.value.select({id:u,value:o,selected:new Map(y.value),opened:new Set(l.value),children:t.value,parents:n.value,event:c});f&&(l.value=f)},select:(u,o,c)=>{h.emit("click:select",{id:u,value:o,path:g(u),event:c});const f=s.value.select({id:u,value:o,selected:new Map(y.value),children:t.value,parents:n.value,event:c});f&&(y.value=f),b.root.openOnSelect(u,o,c)},activate:(u,o,c)=>{if(!e.activatable)return b.root.select(u,!0,c);h.emit("click:activate",{id:u,value:o,path:g(u),event:c});const f=a.value.activate({id:u,value:o,activated:new Set(m.value),children:t.value,parents:n.value,event:c});f&&(m.value=f)},children:t,parents:n}};return K($,b),b.root},Ge=(e,i)=>{const t=U($,Ne),n=Symbol(Xe()),l=v(()=>e.value!==void 0?e.value:n),a={...t,id:l,open:(s,r)=>t.root.open(l.value,s,r),openOnSelect:(s,r)=>t.root.openOnSelect(l.value,s,r),isOpen:v(()=>t.root.opened.value.has(l.value)),parent:v(()=>t.root.parents.value.get(l.value)),activate:(s,r)=>t.root.activate(l.value,s,r),isActivated:v(()=>t.root.activated.value.has(I(l.value))),select:(s,r)=>t.root.select(l.value,s,r),isSelected:v(()=>t.root.selected.value.get(I(l.value))==="on"),isIndeterminate:v(()=>t.root.selected.value.get(l.value)==="indeterminate"),isLeaf:v(()=>!t.root.children.value.get(l.value)),isGroupActivator:t.isGroupActivator};return!t.isGroupActivator&&t.root.register(l.value,t.id.value,i),he(()=>{!t.isGroupActivator&&t.root.unregister(l.value)}),i&&K($,a),a},Vt=()=>{const e=U($,Ne);K($,{...e,isGroupActivator:!0})};function At(){const e=j(!1);return Ye(()=>{window.requestAnimationFrame(()=>{e.value=!0})}),{ssrBootStyles:v(()=>e.value?void 0:{transition:"none !important"}),isBooted:Qe(e)}}const Pt=Ze({name:"VListGroupActivator",setup(e,i){let{slots:t}=i;return Vt(),()=>{var n;return(n=t.default)==null?void 0:n.call(t)}}}),Lt=P({activeColor:String,baseColor:String,color:String,collapseIcon:{type:T,default:"$collapse"},expandIcon:{type:T,default:"$expand"},prependIcon:T,appendIcon:T,fluid:Boolean,subgroup:Boolean,title:String,value:null,...F(),...R()},"VListGroup"),me=M()({name:"VListGroup",props:Lt(),setup(e,i){let{slots:t}=i;const{isOpen:n,open:l,id:a}=Ge(p(e,"value"),!0),s=v(()=>`v-list-group--id-${String(a.value)}`),r=Te(),{isBooted:m}=At();function y(u){u.stopPropagation(),l(!n.value,u)}const g=v(()=>({onClick:y,class:"v-list-group__header",id:s.value})),h=v(()=>n.value?e.collapseIcon:e.expandIcon),b=v(()=>({VListItem:{active:n.value,activeColor:e.activeColor,baseColor:e.baseColor,color:e.color,prependIcon:e.prependIcon||e.subgroup&&h.value,appendIcon:e.appendIcon||!e.subgroup&&h.value,title:e.title,value:e.value}}));return D(()=>d(e.tag,{class:["v-list-group",{"v-list-group--prepend":r==null?void 0:r.hasPrepend.value,"v-list-group--fluid":e.fluid,"v-list-group--subgroup":e.subgroup,"v-list-group--open":n.value},e.class],style:e.style},{default:()=>[t.activator&&d(Z,{defaults:b.value},{default:()=>[d(Pt,null,{default:()=>[t.activator({props:g.value,isOpen:n.value})]})]}),d(mt,{transition:{component:rt},disabled:!m.value},{default:()=>{var u;return[be(d("div",{class:"v-list-group__items",role:"group","aria-labelledby":s.value},[(u=t.default)==null?void 0:u.call(t)]),[[et,n.value]])]}})]})),{isOpen:n}}});const Bt=P({opacity:[Number,String],...F(),...R()},"VListItemSubtitle"),Ot=M()({name:"VListItemSubtitle",props:Bt(),setup(e,i){let{slots:t}=i;return D(()=>d(e.tag,{class:["v-list-item-subtitle",e.class],style:[{"--v-list-item-subtitle-opacity":e.opacity},e.style]},t)),{}}}),_t=ut("v-list-item-title"),Mt=P({active:{type:Boolean,default:void 0},activeClass:String,activeColor:String,appendAvatar:String,appendIcon:T,baseColor:String,disabled:Boolean,lines:[Boolean,String],link:{type:Boolean,default:void 0},nav:Boolean,prependAvatar:String,prependIcon:T,ripple:{type:[Boolean,Object],default:!0},slim:Boolean,subtitle:[String,Number],title:[String,Number],value:null,onClick:G(),onClickOnce:G(),...Ce(),...F(),...ke(),...we(),...Ie(),...Ve(),...ot(),...R(),...ne(),...Ae({variant:"text"})},"VListItem"),ge=M()({name:"VListItem",directives:{Ripple:ct},props:Mt(),emits:{click:e=>!0},setup(e,i){let{attrs:t,slots:n,emit:l}=i;const a=dt(e,t),s=v(()=>e.value===void 0?a.href.value:e.value),{activate:r,isActivated:m,select:y,isSelected:g,isIndeterminate:h,isGroupActivator:b,root:u,parent:o,openOnSelect:c}=Ge(s,!1),f=Te(),L=v(()=>{var S;return e.active!==!1&&(e.active||((S=a.isActive)==null?void 0:S.value)||(u.activatable.value?m.value:g.value))}),N=v(()=>e.link!==!1&&a.isLink.value),V=v(()=>!e.disabled&&e.link!==!1&&(e.link||a.isClickable.value||!!f&&(u.selectable.value||u.activatable.value||e.value!=null))),O=v(()=>e.rounded||e.nav),_=v(()=>e.color??e.activeColor),H=v(()=>({color:L.value?_.value??e.baseColor:e.baseColor,variant:e.variant}));tt(()=>{var S;return(S=a.isActive)==null?void 0:S.value},S=>{S&&o.value!=null&&u.open(o.value,!0),S&&c(S)},{immediate:!0});const{themeClasses:q}=ae(e),{borderClasses:z}=Pe(e),{colorClasses:W,colorStyles:J,variantClasses:B}=vt(H),{densityClasses:C}=Le(e),{dimensionStyles:x}=Be(e),{elevationClasses:Ue}=Oe(e),{roundedClasses:Ke}=_e(O),He=v(()=>e.lines?`v-list-item--${e.lines}-line`:void 0),X=v(()=>({isActive:L.value,select:y,isSelected:g.value,isIndeterminate:h.value}));function se(S){var E;l("click",S),V.value&&((E=a.navigate)==null||E.call(a,S),!b&&(u.activatable.value?r(!m.value,S):(u.selectable.value||e.value!=null)&&y(!g.value,S)))}function qe(S){(S.key==="Enter"||S.key===" ")&&(S.preventDefault(),se(S))}return D(()=>{const S=N.value?"a":e.tag,E=n.title||e.title!=null,ze=n.subtitle||e.subtitle!=null,re=!!(e.appendAvatar||e.appendIcon),We=!!(re||n.append),ue=!!(e.prependAvatar||e.prependIcon),Y=!!(ue||n.prepend);return f==null||f.updateHasPrepend(Y),e.activeColor&&nt("active-color",["color","base-color"]),be(d(S,{class:["v-list-item",{"v-list-item--active":L.value,"v-list-item--disabled":e.disabled,"v-list-item--link":V.value,"v-list-item--nav":e.nav,"v-list-item--prepend":!Y&&(f==null?void 0:f.hasPrepend.value),"v-list-item--slim":e.slim,[`${e.activeClass}`]:e.activeClass&&L.value},q.value,z.value,W.value,C.value,Ue.value,He.value,Ke.value,B.value,e.class],style:[J.value,x.value,e.style],href:a.href.value,tabindex:V.value?f?-2:0:void 0,onClick:se,onKeydown:V.value&&!N.value&&qe},{default:()=>{var oe;return[ft(V.value||L.value,"v-list-item"),Y&&d("div",{key:"prepend",class:"v-list-item__prepend"},[n.prepend?d(Z,{key:"prepend-defaults",disabled:!ue,defaults:{VAvatar:{density:e.density,image:e.prependAvatar},VIcon:{density:e.density,icon:e.prependIcon},VListItemAction:{start:!0}}},{default:()=>{var k;return[(k=n.prepend)==null?void 0:k.call(n,X.value)]}}):d(ce,null,[e.prependAvatar&&d(ye,{key:"prepend-avatar",density:e.density,image:e.prependAvatar},null),e.prependIcon&&d(fe,{key:"prepend-icon",density:e.density,icon:e.prependIcon},null)]),d("div",{class:"v-list-item__spacer"},null)]),d("div",{class:"v-list-item__content","data-no-activator":""},[E&&d(_t,{key:"title"},{default:()=>{var k;return[((k=n.title)==null?void 0:k.call(n,{title:e.title}))??e.title]}}),ze&&d(Ot,{key:"subtitle"},{default:()=>{var k;return[((k=n.subtitle)==null?void 0:k.call(n,{subtitle:e.subtitle}))??e.subtitle]}}),(oe=n.default)==null?void 0:oe.call(n,X.value)]),We&&d("div",{key:"append",class:"v-list-item__append"},[n.append?d(Z,{key:"append-defaults",disabled:!re,defaults:{VAvatar:{density:e.density,image:e.appendAvatar},VIcon:{density:e.density,icon:e.appendIcon},VListItemAction:{end:!0}}},{default:()=>{var k;return[(k=n.append)==null?void 0:k.call(n,X.value)]}}):d(ce,null,[e.appendIcon&&d(fe,{key:"append-icon",density:e.density,icon:e.appendIcon},null),e.appendAvatar&&d(ye,{key:"append-avatar",density:e.density,image:e.appendAvatar},null)]),d("div",{class:"v-list-item__spacer"},null)])]}}),[[at("ripple"),V.value&&e.ripple]])}),{activate:r,isActivated:m,isGroupActivator:b,isSelected:g,list:f,select:y}}}),xt=P({color:String,inset:Boolean,sticky:Boolean,title:String,...F(),...R()},"VListSubheader"),Tt=M()({name:"VListSubheader",props:xt(),setup(e,i){let{slots:t}=i;const{textColorClasses:n,textColorStyles:l}=Me(p(e,"color"));return D(()=>{const a=!!(t.default||e.title);return d(e.tag,{class:["v-list-subheader",{"v-list-subheader--inset":e.inset,"v-list-subheader--sticky":e.sticky},n.value,e.class],style:[{textColorStyles:l},e.style]},{default:()=>{var s;return[a&&d("div",{class:"v-list-subheader__text"},[((s=t.default)==null?void 0:s.call(t))??e.title])]}})}),{}}});const jt=P({color:String,inset:Boolean,length:[Number,String],opacity:[Number,String],thickness:[Number,String],vertical:Boolean,...F(),...ne()},"VDivider"),Ft=M()({name:"VDivider",props:jt(),setup(e,i){let{attrs:t,slots:n}=i;const{themeClasses:l}=ae(e),{textColorClasses:a,textColorStyles:s}=Me(p(e,"color")),r=v(()=>{const m={};return e.length&&(m[e.vertical?"height":"width"]=de(e.length)),e.thickness&&(m[e.vertical?"borderRightWidth":"borderTopWidth"]=de(e.thickness)),m});return D(()=>{const m=d("hr",{class:[{"v-divider":!0,"v-divider--inset":e.inset,"v-divider--vertical":e.vertical},l.value,a.value,e.class],style:[r.value,s.value,{"--v-border-opacity":e.opacity},e.style],"aria-orientation":!t.role||t.role==="separator"?e.vertical?"vertical":"horizontal":void 0,role:`${t.role||"separator"}`},null);return n.default?d("div",{class:["v-divider__wrapper",{"v-divider__wrapper--vertical":e.vertical,"v-divider__wrapper--inset":e.inset}]},[m,d("div",{class:"v-divider__content"},[n.default()]),m]):m}),{}}}),Dt=P({items:Array,returnObject:Boolean},"VListChildren"),$e=M()({name:"VListChildren",props:Dt(),setup(e,i){let{slots:t}=i;return xe(),()=>{var n,l;return((n=t.default)==null?void 0:n.call(t))??((l=e.items)==null?void 0:l.map(a=>{var b,u;let{children:s,props:r,type:m,raw:y}=a;if(m==="divider")return((b=t.divider)==null?void 0:b.call(t,{props:r}))??d(Ft,r,null);if(m==="subheader")return((u=t.subheader)==null?void 0:u.call(t,{props:r}))??d(Tt,r,null);const g={subtitle:t.subtitle?o=>{var c;return(c=t.subtitle)==null?void 0:c.call(t,{...o,item:y})}:void 0,prepend:t.prepend?o=>{var c;return(c=t.prepend)==null?void 0:c.call(t,{...o,item:y})}:void 0,append:t.append?o=>{var c;return(c=t.append)==null?void 0:c.call(t,{...o,item:y})}:void 0,title:t.title?o=>{var c;return(c=t.title)==null?void 0:c.call(t,{...o,item:y})}:void 0},h=me.filterProps(r);return s?d(me,ve({value:r==null?void 0:r.value},h),{activator:o=>{let{props:c}=o;const f={...r,...c,value:e.returnObject?y:r.value};return t.header?t.header({props:f}):d(ge,f,g)},default:()=>d($e,{items:s,returnObject:e.returnObject},t)}):t.item?t.item({props:r}):d(ge,ve(r,{value:e.returnObject?y:r.value}),g)}))}}}),Nt=P({items:{type:Array,default:()=>[]},itemTitle:{type:[String,Array,Function],default:"title"},itemValue:{type:[String,Array,Function],default:"value"},itemChildren:{type:[Boolean,String,Array,Function],default:"children"},itemProps:{type:[Boolean,String,Array,Function],default:"props"},returnObject:Boolean,valueComparator:{type:Function,default:lt}},"list-items");function te(e,i){const t=A(i,e.itemTitle,i),n=A(i,e.itemValue,t),l=A(i,e.itemChildren),a=e.itemProps===!0?typeof i=="object"&&i!=null&&!Array.isArray(i)?"children"in i?pe(i,["children"]):i:void 0:A(i,e.itemProps),s={title:t,value:n,...a};return{title:String(s.title??""),value:s.value,props:s,children:Array.isArray(l)?Re(e,l):void 0,raw:i}}function Re(e,i){const t=[];for(const n of i)t.push(te(e,n));return t}function Wt(e){const i=v(()=>Re(e,e.items)),t=v(()=>i.value.some(a=>a.value===null));function n(a){return t.value||(a=a.filter(s=>s!==null)),a.map(s=>e.returnObject&&typeof s=="string"?te(e,s):i.value.find(r=>e.valueComparator(s,r.value))||te(e,s))}function l(a){return e.returnObject?a.map(s=>{let{raw:r}=s;return r}):a.map(s=>{let{value:r}=s;return r})}return{items:i,transformIn:n,transformOut:l}}function Gt(e){return typeof e=="string"||typeof e=="number"||typeof e=="boolean"}function $t(e,i){const t=A(i,e.itemType,"item"),n=Gt(i)?i:A(i,e.itemTitle),l=A(i,e.itemValue,void 0),a=A(i,e.itemChildren),s=e.itemProps===!0?pe(i,["children"]):A(i,e.itemProps),r={title:n,value:l,...s};return{type:t,title:r.title,value:r.value,props:r,children:t==="item"&&a?Ee(e,a):void 0,raw:i}}function Ee(e,i){const t=[];for(const n of i)t.push($t(e,n));return t}function Rt(e){return{items:v(()=>Ee(e,e.items))}}const Et=P({baseColor:String,activeColor:String,activeClass:String,bgColor:String,disabled:Boolean,expandIcon:String,collapseIcon:String,lines:{type:[Boolean,String],default:"one"},slim:Boolean,nav:Boolean,"onClick:open":G(),"onClick:select":G(),"onUpdate:opened":G(),...wt({selectStrategy:"single-leaf",openStrategy:"list"}),...Ce(),...F(),...ke(),...we(),...Ie(),itemType:{type:String,default:"type"},...Nt(),...Ve(),...R(),...ne(),...Ae({variant:"text"})},"VList"),Jt=M()({name:"VList",props:Et(),emits:{"update:selected":e=>!0,"update:activated":e=>!0,"update:opened":e=>!0,"click:open":e=>!0,"click:activate":e=>!0,"click:select":e=>!0},setup(e,i){let{slots:t}=i;const{items:n}=Rt(e),{themeClasses:l}=ae(e),{backgroundColorClasses:a,backgroundColorStyles:s}=yt(p(e,"bgColor")),{borderClasses:r}=Pe(e),{densityClasses:m}=Le(e),{dimensionStyles:y}=Be(e),{elevationClasses:g}=Oe(e),{roundedClasses:h}=_e(e),{children:b,open:u,parents:o,select:c}=It(e),f=v(()=>e.lines?`v-list--${e.lines}-line`:void 0),L=p(e,"activeColor"),N=p(e,"baseColor"),V=p(e,"color");xe(),it({VListGroup:{activeColor:L,baseColor:N,color:V,expandIcon:p(e,"expandIcon"),collapseIcon:p(e,"collapseIcon")},VListItem:{activeClass:p(e,"activeClass"),activeColor:L,baseColor:N,color:V,density:p(e,"density"),disabled:p(e,"disabled"),lines:p(e,"lines"),nav:p(e,"nav"),slim:p(e,"slim"),variant:p(e,"variant")}});const O=j(!1),_=w();function H(C){O.value=!0}function q(C){O.value=!1}function z(C){var x;!O.value&&!(C.relatedTarget&&((x=_.value)!=null&&x.contains(C.relatedTarget)))&&B()}function W(C){const x=C.target;if(!(!_.value||["INPUT","TEXTAREA"].includes(x.tagName))){if(C.key==="ArrowDown")B("next");else if(C.key==="ArrowUp")B("prev");else if(C.key==="Home")B("first");else if(C.key==="End")B("last");else return;C.preventDefault()}}function J(C){O.value=!0}function B(C){if(_.value)return st(_.value,C)}return D(()=>d(e.tag,{ref:_,class:["v-list",{"v-list--disabled":e.disabled,"v-list--nav":e.nav,"v-list--slim":e.slim},l.value,a.value,r.value,m.value,g.value,f.value,h.value,e.class],style:[s.value,y.value,e.style],tabindex:e.disabled||O.value?-1:0,role:"listbox","aria-activedescendant":void 0,onFocusin:H,onFocusout:q,onFocus:z,onKeydown:W,onMousedown:J},{default:()=>[d($e,{items:n.value,returnObject:e.returnObject},t)]})),{open:u,select:c,focus:B,children:b,parents:o}}});export{Jt as V,ge as a,_t as b,Wt as c,Ot as d,Nt as m,At as u};
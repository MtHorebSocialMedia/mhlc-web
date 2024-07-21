import{p as D,a7 as Q,H as L,I as R,J as z,a1 as U,L as r,y as l,a3 as C,ah as B,ad as Y,R as Z,c as b,V as _,W as ee,a2 as ae,F as x,z as le}from"./index-b738886b.js";import{b as te}from"./index-b6dfd16c.js";import{m as E,a as F,u as ne}from"./_plugin-vue_export-helper-48bff84e.js";import{m as se,a as ie,b as ce,c as de}from"./VBtn-1e144b8a.js";import{n as T,m as oe,i as ue,a as re,b as ve,o as fe,p as me,R as pe,d as ke,q as he,j as ye,e as Ce,f as be,r as Ve,s as Ie,t as ge,V as v,g as f}from"./index-70809ef4.js";import{a as G}from"./VAvatar-54a2fc16.js";const w=Symbol.for("vuetify:v-chip-group"),Pe=D({column:Boolean,filter:Boolean,valueComparator:{type:Function,default:Q},...E(),...se({selectedClass:"v-chip--selected"}),...F(),...L(),...T({variant:"tonal"})},"VChipGroup");R()({name:"VChipGroup",props:Pe(),emits:{"update:modelValue":e=>!0},setup(e,m){let{slots:c}=m;const{themeClasses:o}=z(e),{isSelected:t,select:p,next:k,prev:h,selected:y}=ie(e,w);return U({VChip:{color:r(e,"color"),disabled:r(e,"disabled"),filter:r(e,"filter"),variant:r(e,"variant")}}),ne(()=>l(e.tag,{class:["v-chip-group",{"v-chip-group--column":e.column},o.value,e.class],style:e.style},{default:()=>{var u;return[(u=c.default)==null?void 0:u.call(c,{isSelected:t,select:p,next:k,prev:h,selected:y.value})]}})),{}}});const Se=D({activeClass:String,appendAvatar:String,appendIcon:C,closable:Boolean,closeIcon:{type:C,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:{type:Boolean,default:void 0},pill:Boolean,prependAvatar:String,prependIcon:C,ripple:{type:[Boolean,Object],default:!0},text:String,modelValue:{type:Boolean,default:!0},onClick:B(),onClickOnce:B(),...oe(),...E(),...ue(),...re(),...ce(),...ve(),...fe(),...me(),...F({tag:"span"}),...L(),...T({variant:"tonal"})},"VChip"),Le=R()({name:"VChip",directives:{Ripple:pe},props:Se(),emits:{"click:close":e=>!0,"update:modelValue":e=>!0,"group:selected":e=>!0,click:e=>!0},setup(e,m){let{attrs:c,emit:o,slots:t}=m;const{t:p}=Y(),{borderClasses:k}=ke(e),{colorClasses:h,colorStyles:y,variantClasses:u}=he(e),{densityClasses:$}=ye(e),{elevationClasses:M}=Ce(e),{roundedClasses:O}=be(e),{sizeClasses:j}=Ve(e),{themeClasses:q}=z(e),V=Z(e,"modelValue"),a=de(e,w,!1),s=Ie(e,c),K=b(()=>e.link!==!1&&s.isLink.value),i=b(()=>!e.disabled&&e.link!==!1&&(!!a||e.link||s.isClickable.value)),H=b(()=>({"aria-label":p(e.closeLabel),onClick(n){n.stopPropagation(),V.value=!1,o("click:close",n)}}));function I(n){var d;o("click",n),i.value&&((d=s.navigate)==null||d.call(s,n),a==null||a.toggle())}function J(n){(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),I(n))}return()=>{const n=s.isLink.value?"a":e.tag,d=!!(e.appendIcon||e.appendAvatar),N=!!(d||t.append),W=!!(t.close||e.closable),g=!!(t.filter||e.filter)&&a,P=!!(e.prependIcon||e.prependAvatar),X=!!(P||t.prepend),S=!a||a.isSelected.value;return V.value&&_(l(n,{class:["v-chip",{"v-chip--disabled":e.disabled,"v-chip--label":e.label,"v-chip--link":i.value,"v-chip--filter":g,"v-chip--pill":e.pill},q.value,k.value,S?h.value:void 0,$.value,M.value,O.value,j.value,u.value,a==null?void 0:a.selectedClass.value,e.class],style:[S?y.value:void 0,e.style],disabled:e.disabled||void 0,draggable:e.draggable,href:s.href.value,tabindex:i.value?0:void 0,onClick:I,onKeydown:i.value&&!K.value&&J},{default:()=>{var A;return[ge(i.value,"v-chip"),g&&l(te,{key:"filter"},{default:()=>[_(l("div",{class:"v-chip__filter"},[t.filter?l(f,{key:"filter-defaults",disabled:!e.filterIcon,defaults:{VIcon:{icon:e.filterIcon}}},t.filter):l(v,{key:"filter-icon",icon:e.filterIcon},null)]),[[ae,a.isSelected.value]])]}),X&&l("div",{key:"prepend",class:"v-chip__prepend"},[t.prepend?l(f,{key:"prepend-defaults",disabled:!P,defaults:{VAvatar:{image:e.prependAvatar,start:!0},VIcon:{icon:e.prependIcon,start:!0}}},t.prepend):l(x,null,[e.prependIcon&&l(v,{key:"prepend-icon",icon:e.prependIcon,start:!0},null),e.prependAvatar&&l(G,{key:"prepend-avatar",image:e.prependAvatar,start:!0},null)])]),l("div",{class:"v-chip__content"},[((A=t.default)==null?void 0:A.call(t,{isSelected:a==null?void 0:a.isSelected.value,selectedClass:a==null?void 0:a.selectedClass.value,select:a==null?void 0:a.select,toggle:a==null?void 0:a.toggle,value:a==null?void 0:a.value.value,disabled:e.disabled}))??e.text]),N&&l("div",{key:"append",class:"v-chip__append"},[t.append?l(f,{key:"append-defaults",disabled:!d,defaults:{VAvatar:{end:!0,image:e.appendAvatar},VIcon:{end:!0,icon:e.appendIcon}}},t.append):l(x,null,[e.appendIcon&&l(v,{key:"append-icon",end:!0,icon:e.appendIcon},null),e.appendAvatar&&l(G,{key:"append-avatar",end:!0,image:e.appendAvatar},null)])]),W&&l("button",le({key:"close",class:"v-chip__close"},H.value),[t.close?l(f,{key:"close-defaults",defaults:{VIcon:{icon:e.closeIcon,size:"x-small"}}},t.close):l(v,{key:"close-icon",icon:e.closeIcon,size:"x-small"},null)])]}}),[[ee("ripple"),i.value&&e.ripple,null]])}}});export{Le as V};

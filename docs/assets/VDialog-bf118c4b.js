import{a as b,b as y,c as D,V as d}from"./VOverlay-1c4a9740.js";import{f as h}from"./forwardRefs-e658ad70.js";import{p as S,I as x,R as I,r as R,$ as T,T as v,Y as w,c as B,z as m,y as g,a0 as F}from"./index-b738886b.js";import{g as O}from"./index-70809ef4.js";import{u as z}from"./_plugin-vue_export-helper-48bff84e.js";const A=S({fullscreen:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,...b({origin:"center center",scrollStrategy:"block",transition:{component:y},zIndex:2400})},"VDialog"),M=x()({name:"VDialog",props:A(),emits:{"update:modelValue":a=>!0},setup(a,p){let{slots:c}=p;const n=I(a,"modelValue"),{scopeId:V}=D(),o=R();function u(l){var r,s;const e=l.relatedTarget,t=l.target;if(e!==t&&((r=o.value)!=null&&r.contentEl)&&((s=o.value)!=null&&s.globalTop)&&![document,o.value.contentEl].includes(t)&&!o.value.contentEl.contains(t)){const i=F(o.value.contentEl);if(!i.length)return;const f=i[0],P=i[i.length-1];e===f?P.focus():f.focus()}}T&&v(()=>n.value&&a.retainFocus,l=>{l?document.addEventListener("focusin",u):document.removeEventListener("focusin",u)},{immediate:!0}),v(n,async l=>{var e,t;await w(),l?(e=o.value.contentEl)==null||e.focus({preventScroll:!0}):(t=o.value.activatorEl)==null||t.focus({preventScroll:!0})});const E=B(()=>m({"aria-haspopup":"dialog","aria-expanded":String(n.value)},a.activatorProps));return z(()=>{const l=d.filterProps(a);return g(d,m({ref:o,class:["v-dialog",{"v-dialog--fullscreen":a.fullscreen,"v-dialog--scrollable":a.scrollable},a.class],style:a.style},l,{modelValue:n.value,"onUpdate:modelValue":e=>n.value=e,"aria-modal":"true",activatorProps:E.value,role:"dialog"},V),{activator:c.activator,default:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return g(O,{root:"VDialog"},{default:()=>{var s;return[(s=c.default)==null?void 0:s.call(c,...t)]}})}})}),h({},o)}});export{M as V};

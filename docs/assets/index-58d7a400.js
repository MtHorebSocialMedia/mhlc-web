import{p as b,O as d,A as l,aO as g,aw as O,aN as _}from"./index-50a6e3e1.js";const j=b({transition:{type:[Boolean,String,Object],default:"fade-transition",validator:e=>e!==!0}},"transition"),h=(e,n)=>{let{slots:s}=n;const{transition:t,disabled:r,group:i,...a}=e,{component:c=i?g:O,...m}=typeof t=="object"?t:{};return d(c,l(typeof t=="string"?{name:r?"":t}:m,typeof t=="string"?{}:Object.fromEntries(Object.entries({disabled:r,group:i}).filter(o=>{let[u,f]=o;return f!==void 0})),a),s)};function I(e,n){if(!_)return;const s=n.modifiers||{},t=n.value,{handler:r,options:i}=typeof t=="object"?t:{handler:t,options:{}},a=new IntersectionObserver(function(){var f;let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],m=arguments.length>1?arguments[1]:void 0;const o=(f=e._observe)==null?void 0:f[n.instance.$.uid];if(!o)return;const u=c.some(v=>v.isIntersecting);r&&(!s.quiet||o.init)&&(!s.once||u||o.init)&&r(u,c,m),u&&s.once?p(e,n):o.init=!0},i);e._observe=Object(e._observe),e._observe[n.instance.$.uid]={init:!1,observer:a},a.observe(e)}function p(e,n){var t;const s=(t=e._observe)==null?void 0:t[n.instance.$.uid];s&&(s.observer.unobserve(e),delete e._observe[n.instance.$.uid])}const y={mounted:I,unmounted:p},P=y;export{P as I,h as M,j as m};

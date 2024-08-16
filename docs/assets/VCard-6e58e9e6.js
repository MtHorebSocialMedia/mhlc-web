import{m as l,u as s,a as V}from"./_plugin-vue_export-helper-1c413193.js";import{J as c,a8 as w,z as n,p as y,a6 as m,F as A,I as z,K as G,c as h,_ as J,$ as K}from"./index-36c4139c.js";import{c as Q,k as x,V as P,i as C,m as U,g as W,a as X,C as Y,E as Z,F as ee,b as ae,o as te,n as ne,R as de,d as ie,q as le,l as se,h as ce,e as re,D as ue,G as oe,H as ve,f as me,s as ye,L as be,t as ge}from"./index-40a6a7b4.js";import{a as S,V as ke}from"./VAvatar-aebda271.js";const fe=c()({name:"VCardActions",props:l(),setup(e,d){let{slots:t}=d;return w({VBtn:{slim:!0,variant:"text"}}),s(()=>{var a;return n("div",{class:["v-card-actions",e.class],style:e.style},[(a=t.default)==null?void 0:a.call(t)])}),{}}}),Ce=y({opacity:[Number,String],...l(),...V()},"VCardSubtitle"),Ve=c()({name:"VCardSubtitle",props:Ce(),setup(e,d){let{slots:t}=d;return s(()=>n(e.tag,{class:["v-card-subtitle",e.class],style:[{"--v-card-subtitle-opacity":e.opacity},e.style]},t)),{}}}),Ie=Q("v-card-title"),pe=y({appendAvatar:String,appendIcon:m,prependAvatar:String,prependIcon:m,subtitle:[String,Number],title:[String,Number],...l(),...x()},"VCardItem"),Ae=c()({name:"VCardItem",props:pe(),setup(e,d){let{slots:t}=d;return s(()=>{var u;const a=!!(e.prependAvatar||e.prependIcon),b=!!(a||t.prepend),r=!!(e.appendAvatar||e.appendIcon),g=!!(r||t.append),k=!!(e.title!=null||t.title),f=!!(e.subtitle!=null||t.subtitle);return n("div",{class:["v-card-item",e.class],style:e.style},[b&&n("div",{key:"prepend",class:"v-card-item__prepend"},[t.prepend?n(C,{key:"prepend-defaults",disabled:!a,defaults:{VAvatar:{density:e.density,image:e.prependAvatar},VIcon:{density:e.density,icon:e.prependIcon}}},t.prepend):n(A,null,[e.prependAvatar&&n(S,{key:"prepend-avatar",density:e.density,image:e.prependAvatar},null),e.prependIcon&&n(P,{key:"prepend-icon",density:e.density,icon:e.prependIcon},null)])]),n("div",{class:"v-card-item__content"},[k&&n(Ie,{key:"title"},{default:()=>{var i;return[((i=t.title)==null?void 0:i.call(t))??e.title]}}),f&&n(Ve,{key:"subtitle"},{default:()=>{var i;return[((i=t.subtitle)==null?void 0:i.call(t))??e.subtitle]}}),(u=t.default)==null?void 0:u.call(t)]),g&&n("div",{key:"append",class:"v-card-item__append"},[t.append?n(C,{key:"append-defaults",disabled:!r,defaults:{VAvatar:{density:e.density,image:e.appendAvatar},VIcon:{density:e.density,icon:e.appendIcon}}},t.append):n(A,null,[e.appendIcon&&n(P,{key:"append-icon",density:e.density,icon:e.appendIcon},null),e.appendAvatar&&n(S,{key:"append-avatar",density:e.density,image:e.appendAvatar},null)])])])}),{}}}),he=y({opacity:[Number,String],...l(),...V()},"VCardText"),Pe=c()({name:"VCardText",props:he(),setup(e,d){let{slots:t}=d;return s(()=>n(e.tag,{class:["v-card-text",e.class],style:[{"--v-card-text-opacity":e.opacity},e.style]},t)),{}}}),Se=y({appendAvatar:String,appendIcon:m,disabled:Boolean,flat:Boolean,hover:Boolean,image:String,link:{type:Boolean,default:void 0},prependAvatar:String,prependIcon:m,ripple:{type:[Boolean,Object],default:!0},subtitle:[String,Number],text:[String,Number],title:[String,Number],...U(),...l(),...x(),...W(),...X(),...Y(),...Z(),...ee(),...ae(),...te(),...V(),...z(),...ne({variant:"elevated"})},"VCard"),_e=c()({name:"VCard",directives:{Ripple:de},props:Se(),setup(e,d){let{attrs:t,slots:a}=d;const{themeClasses:b}=G(e),{borderClasses:r}=ie(e),{colorClasses:g,colorStyles:k,variantClasses:f}=le(e),{densityClasses:u}=se(e),{dimensionStyles:i}=ce(e),{elevationClasses:T}=re(e),{loaderClasses:D}=ue(e),{locationStyles:L}=oe(e),{positionClasses:_}=ve(e),{roundedClasses:B}=me(e),o=ye(e,t),N=h(()=>e.link!==!1&&o.isLink.value),v=h(()=>!e.disabled&&e.link!==!1&&(e.link||o.isClickable.value));return s(()=>{const R=N.value?"a":e.tag,F=!!(a.title||e.title!=null),E=!!(a.subtitle||e.subtitle!=null),H=F||E,M=!!(a.append||e.appendAvatar||e.appendIcon),O=!!(a.prepend||e.prependAvatar||e.prependIcon),$=!!(a.image||e.image),j=H||O||M,q=!!(a.text||e.text!=null);return J(n(R,{class:["v-card",{"v-card--disabled":e.disabled,"v-card--flat":e.flat,"v-card--hover":e.hover&&!(e.disabled||e.flat),"v-card--link":v.value},b.value,r.value,g.value,u.value,T.value,D.value,_.value,B.value,f.value,e.class],style:[k.value,i.value,L.value,e.style],href:o.href.value,onClick:v.value&&o.navigate,tabindex:e.disabled?-1:void 0},{default:()=>{var I;return[$&&n("div",{key:"image",class:"v-card__image"},[a.image?n(C,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},a.image):n(ke,{key:"image-img",cover:!0,src:e.image},null)]),n(be,{name:"v-card",active:!!e.loading,color:typeof e.loading=="boolean"?void 0:e.loading},{default:a.loader}),j&&n(Ae,{key:"item",prependAvatar:e.prependAvatar,prependIcon:e.prependIcon,title:e.title,subtitle:e.subtitle,appendAvatar:e.appendAvatar,appendIcon:e.appendIcon},{default:a.item,prepend:a.prepend,title:a.title,subtitle:a.subtitle,append:a.append}),q&&n(Pe,{key:"text"},{default:()=>{var p;return[((p=a.text)==null?void 0:p.call(a))??e.text]}}),(I=a.default)==null?void 0:I.call(a),a.actions&&n(fe,null,{default:a.actions}),ge(v.value,"v-card")]}}),[[K("ripple"),v.value&&e.ripple]])}),{}}});export{_e as V,Ie as a,Ve as b,Pe as c};
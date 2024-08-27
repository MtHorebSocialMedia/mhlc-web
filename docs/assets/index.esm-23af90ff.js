import{U as u,O as _}from"./index-50a6e3e1.js";var r={},N={};(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.BLOCKS=void 0,function(t){t.DOCUMENT="document",t.PARAGRAPH="paragraph",t.HEADING_1="heading-1",t.HEADING_2="heading-2",t.HEADING_3="heading-3",t.HEADING_4="heading-4",t.HEADING_5="heading-5",t.HEADING_6="heading-6",t.OL_LIST="ordered-list",t.UL_LIST="unordered-list",t.LIST_ITEM="list-item",t.HR="hr",t.QUOTE="blockquote",t.EMBEDDED_ENTRY="embedded-entry-block",t.EMBEDDED_ASSET="embedded-asset-block",t.TABLE="table",t.TABLE_ROW="table-row",t.TABLE_CELL="table-cell",t.TABLE_HEADER_CELL="table-header-cell"}(e.BLOCKS||(e.BLOCKS={}))})(N);var C={};(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.INLINES=void 0,function(t){t.HYPERLINK="hyperlink",t.ENTRY_HYPERLINK="entry-hyperlink",t.ASSET_HYPERLINK="asset-hyperlink",t.EMBEDDED_ENTRY="embedded-entry-inline"}(e.INLINES||(e.INLINES={}))})(C);var o={};Object.defineProperty(o,"__esModule",{value:!0});var R;(function(e){e.BOLD="bold",e.ITALIC="italic",e.UNDERLINE="underline",e.CODE="code",e.SUPERSCRIPT="superscript",e.SUBSCRIPT="subscript"})(R||(R={}));o.default=R;var H={};(function(e){var t=u&&u.__spreadArray||function(B,c,D){if(D||arguments.length===2)for(var l=0,S=c.length,a;l<S;l++)(a||!(l in c))&&(a||(a=Array.prototype.slice.call(c,0,l)),a[l]=c[l]);return B.concat(a||Array.prototype.slice.call(c))},E=u&&u.__importDefault||function(B){return B&&B.__esModule?B:{default:B}},L;Object.defineProperty(e,"__esModule",{value:!0}),e.V1_MARKS=e.V1_NODE_TYPES=e.TEXT_CONTAINERS=e.HEADINGS=e.CONTAINERS=e.VOID_BLOCKS=e.TABLE_BLOCKS=e.LIST_ITEM_BLOCKS=e.TOP_LEVEL_BLOCKS=void 0;var n=N,i=C,I=E(o);e.TOP_LEVEL_BLOCKS=[n.BLOCKS.PARAGRAPH,n.BLOCKS.HEADING_1,n.BLOCKS.HEADING_2,n.BLOCKS.HEADING_3,n.BLOCKS.HEADING_4,n.BLOCKS.HEADING_5,n.BLOCKS.HEADING_6,n.BLOCKS.OL_LIST,n.BLOCKS.UL_LIST,n.BLOCKS.HR,n.BLOCKS.QUOTE,n.BLOCKS.EMBEDDED_ENTRY,n.BLOCKS.EMBEDDED_ASSET,n.BLOCKS.TABLE],e.LIST_ITEM_BLOCKS=[n.BLOCKS.PARAGRAPH,n.BLOCKS.HEADING_1,n.BLOCKS.HEADING_2,n.BLOCKS.HEADING_3,n.BLOCKS.HEADING_4,n.BLOCKS.HEADING_5,n.BLOCKS.HEADING_6,n.BLOCKS.OL_LIST,n.BLOCKS.UL_LIST,n.BLOCKS.HR,n.BLOCKS.QUOTE,n.BLOCKS.EMBEDDED_ENTRY,n.BLOCKS.EMBEDDED_ASSET],e.TABLE_BLOCKS=[n.BLOCKS.TABLE,n.BLOCKS.TABLE_ROW,n.BLOCKS.TABLE_CELL,n.BLOCKS.TABLE_HEADER_CELL],e.VOID_BLOCKS=[n.BLOCKS.HR,n.BLOCKS.EMBEDDED_ENTRY,n.BLOCKS.EMBEDDED_ASSET],e.CONTAINERS=(L={},L[n.BLOCKS.OL_LIST]=[n.BLOCKS.LIST_ITEM],L[n.BLOCKS.UL_LIST]=[n.BLOCKS.LIST_ITEM],L[n.BLOCKS.LIST_ITEM]=e.LIST_ITEM_BLOCKS,L[n.BLOCKS.QUOTE]=[n.BLOCKS.PARAGRAPH],L[n.BLOCKS.TABLE]=[n.BLOCKS.TABLE_ROW],L[n.BLOCKS.TABLE_ROW]=[n.BLOCKS.TABLE_CELL,n.BLOCKS.TABLE_HEADER_CELL],L[n.BLOCKS.TABLE_CELL]=[n.BLOCKS.PARAGRAPH],L[n.BLOCKS.TABLE_HEADER_CELL]=[n.BLOCKS.PARAGRAPH],L),e.HEADINGS=[n.BLOCKS.HEADING_1,n.BLOCKS.HEADING_2,n.BLOCKS.HEADING_3,n.BLOCKS.HEADING_4,n.BLOCKS.HEADING_5,n.BLOCKS.HEADING_6],e.TEXT_CONTAINERS=t([n.BLOCKS.PARAGRAPH],e.HEADINGS,!0),e.V1_NODE_TYPES=[n.BLOCKS.DOCUMENT,n.BLOCKS.PARAGRAPH,n.BLOCKS.HEADING_1,n.BLOCKS.HEADING_2,n.BLOCKS.HEADING_3,n.BLOCKS.HEADING_4,n.BLOCKS.HEADING_5,n.BLOCKS.HEADING_6,n.BLOCKS.OL_LIST,n.BLOCKS.UL_LIST,n.BLOCKS.LIST_ITEM,n.BLOCKS.HR,n.BLOCKS.QUOTE,n.BLOCKS.EMBEDDED_ENTRY,n.BLOCKS.EMBEDDED_ASSET,i.INLINES.HYPERLINK,i.INLINES.ENTRY_HYPERLINK,i.INLINES.ASSET_HYPERLINK,i.INLINES.EMBEDDED_ENTRY,"text"],e.V1_MARKS=[I.default.BOLD,I.default.CODE,I.default.ITALIC,I.default.UNDERLINE]})(H);var P={};Object.defineProperty(P,"__esModule",{value:!0});var v={};Object.defineProperty(v,"__esModule",{value:!0});var f={};Object.defineProperty(f,"__esModule",{value:!0});var s=N,G={nodeType:s.BLOCKS.DOCUMENT,data:{},content:[{nodeType:s.BLOCKS.PARAGRAPH,data:{},content:[{nodeType:"text",value:"",marks:[],data:{}}]}]};f.default=G;var T={};Object.defineProperty(T,"__esModule",{value:!0});T.isText=T.isBlock=T.isInline=void 0;var h=N,p=C;function M(e,t){for(var E=0,L=Object.keys(e);E<L.length;E++){var n=L[E];if(t===e[n])return!0}return!1}function y(e){return M(p.INLINES,e.nodeType)}T.isInline=y;function Y(e){return M(h.BLOCKS,e.nodeType)}T.isBlock=Y;function g(e){return e.nodeType==="text"}T.isText=g;(function(e){var t=u&&u.__createBinding||(Object.create?function(S,a,O,A){A===void 0&&(A=O);var d=Object.getOwnPropertyDescriptor(a,O);(!d||("get"in d?!a.__esModule:d.writable||d.configurable))&&(d={enumerable:!0,get:function(){return a[O]}}),Object.defineProperty(S,A,d)}:function(S,a,O,A){A===void 0&&(A=O),S[A]=a[O]}),E=u&&u.__setModuleDefault||(Object.create?function(S,a){Object.defineProperty(S,"default",{enumerable:!0,value:a})}:function(S,a){S.default=a}),L=u&&u.__exportStar||function(S,a){for(var O in S)O!=="default"&&!Object.prototype.hasOwnProperty.call(a,O)&&t(a,S,O)},n=u&&u.__importStar||function(S){if(S&&S.__esModule)return S;var a={};if(S!=null)for(var O in S)O!=="default"&&Object.prototype.hasOwnProperty.call(S,O)&&t(a,S,O);return E(a,S),a},i=u&&u.__importDefault||function(S){return S&&S.__esModule?S:{default:S}};Object.defineProperty(e,"__esModule",{value:!0}),e.helpers=e.EMPTY_DOCUMENT=e.MARKS=e.INLINES=e.BLOCKS=void 0;var I=N;Object.defineProperty(e,"BLOCKS",{enumerable:!0,get:function(){return I.BLOCKS}});var B=C;Object.defineProperty(e,"INLINES",{enumerable:!0,get:function(){return B.INLINES}});var c=o;Object.defineProperty(e,"MARKS",{enumerable:!0,get:function(){return i(c).default}}),L(H,e),L(P,e),L(v,e);var D=f;Object.defineProperty(e,"EMPTY_DOCUMENT",{enumerable:!0,get:function(){return i(D).default}});var l=n(T);e.helpers=l})(r);const K=(e,t,E)=>_("span",{key:E,style:{margin:"0px 5px",padding:"0 .25rem 0 .75rem",border:"1px solid #d3dce0",fontFamily:"monospace"}},`inline: ${e}, sys.id: ${t.data.target.sys.id}`),U={[r.MARKS.BOLD]:(e,t)=>_("strong",{key:t},e),[r.MARKS.ITALIC]:(e,t)=>_("em",{key:t},e),[r.MARKS.UNDERLINE]:(e,t)=>_("u",{key:t},e),[r.MARKS.CODE]:(e,t)=>_("code",{key:t},e),[r.MARKS.SUPERSCRIPT]:(e,t)=>_("sup",{key:t},e),[r.MARKS.SUBSCRIPT]:(e,t)=>_("sub",{key:t},e)},m={[r.BLOCKS.PARAGRAPH]:(e,t,E)=>_("p",{key:t},E(e.content,t,E)),[r.BLOCKS.HEADING_1]:(e,t,E)=>_("h1",{key:t},E(e.content,t,E)),[r.BLOCKS.HEADING_2]:(e,t,E)=>_("h2",{key:t},E(e.content,t,E)),[r.BLOCKS.HEADING_3]:(e,t,E)=>_("h3",{key:t},E(e.content,t,E)),[r.BLOCKS.HEADING_4]:(e,t,E)=>_("h4",{key:t},E(e.content,t,E)),[r.BLOCKS.HEADING_5]:(e,t,E)=>_("h5",{key:t},E(e.content,t,E)),[r.BLOCKS.HEADING_6]:(e,t,E)=>_("h6",{key:t},E(e.content,t,E)),[r.BLOCKS.EMBEDDED_ENTRY]:(e,t,E)=>_("div",{key:t},E(e.content,t,E)),[r.BLOCKS.UL_LIST]:(e,t,E)=>_("ul",{key:t},E(e.content,t,E)),[r.BLOCKS.OL_LIST]:(e,t,E)=>_("ol",{key:t},E(e.content,t,E)),[r.BLOCKS.LIST_ITEM]:(e,t,E)=>_("li",{key:t},E(e.content,t,E)),[r.BLOCKS.QUOTE]:(e,t,E)=>_("blockquote",{key:t},E(e.content,t,E)),[r.BLOCKS.TABLE]:(e,t,E)=>_("table",{key:t},E(e.content,t,E)),[r.BLOCKS.TABLE_ROW]:(e,t,E)=>_("tr",{key:t},E(e.content,t,E)),[r.BLOCKS.TABLE_CELL]:(e,t,E)=>_("td",{key:t},E(e.content,t,E)),[r.BLOCKS.TABLE_HEADER_CELL]:(e,t,E)=>_("th",{key:t},E(e.content,t,E)),[r.BLOCKS.HR]:(e,t)=>_("hr",{key:t}),[r.INLINES.ASSET_HYPERLINK]:(e,t)=>K(r.INLINES.ASSET_HYPERLINK,e,t),[r.INLINES.ENTRY_HYPERLINK]:(e,t)=>K(r.INLINES.ENTRY_HYPERLINK,e,t),[r.INLINES.EMBEDDED_ENTRY]:(e,t)=>K(r.INLINES.EMBEDDED_ENTRY,e,t),[r.INLINES.HYPERLINK]:(e,t,E)=>_("a",{key:t,href:e.data.uri},E(e.content,t,E)),text:({marks:e,value:t},E,L)=>e.length?[...e].reverse().reduce((i,I,B)=>L[I.type]([i],`${E}-${B}`,_),t):t},b=(e,t,E)=>e.map((L,n)=>j(L,`${t}-${n}`,E)),j=(e,t,E)=>{const L=E.node;if(r.helpers.isText(e)){const n=E.mark;return L.text(e,t,n)}else{const n=i=>b(i,t,E);return L?!e.nodeType||!L[e.nodeType]?_("div",{key:t},"(Unrecognized node type) "+(e.nodeType||"empty")):L[e.nodeType](e,t,n):_("div",{key:t},`${t} ;lost nodeRenderer`)}},V=({nodeRenderers:e,markRenderers:t,document:E})=>{if(!E)return console.warn("No document given to RichText renderer"),[];const L={node:{...m,...e},mark:{...U,...t}};return b(E.content,"RichText-",L)};V.props=["document","nodeRenderers","markRenderers"];export{V as R,r as d};

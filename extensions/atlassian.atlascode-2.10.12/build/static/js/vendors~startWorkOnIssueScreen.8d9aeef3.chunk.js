(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{401:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,a=(n=r(0))&&n.__esModule?n:{default:n},c=r(96);const o=e=>a.default.createElement(c.Icon,Object.assign({dangerouslySetGlyph:'<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill="currentColor"><path d="M10 19h8V8h-8v11zM8 7.992C8 6.892 8.902 6 10.009 6h7.982C19.101 6 20 6.893 20 7.992v11.016c0 1.1-.902 1.992-2.009 1.992H10.01A2.001 2.001 0 018 19.008V7.992z"/><path d="M5 16V4.992C5 3.892 5.902 3 7.009 3H15v13H5zm2 0h8V5H7v11z"/></g></svg>'},e));o.displayName="CopyIcon";var i=o;t.default=i},406:function(e,t,r){(function(e){function r(e,t){for(var r=0,n=e.length-1;n>=0;n--){var a=e[n];"."===a?e.splice(n,1):".."===a?(e.splice(n,1),r++):r&&(e.splice(n,1),r--)}if(t)for(;r--;r)e.unshift("..");return e}function n(e,t){if(e.filter)return e.filter(t);for(var r=[],n=0;n<e.length;n++)t(e[n],n,e)&&r.push(e[n]);return r}t.resolve=function(){for(var t="",a=!1,c=arguments.length-1;c>=-1&&!a;c--){var o=c>=0?arguments[c]:e.cwd();if("string"!==typeof o)throw new TypeError("Arguments to path.resolve must be strings");o&&(t=o+"/"+t,a="/"===o.charAt(0))}return(a?"/":"")+(t=r(n(t.split("/"),(function(e){return!!e})),!a).join("/"))||"."},t.normalize=function(e){var c=t.isAbsolute(e),o="/"===a(e,-1);return(e=r(n(e.split("/"),(function(e){return!!e})),!c).join("/"))||c||(e="."),e&&o&&(e+="/"),(c?"/":"")+e},t.isAbsolute=function(e){return"/"===e.charAt(0)},t.join=function(){var e=Array.prototype.slice.call(arguments,0);return t.normalize(n(e,(function(e,t){if("string"!==typeof e)throw new TypeError("Arguments to path.join must be strings");return e})).join("/"))},t.relative=function(e,r){function n(e){for(var t=0;t<e.length&&""===e[t];t++);for(var r=e.length-1;r>=0&&""===e[r];r--);return t>r?[]:e.slice(t,r-t+1)}e=t.resolve(e).substr(1),r=t.resolve(r).substr(1);for(var a=n(e.split("/")),c=n(r.split("/")),o=Math.min(a.length,c.length),i=o,s=0;s<o;s++)if(a[s]!==c[s]){i=s;break}var l=[];for(s=i;s<a.length;s++)l.push("..");return(l=l.concat(c.slice(i))).join("/")},t.sep="/",t.delimiter=":",t.dirname=function(e){if("string"!==typeof e&&(e+=""),0===e.length)return".";for(var t=e.charCodeAt(0),r=47===t,n=-1,a=!0,c=e.length-1;c>=1;--c)if(47===(t=e.charCodeAt(c))){if(!a){n=c;break}}else a=!1;return-1===n?r?"/":".":r&&1===n?"/":e.slice(0,n)},t.basename=function(e,t){var r=function(e){"string"!==typeof e&&(e+="");var t,r=0,n=-1,a=!0;for(t=e.length-1;t>=0;--t)if(47===e.charCodeAt(t)){if(!a){r=t+1;break}}else-1===n&&(a=!1,n=t+1);return-1===n?"":e.slice(r,n)}(e);return t&&r.substr(-1*t.length)===t&&(r=r.substr(0,r.length-t.length)),r},t.extname=function(e){"string"!==typeof e&&(e+="");for(var t=-1,r=0,n=-1,a=!0,c=0,o=e.length-1;o>=0;--o){var i=e.charCodeAt(o);if(47!==i)-1===n&&(a=!1,n=o+1),46===i?-1===t?t=o:1!==c&&(c=1):-1!==t&&(c=-1);else if(!a){r=o+1;break}}return-1===t||-1===n||0===c||1===c&&t===n-1&&t===r+1?"":e.slice(t,n)};var a="b"==="ab".substr(-1)?function(e,t,r){return e.substr(t,r)}:function(e,t,r){return t<0&&(t=e.length+t),e.substr(t,r)}}).call(this,r(246))},497:function(e,t,r){"use strict";r.d(t,"a",(function(){return d})),r.d(t,"c",(function(){return b})),r.d(t,"b",(function(){return p}));var n=r(85),a=r.n(n),c=r(82),o=r(83),i={light:{textColor:"var(--ds-text-lowEmphasis, ".concat(o.N200,")"),separatorColor:"var(--ds-text-lowEmphasis, ".concat(o.N200,")")},dark:{textColor:"var(--ds-text-lowEmphasis, ".concat(o.N300,")"),separatorColor:"var(--ds-text-lowEmphasis, ".concat(o.N300,")")}};function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){a()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var u=Object(c.g)(),f=3*Object(c.g)()/Object(c.f)(),d=function(e){return{margin:0,padding:0,color:function(e){return i[e]}(e).separatorColor,display:"flex",flexWrap:"wrap","&>li:not(:last-child)::after":{content:"".concat('"/"'),flexShrink:0,padding:"0 ".concat(u,"px"),textAlign:"center",width:"".concat(u,"px")}}},b={display:"flex",flexDirection:"row",height:"".concat(f,"em"),lineHeight:"".concat(f,"em"),margin:0,padding:0,boxSizing:"border-box",maxWidth:"100%"},p=function(e){var t={fontWeight:400};return l(l({},t),{},e?{maxWidth:"".concat(e,"px !important")}:{flexShrink:1,minWidth:0})}},648:function(e,t){},649:function(e,t){},808:function(e,t,r){"use strict";var n=r(81),a=r.n(n),c=r(85),o=r.n(c),i=r(91),s=r.n(i),l=r(0),u=r.n(l),f=r(80);const d="RENDER",b="HYDRATE",p=0,h=1,m=2,O=0,v=2,y=new Map,j={CURRENT_MODE:b,MANIFEST:{publicPath:"/",assets:{}},CROSS_ORIGIN:void 0},g=[],w=e=>t=>(e.push(t),()=>{const r=e.indexOf(t);-1!==r&&e.splice(r,1)});let E=p;const k=e=>{E=e,g.slice(0).forEach(t=>t(e))},x=Object(l.createContext)({subscribe:w(g),currentPhase:()=>E,api:{startNextPhase:()=>{k(h),setTimeout(()=>k(m),50)},resetPhase:()=>k(p)}});const C=()=>"undefined"===typeof window||"nodejs"===window.name;function S(e,t){switch(t.name){case"style":break;case"class":e.className=t.value;break;case"crossorigin":e.crossOrigin=t.value;break;default:e[t.name]=t.value}return e}const P=(e,t)=>{if(e.assets[t])return e.assets[t].map(t=>`${e.publicPath}${t}`)},I=Object(l.createContext)({fallback:u.a.createElement(l.Fragment,null),setFallback:e=>{console.warn("Missing <LooselySuspense /> boundary")}});function A(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}class D extends l.Component{constructor(e){super(e),A(this,"state",{fallback:this.props.fallback,setFallback:e=>{this.hydrationFallback!==e&&(this.hydrationFallback=e,this.mounted&&this.forceUpdate())}}),A(this,"hydrationFallback",null),A(this,"mounted",!1),A(this,"DynamicFallback",({children:e,outsideSuspense:t})=>(Object(l.useLayoutEffect)(()=>()=>{t||this.state.setFallback(null)},[t]),e(t?this.hydrationFallback?this.hydrationFallback:null:this.hydrationFallback?null:this.props.fallback))),this.DynamicFallback.displayName="DynamicFallback"}componentDidMount(){this.mounted=!0}renderFallback(e){const{DynamicFallback:t}=this;return u.a.createElement(t,{outsideSuspense:e},e=>e)}renderServer(){return u.a.createElement(I.Provider,{value:this.state},this.props.children)}renderClient(){return u.a.createElement(I.Provider,{value:this.state},u.a.createElement(l.Suspense,{fallback:this.renderFallback(!1)},this.props.children),(!this.mounted||this.hydrationFallback)&&this.renderFallback(!0))}render(){return C()?this.renderServer():this.renderClient()}}class N extends Error{constructor(e,t){var r,n,a;super(),a=void 0,(n="nativeError")in(r=this)?Object.defineProperty(r,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):r[n]=a,this.message="Failed to load module "+e,this.name="LoaderError",this.nativeError=t,Error.captureStackTrace&&Error.captureStackTrace(this,N)}}const F=({id:e,content:t})=>{const r=((e,t)=>{const r=Object(l.useRef)(null),{current:n}=Object(l.useRef)(t||[]);return Object(l.useLayoutEffect)(()=>{const e=r.current,{parentNode:t}=e||{};return t&&!t.contains(n[0])&&n.reverse().forEach(r=>{var n;"LINK"===(n=r).tagName&&"prefetch"===n.rel&&(r.rel=""),t.insertBefore(r,e.nextSibling)}),()=>{n.forEach(e=>{var t;return null==(t=e.parentNode)?void 0:t.removeChild(e)})}},[r.current,n]),r})(0,t);return u.a.createElement("input",{type:"hidden","data-lazy-begin":e,ref:r})};function _(){return(_=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}const R=({id:e,content:t})=>u.a.createElement(u.a.Fragment,null,u.a.createElement("input",{type:"hidden","data-lazy-begin":e}),t.map((e,t)=>{const{tagName:r="",childNodes:n=[],attributes:a=[]}=e,c=Array.from(a).reduce(S,{key:String(t)});return r?n.length?u.a.createElement(r.toLowerCase(),_(_({},c),{},{dangerouslySetInnerHTML:{__html:""},suppressHydrationWarning:!0})):u.a.createElement(r.toLowerCase(),c):u.a.createElement(l.Fragment,c,e.textContent)}),u.a.createElement("input",{type:"hidden","data-lazy-end":e}));function T(e,t){var r;if(document.querySelector(`link[href="${e}"]`)||document.querySelector(`script[src="${e}"]`))return;const n=document.createElement("link");n.rel=t,n.as="script",j.CROSS_ORIGIN&&(n.crossOrigin=j.CROSS_ORIGIN),n.href=e,null==(r=document.head)||r.appendChild(n)}const z={then:()=>z,catch:()=>z,finally:()=>z};function M(e,{moduleId:t,rel:r}){const n=P(j.MANIFEST,t);return!!n&&(n.forEach(e=>T(e,r)),!0)}function L(e,{rel:t}){if("undefined"===typeof __webpack_get_script_filename__)return!1;const n=r.e;r.e=function(e){return T(__webpack_get_script_filename__(e),t),z};try{e()}catch(e){}return r.e=n,!0}function W(e){return e(),!0}function B(e,{moduleId:t,priority:r}){if(C())return;const n=r===O?"preload":"prefetch";[M,L,W].some(r=>r(e,{moduleId:t,rel:n}))}function H({defer:e,deferred:t,dataLazyId:r,moduleId:n,ssr:a}){const c=Object(l.lazy)(()=>t.promise);return o=>{const{setFallback:i}=Object(l.useContext)(I),[,s]=Object(l.useState)(),f=((e=-1)=>{const{subscribe:t,currentPhase:r}=Object(l.useContext)(x),[n,a]=Object(l.useState)(()=>r()>=e),c=Object(l.useMemo)(()=>t(t=>a(t>=e)),[t,a,e]);return Object(l.useEffect)(()=>c,[c]),n})(e);return Object(l.useMemo)(()=>{f&&t.start().catch(e=>{s(()=>{throw new N(n,e)})})},[f]),Object(l.useMemo)(()=>{const e=(y.get(r)||[]).shift();if(!e)return;const t=j.CURRENT_MODE===d?u.a.createElement(F,{id:r,content:e}):u.a.createElement(R,{id:r,content:e});i(t)},[i]),a||Object(l.useEffect)(()=>{i(null)},[i]),e===h&&Object(l.useEffect)(()=>{f||B(t.start,{moduleId:n,priority:v})},[f]),u.a.createElement(c,o)}}function V({dataLazyId:e,defer:t,loader:r,moduleId:n,ssr:a}){return c=>{var o;const i=a?function(e,t){try{return"default"in(r=t())?r.default:r}catch(t){throw new N(e,t)}var r}(n,r):null,{fallback:s}=Object(l.useContext)(I);return u.a.createElement(u.a.Fragment,null,u.a.createElement("input",{type:"hidden","data-lazy-begin":e}),t!==m&&(null==(o=P(j.MANIFEST,n))?void 0:o.map(e=>u.a.createElement("link",{key:e,rel:t===p?"preload":"prefetch",href:e,crossOrigin:j.CROSS_ORIGIN,as:"script"}))),i?u.a.createElement(i,c):s,u.a.createElement("input",{type:"hidden","data-lazy-end":e}))}}const G=e=>{let t;const r={promise:new Promise(e=>{t=t=>{let n;r.result=t,t.default||(n={default:t}),e(n||t)}}),result:void 0,start:()=>e().then(t)};return r};r(648),r(649);function $(){return($=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function q(e,{defer:t=p,moduleId:r="",ssr:n=!0}={}){const a=C(),c=function(e){for(var t,r=e.length,n=r^r,a=0;r>=4;)t=1540483477*(65535&(t=255&e.charCodeAt(a)|(255&e.charCodeAt(++a))<<8|(255&e.charCodeAt(++a))<<16|(255&e.charCodeAt(++a))<<24))+((1540483477*(t>>>16)&65535)<<16),n=1540483477*(65535&n)+((1540483477*(n>>>16)&65535)<<16)^(t=1540483477*(65535&(t^=t>>>24))+((1540483477*(t>>>16)&65535)<<16)),r-=4,++a;switch(r){case 3:n^=(255&e.charCodeAt(a+2))<<16;case 2:n^=(255&e.charCodeAt(a+1))<<8;case 1:n=1540483477*(65535&(n^=255&e.charCodeAt(a)))+((1540483477*(n>>>16)&65535)<<16)}return n=1540483477*(65535&(n^=n>>>13))+((1540483477*(n>>>16)&65535)<<16),((n^=n>>>15)>>>0).toString(36)}(r),o=a?V({dataLazyId:c,defer:t,loader:e,moduleId:r,ssr:n}):H({dataLazyId:c,defer:t,deferred:G(e),moduleId:r,ssr:n});var i;o.displayName=`Lazy(${i=r,i.split("/").slice(-3).join("/")||"Component"})`;return Object.assign(o,{getAssetUrls:()=>P(j.MANIFEST,r),preload:n=>{B(e,{moduleId:r,priority:null!=n?n:t===p?O:v})}})}const U={lazyForPaint:{ssr:!0,defer:p},lazyAfterPaint:{ssr:!0,defer:h},lazy:{ssr:!1,defer:m}};var J=r(497),K=r(186),X=r(619);function Y(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var Q={componentName:"breadcrumbsItem",packageName:"@atlaskit/breadcrumbs",packageVersion:"11.4.1"},Z=function(){},ee=u.a.forwardRef((function(e,t){var r=e.hasOverflow,n=void 0===r||r,c=e.href,i=void 0===c?"#":c,l=e.onClick,f=void 0===l?Z:l,d=e.analyticsContext,b=e.iconBefore,p=e.iconAfter,h=s()(e,["hasOverflow","href","onClick","analyticsContext","iconBefore","iconAfter"]),m=Object(K.a)(function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Y(Object(r),!0).forEach((function(t){o()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Y(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({fn:f,action:"clicked",analyticsData:d},Q));return u.a.createElement(X.a,a()({appearance:"subtle-link",spacing:"none",iconAfter:n?void 0:p,iconBefore:n?void 0:b,onClick:m,ref:t,href:i},h))})),te=r(97),re=r.n(te);function ne(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function ae(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ne(Object(r),!0).forEach((function(t){o()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ne(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var ce,oe=(ce={ssr:!1},q((function(){return r.e(7).then(r.bind(null,168))}),$($({},U.lazyForPaint),ce||{}))),ie=Object(l.memo)((function(e){var t=Object(l.useRef)(null),r=e.truncationWidth,n=e.text,c=s()(e,["truncationWidth","text"]),o=function(e,t){var r=Object(l.useState)(!1),n=re()(r,2),a=n[0],c=n[1];return Object(l.useEffect)((function(){if(e&&t.current){var r=t.current.clientWidth>=e;r!==a&&c(r)}})),a}(r,t),i=ae(ae({},c),{},{ref:t,hasOverflow:o}),u=Object(l.useMemo)((function(){return Object(J.b)(r)}),[r]),d=Object(f.c)(ee,a()({},i,{css:u}),n);return Object(f.c)("li",{css:J.c},o?Object(f.c)(D,{fallback:Object(f.c)("div",null,d)},Object(f.c)(oe,{content:n,position:"bottom"},d)):d)}));t.a=ie},826:function(e,t,r){"use strict";var n=r(81),a=r.n(n),c=r(85),o=r.n(c),i=r(117),s=r.n(i),l=r(97),u=r.n(l),f=r(0),d=r.n(f),b=r(80),p=r(186),h=r(321),m=r(313),O=r(497),v=r(619),y=function(){},j=Object(f.memo)((function(e){var t=e.onClick,r=void 0===t?y:t,n=e.testId,a=e.label;return Object(b.c)("li",{css:O.c},Object(b.c)(v.a,{appearance:"subtle-link",spacing:"none",testId:n,onClick:r,"aria-label":a},"\u2026"))})),g=r(522);function w(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var E=d.a.Children.toArray,k={componentName:"breadcrumbs",packageName:"@atlaskit/breadcrumbs",packageVersion:"11.4.1"},x=function(){},C=Object(f.forwardRef)((function(e,t){var r=e.defaultExpanded,n=void 0!==r&&r,a=e.isExpanded,c=e.maxItems,i=void 0===c?8:c,l=e.itemsBeforeCollapse,d=void 0===l?1:l,m=e.itemsAfterCollapse,v=void 0===m?1:m,y=e.children,C=void 0===y?[]:y,S=e.testId,P=e.onExpand,I=void 0===P?x:P,A=e.analyticsContext,D=e.mode,N=void 0===D?"light":D,F=e.label,_=void 0===F?"Breadcrumbs":F,R=e.ellipsisLabel,T=void 0===R?"Show more breadcrumbs":R,z=Object(f.useState)(n),M=u()(z,2),L=M[0],W=M[1],B=Object(f.useState)(!1),H=u()(B,2),V=H[0],G=H[1],$=Object(f.useRef)(null),q="undefined"!==typeof a,U=I!==x,J=q?a:L;!function(e,t){var r=t.isExpanded,n=t.isDisabled,a=Object(g.a)(r);Object(f.useEffect)((function(){!n&&(!a&&r)&&e()}),[r,n,e,a])}((function(){if($.current){var e=s()($.current.querySelectorAll("li")).map((function(e){return e.querySelector('a, button, [tabindex]:not([tabindex="-1"])')})),t=e[d],r=e[0];t?t.focus&&t.focus():r?r.focus&&r.focus():$.current.focus()}G(!1)}),{isExpanded:J,isDisabled:!V});var K=Object(p.a)(function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?w(Object(r),!0).forEach((function(t){o()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):w(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({fn:function(e,t){return q||W((function(e){return!e})),(U&&q||!q)&&G(e.target===document.activeElement),I(e,t)},action:"expanded",analyticsData:A},k)),X=Object(f.useMemo)((function(){return Object(O.a)(N)}),[N]),Y=E(C),Q=J||i&&Y.length<=i?Y:function(){var e=Y;if(d+v>=e.length)return e;var t=e.slice(0,d),r=e.slice(e.length-v,e.length);return[].concat(s()(t),[Object(b.c)(j,{key:"ellipsis",testId:S&&"".concat(S,"--breadcrumb-ellipsis"),onClick:K,label:T})],s()(r))}();return Object(b.c)("nav",{"aria-label":_,ref:Object(h.a)([t,$]),tabIndex:-1},Object(b.c)("ol",{"data-testid":S,css:X},Q))})),S=Object(f.memo)(Object(f.forwardRef)((function(e,t){return Object(b.c)(m.a.Consumer,null,(function(r){return Object(b.c)(C,a()({},e,{mode:r.mode,ref:t}))}))})));t.a=S},831:function(e,t,r){"use strict";var n=r(0),a=r.n(n),c=r(80),o=r(82),i=r(133),s=Object(o.g)(),l=Object(c.b)({overflowX:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}),u=Object(c.b)({margin:"".concat(3*s,"px 0 ").concat(2*s,"px 0")}),f=Object(c.b)({marginTop:0,lineHeight:"".concat(4*s,"px"),outline:"none"}),d=Object(c.b)({display:"flex",alignItems:"flex-start",flexWrap:"wrap"}),b=Object(c.b)({flexWrap:"nowrap"}),p=Object(c.b)({minWidth:0,maxWidth:"100%",marginBottom:"".concat(s,"px"),flex:"1 0 auto",flexShrink:void 0}),h=Object(c.b)({maxWidth:"100%",marginBottom:"".concat(s,"px"),marginLeft:"auto",paddingLeft:"".concat(4*s,"px"),flex:"0 0 auto",whiteSpace:"nowrap",">":{textAlign:"right"}}),m=Object(c.b)({flexShrink:1}),O=Object(c.b)({marginTop:"".concat(2*s,"px")}),v=function(e){var t=e.children;return Object(c.c)("div",{css:u},t)},y=Object(c.b)(Object(i.b)()),j=a.a.forwardRef((function(e,t){var r=e.children,n=e.id,a=e.truncateTitle;return Object(c.c)("h1",{css:[y,f,a&&l],ref:t,tabIndex:-1,id:n},r)})),g=function(e){var t=e.children,r=e.truncateTitle;return Object(c.c)("div",{css:[d,r&&b]},t)},w=function(e){var t=e.children,r=e.truncateTitle;return Object(c.c)("div",{css:[p,r&&m]},t)},E=function(e){var t=e.children;return Object(c.c)("div",{css:h},t)},k=function(e){var t=e.children;return Object(c.c)("div",{css:O},t)};t.a=function(e){var t=e.innerRef,r=e.breadcrumbs,n=e.actions,c=e.bottomBar,o=e.children,i=e.id,s=e.disableTitleStyles,l=void 0!==s&&s,u=e.truncateTitle,f=void 0!==u&&u;return a.a.createElement(v,null,r,a.a.createElement(g,{truncateTitle:f},a.a.createElement(w,{truncateTitle:f},l?o:a.a.createElement(j,{ref:t,truncateTitle:f,id:i},o)),n&&a.a.createElement(E,null,n)),c&&a.a.createElement(k,null," ",c," "))}}}]);
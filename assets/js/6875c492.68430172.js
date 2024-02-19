"use strict";(self.webpackChunkrecetas=self.webpackChunkrecetas||[]).push([[4813],{7293:(e,n,t)=>{t.d(n,{A:()=>z});var i=t(6540),s=t(4848);function o(e){const{mdxAdmonitionTitle:n,rest:t}=function(e){const n=i.Children.toArray(e),t=n.find((e=>i.isValidElement(e)&&"mdxAdmonitionTitle"===e.type)),o=n.filter((e=>e!==t)),r=t?.props.children;return{mdxAdmonitionTitle:r,rest:o.length>0?(0,s.jsx)(s.Fragment,{children:o}):null}}(e.children),o=e.title??n;return{...e,...o&&{title:o},children:t}}var r=t(8215),a=t(1312),l=t(7559);const c={admonition:"admonition_xJq3",admonitionHeading:"admonitionHeading_Gvgb",admonitionIcon:"admonitionIcon_Rf37",admonitionContent:"admonitionContent_BuS1"};function d(e){let{type:n,className:t,children:i}=e;return(0,s.jsx)("div",{className:(0,r.A)(l.G.common.admonition,l.G.common.admonitionType(n),c.admonition,t),children:i})}function u(e){let{icon:n,title:t}=e;return(0,s.jsxs)("div",{className:c.admonitionHeading,children:[(0,s.jsx)("span",{className:c.admonitionIcon,children:n}),t]})}function m(e){let{children:n}=e;return n?(0,s.jsx)("div",{className:c.admonitionContent,children:n}):null}function h(e){const{type:n,icon:t,title:i,children:o,className:r}=e;return(0,s.jsxs)(d,{type:n,className:r,children:[(0,s.jsx)(u,{title:i,icon:t}),(0,s.jsx)(m,{children:o})]})}function f(e){return(0,s.jsx)("svg",{viewBox:"0 0 14 16",...e,children:(0,s.jsx)("path",{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})})}const g={icon:(0,s.jsx)(f,{}),title:(0,s.jsx)(a.A,{id:"theme.admonition.note",description:"The default label used for the Note admonition (:::note)",children:"note"})};function x(e){return(0,s.jsx)(h,{...g,...e,className:(0,r.A)("alert alert--secondary",e.className),children:e.children})}function p(e){return(0,s.jsx)("svg",{viewBox:"0 0 12 16",...e,children:(0,s.jsx)("path",{fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"})})}const j={icon:(0,s.jsx)(p,{}),title:(0,s.jsx)(a.A,{id:"theme.admonition.tip",description:"The default label used for the Tip admonition (:::tip)",children:"tip"})};function v(e){return(0,s.jsx)(h,{...j,...e,className:(0,r.A)("alert alert--success",e.className),children:e.children})}function A(e){return(0,s.jsx)("svg",{viewBox:"0 0 14 16",...e,children:(0,s.jsx)("path",{fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"})})}const N={icon:(0,s.jsx)(A,{}),title:(0,s.jsx)(a.A,{id:"theme.admonition.info",description:"The default label used for the Info admonition (:::info)",children:"info"})};function b(e){return(0,s.jsx)(h,{...N,...e,className:(0,r.A)("alert alert--info",e.className),children:e.children})}function w(e){return(0,s.jsx)("svg",{viewBox:"0 0 16 16",...e,children:(0,s.jsx)("path",{fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"})})}const T={icon:(0,s.jsx)(w,{}),title:(0,s.jsx)(a.A,{id:"theme.admonition.warning",description:"The default label used for the Warning admonition (:::warning)",children:"warning"})};function y(e){return(0,s.jsx)("svg",{viewBox:"0 0 12 16",...e,children:(0,s.jsx)("path",{fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"})})}const C={icon:(0,s.jsx)(y,{}),title:(0,s.jsx)(a.A,{id:"theme.admonition.danger",description:"The default label used for the Danger admonition (:::danger)",children:"danger"})};const P={icon:(0,s.jsx)(w,{}),title:(0,s.jsx)(a.A,{id:"theme.admonition.caution",description:"The default label used for the Caution admonition (:::caution)",children:"caution"})};const M={...{note:x,tip:v,info:b,warning:function(e){return(0,s.jsx)(h,{...T,...e,className:(0,r.A)("alert alert--warning",e.className),children:e.children})},danger:function(e){return(0,s.jsx)(h,{...C,...e,className:(0,r.A)("alert alert--danger",e.className),children:e.children})}},...{secondary:e=>(0,s.jsx)(x,{title:"secondary",...e}),important:e=>(0,s.jsx)(b,{title:"important",...e}),success:e=>(0,s.jsx)(v,{title:"success",...e}),caution:function(e){return(0,s.jsx)(h,{...P,...e,className:(0,r.A)("alert alert--warning",e.className),children:e.children})}}};function z(e){const n=o(e),t=(i=n.type,M[i]||(console.warn(`No admonition component found for admonition type "${i}". Using Info as fallback.`),M.info));var i;return(0,s.jsx)(t,{...n})}},7131:(e,n,t)=>{t.d(n,{e:()=>l,i:()=>a});var i=t(6540),s=t(9532),o=t(4848);const r=i.createContext(null);function a(e){let{children:n,content:t,isBlogPostPage:s=!1}=e;const a=function(e){let{content:n,isBlogPostPage:t}=e;return(0,i.useMemo)((()=>({metadata:n.metadata,frontMatter:n.frontMatter,assets:n.assets,toc:n.toc,isBlogPostPage:t})),[n,t])}({content:t,isBlogPostPage:s});return(0,o.jsx)(r.Provider,{value:a,children:n})}function l(){const e=(0,i.useContext)(r);if(null===e)throw new s.dV("BlogPostProvider");return e}},4370:(e,n,t)=>{t.d(n,{A:()=>o});t(6540);var i=t(615),s=t(4848);function o(e){const{sidebar:n,toc:t,children:o,...r}=e;return(0,s.jsx)(i.A,{...r,children:(0,s.jsx)("div",{className:"container margin-vert--lg",children:(0,s.jsx)("div",{className:"row",children:(0,s.jsx)("main",{className:"col col--12",itemScope:!0,itemType:"http://schema.org/Blog",children:o})})})})}},5189:(e,n,t)=>{t.d(n,{A:()=>c});t(6540);var i=t(53),s=t(8774),o=t(7131);const r={container:"container_cYdn",cardContainer:"cardContainer_vWhh",cardTitle:"cardTitle_UHJa"};var a=t(4848);function l(e){let{className:n}=e;const{metadata:t,assets:l}=(0,o.e)(),c=l.image??t.frontMatter.image,{permalink:d}=t,{title:u}=t;return(0,a.jsx)("div",{className:(0,i.A)(r.container,"col col--4",n),children:(0,a.jsx)(s.A,{className:(0,i.A)("card padding--xl",r.cardContainer),href:d,style:{backgroundImage:`url(${c})`},children:(0,a.jsx)("h1",{className:(0,i.A)("text--truncate",r.cardTitle),title:u,children:u})})})}function c(e){let{items:n}=e;const t=n.sort(((e,n)=>e.content.metadata.title>n.content.metadata.title));return(0,a.jsx)(a.Fragment,{children:t.map((e=>{let{content:n}=e;return(0,a.jsx)(o.i,{content:n,children:(0,a.jsx)(l,{})},n.metadata.permalink)}))})}},9684:(e,n,t)=>{t.r(n),t.d(n,{default:()=>B});var i=t(6540),s=t(53),o=t(1312),r=t(4586);const a=["zero","one","two","few","many","other"];function l(e){return a.filter((n=>e.includes(n)))}const c={locale:"en",pluralForms:l(["one","other"]),select:e=>1===e?"one":"other"};function d(){const{i18n:{currentLocale:e}}=(0,r.A)();return(0,i.useMemo)((()=>{try{return function(e){const n=new Intl.PluralRules(e);return{locale:e,pluralForms:l(n.resolvedOptions().pluralCategories),select:e=>n.select(e)}}(e)}catch(n){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to the default (English) implementation.\nError: ${n.message}\n`),c}}),[e])}function u(){const e=d();return{selectMessage:(n,t)=>function(e,n,t){const i=e.split("|");if(1===i.length)return i[0];i.length>t.pluralForms.length&&console.error(`For locale=${t.locale}, a maximum of ${t.pluralForms.length} plural forms are expected (${t.pluralForms.join(",")}), but the message contains ${i.length}: ${e}`);const s=t.select(n),o=t.pluralForms.indexOf(s);return i[Math.min(o,i.length-1)]}(t,n,e)}}var m=t(1003),h=t(7559),f=t(8774),g=t(4370),x=t(1463),p=t(5189),j=t(5260),v=t(4848);function A(){return(0,v.jsx)(o.A,{id:"theme.unlistedContent.title",description:"The unlisted content banner title",children:"Unlisted page"})}function N(){return(0,v.jsx)(o.A,{id:"theme.unlistedContent.message",description:"The unlisted content banner message",children:"This page is unlisted. Search engines will not index it, and only users having a direct link can access it."})}function b(){return(0,v.jsx)(j.A,{children:(0,v.jsx)("meta",{name:"robots",content:"noindex, nofollow"})})}var w=t(7293);function T(e){let{className:n}=e;return(0,v.jsx)(w.A,{type:"caution",title:(0,v.jsx)(A,{}),className:(0,s.A)(n,h.G.common.unlistedBanner),children:(0,v.jsx)(N,{})})}function y(e){return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(b,{}),(0,v.jsx)(T,{...e})]})}const C={container:"container_Wcv6"};function P(e){const n=function(){const{selectMessage:e}=u();return n=>e(n,(0,o.T)({description:'Pluralized label for "{count} posts". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"Una receta|{count} recetas"},{count:n}))}();return(0,o.T)({description:"The title of the page for a blog tag",message:'{nPosts} etiquetadas como "{tagName}"'},{nPosts:n(e.count),tagName:e.label})}function M(e){let{tag:n}=e;const t=P(n);return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(m.be,{title:t}),(0,v.jsx)(x.A,{tag:"recipes_tags_posts"})]})}function z(e){let{tag:n,items:t}=e;const i=P(n);return(0,v.jsxs)(g.A,{children:[n.unlisted&&(0,v.jsx)(y,{}),(0,v.jsxs)("header",{className:"margin-bottom--xl",children:[(0,v.jsx)("h1",{children:i}),(0,v.jsx)(f.A,{href:n.allTagsPath,children:(0,v.jsx)(o.A,{id:"theme.tags.tagsPageLink",description:"The label of the link targeting the tag list page",children:"View All Tags"})})]}),(0,v.jsx)("div",{className:C.container,children:(0,v.jsx)(p.A,{items:t})})]})}function B(e){return(0,v.jsxs)(m.e3,{className:(0,s.A)(h.G.wrapper.blogPages,h.G.page.blogTagPostListPage),children:[(0,v.jsx)(M,{...e}),(0,v.jsx)(z,{...e})]})}},53:(e,n,t)=>{function i(e){var n,t,s="";if("string"==typeof e||"number"==typeof e)s+=e;else if("object"==typeof e)if(Array.isArray(e))for(n=0;n<e.length;n++)e[n]&&(t=i(e[n]))&&(s&&(s+=" "),s+=t);else for(n in e)e[n]&&(s&&(s+=" "),s+=n);return s}t.d(n,{A:()=>s});const s=function(){for(var e,n,t=0,s="";t<arguments.length;)(e=arguments[t++])&&(n=i(e))&&(s&&(s+=" "),s+=n);return s}}}]);
"use strict";(self.webpackChunkrecetas=self.webpackChunkrecetas||[]).push([[4813],{5213:(e,t,n)=>{n.d(t,{A:()=>a});n(6540);var s=n(9377),r=n(4848);function a(e){const{sidebar:t,toc:n,children:a,...l}=e;return(0,r.jsx)(s.A,{...l,children:(0,r.jsx)("div",{className:"container margin-vert--lg",children:(0,r.jsx)("div",{className:"row",children:(0,r.jsx)("main",{className:"col col--12",itemScope:!0,itemType:"http://schema.org/Blog",children:a})})})})}},6567:(e,t,n)=>{n.d(t,{A:()=>o});n(6540);var s=n(4164),r=n(6289),a=n(3750);const l={container:"container_cYdn",cardContainer:"cardContainer_vWhh",cardTitle:"cardTitle_UHJa"};var c=n(4848);function i(e){let{className:t}=e;const{metadata:n,assets:i}=(0,a.e7)(),o=i.image??n.frontMatter.image,{permalink:u}=n,{title:d}=n;return(0,c.jsx)("div",{className:(0,s.A)(l.container,"col col--4",t),children:(0,c.jsx)(r.A,{className:(0,s.A)("card padding--xl",l.cardContainer),href:u,style:{backgroundImage:`url(${o})`},children:(0,c.jsx)("h1",{className:(0,s.A)("text--truncate",l.cardTitle),title:d,children:d})})})}function o(e){let{items:t}=e;const n=t.sort(((e,t)=>e.content.metadata.title>t.content.metadata.title));return(0,c.jsx)(c.Fragment,{children:n.map((e=>{let{content:t}=e;return(0,c.jsx)(a.in,{content:t,children:(0,c.jsx)(i,{})},t.metadata.permalink)}))})}},4043:(e,t,n)=>{n.r(t),n.d(t,{default:()=>_});var s=n(6540),r=n(4164),a=n(539),l=n(797);const c=["zero","one","two","few","many","other"];function i(e){return c.filter((t=>e.includes(t)))}const o={locale:"en",pluralForms:i(["one","other"]),select:e=>1===e?"one":"other"};function u(){const{i18n:{currentLocale:e}}=(0,l.A)();return(0,s.useMemo)((()=>{try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:i(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to the default (English) implementation.\nError: ${t.message}\n`),o}}),[e])}function d(){const e=u();return{selectMessage:(t,n)=>function(e,t,n){const s=e.split("|");if(1===s.length)return s[0];s.length>n.pluralForms.length&&console.error(`For locale=${n.locale}, a maximum of ${n.pluralForms.length} plural forms are expected (${n.pluralForms.join(",")}), but the message contains ${s.length}: ${e}`);const r=n.select(t),a=n.pluralForms.indexOf(r);return s[Math.min(a,s.length-1)]}(n,t,e)}}var m=n(1082),h=n(204),g=n(6289),p=n(5213),x=n(7220),f=n(6567),j=n(7143),b=n(4848);function A(){return(0,b.jsx)(a.A,{id:"theme.contentVisibility.unlistedBanner.title",description:"The unlisted content banner title",children:"Unlisted page"})}function v(){return(0,b.jsx)(a.A,{id:"theme.contentVisibility.unlistedBanner.message",description:"The unlisted content banner message",children:"This page is unlisted. Search engines will not index it, and only users having a direct link can access it."})}function w(){return(0,b.jsx)(j.A,{children:(0,b.jsx)("meta",{name:"robots",content:"noindex, nofollow"})})}var N=n(2362);function T(e){let{className:t}=e;return(0,b.jsx)(N.A,{type:"caution",title:(0,b.jsx)(A,{}),className:(0,r.A)(t,h.G.common.unlistedBanner),children:(0,b.jsx)(v,{})})}function k(e){return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(w,{}),(0,b.jsx)(T,{...e})]})}const F={container:"container_Wcv6"};function y(e){const t=function(){const{selectMessage:e}=d();return t=>e(t,(0,a.T)({description:'Pluralized label for "{count} posts". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"Una receta|{count} recetas"},{count:t}))}();return(0,a.T)({description:"The title of the page for a blog tag",message:'{nPosts} etiquetadas como "{tagName}"'},{nPosts:t(e.count),tagName:e.label})}function P(e){let{tag:t}=e;const n=y(t);return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(m.be,{title:n}),(0,b.jsx)(x.A,{tag:"recipes_tags_posts"})]})}function $(e){let{tag:t,items:n}=e;const s=y(t);return(0,b.jsxs)(p.A,{children:[t.unlisted&&(0,b.jsx)(k,{}),(0,b.jsxs)("header",{className:"margin-bottom--xl",children:[(0,b.jsx)("h1",{children:s}),(0,b.jsx)(g.A,{href:t.allTagsPath,children:(0,b.jsx)(a.A,{id:"theme.tags.tagsPageLink",description:"The label of the link targeting the tag list page",children:"View All Tags"})})]}),(0,b.jsx)("div",{className:F.container,children:(0,b.jsx)(f.A,{items:n})})]})}function _(e){return(0,b.jsxs)(m.e3,{className:(0,r.A)(h.G.wrapper.blogPages,h.G.page.blogTagPostListPage),children:[(0,b.jsx)(P,{...e}),(0,b.jsx)($,{...e})]})}}}]);
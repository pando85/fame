"use strict";(self.webpackChunkrecetas=self.webpackChunkrecetas||[]).push([[3089],{9460:(e,t,n)=>{n.d(t,{C:()=>o,n:()=>l});var a=n(7294),r=n(902);const c=a.createContext(null);function l(e){let{children:t,content:n,isBlogPostPage:r=!1}=e;const l=function(e){let{content:t,isBlogPostPage:n}=e;return(0,a.useMemo)((()=>({metadata:t.metadata,frontMatter:t.frontMatter,assets:t.assets,toc:t.toc,isBlogPostPage:n})),[t,n])}({content:n,isBlogPostPage:r});return a.createElement(c.Provider,{value:l},t)}function o(){const e=(0,a.useContext)(c);if(null===e)throw new r.i6("BlogPostProvider");return e}},1627:(e,t,n)=>{n.d(t,{Z:()=>c});var a=n(7294),r=n(1074);function c(e){const{sidebar:t,toc:n,children:c,...l}=e;return a.createElement(r.Z,l,a.createElement("div",{className:"container margin-vert--lg"},a.createElement("div",{className:"row"},a.createElement("main",{className:"col col--12",itemScope:!0,itemType:"http://schema.org/Blog"},c))))}},5604:(e,t,n)=>{n.r(t),n.d(t,{default:()=>E});var a=n(7294),r=n(6010),c=n(2263),l=n(1944),o=n(5281),s=n(1627),i=n(197),m=n(8442);const u="container_NYnH";function d(e){const{metadata:t}=e,{siteConfig:{title:n}}=(0,c.Z)(),{blogDescription:r,blogTitle:o,permalink:s}=t,m="/"===s?n:o;return a.createElement(a.Fragment,null,a.createElement(l.d,{title:m,description:r}),a.createElement(i.Z,{tag:"blog_posts_list"}))}function g(e){const{items:t}=e;return a.createElement(s.Z,null,a.createElement("div",{className:u},a.createElement(m.Z,{items:t})))}function E(e){return a.createElement(l.FG,{className:(0,r.Z)(o.k.wrapper.blogPages,o.k.page.blogListPage)},a.createElement(d,e),a.createElement(g,e))}},8442:(e,t,n)=>{n.d(t,{Z:()=>u});var a=n(7294),r=n(6010),c=n(9960),l=n(9460);const o="container_cYdn",s="cardContainer_vWhh",i="cardTitle_UHJa";function m(e){let{className:t}=e;const{metadata:n,assets:m}=(0,l.C)(),u=m.image??n.frontMatter.image,{permalink:d}=n,{title:g}=n;return a.createElement("div",{className:(0,r.Z)(o,"col col--4",t)},a.createElement(c.Z,{className:(0,r.Z)("card padding--xl",s),href:d,style:{backgroundImage:`url(${u})`}},a.createElement("h1",{className:(0,r.Z)("text--truncate",i),title:g},g)))}function u(e){let{items:t}=e;const n=t.sort(((e,t)=>e.content.metadata.title>t.content.metadata.title));return a.createElement(a.Fragment,null,n.map((e=>{let{content:t}=e;return a.createElement(l.n,{key:t.metadata.permalink,content:t},a.createElement(m,null))})))}}}]);
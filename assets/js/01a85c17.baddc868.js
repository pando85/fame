"use strict";(self.webpackChunkrecetas=self.webpackChunkrecetas||[]).push([[8209],{9158:(e,t,a)=>{a.r(t),a.d(t,{default:()=>p});a(6540);var s=a(8215),r=a(1312);const l=()=>(0,r.T)({id:"theme.tags.tagsPageTitle",message:"Tags",description:"The title of the tag list page"});var n=a(1003),c=a(7559),i=a(4370),g=a(6133),o=a(1107);const h={tag:"tag_Nnez"};var u=a(4848);function d(e){let{letterEntry:t}=e;return(0,u.jsxs)("article",{children:[(0,u.jsx)(o.A,{as:"h2",id:t.letter,children:t.letter}),(0,u.jsx)("ul",{className:"padding--none",children:t.tags.map((e=>(0,u.jsx)("li",{className:h.tag,children:(0,u.jsx)(g.A,{...e})},e.permalink)))}),(0,u.jsx)("hr",{})]})}function m(e){let{tags:t}=e;const a=function(e){const t={};return Object.values(e).forEach((e=>{const a=function(e){return e[0].toUpperCase()}(e.label);t[a]??=[],t[a].push(e)})),Object.entries(t).sort(((e,t)=>{let[a]=e,[s]=t;return a.localeCompare(s)})).map((e=>{let[t,a]=e;return{letter:t,tags:a.sort(((e,t)=>e.label.localeCompare(t.label)))}}))}(t);return(0,u.jsx)("section",{className:"margin-vert--lg",children:a.map((e=>(0,u.jsx)(d,{letterEntry:e},e.letter)))})}var j=a(1463);function p(e){let{tags:t,sidebar:a}=e;const r=l();return(0,u.jsxs)(n.e3,{className:(0,s.A)(c.G.wrapper.blogPages,c.G.page.blogTagsListPage),children:[(0,u.jsx)(n.be,{title:r}),(0,u.jsx)(j.A,{tag:"blog_tags_list"}),(0,u.jsxs)(i.A,{sidebar:a,children:[(0,u.jsx)(o.A,{as:"h1",children:r}),(0,u.jsx)(m,{tags:t})]})]})}},6133:(e,t,a)=>{a.d(t,{A:()=>c});a(6540);var s=a(8215),r=a(8774);const l={tag:"tag_zVej",tagRegular:"tagRegular_sFm0",tagWithCount:"tagWithCount_h2kH"};var n=a(4848);function c(e){let{permalink:t,label:a,count:c}=e;return(0,n.jsxs)(r.A,{href:t,className:(0,s.A)(l.tag,c?l.tagWithCount:l.tagRegular),children:[a,c&&(0,n.jsx)("span",{children:c})]})}},4370:(e,t,a)=>{a.d(t,{A:()=>l});a(6540);var s=a(615),r=a(4848);function l(e){const{sidebar:t,toc:a,children:l,...n}=e;return(0,r.jsx)(s.A,{...n,children:(0,r.jsx)("div",{className:"container margin-vert--lg",children:(0,r.jsx)("div",{className:"row",children:(0,r.jsx)("main",{className:"col col--12",itemScope:!0,itemType:"http://schema.org/Blog",children:l})})})})}}}]);
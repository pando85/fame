(self.webpackChunkrecetas=self.webpackChunkrecetas||[]).push([[6535],{3905:(e,t,n)=>{"use strict";n.d(t,{Zo:()=>m,kt:()=>p});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=o.createContext({}),i=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},m=function(e){var t=i(e.components);return o.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},d=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,s=e.parentName,m=c(e,["components","mdxType","originalType","parentName"]),d=i(n),p=r,f=d["".concat(s,".").concat(p)]||d[p]||u[p]||a;return n?o.createElement(f,l(l({ref:t},m),{},{components:n})):o.createElement(f,l({ref:t},m))}));function p(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,l=new Array(a);l[0]=d;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:r,l[1]=c;for(var i=2;i<a;i++)l[i]=n[i];return o.createElement.apply(null,l)}return o.createElement.apply(null,n)}d.displayName="MDXCreateElement"},3612:(e,t,n)=>{"use strict";n.d(t,{Z:()=>f});var o=n(7294),r=n(6010),a=n(5281),l=n(5999);const c="admonition_LlT9",s="admonitionHeading_tbUL",i="admonitionIcon_kALy",m="admonitionContent_S0QG";const u={note:{infimaClassName:"secondary",iconComponent:function(){return o.createElement("svg",{viewBox:"0 0 14 16"},o.createElement("path",{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))},label:o.createElement(l.Z,{id:"theme.admonition.note",description:"The default label used for the Note admonition (:::note)"},"note")},tip:{infimaClassName:"success",iconComponent:function(){return o.createElement("svg",{viewBox:"0 0 12 16"},o.createElement("path",{fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))},label:o.createElement(l.Z,{id:"theme.admonition.tip",description:"The default label used for the Tip admonition (:::tip)"},"tip")},danger:{infimaClassName:"danger",iconComponent:function(){return o.createElement("svg",{viewBox:"0 0 12 16"},o.createElement("path",{fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))},label:o.createElement(l.Z,{id:"theme.admonition.danger",description:"The default label used for the Danger admonition (:::danger)"},"danger")},info:{infimaClassName:"info",iconComponent:function(){return o.createElement("svg",{viewBox:"0 0 14 16"},o.createElement("path",{fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))},label:o.createElement(l.Z,{id:"theme.admonition.info",description:"The default label used for the Info admonition (:::info)"},"info")},caution:{infimaClassName:"warning",iconComponent:function(){return o.createElement("svg",{viewBox:"0 0 16 16"},o.createElement("path",{fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))},label:o.createElement(l.Z,{id:"theme.admonition.caution",description:"The default label used for the Caution admonition (:::caution)"},"caution")}},d={secondary:"note",important:"info",success:"tip",warning:"danger"};function p(e){const{mdxAdmonitionTitle:t,rest:n}=function(e){const t=o.Children.toArray(e),n=t.find((e=>{var t;return o.isValidElement(e)&&"mdxAdmonitionTitle"===(null==(t=e.props)?void 0:t.mdxType)})),r=o.createElement(o.Fragment,null,t.filter((e=>e!==n)));return{mdxAdmonitionTitle:n,rest:r}}(e.children);return{...e,title:e.title??t,children:n}}function f(e){const{children:t,type:n,title:l,icon:f}=p(e),g=function(e){const t=d[e]??e;return u[t]||(console.warn(`No admonition config found for admonition type "${t}". Using Info as fallback.`),u.info)}(n),h=l??g.label,{iconComponent:y}=g,b=f??o.createElement(y,null);return o.createElement("div",{className:(0,r.Z)(a.k.common.admonition,a.k.common.admonitionType(e.type),"alert",`alert--${g.infimaClassName}`,c)},o.createElement("div",{className:s},o.createElement("span",{className:i},b),h),o.createElement("div",{className:m},t))}},1284:(e,t,n)=>{"use strict";n.d(t,{Z:()=>Oe});var o=n(7294),r=n(6010),a=n(9460),l=n(4996);function c(e){let{children:t,className:n}=e;const{frontMatter:r,assets:c}=(0,a.C)(),{withBaseUrl:s}=(0,l.C)(),i=c.image??r.image;return o.createElement("article",{className:n,itemProp:"blogPost",itemScope:!0,itemType:"http://schema.org/BlogPosting"},i&&o.createElement("meta",{itemProp:"image",content:s(i,{absolute:!0})}),t)}var s=n(2076),i=n(8780),m=n(3905),u=n(7462),d=n(5742);var p=n(2389),f=n(2949),g=n(6668);function h(){const{prism:e}=(0,g.L)(),{colorMode:t}=(0,f.I)(),n=e.theme,o=e.darkTheme||n;return"dark"===t?o:n}var y=n(5281),b=n(7594),v=n.n(b);const E=/title=(?<quote>["'])(?<title>.*?)\1/,k=/\{(?<range>[\d,-]+)\}/,N={js:{start:"\\/\\/",end:""},jsBlock:{start:"\\/\\*",end:"\\*\\/"},jsx:{start:"\\{\\s*\\/\\*",end:"\\*\\/\\s*\\}"},bash:{start:"#",end:""},html:{start:"\x3c!--",end:"--\x3e"}};function C(e,t){const n=e.map((e=>{const{start:n,end:o}=N[e];return`(?:${n}\\s*(${t.flatMap((e=>{var t,n;return[e.line,null==(t=e.block)?void 0:t.start,null==(n=e.block)?void 0:n.end].filter(Boolean)})).join("|")})\\s*${o})`})).join("|");return new RegExp(`^\\s*(?:${n})\\s*$`)}function B(e,t){let n=e.replace(/\n$/,"");const{language:o,magicComments:r,metastring:a}=t;if(a&&k.test(a)){const e=a.match(k).groups.range;if(0===r.length)throw new Error(`A highlight range has been given in code block's metastring (\`\`\` ${a}), but no magic comment config is available. Docusaurus applies the first magic comment entry's className for metastring ranges.`);const t=r[0].className,o=v()(e).filter((e=>e>0)).map((e=>[e-1,[t]]));return{lineClassNames:Object.fromEntries(o),code:n}}if(void 0===o)return{lineClassNames:{},code:n};const l=function(e,t){switch(e){case"js":case"javascript":case"ts":case"typescript":return C(["js","jsBlock"],t);case"jsx":case"tsx":return C(["js","jsBlock","jsx"],t);case"html":return C(["js","jsBlock","html"],t);case"python":case"py":case"bash":return C(["bash"],t);case"markdown":case"md":return C(["html","jsx","bash"],t);default:return C(Object.keys(N),t)}}(o,r),c=n.split("\n"),s=Object.fromEntries(r.map((e=>[e.className,{start:0,range:""}]))),i=Object.fromEntries(r.filter((e=>e.line)).map((e=>{let{className:t,line:n}=e;return[n,t]}))),m=Object.fromEntries(r.filter((e=>e.block)).map((e=>{let{className:t,block:n}=e;return[n.start,t]}))),u=Object.fromEntries(r.filter((e=>e.block)).map((e=>{let{className:t,block:n}=e;return[n.end,t]})));for(let p=0;p<c.length;){const e=c[p].match(l);if(!e){p+=1;continue}const t=e.slice(1).find((e=>void 0!==e));i[t]?s[i[t]].range+=`${p},`:m[t]?s[m[t]].start=p:u[t]&&(s[u[t]].range+=`${s[u[t]].start}-${p-1},`),c.splice(p,1)}n=c.join("\n");const d={};return Object.entries(s).forEach((e=>{let[t,{range:n}]=e;v()(n).forEach((e=>{d[e]??=[],d[e].push(t)}))})),{lineClassNames:d,code:n}}const w="codeBlockContainer_Ckt0";function T(e){let{as:t,...n}=e;const a=function(e){const t={color:"--prism-color",backgroundColor:"--prism-background-color"},n={};return Object.entries(e.plain).forEach((e=>{let[o,r]=e;const a=t[o];a&&"string"==typeof r&&(n[a]=r)})),n}(h());return o.createElement(t,(0,u.Z)({},n,{style:a,className:(0,r.Z)(n.className,w,y.k.common.codeBlock)}))}const Z={codeBlockContent:"codeBlockContent_biex",codeBlockTitle:"codeBlockTitle_Ktv7",codeBlock:"codeBlock_bY9V",codeBlockStandalone:"codeBlockStandalone_MEMb",codeBlockLines:"codeBlockLines_e6Vv",codeBlockLinesWithNumbering:"codeBlockLinesWithNumbering_o6Pm",buttonGroup:"buttonGroup__atx"};function P(e){let{children:t,className:n}=e;return o.createElement(T,{as:"pre",tabIndex:0,className:(0,r.Z)(Z.codeBlockStandalone,"thin-scrollbar",n)},o.createElement("code",{className:Z.codeBlockLines},t))}var j=n(902);const x={attributes:!0,characterData:!0,childList:!0,subtree:!0};function L(e,t){const[n,r]=(0,o.useState)(),a=(0,o.useCallback)((()=>{var t;r(null==(t=e.current)?void 0:t.closest("[role=tabpanel][hidden]"))}),[e,r]);(0,o.useEffect)((()=>{a()}),[a]),function(e,t,n){void 0===n&&(n=x);const r=(0,j.zX)(t),a=(0,j.Ql)(n);(0,o.useEffect)((()=>{const t=new MutationObserver(r);return e&&t.observe(e,a),()=>t.disconnect()}),[e,r,a])}(n,(e=>{e.forEach((e=>{"attributes"===e.type&&"hidden"===e.attributeName&&(t(),a())}))}),{attributes:!0,characterData:!1,childList:!1,subtree:!1})}const O={plain:{backgroundColor:"#2a2734",color:"#9a86fd"},styles:[{types:["comment","prolog","doctype","cdata","punctuation"],style:{color:"#6c6783"}},{types:["namespace"],style:{opacity:.7}},{types:["tag","operator","number"],style:{color:"#e09142"}},{types:["property","function"],style:{color:"#9a86fd"}},{types:["tag-id","selector","atrule-id"],style:{color:"#eeebff"}},{types:["attr-name"],style:{color:"#c4b9fe"}},{types:["boolean","string","entity","url","attr-value","keyword","control","directive","unit","statement","regex","atrule","placeholder","variable"],style:{color:"#ffcc99"}},{types:["deleted"],style:{textDecorationLine:"line-through"}},{types:["inserted"],style:{textDecorationLine:"underline"}},{types:["italic"],style:{fontStyle:"italic"}},{types:["important","bold"],style:{fontWeight:"bold"}},{types:["important"],style:{color:"#c4b9fe"}}]};var _={Prism:n(7410).Z,theme:O};function S(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function M(){return M=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},M.apply(this,arguments)}var z=/\r\n|\r|\n/,A=function(e){0===e.length?e.push({types:["plain"],content:"\n",empty:!0}):1===e.length&&""===e[0].content&&(e[0].content="\n",e[0].empty=!0)},I=function(e,t){var n=e.length;return n>0&&e[n-1]===t?e:e.concat(t)},D=function(e,t){var n=e.plain,o=Object.create(null),r=e.styles.reduce((function(e,n){var o=n.languages,r=n.style;return o&&!o.includes(t)||n.types.forEach((function(t){var n=M({},e[t],r);e[t]=n})),e}),o);return r.root=n,r.plain=M({},n,{backgroundColor:null}),r};function R(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&-1===t.indexOf(o)&&(n[o]=e[o]);return n}const H=function(e){function t(){for(var t=this,n=[],o=arguments.length;o--;)n[o]=arguments[o];e.apply(this,n),S(this,"getThemeDict",(function(e){if(void 0!==t.themeDict&&e.theme===t.prevTheme&&e.language===t.prevLanguage)return t.themeDict;t.prevTheme=e.theme,t.prevLanguage=e.language;var n=e.theme?D(e.theme,e.language):void 0;return t.themeDict=n})),S(this,"getLineProps",(function(e){var n=e.key,o=e.className,r=e.style,a=M({},R(e,["key","className","style","line"]),{className:"token-line",style:void 0,key:void 0}),l=t.getThemeDict(t.props);return void 0!==l&&(a.style=l.plain),void 0!==r&&(a.style=void 0!==a.style?M({},a.style,r):r),void 0!==n&&(a.key=n),o&&(a.className+=" "+o),a})),S(this,"getStyleForToken",(function(e){var n=e.types,o=e.empty,r=n.length,a=t.getThemeDict(t.props);if(void 0!==a){if(1===r&&"plain"===n[0])return o?{display:"inline-block"}:void 0;if(1===r&&!o)return a[n[0]];var l=o?{display:"inline-block"}:{},c=n.map((function(e){return a[e]}));return Object.assign.apply(Object,[l].concat(c))}})),S(this,"getTokenProps",(function(e){var n=e.key,o=e.className,r=e.style,a=e.token,l=M({},R(e,["key","className","style","token"]),{className:"token "+a.types.join(" "),children:a.content,style:t.getStyleForToken(a),key:void 0});return void 0!==r&&(l.style=void 0!==l.style?M({},l.style,r):r),void 0!==n&&(l.key=n),o&&(l.className+=" "+o),l})),S(this,"tokenize",(function(e,t,n,o){var r={code:t,grammar:n,language:o,tokens:[]};e.hooks.run("before-tokenize",r);var a=r.tokens=e.tokenize(r.code,r.grammar,r.language);return e.hooks.run("after-tokenize",r),a}))}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.render=function(){var e=this.props,t=e.Prism,n=e.language,o=e.code,r=e.children,a=this.getThemeDict(this.props),l=t.languages[n];return r({tokens:function(e){for(var t=[[]],n=[e],o=[0],r=[e.length],a=0,l=0,c=[],s=[c];l>-1;){for(;(a=o[l]++)<r[l];){var i=void 0,m=t[l],u=n[l][a];if("string"==typeof u?(m=l>0?m:["plain"],i=u):(m=I(m,u.type),u.alias&&(m=I(m,u.alias)),i=u.content),"string"==typeof i){var d=i.split(z),p=d.length;c.push({types:m,content:d[0]});for(var f=1;f<p;f++)A(c),s.push(c=[]),c.push({types:m,content:d[f]})}else l++,t.push(m),n.push(i),o.push(0),r.push(i.length)}l--,t.pop(),n.pop(),o.pop(),r.pop()}return A(c),s}(void 0!==l?this.tokenize(t,o,l,n):[o]),className:"prism-code language-"+n,style:void 0!==a?a.root:{},getLineProps:this.getLineProps,getTokenProps:this.getTokenProps})},t}(o.Component),V="codeLine_lJS_",$="codeLineNumber_Tfdd",W="codeLineContent_feaV";function F(e){let{line:t,classNames:n,showLineNumbers:a,getLineProps:l,getTokenProps:c}=e;1===t.length&&"\n"===t[0].content&&(t[0].content="");const s=l({line:t,className:(0,r.Z)(n,a&&V)}),i=t.map(((e,t)=>o.createElement("span",(0,u.Z)({key:t},c({token:e,key:t})))));return o.createElement("span",s,a?o.createElement(o.Fragment,null,o.createElement("span",{className:$}),o.createElement("span",{className:W},i)):i,o.createElement("br",null))}var q=n(5999);const U={copyButtonCopied:"copyButtonCopied_obH4",copyButtonIcons:"copyButtonIcons_eSgA",copyButtonIcon:"copyButtonIcon_y97N",copyButtonSuccessIcon:"copyButtonSuccessIcon_LjdS"};function G(e){let{code:t,className:n}=e;const[a,l]=(0,o.useState)(!1),c=(0,o.useRef)(void 0),s=(0,o.useCallback)((()=>{!function(e,t){let{target:n=document.body}=void 0===t?{}:t;const o=document.createElement("textarea"),r=document.activeElement;o.value=e,o.setAttribute("readonly",""),o.style.contain="strict",o.style.position="absolute",o.style.left="-9999px",o.style.fontSize="12pt";const a=document.getSelection();let l=!1;a.rangeCount>0&&(l=a.getRangeAt(0)),n.append(o),o.select(),o.selectionStart=0,o.selectionEnd=e.length;let c=!1;try{c=document.execCommand("copy")}catch{}o.remove(),l&&(a.removeAllRanges(),a.addRange(l)),r&&r.focus()}(t),l(!0),c.current=window.setTimeout((()=>{l(!1)}),1e3)}),[t]);return(0,o.useEffect)((()=>()=>window.clearTimeout(c.current)),[]),o.createElement("button",{type:"button","aria-label":a?(0,q.I)({id:"theme.CodeBlock.copied",message:"Copied",description:"The copied button label on code blocks"}):(0,q.I)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),title:(0,q.I)({id:"theme.CodeBlock.copy",message:"Copy",description:"The copy button label on code blocks"}),className:(0,r.Z)("clean-btn",n,U.copyButton,a&&U.copyButtonCopied),onClick:s},o.createElement("span",{className:U.copyButtonIcons,"aria-hidden":"true"},o.createElement("svg",{className:U.copyButtonIcon,viewBox:"0 0 24 24"},o.createElement("path",{d:"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"})),o.createElement("svg",{className:U.copyButtonSuccessIcon,viewBox:"0 0 24 24"},o.createElement("path",{d:"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"}))))}const Q="wordWrapButtonIcon_Bwma",X="wordWrapButtonEnabled_EoeP";function Y(e){let{className:t,onClick:n,isEnabled:a}=e;const l=(0,q.I)({id:"theme.CodeBlock.wordWrapToggle",message:"Toggle word wrap",description:"The title attribute for toggle word wrapping button of code block lines"});return o.createElement("button",{type:"button",onClick:n,className:(0,r.Z)("clean-btn",t,a&&X),"aria-label":l,title:l},o.createElement("svg",{className:Q,viewBox:"0 0 24 24","aria-hidden":"true"},o.createElement("path",{fill:"currentColor",d:"M4 19h6v-2H4v2zM20 5H4v2h16V5zm-3 6H4v2h13.25c1.1 0 2 .9 2 2s-.9 2-2 2H15v-2l-3 3l3 3v-2h2c2.21 0 4-1.79 4-4s-1.79-4-4-4z"})))}function J(e){let{children:t,className:n="",metastring:a,title:l,showLineNumbers:c,language:s}=e;const{prism:{defaultLanguage:i,magicComments:m}}=(0,g.L)(),d=s??function(e){const t=e.split(" ").find((e=>e.startsWith("language-")));return null==t?void 0:t.replace(/language-/,"")}(n)??i,p=h(),f=function(){const[e,t]=(0,o.useState)(!1),[n,r]=(0,o.useState)(!1),a=(0,o.useRef)(null),l=(0,o.useCallback)((()=>{const n=a.current.querySelector("code");e?n.removeAttribute("style"):(n.style.whiteSpace="pre-wrap",n.style.overflowWrap="anywhere"),t((e=>!e))}),[a,e]),c=(0,o.useCallback)((()=>{const{scrollWidth:e,clientWidth:t}=a.current,n=e>t||a.current.querySelector("code").hasAttribute("style");r(n)}),[a]);return L(a,c),(0,o.useEffect)((()=>{c()}),[e,c]),(0,o.useEffect)((()=>(window.addEventListener("resize",c,{passive:!0}),()=>{window.removeEventListener("resize",c)})),[c]),{codeBlockRef:a,isEnabled:e,isCodeScrollable:n,toggle:l}}(),y=function(e){var t;return(null==e||null==(t=e.match(E))?void 0:t.groups.title)??""}(a)||l,{lineClassNames:b,code:v}=B(t,{metastring:a,language:d,magicComments:m}),k=c??function(e){return Boolean(null==e?void 0:e.includes("showLineNumbers"))}(a);return o.createElement(T,{as:"div",className:(0,r.Z)(n,d&&!n.includes(`language-${d}`)&&`language-${d}`)},y&&o.createElement("div",{className:Z.codeBlockTitle},y),o.createElement("div",{className:Z.codeBlockContent},o.createElement(H,(0,u.Z)({},_,{theme:p,code:v,language:d??"text"}),(e=>{let{className:t,tokens:n,getLineProps:a,getTokenProps:l}=e;return o.createElement("pre",{tabIndex:0,ref:f.codeBlockRef,className:(0,r.Z)(t,Z.codeBlock,"thin-scrollbar")},o.createElement("code",{className:(0,r.Z)(Z.codeBlockLines,k&&Z.codeBlockLinesWithNumbering)},n.map(((e,t)=>o.createElement(F,{key:t,line:e,getLineProps:a,getTokenProps:l,classNames:b[t],showLineNumbers:k})))))})),o.createElement("div",{className:Z.buttonGroup},(f.isEnabled||f.isCodeScrollable)&&o.createElement(Y,{className:Z.codeButton,onClick:()=>f.toggle(),isEnabled:f.isEnabled}),o.createElement(G,{className:Z.codeButton,code:v}))))}function K(e){let{children:t,...n}=e;const r=(0,p.Z)(),a=function(e){return o.Children.toArray(e).some((e=>(0,o.isValidElement)(e)))?e:Array.isArray(e)?e.join(""):e}(t),l="string"==typeof a?J:P;return o.createElement(l,(0,u.Z)({key:String(r)},n),a)}var ee=n(9960);var te=n(6043);const ne="details_lb9f",oe="isBrowser_bmU9",re="collapsibleContent_i85q";function ae(e){return!!e&&("SUMMARY"===e.tagName||ae(e.parentElement))}function le(e,t){return!!e&&(e===t||le(e.parentElement,t))}function ce(e){let{summary:t,children:n,...a}=e;const l=(0,p.Z)(),c=(0,o.useRef)(null),{collapsed:s,setCollapsed:i}=(0,te.u)({initialState:!a.open}),[m,d]=(0,o.useState)(a.open);return o.createElement("details",(0,u.Z)({},a,{ref:c,open:m,"data-collapsed":s,className:(0,r.Z)(ne,l&&oe,a.className),onMouseDown:e=>{ae(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const t=e.target;ae(t)&&le(t,c.current)&&(e.preventDefault(),s?(i(!1),d(!0)):i(!0))}}),t??o.createElement("summary",null,"Details"),o.createElement(te.z,{lazy:!1,collapsed:s,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{i(e),d(!e)}},o.createElement("div",{className:re},n)))}const se="details_b_Ee";function ie(e){let{...t}=e;return o.createElement(ce,(0,u.Z)({},t,{className:(0,r.Z)("alert alert--info",se,t.className)}))}const me="anchorWithStickyNavbar_LWe7",ue="anchorWithHideOnScrollNavbar_WYt5";function de(e){let{as:t,id:n,...a}=e;const{navbar:{hideOnScroll:l}}=(0,g.L)();return"h1"!==t&&n?o.createElement(t,(0,u.Z)({},a,{className:(0,r.Z)("anchor",l?ue:me),id:n}),a.children,o.createElement("a",{className:"hash-link",href:`#${n}`,title:(0,q.I)({id:"theme.common.headingLinkTitle",message:"Direct link to heading",description:"Title for link to heading"})},"\u200b")):o.createElement(t,(0,u.Z)({},a,{id:void 0}))}function pe(e){return o.createElement(de,e)}const fe="containsTaskList_mC6p";const ge="img_ev3q";var he=n(3612),ye=n(1875);const be={head:function(e){const t=o.Children.map(e.children,(e=>o.isValidElement(e)?function(e){var t;if(null!=(t=e.props)&&t.mdxType&&e.props.originalType){const{mdxType:t,originalType:n,...r}=e.props;return o.createElement(e.props.originalType,r)}return e}(e):e));return o.createElement(d.Z,e,t)},code:function(e){const t=["a","abbr","b","br","button","cite","code","del","dfn","em","i","img","input","ins","kbd","label","object","output","q","ruby","s","small","span","strong","sub","sup","time","u","var","wbr"];return o.Children.toArray(e.children).every((e=>{var n;return"string"==typeof e&&!e.includes("\n")||(0,o.isValidElement)(e)&&t.includes(null==(n=e.props)?void 0:n.mdxType)}))?o.createElement("code",e):o.createElement(K,e)},a:function(e){return o.createElement(ee.Z,e)},pre:function(e){var t;return o.createElement(K,(0,o.isValidElement)(e.children)&&"code"===(null==(t=e.children.props)?void 0:t.originalType)?e.children.props:{...e})},details:function(e){const t=o.Children.toArray(e.children),n=t.find((e=>{var t;return o.isValidElement(e)&&"summary"===(null==(t=e.props)?void 0:t.mdxType)})),r=o.createElement(o.Fragment,null,t.filter((e=>e!==n)));return o.createElement(ie,(0,u.Z)({},e,{summary:n}),r)},ul:function(e){return o.createElement("ul",(0,u.Z)({},e,{className:(t=e.className,(0,r.Z)(t,(null==t?void 0:t.includes("contains-task-list"))&&fe))}));var t},img:function(e){return o.createElement("img",(0,u.Z)({loading:"lazy"},e,{className:(t=e.className,(0,r.Z)(t,ge))}));var t},h1:e=>o.createElement(pe,(0,u.Z)({as:"h1"},e)),h2:e=>o.createElement(pe,(0,u.Z)({as:"h2"},e)),h3:e=>o.createElement(pe,(0,u.Z)({as:"h3"},e)),h4:e=>o.createElement(pe,(0,u.Z)({as:"h4"},e)),h5:e=>o.createElement(pe,(0,u.Z)({as:"h5"},e)),h6:e=>o.createElement(pe,(0,u.Z)({as:"h6"},e)),admonition:he.Z,mermaid:ye.Z};function ve(e){let{children:t}=e;return o.createElement(m.Zo,{components:be},t)}function Ee(e){let{children:t,className:n}=e;const{isBlogPostPage:l}=(0,a.C)();return o.createElement("div",{id:l?i.blogPostContainerID:void 0,className:(0,r.Z)("markdown",n),itemProp:"articleBody"},o.createElement(ve,null,t))}const ke="iconEdit_Z9Sw";function Ne(e){let{className:t,...n}=e;return o.createElement("svg",(0,u.Z)({fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,r.Z)(ke,t),"aria-hidden":"true"},n),o.createElement("g",null,o.createElement("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})))}function Ce(e){let{editUrl:t}=e;return o.createElement("a",{href:t,target:"_blank",rel:"noreferrer noopener",className:y.k.common.editThisPage},o.createElement(Ne,null),o.createElement(q.Z,{id:"theme.common.editThisPage",description:"The link label to edit the current page"},"Edit this page"))}var Be=n(3008);const we="tags_jXut",Te="tag_QGVx";function Ze(e){let{tags:t}=e;return o.createElement(o.Fragment,null,o.createElement("b",null,o.createElement(q.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list"},"Tags:")),o.createElement("ul",{className:(0,r.Z)(we,"padding--none","margin-left--sm")},t.map((e=>{let{label:t,permalink:n}=e;return o.createElement("li",{key:n,className:Te},o.createElement(Be.Z,{label:t,permalink:n}))}))))}function Pe(){return o.createElement("b",null,o.createElement(q.Z,{id:"theme.blog.post.readMore",description:"The label used in blog post item excerpts to link to full blog posts"},"Read More"))}function je(e){const{blogPostTitle:t,...n}=e;return o.createElement(ee.Z,(0,u.Z)({"aria-label":(0,q.I)({message:"Read more about {title}",id:"theme.blog.post.readMoreLabel",description:"The ARIA label for the link to full blog posts from excerpts"},{title:t})},n),o.createElement(Pe,null))}const xe="blogPostFooterDetailsFull_mRVl";function Le(){const{metadata:e,isBlogPostPage:t}=(0,a.C)(),{tags:n,title:l,editUrl:c,hasTruncateMarker:s}=e,i=!t&&s,m=n.length>0;return m||i||c?o.createElement("footer",{className:(0,r.Z)("row docusaurus-mt-lg",t&&xe)},m&&o.createElement("div",{className:(0,r.Z)("col",{"col--9":i})},o.createElement(Ze,{tags:n})),t&&c&&o.createElement("div",{className:"col margin-top--sm"},o.createElement(Ce,{editUrl:c})),i&&o.createElement("div",{className:(0,r.Z)("col text--right",{"col--3":m})},o.createElement(je,{blogPostTitle:l,to:e.permalink}))):null}function Oe(e){let{children:t,className:n}=e;const l=function(){const{isBlogPostPage:e}=(0,a.C)();return e?void 0:"margin-bottom--xl"}();return o.createElement(c,{className:(0,r.Z)(l,n)},o.createElement(s.Z,null),o.createElement(Ee,null,t),o.createElement(Le,null))}},2996:(e,t,n)=>{"use strict";n.d(t,{Z:()=>l});var o=n(7294),r=n(1944),a=n(9460);function l(){const{assets:e,metadata:t}=(0,a.C)(),{title:n,description:l,date:c,tags:s,authors:i,frontMatter:m}=t,{keywords:u}=m,d=e.image??m.image;return o.createElement(r.d,{title:n,description:l,keywords:u,image:d},o.createElement("meta",{property:"og:type",content:"article"}),o.createElement("meta",{property:"article:published_time",content:c}),i.some((e=>e.url))&&o.createElement("meta",{property:"article:author",content:i.map((e=>e.url)).filter(Boolean).join(",")}),s.length>0&&o.createElement("meta",{property:"article:tag",content:s.map((e=>e.label)).join(",")}))}},3008:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var o=n(7294),r=n(6010),a=n(9960);const l="tag_zVej",c="tagRegular_sFm0",s="tagWithCount_h2kH";function i(e){let{permalink:t,label:n,count:i}=e;return o.createElement(a.Z,{href:t,className:(0,r.Z)(l,i?s:c)},n,i&&o.createElement("span",null,i))}},9460:(e,t,n)=>{"use strict";n.d(t,{C:()=>c,n:()=>l});var o=n(7294),r=n(902);const a=o.createContext(null);function l(e){let{children:t,content:n,isBlogPostPage:r=!1}=e;const l=function(e){let{content:t,isBlogPostPage:n}=e;return(0,o.useMemo)((()=>({metadata:t.metadata,frontMatter:t.frontMatter,assets:t.assets,toc:t.toc,isBlogPostPage:n})),[t,n])}({content:n,isBlogPostPage:r});return o.createElement(a.Provider,{value:l},t)}function c(){const e=(0,o.useContext)(a);if(null===e)throw new r.i6("BlogPostProvider");return e}},7594:(e,t)=>{function n(e){let t,n=[];for(let o of e.split(",").map((e=>e.trim())))if(/^-?\d+$/.test(o))n.push(parseInt(o,10));else if(t=o.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/)){let[e,o,r,a]=t;if(o&&a){o=parseInt(o),a=parseInt(a);const e=o<a?1:-1;"-"!==r&&".."!==r&&"\u2025"!==r||(a+=e);for(let t=o;t!==a;t+=e)n.push(t)}}return n}t.default=n,e.exports=n}}]);
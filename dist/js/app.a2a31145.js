(function(){"use strict";var t={3891:function(t,e,n){var o=n(5130),r=n(6768),a=n(4232);function i(t,e,n,o,i,l){const s=(0,r.g2)("NavBar"),d=(0,r.g2)("ConverterPage");return(0,r.uX)(),(0,r.CE)("div",{class:(0,a.C4)(["h-screen",{dark:this.isDark}])},[(0,r.bF)(s,{class:"absolute h-[6.0rem] top-0 font-['Londrina_Shadow'] w-full",onChangeDarkMode:l.changeDarkMode},null,8,["onChangeDarkMode"]),(0,r.bF)(d,{class:"w-full h-full pt-[6.0rem] text-white"})],2)}const l=t=>((0,r.Qi)("data-v-fc66d1d6"),t=t(),(0,r.jt)(),t),s={class:"bged w-full h-full bg-cover bg-light-background dark:bg-dark-background transition-all duration-500"},d={class:"flex flex-row items-center justify-center h-full gap-10"},c={class:"flex flex-col w-[40%] min-h-[85%] bg-gradient-to-t from-[#8BA4C7] to-[#E3E9F2] dark:from-[#454444] dark:to-[#454444] transition-all duration-500 border-[#283146] border-[6px] rounded-xl"},u={class:"h-16 bg-[#3D4A6C] dark:bg-[#332D2D] transition-colors duration-500 border-[#283146] border-b-[6px] flex justify-between px-10 items-center"},p=l((()=>(0,r.Lk)("h2",{class:"font-['Crimson_Text'] font-semibold text-3xl"}," Json ",-1))),f={class:"h-full flex flex-col gap-5 p-10 items-center"},g=["textContent"],h=(0,r.Fv)('<div class="flex flex-col w-[40%] min-h-[85%] bg-gradient-to-t from-[#8BA4C7] to-[#E3E9F2] dark:from-[#454444] dark:to-[#454444] transition-all duration-500 border-[#283146] border-[6px] rounded-xl" data-v-fc66d1d6><nav class="h-16 bg-[#3D4A6C] dark:bg-[#332D2D] transition-colors duration-500 border-[#283146] border-b-[6px] flex justify-between px-10 items-center" data-v-fc66d1d6><h2 class="font-[&#39;Crimson_Text&#39;] font-semibold text-3xl" data-v-fc66d1d6> Csharp </h2><button class="material-symbols-outlined text-[2.5rem] text-[#FF867C]" data-v-fc66d1d6> cancel </button></nav><section class="h-full flex flex-col gap-5 p-10 items-center" data-v-fc66d1d6><pre id="output-editor" class="w-[100%] h-fit min-h-[40%] p-2 bg-white dark:bg-[#1E1E1E] transition-colors duration-500 border-[#283146] border-[6px] rounded-xl text-start" contenteditable="true" style="white-space:pre-wrap;overflow-wrap:break-word;" data-v-fc66d1d6><code class="language-cs" data-v-fc66d1d6></code></pre></section></div>',1);function b(t,e,n,o,i,l){return(0,r.uX)(),(0,r.CE)("div",s,[(0,r.Lk)("div",d,[(0,r.Lk)("div",c,[(0,r.Lk)("nav",u,[p,(0,r.Lk)("button",{onClick:e[0]||(e[0]=(...t)=>l.clearInput&&l.clearInput(...t)),class:"material-symbols-outlined text-[2.5rem] text-[#FF867C]"}," cancel ")]),(0,r.Lk)("section",f,[(0,r.Lk)("code",{onBlur:e[1]||(e[1]=(...t)=>l.onInputBlur&&l.onInputBlur(...t)),id:"input-editor",textContent:(0,a.v_)(i.inputEditor),class:"language-json w-[100%] h-fit min-h-[40%] text-black p-2 bg-white dark:bg-[#1E1E1E] dark:text-white transition-colors duration-500 border-[#283146] border-[6px] rounded-xl text-start",contenteditable:"true",style:{"white-space":"pre-wrap","overflow-wrap":"break-word"}},null,40,g)])]),h])])}n(4114);function v(){return console.log("Boolean handling"),{type:"Boolean"}}function m(t){console.log("Number handling "+t);var e=t.toString();return e.includes(".")?e.split(".")[1].length>7?{type:"Double"}:{type:"Float"}:t<-2147483648||t>2147483647?{type:"Long"}:{type:"Int"}}function y(t){return console.log("String handling "+t),"Invalid format"!=x(t)?x(t):{type:"String"}}function k(t){if(Array.isArray(t)){let e=[];for(let o in t){let n=C[typeof t[o]](t[o]).type;"Object"==n&&(n=w(t[o]).type),e.push(n)}let n=!0;for(let t of e)n=n&&t==e[0];return console.log("innerTypes "+e[0]+" all same = "+n),n?{type:"Array",innerType:e[0]}:{type:"Array",innerType:"Object"}}return{type:"Object"}}function x(t){const e=/^\d{4}-\d{2}-\d{2}$/,n=/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/;return e.test(t)?{type:"DateOnly"}:n.test(t)?{type:"DateTime"}:"Invalid format"}function w(t){var e=[];for(const n in t)console.log("Converting to Object intermediate "+n+" "+t[n]+" "+typeof t[n]+" "+C[typeof t[n]](t[n]).type),e.push({key:n,type:C[typeof t[n]](t[n]).type,value:t[n]});return e}var C={boolean:v,number:m,string:y,object:k},D=C;function E(t){return t.charAt(0).toUpperCase()+t.slice(1)}function j(t,e){var n="";const o={String:"string",Double:"double",Int:"int",Long:"long",DateOnly:"DateOnly",DateTime:"DateTime",Float:"float",Boolean:"bool",Object:"dynamic"};for(const r of t)"Array"==r.type.type?n+=`\n\tpublic ${o[r.type.innerType]}[] ${E(r.key)} { get; set; }`:"List"==r.type.type?n+=`\n\tpublic List<${o[r.type.innerType]}> ${E(r.key)} { get; set; }`:n+=`\n\tpublic ${o[r.type.type]} ${E(r.key)} { get; set; }`;return`public class ${e} { ${n} \n}`}var O=j,L=n(3498),S=n.n(L);n(627),n(3206),n(2006),n(1422),n(9399),n(7316),n(4569);S();var T={name:"ConverterPage",props:{},data(){return{jsonFormatValidationStack:[],isValid:!0,code:"",inputEditor:'{"username": "omar", "password": "1234"}'}},mounted(){this.onStart()},methods:{getCaretPosition(t){var e=window.getSelection();if(console.log("selection range "+e.rangeCount),console.log(e),e.rangeCount>0){var n=e.getRangeAt(0),o=n.cloneRange();return o.selectNodeContents(t),o.setEnd(n.endContainer,n.endOffset),console.log("selection length "+o.toString()),o.toString().length}return 0},setCaretPosition(t,e){var n=document.createRange(),o=window.getSelection();n.setStart(t.childNodes[0],e),n.collapse(!0),o.removeAllRanges(),o.addRange(n)},onInputBlur(){S().highlightElement(document.getElementById("input-editor"))},onStart(){var t=document.getElementById("input-editor");t.addEventListener("paste",(function(t){t.preventDefault();var e=(t.originalEvent||t).clipboardData.getData("text/plain");document.execCommand("insertHTML",!1,e)})),t.addEventListener("input",(e=>{console.log(e),console.log("Checking");var n=t.innerText;console.log("editor text :"+n+";"),this.ValidJson(n)&&this.ConvertToCSharp(n)}))},ValidJson(t){try{return JSON.parse(t),!0}catch(e){return console.error("Invalid JSON:",e),!1}},ConvertToIntermediate(t){var e=JSON.parse(t),n=[];for(const o in e)console.log("Converting to intermediate "+o+" "+e[o]+" "+typeof e[o]+" "+D[typeof e[o]](e[o])),n.push({key:o,type:D[typeof e[o]](e[o]),value:e[o]});return n},ConvertToCSharp(t){console.log("Converting to c# "+t);var e=this.ConvertToIntermediate(t);this.code=O(e,"SomeClass");let n=document.getElementById("output-editor");n.innerHTML=this.code,S().highlightElement(n),console.log(this.code)},clearInput(){this.inputEditor=""}}},A=n(1241);const I=(0,A.A)(T,[["render",b],["__scopeId","data-v-fc66d1d6"]]);var B=I,F=n.p+"img/jclass-transparent.07aad235.png";const M={class:"dark:bg-[#332D2D] bg-[#3D496B] flex flex-row items-center justify-between border-b-8 border-[#21283A] transition-colors duration-500"},_=(0,r.Lk)("div",{class:"flex flex-row items-center"},[(0,r.Lk)("img",{class:"w-20 h-20",alt:"Vue logo",src:F}),(0,r.Lk)("h1",{class:"text-5xl text-[#EFF1F6]"},"JClass ")],-1),$=(0,r.Lk)("span",{class:"material-symbols-outlined absolute transition-opacity opacity-0 dark:opacity-100 duration-500"}," dark_mode ",-1),N=(0,r.Lk)("span",{class:"material-symbols-outlined absolute transition-opacity dark:opacity-0 opacity-100 duration-500 text-orange-400"}," light_mode ",-1),J=[$,N];function P(t,e,n,o,a,i){return(0,r.uX)(),(0,r.CE)("nav",M,[_,(0,r.Lk)("button",{onClick:e[0]||(e[0]=(...t)=>i.changeDarkMode&&i.changeDarkMode(...t)),class:"flex items-center justify-center rounded-full w-[35px] h-[35px] bg-white dark:bg-[#332D2D] dark:text-white transition-all duration-500 dark:shadow-gray-500 border-black mr-20 shadow-md relative"},J)])}var R={name:"NavBar",props:{darkMode:String},data(){return{localDarkMode:this.darkMode}},watch:{darkMode(t){this.localDarkMode=t}},methods:{changeDarkMode(){this.$emit("changeDarkMode")}}};const V=(0,A.A)(R,[["render",P]]);var X=V,H={name:"App",components:{ConverterPage:B,NavBar:X},data(){return{isDark:!1}},methods:{changeDarkMode(){this.isDark=!this.isDark,console.log("Dark mode changed")}}};const Q=(0,A.A)(H,[["render",i]]);var U=Q;(0,o.Ef)(U).mount("#app")}},e={};function n(o){var r=e[o];if(void 0!==r)return r.exports;var a=e[o]={exports:{}};return t[o].call(a.exports,a,a.exports,n),a.exports}n.m=t,function(){var t=[];n.O=function(e,o,r,a){if(!o){var i=1/0;for(c=0;c<t.length;c++){o=t[c][0],r=t[c][1],a=t[c][2];for(var l=!0,s=0;s<o.length;s++)(!1&a||i>=a)&&Object.keys(n.O).every((function(t){return n.O[t](o[s])}))?o.splice(s--,1):(l=!1,a<i&&(i=a));if(l){t.splice(c--,1);var d=r();void 0!==d&&(e=d)}}return e}a=a||0;for(var c=t.length;c>0&&t[c-1][2]>a;c--)t[c]=t[c-1];t[c]=[o,r,a]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){n.p="/j-class/"}(),function(){var t={524:0};n.O.j=function(e){return 0===t[e]};var e=function(e,o){var r,a,i=o[0],l=o[1],s=o[2],d=0;if(i.some((function(e){return 0!==t[e]}))){for(r in l)n.o(l,r)&&(n.m[r]=l[r]);if(s)var c=s(n)}for(e&&e(o);d<i.length;d++)a=i[d],n.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return n.O(c)},o=self["webpackChunkj_class"]=self["webpackChunkj_class"]||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))}();var o=n.O(void 0,[504],(function(){return n(3891)}));o=n.O(o)})();
//# sourceMappingURL=app.a2a31145.js.map
"use strict";(self.webpackChunkmedicos_pdf=self.webpackChunkmedicos_pdf||[]).push([[7911],{93897:function(e,t,n){n.d(t,{Z:function(){return l}});var r=n(72791),a=n(91523),o=(n(73837),n(80184)),i=function(e){var t=e.color,n=e.tag,r=null===n||void 0===n?void 0:n.slice(0,15);return(0,o.jsx)(a.rU,{to:{pathname:"/search/searchtext/".concat(n)},className:"newsLinkTag-container",children:(0,o.jsxs)("div",{className:"newsLinkTag-link",children:[(0,o.jsx)("div",{className:"newsLinkTag-link-circle",style:{backgroundColor:"".concat(t)}}),(0,o.jsx)("div",{className:"newsLinkTag-link-text",children:r})]})})},l=r.memo(i)},36251:function(e,t,n){n.d(t,{T:function(){return a},X:function(){return o}});var r=n(2191),a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"some_event_name";try{(0,r.Kz)((0,r.IH)(),e)}catch(t){console.log("EVENT WITHOUT PARAMS ERROR LOGGED: ".concat(e,", ").concat(t))}},o=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"some_event_name",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};try{(0,r.Kz)((0,r.IH)(),e,t)}catch(n){console.log("EVENT WITHOUT PARAMS ERROR LOGGED: ".concat(e,", ").concat(n," ,").concat(t))}}},62302:function(e,t,n){n.d(t,{Eu:function(){return r},LE:function(){return a}});var r=function(e){var t="yellow";return e%3===0?t="red":e%2===0&&(t="skyblue"),t},a=function(e){var t=null===e||void 0===e?void 0:e.split(" ").length;return Math.ceil(t/120)}},82020:function(e,t,n){n.d(t,{Z:function(){return c}});var r=n(70885),a=n(72791),o=n(91523),i=n(80184),l=function(e){var t=e.author,n=e.authorColor,l=e.link,c=e.date,s=e.readTime,u=e.color,d=e.fontSize,p=(0,a.useState)(!1),f=(0,r.Z)(p,2),h=f[0],m=f[1],v=(0,a.useState)(!1),g=(0,r.Z)(v,2),y=g[0],x=g[1],b=(0,a.useState)(!1),w=(0,r.Z)(b,2),T=w[0],j=w[1];return(0,a.useEffect)((function(){"string"===typeof t&&"string"===typeof c&&"string"===typeof s?m(!h):"string"===typeof c&&"string"===typeof s?x(!y):"string"===typeof c?j(!T):console.log("no match")}),[]),(0,i.jsxs)(i.Fragment,{children:[h?(0,i.jsxs)("div",{className:"authorDateReadDate-wrapper",style:{fontSize:"".concat(d)},children:[(0,i.jsx)("div",{className:"authorDateReadDate-wrapper-author",children:(0,i.jsxs)("span",{className:"authorDateReadDate-wrapper-author-firstSpan",style:{fontSize:"".concat(d),color:"".concat(u)},children:["By:",(0,i.jsx)(o.rU,{to:l,style:{fontSize:"".concat(d),color:"".concat(n)},children:t})]})}),(0,i.jsx)("div",{className:"authorDateReadDate-wrapper-dot",style:{color:"".concat(u),border:"1px solid ".concat(u)}}),(0,i.jsx)("div",{className:"authorDateReadDate-wrapper-date",style:{color:"".concat(u)},children:c}),(0,i.jsx)("div",{className:"authorDateReadDate-wrapper-dot",style:{color:"".concat(u),border:"1px solid ".concat(u)}}),(0,i.jsx)("div",{className:"authorDateReadDate-wrapper-readTime",style:{color:"".concat(u)},children:s})]}):"",y?(0,i.jsxs)("div",{className:"authorDateReadDate-wrapper",children:[(0,i.jsx)("div",{className:"authorDateReadDate-wrapper-date",style:{color:"".concat(u),fontSize:"".concat(d)},children:c}),(0,i.jsx)("div",{className:"authorDateReadDate-wrapper-dot",style:{color:"".concat(u),border:"1px solid ".concat(u)}}),(0,i.jsx)("div",{className:"authorDateReadDate-wrapper-readTime",style:{color:"".concat(u),fontSize:"".concat(d)},children:s})]}):"",T?(0,i.jsx)("div",{className:"authorDateReadDate-wrapper",children:(0,i.jsx)("div",{className:"authorDateReadDate-wrapper-date",style:{color:"".concat(u),fontSize:"".concat(d)},children:c})}):""]})},c=a.memo(l)},7911:function(e,t,n){n.r(t),n.d(t,{default:function(){return f}});var r=n(72791),a=n(91523),o=n(6429),i=n.n(o),l=n(93897),c=n(36251),s=n(62302),u=n(82020),d=n(80184),p=function(e){var t,n,r,o,p,f,h=e.index,m=e.data,v=e.sourceDocId;return(0,d.jsxs)("div",{className:"article-card-content",children:[(0,d.jsx)(a.rU,{onClick:function(){var e;return(0,c.X)("web_article_detail_page_opened",{articleTitle:null===m||void 0===m||null===(e=m.title)||void 0===e?void 0:e.rendered})},className:"links",to:{pathname:"/articledetails/".concat(null===m||void 0===m||null===(t=m.title)||void 0===t?void 0:t.rendered.replace(/\/|\[|\]/g,""),"/").concat(v)},children:(0,d.jsx)("div",{className:"article-card-content-image",style:{backgroundImage:"url(".concat(null===m||void 0===m||null===(n=m.image)||void 0===n?void 0:n.source_url,")")}})}),(0,d.jsxs)("div",{className:"article-card-content-bottom",children:[(0,d.jsx)(l.Z,{color:(0,s.Eu)(h),tag:null===m||void 0===m?void 0:m.slug}),(0,d.jsx)(a.rU,{onClick:function(){var e;return(0,c.X)("web_article_detail_page_opened",{articleTitle:null===m||void 0===m||null===(e=m.title)||void 0===e?void 0:e.rendered})},className:"links",to:{pathname:"/articledetails/".concat(null===m||void 0===m||null===(r=m.title)||void 0===r?void 0:r.rendered.replace(/\/|\[|\]/g,""),"/").concat(v)},children:(0,d.jsx)("h3",{className:"article-card-content-bottom-heading",children:null===m||void 0===m||null===(o=m.title)||void 0===o?void 0:o.rendered})}),(0,d.jsx)("p",{style:{fontSize:"18px",marginBottom:"10px"},children:null===m||void 0===m||null===(p=m.excerpt)||void 0===p?void 0:p.rendered.replace(/<\/?p[^>]*>/g,"")}),(0,d.jsx)(u.Z,{date:new Date(null===m||void 0===m?void 0:m.date).toDateString(),readTime:(0,s.LE)(null===m||void 0===m||null===(f=m.content)||void 0===f?void 0:f.rendered)+" min read",color:"#9f9f9f",fontSize:"12px"})]})]},i().generate())},f=r.memo(p)},73837:function(e,t,n){var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(72791),i=c(o),l=c(n(33471));function c(e){return e&&e.__esModule?e:{default:e}}function s(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var u=function(e){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var e=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.componentDidMount=function(){e.clampText(),setTimeout(e.sizeGuard,0)},e.componentDidUpdate=function(t){t!==e.props&&e.clampText()},e.sizeGuard=function(){e&&e.textContainer.current&&(e.state.latestWidth!==Math.round(e.textContainer.current.scrollWidth)&&(e.setState({latestWidth:Math.round(e.textContainer.current.scrollWidth)}),setTimeout(e.clampText,0)),window.requestAnimationFrame(e.sizeGuard))},e.clampText=function(){if(e&&e.textContainer.current){var t=e.props,n=t.text,r=t.lines,a=t.ellipsis,o=t.splitter,i=t.punctuation,c=t.gap,u=t.reverse,d=t.punctuationChars,p=t.punctuaionCharsAdditional,f=t.maxFPS;if(f&&f>=1){var h=window.performance.now(),m=1e3/Number(f);if(e.lastUpdateTimestamp){var v=h-e.lastUpdateTimestamp;if(v<m){var g=m-v;return void setTimeout(e.clampText,g)}}e.lastUpdateTimestamp=h}var y=p&&Array.isArray(p)?p:[],x=l.default.clampLines(n,e.textContainer.current,{ellipsis:a,splitter:o,punctuation:i,reverse:u,gap:Number(c)>=0?Number(c):.01,punctuationChars:[].concat(s(d),s(y)),lines:Math.floor(Number(r))?Math.floor(Number(r)):1});e.setState({clampedText:x,lastResizeCallTimestamp:window.performance.now()})}},e.state={clampedText:"",lastResizeCallTimestamp:0,maxHeight:null},e.textContainer=i.default.createRef(),e}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),a(t,[{key:"render",value:function(){var e=this.props,t=e.styles,n=e.element,a=e.onClick,o=e.className,l=this.state.clampedText;return i.default.createElement(n||"string"!==typeof n?n:"div",{ref:this.textContainer,style:r({},{display:"block",width:"100%"},t),onClick:a,className:o},l)}}]),t}(o.PureComponent);u.defaultProps={styles:{},lines:1,ellipsis:"...",punctuation:!0,reverse:!1,gap:.01,splitter:" ",element:"div",punctuationChars:[",","/","\\","&",".","-","!","?"," ",";",":",String.fromCharCode(13),String.fromCharCode(10),String.fromCharCode(9)],punctuaionCharsAdditional:[],onClick:function(){return null}};var d=void 0;try{d=n(52007),u.propTypes={text:d.string.isRequired,styles:d.object,lines:d.oneOfType([d.string,d.number]),ellipsis:d.oneOfType([d.string,d.number]),splitter:d.oneOfType([d.string,d.number]),punctuation:d.bool,reverse:d.bool,gap:d.number,element:d.string,punctuationChars:d.array,punctuaionCharsAdditional:d.array,onClick:d.func,className:d.string,maxFPS:d.oneOfType([d.string,d.number])}}catch(p){}t.Z=u},33471:function(e){var t=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};function n(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=String(e),a=!0;if(!t.length)return r;for(;a;){a=!1;for(var o=0;o<t.length;o++){var i=n?r.slice(0,t[o].length):r.slice(r.length-t[o].length);i===t[o]&&(r=n?r.slice(t[o].length,r.length):r=r.slice(0,r.length-t[o].length),a=!0)}}return r}function r(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",r=arguments.length>3&&void 0!==arguments[3]&&arguments[3],a=String(e).split(n),o=Math.floor(a.length*t);if(o<1)return"";var i=r?a.slice(-o):a.slice(0,o);return i.join(n)}function a(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=document.createElement(e.tagName),r=window.getComputedStyle(e),a=r.cssText;for(var o in n.style.cssText=a,n.style.maxWidth=r.width,t)n.style[o]=t[o];return n}function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return""===e?"":n?""+t+e:""+e+t}function i(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"number";return"number"===t?parseFloat(e)?Number(e):NaN:e}e.exports={delLastChars:n,clamp:r,clampLines:function(e,t,i){var l=i.lines,c=i.ellipsis,s=i.splitter,u=i.punctuation,d=i.gap,p=i.reverse,f=i.punctuationChars,h=200*Number(l),m=a(t,{lineHeight:"200px",height:"auto",position:"absolute",opacity:"0",left:"-1px",width:t.scrollWidth*(1-Number(d))+"px",paddingTop:0,paddingBottom:0});t.appendChild(m);var v=e;m.innerHTML=o(v,c,p);var g=Math.ceil(m.scrollHeight)-1;if(g<=h)return m.parentNode.removeChild(m),v;for(var y=h/g+.35;g>h&&v.length;)v=r(e,y,s,p),v=u?n(v,f,p):v,m.innerHTML=o(v,c,p),g=Math.ceil(m.scrollHeight)-1,y-=e.length>1500?.011:.018;return m.parentNode.removeChild(m),o(v=u?n(v,f,p):v,c,p)},createSimilarEl:a,constructString:o,normalizeObj:function(e){var n=t({},e),r=Object.keys(n);for(var a in r)n[r[a]]=i(n[r[a]]);return n},normalizeValue:i}}}]);
//# sourceMappingURL=7911.9685a074.chunk.js.map
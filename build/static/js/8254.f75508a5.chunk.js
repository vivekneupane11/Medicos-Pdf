(self.webpackChunkmedicos_pdf=self.webpackChunkmedicos_pdf||[]).push([[8254,1142],{93897:function(e,t,r){"use strict";r.d(t,{Z:function(){return s}});var n=r(72791),a=r(91523),i=(r(73837),r(80184)),o=function(e){var t=e.color,r=e.tag,n=null===r||void 0===r?void 0:r.slice(0,15);return(0,i.jsx)(a.rU,{to:{pathname:"/search/searchtext/".concat(r)},className:"newsLinkTag-container",children:(0,i.jsxs)("div",{className:"newsLinkTag-link",children:[(0,i.jsx)("div",{className:"newsLinkTag-link-circle",style:{backgroundColor:"".concat(t)}}),(0,i.jsx)("div",{className:"newsLinkTag-link-text",children:n})]})})},s=n.memo(o)},86631:function(e,t,r){"use strict";r.d(t,{k:function(){return a}});var n=r(36251),a=function(e,t,r){window.open(e,"_blank"),(0,n.X)(r,{Title:t})}},62302:function(e,t,r){"use strict";r.d(t,{Eu:function(){return n},LE:function(){return a}});var n=function(e){var t="yellow";return e%3===0?t="red":e%2===0&&(t="skyblue"),t},a=function(e){var t=null===e||void 0===e?void 0:e.split(" ").length;return Math.ceil(t/120)}},82020:function(e,t,r){"use strict";r.d(t,{Z:function(){return l}});var n=r(70885),a=r(72791),i=r(91523),o=r(80184),s=function(e){var t=e.author,r=e.authorColor,s=e.link,l=e.date,c=e.readTime,u=e.color,d=e.fontSize,p=(0,a.useState)(!1),f=(0,n.Z)(p,2),h=f[0],m=f[1],v=(0,a.useState)(!1),g=(0,n.Z)(v,2),x=g[0],w=g[1],y=(0,a.useState)(!1),b=(0,n.Z)(y,2),C=b[0],j=b[1];return(0,a.useEffect)((function(){"string"===typeof t&&"string"===typeof l&&"string"===typeof c?m(!h):"string"===typeof l&&"string"===typeof c?w(!x):"string"===typeof l?j(!C):console.log("no match")}),[]),(0,o.jsxs)(o.Fragment,{children:[h?(0,o.jsxs)("div",{className:"authorDateReadDate-wrapper",style:{fontSize:"".concat(d)},children:[(0,o.jsx)("div",{className:"authorDateReadDate-wrapper-author",children:(0,o.jsxs)("span",{className:"authorDateReadDate-wrapper-author-firstSpan",style:{fontSize:"".concat(d),color:"".concat(u)},children:["By:",(0,o.jsx)(i.rU,{to:s,style:{fontSize:"".concat(d),color:"".concat(r)},children:t})]})}),(0,o.jsx)("div",{className:"authorDateReadDate-wrapper-dot",style:{color:"".concat(u),border:"1px solid ".concat(u)}}),(0,o.jsx)("div",{className:"authorDateReadDate-wrapper-date",style:{color:"".concat(u)},children:l}),(0,o.jsx)("div",{className:"authorDateReadDate-wrapper-dot",style:{color:"".concat(u),border:"1px solid ".concat(u)}}),(0,o.jsx)("div",{className:"authorDateReadDate-wrapper-readTime",style:{color:"".concat(u)},children:c})]}):"",x?(0,o.jsxs)("div",{className:"authorDateReadDate-wrapper",children:[(0,o.jsx)("div",{className:"authorDateReadDate-wrapper-date",style:{color:"".concat(u),fontSize:"".concat(d)},children:l}),(0,o.jsx)("div",{className:"authorDateReadDate-wrapper-dot",style:{color:"".concat(u),border:"1px solid ".concat(u)}}),(0,o.jsx)("div",{className:"authorDateReadDate-wrapper-readTime",style:{color:"".concat(u),fontSize:"".concat(d)},children:c})]}):"",C?(0,o.jsx)("div",{className:"authorDateReadDate-wrapper",children:(0,o.jsx)("div",{className:"authorDateReadDate-wrapper-date",style:{color:"".concat(u),fontSize:"".concat(d)},children:l})}):""]})},l=a.memo(s)},8254:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return p}});var n=r(72791),a=r(93897),i=r(82020),o=r(6429),s=r.n(o),l=r(62302),c=r(86631),u=r(80184),d=function(e){var t,r,n,o=e.details;return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)("div",{className:"newsSelected-wrapper",children:[(0,u.jsx)("h3",{className:"newsSelected-wrapper-head1",children:"Daily News"}),(0,u.jsx)("h6",{className:"newsSelected-wrapper-head2",children:"BEST FOR YOU"}),(0,u.jsxs)("div",{className:"newsSelected-wrapper-imageContainer",children:[o?(0,u.jsxs)("div",{className:"newsSelected-wrapper-imageContainer-left",children:[(0,u.jsx)("div",{onClick:function(){return(0,c.k)(o[13].link,o[13].title,"web_article_detail_page_opened")},className:"newsSelected-wrapper-imageContainer-left-img",style:{backgroundImage:"url(".concat(o[13].image.url[0],")")}}),(0,u.jsx)(a.Z,{color:(0,l.Eu)(1),tag:null===(t=o[13])||void 0===t?void 0:t.categories[0]}),(0,u.jsx)("h3",{className:"newsSelected-wrapper-imageContainer-left-heading",onClick:function(){return(0,c.k)(o[13].link,o[13].title,"web_article_detail_page_opened")},children:o[13].title}),(0,u.jsx)(i.Z,{date:new Date(null===(r=o[13])||void 0===r?void 0:r.isoDate).toDateString(),readTime:(0,l.LE)(null===(n=o[13])||void 0===n?void 0:n.content)+" min read",color:"#9f9f9f",fontSize:"12px"})]}):"",(0,u.jsx)("div",{className:"newsSelected-wrapper-imageContainer-right",children:null===o||void 0===o?void 0:o.filter((function(e,t){return t>13&&t<17})).map((function(e,t){var r;return(0,u.jsxs)("div",{className:"newsSelected-wrapper-imageContainer-right-imgWrapper",children:[(0,u.jsx)("div",{onClick:function(){return(0,c.k)(null===e||void 0===e?void 0:e.link,null===e||void 0===e?void 0:e.title,"web_article_detail_page_opened")},style:{backgroundImage:"url(".concat(null===e||void 0===e||null===(r=e.image)||void 0===r?void 0:r.url[0],")")},className:"newsSelected-wrapper-imageContainer-right-imgWrapper-img"}),(0,u.jsx)("h3",{className:"newsSelected-wrapper-imageContainer-right-imgWrapper-head",onClick:function(){return(0,c.k)(null===e||void 0===e?void 0:e.link,null===e||void 0===e?void 0:e.title,"web_article_detail_page_opened")},children:null===e||void 0===e?void 0:e.title})]},s().generate())}))})]})]}),(0,u.jsx)("hr",{className:"selected-borderbottom"})]})},p=n.memo(d)},73837:function(e,t,r){"use strict";var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},a=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=r(72791),o=l(i),s=l(r(33471));function l(e){return e&&e.__esModule?e:{default:e}}function c(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}var u=function(e){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var e=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.componentDidMount=function(){e.clampText(),setTimeout(e.sizeGuard,0)},e.componentDidUpdate=function(t){t!==e.props&&e.clampText()},e.sizeGuard=function(){e&&e.textContainer.current&&(e.state.latestWidth!==Math.round(e.textContainer.current.scrollWidth)&&(e.setState({latestWidth:Math.round(e.textContainer.current.scrollWidth)}),setTimeout(e.clampText,0)),window.requestAnimationFrame(e.sizeGuard))},e.clampText=function(){if(e&&e.textContainer.current){var t=e.props,r=t.text,n=t.lines,a=t.ellipsis,i=t.splitter,o=t.punctuation,l=t.gap,u=t.reverse,d=t.punctuationChars,p=t.punctuaionCharsAdditional,f=t.maxFPS;if(f&&f>=1){var h=window.performance.now(),m=1e3/Number(f);if(e.lastUpdateTimestamp){var v=h-e.lastUpdateTimestamp;if(v<m){var g=m-v;return void setTimeout(e.clampText,g)}}e.lastUpdateTimestamp=h}var x=p&&Array.isArray(p)?p:[],w=s.default.clampLines(r,e.textContainer.current,{ellipsis:a,splitter:i,punctuation:o,reverse:u,gap:Number(l)>=0?Number(l):.01,punctuationChars:[].concat(c(d),c(x)),lines:Math.floor(Number(n))?Math.floor(Number(n)):1});e.setState({clampedText:w,lastResizeCallTimestamp:window.performance.now()})}},e.state={clampedText:"",lastResizeCallTimestamp:0,maxHeight:null},e.textContainer=o.default.createRef(),e}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),a(t,[{key:"render",value:function(){var e=this.props,t=e.styles,r=e.element,a=e.onClick,i=e.className,s=this.state.clampedText;return o.default.createElement(r||"string"!==typeof r?r:"div",{ref:this.textContainer,style:n({},{display:"block",width:"100%"},t),onClick:a,className:i},s)}}]),t}(i.PureComponent);u.defaultProps={styles:{},lines:1,ellipsis:"...",punctuation:!0,reverse:!1,gap:.01,splitter:" ",element:"div",punctuationChars:[",","/","\\","&",".","-","!","?"," ",";",":",String.fromCharCode(13),String.fromCharCode(10),String.fromCharCode(9)],punctuaionCharsAdditional:[],onClick:function(){return null}};var d=void 0;try{d=r(52007),u.propTypes={text:d.string.isRequired,styles:d.object,lines:d.oneOfType([d.string,d.number]),ellipsis:d.oneOfType([d.string,d.number]),splitter:d.oneOfType([d.string,d.number]),punctuation:d.bool,reverse:d.bool,gap:d.number,element:d.string,punctuationChars:d.array,punctuaionCharsAdditional:d.array,onClick:d.func,className:d.string,maxFPS:d.oneOfType([d.string,d.number])}}catch(p){}t.Z=u},33471:function(e){"use strict";var t=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};function r(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=String(e),a=!0;if(!t.length)return n;for(;a;){a=!1;for(var i=0;i<t.length;i++){var o=r?n.slice(0,t[i].length):n.slice(n.length-t[i].length);o===t[i]&&(n=r?n.slice(t[i].length,n.length):n=n.slice(0,n.length-t[i].length),a=!0)}}return n}function n(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",n=arguments.length>3&&void 0!==arguments[3]&&arguments[3],a=String(e).split(r),i=Math.floor(a.length*t);if(i<1)return"";var o=n?a.slice(-i):a.slice(0,i);return o.join(r)}function a(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=document.createElement(e.tagName),n=window.getComputedStyle(e),a=n.cssText;for(var i in r.style.cssText=a,r.style.maxWidth=n.width,t)r.style[i]=t[i];return r}function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return""===e?"":r?""+t+e:""+e+t}function o(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"number";return"number"===t?parseFloat(e)?Number(e):NaN:e}e.exports={delLastChars:r,clamp:n,clampLines:function(e,t,o){var s=o.lines,l=o.ellipsis,c=o.splitter,u=o.punctuation,d=o.gap,p=o.reverse,f=o.punctuationChars,h=200*Number(s),m=a(t,{lineHeight:"200px",height:"auto",position:"absolute",opacity:"0",left:"-1px",width:t.scrollWidth*(1-Number(d))+"px",paddingTop:0,paddingBottom:0});t.appendChild(m);var v=e;m.innerHTML=i(v,l,p);var g=Math.ceil(m.scrollHeight)-1;if(g<=h)return m.parentNode.removeChild(m),v;for(var x=h/g+.35;g>h&&v.length;)v=n(e,x,c,p),v=u?r(v,f,p):v,m.innerHTML=i(v,l,p),g=Math.ceil(m.scrollHeight)-1,x-=e.length>1500?.011:.018;return m.parentNode.removeChild(m),i(v=u?r(v,f,p):v,l,p)},createSimilarEl:a,constructString:i,normalizeObj:function(e){var r=t({},e),n=Object.keys(r);for(var a in n)r[n[a]]=o(r[n[a]]);return r},normalizeValue:o}},6429:function(e,t,r){"use strict";e.exports=r(95274)},58857:function(e,t,r){"use strict";var n,a,i,o=r(75408),s="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";function l(){i=!1}function c(e){if(e){if(e!==n){if(e.length!==s.length)throw new Error("Custom alphabet for shortid must be "+s.length+" unique characters. You submitted "+e.length+" characters: "+e);var t=e.split("").filter((function(e,t,r){return t!==r.lastIndexOf(e)}));if(t.length)throw new Error("Custom alphabet for shortid must be "+s.length+" unique characters. These characters were not unique: "+t.join(", "));n=e,l()}}else n!==s&&(n=s,l())}function u(){return i||(i=function(){n||c(s);for(var e,t=n.split(""),r=[],a=o.nextValue();t.length>0;)a=o.nextValue(),e=Math.floor(a*t.length),r.push(t.splice(e,1)[0]);return r.join("")}())}e.exports={get:function(){return n||s},characters:function(e){return c(e),n},seed:function(e){o.seed(e),a!==e&&(l(),a=e)},lookup:function(e){return u()[e]},shuffled:u}},27098:function(e,t,r){"use strict";var n,a,i=r(2226);r(58857);e.exports=function(e){var t="",r=Math.floor(.001*(Date.now()-1567752802062));return r===a?n++:(n=0,a=r),t+=i(7),t+=i(e),n>0&&(t+=i(n)),t+=i(r)}},2226:function(e,t,r){"use strict";var n=r(58857),a=r(49139),i=r(32483);e.exports=function(e){for(var t,r=0,o="";!t;)o+=i(a,n.get(),1),t=e<Math.pow(16,r+1),r++;return o}},95274:function(e,t,r){"use strict";var n=r(58857),a=r(27098),i=r(36046),o=r(45347)||0;function s(){return a(o)}e.exports=s,e.exports.generate=s,e.exports.seed=function(t){return n.seed(t),e.exports},e.exports.worker=function(t){return o=t,e.exports},e.exports.characters=function(e){return void 0!==e&&n.characters(e),n.shuffled()},e.exports.isValid=i},36046:function(e,t,r){"use strict";var n=r(58857);e.exports=function(e){return!(!e||"string"!==typeof e||e.length<6)&&!new RegExp("[^"+n.get().replace(/[|\\{}()[\]^$+*?.-]/g,"\\$&")+"]").test(e)}},49139:function(e){"use strict";var t,r="object"===typeof window&&(window.crypto||window.msCrypto);t=r&&r.getRandomValues?function(e){return r.getRandomValues(new Uint8Array(e))}:function(e){for(var t=[],r=0;r<e;r++)t.push(Math.floor(256*Math.random()));return t},e.exports=t},75408:function(e){"use strict";var t=1;e.exports={nextValue:function(){return(t=(9301*t+49297)%233280)/233280},seed:function(e){t=e}}},45347:function(e){"use strict";e.exports=0},32483:function(e){e.exports=function(e,t,r){for(var n=(2<<Math.log(t.length-1)/Math.LN2)-1,a=-~(1.6*n*r/t.length),i="";;)for(var o=e(a),s=a;s--;)if((i+=t[o[s]&n]||"").length===+r)return i}}}]);
//# sourceMappingURL=8254.f75508a5.chunk.js.map
"use strict";(self.webpackChunkmedicos_pdf=self.webpackChunkmedicos_pdf||[]).push([[3479,386],{43743:function(e,t,n){var i=n(15861),l=n(70885),a=n(64687),s=n.n(a),r=n(72791),o=n(79271);t.Z=function(e){var t=(0,r.useState)(null),a=(0,l.Z)(t,2),c=a[0],d=a[1],u=(0,o.TH)(),v=null===e||void 0===e?void 0:e.replace(/[#.[$]/g,"").replace(/]/,"").replace(/\s/g,"");return(0,r.useEffect)((0,i.Z)(s().mark((function t(){var i,a,r,o,c,h,f,p,m,x,g;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i=!0,t.prev=1,t.next=4,Promise.all([Promise.all([n.e(408),n.e(989)]).then(n.bind(n,80989))]).then((function(e){return{database:(0,l.Z)(e,1)[0]}}));case 4:return a=t.sent,r=a.database,o=r.database,c=r.ref,h=r.onValue,f=r.set,p=r.update,m=r.off,x=c(o,"viewCount/".concat(null===u||void 0===u?void 0:u.pathname.split("/")[1],"/").concat(v)),g=function(e){try{var t;if(null!==e&&void 0!==e&&e.val()){if(null!==e&&void 0!==e&&null!==(t=e.val())&&void 0!==t&&t.viewCount){var n,i=null===e||void 0===e||null===(n=e.val())||void 0===n?void 0:n.viewCount;d(i+1),p(x,{viewCount:i+1})}}else f(x,{viewCount:1}),d(1)}catch(l){console.log("Error fetching count",l)}},i&&e&&h(x,g,{onlyOnce:!0}),t.abrupt("return",(function(){m(x,g),i=!1}));case 18:t.prev=18,t.t0=t.catch(1);case 20:case"end":return t.stop()}}),t,null,[[1,18]])}))),[e]),c}},97769:function(e,t,n){n.d(t,{qE:function(){return s},fr:function(){return r},rU:function(){return a}});n(72791);var i=n(16748),l=n(80184),a=function(e){var t=e.Image,n=e.type,i=e.height,a=e.width;return(0,l.jsx)("div",{children:(0,l.jsx)("img",{className:"image ".concat(n||""),src:t,style:{width:a,height:i},alt:"image"})})},s=function(e){var t=e.Image,n=e.size,a=e.text;return n=n||"50px",(0,l.jsx)("div",{className:"image-wrapper",style:{width:n,height:n},children:t?(0,l.jsx)("img",{className:"avatar",src:t,style:{width:n,height:n},alt:"image"}):(0,l.jsx)("div",{className:"avatar-text",style:{width:n,height:n},children:(0,l.jsx)(i.m,{title:null===a||void 0===a?void 0:a.substring(0,1),color:"white",type:"display4"})})})},r=function(e){var t=e.size;return t=t||"50px",(0,l.jsx)("div",{className:"image-wrapper-placeholder",style:{width:t,height:t}})}},20386:function(e,t,n){n.r(t),n.d(t,{default:function(){return l}});n(72791);var i=n(80184),l=function(){return(0,i.jsx)("div",{className:"loading-wrapper",children:(0,i.jsxs)("div",{className:"lds-ellipsis",children:[(0,i.jsx)("div",{}),(0,i.jsx)("div",{}),(0,i.jsx)("div",{}),(0,i.jsx)("div",{})]})})}},36251:function(e,t,n){n.d(t,{T:function(){return l},X:function(){return a}});var i=n(2191),l=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"some_event_name";try{(0,i.Kz)((0,i.IH)(),e)}catch(t){console.log("EVENT WITHOUT PARAMS ERROR LOGGED: ".concat(e,", ").concat(t))}},a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"some_event_name",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};try{(0,i.Kz)((0,i.IH)(),e,t)}catch(n){console.log("EVENT WITHOUT PARAMS ERROR LOGGED: ".concat(e,", ").concat(n," ,").concat(t))}}},73144:function(e,t,n){function i(e){if(e){var t=function(e){for(var t=e.split(" "),n=0;n<t.length;n++){var i,l;t[n]=(null===(i=t[n][0])||void 0===i?void 0:i.toUpperCase())+(null===(l=t[n])||void 0===l?void 0:l.substr(1))}return t.join(" ")}(e).replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]\s|[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]|\s/g,"");return t="Gynoobs"==t?"GynoObs":t}return null}n.d(t,{Z:function(){return i}})},95101:function(e,t,n){n.r(t),n.d(t,{default:function(){return y}});var i=n(15861),l=n(70885),a=n(64687),s=n.n(a),r=n(72791),o=n(63959),c=n(73837),d=n(79271),u=n(65414),v=n(7145),h=n(43743),f=n(97769),p=n(88552),m=n(20386),x=n(36251),g=n(12),C=n(80184),w=function(e){return(0,C.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",className:e.className,fill:"currentColor",children:(0,C.jsx)("path",{d:"M152.1 38.16C161.9 47.03 162.7 62.2 153.8 72.06L81.84 152.1C77.43 156.9 71.21 159.8 64.63 159.1C58.05 160.2 51.69 157.6 47.03 152.1L7.029 112.1C-2.343 103.6-2.343 88.4 7.029 79.03C16.4 69.66 31.6 69.66 40.97 79.03L63.08 101.1L118.2 39.94C127 30.09 142.2 29.29 152.1 38.16V38.16zM152.1 198.2C161.9 207 162.7 222.2 153.8 232.1L81.84 312.1C77.43 316.9 71.21 319.8 64.63 319.1C58.05 320.2 51.69 317.6 47.03 312.1L7.029 272.1C-2.343 263.6-2.343 248.4 7.029 239C16.4 229.7 31.6 229.7 40.97 239L63.08 261.1L118.2 199.9C127 190.1 142.2 189.3 152.1 198.2V198.2zM224 96C224 78.33 238.3 64 256 64H480C497.7 64 512 78.33 512 96C512 113.7 497.7 128 480 128H256C238.3 128 224 113.7 224 96V96zM224 256C224 238.3 238.3 224 256 224H480C497.7 224 512 238.3 512 256C512 273.7 497.7 288 480 288H256C238.3 288 224 273.7 224 256zM160 416C160 398.3 174.3 384 192 384H480C497.7 384 512 398.3 512 416C512 433.7 497.7 448 480 448H192C174.3 448 160 433.7 160 416zM0 416C0 389.5 21.49 368 48 368C74.51 368 96 389.5 96 416C96 442.5 74.51 464 48 464C21.49 464 0 442.5 0 416z"})})},j=n(87087),y=function(){var e,t=(0,r.useContext)(u.V).user,a=(0,d.UO)(),y=a.username,b=a.levelone,N=a.leveltwo,Z=a.levelthree;console.log("level check",b,N,Z);var L=(0,r.useState)([]),k=(0,l.Z)(L,2),E=k[0],_=k[1],S=(0,r.useState)(),z=(0,l.Z)(S,2),H=z[0],D=z[1],P=(0,r.useState)(0),I=(0,l.Z)(P,2),U=I[0],O=I[1],R=(0,r.useState)(!1),T=(0,l.Z)(R,2),M=T[0],V=T[1],A=(0,h.Z)(H?null===(e=H[U])||void 0===e?void 0:e.SlideName:""),G=function(){return Promise.all([n.e(9565).then(n.bind(n,19565))]).then((function(e){return{firestore:(0,l.Z)(e,1)[0]}}))},W=(0,r.useCallback)((0,i.Z)(s().mark((function e(){var t,n,i,l,a,r,o,c;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return V(!0),e.prev=1,e.next=4,G();case 4:t=e.sent,n=t.firestore,i=n.db,l=n.getDoc,a=n.doc,!b||N||Z?b&&N&&!Z?((0,x.X)("web_playlist_opened",{levelone:b,leveltwo:N}),o=a(i,"Web-User-Data",y,"Playlist",b,N,"playlist"),l(o).then((function(e){console.log("this is level two",e.data()),_((function(){var t;return null===(t=e.data())||void 0===t?void 0:t.slideList})),V(!1)}))):b&&N&&Z&&((0,x.X)("web_playlist_opened",{levelone:b,leveltwo:N,levelthree:Z}),console.log("Here"),c=a(i,"Web-User-Data",y,"Playlist",b,N,Z),l(c).then((function(e){console.log("this is level three",e.data()),_((function(){var t;return null===(t=e.data())||void 0===t?void 0:t.slideList})),V(!1)}))):((0,x.X)("web_playlist_opened",{levelone:b}),r=a(i,"Web-User-Data",y,"Playlist",b),l(r).then((function(e){console.log("this is level one",e.data()),_((function(){var t;return null===(t=e.data())||void 0===t?void 0:t.slideList})),V(!1)}))),e.next=14;break;case 12:e.prev=12,e.t0=e.catch(1);case 14:case"end":return e.stop()}}),e,null,[[1,12]])}))),[b,N,Z,y]);return(0,r.useEffect)((function(){var e=!0;return e&&W(),function(){e=!1}}),[]),(0,r.useEffect)((0,i.Z)(s().mark((function e(){var t,n,l,a,r;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return!0,e.prev=1,e.next=4,G();case 4:t=e.sent,n=t.firestore,l=n.db,a=n.doc,r=n.getDoc,(null===E||void 0===E?void 0:E.length)>0&&Promise.all(null===E||void 0===E?void 0:E.map(function(){var e=(0,i.Z)(s().mark((function e(t,n){var i;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return V(!0),i=a(l,"AllSlidesDataLockDownVersions",t),e.abrupt("return",r(i).then((function(e){if(null!==e&&void 0!==e&&e.exists())return(null===E||void 0===E?void 0:E.length)===n&&V(!1),console.log("slideDocid",e.data()),e.data()})));case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}())).then((function(e){console.log("This is final data",e),D(e)})),e.next=14;break;case 12:e.prev=12,e.t0=e.catch(1);case 14:return e.abrupt("return",(function(){!1}));case 15:case"end":return e.stop()}}),e,null,[[1,12]])}))),[E]),(0,C.jsx)("div",{className:"view-playlist-container",children:(null===H||void 0===H?void 0:H.length)>0&&M?(0,C.jsxs)("div",{children:[console.log("data",H),(0,C.jsx)(v.default,{playlistUrl:encodeURI(Z?"https://medicospdf.com/viewplaylist/".concat(y,"/").concat(b,"/").concat(N,"/").concat(Z):N?"https://medicospdf.com/viewplaylist/".concat(y,"/").concat(b,"/").concat(N):"https://medicospdf.com/viewplaylist/".concat(y,"/").concat(b)),images:H[U],user:t,viewCount:A}),(0,C.jsxs)("section",{className:"playlist-title",children:[(0,C.jsx)("h4",{children:"Playlist"}),(0,C.jsxs)("div",{className:"title-container",children:[(0,C.jsx)(w,{className:"icon"}),(0,C.jsx)("h5",{children:(b&&b)+(N?" > "+N:"")+(Z?" > "+Z:"")})]})]}),(0,C.jsx)("div",{className:"playlist-container",children:(0,C.jsx)("div",{className:"playlist-slider",children:null===H||void 0===H?void 0:H.map((function(e,t){return(0,C.jsxs)("section",{onClick:function(){return O(t)},className:"playlist-slidecard ".concat(U===t?"playlist-slidecard-active":"playlist-slidecard"," "),children:[(0,C.jsx)("aside",{className:"card-thumbnails",children:(0,C.jsx)(j.LazyLoadImage,{src:null===e||void 0===e?void 0:e.slideImages[0],alt:"Slides thumbnail image",effect:"blur"})}),(0,C.jsxs)("aside",{className:"slide-descriptions",children:[(0,C.jsxs)("h3",{children:[" ",null===e||void 0===e?void 0:e.SlideName.split("-",1)[0]," "]}),(0,C.jsx)("span",{children:null===e||void 0===e?void 0:e.slideCategory}),(0,C.jsx)(g.Z,{className:"playlist-categoryAndSubCategory-icon"}),(0,C.jsxs)("span",{children:[" ",null===e||void 0===e?void 0:e.slideSubCategory," "]}),(0,C.jsx)("p",{children:null===e||void 0===e?void 0:e.slideDescription}),(0,C.jsxs)("div",{className:"user-descriptions",children:[(0,C.jsx)(f.qE,{size:"20px",Image:null===e||void 0===e?void 0:e.userAvatar,text:y}),(0,C.jsx)(c.Z,{text:null===e||void 0===e?void 0:e.username,lines:1,element:"p",className:"user-avatar-name"})]})]})]})}))})}),(0,C.jsx)(o.ZP,{height:200,offset:50,children:(0,C.jsx)(p.default,{playlist:!0,data:H[U],user:t,viewCount:A})})]}):(0,C.jsx)("div",{className:"loading-container",children:(0,C.jsx)(m.default,{})})})}}}]);
//# sourceMappingURL=3479.f7eb07b8.chunk.js.map
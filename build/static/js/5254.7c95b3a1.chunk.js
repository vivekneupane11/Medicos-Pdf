(self.webpackChunkmedicos_pdf=self.webpackChunkmedicos_pdf||[]).push([[5254],{97257:function(e,n,r){"use strict";r(72791);var t=r(80184);n.Z=function(e){return(0,t.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:e.className,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})})}},5254:function(e,n,r){"use strict";r.r(n),r.d(n,{default:function(){return k}});var t=r(15861),a=r(70885),l=r(64687),i=r.n(l),s=r(72791),o=r(27494),u=r(30577),c=(r(5462),r(16748)),d=r(29202),v=r(1143),f=r(79271),m=r(65414),p=r(3863),h=r(37222),g=r.n(h),x=r(97257),y=r(80184),j=g()({loader:function(){return Promise.all([r.e(8280),r.e(3979)]).then(r.bind(r,98280)).then((function(e){return e.LoginModal}))},loading:function(){return(0,y.jsx)("div",{className:"loading",children:"Loading..."})}}),b=function(e){var n=e.name,r=e.faculty,t=e.image,l=e.fadedImage,i=e.selected,o=e.selectedFaculty,u=(0,s.useState)(150),c=(0,a.Z)(u,2),d=(c[0],c[1]);function v(){[].push(r),o(r),d(45)}return(0,y.jsxs)("div",{className:"preference-category-container",children:[(0,y.jsx)("div",{onClick:function(){v()},children:(0,y.jsx)("img",{loading:"lazy",className:"category-image",style:{borderRadius:4,boxShadow:i?"0 15px 35px rgba(0, -20, 1, 0.15)":""},src:i?t:l,alt:n})}),(0,y.jsx)("h4",{className:"category-title",children:n})]})},k=function(){var e=(0,f.k6)(),n=(0,s.useRef)(),l=(0,s.useContext)(m.V),h=l.user,g=l.username,k=l.setUsername,N=(0,s.useState)(g),w=(0,a.Z)(N,2),D=w[0],U=w[1],Z=(0,p.Z)("preference",null),C=(0,a.Z)(Z,2),A=(C[0],C[1]),P=(0,s.useState)(null),S=(0,a.Z)(P,2),L=(S[0],S[1]),W=(0,s.useState)(null),T=(0,a.Z)(W,2),I=T[0],M=T[1],B=(0,s.useState)(),_=(0,a.Z)(B,2),F=_[0],R=_[1],z=(0,s.useState)(),E=(0,a.Z)(z,2),Y=E[0],V=E[1],q=(0,s.useState)(!1),G=(0,a.Z)(q,2),H=G[0],J=G[1],K=function(){return Promise.all([r.e(9565).then(r.bind(r,19565))]).then((function(e){return{firestore:(0,a.Z)(e,1)[0]}}))},O=function(e){V(),M(e),L(null)},Q=(0,s.useCallback)((function(n){!1===n&&(J(!1),e.goBack())}),[e]);function X(){return(X=(0,t.Z)(i().mark((function r(){var t,a,l,s,o,c,d,v,f,m,p,g;return i().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,K();case 3:c=r.sent,d=c.firestore,v=d.db,f=d.doc,m=d.getDoc,p=d.setDoc,(null!==n&&void 0!==n&&null!==(t=n.current)&&void 0!==t&&null!==(a=t.value)&&void 0!==a&&a.length&&(null===n||void 0===n||null===(l=n.current)||void 0===l?void 0:l.value)==D||null===n||void 0===n||null===(s=n.current)||void 0===s||null===(o=s.value)||void 0===o||!o.length)&&(g=f(v,"Web-User-Data",D,"Additional-Details",D),m(g).then((function(r){var t,a;null!==r&&void 0!==r&&r.exists()&&null!==n&&void 0!==n&&null!==(t=n.current)&&void 0!==t&&null!==(a=t.value)&&void 0!==a&&a.length?u.Am.error("Username already exists",{theme:"dark",hideProgressBar:!0}):I&&D&&!F?p(f(v,"Web-User-Data",D,"User-Preference",D),{user_id:null===h||void 0===h?void 0:h.uid,user_email:null===h||void 0===h?void 0:h.email,preference:I}).then((function(){p(f(v,"Web-User-Data",D,"Additional-Details",D),{user_id:null===h||void 0===h?void 0:h.uid,email:null===h||void 0===h?void 0:h.email,displayName:null===h||void 0===h?void 0:h.displayName,photoURL:null===h||void 0===h?void 0:h.photoURL,language:"",gender:"",nickname:"",joinedDate:"",working:"",education:"",summary:"",facebook:"",instagram:"",twitter:"",username:D,coverImageUrl:""}).then((function(){p(f(v,"Web-Uid-To-Username",null===h||void 0===h?void 0:h.uid),{username:D}).then((function(){A(I),k(D),u.Am.success("Account successfully added",{theme:"dark",hideProgressBar:!0}),e.push("/")}))})).catch((function(e){console.log(e)}))})):(L("Please select your preference *"),setTimeout((function(){L(null)}),1e3))}))),D||R("Please enter your username"),I||V("Please select your preference"),r.next=17;break;case 14:r.prev=14,r.t0=r.catch(0),console.log("Error submitting user preference",r.t0);case 17:case"end":return r.stop()}}),r,null,[[0,14]])})))).apply(this,arguments)}(0,s.useEffect)((function(){var e=!0;return e&&J(!h),function(){e=!1}}),[h]);var $=function(){var e=(0,t.Z)(i().mark((function e(n){var r,t,a,l,s,o;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return R(null),n.preventDefault(),e.prev=2,e.next=5,K();case 5:r=e.sent,t=r.firestore,a=t.db,l=t.doc,s=t.getDoc,o=l(a,"Web-User-Data",n.target.value,"Additional-Details",n.target.value),s(o).then((function(e){null!==e&&void 0!==e&&e.exists()&&R("Username already existed")})),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(2),console.log("input error",e.t0);case 17:U(n.target.value);case 18:case"end":return e.stop()}}),e,null,[[2,14]])})));return function(n){return e.apply(this,arguments)}}(),ee=function(e){var n=e.errorMsg;return(0,y.jsxs)("div",{className:"error-msg-container",children:[(0,y.jsx)(x.Z,{className:"icon"}),(0,y.jsx)("p",{className:"error-msg",children:n})]})},ne=(0,o.debounce)($,2e3);return(0,s.useEffect)((0,t.Z)(i().mark((function e(){var n,r,t,a,l,s,o,u;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!!0||null===h||void 0===h||!h.uid||g){e.next=19;break}return e.prev=2,e.next=5,K();case 5:n=e.sent,r=n.firestore,t=r.db,a=r.doc,l=r.onSnapshot,s=r.setDoc,o=null===h||void 0===h?void 0:h.email.replace(/@gmail.com/g,""),u=a(t,"Web-User-Data",o,"Additional-Details",o),l(u,(function(e){null!==e&&void 0!==e&&e.exists()||s(a(t,"Web-Uid-To-Username",null===h||void 0===h?void 0:h.uid),{username:o}).then((function(){U(o),k(o)}))})),e.next=19;break;case 16:e.prev=16,e.t0=e.catch(2),console.log("input error",e.t0);case 19:return e.abrupt("return",(function(){!1}));case 20:case"end":return e.stop()}}),e,null,[[2,16]])}))),[null===h||void 0===h?void 0:h.uid,null===h||void 0===h?void 0:h.email]),(0,y.jsxs)("div",{className:"user-detail-page-container",children:[H&&(0,y.jsx)(j,{show:H,formModel:Q}),(0,y.jsxs)("div",{className:"username-container",children:[(0,y.jsx)(c.m,{title:"Almost there !",type:"display3"}),(0,y.jsx)("p",{children:"Finish creating your account for the full experience."}),(0,y.jsxs)("div",{className:"input-container",children:[(0,y.jsxs)("div",{className:"username",children:[(0,y.jsx)("p",{className:"label",children:"Your username"}),!g&&!D&&(0,y.jsx)("input",{ref:n,type:"text",onChange:ne}),g&&D&&(0,y.jsx)("p",{className:"text-focus",children:g}),F&&(0,y.jsx)(ee,{errorMsg:F})]}),(0,y.jsx)("p",{className:"label",children:"Your email"}),(0,y.jsx)("p",{className:"text-focus",children:null===h||void 0===h?void 0:h.email})]}),Y&&(0,y.jsx)(ee,{errorMsg:Y})]}),(0,y.jsx)("div",{className:"preference-heading",children:(0,y.jsx)(c.m,{title:"Please select your preference",type:"display3"})}),(0,y.jsx)("div",{className:"preference-category",children:v.B.map((function(e,n){return(0,y.jsx)("div",{children:(null===e||void 0===e?void 0:e.faculty)===(null===I||void 0===I?void 0:I.faculty)?(0,y.jsx)(b,{faculty:e,name:null===e||void 0===e?void 0:e.faculty,image:null===e||void 0===e?void 0:e.image,fadedImage:null===e||void 0===e?void 0:e.fadedImage,selected:!0,selectedFaculty:O}):(0,y.jsx)(b,{faculty:e,name:e.faculty,image:e.image,fadedImage:e.fadedImage,selected:!1,selectedFaculty:O})},e.faculty+n)}))}),(0,y.jsx)("div",{className:"preference-create-button-container",onClick:function(){return X.apply(this,arguments)},children:(0,y.jsx)(d.z,{type:"primary-rounded",label:"Create Account",labelColor:"white"})})]})}},27494:function(e){function n(e,n,r){var t,a,l,i,s;function o(){var u=Date.now()-i;u<n&&u>=0?t=setTimeout(o,n-u):(t=null,r||(s=e.apply(l,a),l=a=null))}null==n&&(n=100);var u=function(){l=this,a=arguments,i=Date.now();var u=r&&!t;return t||(t=setTimeout(o,n)),u&&(s=e.apply(l,a),l=a=null),s};return u.clear=function(){t&&(clearTimeout(t),t=null)},u.flush=function(){t&&(s=e.apply(l,a),l=a=null,clearTimeout(t),t=null)},u}n.debounce=n,e.exports=n}}]);
//# sourceMappingURL=5254.7c95b3a1.chunk.js.map
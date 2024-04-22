"use strict";(self.webpackChunkyoda_admin_react=self.webpackChunkyoda_admin_react||[]).push([[1344],{71344:(e,t,r)=>{r.r(t),r.d(t,{default:()=>x});var n=r(65043),a=r(62582),i=r(40854),o=r.n(i),s=r(94376),l=r(15627),c=r(47419),u=r(11645),p=r(60521),d=r(89421),h=r(73056),m=r(72303),f=r(14556),v=(r(34443),r(35323)),y=r(53226),g=r(70579);function x(){(0,f.wA)(),(0,f.d4)((e=>e.auth));const e=(0,f.d4)((e=>e.auth.loading)),[t]=((0,f.d4)((e=>e.auth.message)),s.A.useForm()),r=(0,v.W6)(),[i,x]=(0,n.useState)(""),[j,A]=(0,n.useState)(""),[w,b]=(0,n.useState)(""),[N,C]=(0,n.useState)(""),[P,k]=(0,n.useState)(""),[R,_]=(0,n.useState)("");return(0,g.jsxs)(c.A,{gutter:[32,0],className:"hp-authentication-page",children:[(0,g.jsx)(h.A,{}),(0,g.jsx)(u.A,{lg:12,span:24,className:"hp-py-sm-0 hp-py-md-64",children:(0,g.jsx)(c.A,{className:"hp-h-100",align:"middle",justify:"center",children:(0,g.jsxs)(u.A,{xxl:11,xl:15,lg:20,md:20,sm:24,className:"hp-px-sm-8 hp-pt-24 hp-pb-48",children:[(0,g.jsx)("span",{className:"hp-d-block hp-p1-body hp-text-color-dark-0 hp-text-color-black-100 hp-font-weight-500 hp-mb-6",children:(0,g.jsx)(y.A,{id:"signup-free"})}),(0,g.jsx)("h1",{children:"Create Account"}),(0,g.jsx)("p",{className:"hp-mt-8 hp-text-color-black-60",children:(0,g.jsx)(y.A,{id:"signup-intro"})}),(0,g.jsxs)(s.A,{layout:"vertical",name:"basic",form:t,className:"hp-mt-sm-16 hp-mt-32",onFinish:async()=>{try{const t=await o().post("http://54.81.250.98:8083/api/auth/signup",{firstName:i,lastName:j,email:N,password:P,name:w});var e;if(console.log(t),console.log("Response:",t),null!==t&&void 0!==t&&t.data)l.Ay.success(null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.message),localStorage.setItem("user",JSON.stringify(null===t||void 0===t?void 0:t.data)),r.push("/pages/config_dept")}catch(a){var t,n;if("Request failed with status code 409"==(null===a||void 0===a?void 0:a.message))l.Ay.error(null===(t=response)||void 0===t||null===(n=t.data)||void 0===n?void 0:n.message);console.error("Error:",a)}},onFinishFailed:()=>{l.Ay.error("Submit failed!")},children:[(0,g.jsx)(s.A.Item,{label:(0,g.jsx)(y.A,{id:"first-name"}),name:"firstName",rules:[{required:!0},{type:"string",min:4}],children:(0,g.jsx)(p.A,{id:"firstName",value:i,onChange:e=>x(e.target.value)})}),(0,g.jsx)(s.A.Item,{label:(0,g.jsx)(y.A,{id:"last-name"}),name:"lastName",rules:[{required:!0},{type:"string",min:4}],children:(0,g.jsx)(p.A,{id:"lastName",value:j,onChange:e=>A(e.target.value)})}),(0,g.jsx)(s.A.Item,{label:"E-mail :",name:"email",rules:[{type:"email",message:"The input is not valid E-mail!"},{required:!0,message:"Please input your E-mail!"}],children:(0,g.jsx)(p.A,{id:"email",value:N,onChange:e=>C(e.target.value)})}),(0,g.jsx)(s.A.Item,{label:(0,g.jsx)(y.A,{id:"company-name"}),name:"name",rules:[{required:!0},{type:"string",min:3}],children:(0,g.jsx)(p.A,{id:"name",value:w,onChange:e=>b(e.target.value)})}),(0,g.jsx)(s.A.Item,{label:"Password :",name:"password",rules:[{required:!0},{type:"string",min:6},{validator:(e,t)=>/^(?=.*[A-Z])(?=.*\d).+$/.test(t)?Promise.resolve():Promise.reject(new Error("Password must contain at least one uppercase letter and one number."))}],children:(0,g.jsx)(p.A.Password,{id:"password",value:P,onChange:e=>k(e.target.value)})}),(0,g.jsx)(s.A.Item,{label:"Confirm Password :",name:"confirm-password",rules:[{required:!0},{type:"string",min:6},e=>{let{getFieldValue:t}=e;return{validator:(e,r)=>r&&t("password")!==r?Promise.reject(new Error("The new password that you entered do not match!")):Promise.resolve()}}],children:(0,g.jsx)(p.A.Password,{id:"confirm-password",value:R,onChange:e=>_(e.target.value)})}),(0,g.jsx)(s.A.Item,{className:"hp-mt-16 hp-mb-8",children:(0,g.jsx)(d.A,{loading:e,block:!0,type:"primary",htmlType:"submit",children:"Sign up"})})]}),(0,g.jsxs)("div",{className:"hp-form-info hp-text-center",children:[(0,g.jsx)("span",{className:"hp-text-color-black-80 hp-text-color-dark-40 hp-caption hp-mr-4",children:(0,g.jsx)(y.A,{id:"signup-have-account"})}),(0,g.jsx)(a.N_,{to:"/pages/authentication/login",className:"hp-text-color-primary-1 hp-text-color-dark-primary-2 hp-caption",children:"Login"})]}),(0,g.jsx)(m.A,{})]})})})]})}},35323:(e,t,r)=>{function n(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var a=r(91688),i=n(r(65043)),o=r(77321);r(65173),r(58620);var s=n(r(62213));function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function c(e,t){e.prototype=Object.create(t.prototype),u(e.prototype.constructor=e,t)}function u(e,t){return(u=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function p(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],0<=t.indexOf(r)||(a[r]=e[r]);return a}var d=function(e){function t(){for(var t,r=arguments.length,n=new Array(r),a=0;a<r;a++)n[a]=arguments[a];return(t=e.call.apply(e,[this].concat(n))||this).history=o.createBrowserHistory(t.props),t}return c(t,e),t.prototype.render=function(){return i.createElement(a.Router,{history:this.history,children:this.props.children})},t}(i.Component),h=function(e){function t(){for(var t,r=arguments.length,n=new Array(r),a=0;a<r;a++)n[a]=arguments[a];return(t=e.call.apply(e,[this].concat(n))||this).history=o.createHashHistory(t.props),t}return c(t,e),t.prototype.render=function(){return i.createElement(a.Router,{history:this.history,children:this.props.children})},t}(i.Component),m=function(e,t){return"function"==typeof e?e(t):e},f=function(e,t){return"string"==typeof e?o.createLocation(e,null,null,t):e},v=function(e){return e},y=i.forwardRef;void 0===y&&(y=v);var g=y((function(e,t){var r=e.innerRef,n=e.navigate,a=e.onClick,o=p(e,["innerRef","navigate","onClick"]),s=o.target,c=l({},o,{onClick:function(t){try{a&&a(t)}catch(e){throw t.preventDefault(),e}t.defaultPrevented||0!==t.button||s&&"_self"!==s||function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(t)||(t.preventDefault(),n())}});return c.ref=v!==y&&t||r,i.createElement("a",c)})),x=y((function(e,t){var r=e.component,n=void 0===r?g:r,c=e.replace,u=e.to,d=e.innerRef,h=p(e,["component","replace","to","innerRef"]);return i.createElement(a.__RouterContext.Consumer,null,(function(e){e||s(!1);var r=e.history,a=f(m(u,e.location),e.location),p=a?r.createHref(a):"",g=l({},h,{href:p,navigate:function(){var t=m(u,e.location),n=o.createPath(e.location)===o.createPath(f(t));(c||n?r.replace:r.push)(t)}});return v!==y?g.ref=t||d:g.innerRef=d,i.createElement(n,g)}))})),j=function(e){return e},A=i.forwardRef;void 0===A&&(A=j);var w=A((function(e,t){var r=e["aria-current"],n=void 0===r?"page":r,o=e.activeClassName,c=void 0===o?"active":o,u=e.activeStyle,d=e.className,h=e.exact,v=e.isActive,y=e.location,g=e.sensitive,w=e.strict,b=e.style,N=e.to,C=e.innerRef,P=p(e,["aria-current","activeClassName","activeStyle","className","exact","isActive","location","sensitive","strict","style","to","innerRef"]);return i.createElement(a.__RouterContext.Consumer,null,(function(e){e||s(!1);var r=y||e.location,o=f(m(N,r),r),p=o.pathname,k=p&&p.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1"),R=k?a.matchPath(r.pathname,{path:k,exact:h,sensitive:g,strict:w}):null,_=!!(v?v(R,r):R),E="function"==typeof d?d(_):d,S="function"==typeof b?b(_):b;_&&(E=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return t.filter((function(e){return e})).join(" ")}(E,c),S=l({},S,u));var O=l({"aria-current":_&&n||null,className:E,style:S,to:o},P);return j!==A?O.ref=t||C:O.innerRef=C,i.createElement(x,O)}))}));Object.defineProperty(t,"W6",{enumerable:!0,get:function(){return a.useHistory}})},62213:e=>{var t="Invariant failed";e.exports=function(e,r){if(!e)throw new Error(t)}},58620:(e,t,r)=>{r.r(t),r.d(t,{default:()=>n});const n=function(e,t){}}}]);
//# sourceMappingURL=1344.2977998e.chunk.js.map
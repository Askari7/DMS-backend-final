"use strict";(self.webpackChunkyoda_admin_react=self.webpackChunkyoda_admin_react||[]).push([[1310],{71310:(e,t,n)=>{n.r(t),n.d(t,{default:()=>x});var r=n(65043),l=n(79940),i=n(94376),a=n(15627),s=n(60521),o=n(39998),c=n(89421),d=n(91688),h=n(40854),u=n.n(h),p=n(70579);const{Option:m}=l.A,x=()=>{var e;const[t]=i.A.useForm();var n="";const[h,x]=(0,r.useState)(JSON.parse(null===(e=localStorage)||void 0===e?void 0:e.getItem("user"))),[y,g]=(0,r.useState)([{prefix:"",length:"",type:""},{prefix:"",length:"",type:""},{prefix:"",length:"",type:""},{prefix:"",length:"",type:""}]),v=(e,t,n)=>{const r=[...y];if("length"===t){const l=parseInt(n);l<0?r[e][t]=0:l>5?(r[e][t]=5,a.Ay.warning("Prefix length cannot exceed 5.")):r[e][t]=l}else r[e][t]=n;g(r)},j=(0,d.useHistory)(),A=async()=>{try{var e,t;const r=await u().post(`https://novacon.live/api/documents/format?companyId=${null===h||void 0===h||null===(e=h.user)||void 0===e?void 0:e.companyId}`,{documentNumberFormat:`${n}`},{headers:{Authorization:null===h||void 0===h?void 0:h.accessToken}});console.log(r),a.Ay.success(null===r||void 0===r||null===(t=r.data)||void 0===t?void 0:t.message)}catch(r){a.Ay.error("Some Error Occured")}};return(0,p.jsxs)("div",{style:{textAlign:"center",maxWidth:"800px",margin:"0 auto"},children:[(0,p.jsx)("div",{style:{textAlign:"center",marginTop:20},children:(0,p.jsx)("h1",{children:"Company Environment Setup"})}),(0,p.jsx)("h2",{children:"Document Numbering Configuration"}),(0,p.jsxs)(i.A,{form:t,layout:"vertical",children:[y.map(((e,t)=>(0,p.jsxs)("div",{style:{marginBottom:16},children:[(0,p.jsx)(i.A.Item,{label:`Select ${t+1} Prefix:`,children:(0,p.jsxs)(l.A,{style:{width:200},value:e.prefix,onChange:e=>v(t,"prefix",e),children:[(0,p.jsx)(m,{value:"Project Code",children:"Project Code"}),(0,p.jsx)(m,{value:"Area Code",children:"Area Code"}),(0,p.jsx)(m,{value:"Department Code",children:"Department Code"}),(0,p.jsx)(m,{value:"MDR Code",children:"MDR Code"}),(0,p.jsx)(m,{value:"Document Number",children:"Document Number"})]})}),e.prefix&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(i.A.Item,{label:`Length of ${t+1} Prefix:`,children:(0,p.jsx)(s.A,{type:"number",style:{width:200},value:e.length,onChange:e=>v(t,"length",e.target.value)})}),(0,p.jsx)(i.A.Item,{label:`Type of ${t+1} Prefix:`,children:(0,p.jsxs)(l.A,{style:{width:200},value:e.type,onChange:e=>v(t,"type",e),children:[(0,p.jsx)(m,{value:"Numeric",children:"Numeric"}),(0,p.jsx)(m,{value:"Alphanumeric",children:"Alphanumeric"})]})})]}),t<y.length-1&&(0,p.jsx)(o.A,{})]},t))),y.length<10&&(0,p.jsx)(i.A.Item,{children:(0,p.jsx)(c.A,{type:"primary",htmlType:"submit",onClick:()=>g([...y,{prefix:"",length:"",type:""}]),children:"Add Prefix"})}),(0,p.jsxs)("div",{style:{marginTop:16},children:[(0,p.jsx)("h3",{children:"Generated Document Number:"}),(0,p.jsx)("p",{children:(()=>{const e=y.filter((e=>{let{prefix:t,length:n}=e;return t&&n})).map((e=>{let{prefix:t,length:n}=e;return t.charAt(0).toUpperCase().repeat(parseInt(n,10))})).join("-");return n=e,console.log(n),e})()})]}),(0,p.jsx)(i.A.Item,{children:(0,p.jsx)(c.A,{type:"primary",htmlType:"submit",onClick:async()=>{await A(),j.push("/pages/analytics")},children:"Proceed"})})]})]})}}}]);
//# sourceMappingURL=1310.2774adfb.chunk.js.map
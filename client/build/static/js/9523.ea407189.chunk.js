"use strict";(self.webpackChunkyoda_admin_react=self.webpackChunkyoda_admin_react||[]).push([[9523],{19523:(e,l,t)=>{t.r(l),t.d(l,{default:()=>m});var a=t(65043),s=t(15627),o=t(94376),n=t(79940),r=t(47419),i=t(11645),u=t(89421),d=t(40854),c=t.n(d),v=t(70579);function m(){var e,l;const[t,d]=(0,a.useState)(!1),[m,h]=(0,a.useState)([]),[p,b]=(0,a.useState)([]),[y,x]=(0,a.useState)(""),[g,S]=(0,a.useState)(!1),[f,j]=(0,a.useState)(JSON.parse(null===(e=localStorage)||void 0===e?void 0:e.getItem("user"))),[A,F]=(0,a.useState)([]),[I,C]=(0,a.useState)([]),[k,w]=(0,a.useState)([]),[N,$]=(0,a.useState)(""),[q,z]=(0,a.useState)(""),[P,T]=(0,a.useState)(""),[_,O]=(0,a.useState)(""),[E,J]=(0,a.useState)(""),[B,U]=(0,a.useState)(""),[D,G]=(0,a.useState)(""),[H,K]=(0,a.useState)(""),[L,M]=(0,a.useState)(""),Q=async()=>{try{var e;const l=await c().get(`https://novacon.live/api/documents/format?companyId=${null===f||void 0===f||null===(e=f.user)||void 0===e?void 0:e.companyId}`,{headers:{Authorization:null===f||void 0===f?void 0:f.accessToken}});console.log(l.data),F(l.data),console.log(l.data,"data");l.data.documentNumberFormat.split(",");const{documentNumberFormat:t}=l.data,a=t.split("-"),[s,o,n,r]=a;console.log(s,o,n,r,"order"),U(s),G(o),K(n),M(r),console.log(a,"array")}catch(l){console.error(l)}};return(0,a.useEffect)((()=>{var e;j(JSON.parse(null===(e=localStorage)||void 0===e?void 0:e.getItem("user"))),Q()}),[]),(0,v.jsx)(v.Fragment,{children:(0,v.jsx)("div",{style:{display:"flex",justifyContent:"center"},children:(0,v.jsxs)("div",{style:{textAlign:"left",marginBottom:"16px"},children:[(0,v.jsx)("strong",{style:{color:"blue",fontSize:"32px",justifyContent:"center",textAlign:"center"},children:A.name}),(0,v.jsx)("br",{}),(0,v.jsx)("strong",{style:{color:"black",fontSize:"16px",justifyContent:"center",textAlign:"center"},children:A.documentNumberFormat}),(0,v.jsxs)(o.A,{layout:"vertical",name:"basic",children:[(0,v.jsx)(o.A.Item,{label:"First Field",name:"firstField",rules:[{required:!0,message:"Please select first field"}],children:(0,v.jsx)(n.A,{style:{width:"420px"},options:[{value:B,label:B},{value:D,label:D},{value:H,label:H},{value:L,label:L}],value:q,onChange:e=>z(e)})}),(0,v.jsx)(o.A.Item,{label:"Second Field",name:"secondField",rules:[{required:!0,message:"Please select second field"}],children:(0,v.jsx)(n.A,{style:{width:"420px"},options:[{value:B,label:B},{value:D,label:D},{value:H,label:H},{value:L,label:L}],value:q,onChange:e=>T(e)})}),(0,v.jsx)(o.A.Item,{label:"Third Field",name:"thirdField",rules:[{required:!0,message:"Please select third field"}],children:(0,v.jsx)(n.A,{style:{width:"420px"},options:[{value:B,label:B},{value:D,label:D},{value:H,label:H},{value:L,label:L}],value:q,onChange:e=>O(e)})}),(0,v.jsx)(o.A.Item,{label:"Fourth Field",name:"fourthField",rules:[{required:!0,message:"Please select fourth field"}],children:(0,v.jsx)(n.A,{style:{width:"420px"},options:[{value:B,label:B},{value:D,label:D},{value:H,label:H},{value:L,label:L}],value:q,onChange:e=>J(e)})}),(0,v.jsx)(r.A,{justify:"center",children:(0,v.jsx)(i.A,{md:10,span:10,className:"hp-pr-sm-0 hp-pr-12",children:(0,v.jsx)(u.A,{block:!0,type:"primary",htmlType:"submit",onClick:()=>{(async()=>{try{var e,l;const t=await c().post(`https://novacon.live/api/documents/format?companyId=${null===f||void 0===f||null===(e=f.user)||void 0===e?void 0:e.companyId}`,{documentNumberFormat:`${q}-${P}-${_}-${E}`},{headers:{Authorization:null===f||void 0===f?void 0:f.accessToken}});console.log(t),s.Ay.success(null===t||void 0===t||null===(l=t.data)||void 0===l?void 0:l.message),d(!1),Q()}catch(t){s.Ay.error("Some Error Occured")}})()},disabled:1!=(null===f||void 0===f||null===(l=f.user)||void 0===l?void 0:l.roleId),children:"Update"})})})]})]})})})}}}]);
//# sourceMappingURL=9523.ea407189.chunk.js.map
"use strict";(self.webpackChunkyoda_admin_react=self.webpackChunkyoda_admin_react||[]).push([[536],{36536:(e,s,a)=>{a.r(s),a.d(s,{default:()=>w});var r=a(69060),t=a(98880),o=a(38088),c=a(26701),n=a(57156),l=a(29512),i=a(9992),d=a(74421),p=a(19164),h=a(98616),m=a(26536),u=a.n(m),x=a(82496);function w(){const[e,s]=(0,r.useState)(""),[a,m]=(0,r.useState)(""),[w]=o.c.useForm(),g=window.location.search,j=new URLSearchParams(g).get("token");console.log(j);return(0,x.jsxs)(n.c,{gutter:[32,0],className:"hp-authentication-page",children:[(0,x.jsx)(p.c,{}),(0,x.jsx)(l.c,{lg:12,span:24,className:"hp-py-sm-0 hp-py-md-64",children:(0,x.jsx)(n.c,{className:"hp-h-100",align:"middle",justify:"center",children:(0,x.jsxs)(l.c,{xxl:11,xl:15,lg:20,md:20,sm:24,className:"hp-px-sm-8 hp-pt-24 hp-pb-48",children:[(0,x.jsx)("h1",{children:"Reset Password"}),(0,x.jsx)("p",{className:"hp-mt-8 hp-text-color-black-60",children:"Email verification is done. Please choose another password"}),(0,x.jsxs)(o.c,{layout:"vertical",name:"basic",className:"hp-mt-sm-16 hp-mt-32",form:w,onFinish:()=>{u().post("http://54.81.250.98:3001/v1/auth/reset-password?token=".concat(j),{password:e}).then((e=>{console.log(e.data),204==e.status&&c.cp.success("Password is resseted")})).catch((e=>{console.log(e.response.data.message),c.cp.error(e.response.data.message)}))},onFinishFailed:()=>{c.cp.error("Submit failed!")},children:[(0,x.jsx)(o.c.Item,{label:"Password :",name:"password",rules:[{required:!0},{type:"string",min:6},{validator:(e,s)=>/^(?=.*[A-Z])(?=.*\d).+$/.test(s)?Promise.resolve():Promise.reject(new Error("Password must contain at least one uppercase letter and one number."))}],children:(0,x.jsx)(i.c.Password,{id:"password",value:e,onChange:e=>s(e.target.value),placeholder:"At least 6 characters"})}),(0,x.jsx)(o.c.Item,{label:"Confirm Password :",name:"confirm-password",rules:[{required:!0},{type:"string",min:6},e=>{let{getFieldValue:s}=e;return{validator:(e,a)=>a&&s("password")!==a?Promise.reject(new Error("The new password that you entered do not match!")):Promise.resolve()}}],children:(0,x.jsx)(i.c.Password,{id:"confirm-password",placeholder:"At least 6 characters",value:a,onChange:e=>m(e.target.value)})}),(0,x.jsx)(o.c.Item,{className:"hp-mt-16 hp-mb-8",children:(0,x.jsx)(d.c,{block:!0,type:"primary",htmlType:"submit",children:"Reset Password"})})]}),(0,x.jsxs)("div",{className:"hp-form-info hp-text-center",children:[(0,x.jsx)("span",{className:"hp-text-color-black-80 hp-text-color-dark-40 hp-caption hp-mr-4",children:"Go back to"}),(0,x.jsx)(t.cH,{to:"/pages/authentication/login",className:"hp-text-color-primary-1 hp-text-color-dark-primary-2 hp-caption",children:"Login"})]}),(0,x.jsx)(h.c,{})]})})})]})}}}]);
//# sourceMappingURL=536.13569fe3.chunk.js.map
"use strict";(self.webpackChunkyoda_admin_react=self.webpackChunkyoda_admin_react||[]).push([[3059],{43059:(e,s,a)=>{a.r(s),a.d(s,{default:()=>u});var t=a(65043),c=a(62582),n=a(15627),o=a(47419),i=a(11645),l=a(5397),r=a(73056),h=a(72303),p=a(40854),m=a.n(p),d=a(35323),x=a(70579);function u(){const e=window.location.search,s=new URLSearchParams(e).get("token"),[a,p]=(0,t.useState)(!1),u=(0,d.W6)();return console.log(s),(0,t.useEffect)((()=>{m().post(`${window.location.origin}/v1/auth/verify-email?token=${s}`).then((e=>{console.log(e.data),204==e.status&&(n.Ay.success("Email is Verified"),p(!0),u.push("/pages/authentication/login"))})).catch((e=>{console.log(e.response.data.message),n.Ay.error(e.response.data.message)}))}),[]),(0,x.jsxs)(o.A,{gutter:[32,0],className:"hp-authentication-page",children:[(0,x.jsx)(r.A,{}),(0,x.jsx)(i.A,{lg:12,span:24,className:"hp-py-sm-0 hp-py-md-64",children:(0,x.jsx)(o.A,{className:"hp-h-100",align:"middle",justify:"center",children:(0,x.jsxs)(i.A,{xxl:11,xl:15,lg:20,md:20,sm:24,className:"hp-px-sm-8 hp-pt-24 hp-pb-48",children:[(0,x.jsx)("h1",{className:"hp-mb-sm-0",children:"Verify Email"}),!a&&(0,x.jsx)(l.A,{}),(0,x.jsxs)("div",{className:"hp-form-info hp-text-center",children:[(0,x.jsx)("span",{className:"hp-text-color-black-80 hp-text-color-dark-40 hp-caption hp-mr-4",children:"Go back to"}),(0,x.jsx)(c.N_,{to:"/pages/authentication/login",className:"hp-text-color-primary-1 hp-text-color-dark-primary-2 hp-caption",children:"Login"})]}),(0,x.jsx)(h.A,{})]})})})]})}}}]);
//# sourceMappingURL=3059.df9af7a3.chunk.js.map
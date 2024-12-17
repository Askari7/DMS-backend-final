"use strict";(self.webpackChunkyoda_admin_react=self.webpackChunkyoda_admin_react||[]).push([[5270],{38180:(e,s,a)=>{a.r(s),a.d(s,{default:()=>b});var t=a(65043),i=a(62582),n=a(47419),r=a(11645);const l=a.p+"static/media/novacon.31bee1bb2bdb5fb91f00.jpg";var o=a(70579);const c=()=>(0,o.jsxs)(n.A,{style:{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center",backgroundColor:"white"},children:[(0,o.jsxs)(r.A,{children:[(0,o.jsx)("img",{src:l,alt:"Logo",style:{width:"180px",margin:"18px",height:"auto",animation:"scaleAnimation 1s infinite alternate",cursor:"pointer"}}),(0,o.jsx)("h1",{style:{marginTop:"16px",color:"#333",fontSize:"64px"},children:"Project Prosperity, Simplified."})]}),(0,o.jsx)("style",{children:"\n          @keyframes scaleAnimation {\n            from {\n              transform: scale(0.9);\n            }\n            to {\n              transform: scale(1.25);\n            }\n          }\n        "})]});var d=a(94376),m=a(15627),h=a(60521),p=a(78186),u=a(89421),x=a(40854),g=a.n(x),j=a(73056),A=a(72303),f=(a(34443),a(14556)),y=a(35323),v=a(53226);function b(){(0,f.wA)();const e=(0,f.d4)((e=>e));console.log(e);const[s]=d.A.useForm(),a=(0,y.W6)(),l=(0,f.d4)((e=>e.auth.loading)),x=(0,f.d4)((e=>e.auth.isLoggedIn)),[b,w]=(0,t.useState)(!0);(0,t.useEffect)((()=>{x&&a.push("/")}),[x,a]),(0,t.useEffect)((()=>{const e=setTimeout((()=>{w(!1)}),2e3);return()=>clearTimeout(e)}),[]);const[N,k]=(0,t.useState)(""),[S,I]=(0,t.useState)("");return(0,o.jsx)(o.Fragment,{children:b?(0,o.jsx)(c,{}):(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)(n.A,{gutter:[6,0],className:"hp-authentication-page",children:[(0,o.jsx)(j.A,{}),(0,o.jsx)(r.A,{lg:12,span:24,className:"hp-py-sm-0 hp-py-md-64",children:(0,o.jsx)(n.A,{className:"hp-h-100",align:"middle",justify:"center",children:(0,o.jsxs)(r.A,{xxl:11,xl:15,lg:20,md:20,sm:24,className:"hp-px-sm-8 hp-pt-24 hp-pb-48",children:[(0,o.jsx)("h1",{className:"hp-mb-sm-0",style:{textAlign:"center",fontWeight:"bold"},children:"Login"}),(0,o.jsx)("p",{className:"hp-mt-sm-0 hp-mt-8 hp-text-color-black-60",style:{textAlign:"center"},children:(0,o.jsx)(v.A,{id:"login-welcome-back"})}),(0,o.jsxs)(d.A,{layout:"vertical",name:"basic",initialValues:{remember:!0},className:"hp-mt-sm-16 hp-mt-32",onFinish:async()=>{try{const s=await g().post("https://novacon.live/api/auth/signin",{email:N,password:S});if(console.log("Response:",s),null!==s&&void 0!==s&&s.data){var e;console.log(null===s||void 0===s?void 0:s.data),localStorage.setItem("user",JSON.stringify(null===s||void 0===s?void 0:s.data)),m.Ay.success("Signed In Successfully ");const t=JSON.parse(null===(e=localStorage)||void 0===e?void 0:e.getItem("user"));6==(null===t||void 0===t?void 0:t.user.roleId)?a.push("/pages/projects"):a.push("/pages/workspace")}}catch(s){"Request failed with status code 404"==(null===s||void 0===s?void 0:s.message)?m.Ay.error("User Not found."):"Request failed with status code 401"==(null===s||void 0===s?void 0:s.message)?m.Ay.error("Invalid Password."):m.Ay.error("Some Error Occured."),console.error("Error:",null===s||void 0===s?void 0:s.message)}},form:s,onFinishFailed:()=>{m.Ay.error("Submit failed!")},children:[(0,o.jsx)(d.A.Item,{label:"Email :",className:"hp-mb-16",name:"email",rules:[{type:"email",message:"The input is not valid E-mail!"},{required:!0,message:"Please input your E-mail!"}],children:(0,o.jsx)(h.A,{id:"email",value:N,onChange:e=>k(e.target.value)})}),(0,o.jsx)(d.A.Item,{label:"Password :",className:"hp-mb-8",name:"password",rules:[{required:!0}],children:(0,o.jsx)(h.A.Password,{id:"password",value:S,onChange:e=>I(e.target.value)})}),(0,o.jsxs)(n.A,{align:"middle",justify:"space-between",children:[(0,o.jsx)(d.A.Item,{className:"hp-mb-0",children:(0,o.jsx)(p.A,{name:"remember",children:(0,o.jsx)(v.A,{id:"remember-me"})})}),(0,o.jsx)(i.N_,{className:"hp-button hp-text-color-black-80 hp-text-color-dark-40",to:"/pages/authentication/recover-password",children:(0,o.jsx)(v.A,{id:"forgot-password"})})]}),(0,o.jsx)(d.A.Item,{className:"hp-mt-16 hp-mb-8",children:(0,o.jsx)(u.A,{loading:l,block:!0,type:"primary",htmlType:"submit",children:"Sign in"})})]}),(0,o.jsxs)(r.A,{className:"hp-form-info hp-text-center",children:[(0,o.jsx)("span",{className:"hp-text-color-black-80 hp-text-color-dark-40 hp-caption hp-font-weight-400 hp-mr-4",children:(0,o.jsx)(v.A,{id:"login-have-account"})}),(0,o.jsx)(i.N_,{className:"hp-text-color-primary-1 hp-text-color-dark-primary-2 hp-caption",to:"/pages/authentication/register",children:(0,o.jsx)(v.A,{id:"create-an-account"})})]}),(0,o.jsx)(A.A,{})]})})})]})})})}}}]);
//# sourceMappingURL=5270.7a7c67af.chunk.js.map
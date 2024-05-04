"use strict";(self.webpackChunkyoda_admin_react=self.webpackChunkyoda_admin_react||[]).push([[4287],{70877:(e,s,l)=>{l.d(s,{A:()=>o});var a=l(62582),n=l(11645),t=l(97775),r=l(70579);const o=e=>{const{breadCrumbParent:s,breadCrumbParent2:l,breadCrumbParent3:o,breadCrumbActive:i}=e;return(0,r.jsx)(n.A,{children:(0,r.jsxs)(t.A,{className:"hp-d-flex hp-flex-wrap",children:[(0,r.jsx)(t.A.Item,{children:(0,r.jsx)(a.N_,{to:"/",children:"Home"})}),"Components"===s?(0,r.jsx)(t.A.Item,{children:(0,r.jsx)(a.N_,{to:"/components/components-page",children:"Components"})}):(0,r.jsx)(t.A.Item,{children:s}),l&&(0,r.jsx)(t.A.Item,{children:l}),o&&(0,r.jsx)(t.A.Item,{children:o}),(0,r.jsx)(t.A.Item,{children:i})]})})}},23415:(e,s,l)=>{l.d(s,{A:()=>t});l(14556);var a=l(91688),n=l(70579);const t=()=>{var e;const s=null===(e=localStorage)||void 0===e?void 0:e.getItem("user");return console.log(s,"loggin"),s?null:(0,n.jsx)(a.Redirect,{to:"/pages/authentication/login"})}},44129:(e,s,l)=>{l.r(s),l.d(s,{default:()=>F});var a=l(65043),n=l(91688),t=l(83557),r=l(49812),o=l(89421),i=l(47419),c=l(52128),d=l(11645),p=l(22285),m=l(70877),h=l(53226),x=l(15627),u=l(21261),j=l(94376),A=l(60521),y=l(79170),v=l(64325),g=l(39998),b=l(75639),f=l(44411),C=l(14556),N=(l(34443),l(40854)),w=l.n(N),k=l(70579);function I(){var e,s,l,n,t,r;const[c,m]=(0,a.useState)(JSON.parse(null===(e=localStorage)||void 0===e?void 0:e.getItem("user"))),[N,I]=((0,C.wA)(),(0,a.useState)("")),[S,T]=(0,a.useState)(""),[P,E]=(0,a.useState)(""),[z,L]=(0,a.useState)(""),[J,O]=(0,a.useState)(!1),[R,_]=(0,a.useState)(!1),D="hp-border-color-black-40 hp-border-color-dark-80";(0,a.useEffect)((()=>{var e,s;I((null===c||void 0===c||null===(e=c.user)||void 0===e?void 0:e.firstName)||""),T((null===c||void 0===c||null===(s=c.user)||void 0===s?void 0:s.lastName)||""),E((null===c||void 0===c?void 0:c.phoneNumber)||""),L((null===c||void 0===c?void 0:c.address)||"")}),[]);const F=()=>{O(!1)},U=()=>{_(!1)};return(0,k.jsxs)("div",{children:[(0,k.jsx)(u.A,{title:"Contact Edit",width:416,centered:!0,visible:J,onCancel:F,footer:null,closeIcon:(0,k.jsx)(p.dCQ,{className:"remix-icon text-color-black-100",size:24}),children:(0,k.jsxs)(j.A,{layout:"vertical",name:"basic",initialValues:{remember:!0,firstName:N,lastName:S,address:z,phoneNumber:P},children:[(0,k.jsx)(j.A.Item,{label:"First Name",name:"firstName",children:(0,k.jsx)(A.A,{value:N,onChange:e=>I(e.target.value)})}),(0,k.jsx)(j.A.Item,{label:"Last Name",name:"lastName",children:(0,k.jsx)(A.A,{value:S,onChange:e=>T(e.target.value)})}),(0,k.jsxs)(i.A,{children:[(0,k.jsx)(d.A,{md:12,span:24,className:"hp-pr-sm-0 hp-pr-12",children:(0,k.jsx)(o.A,{block:!0,type:"primary",htmlType:"submit",onClick:async()=>{const e={};N&&(e.firstName=N),S&&(e.lastName=S);try{var s;const a=await w().put("http://54.81.250.98:8083/api/users/".concat(null===c||void 0===c||null===(s=c.user)||void 0===s?void 0:s.id),e,{headers:{Authorization:null===c||void 0===c?void 0:c.accessToken}});var l;if(console.log("response",a),200==(null===a||void 0===a?void 0:a.status))x.Ay.success("User Updated Successfully"),null===(l=localStorage)||void 0===l||l.setItem("user",JSON.stringify(null===a||void 0===a?void 0:a.data)),window.location.reload()}catch(a){"Request failed with status code 401"==(null===a||void 0===a?void 0:a.message)&&x.Ay.error("Unauthorized"),console.error("Error updating:",null===a||void 0===a?void 0:a.message)}L(""),I(""),T(""),E(""),F()},children:"Edit"})}),(0,k.jsx)(d.A,{md:12,span:24,className:"hp-mt-sm-12 hp-pl-sm-0 hp-pl-12",children:(0,k.jsx)(o.A,{block:!0,onClick:F,children:"Cancel"})})]})]})}),(0,k.jsx)(u.A,{title:"Preferance Edit",width:316,centered:!0,visible:R,onCancel:U,footer:null,closeIcon:(0,k.jsx)(p.dCQ,{className:"remix-icon text-color-black-100",size:24}),children:(0,k.jsxs)(j.A,{layout:"vertical",name:"basic",initialValues:{remember:!0},children:[(0,k.jsx)(j.A.Item,{label:"Language",name:"language",children:(0,k.jsx)(A.A,{})}),(0,k.jsx)(j.A.Item,{label:"Date Format",name:"dateformat",children:(0,k.jsx)(y.A,{className:"hp-w-100",suffixIcon:(0,k.jsx)(p._UP,{className:"remix-icon hp-text-color-black-60"})})}),(0,k.jsx)(j.A.Item,{label:"Timezone",name:"timezone",children:(0,k.jsx)(v.A,{className:"hp-w-100"})}),(0,k.jsxs)(i.A,{children:[(0,k.jsx)(d.A,{md:12,span:24,className:"hp-pr-sm-0 hp-pr-12",children:(0,k.jsx)(o.A,{block:!0,type:"primary",htmlType:"submit",onClick:U,children:"Edit"})}),(0,k.jsx)(d.A,{md:12,span:24,className:"hp-mt-sm-12 hp-pl-sm-0 hp-pl-12",children:(0,k.jsx)(o.A,{block:!0,onClick:U,children:"Cancel"})})]})]})}),(0,k.jsx)(g.A,{className:D}),(0,k.jsxs)(i.A,{align:"middle",justify:"space-between",children:[(0,k.jsx)(d.A,{md:12,span:24,children:(0,k.jsx)("h3",{children:(0,k.jsx)(h.A,{id:"sidebar-apps-contact"})})}),(0,k.jsx)(d.A,{md:12,span:24,className:"hp-profile-action-btn hp-text-right",children:(0,k.jsx)(o.A,{type:"primary",ghost:!0,onClick:()=>{O(!0)},children:"Edit"})}),(0,k.jsx)(d.A,{span:24,className:"hp-profile-content-list hp-mt-8 hp-pb-sm-0 hp-pb-42",children:(0,k.jsxs)(b.Ay,{size:"small",bordered:!0,style:{backgroundColor:"white"},children:[(0,k.jsxs)(b.Ay.Item,{children:[(0,k.jsx)(f.A.Text,{type:"primary",children:(0,k.jsx)(h.A,{id:"pi-fname"})}),(0,k.jsxs)(f.A.Text,{type:"secondary",style:{color:"blue"},children:[null===c||void 0===c||null===(s=c.user)||void 0===s?void 0:s.firstName," ",null===c||void 0===c||null===(l=c.user)||void 0===l?void 0:l.lastName]})]}),(0,k.jsxs)(b.Ay.Item,{children:[(0,k.jsx)(f.A.Text,{type:"primary",children:(0,k.jsx)(h.A,{id:"pi-fn"})}),(0,k.jsx)(f.A.Text,{type:"secondary",style:{color:"blue"},children:null===c||void 0===c||null===(n=c.user)||void 0===n?void 0:n.firstName})]}),(0,k.jsxs)(b.Ay.Item,{children:[(0,k.jsx)(f.A.Text,{type:"primary",children:(0,k.jsx)(h.A,{id:"pi-ln"})}),(0,k.jsx)(f.A.Text,{type:"secondary",style:{color:"blue"},children:null===c||void 0===c||null===(t=c.user)||void 0===t?void 0:t.lastName})]}),(0,k.jsxs)(b.Ay.Item,{children:[(0,k.jsx)(f.A.Text,{type:"primary",children:(0,k.jsx)(h.A,{id:"pi-email"})}),(0,k.jsx)(f.A.Text,{type:"secondary",style:{color:"blue"},children:null===c||void 0===c||null===(r=c.user)||void 0===r?void 0:r.email})]})]})})]}),(0,k.jsx)(g.A,{className:D}),(0,k.jsx)(i.A,{align:"middle",justify:"space-between"})]})}var S=l(62582),T=l(15832),P=l(99644),E=l(61744);const z=l.p+"static/media/menu-img.419d4ef23d1daac142b156031f9f1ccd.svg",L=l.p+"static/media/1.5a3d4fa5e008adaa80fc.jpg";function J(e){var s,l,r,o;const i="remix-icon hp-mr-8";const c=(0,n.useLocation)(),{pathname:p}=c,m=p.split("/"),[h,x]=(0,a.useState)(JSON.parse(null===(s=localStorage)||void 0===s?void 0:s.getItem("user")));console.log(h,e);const u=(0,C.d4)((e=>e.customise));return(0,k.jsxs)(d.A,{flex:"240px",className:"hp-profile-menu hp-py-24",children:[(0,k.jsxs)("div",{className:"hp-w-100",children:[(0,k.jsxs)("div",{className:"hp-profile-menu-header hp-mt-md-16 hp-text-center",children:[(0,k.jsx)(T.A,{count:12,children:(0,k.jsx)(P.A,{size:80,src:L})}),(0,k.jsx)("h3",{className:"hp-mt-24 hp-mb-4",children:"".concat(null===h||void 0===h||null===(l=h.user)||void 0===l?void 0:l.firstName," ").concat(null===h||void 0===h||null===(r=h.user)||void 0===r?void 0:r.lastName)}),(0,k.jsx)("a",{href:"mailto:".concat(null===h||void 0===h||null===(o=h.user)||void 0===o?void 0:o.email),className:"hp-p1-body",children:null===h||void 0===h?void 0:h.user.email})]}),(0,k.jsxs)(t.A,{mode:"inline",className:"hp-w-100 hp-profile-menu-body",theme:"light"==u.theme?"light":"dark",children:[(0,k.jsx)(t.A.Item,{icon:(0,k.jsx)(E.KJ,{set:"curved",className:i}),className:"\n              hp-mb-16 hp-pl-24 hp-pr-32\n              ".concat("personel-information"===m[m.length-1]?"ant-menu-item-selected":"ant-menu-item-selected-in-active","\n            "),onClick:e.onCloseDrawer,children:(0,k.jsx)(S.N_,{to:"/pages/profile/personel-information",children:"Information"})},"1"),(0,k.jsx)(t.A.Item,{icon:(0,k.jsx)(E.KJ,{set:"curved",className:i}),className:"\n              hp-mb-16 hp-pl-24 hp-pr-32\n              ".concat("password-change"===m[m.length-1]?"ant-menu-item-selected":"ant-menu-item-selected-in-active","\n            "),onClick:e.onCloseDrawer,children:(0,k.jsx)(S.N_,{to:"/pages/profile/password-change",children:"Password Change"})},"1"),(0,k.jsx)(t.A.Item,{icon:(0,k.jsx)(E.KJ,{set:"curved",className:i}),className:"\n              hp-mb-16 hp-pl-24 hp-pr-32\n              ".concat("company-information"===m[m.length-1]?"ant-menu-item-selected":"ant-menu-item-selected-in-active","\n            "),onClick:e.onCloseDrawer,children:(0,k.jsx)(S.N_,{to:"/pages/profile/company-information",children:"Company Information"})},"1"),(0,k.jsx)(t.A.Item,{icon:(0,k.jsx)(E.KJ,{set:"curved",className:i}),className:"\n              hp-mb-16 hp-pl-24 hp-pr-32\n              ".concat("change-profile"===m[m.length-1]?"ant-menu-item-selected":"ant-menu-item-selected-in-active","\n            "),onClick:e.onCloseDrawer,children:(0,k.jsx)(S.N_,{to:"/pages/profile/change-profile",children:"Change Company Logo"})},"1")]})]}),function(){if("none"!==e.footer)return(0,k.jsx)("div",{className:"hp-profile-menu-footer",children:(0,k.jsx)("img",{src:z,alt:"Profile Image"})})}()]})}function O(){var e;const[s,l]=(0,a.useState)(""),[n,t]=(0,a.useState)(""),[r,c]=(0,a.useState)(""),[p,m]=(0,a.useState)(JSON.parse(null===(e=localStorage)||void 0===e?void 0:e.getItem("user"))),[u]=((0,C.wA)(),j.A.useForm());return(0,k.jsxs)(i.A,{children:[(0,k.jsxs)(d.A,{span:24,children:[(0,k.jsx)("h2",{children:(0,k.jsx)(h.A,{id:"pc-cp"})}),(0,k.jsx)("p",{className:"hp-p1-body hp-mb-0",children:(0,k.jsx)(h.A,{id:"pc-setUnique"})}),(0,k.jsx)(g.A,{className:"hp-border-color-black-40 hp-border-color-dark-80"})]}),(0,k.jsx)(d.A,{xxl:5,xl:10,md:15,span:24,children:(0,k.jsxs)(j.A,{layout:"vertical",name:"basic",onFinish:async()=>{const e={};s&&(e.oldPassword=s),n&&(e.newPassword=n);try{var a;const s=await w().put("http://54.81.250.98:8083/api/users/".concat(null===p||void 0===p||null===(a=p.user)||void 0===a?void 0:a.id),e,{headers:{Authorization:null===p||void 0===p?void 0:p.accessToken}});var r;if(console.log("response",s),200==(null===s||void 0===s?void 0:s.status))x.Ay.success("User Updated Successfully"),null===(r=localStorage)||void 0===r||r.setItem("user",JSON.stringify(null===s||void 0===s?void 0:s.data)),window.location.reload()}catch(o){"Request failed with status code 401"==(null===o||void 0===o?void 0:o.message)&&x.Ay.error("Unauthorized"),console.error("Error updating:",null===o||void 0===o?void 0:o.message)}l(""),t(""),c("")},form:u,onFinishFailed:()=>{x.Ay.error("Submit failed!")},initialValues:{remember:!0},children:[(0,k.jsx)(j.A.Item,{label:(0,k.jsx)("span",{className:"hp-input-label hp-text-color-black-100 hp-text-color-dark-0",children:(0,k.jsx)(h.A,{id:"pc-old"})}),name:"old-password",rules:[{required:!0},{type:"string",min:8},{validator:(e,s)=>/^(?=.*[A-Z])(?=.*\d).+$/.test(s)?Promise.resolve():Promise.reject(new Error("Password must contain at least one uppercase letter and one number."))}],children:(0,k.jsx)(A.A.Password,{placeholder:"Placeholder text",id:"old-password",value:s,onChange:e=>l(e.target.value)})}),(0,k.jsx)(j.A.Item,{label:(0,k.jsx)("span",{className:"hp-input-label hp-text-color-black-100 hp-text-color-dark-0",children:(0,k.jsx)(h.A,{id:"pc-new"})}),name:"new-password",rules:[{required:!0},{type:"string",min:8},{validator:(e,s)=>/^(?=.*[A-Z])(?=.*\d).+$/.test(s)?Promise.resolve():Promise.reject(new Error("Password must contain at least one uppercase letter and one number."))}],children:(0,k.jsx)(A.A.Password,{placeholder:"Placeholder text",id:"new-password",value:n,onChange:e=>t(e.target.value)})}),(0,k.jsx)(j.A.Item,{label:(0,k.jsx)("span",{className:"hp-input-label hp-text-color-black-100 hp-text-color-dark-0",children:(0,k.jsx)(h.A,{id:"pc-confirm"})}),rules:[{required:!0},{type:"string",min:8},e=>{let{getFieldValue:s}=e;return{validator:(e,l)=>l&&s("new-password")!==l?Promise.reject(new Error("The new password that you entered do not match!")):Promise.resolve()}}],name:"confirm-new-password",children:(0,k.jsx)(A.A.Password,{placeholder:"Placeholder text",id:"confirm-new-password",value:r,onChange:e=>c(e.target.value)})}),(0,k.jsx)(j.A.Item,{children:(0,k.jsx)(o.A,{block:!0,type:"primary",htmlType:"submit",children:(0,k.jsx)(h.A,{id:"pc-cp"})})})]})})]})}var R=l(23415);function _(){var e;const[s,l]=(0,a.useState)(JSON.parse(null===(e=localStorage)||void 0===e?void 0:e.getItem("user"))),[n,t]=((0,C.wA)(),(0,a.useState)("")),[r,c]=(0,a.useState)(""),[m,x]=(0,a.useState)(""),[y,v]=(0,a.useState)(""),[N,I]=(0,a.useState)(""),[S,T]=(0,a.useState)(""),[P,E]=(0,a.useState)(""),[z,L]=(0,a.useState)(""),[J,O]=(0,a.useState)(),[R,_]=(0,a.useState)(!1),[D,F]=(0,a.useState)(!1),U="hp-border-color-black-40 hp-border-color-dark-80",[q,B]=(0,a.useState)([]),Q=()=>{_(!1)},V=()=>{F(!1)};return(0,a.useEffect)((()=>{(async()=>{try{var e;const l=await w().get("http://54.81.250.98:8083/api/clients/company?companyId=".concat(null===s||void 0===s||null===(e=s.user)||void 0===e?void 0:e.companyId),{headers:{Authorization:null===s||void 0===s?void 0:s.accessToken}});console.log(l.data);const{name:a,details:n,companyEmail:r,owner:o,ownerEmail:i,address:d,contact:p,industry:m}=l.data;t(a),c(r),x(n),v(o),I(i),E(d),T(p),L(m),console.log(a,n),O(l.data)}catch(l){console.error(l)}})()}),[]),(0,k.jsxs)("div",{children:[(0,k.jsx)(u.A,{title:"Update Company Information",width:416,centered:!0,visible:R,onCancel:Q,footer:null,closeIcon:(0,k.jsx)(p.dCQ,{className:"remix-icon text-color-black-100",size:24}),children:(0,k.jsxs)(j.A,{layout:"vertical",name:"basic",children:[(0,k.jsx)(j.A.Item,{label:"Company Name",name:"companyName",children:(0,k.jsx)(A.A,{value:n,onChange:e=>t(e.target.value)})}),(0,k.jsx)(j.A.Item,{label:"Company Owner",name:"owner",children:(0,k.jsx)(A.A,{value:y,onChange:e=>v(e.target.value)})}),(0,k.jsx)(j.A.Item,{label:"Owner Email",name:"ownerEmail",children:(0,k.jsx)(A.A,{value:y,onChange:e=>I(e.target.value)})}),(0,k.jsx)(j.A.Item,{label:"Industry",name:"industry",children:(0,k.jsx)(A.A,{value:z,onChange:e=>L(e.target.value)})}),(0,k.jsx)(j.A.Item,{label:"Company Email",name:"companyEmail",children:(0,k.jsx)(A.A,{value:r,onChange:e=>c(e.target.value)})}),(0,k.jsx)(j.A.Item,{label:"Contact",name:"phoneNumber",children:(0,k.jsx)(A.A,{value:S,onChange:e=>T(e.target.value)})}),(0,k.jsx)(j.A.Item,{label:"Address",name:"industry",children:(0,k.jsx)(A.A,{value:P,onChange:e=>E(e.target.value)})}),(0,k.jsx)(j.A.Item,{label:"Details",name:"details",children:(0,k.jsx)(A.A,{value:m,onChange:e=>x(e.target.value)})}),(0,k.jsxs)(i.A,{children:[(0,k.jsx)(d.A,{md:12,span:24,className:"hp-pr-sm-0 hp-pr-12",children:(0,k.jsx)(o.A,{block:!0,type:"primary",htmlType:"submit",onClick:async()=>{try{var e;const l=await w().put("http://54.81.250.98:8083/api/clients/company?companyId=".concat(null===s||void 0===s||null===(e=s.user)||void 0===e?void 0:e.companyId),{name:n,owner:y,ownerEmail:N,details:m,industry:z,companyEmail:r,address:P,contact:S},{headers:{Authorization:null===s||void 0===s?void 0:s.accessToken}});console.log(l.data),Q()}catch(l){console.error(l)}},children:"Edit"})}),(0,k.jsx)(d.A,{md:12,span:24,className:"hp-mt-sm-12 hp-pl-sm-0 hp-pl-12",children:(0,k.jsx)(o.A,{block:!0,onClick:Q,children:"Cancel"})})]})]})}),(0,k.jsx)(u.A,{title:"Add Social Links",width:316,centered:!0,visible:D,onCancel:V,footer:null,closeIcon:(0,k.jsx)(p.dCQ,{className:"remix-icon text-color-black-100",size:24}),children:(0,k.jsxs)(j.A,{layout:"vertical",name:"basic",initialValues:{remember:!0},children:[q.map((e=>(0,k.jsx)(j.A.Item,{label:"Social Link ".concat(e.id),name:"socialLink".concat(e.id),children:(0,k.jsx)(A.A,{})},e.id))),(0,k.jsxs)(i.A,{gutter:12,children:[(0,k.jsx)(d.A,{span:24,children:(0,k.jsxs)(o.A,{block:!0,type:"primary",onClick:()=>{B([...q,{id:q.length+1}])},style:{marginBottom:"12px"},children:[(0,k.jsx)(p.G7L,{})," Add Social Link"]})}),(0,k.jsx)(d.A,{span:12,children:(0,k.jsx)(o.A,{block:!0,onClick:async()=>{try{var e;const l=await w().post("http://54.81.250.98:8083/api/clients/company?companyId=".concat(null===s||void 0===s||null===(e=s.user)||void 0===e?void 0:e.companyId),{headers:{Authorization:null===s||void 0===s?void 0:s.accessToken}});console.log(l.data)}catch(l){console.error(l)}},children:"Add"})}),(0,k.jsx)(d.A,{span:12,children:(0,k.jsx)(o.A,{block:!0,onClick:V,children:"Cancel"})})]})]})}),(0,k.jsx)(g.A,{className:U}),(0,k.jsxs)(i.A,{align:"middle",justify:"space-between",children:[(0,k.jsx)(d.A,{md:12,span:12,children:(0,k.jsx)("h3",{children:(0,k.jsx)(h.A,{id:"Company Information"})})}),(0,k.jsxs)(d.A,{md:12,span:24,className:"hp-profile-action-btn hp-text-right",children:[(0,k.jsx)(o.A,{type:"primary",ghost:!0,onClick:()=>{_(!0)},children:"Edit"}),(0,k.jsx)(o.A,{type:"primary",ghost:!0,onClick:()=>{F(!0)},style:{padding:"2px",margin:"8px"},children:"Add Social Links"})]}),(0,k.jsx)(d.A,{span:24,className:"hp-profile-content-list hp-mt-8 hp-pb-sm-0 hp-pb-42",children:(0,k.jsxs)(b.Ay,{size:"small",bordered:!0,style:{backgroundColor:"white"},children:[(0,k.jsxs)(b.Ay.Item,{style:{textAlign:"center"},children:[(0,k.jsx)(f.A.Text,{type:"primary",children:(0,k.jsx)(h.A,{id:"Name"})}),(0,k.jsx)(f.A.Text,{type:"secondary",style:{color:"blue"},children:n})]}),(0,k.jsxs)(b.Ay.Item,{style:{textAlign:"center"},children:[(0,k.jsx)(f.A.Text,{type:"primary",children:(0,k.jsx)(h.A,{id:"Company Owner"})}),(0,k.jsx)(f.A.Text,{type:"secondary",style:{color:"blue"},children:y})]}),(0,k.jsxs)(b.Ay.Item,{style:{textAlign:"center"},children:[(0,k.jsx)(f.A.Text,{type:"primary",children:(0,k.jsx)(h.A,{id:"Owner Email"})}),(0,k.jsx)(f.A.Text,{type:"secondary",style:{color:"blue"},children:N})]}),(0,k.jsxs)(b.Ay.Item,{style:{textAlign:"center"},children:[(0,k.jsx)(f.A.Text,{type:"primary",children:(0,k.jsx)(h.A,{id:"Industry"})}),(0,k.jsx)(f.A.Text,{type:"secondary",style:{color:"blue"},children:z})]}),(0,k.jsxs)(b.Ay.Item,{style:{textAlign:"center"},children:[(0,k.jsx)(f.A.Text,{type:"primary",children:(0,k.jsx)(h.A,{id:"Company Email"})}),(0,k.jsx)(f.A.Text,{type:"secondary",style:{color:"blue"},children:r})]}),(0,k.jsxs)(b.Ay.Item,{style:{textAlign:"center"},children:[(0,k.jsx)(f.A.Text,{type:"primary",children:(0,k.jsx)(h.A,{id:"Company Contact"})}),(0,k.jsx)(f.A.Text,{type:"secondary",style:{color:"blue"},children:S})]}),(0,k.jsxs)(b.Ay.Item,{style:{textAlign:"center"},children:[(0,k.jsx)(f.A.Text,{type:"primary",children:(0,k.jsx)(h.A,{id:"Company Address"})}),(0,k.jsx)(f.A.Text,{type:"secondary",style:{color:"blue"},children:P})]}),(0,k.jsxs)(b.Ay.Item,{style:{textAlign:"center"},children:[(0,k.jsx)(f.A.Text,{type:"primary",children:(0,k.jsx)(h.A,{id:"More Info"})}),(0,k.jsx)(f.A.Text,{type:"secondary",style:{color:"blue"},children:m})]})]})})]}),(0,k.jsx)(g.A,{className:U}),(0,k.jsx)(i.A,{align:"middle",justify:"space-between"})]})}const D=()=>{var e;const[s,l]=(0,a.useState)(null),[n,t]=(0,a.useState)(JSON.parse(null===(e=localStorage)||void 0===e?void 0:e.getItem("user"))),[r,o]=(0,a.useState)();(0,a.useEffect)((()=>{(async()=>{const e=await w().post("http://54.81.250.98:8083/getLogo",{companyId:null===n||void 0===n?void 0:n.user.companyId},{headers:{Authorization:null===n||void 0===n?void 0:n.accessToken}});console.log(e.data.msg.logo,"logo"),o(e.data.msg.logo)})()}),[]);return(0,k.jsx)(k.Fragment,{children:(0,k.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"},children:(0,k.jsxs)("div",{style:{backgroundColor:"#f9f9f9",padding:"20px",borderRadius:"8px",boxShadow:"0 0 10px rgba(0, 0, 0, 0.1)"},children:[(0,k.jsx)("h2",{children:"Change Company Logo"}),(0,k.jsxs)("form",{onSubmit:async e=>{var l;e.preventDefault();const a=new FormData;a.append("image",s),a.append("companyId",null===n||void 0===n||null===(l=n.user)||void 0===l?void 0:l.companyId);const t=await w().put("http://54.81.250.98:8083/logo",a,{headers:{"Content-Type":"multipart/form-data",Authorization:null===n||void 0===n?void 0:n.accessToken}});console.log(t.data,"result")},children:[(0,k.jsx)("div",{style:{marginBottom:"15px"},children:(0,k.jsx)("input",{type:"file",name:"image",id:"image",accept:"image/*",onChange:e=>{console.log(e.target.files[0]),l(e.target.files[0])},style:{width:"100%",padding:"10px",border:"1px solid #ccc",borderRadius:"4px"}})}),(0,k.jsx)("div",{style:{marginBottom:"15px"},children:(0,k.jsx)("button",{type:"submit",style:{padding:"10px 20px",backgroundColor:"#007bff",color:"#fff",border:"none",borderRadius:"4px",cursor:"pointer",transition:"background-color 0.3s ease"},children:"Submit"})})]})]})})})};l(88102),l(38883),l(53150),l(81636);function F(){const[e,s]=(0,a.useState)(!1),l=()=>{s(!1)},h=(0,k.jsx)(t.A,{children:(0,k.jsx)(t.A.Item,{children:"Change Avatar"},"0")});function x(){return(0,k.jsx)(r.A,{overlay:h,placement:"bottomLeft",children:(0,k.jsx)(o.A,{type:"text",icon:(0,k.jsx)(p.BlR,{className:"hp-text-color-black-100 hp-text-color-dark-0",size:24})})})}return(0,k.jsxs)(i.A,{gutter:[32,32],className:"hp-mb-32",children:[(0,k.jsx)(c.A,{title:x(),className:"hp-profile-mobile-menu",placement:"left",closable:!0,onClose:l,visible:e,closeIcon:(0,k.jsx)(p.dCQ,{className:"remix-icon hp-text-color-black-80",size:24}),children:(0,k.jsx)(J,{onCloseDrawer:l,moreBtnCheck:"none",footer:"none"})}),(0,k.jsx)(d.A,{span:24,children:(0,k.jsx)(i.A,{gutter:[32,32],justify:"space-between",children:(0,k.jsx)(m.A,{breadCrumbParent:"Pages",breadCrumbActive:"Profile"})})}),(0,k.jsxs)(d.A,{span:24,children:[(0,k.jsx)(i.A,{className:"hp-profile-mobile-menu-btn hp-bg-color-black-0 hp-bg-color-dark-100 hp-border-radius hp-py-12 hp-px-sm-8 hp-px-24 hp-mb-16",children:(0,k.jsx)(o.A,{className:"hp-p-0",type:"text",icon:(0,k.jsx)(p.ybW,{size:24,className:"remix-icon hp-text-color-black-80 hp-text-color-dark-30"}),onClick:()=>{s(!0)}})}),(0,k.jsxs)(i.A,{className:"hp-bg-color-black-0 hp-bg-color-dark-100 hp-border-radius hp-pr-sm-16 hp-pr-32",children:[(0,k.jsx)(J,{moreBtn:x}),(0,k.jsx)(d.A,{flex:"1 1",className:"hp-pl-sm-16 hp-pl-32 hp-py-sm-24 hp-py-32 hp-pb-24 hp-overflow-hidden",children:(0,k.jsxs)(n.Switch,{children:[(0,k.jsx)(n.Route,{path:"/pages/profile/personel-information",exact:!0,children:(0,k.jsx)(I,{})}),(0,k.jsx)(n.Route,{path:"/pages/profile/password-change",children:(0,k.jsx)(O,{})}),(0,k.jsx)(n.Route,{path:"/pages/profile/company-information",children:(0,k.jsx)(_,{})}),(0,k.jsx)(n.Route,{path:"/pages/profile/change-profile",children:(0,k.jsx)(D,{})})]})})]})]}),(0,k.jsx)(R.A,{})]})}}}]);
//# sourceMappingURL=4287.70afd64c.chunk.js.map
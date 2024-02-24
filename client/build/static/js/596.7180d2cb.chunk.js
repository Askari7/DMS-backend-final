"use strict";(self.webpackChunkyoda_admin_react=self.webpackChunkyoda_admin_react||[]).push([[596],{59408:(e,t,a)=>{a.d(t,{c:()=>r});a(33280);var l=a(83144),n=a(82496);const r=()=>{var e;const t=null===(e=localStorage)||void 0===e?void 0:e.getItem("user");return console.log(t,"loggin"),t?null:(0,n.jsx)(l.Redirect,{to:"/pages/authentication/login"})}},37596:(e,t,a)=>{a.r(t),a.d(t,{default:()=>b});var l=a(69060),n=a(84196),r=a(26701),i=a(39322),o=a(38088),s=a(9992),c=a(80336),d=a(48004),u=a(57156),m=a(29512),p=a(74421),v=a(19056),g=a(38112),h=a(26536),x=a.n(h),y=a(59408),f=a(82496);const j=[{title:"User ID",dataIndex:"id",key:"id"},{title:"Name",dataIndex:"firstName",key:"firstName"},{title:"Email",dataIndex:"email",key:"email"},{title:"Role",dataIndex:"roleTitle",key:"roleTitle"},{title:"Department",dataIndex:"department",key:"department"},{title:"Action",key:"action",render:(e,t)=>(0,f.jsx)(n.c,{size:"middle",children:(0,f.jsx)("a",{children:"Delete"})})}];function b(){var e,t;const[a,n]=(0,l.useState)(""),[h,b]=(0,l.useState)([]),[S,I]=(0,l.useState)(!1),[N,E]=(0,l.useState)(""),[k,z]=(0,l.useState)(""),[C,w]=(0,l.useState)(""),[O,A]=(0,l.useState)(""),P=/\S+@\S+\.\S+/.test(N),[D,T]=(0,l.useState)(JSON.parse(null===(e=localStorage)||void 0===e?void 0:e.getItem("user"))),[F,G]=(0,l.useState)([]),q=()=>{I(!1)},B=async()=>{try{var e;const t=await x().get("http://54.81.250.98:8083/api/users?companyId=".concat(null===D||void 0===D||null===(e=D.user)||void 0===e?void 0:e.companyId),{headers:{Authorization:null===D||void 0===D?void 0:D.accessToken}});console.log(t.data),G(t.data)}catch(t){console.error("Error fetching documents:",null===t||void 0===t?void 0:t.message)}};return(0,l.useEffect)((()=>{var e;T(JSON.parse(null===(e=localStorage)||void 0===e?void 0:e.getItem("user"))),(async()=>{try{var e;const t=await x().get("http://54.81.250.98:8083/api/departments?companyId=".concat(null===D||void 0===D||null===(e=D.user)||void 0===e?void 0:e.companyId),{headers:{Authorization:null===D||void 0===D?void 0:D.accessToken}}),a=[];for(const e of null===t||void 0===t?void 0:t.data)a.push({value:null===e||void 0===e?void 0:e.id,label:null===e||void 0===e?void 0:e.title});b(a)}catch(t){console.error("Error fetching departments:",null===t||void 0===t?void 0:t.message)}})(),B()}),[]),(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(i.c,{title:"Add User",width:416,centered:!0,visible:S,onCancel:q,footer:null,closeIcon:(0,f.jsx)(g.M5$,{className:"remix-icon text-color-black-100",size:24}),children:(0,f.jsxs)(o.c,{layout:"vertical",name:"basic",children:[(0,f.jsx)(o.c.Item,{label:"First Name",name:"firstName",rules:[{required:!0,message:"Please input your firstName!"}],children:(0,f.jsx)(s.c,{value:C,onChange:e=>w(e.target.value)})}),(0,f.jsx)(o.c.Item,{label:"Last Name",name:"lastName",rules:[{required:!0,message:"Please input your lastName!"}],children:(0,f.jsx)(s.c,{value:O,onChange:e=>A(e.target.value)})}),(0,f.jsx)(o.c.Item,{label:"E-mail :",name:"email",rules:[{type:"email",message:"The input is not valid E-mail!"},{required:!0,message:"Please input your E-mail!"}],children:(0,f.jsx)(s.c,{id:"email",value:N,onChange:e=>E(e.target.value)})}),(0,f.jsx)(o.c.Item,{label:"Role",name:"role",children:(0,f.jsx)(c.default,{defaultValue:"Head",options:[{value:"head",label:"Head"},{value:"seniorEngineer",label:"Senior Engineer"},{value:"juniorEngineer",label:"Junior Engineer"},{value:"designer",label:"Designer/Draftsmen"}],value:k,onChange:e=>z(e)})}),(0,f.jsx)(o.c.Item,{label:"Select Department",rules:[{required:!0,message:"Please select one department!"}],children:(0,f.jsx)(d.c.Group,{options:h,value:a,onChange:n})}),(0,f.jsxs)(u.c,{children:[(0,f.jsx)(m.c,{md:12,span:24,className:"hp-pr-sm-0 hp-pr-12",children:(0,f.jsx)(p.c,{block:!0,type:"primary",htmlType:"submit",onClick:()=>(async()=>{try{var e,t;const l={head:2,seniorEngineer:3,juniorEngineer:4,designer:5},n=await x().post("http://54.81.250.98:8083/api/users",{roleId:l[k],companyId:null===D||void 0===D||null===(e=D.user)||void 0===e?void 0:e.companyId,department:a[0],email:N,firstName:C,lastName:O},{headers:{Authorization:null===D||void 0===D?void 0:D.accessToken}});console.log(n),r.cp.success(null===n||void 0===n||null===(t=n.data)||void 0===t?void 0:t.message),B(),q()}catch(l){console.error("Error adding user:",l)}})(),disabled:!(N.length&&C.length&&O.length&&P),className:N.length&&C.length&&O.length&&P?"":"disabled-button",children:"Add"})}),(0,f.jsx)(m.c,{md:12,span:24,className:"hp-mt-sm-12 hp-pl-sm-0 hp-pl-12",children:(0,f.jsx)(p.c,{block:!0,onClick:q,children:"Cancel"})})]})]})}),(0,f.jsx)("div",{style:{textAlign:"right",marginBottom:"16px"},children:(0,f.jsx)(p.c,{type:"primary",onClick:()=>{I(!0)},disabled:1!=(null===D||void 0===D||null===(t=D.user)||void 0===t?void 0:t.roleId),children:"Add User"})}),(0,f.jsx)(v.c,{columns:j,dataSource:F}),(0,f.jsx)(y.c,{})]})}},84196:(e,t,a)=>{a.d(t,{U:()=>v,c:()=>h});var l=a(45072),n=a(52536),r=a(32920),i=a(69060),o=a(264),s=a.n(o),c=a(6776),d=a(33832);function u(e){var t=e.className,a=e.direction,r=e.index,o=e.marginDirection,s=e.children,c=e.split,d=e.wrap,u=i.useContext(v),m=u.horizontalSize,p=u.verticalSize,g=u.latestIndex,h={};return u.supportFlexGap||("vertical"===a?r<g&&(h={marginBottom:m/(c?2:1)}):h=(0,l.c)((0,l.c)({},r<g&&(0,n.c)({},o,m/(c?2:1))),d&&{paddingBottom:p})),null===s||void 0===s?null:i.createElement(i.Fragment,null,i.createElement("div",{className:t,style:h},s),r<g&&c&&i.createElement("span",{className:"".concat(t,"-split"),style:h},c))}var m=a(38304),p=function(e,t){var a={};for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&t.indexOf(l)<0&&(a[l]=e[l]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var n=0;for(l=Object.getOwnPropertySymbols(e);n<l.length;n++)t.indexOf(l[n])<0&&Object.prototype.propertyIsEnumerable.call(e,l[n])&&(a[l[n]]=e[l[n]])}return a},v=i.createContext({latestIndex:0,horizontalSize:0,verticalSize:0,supportFlexGap:!1}),g={small:8,middle:16,large:24};const h=function(e){var t,a=i.useContext(d.MT),o=a.getPrefixCls,h=a.space,x=a.direction,y=e.size,f=void 0===y?(null===h||void 0===h?void 0:h.size)||"small":y,j=e.align,b=e.className,S=e.children,I=e.direction,N=void 0===I?"horizontal":I,E=e.prefixCls,k=e.split,z=e.style,C=e.wrap,w=void 0!==C&&C,O=p(e,["size","align","className","children","direction","prefixCls","split","style","wrap"]),A=(0,m.c)(),P=i.useMemo((function(){return(Array.isArray(f)?f:[f,f]).map((function(e){return function(e){return"string"===typeof e?g[e]:e||0}(e)}))}),[f]),D=(0,r.c)(P,2),T=D[0],F=D[1],G=(0,c.c)(S,{keepEmpty:!0}),q=void 0===j&&"horizontal"===N?"center":j,B=o("space",E),M=s()(B,"".concat(B,"-").concat(N),(t={},(0,n.c)(t,"".concat(B,"-rtl"),"rtl"===x),(0,n.c)(t,"".concat(B,"-align-").concat(q),q),t),b),R="".concat(B,"-item"),U="rtl"===x?"marginLeft":"marginRight",_=0,J=G.map((function(e,t){return null!==e&&void 0!==e&&(_=t),i.createElement(u,{className:R,key:"".concat(R,"-").concat(t),direction:N,index:t,marginDirection:U,split:k,wrap:w},e)})),H=i.useMemo((function(){return{horizontalSize:T,verticalSize:F,latestIndex:_,supportFlexGap:A}}),[T,F,_,A]);if(0===G.length)return null;var L={};return w&&(L.flexWrap="wrap",A||(L.marginBottom=-F)),A&&(L.columnGap=T,L.rowGap=F),i.createElement("div",(0,l.c)({className:M,style:(0,l.c)((0,l.c)({},L),z)},O),i.createElement(v.Provider,{value:H},J))}}}]);
//# sourceMappingURL=596.7180d2cb.chunk.js.map
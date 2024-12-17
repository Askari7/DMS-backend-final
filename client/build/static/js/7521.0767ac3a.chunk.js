"use strict";(self.webpackChunkyoda_admin_react=self.webpackChunkyoda_admin_react||[]).push([[7521],{14419:(e,s,o)=>{o.d(s,{A:()=>h});var t=o(65043),a=o(39816),n=o(47419),r=o(11645),l=o(26512),i=o(22019),c=o(86178),d=o.n(c),p=o(70579);function h(){const[e]=(0,t.useState)({series:[{name:"Docs Approved by Project Manager",data:[9,9,8,7,3,1,3,9,7,3,9,4]},{name:"Docs Approved by Client",data:[7,6,3,3,1,5,8,6,2,2,7,2]},{name:"Working Docs",data:[2,3,5,4,6,8,2,3,5,1,2,2]}],options:{chart:{fontFamily:"Manrope, sans-serif",type:"area",toolbar:{show:!1},zoom:{enabled:!1}},labels:{style:{fontSize:"14px"}},dataLabels:{enabled:!1},grid:{borderColor:"#DFE6E9",row:{opacity:.5}},fill:{opacity:1,type:"solid"},stroke:{show:!0,width:4,curve:"straight",colors:["transparent"]},xaxis:{axisTicks:{show:!1,borderType:"solid",color:"#78909C",height:6,offsetX:0,offsetY:0},labels:{style:{colors:["636E72"],fontSize:"14px"}},categories:["Project1","Project2","Project3","Project4","Project5","Project6","Project7","Project8","Project9","Project10","Project11","Project12"]},legend:{horizontalAlign:"right",offsetX:40,position:"top",markers:{radius:12}},colors:["#EBFAFA","#55B1F3","#0010F7"],yaxis:{labels:{style:{colors:["636E72"],fontSize:"14px"},formatter:e=>e},min:0,max:10,tickAmount:5}}});return(0,p.jsx)(a.A,{className:"hp-border-color-black-40",children:(0,p.jsxs)(n.A,{children:[(0,p.jsx)(r.A,{className:"hp-mb-16",span:24,children:(0,p.jsxs)(n.A,{justify:"space-between",children:[(0,p.jsx)(n.A,{align:"bottom",className:"hp-pb-16",children:(0,p.jsx)("h4",{className:"hp-mr-8",children:"Documents In Projects"})}),(0,p.jsx)(r.A,{children:(0,p.jsx)(l.A,{onChange:function(e,s){console.log(e,s)},picker:"year",defaultValue:d()("2019","YYYY")})})]})}),(0,p.jsx)(r.A,{span:24,children:(0,p.jsx)("div",{id:"chart",children:(0,p.jsx)(i.A,{options:e.options,series:e.series,type:"area",height:350,legend:"legend"})})})]})})}},94140:(e,s,o)=>{o.d(s,{A:()=>d});var t=o(65043),a=o(83557),n=o(39816),r=o(47419),l=o(11645),i=o(22019),c=o(70579);function d(e){let{projects:s,projectCount:o,projectsStatusCounts:d}=e;console.log("projects",s,"projectCount",o,"projectsStatusCounts",d);const[p,h]=(0,t.useState)([0,0,0]),[u,m]=(0,t.useState)("");(0,t.useEffect)((()=>{if(s&&s.length>0){let e=0,o=0,t=0;s.forEach((s=>{switch(s.status){case"Initialized":e++;break;case"Completed":o++;break;case"Ongoing":t++}})),h([e,o,t]),console.log(s,"log"),s[0].projectId?m("MDR Progress"):m("Project Progress")}}),[s]);a.A,a.A.Item,a.A.Item,a.A.Item;(0,t.useEffect)((()=>{}),[p]);const[x]=(0,t.useState)({series:p,options:{chart:{dropShadow:{enabled:!0,top:0,left:0,blur:1.5,opacity:.3},fontFamily:"Manrope, sans-serif",type:"donut",toolbar:{show:!0},zoom:{enabled:!0}},colors:["#0010F7","#55B1F3","#1BE7FF"],labels:["Initialized","Completed"," Ongoing"],dataLabels:{style:{colors:["#55B1F3","#0010F7","#1BE7FF"]},enabled:!0},plotOptions:{pie:{donut:{size:"70%",labels:{show:!0,name:{fontSize:"2rem"},value:{fontSize:"16px",formatter:e=>`${e}`},total:{show:!0,fontSize:"16px",label:"Total",formatter:function(e){return`${e.globals.seriesTotals.reduce(((e,s)=>e+s))}`}}}}}},legend:{itemMargin:{horizontal:24,vertical:12},horizontalAlign:"center",position:"bottom",fontSize:"18px",markers:{radius:12}}}});return(0,c.jsx)(n.A,{className:"hp-border-color-black-40",children:(0,c.jsxs)(r.A,{children:[(0,c.jsx)(l.A,{span:24,children:(0,c.jsx)(r.A,{justify:"space-between",align:"top",children:(0,c.jsx)(l.A,{children:(0,c.jsx)("h4",{className:"hp-mr-8",children:u})})})}),(0,c.jsx)(l.A,{span:24,children:(0,c.jsx)("div",{id:"chart",className:"hp-donut-chart",children:(0,c.jsx)(i.A,{options:x.options,series:p,type:"donut",height:398,legend:"legend"})})})]})})}},37521:(e,s,o)=>{o.r(s),o.d(s,{default:()=>S});var t=o(65043),a=o(47419),n=o(11645),r=o(70579);var l=o(39816),i=o(26512),c=o(22019),d=o(86178),p=o.n(d);function h(){const[e]=(0,t.useState)({series:[{name:"In House",data:[28877,29334,33233,36439,32675,32333,33457,38345,36783,39457,22459,39840]},{name:"Client",data:[12010,11313,14623,18935,17345,13465,17813,19125,16256,20356,12233,14570]}],options:{chart:{fontFamily:"Manrope, sans-serif",type:"line",toolbar:{show:!1},zoom:{enabled:!1}},colors:["#0063F7","#1BE7FF"],labels:{style:{fontSize:"14px"}},dataLabels:{enabled:!1},grid:{borderColor:"#DFE6E9",row:{opacity:.5}},markers:{strokeWidth:0,size:6,colors:["#0063F7","#1BE7FF"],hover:{sizeOffset:1}},xaxis:{axisTicks:{show:!1,borderType:"solid",color:"#78909C",height:6,offsetX:0,offsetY:0},tickPlacement:"between",labels:{style:{colors:["636E72"],fontSize:"14px"}},categories:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},legend:{horizontalAlign:"right",offsetX:40,position:"top"},yaxis:{labels:{style:{colors:["636E72"],fontSize:"14px"},formatter:e=>e/1e3+"K"},min:0,max:4e4,tickAmount:4}}});return(0,r.jsx)(l.A,{className:"hp-border-color-black-40",children:(0,r.jsxs)(a.A,{children:[(0,r.jsx)(n.A,{className:"hp-mb-16",span:24,children:(0,r.jsxs)(a.A,{justify:"space-between",children:[(0,r.jsx)(a.A,{align:"bottom",className:"hp-pb-16",children:(0,r.jsx)("h4",{className:"hp-mr-8",children:"Number Of Comments"})}),(0,r.jsx)(n.A,{children:(0,r.jsx)(i.A,{onChange:function(e,s){console.log(e,s)},picker:"year",defaultValue:p()("2019","YYYY")})})]})}),(0,r.jsx)(n.A,{span:24,children:(0,r.jsx)("div",{id:"chart",children:(0,r.jsx)(c.A,{options:e.options,series:e.series,type:"line",height:350,legend:"legend"})})})]})})}function u(e){let{inputData:s,documents:o,completed:d,remaining:h}=e;console.log(s,"getting ");const[u,m]=(0,t.useState)([]),[x,g]=(0,t.useState)([o]),[f,j]=(0,t.useState)([]),[b,A]=(0,t.useState)([]),[v,y]=(0,t.useState)([]),[S,C]=(0,t.useState)([]),[k,w]=(0,t.useState)([]);(0,t.useEffect)((()=>{if(s&&s.length>0){const e=s.map((e=>e.title));console.log(e,"titlesArray"),m(e)}}),[s]),(0,t.useEffect)((()=>{if(o&&o.length>0){const e=[],s=[],t=[],a=[];for(const n of o){let o=0,r=0,l=0,i=0;for(const e of n.map((e=>e.status)))switch(console.log(e,"array"),e){case"Completed":o++;break;case"Approved(in-house)":l++;break;case"Send To Client":i++;break;default:r++}s.push(l),e.push(o),t.push(r),a.push(i)}console.log("Completed Counts:",e),console.log("Remaining Counts:",t),A(e),y(s),j(t)}g(o)}),[o]);function z(e){if(e&&e.length>0){console.log(e,"filtered");const s=[],o=[],t=[],a=[];for(const n of e){console.log(n,"document");let e=0,r=0,l=0,i=0;for(const s of n.map((e=>e.status)))switch(console.log(s,"array"),s){case"Completed":e++;break;case"Approved(In-house)":l++;break;case"Send To Client":i++;break;default:r++}o.push(l),s.push(e),a.push(r),t.push(i)}console.log("Completed Counts:",s),console.log("Remaining Counts:",a),A(s),y(o),C(t),j(a)}}console.log(b,f);const[F]=(0,t.useState)({series:[{name:"Complete Documents",data:b},{name:"Approved(In-house) Documents",data:v},{name:"Documents send For Client's approval",data:S},{name:"Remaining Documents",data:f}],options:{chart:{fontFamily:"Manrope, sans-serif",type:"bar",toolbar:{show:!1},zoom:{enabled:!0}},labels:{style:{fontSize:"14px"}},dataLabels:{enabled:!0},grid:{borderColor:"#DFE6E9",row:{opacity:.5}},plotOptions:{bar:{horizontal:!1,borderRadius:2,columnWidth:"45%",endingShape:"rounded"},colors:{backgroundBarColors:["#0063F7","#00F7BF","#00F7BF","#00F7BF"]}},stroke:{show:!0,width:3,colors:["transparent"]},xaxis:{axisTicks:{show:!0,borderType:"solid",color:"#78909C",height:6,offsetX:0,offsetY:0},tickPlacement:"between",labels:{style:{colors:["636E72"],fontSize:"14px"}},categories:u},legend:{horizontalAlign:"right",offsetX:40,position:"top",markers:{radius:12}},yaxis:{labels:{style:{colors:["636E72"],fontSize:"14px"},formatter:e=>e},min:0,max:12,tickAmount:4}}});return(0,r.jsx)(l.A,{className:"hp-border-color-black-40",children:(0,r.jsxs)(a.A,{children:[(0,r.jsx)(n.A,{className:"hp-mb-16",span:24,children:(0,r.jsxs)(a.A,{justify:"space-between",children:[(0,r.jsx)(a.A,{align:"bottom",className:"hp-pb-16",children:(0,r.jsx)("h4",{className:"hp-mr-8",children:"Document Assessment"})}),(0,r.jsx)(n.A,{children:(0,r.jsx)(i.A,{onChange:function(e,s){console.log(e,s,"isko peecha bhej"),(e=>{if(""===e)return g(o),void z(o);console.log(x,"documentss"),console.log(e,"dateString");const s=x.map((s=>s.filter((s=>(console.log(s,"item",s.id),s.startedDate.substring(0,4)===e)))));console.log(s,"filtered"),console.log(b,f),w(s),z(s)})(s)},picker:"year",defaultValue:p()("2020","YYYY")})})]})}),(0,r.jsx)(n.A,{span:24,children:(0,r.jsx)("div",{id:"chart",children:(0,r.jsx)(c.A,{options:{...F.options,xaxis:{...F.options.xaxis,categories:u}},series:[{name:"Complete Documents",data:b},{name:"Approved(In-house) Documents",data:v},{name:"Documents send for Client's approval",data:S},{name:"Remaining Documents",data:f}],type:"bar",height:350,legend:"legend"})})})]})})}var m=o(14419);o(36050);function x(e){let{departments:s,departmentsMembers:o}=e;const[i]=(0,t.useState)({series:[{name:"Department Size",data:o}],options:{chart:{fontFamily:"Manrope, sans-serif",type:"bar",toolbar:{show:!1},zoom:{enabled:!1}},plotOptions:{bar:{borderRadius:8,horizontal:!0}},labels:{style:{fontSize:"14px"}},dataLabels:{enabled:!0},grid:{borderColor:"#DFE6E9",row:{opacity:.5}},fill:{opacity:1,type:"solid"},stroke:{show:!0,width:4,curve:"straight",colors:["transparent"]},xaxis:{axisTicks:{show:!1},labels:{style:{colors:["636E72"],fontSize:"12px"}},categories:s},legend:{horizontalAlign:"right",offsetX:40,position:"top",markers:{radius:12}},colors:["#0063F7"],yaxis:{labels:{style:{colors:["636E72"],fontSize:"14px"}}}}});return(0,r.jsx)(l.A,{className:"hp-border-color-black-40",children:(0,r.jsxs)(a.A,{children:[(0,r.jsx)(n.A,{span:24,children:(0,r.jsx)(a.A,{justify:"space-between",align:"top",children:(0,r.jsx)(n.A,{className:"hp-pb-16",children:(0,r.jsx)("h4",{className:"hp-mr-8",children:"Department Strengths"})})})}),(0,r.jsx)(n.A,{span:24,children:(0,r.jsx)("div",{id:"chart",children:(0,r.jsx)(c.A,{options:i.options,series:[{data:o}],options:{...i.options,xaxis:{...i.options.xaxis,categories:s}},type:"bar",height:350,legend:"legend"})})})]})})}var g=o(94140);var f=o(83557),j=o(49812),b=o(73754);function A(e){let{inputData:s}=e;console.log(s,"inputData");let o=s.reduce(((e,s)=>e+s),0);const i=(0,r.jsxs)(f.A,{children:[(0,r.jsx)(f.A.Item,{children:"Last 7 Days"}),(0,r.jsx)(f.A.Item,{children:"Last Month"}),(0,r.jsx)(f.A.Item,{children:"Last Year"})]}),[d]=(0,t.useState)({series:s,options:{chart:{fontFamily:"Manrope, sans-serif",type:"radialBar",toolbar:{show:!1},zoom:{enabled:!1}},colors:["#00F7BF","#0010F7","#CC6CE7","#7DDA58"],labels:["Reviewed Pending","Approved Pending","Reviewed","Approved"],dataLabels:{enabled:!0},stroke:{lineCap:"round"},plotOptions:{radialBar:{size:50,hollow:{size:"20%"},track:{margin:16},dataLabels:{show:!0,name:{fontSize:"16px"},value:{fontSize:"16px"},total:{show:!0,fontSize:"16px",label:"Total",value:o}}}},legend:{show:!0,itemMargin:{horizontal:24,vertical:0},horizontalAlign:"center",position:"bottom",fontSize:"16px",markers:{radius:12}}}});return(0,r.jsx)(l.A,{className:"hp-border-color-black-40",children:(0,r.jsxs)(a.A,{children:[(0,r.jsx)(n.A,{span:24,children:(0,r.jsxs)(a.A,{justify:"space-between",align:"top",children:[(0,r.jsx)(n.A,{children:(0,r.jsx)("h4",{className:"hp-mr-8",children:"Action Items"})}),(0,r.jsx)(n.A,{children:(0,r.jsx)(j.A,{overlay:i,trigger:["click"],children:(0,r.jsx)(b.QXe,{className:"hp-text-color-dark-0",size:24,onClick:e=>e.preventDefault()})})})]})}),(0,r.jsx)(n.A,{span:24,children:(0,r.jsx)("div",{id:"chart",className:"hp-donut-chart",children:(0,r.jsx)(c.A,{options:d.options,series:s,type:"radialBar",height:400,legend:"legend"})})})]})})}var v=o(40854),y=o.n(v);function S(){const[e,s]=(0,t.useState)(JSON.parse(localStorage.getItem("user"))),[o,l]=(0,t.useState)([]),[i,c]=(0,t.useState)([]),[d,p]=(0,t.useState)([]),[f,j]=(0,t.useState)([]),[b,v]=(0,t.useState)([]),[S,C]=(0,t.useState)([]),[k,w]=(0,t.useState)([]),[z,F]=(0,t.useState)([]),[D,E]=(0,t.useState)([]),[I,N]=(0,t.useState)(),[P,B]=(0,t.useState)(),[M,Y]=(0,t.useState)(),[O,T]=(0,t.useState)(),[R,L]=(0,t.useState)([]);return(0,t.useEffect)((()=>{(async()=>{try{var s;const o=await y().get(`https://novacon.live/api/projects/info?companyId=${null===e||void 0===e||null===(s=e.user)||void 0===s?void 0:s.companyId}`,{headers:{Authorization:null===e||void 0===e?void 0:e.accessToken}});console.log("Response:",o.data),l(o.data);const t=o.data.projects.map((e=>e.title)),a=o.data.departments.map((e=>e.title));console.log(a,"departments");const n=o.data.departments.map((e=>e.noOfUsers));console.log(n,"departmentMember");const r=o.data.establishments.map((e=>e.reviewerId)),i=o.data.establishments.map((e=>e.approverId)),d=o.data.establishments.map((e=>e.reviewerStatus)),h=o.data.establishments.map((e=>e.approverStatus)),u=r.map(((s,o)=>{var t;const a=s.indexOf(null===e||void 0===e||null===(t=e.user)||void 0===t?void 0:t.id.toString());return-1!==a?d[o][a]:null})),m=i.map(((s,o)=>{var t;const a=s.indexOf(null===e||void 0===e||null===(t=e.user)||void 0===t?void 0:t.id.toString());return-1!==a?h[o][a]:null})),x=u.reduce(((e,s)=>e+("1"===s?1:0)),0),g=u.reduce(((e,s)=>e+("0"===s?1:0)),0),f=m.reduce(((e,s)=>e+("1"===s?1:0)),0),b=m.reduce(((e,s)=>e+("0"===s?1:0)),0);console.log("Review Count:",g,x),console.log("Approver Count:",b,f),L([g,b,x,f]),N(g),B(x),Y(b),T(f),v(a),C(n);const A=[],S=[],k=[];for(const e of o.data.documents){let s=0,o=0,t=0;for(const a of e.map((e=>e.status)))switch(console.log(a,"array"),a){case"Completed":s++;break;case"Approved(in-house)":o++;break;default:t++}A.push(s),S.push(o),k.push(t)}console.log("Completed Counts:",A),console.log("Remaining Counts:",k),p(A),j(S),c(k),F(t)}catch(o){console.error(o)}})()}),[]),(0,r.jsxs)(a.A,{gutter:[32,32],className:"hp-mb-32",children:[(0,r.jsx)(n.A,{span:24}),e&&1===(null===e||void 0===e?void 0:e.user.roleId)&&(0,r.jsx)(n.A,{xl:12,lg:24,children:(0,r.jsx)(g.A,{projects:o.projects,projectCount:o.projectCount,projectsStatusCounts:o.projectsStatusCounts})}),e&&1===(null===e||void 0===e?void 0:e.user.roleId)&&(0,r.jsx)(n.A,{xl:12,lg:24,children:(0,r.jsx)(g.A,{projects:o.mdrs,projectCount:o.mdrCount,projectsStatusCounts:o.mdrsStatusCounts})}),e&&1===(null===e||void 0===e?void 0:e.user.roleId)&&(0,r.jsx)(n.A,{span:24,children:(0,r.jsx)(u,{inputData:o.projects,documents:o.documents,completed:d,remaining:i})}),(e&&1===(null===e||void 0===e?void 0:e.user.roleId))|(e&&2===(null===e||void 0===e?void 0:e.user.roleId))&&(0,r.jsx)(n.A,{xl:12,lg:24,children:(0,r.jsx)(A,{inputData:R})}),e&&1===(null===e||void 0===e?void 0:e.user.roleId)&&(0,r.jsx)(n.A,{xl:12,lg:24,children:(0,r.jsx)(x,{departments:b,departmentsMembers:S})}),(0,r.jsx)(n.A,{span:24,children:(0,r.jsx)(h,{})}),(0,r.jsx)(n.A,{span:24,children:(0,r.jsx)(m.A,{})})]})}},36050:(e,s,o)=>{o(65043),o(22019),o(86178),o(70579)}}]);
//# sourceMappingURL=7521.0767ac3a.chunk.js.map
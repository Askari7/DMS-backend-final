"use strict";(self.webpackChunkyoda_admin_react=self.webpackChunkyoda_admin_react||[]).push([[6384],{17616:(e,n,t)=>{t.r(n),t.d(n,{default:()=>v});var a=t(65043),o=t(15627),r=t(47419),l=t(11645),s=t(78186),i=t(21261),c=t(60521),u=t(89421),d=t(91688),p=t(40854),f=t.n(p),m=t(70579);const h=[{department:"Project Management",suffix:"PM"},{department:"Process",suffix:"PRO"},{department:"Mechanical",suffix:"TK"},{department:"Electrical",suffix:"ELE"},{department:"Instrumentation",suffix:"INS"},{department:"Civil / Structure",suffix:"CIV"},{department:"Finance",suffix:"FIN"},{department:"HR / Admin",suffix:"HR"},{department:"Quality",suffix:"QLT"}],v=()=>{var e;const[n,t]=(0,a.useState)(!1),[p,v]=(0,a.useState)(JSON.parse(null===(e=localStorage)||void 0===e?void 0:e.getItem("user"))),[y,g]=(0,a.useState)([]),[x,C]=(0,a.useState)([]),[b,k]=(0,a.useState)(!1),[A,S]=(0,a.useState)(""),E=(0,d.useHistory)(),O=async()=>{try{var e,n,t,a,r;const l=await f().post("http://54.81.250.98:8083/api/departments/",{title:x,companyId:null===p||void 0===p||null===(e=p.user)||void 0===e?void 0:e.companyId,authorId:null===p||void 0===p||null===(n=p.user)||void 0===n?void 0:n.id,authorName:"".concat(null===p||void 0===p||null===(t=p.user)||void 0===t?void 0:t.firstName," ").concat(null===p||void 0===p||null===(a=p.user)||void 0===a?void 0:a.lastName),suffix:y},{headers:{Authorization:null===p||void 0===p?void 0:p.accessToken}});console.log("departments response",l),o.Ay.success(null===l||void 0===l||null===(r=l.data)||void 0===r?void 0:r.message)}catch(l){"Request failed with status code 401"==(null===l||void 0===l?void 0:l.message)&&o.Ay.error("Unauthorized"),console.error("Error adding departments:",null===l||void 0===l?void 0:l.message)}};return(0,m.jsxs)("div",{children:[(0,m.jsx)("div",{style:{textAlign:"center",marginTop:20},children:(0,m.jsx)("h1",{children:"Company Environment Setup"})}),(0,m.jsx)("h2",{children:"Select Departments for Your Company"}),(0,m.jsx)(r.A,{children:h.map((e=>(0,m.jsxs)(l.A,{span:8,style:{display:"flex",alignItems:"center"},children:[(0,m.jsx)(s.A,{onChange:()=>(e=>{console.log(e,"ana wala "),console.log(x,"selectedDepartments"),console.log(y,"selectedSuffix");const n=x.includes(e.department)?x.filter((n=>n!==e.department)):[...x,e.department],t=y.includes(e.suffix)?y.filter((n=>n!==e.suffix)):[...y,e.suffix];console.log(n,"updatedDeartments",t),g(t),C(n)})(e),checked:x.includes(e.department),style:{marginRight:10}}),(0,m.jsxs)("div",{children:[(0,m.jsx)("span",{style:{color:"blue",marginRight:5},children:e.department}),(0,m.jsx)("span",{style:{fontStyle:"italic",marginRight:5},children:e.suffix})]})]},e.department)))}),(0,m.jsxs)("div",{style:{marginTop:20},children:[(0,m.jsx)("h3",{children:"Selected Departments:"}),(0,m.jsx)("div",{style:{display:"flex",flexWrap:"wrap"},children:x.map(((e,n)=>(0,m.jsxs)("div",{style:{marginRight:20,marginBottom:10},children:[(0,m.jsx)("span",{style:{fontSize:16},children:e}),(0,m.jsx)("span",{style:{fontStyle:"italic",marginLeft:5},children:y[n]})]},e)))})]}),(0,m.jsx)(i.A,{title:"Add New Department",visible:b,onOk:()=>{if(""!==A.trim()){const e=[...x,A];C(e),S(""),k(!1)}},onCancel:()=>{S(""),k(!1)},children:(0,m.jsx)(c.A,{placeholder:"Enter Department Title",value:A,onChange:e=>S(e.target.value)})}),(0,m.jsx)("div",{style:{textAlign:"center",marginTop:20},children:(0,m.jsx)(u.A,{type:"primary",htmlType:"submit",onClick:async()=>{console.log("my selected depts",x),await O(),E.push("/pages/config_users")},children:"Proceed"})}),n&&(0,m.jsx)(MdrTemplate,{})]})}},62058:(e,n,t)=>{t.d(n,{A:()=>i});var a=t(89379),o=t(65043);const r={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"}}]},name:"search",theme:"outlined"};var l=t(22172),s=function(e,n){return o.createElement(l.A,(0,a.A)((0,a.A)({},e),{},{ref:n,icon:r}))};const i=o.forwardRef(s)},78186:(e,n,t)=>{t.d(n,{A:()=>S});var a=t(64467),o=t(58168),r=t(65043),l=t(98139),s=t.n(l),i=t(79688),c=t(60436),u=t(5544),d=t(18574),p=t(25055),f=function(e,n){var t={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&n.indexOf(a)<0&&(t[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(a=Object.getOwnPropertySymbols(e);o<a.length;o++)n.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(e,a[o])&&(t[a[o]]=e[a[o]])}return t},m=r.createContext(null),h=function(e,n){var t=e.defaultValue,l=e.children,i=e.options,h=void 0===i?[]:i,v=e.prefixCls,y=e.className,g=e.style,x=e.onChange,C=f(e,["defaultValue","children","options","prefixCls","className","style","onChange"]),b=r.useContext(p.QO),A=b.getPrefixCls,S=b.direction,E=r.useState(C.value||t||[]),O=(0,u.A)(E,2),w=O[0],P=O[1],j=r.useState([]),D=(0,u.A)(j,2),M=D[0],N=D[1];r.useEffect((function(){"value"in C&&P(C.value||[])}),[C.value]);var T=function(){return h.map((function(e){return"string"===typeof e?{label:e,value:e}:e}))},I=A("checkbox",v),K="".concat(I,"-group"),L=(0,d.A)(C,["value","disabled"]);h&&h.length>0&&(l=T().map((function(e){return r.createElement(k,{prefixCls:I,key:e.value.toString(),disabled:"disabled"in e?e.disabled:C.disabled,value:e.value,checked:-1!==w.indexOf(e.value),onChange:e.onChange,className:"".concat(K,"-item"),style:e.style},e.label)})));var F={toggleOption:function(e){var n=w.indexOf(e.value),t=(0,c.A)(w);-1===n?t.push(e.value):t.splice(n,1),"value"in C||P(t);var a=T();null===x||void 0===x||x(t.filter((function(e){return-1!==M.indexOf(e)})).sort((function(e,n){return a.findIndex((function(n){return n.value===e}))-a.findIndex((function(e){return e.value===n}))})))},value:w,disabled:C.disabled,name:C.name,registerValue:function(e){N((function(n){return[].concat((0,c.A)(n),[e])}))},cancelValue:function(e){N((function(n){return n.filter((function(n){return n!==e}))}))}},R=s()(K,(0,a.A)({},"".concat(K,"-rtl"),"rtl"===S),y);return r.createElement("div",(0,o.A)({className:R,style:g},L,{ref:n}),r.createElement(m.Provider,{value:F},l))},v=r.forwardRef(h);const y=r.memo(v);var g=t(5753),x=function(e,n){var t={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&n.indexOf(a)<0&&(t[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(a=Object.getOwnPropertySymbols(e);o<a.length;o++)n.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(e,a[o])&&(t[a[o]]=e[a[o]])}return t},C=function(e,n){var t,l=e.prefixCls,c=e.className,u=e.children,d=e.indeterminate,f=void 0!==d&&d,h=e.style,v=e.onMouseEnter,y=e.onMouseLeave,C=e.skipGroup,b=void 0!==C&&C,k=x(e,["prefixCls","className","children","indeterminate","style","onMouseEnter","onMouseLeave","skipGroup"]),A=r.useContext(p.QO),S=A.getPrefixCls,E=A.direction,O=r.useContext(m),w=r.useRef(k.value);r.useEffect((function(){null===O||void 0===O||O.registerValue(k.value),(0,g.A)("checked"in k||!!O||!("value"in k),"Checkbox","`value` is not a valid prop, do you mean `checked`?")}),[]),r.useEffect((function(){if(!b)return k.value!==w.current&&(null===O||void 0===O||O.cancelValue(w.current),null===O||void 0===O||O.registerValue(k.value)),function(){return null===O||void 0===O?void 0:O.cancelValue(k.value)}}),[k.value]);var P=S("checkbox",l),j=(0,o.A)({},k);O&&!b&&(j.onChange=function(){k.onChange&&k.onChange.apply(k,arguments),O.toggleOption&&O.toggleOption({label:u,value:k.value})},j.name=O.name,j.checked=-1!==O.value.indexOf(k.value),j.disabled=k.disabled||O.disabled);var D=s()((t={},(0,a.A)(t,"".concat(P,"-wrapper"),!0),(0,a.A)(t,"".concat(P,"-rtl"),"rtl"===E),(0,a.A)(t,"".concat(P,"-wrapper-checked"),j.checked),(0,a.A)(t,"".concat(P,"-wrapper-disabled"),j.disabled),t),c),M=s()((0,a.A)({},"".concat(P,"-indeterminate"),f));return r.createElement("label",{className:D,style:h,onMouseEnter:v,onMouseLeave:y},r.createElement(i.A,(0,o.A)({},j,{prefixCls:P,className:M,ref:n})),void 0!==u&&r.createElement("span",null,u))},b=r.forwardRef(C);b.displayName="Checkbox";const k=b;var A=k;A.Group=y,A.__ANT_CHECKBOX=!0;const S=A},79688:(e,n,t)=>{t.d(n,{A:()=>h});var a=t(58168),o=t(64467),r=t(80045),l=t(89379),s=t(23029),i=t(92901),c=t(85501),u=t(52962),d=t(65043),p=t(98139),f=t.n(p),m=function(e){(0,c.A)(t,e);var n=(0,u.A)(t);function t(e){var a;(0,s.A)(this,t),(a=n.call(this,e)).handleChange=function(e){var n=a.props,t=n.disabled,o=n.onChange;t||("checked"in a.props||a.setState({checked:e.target.checked}),o&&o({target:(0,l.A)((0,l.A)({},a.props),{},{checked:e.target.checked}),stopPropagation:function(){e.stopPropagation()},preventDefault:function(){e.preventDefault()},nativeEvent:e.nativeEvent}))},a.saveInput=function(e){a.input=e};var o="checked"in e?e.checked:e.defaultChecked;return a.state={checked:o},a}return(0,i.A)(t,[{key:"focus",value:function(){this.input.focus()}},{key:"blur",value:function(){this.input.blur()}},{key:"render",value:function(){var e,n=this.props,t=n.prefixCls,l=n.className,s=n.style,i=n.name,c=n.id,u=n.type,p=n.disabled,m=n.readOnly,h=n.tabIndex,v=n.onClick,y=n.onFocus,g=n.onBlur,x=n.onKeyDown,C=n.onKeyPress,b=n.onKeyUp,k=n.autoFocus,A=n.value,S=n.required,E=(0,r.A)(n,["prefixCls","className","style","name","id","type","disabled","readOnly","tabIndex","onClick","onFocus","onBlur","onKeyDown","onKeyPress","onKeyUp","autoFocus","value","required"]),O=Object.keys(E).reduce((function(e,n){return"aria-"!==n.substr(0,5)&&"data-"!==n.substr(0,5)&&"role"!==n||(e[n]=E[n]),e}),{}),w=this.state.checked,P=f()(t,l,(e={},(0,o.A)(e,"".concat(t,"-checked"),w),(0,o.A)(e,"".concat(t,"-disabled"),p),e));return d.createElement("span",{className:P,style:s},d.createElement("input",(0,a.A)({name:i,id:c,type:u,required:S,readOnly:m,disabled:p,tabIndex:h,className:"".concat(t,"-input"),checked:!!w,onClick:v,onFocus:y,onBlur:g,onKeyUp:b,onKeyDown:x,onKeyPress:C,onChange:this.handleChange,autoFocus:k,ref:this.saveInput,value:A},O)),d.createElement("span",{className:"".concat(t,"-inner")}))}}],[{key:"getDerivedStateFromProps",value:function(e,n){return"checked"in e?(0,l.A)((0,l.A)({},n),{},{checked:e.checked}):null}}]),t}(d.Component);m.defaultProps={prefixCls:"rc-checkbox",className:"",style:{},type:"checkbox",defaultChecked:!1,onFocus:function(){},onBlur:function(){},onChange:function(){},onKeyDown:function(){},onKeyPress:function(){},onKeyUp:function(){}};const h=m},48060:(e,n,t)=>{t.d(n,{A:()=>i});var a=t(89379),o="".concat("accept acceptCharset accessKey action allowFullScreen allowTransparency\n    alt async autoComplete autoFocus autoPlay capture cellPadding cellSpacing challenge\n    charSet checked classID className colSpan cols content contentEditable contextMenu\n    controls coords crossOrigin data dateTime default defer dir disabled download draggable\n    encType form formAction formEncType formMethod formNoValidate formTarget frameBorder\n    headers height hidden high href hrefLang htmlFor httpEquiv icon id inputMode integrity\n    is keyParams keyType kind label lang list loop low manifest marginHeight marginWidth max maxLength media\n    mediaGroup method min minLength multiple muted name noValidate nonce open\n    optimum pattern placeholder poster preload radioGroup readOnly rel required\n    reversed role rowSpan rows sandbox scope scoped scrolling seamless selected\n    shape size sizes span spellCheck src srcDoc srcLang srcSet start step style\n    summary tabIndex target title type useMap value width wmode wrap"," ").concat("onCopy onCut onPaste onCompositionEnd onCompositionStart onCompositionUpdate onKeyDown\n    onKeyPress onKeyUp onFocus onBlur onChange onInput onSubmit onClick onContextMenu onDoubleClick\n    onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown\n    onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onSelect onTouchCancel\n    onTouchEnd onTouchMove onTouchStart onScroll onWheel onAbort onCanPlay onCanPlayThrough\n    onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata\n    onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting onLoad onError").split(/[\s\n]+/),r="aria-",l="data-";function s(e,n){return 0===e.indexOf(n)}function i(e){var n,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];n=!1===t?{aria:!0,data:!0,attr:!0}:!0===t?{aria:!0}:(0,a.A)({},t);var i={};return Object.keys(e).forEach((function(t){(n.aria&&("role"===t||s(t,r))||n.data&&s(t,l)||n.attr&&o.includes(t))&&(i[t]=e[t])})),i}}}]);
//# sourceMappingURL=6384.6b8644b3.chunk.js.map
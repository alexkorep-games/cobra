var lS=Object.defineProperty;var cS=(n,e,t)=>e in n?lS(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var Dl=(n,e,t)=>cS(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();function v0(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var x0={exports:{}},Su={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var uS=Symbol.for("react.transitional.element"),fS=Symbol.for("react.fragment");function y0(n,e,t){var i=null;if(t!==void 0&&(i=""+t),e.key!==void 0&&(i=""+e.key),"key"in e){t={};for(var s in e)s!=="key"&&(t[s]=e[s])}else t=e;return e=t.ref,{$$typeof:uS,type:n,key:i,ref:e!==void 0?e:null,props:t}}Su.Fragment=fS;Su.jsx=y0;Su.jsxs=y0;x0.exports=Su;var $=x0.exports,S0={exports:{}},ze={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Kd=Symbol.for("react.transitional.element"),hS=Symbol.for("react.portal"),dS=Symbol.for("react.fragment"),pS=Symbol.for("react.strict_mode"),mS=Symbol.for("react.profiler"),gS=Symbol.for("react.consumer"),_S=Symbol.for("react.context"),vS=Symbol.for("react.forward_ref"),xS=Symbol.for("react.suspense"),yS=Symbol.for("react.memo"),M0=Symbol.for("react.lazy"),Em=Symbol.iterator;function SS(n){return n===null||typeof n!="object"?null:(n=Em&&n[Em]||n["@@iterator"],typeof n=="function"?n:null)}var E0={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},T0=Object.assign,b0={};function Hr(n,e,t){this.props=n,this.context=e,this.refs=b0,this.updater=t||E0}Hr.prototype.isReactComponent={};Hr.prototype.setState=function(n,e){if(typeof n!="object"&&typeof n!="function"&&n!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,n,e,"setState")};Hr.prototype.forceUpdate=function(n){this.updater.enqueueForceUpdate(this,n,"forceUpdate")};function A0(){}A0.prototype=Hr.prototype;function Zd(n,e,t){this.props=n,this.context=e,this.refs=b0,this.updater=t||E0}var Qd=Zd.prototype=new A0;Qd.constructor=Zd;T0(Qd,Hr.prototype);Qd.isPureReactComponent=!0;var Tm=Array.isArray,Mt={H:null,A:null,T:null,S:null,V:null},R0=Object.prototype.hasOwnProperty;function Jd(n,e,t,i,s,a){return t=a.ref,{$$typeof:Kd,type:n,key:e,ref:t!==void 0?t:null,props:a}}function MS(n,e){return Jd(n.type,e,void 0,void 0,void 0,n.props)}function $d(n){return typeof n=="object"&&n!==null&&n.$$typeof===Kd}function ES(n){var e={"=":"=0",":":"=2"};return"$"+n.replace(/[=:]/g,function(t){return e[t]})}var bm=/\/+/g;function Wu(n,e){return typeof n=="object"&&n!==null&&n.key!=null?ES(""+n.key):e.toString(36)}function Am(){}function TS(n){switch(n.status){case"fulfilled":return n.value;case"rejected":throw n.reason;default:switch(typeof n.status=="string"?n.then(Am,Am):(n.status="pending",n.then(function(e){n.status==="pending"&&(n.status="fulfilled",n.value=e)},function(e){n.status==="pending"&&(n.status="rejected",n.reason=e)})),n.status){case"fulfilled":return n.value;case"rejected":throw n.reason}}throw n}function Wa(n,e,t,i,s){var a=typeof n;(a==="undefined"||a==="boolean")&&(n=null);var r=!1;if(n===null)r=!0;else switch(a){case"bigint":case"string":case"number":r=!0;break;case"object":switch(n.$$typeof){case Kd:case hS:r=!0;break;case M0:return r=n._init,Wa(r(n._payload),e,t,i,s)}}if(r)return s=s(n),r=i===""?"."+Wu(n,0):i,Tm(s)?(t="",r!=null&&(t=r.replace(bm,"$&/")+"/"),Wa(s,e,t,"",function(c){return c})):s!=null&&($d(s)&&(s=MS(s,t+(s.key==null||n&&n.key===s.key?"":(""+s.key).replace(bm,"$&/")+"/")+r)),e.push(s)),1;r=0;var o=i===""?".":i+":";if(Tm(n))for(var l=0;l<n.length;l++)i=n[l],a=o+Wu(i,l),r+=Wa(i,e,t,a,s);else if(l=SS(n),typeof l=="function")for(n=l.call(n),l=0;!(i=n.next()).done;)i=i.value,a=o+Wu(i,l++),r+=Wa(i,e,t,a,s);else if(a==="object"){if(typeof n.then=="function")return Wa(TS(n),e,t,i,s);throw e=String(n),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.")}return r}function Ll(n,e,t){if(n==null)return n;var i=[],s=0;return Wa(n,i,"","",function(a){return e.call(t,a,s++)}),i}function bS(n){if(n._status===-1){var e=n._result;e=e(),e.then(function(t){(n._status===0||n._status===-1)&&(n._status=1,n._result=t)},function(t){(n._status===0||n._status===-1)&&(n._status=2,n._result=t)}),n._status===-1&&(n._status=0,n._result=e)}if(n._status===1)return n._result.default;throw n._result}var Rm=typeof reportError=="function"?reportError:function(n){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof n=="object"&&n!==null&&typeof n.message=="string"?String(n.message):String(n),error:n});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",n);return}console.error(n)};function AS(){}ze.Children={map:Ll,forEach:function(n,e,t){Ll(n,function(){e.apply(this,arguments)},t)},count:function(n){var e=0;return Ll(n,function(){e++}),e},toArray:function(n){return Ll(n,function(e){return e})||[]},only:function(n){if(!$d(n))throw Error("React.Children.only expected to receive a single React element child.");return n}};ze.Component=Hr;ze.Fragment=dS;ze.Profiler=mS;ze.PureComponent=Zd;ze.StrictMode=pS;ze.Suspense=xS;ze.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Mt;ze.__COMPILER_RUNTIME={__proto__:null,c:function(n){return Mt.H.useMemoCache(n)}};ze.cache=function(n){return function(){return n.apply(null,arguments)}};ze.cloneElement=function(n,e,t){if(n==null)throw Error("The argument must be a React element, but you passed "+n+".");var i=T0({},n.props),s=n.key,a=void 0;if(e!=null)for(r in e.ref!==void 0&&(a=void 0),e.key!==void 0&&(s=""+e.key),e)!R0.call(e,r)||r==="key"||r==="__self"||r==="__source"||r==="ref"&&e.ref===void 0||(i[r]=e[r]);var r=arguments.length-2;if(r===1)i.children=t;else if(1<r){for(var o=Array(r),l=0;l<r;l++)o[l]=arguments[l+2];i.children=o}return Jd(n.type,s,void 0,void 0,a,i)};ze.createContext=function(n){return n={$$typeof:_S,_currentValue:n,_currentValue2:n,_threadCount:0,Provider:null,Consumer:null},n.Provider=n,n.Consumer={$$typeof:gS,_context:n},n};ze.createElement=function(n,e,t){var i,s={},a=null;if(e!=null)for(i in e.key!==void 0&&(a=""+e.key),e)R0.call(e,i)&&i!=="key"&&i!=="__self"&&i!=="__source"&&(s[i]=e[i]);var r=arguments.length-2;if(r===1)s.children=t;else if(1<r){for(var o=Array(r),l=0;l<r;l++)o[l]=arguments[l+2];s.children=o}if(n&&n.defaultProps)for(i in r=n.defaultProps,r)s[i]===void 0&&(s[i]=r[i]);return Jd(n,a,void 0,void 0,null,s)};ze.createRef=function(){return{current:null}};ze.forwardRef=function(n){return{$$typeof:vS,render:n}};ze.isValidElement=$d;ze.lazy=function(n){return{$$typeof:M0,_payload:{_status:-1,_result:n},_init:bS}};ze.memo=function(n,e){return{$$typeof:yS,type:n,compare:e===void 0?null:e}};ze.startTransition=function(n){var e=Mt.T,t={};Mt.T=t;try{var i=n(),s=Mt.S;s!==null&&s(t,i),typeof i=="object"&&i!==null&&typeof i.then=="function"&&i.then(AS,Rm)}catch(a){Rm(a)}finally{Mt.T=e}};ze.unstable_useCacheRefresh=function(){return Mt.H.useCacheRefresh()};ze.use=function(n){return Mt.H.use(n)};ze.useActionState=function(n,e,t){return Mt.H.useActionState(n,e,t)};ze.useCallback=function(n,e){return Mt.H.useCallback(n,e)};ze.useContext=function(n){return Mt.H.useContext(n)};ze.useDebugValue=function(){};ze.useDeferredValue=function(n,e){return Mt.H.useDeferredValue(n,e)};ze.useEffect=function(n,e,t){var i=Mt.H;if(typeof t=="function")throw Error("useEffect CRUD overload is not enabled in this build of React.");return i.useEffect(n,e)};ze.useId=function(){return Mt.H.useId()};ze.useImperativeHandle=function(n,e,t){return Mt.H.useImperativeHandle(n,e,t)};ze.useInsertionEffect=function(n,e){return Mt.H.useInsertionEffect(n,e)};ze.useLayoutEffect=function(n,e){return Mt.H.useLayoutEffect(n,e)};ze.useMemo=function(n,e){return Mt.H.useMemo(n,e)};ze.useOptimistic=function(n,e){return Mt.H.useOptimistic(n,e)};ze.useReducer=function(n,e,t){return Mt.H.useReducer(n,e,t)};ze.useRef=function(n){return Mt.H.useRef(n)};ze.useState=function(n){return Mt.H.useState(n)};ze.useSyncExternalStore=function(n,e,t){return Mt.H.useSyncExternalStore(n,e,t)};ze.useTransition=function(){return Mt.H.useTransition()};ze.version="19.1.0";S0.exports=ze;var Cn=S0.exports;const RS=v0(Cn);var w0={exports:{}},Mu={},C0={exports:{}},D0={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(n){function e(N,V){var B=N.length;N.push(V);e:for(;0<B;){var ee=B-1>>>1,se=N[ee];if(0<s(se,V))N[ee]=V,N[B]=se,B=ee;else break e}}function t(N){return N.length===0?null:N[0]}function i(N){if(N.length===0)return null;var V=N[0],B=N.pop();if(B!==V){N[0]=B;e:for(var ee=0,se=N.length,ve=se>>>1;ee<ve;){var Ue=2*(ee+1)-1,et=N[Ue],W=Ue+1,ie=N[W];if(0>s(et,B))W<se&&0>s(ie,et)?(N[ee]=ie,N[W]=B,ee=W):(N[ee]=et,N[Ue]=B,ee=Ue);else if(W<se&&0>s(ie,B))N[ee]=ie,N[W]=B,ee=W;else break e}}return V}function s(N,V){var B=N.sortIndex-V.sortIndex;return B!==0?B:N.id-V.id}if(n.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var a=performance;n.unstable_now=function(){return a.now()}}else{var r=Date,o=r.now();n.unstable_now=function(){return r.now()-o}}var l=[],c=[],u=1,f=null,h=3,p=!1,g=!1,v=!1,m=!1,d=typeof setTimeout=="function"?setTimeout:null,_=typeof clearTimeout=="function"?clearTimeout:null,x=typeof setImmediate<"u"?setImmediate:null;function y(N){for(var V=t(c);V!==null;){if(V.callback===null)i(c);else if(V.startTime<=N)i(c),V.sortIndex=V.expirationTime,e(l,V);else break;V=t(c)}}function R(N){if(v=!1,y(N),!g)if(t(l)!==null)g=!0,w||(w=!0,X());else{var V=t(c);V!==null&&Q(R,V.startTime-N)}}var w=!1,b=-1,C=5,T=-1;function S(){return m?!0:!(n.unstable_now()-T<C)}function L(){if(m=!1,w){var N=n.unstable_now();T=N;var V=!0;try{e:{g=!1,v&&(v=!1,_(b),b=-1),p=!0;var B=h;try{t:{for(y(N),f=t(l);f!==null&&!(f.expirationTime>N&&S());){var ee=f.callback;if(typeof ee=="function"){f.callback=null,h=f.priorityLevel;var se=ee(f.expirationTime<=N);if(N=n.unstable_now(),typeof se=="function"){f.callback=se,y(N),V=!0;break t}f===t(l)&&i(l),y(N)}else i(l);f=t(l)}if(f!==null)V=!0;else{var ve=t(c);ve!==null&&Q(R,ve.startTime-N),V=!1}}break e}finally{f=null,h=B,p=!1}V=void 0}}finally{V?X():w=!1}}}var X;if(typeof x=="function")X=function(){x(L)};else if(typeof MessageChannel<"u"){var G=new MessageChannel,Z=G.port2;G.port1.onmessage=L,X=function(){Z.postMessage(null)}}else X=function(){d(L,0)};function Q(N,V){b=d(function(){N(n.unstable_now())},V)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(N){N.callback=null},n.unstable_forceFrameRate=function(N){0>N||125<N?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):C=0<N?Math.floor(1e3/N):5},n.unstable_getCurrentPriorityLevel=function(){return h},n.unstable_next=function(N){switch(h){case 1:case 2:case 3:var V=3;break;default:V=h}var B=h;h=V;try{return N()}finally{h=B}},n.unstable_requestPaint=function(){m=!0},n.unstable_runWithPriority=function(N,V){switch(N){case 1:case 2:case 3:case 4:case 5:break;default:N=3}var B=h;h=N;try{return V()}finally{h=B}},n.unstable_scheduleCallback=function(N,V,B){var ee=n.unstable_now();switch(typeof B=="object"&&B!==null?(B=B.delay,B=typeof B=="number"&&0<B?ee+B:ee):B=ee,N){case 1:var se=-1;break;case 2:se=250;break;case 5:se=1073741823;break;case 4:se=1e4;break;default:se=5e3}return se=B+se,N={id:u++,callback:V,priorityLevel:N,startTime:B,expirationTime:se,sortIndex:-1},B>ee?(N.sortIndex=B,e(c,N),t(l)===null&&N===t(c)&&(v?(_(b),b=-1):v=!0,Q(R,B-ee))):(N.sortIndex=se,e(l,N),g||p||(g=!0,w||(w=!0,X()))),N},n.unstable_shouldYield=S,n.unstable_wrapCallback=function(N){var V=h;return function(){var B=h;h=V;try{return N.apply(this,arguments)}finally{h=B}}}})(D0);C0.exports=D0;var wS=C0.exports,L0={exports:{}},gn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var CS=Cn;function U0(n){var e="https://react.dev/errors/"+n;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var t=2;t<arguments.length;t++)e+="&args[]="+encodeURIComponent(arguments[t])}return"Minified React error #"+n+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function rs(){}var hn={d:{f:rs,r:function(){throw Error(U0(522))},D:rs,C:rs,L:rs,m:rs,X:rs,S:rs,M:rs},p:0,findDOMNode:null},DS=Symbol.for("react.portal");function LS(n,e,t){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:DS,key:i==null?null:""+i,children:n,containerInfo:e,implementation:t}}var Eo=CS.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function Eu(n,e){if(n==="font")return"";if(typeof e=="string")return e==="use-credentials"?e:""}gn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=hn;gn.createPortal=function(n,e){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)throw Error(U0(299));return LS(n,e,null,t)};gn.flushSync=function(n){var e=Eo.T,t=hn.p;try{if(Eo.T=null,hn.p=2,n)return n()}finally{Eo.T=e,hn.p=t,hn.d.f()}};gn.preconnect=function(n,e){typeof n=="string"&&(e?(e=e.crossOrigin,e=typeof e=="string"?e==="use-credentials"?e:"":void 0):e=null,hn.d.C(n,e))};gn.prefetchDNS=function(n){typeof n=="string"&&hn.d.D(n)};gn.preinit=function(n,e){if(typeof n=="string"&&e&&typeof e.as=="string"){var t=e.as,i=Eu(t,e.crossOrigin),s=typeof e.integrity=="string"?e.integrity:void 0,a=typeof e.fetchPriority=="string"?e.fetchPriority:void 0;t==="style"?hn.d.S(n,typeof e.precedence=="string"?e.precedence:void 0,{crossOrigin:i,integrity:s,fetchPriority:a}):t==="script"&&hn.d.X(n,{crossOrigin:i,integrity:s,fetchPriority:a,nonce:typeof e.nonce=="string"?e.nonce:void 0})}};gn.preinitModule=function(n,e){if(typeof n=="string")if(typeof e=="object"&&e!==null){if(e.as==null||e.as==="script"){var t=Eu(e.as,e.crossOrigin);hn.d.M(n,{crossOrigin:t,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0})}}else e==null&&hn.d.M(n)};gn.preload=function(n,e){if(typeof n=="string"&&typeof e=="object"&&e!==null&&typeof e.as=="string"){var t=e.as,i=Eu(t,e.crossOrigin);hn.d.L(n,t,{crossOrigin:i,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,type:typeof e.type=="string"?e.type:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0,referrerPolicy:typeof e.referrerPolicy=="string"?e.referrerPolicy:void 0,imageSrcSet:typeof e.imageSrcSet=="string"?e.imageSrcSet:void 0,imageSizes:typeof e.imageSizes=="string"?e.imageSizes:void 0,media:typeof e.media=="string"?e.media:void 0})}};gn.preloadModule=function(n,e){if(typeof n=="string")if(e){var t=Eu(e.as,e.crossOrigin);hn.d.m(n,{as:typeof e.as=="string"&&e.as!=="script"?e.as:void 0,crossOrigin:t,integrity:typeof e.integrity=="string"?e.integrity:void 0})}else hn.d.m(n)};gn.requestFormReset=function(n){hn.d.r(n)};gn.unstable_batchedUpdates=function(n,e){return n(e)};gn.useFormState=function(n,e,t){return Eo.H.useFormState(n,e,t)};gn.useFormStatus=function(){return Eo.H.useHostTransitionStatus()};gn.version="19.1.0";function N0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(N0)}catch(n){console.error(n)}}N0(),L0.exports=gn;var US=L0.exports;/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ht=wS,O0=Cn,NS=US;function Y(n){var e="https://react.dev/errors/"+n;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var t=2;t<arguments.length;t++)e+="&args[]="+encodeURIComponent(arguments[t])}return"Minified React error #"+n+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function P0(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function ll(n){var e=n,t=n;if(n.alternate)for(;e.return;)e=e.return;else{n=e;do e=n,e.flags&4098&&(t=e.return),n=e.return;while(n)}return e.tag===3?t:null}function I0(n){if(n.tag===13){var e=n.memoizedState;if(e===null&&(n=n.alternate,n!==null&&(e=n.memoizedState)),e!==null)return e.dehydrated}return null}function wm(n){if(ll(n)!==n)throw Error(Y(188))}function OS(n){var e=n.alternate;if(!e){if(e=ll(n),e===null)throw Error(Y(188));return e!==n?null:n}for(var t=n,i=e;;){var s=t.return;if(s===null)break;var a=s.alternate;if(a===null){if(i=s.return,i!==null){t=i;continue}break}if(s.child===a.child){for(a=s.child;a;){if(a===t)return wm(s),n;if(a===i)return wm(s),e;a=a.sibling}throw Error(Y(188))}if(t.return!==i.return)t=s,i=a;else{for(var r=!1,o=s.child;o;){if(o===t){r=!0,t=s,i=a;break}if(o===i){r=!0,i=s,t=a;break}o=o.sibling}if(!r){for(o=a.child;o;){if(o===t){r=!0,t=a,i=s;break}if(o===i){r=!0,i=a,t=s;break}o=o.sibling}if(!r)throw Error(Y(189))}}if(t.alternate!==i)throw Error(Y(190))}if(t.tag!==3)throw Error(Y(188));return t.stateNode.current===t?n:e}function B0(n){var e=n.tag;if(e===5||e===26||e===27||e===6)return n;for(n=n.child;n!==null;){if(e=B0(n),e!==null)return e;n=n.sibling}return null}var xt=Object.assign,PS=Symbol.for("react.element"),Ul=Symbol.for("react.transitional.element"),_o=Symbol.for("react.portal"),Za=Symbol.for("react.fragment"),z0=Symbol.for("react.strict_mode"),ch=Symbol.for("react.profiler"),IS=Symbol.for("react.provider"),F0=Symbol.for("react.consumer"),Vi=Symbol.for("react.context"),ep=Symbol.for("react.forward_ref"),uh=Symbol.for("react.suspense"),fh=Symbol.for("react.suspense_list"),tp=Symbol.for("react.memo"),gs=Symbol.for("react.lazy"),hh=Symbol.for("react.activity"),BS=Symbol.for("react.memo_cache_sentinel"),Cm=Symbol.iterator;function $r(n){return n===null||typeof n!="object"?null:(n=Cm&&n[Cm]||n["@@iterator"],typeof n=="function"?n:null)}var zS=Symbol.for("react.client.reference");function dh(n){if(n==null)return null;if(typeof n=="function")return n.$$typeof===zS?null:n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case Za:return"Fragment";case ch:return"Profiler";case z0:return"StrictMode";case uh:return"Suspense";case fh:return"SuspenseList";case hh:return"Activity"}if(typeof n=="object")switch(n.$$typeof){case _o:return"Portal";case Vi:return(n.displayName||"Context")+".Provider";case F0:return(n._context.displayName||"Context")+".Consumer";case ep:var e=n.render;return n=n.displayName,n||(n=e.displayName||e.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case tp:return e=n.displayName||null,e!==null?e:dh(n.type)||"Memo";case gs:e=n._payload,n=n._init;try{return dh(n(e))}catch{}}return null}var vo=Array.isArray,be=O0.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,st=NS.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ua={pending:!1,data:null,method:null,action:null},ph=[],Qa=-1;function bi(n){return{current:n}}function Yt(n){0>Qa||(n.current=ph[Qa],ph[Qa]=null,Qa--)}function Et(n,e){Qa++,ph[Qa]=n.current,n.current=e}var yi=bi(null),Go=bi(null),Cs=bi(null),Hc=bi(null);function Gc(n,e){switch(Et(Cs,e),Et(Go,n),Et(yi,null),e.nodeType){case 9:case 11:n=(n=e.documentElement)&&(n=n.namespaceURI)?Og(n):0;break;default:if(n=e.tagName,e=e.namespaceURI)e=Og(e),n=ny(e,n);else switch(n){case"svg":n=1;break;case"math":n=2;break;default:n=0}}Yt(yi),Et(yi,n)}function yr(){Yt(yi),Yt(Go),Yt(Cs)}function mh(n){n.memoizedState!==null&&Et(Hc,n);var e=yi.current,t=ny(e,n.type);e!==t&&(Et(Go,n),Et(yi,t))}function Vc(n){Go.current===n&&(Yt(yi),Yt(Go)),Hc.current===n&&(Yt(Hc),Qo._currentValue=ua)}var gh=Object.prototype.hasOwnProperty,np=Ht.unstable_scheduleCallback,qu=Ht.unstable_cancelCallback,FS=Ht.unstable_shouldYield,HS=Ht.unstable_requestPaint,Si=Ht.unstable_now,GS=Ht.unstable_getCurrentPriorityLevel,H0=Ht.unstable_ImmediatePriority,G0=Ht.unstable_UserBlockingPriority,kc=Ht.unstable_NormalPriority,VS=Ht.unstable_LowPriority,V0=Ht.unstable_IdlePriority,kS=Ht.log,XS=Ht.unstable_setDisableYieldValue,cl=null,Nn=null;function Es(n){if(typeof kS=="function"&&XS(n),Nn&&typeof Nn.setStrictMode=="function")try{Nn.setStrictMode(cl,n)}catch{}}var On=Math.clz32?Math.clz32:YS,WS=Math.log,qS=Math.LN2;function YS(n){return n>>>=0,n===0?32:31-(WS(n)/qS|0)|0}var Nl=256,Ol=4194304;function na(n){var e=n&42;if(e!==0)return e;switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194048;case 4194304:case 8388608:case 16777216:case 33554432:return n&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return n}}function Tu(n,e,t){var i=n.pendingLanes;if(i===0)return 0;var s=0,a=n.suspendedLanes,r=n.pingedLanes;n=n.warmLanes;var o=i&134217727;return o!==0?(i=o&~a,i!==0?s=na(i):(r&=o,r!==0?s=na(r):t||(t=o&~n,t!==0&&(s=na(t))))):(o=i&~a,o!==0?s=na(o):r!==0?s=na(r):t||(t=i&~n,t!==0&&(s=na(t)))),s===0?0:e!==0&&e!==s&&!(e&a)&&(a=s&-s,t=e&-e,a>=t||a===32&&(t&4194048)!==0)?e:s}function ul(n,e){return(n.pendingLanes&~(n.suspendedLanes&~n.pingedLanes)&e)===0}function jS(n,e){switch(n){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function k0(){var n=Nl;return Nl<<=1,!(Nl&4194048)&&(Nl=256),n}function X0(){var n=Ol;return Ol<<=1,!(Ol&62914560)&&(Ol=4194304),n}function Yu(n){for(var e=[],t=0;31>t;t++)e.push(n);return e}function fl(n,e){n.pendingLanes|=e,e!==268435456&&(n.suspendedLanes=0,n.pingedLanes=0,n.warmLanes=0)}function KS(n,e,t,i,s,a){var r=n.pendingLanes;n.pendingLanes=t,n.suspendedLanes=0,n.pingedLanes=0,n.warmLanes=0,n.expiredLanes&=t,n.entangledLanes&=t,n.errorRecoveryDisabledLanes&=t,n.shellSuspendCounter=0;var o=n.entanglements,l=n.expirationTimes,c=n.hiddenUpdates;for(t=r&~t;0<t;){var u=31-On(t),f=1<<u;o[u]=0,l[u]=-1;var h=c[u];if(h!==null)for(c[u]=null,u=0;u<h.length;u++){var p=h[u];p!==null&&(p.lane&=-536870913)}t&=~f}i!==0&&W0(n,i,0),a!==0&&s===0&&n.tag!==0&&(n.suspendedLanes|=a&~(r&~e))}function W0(n,e,t){n.pendingLanes|=e,n.suspendedLanes&=~e;var i=31-On(e);n.entangledLanes|=e,n.entanglements[i]=n.entanglements[i]|1073741824|t&4194090}function q0(n,e){var t=n.entangledLanes|=e;for(n=n.entanglements;t;){var i=31-On(t),s=1<<i;s&e|n[i]&e&&(n[i]|=e),t&=~s}}function ip(n){switch(n){case 2:n=1;break;case 8:n=4;break;case 32:n=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:n=128;break;case 268435456:n=134217728;break;default:n=0}return n}function sp(n){return n&=-n,2<n?8<n?n&134217727?32:268435456:8:2}function Y0(){var n=st.p;return n!==0?n:(n=window.event,n===void 0?32:hy(n.type))}function ZS(n,e){var t=st.p;try{return st.p=n,e()}finally{st.p=t}}var ks=Math.random().toString(36).slice(2),sn="__reactFiber$"+ks,Mn="__reactProps$"+ks,Gr="__reactContainer$"+ks,_h="__reactEvents$"+ks,QS="__reactListeners$"+ks,JS="__reactHandles$"+ks,Dm="__reactResources$"+ks,hl="__reactMarker$"+ks;function ap(n){delete n[sn],delete n[Mn],delete n[_h],delete n[QS],delete n[JS]}function Ja(n){var e=n[sn];if(e)return e;for(var t=n.parentNode;t;){if(e=t[Gr]||t[sn]){if(t=e.alternate,e.child!==null||t!==null&&t.child!==null)for(n=Bg(n);n!==null;){if(t=n[sn])return t;n=Bg(n)}return e}n=t,t=n.parentNode}return null}function Vr(n){if(n=n[sn]||n[Gr]){var e=n.tag;if(e===5||e===6||e===13||e===26||e===27||e===3)return n}return null}function xo(n){var e=n.tag;if(e===5||e===26||e===27||e===6)return n.stateNode;throw Error(Y(33))}function cr(n){var e=n[Dm];return e||(e=n[Dm]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function Wt(n){n[hl]=!0}var j0=new Set,K0={};function Ea(n,e){Sr(n,e),Sr(n+"Capture",e)}function Sr(n,e){for(K0[n]=e,n=0;n<e.length;n++)j0.add(e[n])}var $S=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Lm={},Um={};function eM(n){return gh.call(Um,n)?!0:gh.call(Lm,n)?!1:$S.test(n)?Um[n]=!0:(Lm[n]=!0,!1)}function xc(n,e,t){if(eM(e))if(t===null)n.removeAttribute(e);else{switch(typeof t){case"undefined":case"function":case"symbol":n.removeAttribute(e);return;case"boolean":var i=e.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){n.removeAttribute(e);return}}n.setAttribute(e,""+t)}}function Pl(n,e,t){if(t===null)n.removeAttribute(e);else{switch(typeof t){case"undefined":case"function":case"symbol":case"boolean":n.removeAttribute(e);return}n.setAttribute(e,""+t)}}function Di(n,e,t,i){if(i===null)n.removeAttribute(t);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":n.removeAttribute(t);return}n.setAttributeNS(e,t,""+i)}}var ju,Nm;function qa(n){if(ju===void 0)try{throw Error()}catch(t){var e=t.stack.trim().match(/\n( *(at )?)/);ju=e&&e[1]||"",Nm=-1<t.stack.indexOf(`
    at`)?" (<anonymous>)":-1<t.stack.indexOf("@")?"@unknown:0:0":""}return`
`+ju+n+Nm}var Ku=!1;function Zu(n,e){if(!n||Ku)return"";Ku=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(e){var f=function(){throw Error()};if(Object.defineProperty(f.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(f,[])}catch(p){var h=p}Reflect.construct(n,[],f)}else{try{f.call()}catch(p){h=p}n.call(f.prototype)}}else{try{throw Error()}catch(p){h=p}(f=n())&&typeof f.catch=="function"&&f.catch(function(){})}}catch(p){if(p&&h&&typeof p.stack=="string")return[p.stack,h.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var s=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");s&&s.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var a=i.DetermineComponentFrameRoot(),r=a[0],o=a[1];if(r&&o){var l=r.split(`
`),c=o.split(`
`);for(s=i=0;i<l.length&&!l[i].includes("DetermineComponentFrameRoot");)i++;for(;s<c.length&&!c[s].includes("DetermineComponentFrameRoot");)s++;if(i===l.length||s===c.length)for(i=l.length-1,s=c.length-1;1<=i&&0<=s&&l[i]!==c[s];)s--;for(;1<=i&&0<=s;i--,s--)if(l[i]!==c[s]){if(i!==1||s!==1)do if(i--,s--,0>s||l[i]!==c[s]){var u=`
`+l[i].replace(" at new "," at ");return n.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",n.displayName)),u}while(1<=i&&0<=s);break}}}finally{Ku=!1,Error.prepareStackTrace=t}return(t=n?n.displayName||n.name:"")?qa(t):""}function tM(n){switch(n.tag){case 26:case 27:case 5:return qa(n.type);case 16:return qa("Lazy");case 13:return qa("Suspense");case 19:return qa("SuspenseList");case 0:case 15:return Zu(n.type,!1);case 11:return Zu(n.type.render,!1);case 1:return Zu(n.type,!0);case 31:return qa("Activity");default:return""}}function Om(n){try{var e="";do e+=tM(n),n=n.return;while(n);return e}catch(t){return`
Error generating stack: `+t.message+`
`+t.stack}}function Wn(n){switch(typeof n){case"bigint":case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function Z0(n){var e=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function nM(n){var e=Z0(n)?"checked":"value",t=Object.getOwnPropertyDescriptor(n.constructor.prototype,e),i=""+n[e];if(!n.hasOwnProperty(e)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var s=t.get,a=t.set;return Object.defineProperty(n,e,{configurable:!0,get:function(){return s.call(this)},set:function(r){i=""+r,a.call(this,r)}}),Object.defineProperty(n,e,{enumerable:t.enumerable}),{getValue:function(){return i},setValue:function(r){i=""+r},stopTracking:function(){n._valueTracker=null,delete n[e]}}}}function Xc(n){n._valueTracker||(n._valueTracker=nM(n))}function Q0(n){if(!n)return!1;var e=n._valueTracker;if(!e)return!0;var t=e.getValue(),i="";return n&&(i=Z0(n)?n.checked?"true":"false":n.value),n=i,n!==t?(e.setValue(n),!0):!1}function Wc(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}var iM=/[\n"\\]/g;function jn(n){return n.replace(iM,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function vh(n,e,t,i,s,a,r,o){n.name="",r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?n.type=r:n.removeAttribute("type"),e!=null?r==="number"?(e===0&&n.value===""||n.value!=e)&&(n.value=""+Wn(e)):n.value!==""+Wn(e)&&(n.value=""+Wn(e)):r!=="submit"&&r!=="reset"||n.removeAttribute("value"),e!=null?xh(n,r,Wn(e)):t!=null?xh(n,r,Wn(t)):i!=null&&n.removeAttribute("value"),s==null&&a!=null&&(n.defaultChecked=!!a),s!=null&&(n.checked=s&&typeof s!="function"&&typeof s!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?n.name=""+Wn(o):n.removeAttribute("name")}function J0(n,e,t,i,s,a,r,o){if(a!=null&&typeof a!="function"&&typeof a!="symbol"&&typeof a!="boolean"&&(n.type=a),e!=null||t!=null){if(!(a!=="submit"&&a!=="reset"||e!=null))return;t=t!=null?""+Wn(t):"",e=e!=null?""+Wn(e):t,o||e===n.value||(n.value=e),n.defaultValue=e}i=i??s,i=typeof i!="function"&&typeof i!="symbol"&&!!i,n.checked=o?n.checked:!!i,n.defaultChecked=!!i,r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(n.name=r)}function xh(n,e,t){e==="number"&&Wc(n.ownerDocument)===n||n.defaultValue===""+t||(n.defaultValue=""+t)}function ur(n,e,t,i){if(n=n.options,e){e={};for(var s=0;s<t.length;s++)e["$"+t[s]]=!0;for(t=0;t<n.length;t++)s=e.hasOwnProperty("$"+n[t].value),n[t].selected!==s&&(n[t].selected=s),s&&i&&(n[t].defaultSelected=!0)}else{for(t=""+Wn(t),e=null,s=0;s<n.length;s++){if(n[s].value===t){n[s].selected=!0,i&&(n[s].defaultSelected=!0);return}e!==null||n[s].disabled||(e=n[s])}e!==null&&(e.selected=!0)}}function $0(n,e,t){if(e!=null&&(e=""+Wn(e),e!==n.value&&(n.value=e),t==null)){n.defaultValue!==e&&(n.defaultValue=e);return}n.defaultValue=t!=null?""+Wn(t):""}function ev(n,e,t,i){if(e==null){if(i!=null){if(t!=null)throw Error(Y(92));if(vo(i)){if(1<i.length)throw Error(Y(93));i=i[0]}t=i}t==null&&(t=""),e=t}t=Wn(e),n.defaultValue=t,i=n.textContent,i===t&&i!==""&&i!==null&&(n.value=i)}function Mr(n,e){if(e){var t=n.firstChild;if(t&&t===n.lastChild&&t.nodeType===3){t.nodeValue=e;return}}n.textContent=e}var sM=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Pm(n,e,t){var i=e.indexOf("--")===0;t==null||typeof t=="boolean"||t===""?i?n.setProperty(e,""):e==="float"?n.cssFloat="":n[e]="":i?n.setProperty(e,t):typeof t!="number"||t===0||sM.has(e)?e==="float"?n.cssFloat=t:n[e]=(""+t).trim():n[e]=t+"px"}function tv(n,e,t){if(e!=null&&typeof e!="object")throw Error(Y(62));if(n=n.style,t!=null){for(var i in t)!t.hasOwnProperty(i)||e!=null&&e.hasOwnProperty(i)||(i.indexOf("--")===0?n.setProperty(i,""):i==="float"?n.cssFloat="":n[i]="");for(var s in e)i=e[s],e.hasOwnProperty(s)&&t[s]!==i&&Pm(n,s,i)}else for(var a in e)e.hasOwnProperty(a)&&Pm(n,a,e[a])}function rp(n){if(n.indexOf("-")===-1)return!1;switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var aM=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),rM=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function yc(n){return rM.test(""+n)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":n}var yh=null;function op(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var $a=null,fr=null;function Im(n){var e=Vr(n);if(e&&(n=e.stateNode)){var t=n[Mn]||null;e:switch(n=e.stateNode,e.type){case"input":if(vh(n,t.value,t.defaultValue,t.defaultValue,t.checked,t.defaultChecked,t.type,t.name),e=t.name,t.type==="radio"&&e!=null){for(t=n;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll('input[name="'+jn(""+e)+'"][type="radio"]'),e=0;e<t.length;e++){var i=t[e];if(i!==n&&i.form===n.form){var s=i[Mn]||null;if(!s)throw Error(Y(90));vh(i,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name)}}for(e=0;e<t.length;e++)i=t[e],i.form===n.form&&Q0(i)}break e;case"textarea":$0(n,t.value,t.defaultValue);break e;case"select":e=t.value,e!=null&&ur(n,!!t.multiple,e,!1)}}}var Qu=!1;function nv(n,e,t){if(Qu)return n(e,t);Qu=!0;try{var i=n(e);return i}finally{if(Qu=!1,($a!==null||fr!==null)&&(Ou(),$a&&(e=$a,n=fr,fr=$a=null,Im(e),n)))for(e=0;e<n.length;e++)Im(n[e])}}function Vo(n,e){var t=n.stateNode;if(t===null)return null;var i=t[Mn]||null;if(i===null)return null;t=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(n=n.type,i=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!i;break e;default:n=!1}if(n)return null;if(t&&typeof t!="function")throw Error(Y(231,e,typeof t));return t}var Ji=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Sh=!1;if(Ji)try{var eo={};Object.defineProperty(eo,"passive",{get:function(){Sh=!0}}),window.addEventListener("test",eo,eo),window.removeEventListener("test",eo,eo)}catch{Sh=!1}var Ts=null,lp=null,Sc=null;function iv(){if(Sc)return Sc;var n,e=lp,t=e.length,i,s="value"in Ts?Ts.value:Ts.textContent,a=s.length;for(n=0;n<t&&e[n]===s[n];n++);var r=t-n;for(i=1;i<=r&&e[t-i]===s[a-i];i++);return Sc=s.slice(n,1<i?1-i:void 0)}function Mc(n){var e=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&e===13&&(n=13)):n=e,n===10&&(n=13),32<=n||n===13?n:0}function Il(){return!0}function Bm(){return!1}function En(n){function e(t,i,s,a,r){this._reactName=t,this._targetInst=s,this.type=i,this.nativeEvent=a,this.target=r,this.currentTarget=null;for(var o in n)n.hasOwnProperty(o)&&(t=n[o],this[o]=t?t(a):a[o]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?Il:Bm,this.isPropagationStopped=Bm,this}return xt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=Il)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=Il)},persist:function(){},isPersistent:Il}),e}var Ta={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},bu=En(Ta),dl=xt({},Ta,{view:0,detail:0}),oM=En(dl),Ju,$u,to,Au=xt({},dl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:cp,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==to&&(to&&n.type==="mousemove"?(Ju=n.screenX-to.screenX,$u=n.screenY-to.screenY):$u=Ju=0,to=n),Ju)},movementY:function(n){return"movementY"in n?n.movementY:$u}}),zm=En(Au),lM=xt({},Au,{dataTransfer:0}),cM=En(lM),uM=xt({},dl,{relatedTarget:0}),ef=En(uM),fM=xt({},Ta,{animationName:0,elapsedTime:0,pseudoElement:0}),hM=En(fM),dM=xt({},Ta,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),pM=En(dM),mM=xt({},Ta,{data:0}),Fm=En(mM),gM={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},_M={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},vM={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function xM(n){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(n):(n=vM[n])?!!e[n]:!1}function cp(){return xM}var yM=xt({},dl,{key:function(n){if(n.key){var e=gM[n.key]||n.key;if(e!=="Unidentified")return e}return n.type==="keypress"?(n=Mc(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?_M[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:cp,charCode:function(n){return n.type==="keypress"?Mc(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?Mc(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),SM=En(yM),MM=xt({},Au,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Hm=En(MM),EM=xt({},dl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:cp}),TM=En(EM),bM=xt({},Ta,{propertyName:0,elapsedTime:0,pseudoElement:0}),AM=En(bM),RM=xt({},Au,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),wM=En(RM),CM=xt({},Ta,{newState:0,oldState:0}),DM=En(CM),LM=[9,13,27,32],up=Ji&&"CompositionEvent"in window,To=null;Ji&&"documentMode"in document&&(To=document.documentMode);var UM=Ji&&"TextEvent"in window&&!To,sv=Ji&&(!up||To&&8<To&&11>=To),Gm=" ",Vm=!1;function av(n,e){switch(n){case"keyup":return LM.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function rv(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var er=!1;function NM(n,e){switch(n){case"compositionend":return rv(e);case"keypress":return e.which!==32?null:(Vm=!0,Gm);case"textInput":return n=e.data,n===Gm&&Vm?null:n;default:return null}}function OM(n,e){if(er)return n==="compositionend"||!up&&av(n,e)?(n=iv(),Sc=lp=Ts=null,er=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return sv&&e.locale!=="ko"?null:e.data;default:return null}}var PM={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function km(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e==="input"?!!PM[n.type]:e==="textarea"}function ov(n,e,t,i){$a?fr?fr.push(i):fr=[i]:$a=i,e=cu(e,"onChange"),0<e.length&&(t=new bu("onChange","change",null,t,i),n.push({event:t,listeners:e}))}var bo=null,ko=null;function IM(n){$x(n,0)}function Ru(n){var e=xo(n);if(Q0(e))return n}function Xm(n,e){if(n==="change")return e}var lv=!1;if(Ji){var tf;if(Ji){var nf="oninput"in document;if(!nf){var Wm=document.createElement("div");Wm.setAttribute("oninput","return;"),nf=typeof Wm.oninput=="function"}tf=nf}else tf=!1;lv=tf&&(!document.documentMode||9<document.documentMode)}function qm(){bo&&(bo.detachEvent("onpropertychange",cv),ko=bo=null)}function cv(n){if(n.propertyName==="value"&&Ru(ko)){var e=[];ov(e,ko,n,op(n)),nv(IM,e)}}function BM(n,e,t){n==="focusin"?(qm(),bo=e,ko=t,bo.attachEvent("onpropertychange",cv)):n==="focusout"&&qm()}function zM(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return Ru(ko)}function FM(n,e){if(n==="click")return Ru(e)}function HM(n,e){if(n==="input"||n==="change")return Ru(e)}function GM(n,e){return n===e&&(n!==0||1/n===1/e)||n!==n&&e!==e}var zn=typeof Object.is=="function"?Object.is:GM;function Xo(n,e){if(zn(n,e))return!0;if(typeof n!="object"||n===null||typeof e!="object"||e===null)return!1;var t=Object.keys(n),i=Object.keys(e);if(t.length!==i.length)return!1;for(i=0;i<t.length;i++){var s=t[i];if(!gh.call(e,s)||!zn(n[s],e[s]))return!1}return!0}function Ym(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function jm(n,e){var t=Ym(n);n=0;for(var i;t;){if(t.nodeType===3){if(i=n+t.textContent.length,n<=e&&i>=e)return{node:t,offset:e-n};n=i}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=Ym(t)}}function uv(n,e){return n&&e?n===e?!0:n&&n.nodeType===3?!1:e&&e.nodeType===3?uv(n,e.parentNode):"contains"in n?n.contains(e):n.compareDocumentPosition?!!(n.compareDocumentPosition(e)&16):!1:!1}function fv(n){n=n!=null&&n.ownerDocument!=null&&n.ownerDocument.defaultView!=null?n.ownerDocument.defaultView:window;for(var e=Wc(n.document);e instanceof n.HTMLIFrameElement;){try{var t=typeof e.contentWindow.location.href=="string"}catch{t=!1}if(t)n=e.contentWindow;else break;e=Wc(n.document)}return e}function fp(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e&&(e==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||e==="textarea"||n.contentEditable==="true")}var VM=Ji&&"documentMode"in document&&11>=document.documentMode,tr=null,Mh=null,Ao=null,Eh=!1;function Km(n,e,t){var i=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;Eh||tr==null||tr!==Wc(i)||(i=tr,"selectionStart"in i&&fp(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Ao&&Xo(Ao,i)||(Ao=i,i=cu(Mh,"onSelect"),0<i.length&&(e=new bu("onSelect","select",null,e,t),n.push({event:e,listeners:i}),e.target=tr)))}function js(n,e){var t={};return t[n.toLowerCase()]=e.toLowerCase(),t["Webkit"+n]="webkit"+e,t["Moz"+n]="moz"+e,t}var nr={animationend:js("Animation","AnimationEnd"),animationiteration:js("Animation","AnimationIteration"),animationstart:js("Animation","AnimationStart"),transitionrun:js("Transition","TransitionRun"),transitionstart:js("Transition","TransitionStart"),transitioncancel:js("Transition","TransitionCancel"),transitionend:js("Transition","TransitionEnd")},sf={},hv={};Ji&&(hv=document.createElement("div").style,"AnimationEvent"in window||(delete nr.animationend.animation,delete nr.animationiteration.animation,delete nr.animationstart.animation),"TransitionEvent"in window||delete nr.transitionend.transition);function ba(n){if(sf[n])return sf[n];if(!nr[n])return n;var e=nr[n],t;for(t in e)if(e.hasOwnProperty(t)&&t in hv)return sf[n]=e[t];return n}var dv=ba("animationend"),pv=ba("animationiteration"),mv=ba("animationstart"),kM=ba("transitionrun"),XM=ba("transitionstart"),WM=ba("transitioncancel"),gv=ba("transitionend"),_v=new Map,Th="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Th.push("scrollEnd");function di(n,e){_v.set(n,e),Ea(e,[n])}var Zm=new WeakMap;function Kn(n,e){if(typeof n=="object"&&n!==null){var t=Zm.get(n);return t!==void 0?t:(e={value:n,source:e,stack:Om(e)},Zm.set(n,e),e)}return{value:n,source:e,stack:Om(e)}}var Xn=[],ir=0,hp=0;function wu(){for(var n=ir,e=hp=ir=0;e<n;){var t=Xn[e];Xn[e++]=null;var i=Xn[e];Xn[e++]=null;var s=Xn[e];Xn[e++]=null;var a=Xn[e];if(Xn[e++]=null,i!==null&&s!==null){var r=i.pending;r===null?s.next=s:(s.next=r.next,r.next=s),i.pending=s}a!==0&&vv(t,s,a)}}function Cu(n,e,t,i){Xn[ir++]=n,Xn[ir++]=e,Xn[ir++]=t,Xn[ir++]=i,hp|=i,n.lanes|=i,n=n.alternate,n!==null&&(n.lanes|=i)}function dp(n,e,t,i){return Cu(n,e,t,i),qc(n)}function kr(n,e){return Cu(n,null,null,e),qc(n)}function vv(n,e,t){n.lanes|=t;var i=n.alternate;i!==null&&(i.lanes|=t);for(var s=!1,a=n.return;a!==null;)a.childLanes|=t,i=a.alternate,i!==null&&(i.childLanes|=t),a.tag===22&&(n=a.stateNode,n===null||n._visibility&1||(s=!0)),n=a,a=a.return;return n.tag===3?(a=n.stateNode,s&&e!==null&&(s=31-On(t),n=a.hiddenUpdates,i=n[s],i===null?n[s]=[e]:i.push(e),e.lane=t|536870912),a):null}function qc(n){if(50<Io)throw Io=0,Wh=null,Error(Y(185));for(var e=n.return;e!==null;)n=e,e=n.return;return n.tag===3?n.stateNode:null}var sr={};function qM(n,e,t,i){this.tag=n,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ln(n,e,t,i){return new qM(n,e,t,i)}function pp(n){return n=n.prototype,!(!n||!n.isReactComponent)}function Ki(n,e){var t=n.alternate;return t===null?(t=Ln(n.tag,e,n.key,n.mode),t.elementType=n.elementType,t.type=n.type,t.stateNode=n.stateNode,t.alternate=n,n.alternate=t):(t.pendingProps=e,t.type=n.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=n.flags&65011712,t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},t.sibling=n.sibling,t.index=n.index,t.ref=n.ref,t.refCleanup=n.refCleanup,t}function xv(n,e){n.flags&=65011714;var t=n.alternate;return t===null?(n.childLanes=0,n.lanes=e,n.child=null,n.subtreeFlags=0,n.memoizedProps=null,n.memoizedState=null,n.updateQueue=null,n.dependencies=null,n.stateNode=null):(n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.subtreeFlags=0,n.deletions=null,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,n.type=t.type,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n}function Ec(n,e,t,i,s,a){var r=0;if(i=n,typeof n=="function")pp(n)&&(r=1);else if(typeof n=="string")r=jE(n,t,yi.current)?26:n==="html"||n==="head"||n==="body"?27:5;else e:switch(n){case hh:return n=Ln(31,t,e,s),n.elementType=hh,n.lanes=a,n;case Za:return fa(t.children,s,a,e);case z0:r=8,s|=24;break;case ch:return n=Ln(12,t,e,s|2),n.elementType=ch,n.lanes=a,n;case uh:return n=Ln(13,t,e,s),n.elementType=uh,n.lanes=a,n;case fh:return n=Ln(19,t,e,s),n.elementType=fh,n.lanes=a,n;default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case IS:case Vi:r=10;break e;case F0:r=9;break e;case ep:r=11;break e;case tp:r=14;break e;case gs:r=16,i=null;break e}r=29,t=Error(Y(130,n===null?"null":typeof n,"")),i=null}return e=Ln(r,t,e,s),e.elementType=n,e.type=i,e.lanes=a,e}function fa(n,e,t,i){return n=Ln(7,n,i,e),n.lanes=t,n}function af(n,e,t){return n=Ln(6,n,null,e),n.lanes=t,n}function rf(n,e,t){return e=Ln(4,n.children!==null?n.children:[],n.key,e),e.lanes=t,e.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},e}var ar=[],rr=0,Yc=null,jc=0,qn=[],Yn=0,ha=null,ki=1,Xi="";function ia(n,e){ar[rr++]=jc,ar[rr++]=Yc,Yc=n,jc=e}function yv(n,e,t){qn[Yn++]=ki,qn[Yn++]=Xi,qn[Yn++]=ha,ha=n;var i=ki;n=Xi;var s=32-On(i)-1;i&=~(1<<s),t+=1;var a=32-On(e)+s;if(30<a){var r=s-s%5;a=(i&(1<<r)-1).toString(32),i>>=r,s-=r,ki=1<<32-On(e)+s|t<<s|i,Xi=a+n}else ki=1<<a|t<<s|i,Xi=n}function mp(n){n.return!==null&&(ia(n,1),yv(n,1,0))}function gp(n){for(;n===Yc;)Yc=ar[--rr],ar[rr]=null,jc=ar[--rr],ar[rr]=null;for(;n===ha;)ha=qn[--Yn],qn[Yn]=null,Xi=qn[--Yn],qn[Yn]=null,ki=qn[--Yn],qn[Yn]=null}var fn=null,Ct=null,nt=!1,da=null,_i=!1,bh=Error(Y(519));function _a(n){var e=Error(Y(418,""));throw Wo(Kn(e,n)),bh}function Qm(n){var e=n.stateNode,t=n.type,i=n.memoizedProps;switch(e[sn]=n,e[Mn]=i,t){case"dialog":He("cancel",e),He("close",e);break;case"iframe":case"object":case"embed":He("load",e);break;case"video":case"audio":for(t=0;t<jo.length;t++)He(jo[t],e);break;case"source":He("error",e);break;case"img":case"image":case"link":He("error",e),He("load",e);break;case"details":He("toggle",e);break;case"input":He("invalid",e),J0(e,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0),Xc(e);break;case"select":He("invalid",e);break;case"textarea":He("invalid",e),ev(e,i.value,i.defaultValue,i.children),Xc(e)}t=i.children,typeof t!="string"&&typeof t!="number"&&typeof t!="bigint"||e.textContent===""+t||i.suppressHydrationWarning===!0||ty(e.textContent,t)?(i.popover!=null&&(He("beforetoggle",e),He("toggle",e)),i.onScroll!=null&&He("scroll",e),i.onScrollEnd!=null&&He("scrollend",e),i.onClick!=null&&(e.onclick=Bu),e=!0):e=!1,e||_a(n)}function Jm(n){for(fn=n.return;fn;)switch(fn.tag){case 5:case 13:_i=!1;return;case 27:case 3:_i=!0;return;default:fn=fn.return}}function no(n){if(n!==fn)return!1;if(!nt)return Jm(n),nt=!0,!1;var e=n.tag,t;if((t=e!==3&&e!==27)&&((t=e===5)&&(t=n.type,t=!(t!=="form"&&t!=="button")||Qh(n.type,n.memoizedProps)),t=!t),t&&Ct&&_a(n),Jm(n),e===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(Y(317));e:{for(n=n.nextSibling,e=0;n;){if(n.nodeType===8)if(t=n.data,t==="/$"){if(e===0){Ct=fi(n.nextSibling);break e}e--}else t!=="$"&&t!=="$!"&&t!=="$?"||e++;n=n.nextSibling}Ct=null}}else e===27?(e=Ct,Xs(n.type)?(n=ed,ed=null,Ct=n):Ct=e):Ct=fn?fi(n.stateNode.nextSibling):null;return!0}function pl(){Ct=fn=null,nt=!1}function $m(){var n=da;return n!==null&&(yn===null?yn=n:yn.push.apply(yn,n),da=null),n}function Wo(n){da===null?da=[n]:da.push(n)}var Ah=bi(null),Aa=null,Wi=null;function vs(n,e,t){Et(Ah,e._currentValue),e._currentValue=t}function Zi(n){n._currentValue=Ah.current,Yt(Ah)}function Rh(n,e,t){for(;n!==null;){var i=n.alternate;if((n.childLanes&e)!==e?(n.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),n===t)break;n=n.return}}function wh(n,e,t,i){var s=n.child;for(s!==null&&(s.return=n);s!==null;){var a=s.dependencies;if(a!==null){var r=s.child;a=a.firstContext;e:for(;a!==null;){var o=a;a=s;for(var l=0;l<e.length;l++)if(o.context===e[l]){a.lanes|=t,o=a.alternate,o!==null&&(o.lanes|=t),Rh(a.return,t,n),i||(r=null);break e}a=o.next}}else if(s.tag===18){if(r=s.return,r===null)throw Error(Y(341));r.lanes|=t,a=r.alternate,a!==null&&(a.lanes|=t),Rh(r,t,n),r=null}else r=s.child;if(r!==null)r.return=s;else for(r=s;r!==null;){if(r===n){r=null;break}if(s=r.sibling,s!==null){s.return=r.return,r=s;break}r=r.return}s=r}}function ml(n,e,t,i){n=null;for(var s=e,a=!1;s!==null;){if(!a){if(s.flags&524288)a=!0;else if(s.flags&262144)break}if(s.tag===10){var r=s.alternate;if(r===null)throw Error(Y(387));if(r=r.memoizedProps,r!==null){var o=s.type;zn(s.pendingProps.value,r.value)||(n!==null?n.push(o):n=[o])}}else if(s===Hc.current){if(r=s.alternate,r===null)throw Error(Y(387));r.memoizedState.memoizedState!==s.memoizedState.memoizedState&&(n!==null?n.push(Qo):n=[Qo])}s=s.return}n!==null&&wh(e,n,t,i),e.flags|=262144}function Kc(n){for(n=n.firstContext;n!==null;){if(!zn(n.context._currentValue,n.memoizedValue))return!0;n=n.next}return!1}function va(n){Aa=n,Wi=null,n=n.dependencies,n!==null&&(n.firstContext=null)}function an(n){return Sv(Aa,n)}function Bl(n,e){return Aa===null&&va(n),Sv(n,e)}function Sv(n,e){var t=e._currentValue;if(e={context:e,memoizedValue:t,next:null},Wi===null){if(n===null)throw Error(Y(308));Wi=e,n.dependencies={lanes:0,firstContext:e},n.flags|=524288}else Wi=Wi.next=e;return t}var YM=typeof AbortController<"u"?AbortController:function(){var n=[],e=this.signal={aborted:!1,addEventListener:function(t,i){n.push(i)}};this.abort=function(){e.aborted=!0,n.forEach(function(t){return t()})}},jM=Ht.unstable_scheduleCallback,KM=Ht.unstable_NormalPriority,zt={$$typeof:Vi,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function _p(){return{controller:new YM,data:new Map,refCount:0}}function gl(n){n.refCount--,n.refCount===0&&jM(KM,function(){n.controller.abort()})}var Ro=null,Ch=0,Er=0,hr=null;function ZM(n,e){if(Ro===null){var t=Ro=[];Ch=0,Er=Hp(),hr={status:"pending",value:void 0,then:function(i){t.push(i)}}}return Ch++,e.then(eg,eg),e}function eg(){if(--Ch===0&&Ro!==null){hr!==null&&(hr.status="fulfilled");var n=Ro;Ro=null,Er=0,hr=null;for(var e=0;e<n.length;e++)(0,n[e])()}}function QM(n,e){var t=[],i={status:"pending",value:null,reason:null,then:function(s){t.push(s)}};return n.then(function(){i.status="fulfilled",i.value=e;for(var s=0;s<t.length;s++)(0,t[s])(e)},function(s){for(i.status="rejected",i.reason=s,s=0;s<t.length;s++)(0,t[s])(void 0)}),i}var tg=be.S;be.S=function(n,e){typeof e=="object"&&e!==null&&typeof e.then=="function"&&ZM(n,e),tg!==null&&tg(n,e)};var pa=bi(null);function vp(){var n=pa.current;return n!==null?n:_t.pooledCache}function Tc(n,e){e===null?Et(pa,pa.current):Et(pa,e.pool)}function Mv(){var n=vp();return n===null?null:{parent:zt._currentValue,pool:n}}var _l=Error(Y(460)),Ev=Error(Y(474)),Du=Error(Y(542)),Dh={then:function(){}};function ng(n){return n=n.status,n==="fulfilled"||n==="rejected"}function zl(){}function Tv(n,e,t){switch(t=n[t],t===void 0?n.push(e):t!==e&&(e.then(zl,zl),e=t),e.status){case"fulfilled":return e.value;case"rejected":throw n=e.reason,sg(n),n;default:if(typeof e.status=="string")e.then(zl,zl);else{if(n=_t,n!==null&&100<n.shellSuspendCounter)throw Error(Y(482));n=e,n.status="pending",n.then(function(i){if(e.status==="pending"){var s=e;s.status="fulfilled",s.value=i}},function(i){if(e.status==="pending"){var s=e;s.status="rejected",s.reason=i}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw n=e.reason,sg(n),n}throw wo=e,_l}}var wo=null;function ig(){if(wo===null)throw Error(Y(459));var n=wo;return wo=null,n}function sg(n){if(n===_l||n===Du)throw Error(Y(483))}var _s=!1;function xp(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Lh(n,e){n=n.updateQueue,e.updateQueue===n&&(e.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,callbacks:null})}function Ds(n){return{lane:n,tag:0,payload:null,callback:null,next:null}}function Ls(n,e,t){var i=n.updateQueue;if(i===null)return null;if(i=i.shared,ft&2){var s=i.pending;return s===null?e.next=e:(e.next=s.next,s.next=e),i.pending=e,e=qc(n),vv(n,null,t),e}return Cu(n,i,e,t),qc(n)}function Co(n,e,t){if(e=e.updateQueue,e!==null&&(e=e.shared,(t&4194048)!==0)){var i=e.lanes;i&=n.pendingLanes,t|=i,e.lanes=t,q0(n,t)}}function of(n,e){var t=n.updateQueue,i=n.alternate;if(i!==null&&(i=i.updateQueue,t===i)){var s=null,a=null;if(t=t.firstBaseUpdate,t!==null){do{var r={lane:t.lane,tag:t.tag,payload:t.payload,callback:null,next:null};a===null?s=a=r:a=a.next=r,t=t.next}while(t!==null);a===null?s=a=e:a=a.next=e}else s=a=e;t={baseState:i.baseState,firstBaseUpdate:s,lastBaseUpdate:a,shared:i.shared,callbacks:i.callbacks},n.updateQueue=t;return}n=t.lastBaseUpdate,n===null?t.firstBaseUpdate=e:n.next=e,t.lastBaseUpdate=e}var Uh=!1;function Do(){if(Uh){var n=hr;if(n!==null)throw n}}function Lo(n,e,t,i){Uh=!1;var s=n.updateQueue;_s=!1;var a=s.firstBaseUpdate,r=s.lastBaseUpdate,o=s.shared.pending;if(o!==null){s.shared.pending=null;var l=o,c=l.next;l.next=null,r===null?a=c:r.next=c,r=l;var u=n.alternate;u!==null&&(u=u.updateQueue,o=u.lastBaseUpdate,o!==r&&(o===null?u.firstBaseUpdate=c:o.next=c,u.lastBaseUpdate=l))}if(a!==null){var f=s.baseState;r=0,u=c=l=null,o=a;do{var h=o.lane&-536870913,p=h!==o.lane;if(p?(je&h)===h:(i&h)===h){h!==0&&h===Er&&(Uh=!0),u!==null&&(u=u.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});e:{var g=n,v=o;h=e;var m=t;switch(v.tag){case 1:if(g=v.payload,typeof g=="function"){f=g.call(m,f,h);break e}f=g;break e;case 3:g.flags=g.flags&-65537|128;case 0:if(g=v.payload,h=typeof g=="function"?g.call(m,f,h):g,h==null)break e;f=xt({},f,h);break e;case 2:_s=!0}}h=o.callback,h!==null&&(n.flags|=64,p&&(n.flags|=8192),p=s.callbacks,p===null?s.callbacks=[h]:p.push(h))}else p={lane:h,tag:o.tag,payload:o.payload,callback:o.callback,next:null},u===null?(c=u=p,l=f):u=u.next=p,r|=h;if(o=o.next,o===null){if(o=s.shared.pending,o===null)break;p=o,o=p.next,p.next=null,s.lastBaseUpdate=p,s.shared.pending=null}}while(!0);u===null&&(l=f),s.baseState=l,s.firstBaseUpdate=c,s.lastBaseUpdate=u,a===null&&(s.shared.lanes=0),Gs|=r,n.lanes=r,n.memoizedState=f}}function bv(n,e){if(typeof n!="function")throw Error(Y(191,n));n.call(e)}function Av(n,e){var t=n.callbacks;if(t!==null)for(n.callbacks=null,n=0;n<t.length;n++)bv(t[n],e)}var Tr=bi(null),Zc=bi(0);function ag(n,e){n=ts,Et(Zc,n),Et(Tr,e),ts=n|e.baseLanes}function Nh(){Et(Zc,ts),Et(Tr,Tr.current)}function yp(){ts=Zc.current,Yt(Tr),Yt(Zc)}var Fs=0,Fe=null,pt=null,It=null,Qc=!1,dr=!1,xa=!1,Jc=0,qo=0,pr=null,JM=0;function Ut(){throw Error(Y(321))}function Sp(n,e){if(e===null)return!1;for(var t=0;t<e.length&&t<n.length;t++)if(!zn(n[t],e[t]))return!1;return!0}function Mp(n,e,t,i,s,a){return Fs=a,Fe=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,be.H=n===null||n.memoizedState===null?ix:sx,xa=!1,a=t(i,s),xa=!1,dr&&(a=wv(e,t,i,s)),Rv(n),a}function Rv(n){be.H=$c;var e=pt!==null&&pt.next!==null;if(Fs=0,It=pt=Fe=null,Qc=!1,qo=0,pr=null,e)throw Error(Y(300));n===null||qt||(n=n.dependencies,n!==null&&Kc(n)&&(qt=!0))}function wv(n,e,t,i){Fe=n;var s=0;do{if(dr&&(pr=null),qo=0,dr=!1,25<=s)throw Error(Y(301));if(s+=1,It=pt=null,n.updateQueue!=null){var a=n.updateQueue;a.lastEffect=null,a.events=null,a.stores=null,a.memoCache!=null&&(a.memoCache.index=0)}be.H=aE,a=e(t,i)}while(dr);return a}function $M(){var n=be.H,e=n.useState()[0];return e=typeof e.then=="function"?vl(e):e,n=n.useState()[0],(pt!==null?pt.memoizedState:null)!==n&&(Fe.flags|=1024),e}function Ep(){var n=Jc!==0;return Jc=0,n}function Tp(n,e,t){e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~t}function bp(n){if(Qc){for(n=n.memoizedState;n!==null;){var e=n.queue;e!==null&&(e.pending=null),n=n.next}Qc=!1}Fs=0,It=pt=Fe=null,dr=!1,qo=Jc=0,pr=null}function vn(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return It===null?Fe.memoizedState=It=n:It=It.next=n,It}function Bt(){if(pt===null){var n=Fe.alternate;n=n!==null?n.memoizedState:null}else n=pt.next;var e=It===null?Fe.memoizedState:It.next;if(e!==null)It=e,pt=n;else{if(n===null)throw Fe.alternate===null?Error(Y(467)):Error(Y(310));pt=n,n={memoizedState:pt.memoizedState,baseState:pt.baseState,baseQueue:pt.baseQueue,queue:pt.queue,next:null},It===null?Fe.memoizedState=It=n:It=It.next=n}return It}function Ap(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function vl(n){var e=qo;return qo+=1,pr===null&&(pr=[]),n=Tv(pr,n,e),e=Fe,(It===null?e.memoizedState:It.next)===null&&(e=e.alternate,be.H=e===null||e.memoizedState===null?ix:sx),n}function Lu(n){if(n!==null&&typeof n=="object"){if(typeof n.then=="function")return vl(n);if(n.$$typeof===Vi)return an(n)}throw Error(Y(438,String(n)))}function Rp(n){var e=null,t=Fe.updateQueue;if(t!==null&&(e=t.memoCache),e==null){var i=Fe.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(e={data:i.data.map(function(s){return s.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),t===null&&(t=Ap(),Fe.updateQueue=t),t.memoCache=e,t=e.data[e.index],t===void 0)for(t=e.data[e.index]=Array(n),i=0;i<n;i++)t[i]=BS;return e.index++,t}function $i(n,e){return typeof e=="function"?e(n):e}function bc(n){var e=Bt();return wp(e,pt,n)}function wp(n,e,t){var i=n.queue;if(i===null)throw Error(Y(311));i.lastRenderedReducer=t;var s=n.baseQueue,a=i.pending;if(a!==null){if(s!==null){var r=s.next;s.next=a.next,a.next=r}e.baseQueue=s=a,i.pending=null}if(a=n.baseState,s===null)n.memoizedState=a;else{e=s.next;var o=r=null,l=null,c=e,u=!1;do{var f=c.lane&-536870913;if(f!==c.lane?(je&f)===f:(Fs&f)===f){var h=c.revertLane;if(h===0)l!==null&&(l=l.next={lane:0,revertLane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),f===Er&&(u=!0);else if((Fs&h)===h){c=c.next,h===Er&&(u=!0);continue}else f={lane:0,revertLane:c.revertLane,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=f,r=a):l=l.next=f,Fe.lanes|=h,Gs|=h;f=c.action,xa&&t(a,f),a=c.hasEagerState?c.eagerState:t(a,f)}else h={lane:f,revertLane:c.revertLane,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=h,r=a):l=l.next=h,Fe.lanes|=f,Gs|=f;c=c.next}while(c!==null&&c!==e);if(l===null?r=a:l.next=o,!zn(a,n.memoizedState)&&(qt=!0,u&&(t=hr,t!==null)))throw t;n.memoizedState=a,n.baseState=r,n.baseQueue=l,i.lastRenderedState=a}return s===null&&(i.lanes=0),[n.memoizedState,i.dispatch]}function lf(n){var e=Bt(),t=e.queue;if(t===null)throw Error(Y(311));t.lastRenderedReducer=n;var i=t.dispatch,s=t.pending,a=e.memoizedState;if(s!==null){t.pending=null;var r=s=s.next;do a=n(a,r.action),r=r.next;while(r!==s);zn(a,e.memoizedState)||(qt=!0),e.memoizedState=a,e.baseQueue===null&&(e.baseState=a),t.lastRenderedState=a}return[a,i]}function Cv(n,e,t){var i=Fe,s=Bt(),a=nt;if(a){if(t===void 0)throw Error(Y(407));t=t()}else t=e();var r=!zn((pt||s).memoizedState,t);r&&(s.memoizedState=t,qt=!0),s=s.queue;var o=Uv.bind(null,i,s,n);if(xl(2048,8,o,[n]),s.getSnapshot!==e||r||It!==null&&It.memoizedState.tag&1){if(i.flags|=2048,br(9,Uu(),Lv.bind(null,i,s,t,e),null),_t===null)throw Error(Y(349));a||Fs&124||Dv(i,e,t)}return t}function Dv(n,e,t){n.flags|=16384,n={getSnapshot:e,value:t},e=Fe.updateQueue,e===null?(e=Ap(),Fe.updateQueue=e,e.stores=[n]):(t=e.stores,t===null?e.stores=[n]:t.push(n))}function Lv(n,e,t,i){e.value=t,e.getSnapshot=i,Nv(e)&&Ov(n)}function Uv(n,e,t){return t(function(){Nv(e)&&Ov(n)})}function Nv(n){var e=n.getSnapshot;n=n.value;try{var t=e();return!zn(n,t)}catch{return!0}}function Ov(n){var e=kr(n,2);e!==null&&In(e,n,2)}function Oh(n){var e=vn();if(typeof n=="function"){var t=n;if(n=t(),xa){Es(!0);try{t()}finally{Es(!1)}}}return e.memoizedState=e.baseState=n,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:$i,lastRenderedState:n},e}function Pv(n,e,t,i){return n.baseState=t,wp(n,pt,typeof i=="function"?i:$i)}function eE(n,e,t,i,s){if(Nu(n))throw Error(Y(485));if(n=e.action,n!==null){var a={payload:s,action:n,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(r){a.listeners.push(r)}};be.T!==null?t(!0):a.isTransition=!1,i(a),t=e.pending,t===null?(a.next=e.pending=a,Iv(e,a)):(a.next=t.next,e.pending=t.next=a)}}function Iv(n,e){var t=e.action,i=e.payload,s=n.state;if(e.isTransition){var a=be.T,r={};be.T=r;try{var o=t(s,i),l=be.S;l!==null&&l(r,o),rg(n,e,o)}catch(c){Ph(n,e,c)}finally{be.T=a}}else try{a=t(s,i),rg(n,e,a)}catch(c){Ph(n,e,c)}}function rg(n,e,t){t!==null&&typeof t=="object"&&typeof t.then=="function"?t.then(function(i){og(n,e,i)},function(i){return Ph(n,e,i)}):og(n,e,t)}function og(n,e,t){e.status="fulfilled",e.value=t,Bv(e),n.state=t,e=n.pending,e!==null&&(t=e.next,t===e?n.pending=null:(t=t.next,e.next=t,Iv(n,t)))}function Ph(n,e,t){var i=n.pending;if(n.pending=null,i!==null){i=i.next;do e.status="rejected",e.reason=t,Bv(e),e=e.next;while(e!==i)}n.action=null}function Bv(n){n=n.listeners;for(var e=0;e<n.length;e++)(0,n[e])()}function zv(n,e){return e}function lg(n,e){if(nt){var t=_t.formState;if(t!==null){e:{var i=Fe;if(nt){if(Ct){t:{for(var s=Ct,a=_i;s.nodeType!==8;){if(!a){s=null;break t}if(s=fi(s.nextSibling),s===null){s=null;break t}}a=s.data,s=a==="F!"||a==="F"?s:null}if(s){Ct=fi(s.nextSibling),i=s.data==="F!";break e}}_a(i)}i=!1}i&&(e=t[0])}}return t=vn(),t.memoizedState=t.baseState=e,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:zv,lastRenderedState:e},t.queue=i,t=ex.bind(null,Fe,i),i.dispatch=t,i=Oh(!1),a=Up.bind(null,Fe,!1,i.queue),i=vn(),s={state:e,dispatch:null,action:n,pending:null},i.queue=s,t=eE.bind(null,Fe,s,a,t),s.dispatch=t,i.memoizedState=n,[e,t,!1]}function cg(n){var e=Bt();return Fv(e,pt,n)}function Fv(n,e,t){if(e=wp(n,e,zv)[0],n=bc($i)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var i=vl(e)}catch(r){throw r===_l?Du:r}else i=e;e=Bt();var s=e.queue,a=s.dispatch;return t!==e.memoizedState&&(Fe.flags|=2048,br(9,Uu(),tE.bind(null,s,t),null)),[i,a,n]}function tE(n,e){n.action=e}function ug(n){var e=Bt(),t=pt;if(t!==null)return Fv(e,t,n);Bt(),e=e.memoizedState,t=Bt();var i=t.queue.dispatch;return t.memoizedState=n,[e,i,!1]}function br(n,e,t,i){return n={tag:n,create:t,deps:i,inst:e,next:null},e=Fe.updateQueue,e===null&&(e=Ap(),Fe.updateQueue=e),t=e.lastEffect,t===null?e.lastEffect=n.next=n:(i=t.next,t.next=n,n.next=i,e.lastEffect=n),n}function Uu(){return{destroy:void 0,resource:void 0}}function Hv(){return Bt().memoizedState}function Ac(n,e,t,i){var s=vn();i=i===void 0?null:i,Fe.flags|=n,s.memoizedState=br(1|e,Uu(),t,i)}function xl(n,e,t,i){var s=Bt();i=i===void 0?null:i;var a=s.memoizedState.inst;pt!==null&&i!==null&&Sp(i,pt.memoizedState.deps)?s.memoizedState=br(e,a,t,i):(Fe.flags|=n,s.memoizedState=br(1|e,a,t,i))}function fg(n,e){Ac(8390656,8,n,e)}function Gv(n,e){xl(2048,8,n,e)}function Vv(n,e){return xl(4,2,n,e)}function kv(n,e){return xl(4,4,n,e)}function Xv(n,e){if(typeof e=="function"){n=n();var t=e(n);return function(){typeof t=="function"?t():e(null)}}if(e!=null)return n=n(),e.current=n,function(){e.current=null}}function Wv(n,e,t){t=t!=null?t.concat([n]):null,xl(4,4,Xv.bind(null,e,n),t)}function Cp(){}function qv(n,e){var t=Bt();e=e===void 0?null:e;var i=t.memoizedState;return e!==null&&Sp(e,i[1])?i[0]:(t.memoizedState=[n,e],n)}function Yv(n,e){var t=Bt();e=e===void 0?null:e;var i=t.memoizedState;if(e!==null&&Sp(e,i[1]))return i[0];if(i=n(),xa){Es(!0);try{n()}finally{Es(!1)}}return t.memoizedState=[i,e],i}function Dp(n,e,t){return t===void 0||Fs&1073741824?n.memoizedState=e:(n.memoizedState=t,n=Bx(),Fe.lanes|=n,Gs|=n,t)}function jv(n,e,t,i){return zn(t,e)?t:Tr.current!==null?(n=Dp(n,t,i),zn(n,e)||(qt=!0),n):Fs&42?(n=Bx(),Fe.lanes|=n,Gs|=n,e):(qt=!0,n.memoizedState=t)}function Kv(n,e,t,i,s){var a=st.p;st.p=a!==0&&8>a?a:8;var r=be.T,o={};be.T=o,Up(n,!1,e,t);try{var l=s(),c=be.S;if(c!==null&&c(o,l),l!==null&&typeof l=="object"&&typeof l.then=="function"){var u=QM(l,i);Uo(n,e,u,Pn(n))}else Uo(n,e,i,Pn(n))}catch(f){Uo(n,e,{then:function(){},status:"rejected",reason:f},Pn())}finally{st.p=a,be.T=r}}function nE(){}function Ih(n,e,t,i){if(n.tag!==5)throw Error(Y(476));var s=Zv(n).queue;Kv(n,s,e,ua,t===null?nE:function(){return Qv(n),t(i)})}function Zv(n){var e=n.memoizedState;if(e!==null)return e;e={memoizedState:ua,baseState:ua,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:$i,lastRenderedState:ua},next:null};var t={};return e.next={memoizedState:t,baseState:t,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:$i,lastRenderedState:t},next:null},n.memoizedState=e,n=n.alternate,n!==null&&(n.memoizedState=e),e}function Qv(n){var e=Zv(n).next.queue;Uo(n,e,{},Pn())}function Lp(){return an(Qo)}function Jv(){return Bt().memoizedState}function $v(){return Bt().memoizedState}function iE(n){for(var e=n.return;e!==null;){switch(e.tag){case 24:case 3:var t=Pn();n=Ds(t);var i=Ls(e,n,t);i!==null&&(In(i,e,t),Co(i,e,t)),e={cache:_p()},n.payload=e;return}e=e.return}}function sE(n,e,t){var i=Pn();t={lane:i,revertLane:0,action:t,hasEagerState:!1,eagerState:null,next:null},Nu(n)?tx(e,t):(t=dp(n,e,t,i),t!==null&&(In(t,n,i),nx(t,e,i)))}function ex(n,e,t){var i=Pn();Uo(n,e,t,i)}function Uo(n,e,t,i){var s={lane:i,revertLane:0,action:t,hasEagerState:!1,eagerState:null,next:null};if(Nu(n))tx(e,s);else{var a=n.alternate;if(n.lanes===0&&(a===null||a.lanes===0)&&(a=e.lastRenderedReducer,a!==null))try{var r=e.lastRenderedState,o=a(r,t);if(s.hasEagerState=!0,s.eagerState=o,zn(o,r))return Cu(n,e,s,0),_t===null&&wu(),!1}catch{}finally{}if(t=dp(n,e,s,i),t!==null)return In(t,n,i),nx(t,e,i),!0}return!1}function Up(n,e,t,i){if(i={lane:2,revertLane:Hp(),action:i,hasEagerState:!1,eagerState:null,next:null},Nu(n)){if(e)throw Error(Y(479))}else e=dp(n,t,i,2),e!==null&&In(e,n,2)}function Nu(n){var e=n.alternate;return n===Fe||e!==null&&e===Fe}function tx(n,e){dr=Qc=!0;var t=n.pending;t===null?e.next=e:(e.next=t.next,t.next=e),n.pending=e}function nx(n,e,t){if(t&4194048){var i=e.lanes;i&=n.pendingLanes,t|=i,e.lanes=t,q0(n,t)}}var $c={readContext:an,use:Lu,useCallback:Ut,useContext:Ut,useEffect:Ut,useImperativeHandle:Ut,useLayoutEffect:Ut,useInsertionEffect:Ut,useMemo:Ut,useReducer:Ut,useRef:Ut,useState:Ut,useDebugValue:Ut,useDeferredValue:Ut,useTransition:Ut,useSyncExternalStore:Ut,useId:Ut,useHostTransitionStatus:Ut,useFormState:Ut,useActionState:Ut,useOptimistic:Ut,useMemoCache:Ut,useCacheRefresh:Ut},ix={readContext:an,use:Lu,useCallback:function(n,e){return vn().memoizedState=[n,e===void 0?null:e],n},useContext:an,useEffect:fg,useImperativeHandle:function(n,e,t){t=t!=null?t.concat([n]):null,Ac(4194308,4,Xv.bind(null,e,n),t)},useLayoutEffect:function(n,e){return Ac(4194308,4,n,e)},useInsertionEffect:function(n,e){Ac(4,2,n,e)},useMemo:function(n,e){var t=vn();e=e===void 0?null:e;var i=n();if(xa){Es(!0);try{n()}finally{Es(!1)}}return t.memoizedState=[i,e],i},useReducer:function(n,e,t){var i=vn();if(t!==void 0){var s=t(e);if(xa){Es(!0);try{t(e)}finally{Es(!1)}}}else s=e;return i.memoizedState=i.baseState=s,n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:s},i.queue=n,n=n.dispatch=sE.bind(null,Fe,n),[i.memoizedState,n]},useRef:function(n){var e=vn();return n={current:n},e.memoizedState=n},useState:function(n){n=Oh(n);var e=n.queue,t=ex.bind(null,Fe,e);return e.dispatch=t,[n.memoizedState,t]},useDebugValue:Cp,useDeferredValue:function(n,e){var t=vn();return Dp(t,n,e)},useTransition:function(){var n=Oh(!1);return n=Kv.bind(null,Fe,n.queue,!0,!1),vn().memoizedState=n,[!1,n]},useSyncExternalStore:function(n,e,t){var i=Fe,s=vn();if(nt){if(t===void 0)throw Error(Y(407));t=t()}else{if(t=e(),_t===null)throw Error(Y(349));je&124||Dv(i,e,t)}s.memoizedState=t;var a={value:t,getSnapshot:e};return s.queue=a,fg(Uv.bind(null,i,a,n),[n]),i.flags|=2048,br(9,Uu(),Lv.bind(null,i,a,t,e),null),t},useId:function(){var n=vn(),e=_t.identifierPrefix;if(nt){var t=Xi,i=ki;t=(i&~(1<<32-On(i)-1)).toString(32)+t,e="«"+e+"R"+t,t=Jc++,0<t&&(e+="H"+t.toString(32)),e+="»"}else t=JM++,e="«"+e+"r"+t.toString(32)+"»";return n.memoizedState=e},useHostTransitionStatus:Lp,useFormState:lg,useActionState:lg,useOptimistic:function(n){var e=vn();e.memoizedState=e.baseState=n;var t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=t,e=Up.bind(null,Fe,!0,t),t.dispatch=e,[n,e]},useMemoCache:Rp,useCacheRefresh:function(){return vn().memoizedState=iE.bind(null,Fe)}},sx={readContext:an,use:Lu,useCallback:qv,useContext:an,useEffect:Gv,useImperativeHandle:Wv,useInsertionEffect:Vv,useLayoutEffect:kv,useMemo:Yv,useReducer:bc,useRef:Hv,useState:function(){return bc($i)},useDebugValue:Cp,useDeferredValue:function(n,e){var t=Bt();return jv(t,pt.memoizedState,n,e)},useTransition:function(){var n=bc($i)[0],e=Bt().memoizedState;return[typeof n=="boolean"?n:vl(n),e]},useSyncExternalStore:Cv,useId:Jv,useHostTransitionStatus:Lp,useFormState:cg,useActionState:cg,useOptimistic:function(n,e){var t=Bt();return Pv(t,pt,n,e)},useMemoCache:Rp,useCacheRefresh:$v},aE={readContext:an,use:Lu,useCallback:qv,useContext:an,useEffect:Gv,useImperativeHandle:Wv,useInsertionEffect:Vv,useLayoutEffect:kv,useMemo:Yv,useReducer:lf,useRef:Hv,useState:function(){return lf($i)},useDebugValue:Cp,useDeferredValue:function(n,e){var t=Bt();return pt===null?Dp(t,n,e):jv(t,pt.memoizedState,n,e)},useTransition:function(){var n=lf($i)[0],e=Bt().memoizedState;return[typeof n=="boolean"?n:vl(n),e]},useSyncExternalStore:Cv,useId:Jv,useHostTransitionStatus:Lp,useFormState:ug,useActionState:ug,useOptimistic:function(n,e){var t=Bt();return pt!==null?Pv(t,pt,n,e):(t.baseState=n,[n,t.queue.dispatch])},useMemoCache:Rp,useCacheRefresh:$v},mr=null,Yo=0;function Fl(n){var e=Yo;return Yo+=1,mr===null&&(mr=[]),Tv(mr,n,e)}function io(n,e){e=e.props.ref,n.ref=e!==void 0?e:null}function Hl(n,e){throw e.$$typeof===PS?Error(Y(525)):(n=Object.prototype.toString.call(e),Error(Y(31,n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n)))}function hg(n){var e=n._init;return e(n._payload)}function ax(n){function e(d,_){if(n){var x=d.deletions;x===null?(d.deletions=[_],d.flags|=16):x.push(_)}}function t(d,_){if(!n)return null;for(;_!==null;)e(d,_),_=_.sibling;return null}function i(d){for(var _=new Map;d!==null;)d.key!==null?_.set(d.key,d):_.set(d.index,d),d=d.sibling;return _}function s(d,_){return d=Ki(d,_),d.index=0,d.sibling=null,d}function a(d,_,x){return d.index=x,n?(x=d.alternate,x!==null?(x=x.index,x<_?(d.flags|=67108866,_):x):(d.flags|=67108866,_)):(d.flags|=1048576,_)}function r(d){return n&&d.alternate===null&&(d.flags|=67108866),d}function o(d,_,x,y){return _===null||_.tag!==6?(_=af(x,d.mode,y),_.return=d,_):(_=s(_,x),_.return=d,_)}function l(d,_,x,y){var R=x.type;return R===Za?u(d,_,x.props.children,y,x.key):_!==null&&(_.elementType===R||typeof R=="object"&&R!==null&&R.$$typeof===gs&&hg(R)===_.type)?(_=s(_,x.props),io(_,x),_.return=d,_):(_=Ec(x.type,x.key,x.props,null,d.mode,y),io(_,x),_.return=d,_)}function c(d,_,x,y){return _===null||_.tag!==4||_.stateNode.containerInfo!==x.containerInfo||_.stateNode.implementation!==x.implementation?(_=rf(x,d.mode,y),_.return=d,_):(_=s(_,x.children||[]),_.return=d,_)}function u(d,_,x,y,R){return _===null||_.tag!==7?(_=fa(x,d.mode,y,R),_.return=d,_):(_=s(_,x),_.return=d,_)}function f(d,_,x){if(typeof _=="string"&&_!==""||typeof _=="number"||typeof _=="bigint")return _=af(""+_,d.mode,x),_.return=d,_;if(typeof _=="object"&&_!==null){switch(_.$$typeof){case Ul:return x=Ec(_.type,_.key,_.props,null,d.mode,x),io(x,_),x.return=d,x;case _o:return _=rf(_,d.mode,x),_.return=d,_;case gs:var y=_._init;return _=y(_._payload),f(d,_,x)}if(vo(_)||$r(_))return _=fa(_,d.mode,x,null),_.return=d,_;if(typeof _.then=="function")return f(d,Fl(_),x);if(_.$$typeof===Vi)return f(d,Bl(d,_),x);Hl(d,_)}return null}function h(d,_,x,y){var R=_!==null?_.key:null;if(typeof x=="string"&&x!==""||typeof x=="number"||typeof x=="bigint")return R!==null?null:o(d,_,""+x,y);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case Ul:return x.key===R?l(d,_,x,y):null;case _o:return x.key===R?c(d,_,x,y):null;case gs:return R=x._init,x=R(x._payload),h(d,_,x,y)}if(vo(x)||$r(x))return R!==null?null:u(d,_,x,y,null);if(typeof x.then=="function")return h(d,_,Fl(x),y);if(x.$$typeof===Vi)return h(d,_,Bl(d,x),y);Hl(d,x)}return null}function p(d,_,x,y,R){if(typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint")return d=d.get(x)||null,o(_,d,""+y,R);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case Ul:return d=d.get(y.key===null?x:y.key)||null,l(_,d,y,R);case _o:return d=d.get(y.key===null?x:y.key)||null,c(_,d,y,R);case gs:var w=y._init;return y=w(y._payload),p(d,_,x,y,R)}if(vo(y)||$r(y))return d=d.get(x)||null,u(_,d,y,R,null);if(typeof y.then=="function")return p(d,_,x,Fl(y),R);if(y.$$typeof===Vi)return p(d,_,x,Bl(_,y),R);Hl(_,y)}return null}function g(d,_,x,y){for(var R=null,w=null,b=_,C=_=0,T=null;b!==null&&C<x.length;C++){b.index>C?(T=b,b=null):T=b.sibling;var S=h(d,b,x[C],y);if(S===null){b===null&&(b=T);break}n&&b&&S.alternate===null&&e(d,b),_=a(S,_,C),w===null?R=S:w.sibling=S,w=S,b=T}if(C===x.length)return t(d,b),nt&&ia(d,C),R;if(b===null){for(;C<x.length;C++)b=f(d,x[C],y),b!==null&&(_=a(b,_,C),w===null?R=b:w.sibling=b,w=b);return nt&&ia(d,C),R}for(b=i(b);C<x.length;C++)T=p(b,d,C,x[C],y),T!==null&&(n&&T.alternate!==null&&b.delete(T.key===null?C:T.key),_=a(T,_,C),w===null?R=T:w.sibling=T,w=T);return n&&b.forEach(function(L){return e(d,L)}),nt&&ia(d,C),R}function v(d,_,x,y){if(x==null)throw Error(Y(151));for(var R=null,w=null,b=_,C=_=0,T=null,S=x.next();b!==null&&!S.done;C++,S=x.next()){b.index>C?(T=b,b=null):T=b.sibling;var L=h(d,b,S.value,y);if(L===null){b===null&&(b=T);break}n&&b&&L.alternate===null&&e(d,b),_=a(L,_,C),w===null?R=L:w.sibling=L,w=L,b=T}if(S.done)return t(d,b),nt&&ia(d,C),R;if(b===null){for(;!S.done;C++,S=x.next())S=f(d,S.value,y),S!==null&&(_=a(S,_,C),w===null?R=S:w.sibling=S,w=S);return nt&&ia(d,C),R}for(b=i(b);!S.done;C++,S=x.next())S=p(b,d,C,S.value,y),S!==null&&(n&&S.alternate!==null&&b.delete(S.key===null?C:S.key),_=a(S,_,C),w===null?R=S:w.sibling=S,w=S);return n&&b.forEach(function(X){return e(d,X)}),nt&&ia(d,C),R}function m(d,_,x,y){if(typeof x=="object"&&x!==null&&x.type===Za&&x.key===null&&(x=x.props.children),typeof x=="object"&&x!==null){switch(x.$$typeof){case Ul:e:{for(var R=x.key;_!==null;){if(_.key===R){if(R=x.type,R===Za){if(_.tag===7){t(d,_.sibling),y=s(_,x.props.children),y.return=d,d=y;break e}}else if(_.elementType===R||typeof R=="object"&&R!==null&&R.$$typeof===gs&&hg(R)===_.type){t(d,_.sibling),y=s(_,x.props),io(y,x),y.return=d,d=y;break e}t(d,_);break}else e(d,_);_=_.sibling}x.type===Za?(y=fa(x.props.children,d.mode,y,x.key),y.return=d,d=y):(y=Ec(x.type,x.key,x.props,null,d.mode,y),io(y,x),y.return=d,d=y)}return r(d);case _o:e:{for(R=x.key;_!==null;){if(_.key===R)if(_.tag===4&&_.stateNode.containerInfo===x.containerInfo&&_.stateNode.implementation===x.implementation){t(d,_.sibling),y=s(_,x.children||[]),y.return=d,d=y;break e}else{t(d,_);break}else e(d,_);_=_.sibling}y=rf(x,d.mode,y),y.return=d,d=y}return r(d);case gs:return R=x._init,x=R(x._payload),m(d,_,x,y)}if(vo(x))return g(d,_,x,y);if($r(x)){if(R=$r(x),typeof R!="function")throw Error(Y(150));return x=R.call(x),v(d,_,x,y)}if(typeof x.then=="function")return m(d,_,Fl(x),y);if(x.$$typeof===Vi)return m(d,_,Bl(d,x),y);Hl(d,x)}return typeof x=="string"&&x!==""||typeof x=="number"||typeof x=="bigint"?(x=""+x,_!==null&&_.tag===6?(t(d,_.sibling),y=s(_,x),y.return=d,d=y):(t(d,_),y=af(x,d.mode,y),y.return=d,d=y),r(d)):t(d,_)}return function(d,_,x,y){try{Yo=0;var R=m(d,_,x,y);return mr=null,R}catch(b){if(b===_l||b===Du)throw b;var w=Ln(29,b,null,d.mode);return w.lanes=y,w.return=d,w}finally{}}}var Ar=ax(!0),rx=ax(!1),Jn=bi(null),Mi=null;function xs(n){var e=n.alternate;Et(Ft,Ft.current&1),Et(Jn,n),Mi===null&&(e===null||Tr.current!==null||e.memoizedState!==null)&&(Mi=n)}function ox(n){if(n.tag===22){if(Et(Ft,Ft.current),Et(Jn,n),Mi===null){var e=n.alternate;e!==null&&e.memoizedState!==null&&(Mi=n)}}else ys()}function ys(){Et(Ft,Ft.current),Et(Jn,Jn.current)}function qi(n){Yt(Jn),Mi===n&&(Mi=null),Yt(Ft)}var Ft=bi(0);function eu(n){for(var e=n;e!==null;){if(e.tag===13){var t=e.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||$h(t)))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}function cf(n,e,t,i){e=n.memoizedState,t=t(i,e),t=t==null?e:xt({},e,t),n.memoizedState=t,n.lanes===0&&(n.updateQueue.baseState=t)}var Bh={enqueueSetState:function(n,e,t){n=n._reactInternals;var i=Pn(),s=Ds(i);s.payload=e,t!=null&&(s.callback=t),e=Ls(n,s,i),e!==null&&(In(e,n,i),Co(e,n,i))},enqueueReplaceState:function(n,e,t){n=n._reactInternals;var i=Pn(),s=Ds(i);s.tag=1,s.payload=e,t!=null&&(s.callback=t),e=Ls(n,s,i),e!==null&&(In(e,n,i),Co(e,n,i))},enqueueForceUpdate:function(n,e){n=n._reactInternals;var t=Pn(),i=Ds(t);i.tag=2,e!=null&&(i.callback=e),e=Ls(n,i,t),e!==null&&(In(e,n,t),Co(e,n,t))}};function dg(n,e,t,i,s,a,r){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(i,a,r):e.prototype&&e.prototype.isPureReactComponent?!Xo(t,i)||!Xo(s,a):!0}function pg(n,e,t,i){n=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(t,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(t,i),e.state!==n&&Bh.enqueueReplaceState(e,e.state,null)}function ya(n,e){var t=e;if("ref"in e){t={};for(var i in e)i!=="ref"&&(t[i]=e[i])}if(n=n.defaultProps){t===e&&(t=xt({},t));for(var s in n)t[s]===void 0&&(t[s]=n[s])}return t}var tu=typeof reportError=="function"?reportError:function(n){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof n=="object"&&n!==null&&typeof n.message=="string"?String(n.message):String(n),error:n});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",n);return}console.error(n)};function lx(n){tu(n)}function cx(n){console.error(n)}function ux(n){tu(n)}function nu(n,e){try{var t=n.onUncaughtError;t(e.value,{componentStack:e.stack})}catch(i){setTimeout(function(){throw i})}}function mg(n,e,t){try{var i=n.onCaughtError;i(t.value,{componentStack:t.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(s){setTimeout(function(){throw s})}}function zh(n,e,t){return t=Ds(t),t.tag=3,t.payload={element:null},t.callback=function(){nu(n,e)},t}function fx(n){return n=Ds(n),n.tag=3,n}function hx(n,e,t,i){var s=t.type.getDerivedStateFromError;if(typeof s=="function"){var a=i.value;n.payload=function(){return s(a)},n.callback=function(){mg(e,t,i)}}var r=t.stateNode;r!==null&&typeof r.componentDidCatch=="function"&&(n.callback=function(){mg(e,t,i),typeof s!="function"&&(Us===null?Us=new Set([this]):Us.add(this));var o=i.stack;this.componentDidCatch(i.value,{componentStack:o!==null?o:""})})}function rE(n,e,t,i,s){if(t.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(e=t.alternate,e!==null&&ml(e,t,s,!0),t=Jn.current,t!==null){switch(t.tag){case 13:return Mi===null?qh():t.alternate===null&&Dt===0&&(Dt=3),t.flags&=-257,t.flags|=65536,t.lanes=s,i===Dh?t.flags|=16384:(e=t.updateQueue,e===null?t.updateQueue=new Set([i]):e.add(i),yf(n,i,s)),!1;case 22:return t.flags|=65536,i===Dh?t.flags|=16384:(e=t.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([i])},t.updateQueue=e):(t=e.retryQueue,t===null?e.retryQueue=new Set([i]):t.add(i)),yf(n,i,s)),!1}throw Error(Y(435,t.tag))}return yf(n,i,s),qh(),!1}if(nt)return e=Jn.current,e!==null?(!(e.flags&65536)&&(e.flags|=256),e.flags|=65536,e.lanes=s,i!==bh&&(n=Error(Y(422),{cause:i}),Wo(Kn(n,t)))):(i!==bh&&(e=Error(Y(423),{cause:i}),Wo(Kn(e,t))),n=n.current.alternate,n.flags|=65536,s&=-s,n.lanes|=s,i=Kn(i,t),s=zh(n.stateNode,i,s),of(n,s),Dt!==4&&(Dt=2)),!1;var a=Error(Y(520),{cause:i});if(a=Kn(a,t),Po===null?Po=[a]:Po.push(a),Dt!==4&&(Dt=2),e===null)return!0;i=Kn(i,t),t=e;do{switch(t.tag){case 3:return t.flags|=65536,n=s&-s,t.lanes|=n,n=zh(t.stateNode,i,n),of(t,n),!1;case 1:if(e=t.type,a=t.stateNode,(t.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||a!==null&&typeof a.componentDidCatch=="function"&&(Us===null||!Us.has(a))))return t.flags|=65536,s&=-s,t.lanes|=s,s=fx(s),hx(s,n,t,i),of(t,s),!1}t=t.return}while(t!==null);return!1}var dx=Error(Y(461)),qt=!1;function Zt(n,e,t,i){e.child=n===null?rx(e,null,t,i):Ar(e,n.child,t,i)}function gg(n,e,t,i,s){t=t.render;var a=e.ref;if("ref"in i){var r={};for(var o in i)o!=="ref"&&(r[o]=i[o])}else r=i;return va(e),i=Mp(n,e,t,r,a,s),o=Ep(),n!==null&&!qt?(Tp(n,e,s),es(n,e,s)):(nt&&o&&mp(e),e.flags|=1,Zt(n,e,i,s),e.child)}function _g(n,e,t,i,s){if(n===null){var a=t.type;return typeof a=="function"&&!pp(a)&&a.defaultProps===void 0&&t.compare===null?(e.tag=15,e.type=a,px(n,e,a,i,s)):(n=Ec(t.type,null,i,e,e.mode,s),n.ref=e.ref,n.return=e,e.child=n)}if(a=n.child,!Np(n,s)){var r=a.memoizedProps;if(t=t.compare,t=t!==null?t:Xo,t(r,i)&&n.ref===e.ref)return es(n,e,s)}return e.flags|=1,n=Ki(a,i),n.ref=e.ref,n.return=e,e.child=n}function px(n,e,t,i,s){if(n!==null){var a=n.memoizedProps;if(Xo(a,i)&&n.ref===e.ref)if(qt=!1,e.pendingProps=i=a,Np(n,s))n.flags&131072&&(qt=!0);else return e.lanes=n.lanes,es(n,e,s)}return Fh(n,e,t,i,s)}function mx(n,e,t){var i=e.pendingProps,s=i.children,a=n!==null?n.memoizedState:null;if(i.mode==="hidden"){if(e.flags&128){if(i=a!==null?a.baseLanes|t:t,n!==null){for(s=e.child=n.child,a=0;s!==null;)a=a|s.lanes|s.childLanes,s=s.sibling;e.childLanes=a&~i}else e.childLanes=0,e.child=null;return vg(n,e,i,t)}if(t&536870912)e.memoizedState={baseLanes:0,cachePool:null},n!==null&&Tc(e,a!==null?a.cachePool:null),a!==null?ag(e,a):Nh(),ox(e);else return e.lanes=e.childLanes=536870912,vg(n,e,a!==null?a.baseLanes|t:t,t)}else a!==null?(Tc(e,a.cachePool),ag(e,a),ys(),e.memoizedState=null):(n!==null&&Tc(e,null),Nh(),ys());return Zt(n,e,s,t),e.child}function vg(n,e,t,i){var s=vp();return s=s===null?null:{parent:zt._currentValue,pool:s},e.memoizedState={baseLanes:t,cachePool:s},n!==null&&Tc(e,null),Nh(),ox(e),n!==null&&ml(n,e,i,!0),null}function Rc(n,e){var t=e.ref;if(t===null)n!==null&&n.ref!==null&&(e.flags|=4194816);else{if(typeof t!="function"&&typeof t!="object")throw Error(Y(284));(n===null||n.ref!==t)&&(e.flags|=4194816)}}function Fh(n,e,t,i,s){return va(e),t=Mp(n,e,t,i,void 0,s),i=Ep(),n!==null&&!qt?(Tp(n,e,s),es(n,e,s)):(nt&&i&&mp(e),e.flags|=1,Zt(n,e,t,s),e.child)}function xg(n,e,t,i,s,a){return va(e),e.updateQueue=null,t=wv(e,i,t,s),Rv(n),i=Ep(),n!==null&&!qt?(Tp(n,e,a),es(n,e,a)):(nt&&i&&mp(e),e.flags|=1,Zt(n,e,t,a),e.child)}function yg(n,e,t,i,s){if(va(e),e.stateNode===null){var a=sr,r=t.contextType;typeof r=="object"&&r!==null&&(a=an(r)),a=new t(i,a),e.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Bh,e.stateNode=a,a._reactInternals=e,a=e.stateNode,a.props=i,a.state=e.memoizedState,a.refs={},xp(e),r=t.contextType,a.context=typeof r=="object"&&r!==null?an(r):sr,a.state=e.memoizedState,r=t.getDerivedStateFromProps,typeof r=="function"&&(cf(e,t,r,i),a.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(r=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),r!==a.state&&Bh.enqueueReplaceState(a,a.state,null),Lo(e,i,a,s),Do(),a.state=e.memoizedState),typeof a.componentDidMount=="function"&&(e.flags|=4194308),i=!0}else if(n===null){a=e.stateNode;var o=e.memoizedProps,l=ya(t,o);a.props=l;var c=a.context,u=t.contextType;r=sr,typeof u=="object"&&u!==null&&(r=an(u));var f=t.getDerivedStateFromProps;u=typeof f=="function"||typeof a.getSnapshotBeforeUpdate=="function",o=e.pendingProps!==o,u||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o||c!==r)&&pg(e,a,i,r),_s=!1;var h=e.memoizedState;a.state=h,Lo(e,i,a,s),Do(),c=e.memoizedState,o||h!==c||_s?(typeof f=="function"&&(cf(e,t,f,i),c=e.memoizedState),(l=_s||dg(e,t,l,i,h,c,r))?(u||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(e.flags|=4194308)):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=c),a.props=i,a.state=c,a.context=r,i=l):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{a=e.stateNode,Lh(n,e),r=e.memoizedProps,u=ya(t,r),a.props=u,f=e.pendingProps,h=a.context,c=t.contextType,l=sr,typeof c=="object"&&c!==null&&(l=an(c)),o=t.getDerivedStateFromProps,(c=typeof o=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(r!==f||h!==l)&&pg(e,a,i,l),_s=!1,h=e.memoizedState,a.state=h,Lo(e,i,a,s),Do();var p=e.memoizedState;r!==f||h!==p||_s||n!==null&&n.dependencies!==null&&Kc(n.dependencies)?(typeof o=="function"&&(cf(e,t,o,i),p=e.memoizedState),(u=_s||dg(e,t,u,i,h,p,l)||n!==null&&n.dependencies!==null&&Kc(n.dependencies))?(c||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(i,p,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(i,p,l)),typeof a.componentDidUpdate=="function"&&(e.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof a.componentDidUpdate!="function"||r===n.memoizedProps&&h===n.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||r===n.memoizedProps&&h===n.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=p),a.props=i,a.state=p,a.context=l,i=u):(typeof a.componentDidUpdate!="function"||r===n.memoizedProps&&h===n.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||r===n.memoizedProps&&h===n.memoizedState||(e.flags|=1024),i=!1)}return a=i,Rc(n,e),i=(e.flags&128)!==0,a||i?(a=e.stateNode,t=i&&typeof t.getDerivedStateFromError!="function"?null:a.render(),e.flags|=1,n!==null&&i?(e.child=Ar(e,n.child,null,s),e.child=Ar(e,null,t,s)):Zt(n,e,t,s),e.memoizedState=a.state,n=e.child):n=es(n,e,s),n}function Sg(n,e,t,i){return pl(),e.flags|=256,Zt(n,e,t,i),e.child}var uf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function ff(n){return{baseLanes:n,cachePool:Mv()}}function hf(n,e,t){return n=n!==null?n.childLanes&~t:0,e&&(n|=Zn),n}function gx(n,e,t){var i=e.pendingProps,s=!1,a=(e.flags&128)!==0,r;if((r=a)||(r=n!==null&&n.memoizedState===null?!1:(Ft.current&2)!==0),r&&(s=!0,e.flags&=-129),r=(e.flags&32)!==0,e.flags&=-33,n===null){if(nt){if(s?xs(e):ys(),nt){var o=Ct,l;if(l=o){e:{for(l=o,o=_i;l.nodeType!==8;){if(!o){o=null;break e}if(l=fi(l.nextSibling),l===null){o=null;break e}}o=l}o!==null?(e.memoizedState={dehydrated:o,treeContext:ha!==null?{id:ki,overflow:Xi}:null,retryLane:536870912,hydrationErrors:null},l=Ln(18,null,null,0),l.stateNode=o,l.return=e,e.child=l,fn=e,Ct=null,l=!0):l=!1}l||_a(e)}if(o=e.memoizedState,o!==null&&(o=o.dehydrated,o!==null))return $h(o)?e.lanes=32:e.lanes=536870912,null;qi(e)}return o=i.children,i=i.fallback,s?(ys(),s=e.mode,o=iu({mode:"hidden",children:o},s),i=fa(i,s,t,null),o.return=e,i.return=e,o.sibling=i,e.child=o,s=e.child,s.memoizedState=ff(t),s.childLanes=hf(n,r,t),e.memoizedState=uf,i):(xs(e),Hh(e,o))}if(l=n.memoizedState,l!==null&&(o=l.dehydrated,o!==null)){if(a)e.flags&256?(xs(e),e.flags&=-257,e=df(n,e,t)):e.memoizedState!==null?(ys(),e.child=n.child,e.flags|=128,e=null):(ys(),s=i.fallback,o=e.mode,i=iu({mode:"visible",children:i.children},o),s=fa(s,o,t,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,Ar(e,n.child,null,t),i=e.child,i.memoizedState=ff(t),i.childLanes=hf(n,r,t),e.memoizedState=uf,e=s);else if(xs(e),$h(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var c=r.dgst;r=c,i=Error(Y(419)),i.stack="",i.digest=r,Wo({value:i,source:null,stack:null}),e=df(n,e,t)}else if(qt||ml(n,e,t,!1),r=(t&n.childLanes)!==0,qt||r){if(r=_t,r!==null&&(i=t&-t,i=i&42?1:ip(i),i=i&(r.suspendedLanes|t)?0:i,i!==0&&i!==l.retryLane))throw l.retryLane=i,kr(n,i),In(r,n,i),dx;o.data==="$?"||qh(),e=df(n,e,t)}else o.data==="$?"?(e.flags|=192,e.child=n.child,e=null):(n=l.treeContext,Ct=fi(o.nextSibling),fn=e,nt=!0,da=null,_i=!1,n!==null&&(qn[Yn++]=ki,qn[Yn++]=Xi,qn[Yn++]=ha,ki=n.id,Xi=n.overflow,ha=e),e=Hh(e,i.children),e.flags|=4096);return e}return s?(ys(),s=i.fallback,o=e.mode,l=n.child,c=l.sibling,i=Ki(l,{mode:"hidden",children:i.children}),i.subtreeFlags=l.subtreeFlags&65011712,c!==null?s=Ki(c,s):(s=fa(s,o,t,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=n.child.memoizedState,o===null?o=ff(t):(l=o.cachePool,l!==null?(c=zt._currentValue,l=l.parent!==c?{parent:c,pool:c}:l):l=Mv(),o={baseLanes:o.baseLanes|t,cachePool:l}),s.memoizedState=o,s.childLanes=hf(n,r,t),e.memoizedState=uf,i):(xs(e),t=n.child,n=t.sibling,t=Ki(t,{mode:"visible",children:i.children}),t.return=e,t.sibling=null,n!==null&&(r=e.deletions,r===null?(e.deletions=[n],e.flags|=16):r.push(n)),e.child=t,e.memoizedState=null,t)}function Hh(n,e){return e=iu({mode:"visible",children:e},n.mode),e.return=n,n.child=e}function iu(n,e){return n=Ln(22,n,null,e),n.lanes=0,n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null},n}function df(n,e,t){return Ar(e,n.child,null,t),n=Hh(e,e.pendingProps.children),n.flags|=2,e.memoizedState=null,n}function Mg(n,e,t){n.lanes|=e;var i=n.alternate;i!==null&&(i.lanes|=e),Rh(n.return,e,t)}function pf(n,e,t,i,s){var a=n.memoizedState;a===null?n.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:t,tailMode:s}:(a.isBackwards=e,a.rendering=null,a.renderingStartTime=0,a.last=i,a.tail=t,a.tailMode=s)}function _x(n,e,t){var i=e.pendingProps,s=i.revealOrder,a=i.tail;if(Zt(n,e,i.children,t),i=Ft.current,i&2)i=i&1|2,e.flags|=128;else{if(n!==null&&n.flags&128)e:for(n=e.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&Mg(n,t,e);else if(n.tag===19)Mg(n,t,e);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break e;for(;n.sibling===null;){if(n.return===null||n.return===e)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}i&=1}switch(Et(Ft,i),s){case"forwards":for(t=e.child,s=null;t!==null;)n=t.alternate,n!==null&&eu(n)===null&&(s=t),t=t.sibling;t=s,t===null?(s=e.child,e.child=null):(s=t.sibling,t.sibling=null),pf(e,!1,s,t,a);break;case"backwards":for(t=null,s=e.child,e.child=null;s!==null;){if(n=s.alternate,n!==null&&eu(n)===null){e.child=s;break}n=s.sibling,s.sibling=t,t=s,s=n}pf(e,!0,t,null,a);break;case"together":pf(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function es(n,e,t){if(n!==null&&(e.dependencies=n.dependencies),Gs|=e.lanes,!(t&e.childLanes))if(n!==null){if(ml(n,e,t,!1),(t&e.childLanes)===0)return null}else return null;if(n!==null&&e.child!==n.child)throw Error(Y(153));if(e.child!==null){for(n=e.child,t=Ki(n,n.pendingProps),e.child=t,t.return=e;n.sibling!==null;)n=n.sibling,t=t.sibling=Ki(n,n.pendingProps),t.return=e;t.sibling=null}return e.child}function Np(n,e){return n.lanes&e?!0:(n=n.dependencies,!!(n!==null&&Kc(n)))}function oE(n,e,t){switch(e.tag){case 3:Gc(e,e.stateNode.containerInfo),vs(e,zt,n.memoizedState.cache),pl();break;case 27:case 5:mh(e);break;case 4:Gc(e,e.stateNode.containerInfo);break;case 10:vs(e,e.type,e.memoizedProps.value);break;case 13:var i=e.memoizedState;if(i!==null)return i.dehydrated!==null?(xs(e),e.flags|=128,null):t&e.child.childLanes?gx(n,e,t):(xs(e),n=es(n,e,t),n!==null?n.sibling:null);xs(e);break;case 19:var s=(n.flags&128)!==0;if(i=(t&e.childLanes)!==0,i||(ml(n,e,t,!1),i=(t&e.childLanes)!==0),s){if(i)return _x(n,e,t);e.flags|=128}if(s=e.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),Et(Ft,Ft.current),i)break;return null;case 22:case 23:return e.lanes=0,mx(n,e,t);case 24:vs(e,zt,n.memoizedState.cache)}return es(n,e,t)}function vx(n,e,t){if(n!==null)if(n.memoizedProps!==e.pendingProps)qt=!0;else{if(!Np(n,t)&&!(e.flags&128))return qt=!1,oE(n,e,t);qt=!!(n.flags&131072)}else qt=!1,nt&&e.flags&1048576&&yv(e,jc,e.index);switch(e.lanes=0,e.tag){case 16:e:{n=e.pendingProps;var i=e.elementType,s=i._init;if(i=s(i._payload),e.type=i,typeof i=="function")pp(i)?(n=ya(i,n),e.tag=1,e=yg(null,e,i,n,t)):(e.tag=0,e=Fh(null,e,i,n,t));else{if(i!=null){if(s=i.$$typeof,s===ep){e.tag=11,e=gg(null,e,i,n,t);break e}else if(s===tp){e.tag=14,e=_g(null,e,i,n,t);break e}}throw e=dh(i)||i,Error(Y(306,e,""))}}return e;case 0:return Fh(n,e,e.type,e.pendingProps,t);case 1:return i=e.type,s=ya(i,e.pendingProps),yg(n,e,i,s,t);case 3:e:{if(Gc(e,e.stateNode.containerInfo),n===null)throw Error(Y(387));i=e.pendingProps;var a=e.memoizedState;s=a.element,Lh(n,e),Lo(e,i,null,t);var r=e.memoizedState;if(i=r.cache,vs(e,zt,i),i!==a.cache&&wh(e,[zt],t,!0),Do(),i=r.element,a.isDehydrated)if(a={element:i,isDehydrated:!1,cache:r.cache},e.updateQueue.baseState=a,e.memoizedState=a,e.flags&256){e=Sg(n,e,i,t);break e}else if(i!==s){s=Kn(Error(Y(424)),e),Wo(s),e=Sg(n,e,i,t);break e}else{switch(n=e.stateNode.containerInfo,n.nodeType){case 9:n=n.body;break;default:n=n.nodeName==="HTML"?n.ownerDocument.body:n}for(Ct=fi(n.firstChild),fn=e,nt=!0,da=null,_i=!0,t=rx(e,null,i,t),e.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling}else{if(pl(),i===s){e=es(n,e,t);break e}Zt(n,e,i,t)}e=e.child}return e;case 26:return Rc(n,e),n===null?(t=Fg(e.type,null,e.pendingProps,null))?e.memoizedState=t:nt||(t=e.type,n=e.pendingProps,i=uu(Cs.current).createElement(t),i[sn]=e,i[Mn]=n,$t(i,t,n),Wt(i),e.stateNode=i):e.memoizedState=Fg(e.type,n.memoizedProps,e.pendingProps,n.memoizedState),null;case 27:return mh(e),n===null&&nt&&(i=e.stateNode=sy(e.type,e.pendingProps,Cs.current),fn=e,_i=!0,s=Ct,Xs(e.type)?(ed=s,Ct=fi(i.firstChild)):Ct=s),Zt(n,e,e.pendingProps.children,t),Rc(n,e),n===null&&(e.flags|=4194304),e.child;case 5:return n===null&&nt&&((s=i=Ct)&&(i=PE(i,e.type,e.pendingProps,_i),i!==null?(e.stateNode=i,fn=e,Ct=fi(i.firstChild),_i=!1,s=!0):s=!1),s||_a(e)),mh(e),s=e.type,a=e.pendingProps,r=n!==null?n.memoizedProps:null,i=a.children,Qh(s,a)?i=null:r!==null&&Qh(s,r)&&(e.flags|=32),e.memoizedState!==null&&(s=Mp(n,e,$M,null,null,t),Qo._currentValue=s),Rc(n,e),Zt(n,e,i,t),e.child;case 6:return n===null&&nt&&((n=t=Ct)&&(t=IE(t,e.pendingProps,_i),t!==null?(e.stateNode=t,fn=e,Ct=null,n=!0):n=!1),n||_a(e)),null;case 13:return gx(n,e,t);case 4:return Gc(e,e.stateNode.containerInfo),i=e.pendingProps,n===null?e.child=Ar(e,null,i,t):Zt(n,e,i,t),e.child;case 11:return gg(n,e,e.type,e.pendingProps,t);case 7:return Zt(n,e,e.pendingProps,t),e.child;case 8:return Zt(n,e,e.pendingProps.children,t),e.child;case 12:return Zt(n,e,e.pendingProps.children,t),e.child;case 10:return i=e.pendingProps,vs(e,e.type,i.value),Zt(n,e,i.children,t),e.child;case 9:return s=e.type._context,i=e.pendingProps.children,va(e),s=an(s),i=i(s),e.flags|=1,Zt(n,e,i,t),e.child;case 14:return _g(n,e,e.type,e.pendingProps,t);case 15:return px(n,e,e.type,e.pendingProps,t);case 19:return _x(n,e,t);case 31:return i=e.pendingProps,t=e.mode,i={mode:i.mode,children:i.children},n===null?(t=iu(i,t),t.ref=e.ref,e.child=t,t.return=e,e=t):(t=Ki(n.child,i),t.ref=e.ref,e.child=t,t.return=e,e=t),e;case 22:return mx(n,e,t);case 24:return va(e),i=an(zt),n===null?(s=vp(),s===null&&(s=_t,a=_p(),s.pooledCache=a,a.refCount++,a!==null&&(s.pooledCacheLanes|=t),s=a),e.memoizedState={parent:i,cache:s},xp(e),vs(e,zt,s)):(n.lanes&t&&(Lh(n,e),Lo(e,null,null,t),Do()),s=n.memoizedState,a=e.memoizedState,s.parent!==i?(s={parent:i,cache:i},e.memoizedState=s,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=s),vs(e,zt,i)):(i=a.cache,vs(e,zt,i),i!==s.cache&&wh(e,[zt],t,!0))),Zt(n,e,e.pendingProps.children,t),e.child;case 29:throw e.pendingProps}throw Error(Y(156,e.tag))}function Li(n){n.flags|=4}function Eg(n,e){if(e.type!=="stylesheet"||e.state.loading&4)n.flags&=-16777217;else if(n.flags|=16777216,!oy(e)){if(e=Jn.current,e!==null&&((je&4194048)===je?Mi!==null:(je&62914560)!==je&&!(je&536870912)||e!==Mi))throw wo=Dh,Ev;n.flags|=8192}}function Gl(n,e){e!==null&&(n.flags|=4),n.flags&16384&&(e=n.tag!==22?X0():536870912,n.lanes|=e,Rr|=e)}function so(n,e){if(!nt)switch(n.tailMode){case"hidden":e=n.tail;for(var t=null;e!==null;)e.alternate!==null&&(t=e),e=e.sibling;t===null?n.tail=null:t.sibling=null;break;case"collapsed":t=n.tail;for(var i=null;t!==null;)t.alternate!==null&&(i=t),t=t.sibling;i===null?e||n.tail===null?n.tail=null:n.tail.sibling=null:i.sibling=null}}function bt(n){var e=n.alternate!==null&&n.alternate.child===n.child,t=0,i=0;if(e)for(var s=n.child;s!==null;)t|=s.lanes|s.childLanes,i|=s.subtreeFlags&65011712,i|=s.flags&65011712,s.return=n,s=s.sibling;else for(s=n.child;s!==null;)t|=s.lanes|s.childLanes,i|=s.subtreeFlags,i|=s.flags,s.return=n,s=s.sibling;return n.subtreeFlags|=i,n.childLanes=t,e}function lE(n,e,t){var i=e.pendingProps;switch(gp(e),e.tag){case 31:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return bt(e),null;case 1:return bt(e),null;case 3:return t=e.stateNode,i=null,n!==null&&(i=n.memoizedState.cache),e.memoizedState.cache!==i&&(e.flags|=2048),Zi(zt),yr(),t.pendingContext&&(t.context=t.pendingContext,t.pendingContext=null),(n===null||n.child===null)&&(no(e)?Li(e):n===null||n.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,$m())),bt(e),null;case 26:return t=e.memoizedState,n===null?(Li(e),t!==null?(bt(e),Eg(e,t)):(bt(e),e.flags&=-16777217)):t?t!==n.memoizedState?(Li(e),bt(e),Eg(e,t)):(bt(e),e.flags&=-16777217):(n.memoizedProps!==i&&Li(e),bt(e),e.flags&=-16777217),null;case 27:Vc(e),t=Cs.current;var s=e.type;if(n!==null&&e.stateNode!=null)n.memoizedProps!==i&&Li(e);else{if(!i){if(e.stateNode===null)throw Error(Y(166));return bt(e),null}n=yi.current,no(e)?Qm(e):(n=sy(s,i,t),e.stateNode=n,Li(e))}return bt(e),null;case 5:if(Vc(e),t=e.type,n!==null&&e.stateNode!=null)n.memoizedProps!==i&&Li(e);else{if(!i){if(e.stateNode===null)throw Error(Y(166));return bt(e),null}if(n=yi.current,no(e))Qm(e);else{switch(s=uu(Cs.current),n){case 1:n=s.createElementNS("http://www.w3.org/2000/svg",t);break;case 2:n=s.createElementNS("http://www.w3.org/1998/Math/MathML",t);break;default:switch(t){case"svg":n=s.createElementNS("http://www.w3.org/2000/svg",t);break;case"math":n=s.createElementNS("http://www.w3.org/1998/Math/MathML",t);break;case"script":n=s.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild);break;case"select":n=typeof i.is=="string"?s.createElement("select",{is:i.is}):s.createElement("select"),i.multiple?n.multiple=!0:i.size&&(n.size=i.size);break;default:n=typeof i.is=="string"?s.createElement(t,{is:i.is}):s.createElement(t)}}n[sn]=e,n[Mn]=i;e:for(s=e.child;s!==null;){if(s.tag===5||s.tag===6)n.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===e)break e;for(;s.sibling===null;){if(s.return===null||s.return===e)break e;s=s.return}s.sibling.return=s.return,s=s.sibling}e.stateNode=n;e:switch($t(n,t,i),t){case"button":case"input":case"select":case"textarea":n=!!i.autoFocus;break e;case"img":n=!0;break e;default:n=!1}n&&Li(e)}}return bt(e),e.flags&=-16777217,null;case 6:if(n&&e.stateNode!=null)n.memoizedProps!==i&&Li(e);else{if(typeof i!="string"&&e.stateNode===null)throw Error(Y(166));if(n=Cs.current,no(e)){if(n=e.stateNode,t=e.memoizedProps,i=null,s=fn,s!==null)switch(s.tag){case 27:case 5:i=s.memoizedProps}n[sn]=e,n=!!(n.nodeValue===t||i!==null&&i.suppressHydrationWarning===!0||ty(n.nodeValue,t)),n||_a(e)}else n=uu(n).createTextNode(i),n[sn]=e,e.stateNode=n}return bt(e),null;case 13:if(i=e.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(s=no(e),i!==null&&i.dehydrated!==null){if(n===null){if(!s)throw Error(Y(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(Y(317));s[sn]=e}else pl(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;bt(e),s=!1}else s=$m(),n!==null&&n.memoizedState!==null&&(n.memoizedState.hydrationErrors=s),s=!0;if(!s)return e.flags&256?(qi(e),e):(qi(e),null)}if(qi(e),e.flags&128)return e.lanes=t,e;if(t=i!==null,n=n!==null&&n.memoizedState!==null,t){i=e.child,s=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(s=i.alternate.memoizedState.cachePool.pool);var a=null;i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(a=i.memoizedState.cachePool.pool),a!==s&&(i.flags|=2048)}return t!==n&&t&&(e.child.flags|=8192),Gl(e,e.updateQueue),bt(e),null;case 4:return yr(),n===null&&Gp(e.stateNode.containerInfo),bt(e),null;case 10:return Zi(e.type),bt(e),null;case 19:if(Yt(Ft),s=e.memoizedState,s===null)return bt(e),null;if(i=(e.flags&128)!==0,a=s.rendering,a===null)if(i)so(s,!1);else{if(Dt!==0||n!==null&&n.flags&128)for(n=e.child;n!==null;){if(a=eu(n),a!==null){for(e.flags|=128,so(s,!1),n=a.updateQueue,e.updateQueue=n,Gl(e,n),e.subtreeFlags=0,n=t,t=e.child;t!==null;)xv(t,n),t=t.sibling;return Et(Ft,Ft.current&1|2),e.child}n=n.sibling}s.tail!==null&&Si()>au&&(e.flags|=128,i=!0,so(s,!1),e.lanes=4194304)}else{if(!i)if(n=eu(a),n!==null){if(e.flags|=128,i=!0,n=n.updateQueue,e.updateQueue=n,Gl(e,n),so(s,!0),s.tail===null&&s.tailMode==="hidden"&&!a.alternate&&!nt)return bt(e),null}else 2*Si()-s.renderingStartTime>au&&t!==536870912&&(e.flags|=128,i=!0,so(s,!1),e.lanes=4194304);s.isBackwards?(a.sibling=e.child,e.child=a):(n=s.last,n!==null?n.sibling=a:e.child=a,s.last=a)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Si(),e.sibling=null,n=Ft.current,Et(Ft,i?n&1|2:n&1),e):(bt(e),null);case 22:case 23:return qi(e),yp(),i=e.memoizedState!==null,n!==null?n.memoizedState!==null!==i&&(e.flags|=8192):i&&(e.flags|=8192),i?t&536870912&&!(e.flags&128)&&(bt(e),e.subtreeFlags&6&&(e.flags|=8192)):bt(e),t=e.updateQueue,t!==null&&Gl(e,t.retryQueue),t=null,n!==null&&n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(t=n.memoizedState.cachePool.pool),i=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(i=e.memoizedState.cachePool.pool),i!==t&&(e.flags|=2048),n!==null&&Yt(pa),null;case 24:return t=null,n!==null&&(t=n.memoizedState.cache),e.memoizedState.cache!==t&&(e.flags|=2048),Zi(zt),bt(e),null;case 25:return null;case 30:return null}throw Error(Y(156,e.tag))}function cE(n,e){switch(gp(e),e.tag){case 1:return n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 3:return Zi(zt),yr(),n=e.flags,n&65536&&!(n&128)?(e.flags=n&-65537|128,e):null;case 26:case 27:case 5:return Vc(e),null;case 13:if(qi(e),n=e.memoizedState,n!==null&&n.dehydrated!==null){if(e.alternate===null)throw Error(Y(340));pl()}return n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 19:return Yt(Ft),null;case 4:return yr(),null;case 10:return Zi(e.type),null;case 22:case 23:return qi(e),yp(),n!==null&&Yt(pa),n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 24:return Zi(zt),null;case 25:return null;default:return null}}function xx(n,e){switch(gp(e),e.tag){case 3:Zi(zt),yr();break;case 26:case 27:case 5:Vc(e);break;case 4:yr();break;case 13:qi(e);break;case 19:Yt(Ft);break;case 10:Zi(e.type);break;case 22:case 23:qi(e),yp(),n!==null&&Yt(pa);break;case 24:Zi(zt)}}function yl(n,e){try{var t=e.updateQueue,i=t!==null?t.lastEffect:null;if(i!==null){var s=i.next;t=s;do{if((t.tag&n)===n){i=void 0;var a=t.create,r=t.inst;i=a(),r.destroy=i}t=t.next}while(t!==s)}}catch(o){mt(e,e.return,o)}}function Hs(n,e,t){try{var i=e.updateQueue,s=i!==null?i.lastEffect:null;if(s!==null){var a=s.next;i=a;do{if((i.tag&n)===n){var r=i.inst,o=r.destroy;if(o!==void 0){r.destroy=void 0,s=e;var l=t,c=o;try{c()}catch(u){mt(s,l,u)}}}i=i.next}while(i!==a)}}catch(u){mt(e,e.return,u)}}function yx(n){var e=n.updateQueue;if(e!==null){var t=n.stateNode;try{Av(e,t)}catch(i){mt(n,n.return,i)}}}function Sx(n,e,t){t.props=ya(n.type,n.memoizedProps),t.state=n.memoizedState;try{t.componentWillUnmount()}catch(i){mt(n,e,i)}}function No(n,e){try{var t=n.ref;if(t!==null){switch(n.tag){case 26:case 27:case 5:var i=n.stateNode;break;case 30:i=n.stateNode;break;default:i=n.stateNode}typeof t=="function"?n.refCleanup=t(i):t.current=i}}catch(s){mt(n,e,s)}}function vi(n,e){var t=n.ref,i=n.refCleanup;if(t!==null)if(typeof i=="function")try{i()}catch(s){mt(n,e,s)}finally{n.refCleanup=null,n=n.alternate,n!=null&&(n.refCleanup=null)}else if(typeof t=="function")try{t(null)}catch(s){mt(n,e,s)}else t.current=null}function Mx(n){var e=n.type,t=n.memoizedProps,i=n.stateNode;try{e:switch(e){case"button":case"input":case"select":case"textarea":t.autoFocus&&i.focus();break e;case"img":t.src?i.src=t.src:t.srcSet&&(i.srcset=t.srcSet)}}catch(s){mt(n,n.return,s)}}function mf(n,e,t){try{var i=n.stateNode;DE(i,n.type,t,e),i[Mn]=e}catch(s){mt(n,n.return,s)}}function Ex(n){return n.tag===5||n.tag===3||n.tag===26||n.tag===27&&Xs(n.type)||n.tag===4}function gf(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||Ex(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.tag===27&&Xs(n.type)||n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function Gh(n,e,t){var i=n.tag;if(i===5||i===6)n=n.stateNode,e?(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t).insertBefore(n,e):(e=t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,e.appendChild(n),t=t._reactRootContainer,t!=null||e.onclick!==null||(e.onclick=Bu));else if(i!==4&&(i===27&&Xs(n.type)&&(t=n.stateNode,e=null),n=n.child,n!==null))for(Gh(n,e,t),n=n.sibling;n!==null;)Gh(n,e,t),n=n.sibling}function su(n,e,t){var i=n.tag;if(i===5||i===6)n=n.stateNode,e?t.insertBefore(n,e):t.appendChild(n);else if(i!==4&&(i===27&&Xs(n.type)&&(t=n.stateNode),n=n.child,n!==null))for(su(n,e,t),n=n.sibling;n!==null;)su(n,e,t),n=n.sibling}function Tx(n){var e=n.stateNode,t=n.memoizedProps;try{for(var i=n.type,s=e.attributes;s.length;)e.removeAttributeNode(s[0]);$t(e,i,t),e[sn]=n,e[Mn]=t}catch(a){mt(n,n.return,a)}}var Gi=!1,Nt=!1,_f=!1,Tg=typeof WeakSet=="function"?WeakSet:Set,Xt=null;function uE(n,e){if(n=n.containerInfo,Kh=pu,n=fv(n),fp(n)){if("selectionStart"in n)var t={start:n.selectionStart,end:n.selectionEnd};else e:{t=(t=n.ownerDocument)&&t.defaultView||window;var i=t.getSelection&&t.getSelection();if(i&&i.rangeCount!==0){t=i.anchorNode;var s=i.anchorOffset,a=i.focusNode;i=i.focusOffset;try{t.nodeType,a.nodeType}catch{t=null;break e}var r=0,o=-1,l=-1,c=0,u=0,f=n,h=null;t:for(;;){for(var p;f!==t||s!==0&&f.nodeType!==3||(o=r+s),f!==a||i!==0&&f.nodeType!==3||(l=r+i),f.nodeType===3&&(r+=f.nodeValue.length),(p=f.firstChild)!==null;)h=f,f=p;for(;;){if(f===n)break t;if(h===t&&++c===s&&(o=r),h===a&&++u===i&&(l=r),(p=f.nextSibling)!==null)break;f=h,h=f.parentNode}f=p}t=o===-1||l===-1?null:{start:o,end:l}}else t=null}t=t||{start:0,end:0}}else t=null;for(Zh={focusedElem:n,selectionRange:t},pu=!1,Xt=e;Xt!==null;)if(e=Xt,n=e.child,(e.subtreeFlags&1024)!==0&&n!==null)n.return=e,Xt=n;else for(;Xt!==null;){switch(e=Xt,a=e.alternate,n=e.flags,e.tag){case 0:break;case 11:case 15:break;case 1:if(n&1024&&a!==null){n=void 0,t=e,s=a.memoizedProps,a=a.memoizedState,i=t.stateNode;try{var g=ya(t.type,s,t.elementType===t.type);n=i.getSnapshotBeforeUpdate(g,a),i.__reactInternalSnapshotBeforeUpdate=n}catch(v){mt(t,t.return,v)}}break;case 3:if(n&1024){if(n=e.stateNode.containerInfo,t=n.nodeType,t===9)Jh(n);else if(t===1)switch(n.nodeName){case"HEAD":case"HTML":case"BODY":Jh(n);break;default:n.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(n&1024)throw Error(Y(163))}if(n=e.sibling,n!==null){n.return=e.return,Xt=n;break}Xt=e.return}}function bx(n,e,t){var i=t.flags;switch(t.tag){case 0:case 11:case 15:os(n,t),i&4&&yl(5,t);break;case 1:if(os(n,t),i&4)if(n=t.stateNode,e===null)try{n.componentDidMount()}catch(r){mt(t,t.return,r)}else{var s=ya(t.type,e.memoizedProps);e=e.memoizedState;try{n.componentDidUpdate(s,e,n.__reactInternalSnapshotBeforeUpdate)}catch(r){mt(t,t.return,r)}}i&64&&yx(t),i&512&&No(t,t.return);break;case 3:if(os(n,t),i&64&&(n=t.updateQueue,n!==null)){if(e=null,t.child!==null)switch(t.child.tag){case 27:case 5:e=t.child.stateNode;break;case 1:e=t.child.stateNode}try{Av(n,e)}catch(r){mt(t,t.return,r)}}break;case 27:e===null&&i&4&&Tx(t);case 26:case 5:os(n,t),e===null&&i&4&&Mx(t),i&512&&No(t,t.return);break;case 12:os(n,t);break;case 13:os(n,t),i&4&&wx(n,t),i&64&&(n=t.memoizedState,n!==null&&(n=n.dehydrated,n!==null&&(t=xE.bind(null,t),BE(n,t))));break;case 22:if(i=t.memoizedState!==null||Gi,!i){e=e!==null&&e.memoizedState!==null||Nt,s=Gi;var a=Nt;Gi=i,(Nt=e)&&!a?ms(n,t,(t.subtreeFlags&8772)!==0):os(n,t),Gi=s,Nt=a}break;case 30:break;default:os(n,t)}}function Ax(n){var e=n.alternate;e!==null&&(n.alternate=null,Ax(e)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(e=n.stateNode,e!==null&&ap(e)),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}var St=null,xn=!1;function Ui(n,e,t){for(t=t.child;t!==null;)Rx(n,e,t),t=t.sibling}function Rx(n,e,t){if(Nn&&typeof Nn.onCommitFiberUnmount=="function")try{Nn.onCommitFiberUnmount(cl,t)}catch{}switch(t.tag){case 26:Nt||vi(t,e),Ui(n,e,t),t.memoizedState?t.memoizedState.count--:t.stateNode&&(t=t.stateNode,t.parentNode.removeChild(t));break;case 27:Nt||vi(t,e);var i=St,s=xn;Xs(t.type)&&(St=t.stateNode,xn=!1),Ui(n,e,t),Bo(t.stateNode),St=i,xn=s;break;case 5:Nt||vi(t,e);case 6:if(i=St,s=xn,St=null,Ui(n,e,t),St=i,xn=s,St!==null)if(xn)try{(St.nodeType===9?St.body:St.nodeName==="HTML"?St.ownerDocument.body:St).removeChild(t.stateNode)}catch(a){mt(t,e,a)}else try{St.removeChild(t.stateNode)}catch(a){mt(t,e,a)}break;case 18:St!==null&&(xn?(n=St,Ig(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,t.stateNode),el(n)):Ig(St,t.stateNode));break;case 4:i=St,s=xn,St=t.stateNode.containerInfo,xn=!0,Ui(n,e,t),St=i,xn=s;break;case 0:case 11:case 14:case 15:Nt||Hs(2,t,e),Nt||Hs(4,t,e),Ui(n,e,t);break;case 1:Nt||(vi(t,e),i=t.stateNode,typeof i.componentWillUnmount=="function"&&Sx(t,e,i)),Ui(n,e,t);break;case 21:Ui(n,e,t);break;case 22:Nt=(i=Nt)||t.memoizedState!==null,Ui(n,e,t),Nt=i;break;default:Ui(n,e,t)}}function wx(n,e){if(e.memoizedState===null&&(n=e.alternate,n!==null&&(n=n.memoizedState,n!==null&&(n=n.dehydrated,n!==null))))try{el(n)}catch(t){mt(e,e.return,t)}}function fE(n){switch(n.tag){case 13:case 19:var e=n.stateNode;return e===null&&(e=n.stateNode=new Tg),e;case 22:return n=n.stateNode,e=n._retryCache,e===null&&(e=n._retryCache=new Tg),e;default:throw Error(Y(435,n.tag))}}function vf(n,e){var t=fE(n);e.forEach(function(i){var s=yE.bind(null,n,i);t.has(i)||(t.add(i),i.then(s,s))})}function bn(n,e){var t=e.deletions;if(t!==null)for(var i=0;i<t.length;i++){var s=t[i],a=n,r=e,o=r;e:for(;o!==null;){switch(o.tag){case 27:if(Xs(o.type)){St=o.stateNode,xn=!1;break e}break;case 5:St=o.stateNode,xn=!1;break e;case 3:case 4:St=o.stateNode.containerInfo,xn=!0;break e}o=o.return}if(St===null)throw Error(Y(160));Rx(a,r,s),St=null,xn=!1,a=s.alternate,a!==null&&(a.return=null),s.return=null}if(e.subtreeFlags&13878)for(e=e.child;e!==null;)Cx(e,n),e=e.sibling}var ri=null;function Cx(n,e){var t=n.alternate,i=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:bn(e,n),An(n),i&4&&(Hs(3,n,n.return),yl(3,n),Hs(5,n,n.return));break;case 1:bn(e,n),An(n),i&512&&(Nt||t===null||vi(t,t.return)),i&64&&Gi&&(n=n.updateQueue,n!==null&&(i=n.callbacks,i!==null&&(t=n.shared.hiddenCallbacks,n.shared.hiddenCallbacks=t===null?i:t.concat(i))));break;case 26:var s=ri;if(bn(e,n),An(n),i&512&&(Nt||t===null||vi(t,t.return)),i&4){var a=t!==null?t.memoizedState:null;if(i=n.memoizedState,t===null)if(i===null)if(n.stateNode===null){e:{i=n.type,t=n.memoizedProps,s=s.ownerDocument||s;t:switch(i){case"title":a=s.getElementsByTagName("title")[0],(!a||a[hl]||a[sn]||a.namespaceURI==="http://www.w3.org/2000/svg"||a.hasAttribute("itemprop"))&&(a=s.createElement(i),s.head.insertBefore(a,s.querySelector("head > title"))),$t(a,i,t),a[sn]=n,Wt(a),i=a;break e;case"link":var r=Gg("link","href",s).get(i+(t.href||""));if(r){for(var o=0;o<r.length;o++)if(a=r[o],a.getAttribute("href")===(t.href==null||t.href===""?null:t.href)&&a.getAttribute("rel")===(t.rel==null?null:t.rel)&&a.getAttribute("title")===(t.title==null?null:t.title)&&a.getAttribute("crossorigin")===(t.crossOrigin==null?null:t.crossOrigin)){r.splice(o,1);break t}}a=s.createElement(i),$t(a,i,t),s.head.appendChild(a);break;case"meta":if(r=Gg("meta","content",s).get(i+(t.content||""))){for(o=0;o<r.length;o++)if(a=r[o],a.getAttribute("content")===(t.content==null?null:""+t.content)&&a.getAttribute("name")===(t.name==null?null:t.name)&&a.getAttribute("property")===(t.property==null?null:t.property)&&a.getAttribute("http-equiv")===(t.httpEquiv==null?null:t.httpEquiv)&&a.getAttribute("charset")===(t.charSet==null?null:t.charSet)){r.splice(o,1);break t}}a=s.createElement(i),$t(a,i,t),s.head.appendChild(a);break;default:throw Error(Y(468,i))}a[sn]=n,Wt(a),i=a}n.stateNode=i}else Vg(s,n.type,n.stateNode);else n.stateNode=Hg(s,i,n.memoizedProps);else a!==i?(a===null?t.stateNode!==null&&(t=t.stateNode,t.parentNode.removeChild(t)):a.count--,i===null?Vg(s,n.type,n.stateNode):Hg(s,i,n.memoizedProps)):i===null&&n.stateNode!==null&&mf(n,n.memoizedProps,t.memoizedProps)}break;case 27:bn(e,n),An(n),i&512&&(Nt||t===null||vi(t,t.return)),t!==null&&i&4&&mf(n,n.memoizedProps,t.memoizedProps);break;case 5:if(bn(e,n),An(n),i&512&&(Nt||t===null||vi(t,t.return)),n.flags&32){s=n.stateNode;try{Mr(s,"")}catch(p){mt(n,n.return,p)}}i&4&&n.stateNode!=null&&(s=n.memoizedProps,mf(n,s,t!==null?t.memoizedProps:s)),i&1024&&(_f=!0);break;case 6:if(bn(e,n),An(n),i&4){if(n.stateNode===null)throw Error(Y(162));i=n.memoizedProps,t=n.stateNode;try{t.nodeValue=i}catch(p){mt(n,n.return,p)}}break;case 3:if(Dc=null,s=ri,ri=fu(e.containerInfo),bn(e,n),ri=s,An(n),i&4&&t!==null&&t.memoizedState.isDehydrated)try{el(e.containerInfo)}catch(p){mt(n,n.return,p)}_f&&(_f=!1,Dx(n));break;case 4:i=ri,ri=fu(n.stateNode.containerInfo),bn(e,n),An(n),ri=i;break;case 12:bn(e,n),An(n);break;case 13:bn(e,n),An(n),n.child.flags&8192&&n.memoizedState!==null!=(t!==null&&t.memoizedState!==null)&&(zp=Si()),i&4&&(i=n.updateQueue,i!==null&&(n.updateQueue=null,vf(n,i)));break;case 22:s=n.memoizedState!==null;var l=t!==null&&t.memoizedState!==null,c=Gi,u=Nt;if(Gi=c||s,Nt=u||l,bn(e,n),Nt=u,Gi=c,An(n),i&8192)e:for(e=n.stateNode,e._visibility=s?e._visibility&-2:e._visibility|1,s&&(t===null||l||Gi||Nt||sa(n)),t=null,e=n;;){if(e.tag===5||e.tag===26){if(t===null){l=t=e;try{if(a=l.stateNode,s)r=a.style,typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none";else{o=l.stateNode;var f=l.memoizedProps.style,h=f!=null&&f.hasOwnProperty("display")?f.display:null;o.style.display=h==null||typeof h=="boolean"?"":(""+h).trim()}}catch(p){mt(l,l.return,p)}}}else if(e.tag===6){if(t===null){l=e;try{l.stateNode.nodeValue=s?"":l.memoizedProps}catch(p){mt(l,l.return,p)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===n)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;t===e&&(t=null),e=e.return}t===e&&(t=null),e.sibling.return=e.return,e=e.sibling}i&4&&(i=n.updateQueue,i!==null&&(t=i.retryQueue,t!==null&&(i.retryQueue=null,vf(n,t))));break;case 19:bn(e,n),An(n),i&4&&(i=n.updateQueue,i!==null&&(n.updateQueue=null,vf(n,i)));break;case 30:break;case 21:break;default:bn(e,n),An(n)}}function An(n){var e=n.flags;if(e&2){try{for(var t,i=n.return;i!==null;){if(Ex(i)){t=i;break}i=i.return}if(t==null)throw Error(Y(160));switch(t.tag){case 27:var s=t.stateNode,a=gf(n);su(n,a,s);break;case 5:var r=t.stateNode;t.flags&32&&(Mr(r,""),t.flags&=-33);var o=gf(n);su(n,o,r);break;case 3:case 4:var l=t.stateNode.containerInfo,c=gf(n);Gh(n,c,l);break;default:throw Error(Y(161))}}catch(u){mt(n,n.return,u)}n.flags&=-3}e&4096&&(n.flags&=-4097)}function Dx(n){if(n.subtreeFlags&1024)for(n=n.child;n!==null;){var e=n;Dx(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),n=n.sibling}}function os(n,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)bx(n,e.alternate,e),e=e.sibling}function sa(n){for(n=n.child;n!==null;){var e=n;switch(e.tag){case 0:case 11:case 14:case 15:Hs(4,e,e.return),sa(e);break;case 1:vi(e,e.return);var t=e.stateNode;typeof t.componentWillUnmount=="function"&&Sx(e,e.return,t),sa(e);break;case 27:Bo(e.stateNode);case 26:case 5:vi(e,e.return),sa(e);break;case 22:e.memoizedState===null&&sa(e);break;case 30:sa(e);break;default:sa(e)}n=n.sibling}}function ms(n,e,t){for(t=t&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var i=e.alternate,s=n,a=e,r=a.flags;switch(a.tag){case 0:case 11:case 15:ms(s,a,t),yl(4,a);break;case 1:if(ms(s,a,t),i=a,s=i.stateNode,typeof s.componentDidMount=="function")try{s.componentDidMount()}catch(c){mt(i,i.return,c)}if(i=a,s=i.updateQueue,s!==null){var o=i.stateNode;try{var l=s.shared.hiddenCallbacks;if(l!==null)for(s.shared.hiddenCallbacks=null,s=0;s<l.length;s++)bv(l[s],o)}catch(c){mt(i,i.return,c)}}t&&r&64&&yx(a),No(a,a.return);break;case 27:Tx(a);case 26:case 5:ms(s,a,t),t&&i===null&&r&4&&Mx(a),No(a,a.return);break;case 12:ms(s,a,t);break;case 13:ms(s,a,t),t&&r&4&&wx(s,a);break;case 22:a.memoizedState===null&&ms(s,a,t),No(a,a.return);break;case 30:break;default:ms(s,a,t)}e=e.sibling}}function Op(n,e){var t=null;n!==null&&n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(t=n.memoizedState.cachePool.pool),n=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),n!==t&&(n!=null&&n.refCount++,t!=null&&gl(t))}function Pp(n,e){n=null,e.alternate!==null&&(n=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==n&&(e.refCount++,n!=null&&gl(n))}function mi(n,e,t,i){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Lx(n,e,t,i),e=e.sibling}function Lx(n,e,t,i){var s=e.flags;switch(e.tag){case 0:case 11:case 15:mi(n,e,t,i),s&2048&&yl(9,e);break;case 1:mi(n,e,t,i);break;case 3:mi(n,e,t,i),s&2048&&(n=null,e.alternate!==null&&(n=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==n&&(e.refCount++,n!=null&&gl(n)));break;case 12:if(s&2048){mi(n,e,t,i),n=e.stateNode;try{var a=e.memoizedProps,r=a.id,o=a.onPostCommit;typeof o=="function"&&o(r,e.alternate===null?"mount":"update",n.passiveEffectDuration,-0)}catch(l){mt(e,e.return,l)}}else mi(n,e,t,i);break;case 13:mi(n,e,t,i);break;case 23:break;case 22:a=e.stateNode,r=e.alternate,e.memoizedState!==null?a._visibility&2?mi(n,e,t,i):Oo(n,e):a._visibility&2?mi(n,e,t,i):(a._visibility|=2,Ya(n,e,t,i,(e.subtreeFlags&10256)!==0)),s&2048&&Op(r,e);break;case 24:mi(n,e,t,i),s&2048&&Pp(e.alternate,e);break;default:mi(n,e,t,i)}}function Ya(n,e,t,i,s){for(s=s&&(e.subtreeFlags&10256)!==0,e=e.child;e!==null;){var a=n,r=e,o=t,l=i,c=r.flags;switch(r.tag){case 0:case 11:case 15:Ya(a,r,o,l,s),yl(8,r);break;case 23:break;case 22:var u=r.stateNode;r.memoizedState!==null?u._visibility&2?Ya(a,r,o,l,s):Oo(a,r):(u._visibility|=2,Ya(a,r,o,l,s)),s&&c&2048&&Op(r.alternate,r);break;case 24:Ya(a,r,o,l,s),s&&c&2048&&Pp(r.alternate,r);break;default:Ya(a,r,o,l,s)}e=e.sibling}}function Oo(n,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var t=n,i=e,s=i.flags;switch(i.tag){case 22:Oo(t,i),s&2048&&Op(i.alternate,i);break;case 24:Oo(t,i),s&2048&&Pp(i.alternate,i);break;default:Oo(t,i)}e=e.sibling}}var yo=8192;function wa(n){if(n.subtreeFlags&yo)for(n=n.child;n!==null;)Ux(n),n=n.sibling}function Ux(n){switch(n.tag){case 26:wa(n),n.flags&yo&&n.memoizedState!==null&&ZE(ri,n.memoizedState,n.memoizedProps);break;case 5:wa(n);break;case 3:case 4:var e=ri;ri=fu(n.stateNode.containerInfo),wa(n),ri=e;break;case 22:n.memoizedState===null&&(e=n.alternate,e!==null&&e.memoizedState!==null?(e=yo,yo=16777216,wa(n),yo=e):wa(n));break;default:wa(n)}}function Nx(n){var e=n.alternate;if(e!==null&&(n=e.child,n!==null)){e.child=null;do e=n.sibling,n.sibling=null,n=e;while(n!==null)}}function ao(n){var e=n.deletions;if(n.flags&16){if(e!==null)for(var t=0;t<e.length;t++){var i=e[t];Xt=i,Px(i,n)}Nx(n)}if(n.subtreeFlags&10256)for(n=n.child;n!==null;)Ox(n),n=n.sibling}function Ox(n){switch(n.tag){case 0:case 11:case 15:ao(n),n.flags&2048&&Hs(9,n,n.return);break;case 3:ao(n);break;case 12:ao(n);break;case 22:var e=n.stateNode;n.memoizedState!==null&&e._visibility&2&&(n.return===null||n.return.tag!==13)?(e._visibility&=-3,wc(n)):ao(n);break;default:ao(n)}}function wc(n){var e=n.deletions;if(n.flags&16){if(e!==null)for(var t=0;t<e.length;t++){var i=e[t];Xt=i,Px(i,n)}Nx(n)}for(n=n.child;n!==null;){switch(e=n,e.tag){case 0:case 11:case 15:Hs(8,e,e.return),wc(e);break;case 22:t=e.stateNode,t._visibility&2&&(t._visibility&=-3,wc(e));break;default:wc(e)}n=n.sibling}}function Px(n,e){for(;Xt!==null;){var t=Xt;switch(t.tag){case 0:case 11:case 15:Hs(8,t,e);break;case 23:case 22:if(t.memoizedState!==null&&t.memoizedState.cachePool!==null){var i=t.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:gl(t.memoizedState.cache)}if(i=t.child,i!==null)i.return=t,Xt=i;else e:for(t=n;Xt!==null;){i=Xt;var s=i.sibling,a=i.return;if(Ax(i),i===t){Xt=null;break e}if(s!==null){s.return=a,Xt=s;break e}Xt=a}}}var hE={getCacheForType:function(n){var e=an(zt),t=e.data.get(n);return t===void 0&&(t=n(),e.data.set(n,t)),t}},dE=typeof WeakMap=="function"?WeakMap:Map,ft=0,_t=null,Ge=null,je=0,lt=0,Dn=null,bs=!1,Xr=!1,Ip=!1,ts=0,Dt=0,Gs=0,ma=0,Bp=0,Zn=0,Rr=0,Po=null,yn=null,Vh=!1,zp=0,au=1/0,ru=null,Us=null,Jt=0,Ns=null,wr=null,gr=0,kh=0,Xh=null,Ix=null,Io=0,Wh=null;function Pn(){if(ft&2&&je!==0)return je&-je;if(be.T!==null){var n=Er;return n!==0?n:Hp()}return Y0()}function Bx(){Zn===0&&(Zn=!(je&536870912)||nt?k0():536870912);var n=Jn.current;return n!==null&&(n.flags|=32),Zn}function In(n,e,t){(n===_t&&(lt===2||lt===9)||n.cancelPendingCommit!==null)&&(Cr(n,0),As(n,je,Zn,!1)),fl(n,t),(!(ft&2)||n!==_t)&&(n===_t&&(!(ft&2)&&(ma|=t),Dt===4&&As(n,je,Zn,!1)),Ai(n))}function zx(n,e,t){if(ft&6)throw Error(Y(327));var i=!t&&(e&124)===0&&(e&n.expiredLanes)===0||ul(n,e),s=i?gE(n,e):xf(n,e,!0),a=i;do{if(s===0){Xr&&!i&&As(n,e,0,!1);break}else{if(t=n.current.alternate,a&&!pE(t)){s=xf(n,e,!1),a=!1;continue}if(s===2){if(a=e,n.errorRecoveryDisabledLanes&a)var r=0;else r=n.pendingLanes&-536870913,r=r!==0?r:r&536870912?536870912:0;if(r!==0){e=r;e:{var o=n;s=Po;var l=o.current.memoizedState.isDehydrated;if(l&&(Cr(o,r).flags|=256),r=xf(o,r,!1),r!==2){if(Ip&&!l){o.errorRecoveryDisabledLanes|=a,ma|=a,s=4;break e}a=yn,yn=s,a!==null&&(yn===null?yn=a:yn.push.apply(yn,a))}s=r}if(a=!1,s!==2)continue}}if(s===1){Cr(n,0),As(n,e,0,!0);break}e:{switch(i=n,a=s,a){case 0:case 1:throw Error(Y(345));case 4:if((e&4194048)!==e)break;case 6:As(i,e,Zn,!bs);break e;case 2:yn=null;break;case 3:case 5:break;default:throw Error(Y(329))}if((e&62914560)===e&&(s=zp+300-Si(),10<s)){if(As(i,e,Zn,!bs),Tu(i,0,!0)!==0)break e;i.timeoutHandle=iy(bg.bind(null,i,t,yn,ru,Vh,e,Zn,ma,Rr,bs,a,2,-0,0),s);break e}bg(i,t,yn,ru,Vh,e,Zn,ma,Rr,bs,a,0,-0,0)}}break}while(!0);Ai(n)}function bg(n,e,t,i,s,a,r,o,l,c,u,f,h,p){if(n.timeoutHandle=-1,f=e.subtreeFlags,(f&8192||(f&16785408)===16785408)&&(Zo={stylesheets:null,count:0,unsuspend:KE},Ux(e),f=QE(),f!==null)){n.cancelPendingCommit=f(Rg.bind(null,n,e,a,t,i,s,r,o,l,u,1,h,p)),As(n,a,r,!c);return}Rg(n,e,a,t,i,s,r,o,l)}function pE(n){for(var e=n;;){var t=e.tag;if((t===0||t===11||t===15)&&e.flags&16384&&(t=e.updateQueue,t!==null&&(t=t.stores,t!==null)))for(var i=0;i<t.length;i++){var s=t[i],a=s.getSnapshot;s=s.value;try{if(!zn(a(),s))return!1}catch{return!1}}if(t=e.child,e.subtreeFlags&16384&&t!==null)t.return=e,e=t;else{if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function As(n,e,t,i){e&=~Bp,e&=~ma,n.suspendedLanes|=e,n.pingedLanes&=~e,i&&(n.warmLanes|=e),i=n.expirationTimes;for(var s=e;0<s;){var a=31-On(s),r=1<<a;i[a]=-1,s&=~r}t!==0&&W0(n,t,e)}function Ou(){return ft&6?!0:(Sl(0),!1)}function Fp(){if(Ge!==null){if(lt===0)var n=Ge.return;else n=Ge,Wi=Aa=null,bp(n),mr=null,Yo=0,n=Ge;for(;n!==null;)xx(n.alternate,n),n=n.return;Ge=null}}function Cr(n,e){var t=n.timeoutHandle;t!==-1&&(n.timeoutHandle=-1,UE(t)),t=n.cancelPendingCommit,t!==null&&(n.cancelPendingCommit=null,t()),Fp(),_t=n,Ge=t=Ki(n.current,null),je=e,lt=0,Dn=null,bs=!1,Xr=ul(n,e),Ip=!1,Rr=Zn=Bp=ma=Gs=Dt=0,yn=Po=null,Vh=!1,e&8&&(e|=e&32);var i=n.entangledLanes;if(i!==0)for(n=n.entanglements,i&=e;0<i;){var s=31-On(i),a=1<<s;e|=n[s],i&=~a}return ts=e,wu(),t}function Fx(n,e){Fe=null,be.H=$c,e===_l||e===Du?(e=ig(),lt=3):e===Ev?(e=ig(),lt=4):lt=e===dx?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,Dn=e,Ge===null&&(Dt=1,nu(n,Kn(e,n.current)))}function Hx(){var n=be.H;return be.H=$c,n===null?$c:n}function Gx(){var n=be.A;return be.A=hE,n}function qh(){Dt=4,bs||(je&4194048)!==je&&Jn.current!==null||(Xr=!0),!(Gs&134217727)&&!(ma&134217727)||_t===null||As(_t,je,Zn,!1)}function xf(n,e,t){var i=ft;ft|=2;var s=Hx(),a=Gx();(_t!==n||je!==e)&&(ru=null,Cr(n,e)),e=!1;var r=Dt;e:do try{if(lt!==0&&Ge!==null){var o=Ge,l=Dn;switch(lt){case 8:Fp(),r=6;break e;case 3:case 2:case 9:case 6:Jn.current===null&&(e=!0);var c=lt;if(lt=0,Dn=null,or(n,o,l,c),t&&Xr){r=0;break e}break;default:c=lt,lt=0,Dn=null,or(n,o,l,c)}}mE(),r=Dt;break}catch(u){Fx(n,u)}while(!0);return e&&n.shellSuspendCounter++,Wi=Aa=null,ft=i,be.H=s,be.A=a,Ge===null&&(_t=null,je=0,wu()),r}function mE(){for(;Ge!==null;)Vx(Ge)}function gE(n,e){var t=ft;ft|=2;var i=Hx(),s=Gx();_t!==n||je!==e?(ru=null,au=Si()+500,Cr(n,e)):Xr=ul(n,e);e:do try{if(lt!==0&&Ge!==null){e=Ge;var a=Dn;t:switch(lt){case 1:lt=0,Dn=null,or(n,e,a,1);break;case 2:case 9:if(ng(a)){lt=0,Dn=null,Ag(e);break}e=function(){lt!==2&&lt!==9||_t!==n||(lt=7),Ai(n)},a.then(e,e);break e;case 3:lt=7;break e;case 4:lt=5;break e;case 7:ng(a)?(lt=0,Dn=null,Ag(e)):(lt=0,Dn=null,or(n,e,a,7));break;case 5:var r=null;switch(Ge.tag){case 26:r=Ge.memoizedState;case 5:case 27:var o=Ge;if(!r||oy(r)){lt=0,Dn=null;var l=o.sibling;if(l!==null)Ge=l;else{var c=o.return;c!==null?(Ge=c,Pu(c)):Ge=null}break t}}lt=0,Dn=null,or(n,e,a,5);break;case 6:lt=0,Dn=null,or(n,e,a,6);break;case 8:Fp(),Dt=6;break e;default:throw Error(Y(462))}}_E();break}catch(u){Fx(n,u)}while(!0);return Wi=Aa=null,be.H=i,be.A=s,ft=t,Ge!==null?0:(_t=null,je=0,wu(),Dt)}function _E(){for(;Ge!==null&&!FS();)Vx(Ge)}function Vx(n){var e=vx(n.alternate,n,ts);n.memoizedProps=n.pendingProps,e===null?Pu(n):Ge=e}function Ag(n){var e=n,t=e.alternate;switch(e.tag){case 15:case 0:e=xg(t,e,e.pendingProps,e.type,void 0,je);break;case 11:e=xg(t,e,e.pendingProps,e.type.render,e.ref,je);break;case 5:bp(e);default:xx(t,e),e=Ge=xv(e,ts),e=vx(t,e,ts)}n.memoizedProps=n.pendingProps,e===null?Pu(n):Ge=e}function or(n,e,t,i){Wi=Aa=null,bp(e),mr=null,Yo=0;var s=e.return;try{if(rE(n,s,e,t,je)){Dt=1,nu(n,Kn(t,n.current)),Ge=null;return}}catch(a){if(s!==null)throw Ge=s,a;Dt=1,nu(n,Kn(t,n.current)),Ge=null;return}e.flags&32768?(nt||i===1?n=!0:Xr||je&536870912?n=!1:(bs=n=!0,(i===2||i===9||i===3||i===6)&&(i=Jn.current,i!==null&&i.tag===13&&(i.flags|=16384))),kx(e,n)):Pu(e)}function Pu(n){var e=n;do{if(e.flags&32768){kx(e,bs);return}n=e.return;var t=lE(e.alternate,e,ts);if(t!==null){Ge=t;return}if(e=e.sibling,e!==null){Ge=e;return}Ge=e=n}while(e!==null);Dt===0&&(Dt=5)}function kx(n,e){do{var t=cE(n.alternate,n);if(t!==null){t.flags&=32767,Ge=t;return}if(t=n.return,t!==null&&(t.flags|=32768,t.subtreeFlags=0,t.deletions=null),!e&&(n=n.sibling,n!==null)){Ge=n;return}Ge=n=t}while(n!==null);Dt=6,Ge=null}function Rg(n,e,t,i,s,a,r,o,l){n.cancelPendingCommit=null;do Iu();while(Jt!==0);if(ft&6)throw Error(Y(327));if(e!==null){if(e===n.current)throw Error(Y(177));if(a=e.lanes|e.childLanes,a|=hp,KS(n,t,a,r,o,l),n===_t&&(Ge=_t=null,je=0),wr=e,Ns=n,gr=t,kh=a,Xh=s,Ix=i,e.subtreeFlags&10256||e.flags&10256?(n.callbackNode=null,n.callbackPriority=0,SE(kc,function(){return jx(),null})):(n.callbackNode=null,n.callbackPriority=0),i=(e.flags&13878)!==0,e.subtreeFlags&13878||i){i=be.T,be.T=null,s=st.p,st.p=2,r=ft,ft|=4;try{uE(n,e,t)}finally{ft=r,st.p=s,be.T=i}}Jt=1,Xx(),Wx(),qx()}}function Xx(){if(Jt===1){Jt=0;var n=Ns,e=wr,t=(e.flags&13878)!==0;if(e.subtreeFlags&13878||t){t=be.T,be.T=null;var i=st.p;st.p=2;var s=ft;ft|=4;try{Cx(e,n);var a=Zh,r=fv(n.containerInfo),o=a.focusedElem,l=a.selectionRange;if(r!==o&&o&&o.ownerDocument&&uv(o.ownerDocument.documentElement,o)){if(l!==null&&fp(o)){var c=l.start,u=l.end;if(u===void 0&&(u=c),"selectionStart"in o)o.selectionStart=c,o.selectionEnd=Math.min(u,o.value.length);else{var f=o.ownerDocument||document,h=f&&f.defaultView||window;if(h.getSelection){var p=h.getSelection(),g=o.textContent.length,v=Math.min(l.start,g),m=l.end===void 0?v:Math.min(l.end,g);!p.extend&&v>m&&(r=m,m=v,v=r);var d=jm(o,v),_=jm(o,m);if(d&&_&&(p.rangeCount!==1||p.anchorNode!==d.node||p.anchorOffset!==d.offset||p.focusNode!==_.node||p.focusOffset!==_.offset)){var x=f.createRange();x.setStart(d.node,d.offset),p.removeAllRanges(),v>m?(p.addRange(x),p.extend(_.node,_.offset)):(x.setEnd(_.node,_.offset),p.addRange(x))}}}}for(f=[],p=o;p=p.parentNode;)p.nodeType===1&&f.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<f.length;o++){var y=f[o];y.element.scrollLeft=y.left,y.element.scrollTop=y.top}}pu=!!Kh,Zh=Kh=null}finally{ft=s,st.p=i,be.T=t}}n.current=e,Jt=2}}function Wx(){if(Jt===2){Jt=0;var n=Ns,e=wr,t=(e.flags&8772)!==0;if(e.subtreeFlags&8772||t){t=be.T,be.T=null;var i=st.p;st.p=2;var s=ft;ft|=4;try{bx(n,e.alternate,e)}finally{ft=s,st.p=i,be.T=t}}Jt=3}}function qx(){if(Jt===4||Jt===3){Jt=0,HS();var n=Ns,e=wr,t=gr,i=Ix;e.subtreeFlags&10256||e.flags&10256?Jt=5:(Jt=0,wr=Ns=null,Yx(n,n.pendingLanes));var s=n.pendingLanes;if(s===0&&(Us=null),sp(t),e=e.stateNode,Nn&&typeof Nn.onCommitFiberRoot=="function")try{Nn.onCommitFiberRoot(cl,e,void 0,(e.current.flags&128)===128)}catch{}if(i!==null){e=be.T,s=st.p,st.p=2,be.T=null;try{for(var a=n.onRecoverableError,r=0;r<i.length;r++){var o=i[r];a(o.value,{componentStack:o.stack})}}finally{be.T=e,st.p=s}}gr&3&&Iu(),Ai(n),s=n.pendingLanes,t&4194090&&s&42?n===Wh?Io++:(Io=0,Wh=n):Io=0,Sl(0)}}function Yx(n,e){(n.pooledCacheLanes&=e)===0&&(e=n.pooledCache,e!=null&&(n.pooledCache=null,gl(e)))}function Iu(n){return Xx(),Wx(),qx(),jx()}function jx(){if(Jt!==5)return!1;var n=Ns,e=kh;kh=0;var t=sp(gr),i=be.T,s=st.p;try{st.p=32>t?32:t,be.T=null,t=Xh,Xh=null;var a=Ns,r=gr;if(Jt=0,wr=Ns=null,gr=0,ft&6)throw Error(Y(331));var o=ft;if(ft|=4,Ox(a.current),Lx(a,a.current,r,t),ft=o,Sl(0,!1),Nn&&typeof Nn.onPostCommitFiberRoot=="function")try{Nn.onPostCommitFiberRoot(cl,a)}catch{}return!0}finally{st.p=s,be.T=i,Yx(n,e)}}function wg(n,e,t){e=Kn(t,e),e=zh(n.stateNode,e,2),n=Ls(n,e,2),n!==null&&(fl(n,2),Ai(n))}function mt(n,e,t){if(n.tag===3)wg(n,n,t);else for(;e!==null;){if(e.tag===3){wg(e,n,t);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Us===null||!Us.has(i))){n=Kn(t,n),t=fx(2),i=Ls(e,t,2),i!==null&&(hx(t,i,e,n),fl(i,2),Ai(i));break}}e=e.return}}function yf(n,e,t){var i=n.pingCache;if(i===null){i=n.pingCache=new dE;var s=new Set;i.set(e,s)}else s=i.get(e),s===void 0&&(s=new Set,i.set(e,s));s.has(t)||(Ip=!0,s.add(t),n=vE.bind(null,n,e,t),e.then(n,n))}function vE(n,e,t){var i=n.pingCache;i!==null&&i.delete(e),n.pingedLanes|=n.suspendedLanes&t,n.warmLanes&=~t,_t===n&&(je&t)===t&&(Dt===4||Dt===3&&(je&62914560)===je&&300>Si()-zp?!(ft&2)&&Cr(n,0):Bp|=t,Rr===je&&(Rr=0)),Ai(n)}function Kx(n,e){e===0&&(e=X0()),n=kr(n,e),n!==null&&(fl(n,e),Ai(n))}function xE(n){var e=n.memoizedState,t=0;e!==null&&(t=e.retryLane),Kx(n,t)}function yE(n,e){var t=0;switch(n.tag){case 13:var i=n.stateNode,s=n.memoizedState;s!==null&&(t=s.retryLane);break;case 19:i=n.stateNode;break;case 22:i=n.stateNode._retryCache;break;default:throw Error(Y(314))}i!==null&&i.delete(e),Kx(n,t)}function SE(n,e){return np(n,e)}var ou=null,ja=null,Yh=!1,lu=!1,Sf=!1,ga=0;function Ai(n){n!==ja&&n.next===null&&(ja===null?ou=ja=n:ja=ja.next=n),lu=!0,Yh||(Yh=!0,EE())}function Sl(n,e){if(!Sf&&lu){Sf=!0;do for(var t=!1,i=ou;i!==null;){if(n!==0){var s=i.pendingLanes;if(s===0)var a=0;else{var r=i.suspendedLanes,o=i.pingedLanes;a=(1<<31-On(42|n)+1)-1,a&=s&~(r&~o),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(t=!0,Cg(i,a))}else a=je,a=Tu(i,i===_t?a:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),!(a&3)||ul(i,a)||(t=!0,Cg(i,a));i=i.next}while(t);Sf=!1}}function ME(){Zx()}function Zx(){lu=Yh=!1;var n=0;ga!==0&&(LE()&&(n=ga),ga=0);for(var e=Si(),t=null,i=ou;i!==null;){var s=i.next,a=Qx(i,e);a===0?(i.next=null,t===null?ou=s:t.next=s,s===null&&(ja=t)):(t=i,(n!==0||a&3)&&(lu=!0)),i=s}Sl(n)}function Qx(n,e){for(var t=n.suspendedLanes,i=n.pingedLanes,s=n.expirationTimes,a=n.pendingLanes&-62914561;0<a;){var r=31-On(a),o=1<<r,l=s[r];l===-1?(!(o&t)||o&i)&&(s[r]=jS(o,e)):l<=e&&(n.expiredLanes|=o),a&=~o}if(e=_t,t=je,t=Tu(n,n===e?t:0,n.cancelPendingCommit!==null||n.timeoutHandle!==-1),i=n.callbackNode,t===0||n===e&&(lt===2||lt===9)||n.cancelPendingCommit!==null)return i!==null&&i!==null&&qu(i),n.callbackNode=null,n.callbackPriority=0;if(!(t&3)||ul(n,t)){if(e=t&-t,e===n.callbackPriority)return e;switch(i!==null&&qu(i),sp(t)){case 2:case 8:t=G0;break;case 32:t=kc;break;case 268435456:t=V0;break;default:t=kc}return i=Jx.bind(null,n),t=np(t,i),n.callbackPriority=e,n.callbackNode=t,e}return i!==null&&i!==null&&qu(i),n.callbackPriority=2,n.callbackNode=null,2}function Jx(n,e){if(Jt!==0&&Jt!==5)return n.callbackNode=null,n.callbackPriority=0,null;var t=n.callbackNode;if(Iu()&&n.callbackNode!==t)return null;var i=je;return i=Tu(n,n===_t?i:0,n.cancelPendingCommit!==null||n.timeoutHandle!==-1),i===0?null:(zx(n,i,e),Qx(n,Si()),n.callbackNode!=null&&n.callbackNode===t?Jx.bind(null,n):null)}function Cg(n,e){if(Iu())return null;zx(n,e,!0)}function EE(){NE(function(){ft&6?np(H0,ME):Zx()})}function Hp(){return ga===0&&(ga=k0()),ga}function Dg(n){return n==null||typeof n=="symbol"||typeof n=="boolean"?null:typeof n=="function"?n:yc(""+n)}function Lg(n,e){var t=e.ownerDocument.createElement("input");return t.name=e.name,t.value=e.value,n.id&&t.setAttribute("form",n.id),e.parentNode.insertBefore(t,e),n=new FormData(n),t.parentNode.removeChild(t),n}function TE(n,e,t,i,s){if(e==="submit"&&t&&t.stateNode===s){var a=Dg((s[Mn]||null).action),r=i.submitter;r&&(e=(e=r[Mn]||null)?Dg(e.formAction):r.getAttribute("formAction"),e!==null&&(a=e,r=null));var o=new bu("action","action",null,i,s);n.push({event:o,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(ga!==0){var l=r?Lg(s,r):new FormData(s);Ih(t,{pending:!0,data:l,method:s.method,action:a},null,l)}}else typeof a=="function"&&(o.preventDefault(),l=r?Lg(s,r):new FormData(s),Ih(t,{pending:!0,data:l,method:s.method,action:a},a,l))},currentTarget:s}]})}}for(var Mf=0;Mf<Th.length;Mf++){var Ef=Th[Mf],bE=Ef.toLowerCase(),AE=Ef[0].toUpperCase()+Ef.slice(1);di(bE,"on"+AE)}di(dv,"onAnimationEnd");di(pv,"onAnimationIteration");di(mv,"onAnimationStart");di("dblclick","onDoubleClick");di("focusin","onFocus");di("focusout","onBlur");di(kM,"onTransitionRun");di(XM,"onTransitionStart");di(WM,"onTransitionCancel");di(gv,"onTransitionEnd");Sr("onMouseEnter",["mouseout","mouseover"]);Sr("onMouseLeave",["mouseout","mouseover"]);Sr("onPointerEnter",["pointerout","pointerover"]);Sr("onPointerLeave",["pointerout","pointerover"]);Ea("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Ea("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Ea("onBeforeInput",["compositionend","keypress","textInput","paste"]);Ea("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Ea("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Ea("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var jo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),RE=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(jo));function $x(n,e){e=(e&4)!==0;for(var t=0;t<n.length;t++){var i=n[t],s=i.event;i=i.listeners;e:{var a=void 0;if(e)for(var r=i.length-1;0<=r;r--){var o=i[r],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==a&&s.isPropagationStopped())break e;a=o,s.currentTarget=c;try{a(s)}catch(u){tu(u)}s.currentTarget=null,a=l}else for(r=0;r<i.length;r++){if(o=i[r],l=o.instance,c=o.currentTarget,o=o.listener,l!==a&&s.isPropagationStopped())break e;a=o,s.currentTarget=c;try{a(s)}catch(u){tu(u)}s.currentTarget=null,a=l}}}}function He(n,e){var t=e[_h];t===void 0&&(t=e[_h]=new Set);var i=n+"__bubble";t.has(i)||(ey(e,n,2,!1),t.add(i))}function Tf(n,e,t){var i=0;e&&(i|=4),ey(t,n,i,e)}var Vl="_reactListening"+Math.random().toString(36).slice(2);function Gp(n){if(!n[Vl]){n[Vl]=!0,j0.forEach(function(t){t!=="selectionchange"&&(RE.has(t)||Tf(t,!1,n),Tf(t,!0,n))});var e=n.nodeType===9?n:n.ownerDocument;e===null||e[Vl]||(e[Vl]=!0,Tf("selectionchange",!1,e))}}function ey(n,e,t,i){switch(hy(e)){case 2:var s=eT;break;case 8:s=tT;break;default:s=Wp}t=s.bind(null,e,t,n),s=void 0,!Sh||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(s=!0),i?s!==void 0?n.addEventListener(e,t,{capture:!0,passive:s}):n.addEventListener(e,t,!0):s!==void 0?n.addEventListener(e,t,{passive:s}):n.addEventListener(e,t,!1)}function bf(n,e,t,i,s){var a=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var r=i.tag;if(r===3||r===4){var o=i.stateNode.containerInfo;if(o===s)break;if(r===4)for(r=i.return;r!==null;){var l=r.tag;if((l===3||l===4)&&r.stateNode.containerInfo===s)return;r=r.return}for(;o!==null;){if(r=Ja(o),r===null)return;if(l=r.tag,l===5||l===6||l===26||l===27){i=a=r;continue e}o=o.parentNode}}i=i.return}nv(function(){var c=a,u=op(t),f=[];e:{var h=_v.get(n);if(h!==void 0){var p=bu,g=n;switch(n){case"keypress":if(Mc(t)===0)break e;case"keydown":case"keyup":p=SM;break;case"focusin":g="focus",p=ef;break;case"focusout":g="blur",p=ef;break;case"beforeblur":case"afterblur":p=ef;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=zm;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=cM;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=TM;break;case dv:case pv:case mv:p=hM;break;case gv:p=AM;break;case"scroll":case"scrollend":p=oM;break;case"wheel":p=wM;break;case"copy":case"cut":case"paste":p=pM;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=Hm;break;case"toggle":case"beforetoggle":p=DM}var v=(e&4)!==0,m=!v&&(n==="scroll"||n==="scrollend"),d=v?h!==null?h+"Capture":null:h;v=[];for(var _=c,x;_!==null;){var y=_;if(x=y.stateNode,y=y.tag,y!==5&&y!==26&&y!==27||x===null||d===null||(y=Vo(_,d),y!=null&&v.push(Ko(_,y,x))),m)break;_=_.return}0<v.length&&(h=new p(h,g,null,t,u),f.push({event:h,listeners:v}))}}if(!(e&7)){e:{if(h=n==="mouseover"||n==="pointerover",p=n==="mouseout"||n==="pointerout",h&&t!==yh&&(g=t.relatedTarget||t.fromElement)&&(Ja(g)||g[Gr]))break e;if((p||h)&&(h=u.window===u?u:(h=u.ownerDocument)?h.defaultView||h.parentWindow:window,p?(g=t.relatedTarget||t.toElement,p=c,g=g?Ja(g):null,g!==null&&(m=ll(g),v=g.tag,g!==m||v!==5&&v!==27&&v!==6)&&(g=null)):(p=null,g=c),p!==g)){if(v=zm,y="onMouseLeave",d="onMouseEnter",_="mouse",(n==="pointerout"||n==="pointerover")&&(v=Hm,y="onPointerLeave",d="onPointerEnter",_="pointer"),m=p==null?h:xo(p),x=g==null?h:xo(g),h=new v(y,_+"leave",p,t,u),h.target=m,h.relatedTarget=x,y=null,Ja(u)===c&&(v=new v(d,_+"enter",g,t,u),v.target=x,v.relatedTarget=m,y=v),m=y,p&&g)t:{for(v=p,d=g,_=0,x=v;x;x=Ca(x))_++;for(x=0,y=d;y;y=Ca(y))x++;for(;0<_-x;)v=Ca(v),_--;for(;0<x-_;)d=Ca(d),x--;for(;_--;){if(v===d||d!==null&&v===d.alternate)break t;v=Ca(v),d=Ca(d)}v=null}else v=null;p!==null&&Ug(f,h,p,v,!1),g!==null&&m!==null&&Ug(f,m,g,v,!0)}}e:{if(h=c?xo(c):window,p=h.nodeName&&h.nodeName.toLowerCase(),p==="select"||p==="input"&&h.type==="file")var R=Xm;else if(km(h))if(lv)R=HM;else{R=zM;var w=BM}else p=h.nodeName,!p||p.toLowerCase()!=="input"||h.type!=="checkbox"&&h.type!=="radio"?c&&rp(c.elementType)&&(R=Xm):R=FM;if(R&&(R=R(n,c))){ov(f,R,t,u);break e}w&&w(n,h,c),n==="focusout"&&c&&h.type==="number"&&c.memoizedProps.value!=null&&xh(h,"number",h.value)}switch(w=c?xo(c):window,n){case"focusin":(km(w)||w.contentEditable==="true")&&(tr=w,Mh=c,Ao=null);break;case"focusout":Ao=Mh=tr=null;break;case"mousedown":Eh=!0;break;case"contextmenu":case"mouseup":case"dragend":Eh=!1,Km(f,t,u);break;case"selectionchange":if(VM)break;case"keydown":case"keyup":Km(f,t,u)}var b;if(up)e:{switch(n){case"compositionstart":var C="onCompositionStart";break e;case"compositionend":C="onCompositionEnd";break e;case"compositionupdate":C="onCompositionUpdate";break e}C=void 0}else er?av(n,t)&&(C="onCompositionEnd"):n==="keydown"&&t.keyCode===229&&(C="onCompositionStart");C&&(sv&&t.locale!=="ko"&&(er||C!=="onCompositionStart"?C==="onCompositionEnd"&&er&&(b=iv()):(Ts=u,lp="value"in Ts?Ts.value:Ts.textContent,er=!0)),w=cu(c,C),0<w.length&&(C=new Fm(C,n,null,t,u),f.push({event:C,listeners:w}),b?C.data=b:(b=rv(t),b!==null&&(C.data=b)))),(b=UM?NM(n,t):OM(n,t))&&(C=cu(c,"onBeforeInput"),0<C.length&&(w=new Fm("onBeforeInput","beforeinput",null,t,u),f.push({event:w,listeners:C}),w.data=b)),TE(f,n,c,t,u)}$x(f,e)})}function Ko(n,e,t){return{instance:n,listener:e,currentTarget:t}}function cu(n,e){for(var t=e+"Capture",i=[];n!==null;){var s=n,a=s.stateNode;if(s=s.tag,s!==5&&s!==26&&s!==27||a===null||(s=Vo(n,t),s!=null&&i.unshift(Ko(n,s,a)),s=Vo(n,e),s!=null&&i.push(Ko(n,s,a))),n.tag===3)return i;n=n.return}return[]}function Ca(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5&&n.tag!==27);return n||null}function Ug(n,e,t,i,s){for(var a=e._reactName,r=[];t!==null&&t!==i;){var o=t,l=o.alternate,c=o.stateNode;if(o=o.tag,l!==null&&l===i)break;o!==5&&o!==26&&o!==27||c===null||(l=c,s?(c=Vo(t,a),c!=null&&r.unshift(Ko(t,c,l))):s||(c=Vo(t,a),c!=null&&r.push(Ko(t,c,l)))),t=t.return}r.length!==0&&n.push({event:e,listeners:r})}var wE=/\r\n?/g,CE=/\u0000|\uFFFD/g;function Ng(n){return(typeof n=="string"?n:""+n).replace(wE,`
`).replace(CE,"")}function ty(n,e){return e=Ng(e),Ng(n)===e}function Bu(){}function dt(n,e,t,i,s,a){switch(t){case"children":typeof i=="string"?e==="body"||e==="textarea"&&i===""||Mr(n,i):(typeof i=="number"||typeof i=="bigint")&&e!=="body"&&Mr(n,""+i);break;case"className":Pl(n,"class",i);break;case"tabIndex":Pl(n,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":Pl(n,t,i);break;case"style":tv(n,i,a);break;case"data":if(e!=="object"){Pl(n,"data",i);break}case"src":case"href":if(i===""&&(e!=="a"||t!=="href")){n.removeAttribute(t);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){n.removeAttribute(t);break}i=yc(""+i),n.setAttribute(t,i);break;case"action":case"formAction":if(typeof i=="function"){n.setAttribute(t,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof a=="function"&&(t==="formAction"?(e!=="input"&&dt(n,e,"name",s.name,s,null),dt(n,e,"formEncType",s.formEncType,s,null),dt(n,e,"formMethod",s.formMethod,s,null),dt(n,e,"formTarget",s.formTarget,s,null)):(dt(n,e,"encType",s.encType,s,null),dt(n,e,"method",s.method,s,null),dt(n,e,"target",s.target,s,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){n.removeAttribute(t);break}i=yc(""+i),n.setAttribute(t,i);break;case"onClick":i!=null&&(n.onclick=Bu);break;case"onScroll":i!=null&&He("scroll",n);break;case"onScrollEnd":i!=null&&He("scrollend",n);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(Y(61));if(t=i.__html,t!=null){if(s.children!=null)throw Error(Y(60));n.innerHTML=t}}break;case"multiple":n.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":n.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){n.removeAttribute("xlink:href");break}t=yc(""+i),n.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",t);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?n.setAttribute(t,""+i):n.removeAttribute(t);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?n.setAttribute(t,""):n.removeAttribute(t);break;case"capture":case"download":i===!0?n.setAttribute(t,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?n.setAttribute(t,i):n.removeAttribute(t);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?n.setAttribute(t,i):n.removeAttribute(t);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?n.removeAttribute(t):n.setAttribute(t,i);break;case"popover":He("beforetoggle",n),He("toggle",n),xc(n,"popover",i);break;case"xlinkActuate":Di(n,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":Di(n,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":Di(n,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":Di(n,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":Di(n,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":Di(n,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":Di(n,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":Di(n,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":Di(n,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":xc(n,"is",i);break;case"innerText":case"textContent":break;default:(!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(t=aM.get(t)||t,xc(n,t,i))}}function jh(n,e,t,i,s,a){switch(t){case"style":tv(n,i,a);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(Y(61));if(t=i.__html,t!=null){if(s.children!=null)throw Error(Y(60));n.innerHTML=t}}break;case"children":typeof i=="string"?Mr(n,i):(typeof i=="number"||typeof i=="bigint")&&Mr(n,""+i);break;case"onScroll":i!=null&&He("scroll",n);break;case"onScrollEnd":i!=null&&He("scrollend",n);break;case"onClick":i!=null&&(n.onclick=Bu);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!K0.hasOwnProperty(t))e:{if(t[0]==="o"&&t[1]==="n"&&(s=t.endsWith("Capture"),e=t.slice(2,s?t.length-7:void 0),a=n[Mn]||null,a=a!=null?a[t]:null,typeof a=="function"&&n.removeEventListener(e,a,s),typeof i=="function")){typeof a!="function"&&a!==null&&(t in n?n[t]=null:n.hasAttribute(t)&&n.removeAttribute(t)),n.addEventListener(e,i,s);break e}t in n?n[t]=i:i===!0?n.setAttribute(t,""):xc(n,t,i)}}}function $t(n,e,t){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":He("error",n),He("load",n);var i=!1,s=!1,a;for(a in t)if(t.hasOwnProperty(a)){var r=t[a];if(r!=null)switch(a){case"src":i=!0;break;case"srcSet":s=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(Y(137,e));default:dt(n,e,a,r,t,null)}}s&&dt(n,e,"srcSet",t.srcSet,t,null),i&&dt(n,e,"src",t.src,t,null);return;case"input":He("invalid",n);var o=a=r=s=null,l=null,c=null;for(i in t)if(t.hasOwnProperty(i)){var u=t[i];if(u!=null)switch(i){case"name":s=u;break;case"type":r=u;break;case"checked":l=u;break;case"defaultChecked":c=u;break;case"value":a=u;break;case"defaultValue":o=u;break;case"children":case"dangerouslySetInnerHTML":if(u!=null)throw Error(Y(137,e));break;default:dt(n,e,i,u,t,null)}}J0(n,a,o,l,c,r,s,!1),Xc(n);return;case"select":He("invalid",n),i=r=a=null;for(s in t)if(t.hasOwnProperty(s)&&(o=t[s],o!=null))switch(s){case"value":a=o;break;case"defaultValue":r=o;break;case"multiple":i=o;default:dt(n,e,s,o,t,null)}e=a,t=r,n.multiple=!!i,e!=null?ur(n,!!i,e,!1):t!=null&&ur(n,!!i,t,!0);return;case"textarea":He("invalid",n),a=s=i=null;for(r in t)if(t.hasOwnProperty(r)&&(o=t[r],o!=null))switch(r){case"value":i=o;break;case"defaultValue":s=o;break;case"children":a=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(Y(91));break;default:dt(n,e,r,o,t,null)}ev(n,i,s,a),Xc(n);return;case"option":for(l in t)if(t.hasOwnProperty(l)&&(i=t[l],i!=null))switch(l){case"selected":n.selected=i&&typeof i!="function"&&typeof i!="symbol";break;default:dt(n,e,l,i,t,null)}return;case"dialog":He("beforetoggle",n),He("toggle",n),He("cancel",n),He("close",n);break;case"iframe":case"object":He("load",n);break;case"video":case"audio":for(i=0;i<jo.length;i++)He(jo[i],n);break;case"image":He("error",n),He("load",n);break;case"details":He("toggle",n);break;case"embed":case"source":case"link":He("error",n),He("load",n);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in t)if(t.hasOwnProperty(c)&&(i=t[c],i!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(Y(137,e));default:dt(n,e,c,i,t,null)}return;default:if(rp(e)){for(u in t)t.hasOwnProperty(u)&&(i=t[u],i!==void 0&&jh(n,e,u,i,t,void 0));return}}for(o in t)t.hasOwnProperty(o)&&(i=t[o],i!=null&&dt(n,e,o,i,t,null))}function DE(n,e,t,i){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var s=null,a=null,r=null,o=null,l=null,c=null,u=null;for(p in t){var f=t[p];if(t.hasOwnProperty(p)&&f!=null)switch(p){case"checked":break;case"value":break;case"defaultValue":l=f;default:i.hasOwnProperty(p)||dt(n,e,p,null,i,f)}}for(var h in i){var p=i[h];if(f=t[h],i.hasOwnProperty(h)&&(p!=null||f!=null))switch(h){case"type":a=p;break;case"name":s=p;break;case"checked":c=p;break;case"defaultChecked":u=p;break;case"value":r=p;break;case"defaultValue":o=p;break;case"children":case"dangerouslySetInnerHTML":if(p!=null)throw Error(Y(137,e));break;default:p!==f&&dt(n,e,h,p,i,f)}}vh(n,r,o,l,c,u,a,s);return;case"select":p=r=o=h=null;for(a in t)if(l=t[a],t.hasOwnProperty(a)&&l!=null)switch(a){case"value":break;case"multiple":p=l;default:i.hasOwnProperty(a)||dt(n,e,a,null,i,l)}for(s in i)if(a=i[s],l=t[s],i.hasOwnProperty(s)&&(a!=null||l!=null))switch(s){case"value":h=a;break;case"defaultValue":o=a;break;case"multiple":r=a;default:a!==l&&dt(n,e,s,a,i,l)}e=o,t=r,i=p,h!=null?ur(n,!!t,h,!1):!!i!=!!t&&(e!=null?ur(n,!!t,e,!0):ur(n,!!t,t?[]:"",!1));return;case"textarea":p=h=null;for(o in t)if(s=t[o],t.hasOwnProperty(o)&&s!=null&&!i.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:dt(n,e,o,null,i,s)}for(r in i)if(s=i[r],a=t[r],i.hasOwnProperty(r)&&(s!=null||a!=null))switch(r){case"value":h=s;break;case"defaultValue":p=s;break;case"children":break;case"dangerouslySetInnerHTML":if(s!=null)throw Error(Y(91));break;default:s!==a&&dt(n,e,r,s,i,a)}$0(n,h,p);return;case"option":for(var g in t)if(h=t[g],t.hasOwnProperty(g)&&h!=null&&!i.hasOwnProperty(g))switch(g){case"selected":n.selected=!1;break;default:dt(n,e,g,null,i,h)}for(l in i)if(h=i[l],p=t[l],i.hasOwnProperty(l)&&h!==p&&(h!=null||p!=null))switch(l){case"selected":n.selected=h&&typeof h!="function"&&typeof h!="symbol";break;default:dt(n,e,l,h,i,p)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var v in t)h=t[v],t.hasOwnProperty(v)&&h!=null&&!i.hasOwnProperty(v)&&dt(n,e,v,null,i,h);for(c in i)if(h=i[c],p=t[c],i.hasOwnProperty(c)&&h!==p&&(h!=null||p!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(h!=null)throw Error(Y(137,e));break;default:dt(n,e,c,h,i,p)}return;default:if(rp(e)){for(var m in t)h=t[m],t.hasOwnProperty(m)&&h!==void 0&&!i.hasOwnProperty(m)&&jh(n,e,m,void 0,i,h);for(u in i)h=i[u],p=t[u],!i.hasOwnProperty(u)||h===p||h===void 0&&p===void 0||jh(n,e,u,h,i,p);return}}for(var d in t)h=t[d],t.hasOwnProperty(d)&&h!=null&&!i.hasOwnProperty(d)&&dt(n,e,d,null,i,h);for(f in i)h=i[f],p=t[f],!i.hasOwnProperty(f)||h===p||h==null&&p==null||dt(n,e,f,h,i,p)}var Kh=null,Zh=null;function uu(n){return n.nodeType===9?n:n.ownerDocument}function Og(n){switch(n){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function ny(n,e){if(n===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return n===1&&e==="foreignObject"?0:n}function Qh(n,e){return n==="textarea"||n==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Af=null;function LE(){var n=window.event;return n&&n.type==="popstate"?n===Af?!1:(Af=n,!0):(Af=null,!1)}var iy=typeof setTimeout=="function"?setTimeout:void 0,UE=typeof clearTimeout=="function"?clearTimeout:void 0,Pg=typeof Promise=="function"?Promise:void 0,NE=typeof queueMicrotask=="function"?queueMicrotask:typeof Pg<"u"?function(n){return Pg.resolve(null).then(n).catch(OE)}:iy;function OE(n){setTimeout(function(){throw n})}function Xs(n){return n==="head"}function Ig(n,e){var t=e,i=0,s=0;do{var a=t.nextSibling;if(n.removeChild(t),a&&a.nodeType===8)if(t=a.data,t==="/$"){if(0<i&&8>i){t=i;var r=n.ownerDocument;if(t&1&&Bo(r.documentElement),t&2&&Bo(r.body),t&4)for(t=r.head,Bo(t),r=t.firstChild;r;){var o=r.nextSibling,l=r.nodeName;r[hl]||l==="SCRIPT"||l==="STYLE"||l==="LINK"&&r.rel.toLowerCase()==="stylesheet"||t.removeChild(r),r=o}}if(s===0){n.removeChild(a),el(e);return}s--}else t==="$"||t==="$?"||t==="$!"?s++:i=t.charCodeAt(0)-48;else i=0;t=a}while(t);el(e)}function Jh(n){var e=n.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var t=e;switch(e=e.nextSibling,t.nodeName){case"HTML":case"HEAD":case"BODY":Jh(t),ap(t);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(t.rel.toLowerCase()==="stylesheet")continue}n.removeChild(t)}}function PE(n,e,t,i){for(;n.nodeType===1;){var s=t;if(n.nodeName.toLowerCase()!==e.toLowerCase()){if(!i&&(n.nodeName!=="INPUT"||n.type!=="hidden"))break}else if(i){if(!n[hl])switch(e){case"meta":if(!n.hasAttribute("itemprop"))break;return n;case"link":if(a=n.getAttribute("rel"),a==="stylesheet"&&n.hasAttribute("data-precedence"))break;if(a!==s.rel||n.getAttribute("href")!==(s.href==null||s.href===""?null:s.href)||n.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin)||n.getAttribute("title")!==(s.title==null?null:s.title))break;return n;case"style":if(n.hasAttribute("data-precedence"))break;return n;case"script":if(a=n.getAttribute("src"),(a!==(s.src==null?null:s.src)||n.getAttribute("type")!==(s.type==null?null:s.type)||n.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin))&&a&&n.hasAttribute("async")&&!n.hasAttribute("itemprop"))break;return n;default:return n}}else if(e==="input"&&n.type==="hidden"){var a=s.name==null?null:""+s.name;if(s.type==="hidden"&&n.getAttribute("name")===a)return n}else return n;if(n=fi(n.nextSibling),n===null)break}return null}function IE(n,e,t){if(e==="")return null;for(;n.nodeType!==3;)if((n.nodeType!==1||n.nodeName!=="INPUT"||n.type!=="hidden")&&!t||(n=fi(n.nextSibling),n===null))return null;return n}function $h(n){return n.data==="$!"||n.data==="$?"&&n.ownerDocument.readyState==="complete"}function BE(n,e){var t=n.ownerDocument;if(n.data!=="$?"||t.readyState==="complete")e();else{var i=function(){e(),t.removeEventListener("DOMContentLoaded",i)};t.addEventListener("DOMContentLoaded",i),n._reactRetry=i}}function fi(n){for(;n!=null;n=n.nextSibling){var e=n.nodeType;if(e===1||e===3)break;if(e===8){if(e=n.data,e==="$"||e==="$!"||e==="$?"||e==="F!"||e==="F")break;if(e==="/$")return null}}return n}var ed=null;function Bg(n){n=n.previousSibling;for(var e=0;n;){if(n.nodeType===8){var t=n.data;if(t==="$"||t==="$!"||t==="$?"){if(e===0)return n;e--}else t==="/$"&&e++}n=n.previousSibling}return null}function sy(n,e,t){switch(e=uu(t),n){case"html":if(n=e.documentElement,!n)throw Error(Y(452));return n;case"head":if(n=e.head,!n)throw Error(Y(453));return n;case"body":if(n=e.body,!n)throw Error(Y(454));return n;default:throw Error(Y(451))}}function Bo(n){for(var e=n.attributes;e.length;)n.removeAttributeNode(e[0]);ap(n)}var $n=new Map,zg=new Set;function fu(n){return typeof n.getRootNode=="function"?n.getRootNode():n.nodeType===9?n:n.ownerDocument}var ss=st.d;st.d={f:zE,r:FE,D:HE,C:GE,L:VE,m:kE,X:WE,S:XE,M:qE};function zE(){var n=ss.f(),e=Ou();return n||e}function FE(n){var e=Vr(n);e!==null&&e.tag===5&&e.type==="form"?Qv(e):ss.r(n)}var Wr=typeof document>"u"?null:document;function ay(n,e,t){var i=Wr;if(i&&typeof e=="string"&&e){var s=jn(e);s='link[rel="'+n+'"][href="'+s+'"]',typeof t=="string"&&(s+='[crossorigin="'+t+'"]'),zg.has(s)||(zg.add(s),n={rel:n,crossOrigin:t,href:e},i.querySelector(s)===null&&(e=i.createElement("link"),$t(e,"link",n),Wt(e),i.head.appendChild(e)))}}function HE(n){ss.D(n),ay("dns-prefetch",n,null)}function GE(n,e){ss.C(n,e),ay("preconnect",n,e)}function VE(n,e,t){ss.L(n,e,t);var i=Wr;if(i&&n&&e){var s='link[rel="preload"][as="'+jn(e)+'"]';e==="image"&&t&&t.imageSrcSet?(s+='[imagesrcset="'+jn(t.imageSrcSet)+'"]',typeof t.imageSizes=="string"&&(s+='[imagesizes="'+jn(t.imageSizes)+'"]')):s+='[href="'+jn(n)+'"]';var a=s;switch(e){case"style":a=Dr(n);break;case"script":a=qr(n)}$n.has(a)||(n=xt({rel:"preload",href:e==="image"&&t&&t.imageSrcSet?void 0:n,as:e},t),$n.set(a,n),i.querySelector(s)!==null||e==="style"&&i.querySelector(Ml(a))||e==="script"&&i.querySelector(El(a))||(e=i.createElement("link"),$t(e,"link",n),Wt(e),i.head.appendChild(e)))}}function kE(n,e){ss.m(n,e);var t=Wr;if(t&&n){var i=e&&typeof e.as=="string"?e.as:"script",s='link[rel="modulepreload"][as="'+jn(i)+'"][href="'+jn(n)+'"]',a=s;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":a=qr(n)}if(!$n.has(a)&&(n=xt({rel:"modulepreload",href:n},e),$n.set(a,n),t.querySelector(s)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(t.querySelector(El(a)))return}i=t.createElement("link"),$t(i,"link",n),Wt(i),t.head.appendChild(i)}}}function XE(n,e,t){ss.S(n,e,t);var i=Wr;if(i&&n){var s=cr(i).hoistableStyles,a=Dr(n);e=e||"default";var r=s.get(a);if(!r){var o={loading:0,preload:null};if(r=i.querySelector(Ml(a)))o.loading=5;else{n=xt({rel:"stylesheet",href:n,"data-precedence":e},t),(t=$n.get(a))&&Vp(n,t);var l=r=i.createElement("link");Wt(l),$t(l,"link",n),l._p=new Promise(function(c,u){l.onload=c,l.onerror=u}),l.addEventListener("load",function(){o.loading|=1}),l.addEventListener("error",function(){o.loading|=2}),o.loading|=4,Cc(r,e,i)}r={type:"stylesheet",instance:r,count:1,state:o},s.set(a,r)}}}function WE(n,e){ss.X(n,e);var t=Wr;if(t&&n){var i=cr(t).hoistableScripts,s=qr(n),a=i.get(s);a||(a=t.querySelector(El(s)),a||(n=xt({src:n,async:!0},e),(e=$n.get(s))&&kp(n,e),a=t.createElement("script"),Wt(a),$t(a,"link",n),t.head.appendChild(a)),a={type:"script",instance:a,count:1,state:null},i.set(s,a))}}function qE(n,e){ss.M(n,e);var t=Wr;if(t&&n){var i=cr(t).hoistableScripts,s=qr(n),a=i.get(s);a||(a=t.querySelector(El(s)),a||(n=xt({src:n,async:!0,type:"module"},e),(e=$n.get(s))&&kp(n,e),a=t.createElement("script"),Wt(a),$t(a,"link",n),t.head.appendChild(a)),a={type:"script",instance:a,count:1,state:null},i.set(s,a))}}function Fg(n,e,t,i){var s=(s=Cs.current)?fu(s):null;if(!s)throw Error(Y(446));switch(n){case"meta":case"title":return null;case"style":return typeof t.precedence=="string"&&typeof t.href=="string"?(e=Dr(t.href),t=cr(s).hoistableStyles,i=t.get(e),i||(i={type:"style",instance:null,count:0,state:null},t.set(e,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(t.rel==="stylesheet"&&typeof t.href=="string"&&typeof t.precedence=="string"){n=Dr(t.href);var a=cr(s).hoistableStyles,r=a.get(n);if(r||(s=s.ownerDocument||s,r={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},a.set(n,r),(a=s.querySelector(Ml(n)))&&!a._p&&(r.instance=a,r.state.loading=5),$n.has(n)||(t={rel:"preload",as:"style",href:t.href,crossOrigin:t.crossOrigin,integrity:t.integrity,media:t.media,hrefLang:t.hrefLang,referrerPolicy:t.referrerPolicy},$n.set(n,t),a||YE(s,n,t,r.state))),e&&i===null)throw Error(Y(528,""));return r}if(e&&i!==null)throw Error(Y(529,""));return null;case"script":return e=t.async,t=t.src,typeof t=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=qr(t),t=cr(s).hoistableScripts,i=t.get(e),i||(i={type:"script",instance:null,count:0,state:null},t.set(e,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(Y(444,n))}}function Dr(n){return'href="'+jn(n)+'"'}function Ml(n){return'link[rel="stylesheet"]['+n+"]"}function ry(n){return xt({},n,{"data-precedence":n.precedence,precedence:null})}function YE(n,e,t,i){n.querySelector('link[rel="preload"][as="style"]['+e+"]")?i.loading=1:(e=n.createElement("link"),i.preload=e,e.addEventListener("load",function(){return i.loading|=1}),e.addEventListener("error",function(){return i.loading|=2}),$t(e,"link",t),Wt(e),n.head.appendChild(e))}function qr(n){return'[src="'+jn(n)+'"]'}function El(n){return"script[async]"+n}function Hg(n,e,t){if(e.count++,e.instance===null)switch(e.type){case"style":var i=n.querySelector('style[data-href~="'+jn(t.href)+'"]');if(i)return e.instance=i,Wt(i),i;var s=xt({},t,{"data-href":t.href,"data-precedence":t.precedence,href:null,precedence:null});return i=(n.ownerDocument||n).createElement("style"),Wt(i),$t(i,"style",s),Cc(i,t.precedence,n),e.instance=i;case"stylesheet":s=Dr(t.href);var a=n.querySelector(Ml(s));if(a)return e.state.loading|=4,e.instance=a,Wt(a),a;i=ry(t),(s=$n.get(s))&&Vp(i,s),a=(n.ownerDocument||n).createElement("link"),Wt(a);var r=a;return r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),$t(a,"link",i),e.state.loading|=4,Cc(a,t.precedence,n),e.instance=a;case"script":return a=qr(t.src),(s=n.querySelector(El(a)))?(e.instance=s,Wt(s),s):(i=t,(s=$n.get(a))&&(i=xt({},t),kp(i,s)),n=n.ownerDocument||n,s=n.createElement("script"),Wt(s),$t(s,"link",i),n.head.appendChild(s),e.instance=s);case"void":return null;default:throw Error(Y(443,e.type))}else e.type==="stylesheet"&&!(e.state.loading&4)&&(i=e.instance,e.state.loading|=4,Cc(i,t.precedence,n));return e.instance}function Cc(n,e,t){for(var i=t.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),s=i.length?i[i.length-1]:null,a=s,r=0;r<i.length;r++){var o=i[r];if(o.dataset.precedence===e)a=o;else if(a!==s)break}a?a.parentNode.insertBefore(n,a.nextSibling):(e=t.nodeType===9?t.head:t,e.insertBefore(n,e.firstChild))}function Vp(n,e){n.crossOrigin==null&&(n.crossOrigin=e.crossOrigin),n.referrerPolicy==null&&(n.referrerPolicy=e.referrerPolicy),n.title==null&&(n.title=e.title)}function kp(n,e){n.crossOrigin==null&&(n.crossOrigin=e.crossOrigin),n.referrerPolicy==null&&(n.referrerPolicy=e.referrerPolicy),n.integrity==null&&(n.integrity=e.integrity)}var Dc=null;function Gg(n,e,t){if(Dc===null){var i=new Map,s=Dc=new Map;s.set(t,i)}else s=Dc,i=s.get(t),i||(i=new Map,s.set(t,i));if(i.has(n))return i;for(i.set(n,null),t=t.getElementsByTagName(n),s=0;s<t.length;s++){var a=t[s];if(!(a[hl]||a[sn]||n==="link"&&a.getAttribute("rel")==="stylesheet")&&a.namespaceURI!=="http://www.w3.org/2000/svg"){var r=a.getAttribute(e)||"";r=n+r;var o=i.get(r);o?o.push(a):i.set(r,[a])}}return i}function Vg(n,e,t){n=n.ownerDocument||n,n.head.insertBefore(t,e==="title"?n.querySelector("head > title"):null)}function jE(n,e,t){if(t===1||e.itemProp!=null)return!1;switch(n){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return n=e.disabled,typeof e.precedence=="string"&&n==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function oy(n){return!(n.type==="stylesheet"&&!(n.state.loading&3))}var Zo=null;function KE(){}function ZE(n,e,t){if(Zo===null)throw Error(Y(475));var i=Zo;if(e.type==="stylesheet"&&(typeof t.media!="string"||matchMedia(t.media).matches!==!1)&&!(e.state.loading&4)){if(e.instance===null){var s=Dr(t.href),a=n.querySelector(Ml(s));if(a){n=a._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(i.count++,i=hu.bind(i),n.then(i,i)),e.state.loading|=4,e.instance=a,Wt(a);return}a=n.ownerDocument||n,t=ry(t),(s=$n.get(s))&&Vp(t,s),a=a.createElement("link"),Wt(a);var r=a;r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),$t(a,"link",t),e.instance=a}i.stylesheets===null&&(i.stylesheets=new Map),i.stylesheets.set(e,n),(n=e.state.preload)&&!(e.state.loading&3)&&(i.count++,e=hu.bind(i),n.addEventListener("load",e),n.addEventListener("error",e))}}function QE(){if(Zo===null)throw Error(Y(475));var n=Zo;return n.stylesheets&&n.count===0&&td(n,n.stylesheets),0<n.count?function(e){var t=setTimeout(function(){if(n.stylesheets&&td(n,n.stylesheets),n.unsuspend){var i=n.unsuspend;n.unsuspend=null,i()}},6e4);return n.unsuspend=e,function(){n.unsuspend=null,clearTimeout(t)}}:null}function hu(){if(this.count--,this.count===0){if(this.stylesheets)td(this,this.stylesheets);else if(this.unsuspend){var n=this.unsuspend;this.unsuspend=null,n()}}}var du=null;function td(n,e){n.stylesheets=null,n.unsuspend!==null&&(n.count++,du=new Map,e.forEach(JE,n),du=null,hu.call(n))}function JE(n,e){if(!(e.state.loading&4)){var t=du.get(n);if(t)var i=t.get(null);else{t=new Map,du.set(n,t);for(var s=n.querySelectorAll("link[data-precedence],style[data-precedence]"),a=0;a<s.length;a++){var r=s[a];(r.nodeName==="LINK"||r.getAttribute("media")!=="not all")&&(t.set(r.dataset.precedence,r),i=r)}i&&t.set(null,i)}s=e.instance,r=s.getAttribute("data-precedence"),a=t.get(r)||i,a===i&&t.set(null,s),t.set(r,s),this.count++,i=hu.bind(this),s.addEventListener("load",i),s.addEventListener("error",i),a?a.parentNode.insertBefore(s,a.nextSibling):(n=n.nodeType===9?n.head:n,n.insertBefore(s,n.firstChild)),e.state.loading|=4}}var Qo={$$typeof:Vi,Provider:null,Consumer:null,_currentValue:ua,_currentValue2:ua,_threadCount:0};function $E(n,e,t,i,s,a,r,o){this.tag=1,this.containerInfo=n,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Yu(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Yu(0),this.hiddenUpdates=Yu(null),this.identifierPrefix=i,this.onUncaughtError=s,this.onCaughtError=a,this.onRecoverableError=r,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=o,this.incompleteTransitions=new Map}function ly(n,e,t,i,s,a,r,o,l,c,u,f){return n=new $E(n,e,t,r,o,l,c,f),e=1,a===!0&&(e|=24),a=Ln(3,null,null,e),n.current=a,a.stateNode=n,e=_p(),e.refCount++,n.pooledCache=e,e.refCount++,a.memoizedState={element:i,isDehydrated:t,cache:e},xp(a),n}function cy(n){return n?(n=sr,n):sr}function uy(n,e,t,i,s,a){s=cy(s),i.context===null?i.context=s:i.pendingContext=s,i=Ds(e),i.payload={element:t},a=a===void 0?null:a,a!==null&&(i.callback=a),t=Ls(n,i,e),t!==null&&(In(t,n,e),Co(t,n,e))}function kg(n,e){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var t=n.retryLane;n.retryLane=t!==0&&t<e?t:e}}function Xp(n,e){kg(n,e),(n=n.alternate)&&kg(n,e)}function fy(n){if(n.tag===13){var e=kr(n,67108864);e!==null&&In(e,n,67108864),Xp(n,67108864)}}var pu=!0;function eT(n,e,t,i){var s=be.T;be.T=null;var a=st.p;try{st.p=2,Wp(n,e,t,i)}finally{st.p=a,be.T=s}}function tT(n,e,t,i){var s=be.T;be.T=null;var a=st.p;try{st.p=8,Wp(n,e,t,i)}finally{st.p=a,be.T=s}}function Wp(n,e,t,i){if(pu){var s=nd(i);if(s===null)bf(n,e,i,mu,t),Xg(n,i);else if(iT(s,n,e,t,i))i.stopPropagation();else if(Xg(n,i),e&4&&-1<nT.indexOf(n)){for(;s!==null;){var a=Vr(s);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var r=na(a.pendingLanes);if(r!==0){var o=a;for(o.pendingLanes|=2,o.entangledLanes|=2;r;){var l=1<<31-On(r);o.entanglements[1]|=l,r&=~l}Ai(a),!(ft&6)&&(au=Si()+500,Sl(0))}}break;case 13:o=kr(a,2),o!==null&&In(o,a,2),Ou(),Xp(a,2)}if(a=nd(i),a===null&&bf(n,e,i,mu,t),a===s)break;s=a}s!==null&&i.stopPropagation()}else bf(n,e,i,null,t)}}function nd(n){return n=op(n),qp(n)}var mu=null;function qp(n){if(mu=null,n=Ja(n),n!==null){var e=ll(n);if(e===null)n=null;else{var t=e.tag;if(t===13){if(n=I0(e),n!==null)return n;n=null}else if(t===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;n=null}else e!==n&&(n=null)}}return mu=n,null}function hy(n){switch(n){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(GS()){case H0:return 2;case G0:return 8;case kc:case VS:return 32;case V0:return 268435456;default:return 32}default:return 32}}var id=!1,Os=null,Ps=null,Is=null,Jo=new Map,$o=new Map,Ss=[],nT="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Xg(n,e){switch(n){case"focusin":case"focusout":Os=null;break;case"dragenter":case"dragleave":Ps=null;break;case"mouseover":case"mouseout":Is=null;break;case"pointerover":case"pointerout":Jo.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":$o.delete(e.pointerId)}}function ro(n,e,t,i,s,a){return n===null||n.nativeEvent!==a?(n={blockedOn:e,domEventName:t,eventSystemFlags:i,nativeEvent:a,targetContainers:[s]},e!==null&&(e=Vr(e),e!==null&&fy(e)),n):(n.eventSystemFlags|=i,e=n.targetContainers,s!==null&&e.indexOf(s)===-1&&e.push(s),n)}function iT(n,e,t,i,s){switch(e){case"focusin":return Os=ro(Os,n,e,t,i,s),!0;case"dragenter":return Ps=ro(Ps,n,e,t,i,s),!0;case"mouseover":return Is=ro(Is,n,e,t,i,s),!0;case"pointerover":var a=s.pointerId;return Jo.set(a,ro(Jo.get(a)||null,n,e,t,i,s)),!0;case"gotpointercapture":return a=s.pointerId,$o.set(a,ro($o.get(a)||null,n,e,t,i,s)),!0}return!1}function dy(n){var e=Ja(n.target);if(e!==null){var t=ll(e);if(t!==null){if(e=t.tag,e===13){if(e=I0(t),e!==null){n.blockedOn=e,ZS(n.priority,function(){if(t.tag===13){var i=Pn();i=ip(i);var s=kr(t,i);s!==null&&In(s,t,i),Xp(t,i)}});return}}else if(e===3&&t.stateNode.current.memoizedState.isDehydrated){n.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}n.blockedOn=null}function Lc(n){if(n.blockedOn!==null)return!1;for(var e=n.targetContainers;0<e.length;){var t=nd(n.nativeEvent);if(t===null){t=n.nativeEvent;var i=new t.constructor(t.type,t);yh=i,t.target.dispatchEvent(i),yh=null}else return e=Vr(t),e!==null&&fy(e),n.blockedOn=t,!1;e.shift()}return!0}function Wg(n,e,t){Lc(n)&&t.delete(e)}function sT(){id=!1,Os!==null&&Lc(Os)&&(Os=null),Ps!==null&&Lc(Ps)&&(Ps=null),Is!==null&&Lc(Is)&&(Is=null),Jo.forEach(Wg),$o.forEach(Wg)}function kl(n,e){n.blockedOn===e&&(n.blockedOn=null,id||(id=!0,Ht.unstable_scheduleCallback(Ht.unstable_NormalPriority,sT)))}var Xl=null;function qg(n){Xl!==n&&(Xl=n,Ht.unstable_scheduleCallback(Ht.unstable_NormalPriority,function(){Xl===n&&(Xl=null);for(var e=0;e<n.length;e+=3){var t=n[e],i=n[e+1],s=n[e+2];if(typeof i!="function"){if(qp(i||t)===null)continue;break}var a=Vr(t);a!==null&&(n.splice(e,3),e-=3,Ih(a,{pending:!0,data:s,method:t.method,action:i},i,s))}}))}function el(n){function e(l){return kl(l,n)}Os!==null&&kl(Os,n),Ps!==null&&kl(Ps,n),Is!==null&&kl(Is,n),Jo.forEach(e),$o.forEach(e);for(var t=0;t<Ss.length;t++){var i=Ss[t];i.blockedOn===n&&(i.blockedOn=null)}for(;0<Ss.length&&(t=Ss[0],t.blockedOn===null);)dy(t),t.blockedOn===null&&Ss.shift();if(t=(n.ownerDocument||n).$$reactFormReplay,t!=null)for(i=0;i<t.length;i+=3){var s=t[i],a=t[i+1],r=s[Mn]||null;if(typeof a=="function")r||qg(t);else if(r){var o=null;if(a&&a.hasAttribute("formAction")){if(s=a,r=a[Mn]||null)o=r.formAction;else if(qp(s)!==null)continue}else o=r.action;typeof o=="function"?t[i+1]=o:(t.splice(i,3),i-=3),qg(t)}}}function Yp(n){this._internalRoot=n}zu.prototype.render=Yp.prototype.render=function(n){var e=this._internalRoot;if(e===null)throw Error(Y(409));var t=e.current,i=Pn();uy(t,i,n,e,null,null)};zu.prototype.unmount=Yp.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var e=n.containerInfo;uy(n.current,2,null,n,null,null),Ou(),e[Gr]=null}};function zu(n){this._internalRoot=n}zu.prototype.unstable_scheduleHydration=function(n){if(n){var e=Y0();n={blockedOn:null,target:n,priority:e};for(var t=0;t<Ss.length&&e!==0&&e<Ss[t].priority;t++);Ss.splice(t,0,n),t===0&&dy(n)}};var Yg=O0.version;if(Yg!=="19.1.0")throw Error(Y(527,Yg,"19.1.0"));st.findDOMNode=function(n){var e=n._reactInternals;if(e===void 0)throw typeof n.render=="function"?Error(Y(188)):(n=Object.keys(n).join(","),Error(Y(268,n)));return n=OS(e),n=n!==null?B0(n):null,n=n===null?null:n.stateNode,n};var aT={bundleType:0,version:"19.1.0",rendererPackageName:"react-dom",currentDispatcherRef:be,reconcilerVersion:"19.1.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Wl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Wl.isDisabled&&Wl.supportsFiber)try{cl=Wl.inject(aT),Nn=Wl}catch{}}Mu.createRoot=function(n,e){if(!P0(n))throw Error(Y(299));var t=!1,i="",s=lx,a=cx,r=ux,o=null;return e!=null&&(e.unstable_strictMode===!0&&(t=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onUncaughtError!==void 0&&(s=e.onUncaughtError),e.onCaughtError!==void 0&&(a=e.onCaughtError),e.onRecoverableError!==void 0&&(r=e.onRecoverableError),e.unstable_transitionCallbacks!==void 0&&(o=e.unstable_transitionCallbacks)),e=ly(n,1,!1,null,null,t,i,s,a,r,o,null),n[Gr]=e.current,Gp(n),new Yp(e)};Mu.hydrateRoot=function(n,e,t){if(!P0(n))throw Error(Y(299));var i=!1,s="",a=lx,r=cx,o=ux,l=null,c=null;return t!=null&&(t.unstable_strictMode===!0&&(i=!0),t.identifierPrefix!==void 0&&(s=t.identifierPrefix),t.onUncaughtError!==void 0&&(a=t.onUncaughtError),t.onCaughtError!==void 0&&(r=t.onCaughtError),t.onRecoverableError!==void 0&&(o=t.onRecoverableError),t.unstable_transitionCallbacks!==void 0&&(l=t.unstable_transitionCallbacks),t.formState!==void 0&&(c=t.formState)),e=ly(n,1,!0,e,t??null,i,s,a,r,o,l,c),e.context=cy(null),t=e.current,i=Pn(),i=ip(i),s=Ds(i),s.callback=null,Ls(t,s,i),t=i,e.current.lanes=t,fl(e,t),Ai(e),n[Gr]=e.current,Gp(n),new zu(e)};Mu.version="19.1.0";function py(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(py)}catch(n){console.error(n)}}py(),w0.exports=Mu;var rT=w0.exports;const oT=v0(rT);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const jp="175",lT=0,jg=1,cT=2,my=1,uT=2,Fi=3,ns=0,Sn=1,oi=2,Bs=0,_r=1,Kg=2,Zg=3,Qg=4,fT=5,oa=100,hT=101,dT=102,pT=103,mT=104,gT=200,_T=201,vT=202,xT=203,sd=204,ad=205,yT=206,ST=207,MT=208,ET=209,TT=210,bT=211,AT=212,RT=213,wT=214,rd=0,od=1,ld=2,Lr=3,cd=4,ud=5,fd=6,hd=7,gy=0,CT=1,DT=2,zs=0,LT=1,UT=2,NT=3,OT=4,PT=5,IT=6,BT=7,Jg="attached",zT="detached",_y=300,Ur=301,Nr=302,dd=303,pd=304,Fu=306,Or=1e3,Rs=1001,gu=1002,dn=1003,vy=1004,So=1005,Un=1006,Uc=1007,Yi=1008,is=1009,xy=1010,yy=1011,tl=1012,Kp=1013,Sa=1014,ui=1015,Tl=1016,Zp=1017,Qp=1018,nl=1020,Sy=35902,My=1021,Ey=1022,Qn=1023,Ty=1024,by=1025,il=1026,sl=1027,Jp=1028,$p=1029,Ay=1030,em=1031,tm=1033,Nc=33776,Oc=33777,Pc=33778,Ic=33779,md=35840,gd=35841,_d=35842,vd=35843,xd=36196,yd=37492,Sd=37496,Md=37808,Ed=37809,Td=37810,bd=37811,Ad=37812,Rd=37813,wd=37814,Cd=37815,Dd=37816,Ld=37817,Ud=37818,Nd=37819,Od=37820,Pd=37821,Bc=36492,Id=36494,Bd=36495,Ry=36283,zd=36284,Fd=36285,Hd=36286,al=2300,rl=2301,Rf=2302,$g=2400,e_=2401,t_=2402,FT=2500,HT=0,wy=1,Gd=2,GT=3200,VT=3201,Cy=0,kT=1,Ms="",Qt="srgb",mn="srgb-linear",_u="linear",ht="srgb",Da=7680,n_=519,XT=512,WT=513,qT=514,Dy=515,YT=516,jT=517,KT=518,ZT=519,Vd=35044,i_="300 es",ji=2e3,vu=2001;class Yr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const a=s.indexOf(t);a!==-1&&s.splice(a,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let a=0,r=s.length;a<r;a++)s[a].call(this,e);e.target=null}}}const tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let s_=1234567;const zo=Math.PI/180,Pr=180/Math.PI;function hi(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(tn[n&255]+tn[n>>8&255]+tn[n>>16&255]+tn[n>>24&255]+"-"+tn[e&255]+tn[e>>8&255]+"-"+tn[e>>16&15|64]+tn[e>>24&255]+"-"+tn[t&63|128]+tn[t>>8&255]+"-"+tn[t>>16&255]+tn[t>>24&255]+tn[i&255]+tn[i>>8&255]+tn[i>>16&255]+tn[i>>24&255]).toLowerCase()}function Ve(n,e,t){return Math.max(e,Math.min(t,n))}function nm(n,e){return(n%e+e)%e}function QT(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function JT(n,e,t){return n!==e?(t-n)/(e-n):0}function Fo(n,e,t){return(1-t)*n+t*e}function $T(n,e,t,i){return Fo(n,e,1-Math.exp(-t*i))}function eb(n,e=1){return e-Math.abs(nm(n,e*2)-e)}function tb(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function nb(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function ib(n,e){return n+Math.floor(Math.random()*(e-n+1))}function sb(n,e){return n+Math.random()*(e-n)}function ab(n){return n*(.5-Math.random())}function rb(n){n!==void 0&&(s_=n);let e=s_+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function ob(n){return n*zo}function lb(n){return n*Pr}function cb(n){return(n&n-1)===0&&n!==0}function ub(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function fb(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function hb(n,e,t,i,s){const a=Math.cos,r=Math.sin,o=a(t/2),l=r(t/2),c=a((e+i)/2),u=r((e+i)/2),f=a((e-i)/2),h=r((e-i)/2),p=a((i-e)/2),g=r((i-e)/2);switch(s){case"XYX":n.set(o*u,l*f,l*h,o*c);break;case"YZY":n.set(l*h,o*u,l*f,o*c);break;case"ZXZ":n.set(l*f,l*h,o*u,o*c);break;case"XZX":n.set(o*u,l*g,l*p,o*c);break;case"YXY":n.set(l*p,o*u,l*g,o*c);break;case"ZYZ":n.set(l*g,l*p,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function li(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function ct(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Ka={DEG2RAD:zo,RAD2DEG:Pr,generateUUID:hi,clamp:Ve,euclideanModulo:nm,mapLinear:QT,inverseLerp:JT,lerp:Fo,damp:$T,pingpong:eb,smoothstep:tb,smootherstep:nb,randInt:ib,randFloat:sb,randFloatSpread:ab,seededRandom:rb,degToRad:ob,radToDeg:lb,isPowerOfTwo:cb,ceilPowerOfTwo:ub,floorPowerOfTwo:fb,setQuaternionFromProperEuler:hb,normalize:ct,denormalize:li};class Ke{constructor(e=0,t=0){Ke.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ve(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ve(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),a=this.x-e.x,r=this.y-e.y;return this.x=a*i-r*s+e.x,this.y=a*s+r*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Oe{constructor(e,t,i,s,a,r,o,l,c){Oe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,a,r,o,l,c)}set(e,t,i,s,a,r,o,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=a,u[5]=l,u[6]=i,u[7]=r,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,a=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],u=i[4],f=i[7],h=i[2],p=i[5],g=i[8],v=s[0],m=s[3],d=s[6],_=s[1],x=s[4],y=s[7],R=s[2],w=s[5],b=s[8];return a[0]=r*v+o*_+l*R,a[3]=r*m+o*x+l*w,a[6]=r*d+o*y+l*b,a[1]=c*v+u*_+f*R,a[4]=c*m+u*x+f*w,a[7]=c*d+u*y+f*b,a[2]=h*v+p*_+g*R,a[5]=h*m+p*x+g*w,a[8]=h*d+p*y+g*b,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],r=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*r*u-t*o*c-i*a*u+i*o*l+s*a*c-s*r*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],r=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=u*r-o*c,h=o*l-u*a,p=c*a-r*l,g=t*f+i*h+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=f*v,e[1]=(s*c-u*i)*v,e[2]=(o*i-s*r)*v,e[3]=h*v,e[4]=(u*t-s*l)*v,e[5]=(s*a-o*t)*v,e[6]=p*v,e[7]=(i*l-c*t)*v,e[8]=(r*t-i*a)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,a,r,o){const l=Math.cos(a),c=Math.sin(a);return this.set(i*l,i*c,-i*(l*r+c*o)+r+e,-s*c,s*l,-s*(-c*r+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(wf.makeScale(e,t)),this}rotate(e){return this.premultiply(wf.makeRotation(-e)),this}translate(e,t){return this.premultiply(wf.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const wf=new Oe;function Ly(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function ol(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function db(){const n=ol("canvas");return n.style.display="block",n}const a_={};function zc(n){n in a_||(a_[n]=!0,console.warn(n))}function pb(n,e,t){return new Promise(function(i,s){function a(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:i()}}setTimeout(a,t)})}function mb(n){const e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function gb(n){const e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const r_=new Oe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),o_=new Oe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function _b(){const n={enabled:!0,workingColorSpace:mn,spaces:{},convert:function(s,a,r){return this.enabled===!1||a===r||!a||!r||(this.spaces[a].transfer===ht&&(s.r=Qi(s.r),s.g=Qi(s.g),s.b=Qi(s.b)),this.spaces[a].primaries!==this.spaces[r].primaries&&(s.applyMatrix3(this.spaces[a].toXYZ),s.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===ht&&(s.r=vr(s.r),s.g=vr(s.g),s.b=vr(s.b))),s},fromWorkingColorSpace:function(s,a){return this.convert(s,this.workingColorSpace,a)},toWorkingColorSpace:function(s,a){return this.convert(s,a,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ms?_u:this.spaces[s].transfer},getLuminanceCoefficients:function(s,a=this.workingColorSpace){return s.fromArray(this.spaces[a].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,a,r){return s.copy(this.spaces[a].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[mn]:{primaries:e,whitePoint:i,transfer:_u,toXYZ:r_,fromXYZ:o_,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Qt},outputColorSpaceConfig:{drawingBufferColorSpace:Qt}},[Qt]:{primaries:e,whitePoint:i,transfer:ht,toXYZ:r_,fromXYZ:o_,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Qt}}}),n}const Ye=_b();function Qi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function vr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let La;class vb{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{La===void 0&&(La=ol("canvas")),La.width=e.width,La.height=e.height;const s=La.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=La}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ol("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),a=s.data;for(let r=0;r<a.length;r++)a[r]=Qi(a[r]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Qi(t[i]/255)*255):t[i]=Qi(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let xb=0;class im{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:xb++}),this.uuid=hi(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let r=0,o=s.length;r<o;r++)s[r].isDataTexture?a.push(Cf(s[r].image)):a.push(Cf(s[r]))}else a=Cf(s);i.url=a}return t||(e.images[this.uuid]=i),i}}function Cf(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?vb.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let yb=0;class jt extends Yr{constructor(e=jt.DEFAULT_IMAGE,t=jt.DEFAULT_MAPPING,i=Rs,s=Rs,a=Un,r=Yi,o=Qn,l=is,c=jt.DEFAULT_ANISOTROPY,u=Ms){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:yb++}),this.uuid=hi(),this.name="",this.source=new im(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=a,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ke(0,0),this.repeat=new Ke(1,1),this.center=new Ke(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==_y)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Or:e.x=e.x-Math.floor(e.x);break;case Rs:e.x=e.x<0?0:1;break;case gu:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Or:e.y=e.y-Math.floor(e.y);break;case Rs:e.y=e.y<0?0:1;break;case gu:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}jt.DEFAULT_IMAGE=null;jt.DEFAULT_MAPPING=_y;jt.DEFAULT_ANISOTROPY=1;class it{constructor(e=0,t=0,i=0,s=1){it.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,a=this.w,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s+r[12]*a,this.y=r[1]*t+r[5]*i+r[9]*s+r[13]*a,this.z=r[2]*t+r[6]*i+r[10]*s+r[14]*a,this.w=r[3]*t+r[7]*i+r[11]*s+r[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,a;const l=e.elements,c=l[0],u=l[4],f=l[8],h=l[1],p=l[5],g=l[9],v=l[2],m=l[6],d=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,y=(p+1)/2,R=(d+1)/2,w=(u+h)/4,b=(f+v)/4,C=(g+m)/4;return x>y&&x>R?x<.01?(i=0,s=.707106781,a=.707106781):(i=Math.sqrt(x),s=w/i,a=b/i):y>R?y<.01?(i=.707106781,s=0,a=.707106781):(s=Math.sqrt(y),i=w/s,a=C/s):R<.01?(i=.707106781,s=.707106781,a=0):(a=Math.sqrt(R),i=b/a,s=C/a),this.set(i,s,a,t),this}let _=Math.sqrt((m-g)*(m-g)+(f-v)*(f-v)+(h-u)*(h-u));return Math.abs(_)<.001&&(_=1),this.x=(m-g)/_,this.y=(f-v)/_,this.z=(h-u)/_,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this.z=Ve(this.z,e.z,t.z),this.w=Ve(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this.z=Ve(this.z,e,t),this.w=Ve(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ve(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Sb extends Yr{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new it(0,0,e,t),this.scissorTest=!1,this.viewport=new it(0,0,e,t);const s={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Un,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const a=new jt(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);a.flipY=!1,a.generateMipmaps=i.generateMipmaps,a.internalFormat=i.internalFormat,this.textures=[];const r=i.count;for(let o=0;o<r;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,a=this.textures.length;s<a;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new im(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ma extends Sb{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Uy extends jt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=dn,this.minFilter=dn,this.wrapR=Rs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Mb extends jt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=dn,this.minFilter=dn,this.wrapR=Rs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ws{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,a,r,o){let l=i[s+0],c=i[s+1],u=i[s+2],f=i[s+3];const h=a[r+0],p=a[r+1],g=a[r+2],v=a[r+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f;return}if(o===1){e[t+0]=h,e[t+1]=p,e[t+2]=g,e[t+3]=v;return}if(f!==v||l!==h||c!==p||u!==g){let m=1-o;const d=l*h+c*p+u*g+f*v,_=d>=0?1:-1,x=1-d*d;if(x>Number.EPSILON){const R=Math.sqrt(x),w=Math.atan2(R,d*_);m=Math.sin(m*w)/R,o=Math.sin(o*w)/R}const y=o*_;if(l=l*m+h*y,c=c*m+p*y,u=u*m+g*y,f=f*m+v*y,m===1-o){const R=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=R,c*=R,u*=R,f*=R}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,s,a,r){const o=i[s],l=i[s+1],c=i[s+2],u=i[s+3],f=a[r],h=a[r+1],p=a[r+2],g=a[r+3];return e[t]=o*g+u*f+l*p-c*h,e[t+1]=l*g+u*h+c*f-o*p,e[t+2]=c*g+u*p+o*h-l*f,e[t+3]=u*g-o*f-l*h-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,a=e._z,r=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(s/2),f=o(a/2),h=l(i/2),p=l(s/2),g=l(a/2);switch(r){case"XYZ":this._x=h*u*f+c*p*g,this._y=c*p*f-h*u*g,this._z=c*u*g+h*p*f,this._w=c*u*f-h*p*g;break;case"YXZ":this._x=h*u*f+c*p*g,this._y=c*p*f-h*u*g,this._z=c*u*g-h*p*f,this._w=c*u*f+h*p*g;break;case"ZXY":this._x=h*u*f-c*p*g,this._y=c*p*f+h*u*g,this._z=c*u*g+h*p*f,this._w=c*u*f-h*p*g;break;case"ZYX":this._x=h*u*f-c*p*g,this._y=c*p*f+h*u*g,this._z=c*u*g-h*p*f,this._w=c*u*f+h*p*g;break;case"YZX":this._x=h*u*f+c*p*g,this._y=c*p*f+h*u*g,this._z=c*u*g-h*p*f,this._w=c*u*f-h*p*g;break;case"XZY":this._x=h*u*f-c*p*g,this._y=c*p*f-h*u*g,this._z=c*u*g+h*p*f,this._w=c*u*f+h*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],a=t[8],r=t[1],o=t[5],l=t[9],c=t[2],u=t[6],f=t[10],h=i+o+f;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(a-c)*p,this._z=(r-s)*p}else if(i>o&&i>f){const p=2*Math.sqrt(1+i-o-f);this._w=(u-l)/p,this._x=.25*p,this._y=(s+r)/p,this._z=(a+c)/p}else if(o>f){const p=2*Math.sqrt(1+o-i-f);this._w=(a-c)/p,this._x=(s+r)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+f-i-o);this._w=(r-s)/p,this._x=(a+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ve(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,a=e._z,r=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+r*o+s*c-a*l,this._y=s*u+r*l+a*o-i*c,this._z=a*u+r*c+i*l-s*o,this._w=r*u-i*o-s*l-a*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,a=this._z,r=this._w;let o=r*e._w+i*e._x+s*e._y+a*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=r,this._x=i,this._y=s,this._z=a,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-t;return this._w=p*r+t*this._w,this._x=p*i+t*this._x,this._y=p*s+t*this._y,this._z=p*a+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),f=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=r*f+this._w*h,this._x=i*f+this._x*h,this._y=s*f+this._y*h,this._z=a*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class O{constructor(e=0,t=0,i=0){O.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(l_.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(l_.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6]*s,this.y=a[1]*t+a[4]*i+a[7]*s,this.z=a[2]*t+a[5]*i+a[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,a=e.elements,r=1/(a[3]*t+a[7]*i+a[11]*s+a[15]);return this.x=(a[0]*t+a[4]*i+a[8]*s+a[12])*r,this.y=(a[1]*t+a[5]*i+a[9]*s+a[13])*r,this.z=(a[2]*t+a[6]*i+a[10]*s+a[14])*r,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,a=e.x,r=e.y,o=e.z,l=e.w,c=2*(r*s-o*i),u=2*(o*t-a*s),f=2*(a*i-r*t);return this.x=t+l*c+r*f-o*u,this.y=i+l*u+o*c-a*f,this.z=s+l*f+a*u-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s,this.y=a[1]*t+a[5]*i+a[9]*s,this.z=a[2]*t+a[6]*i+a[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this.z=Ve(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this.z=Ve(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ve(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,a=e.z,r=t.x,o=t.y,l=t.z;return this.x=s*l-a*o,this.y=a*r-i*l,this.z=i*o-s*r,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Df.copy(this).projectOnVector(e),this.sub(Df)}reflect(e){return this.sub(Df.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ve(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Df=new O,l_=new Ws;class as{constructor(e=new O(1/0,1/0,1/0),t=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(ii.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(ii.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=ii.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let r=0,o=a.count;r<o;r++)e.isMesh===!0?e.getVertexPosition(r,ii):ii.fromBufferAttribute(a,r),ii.applyMatrix4(e.matrixWorld),this.expandByPoint(ii);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ql.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ql.copy(i.boundingBox)),ql.applyMatrix4(e.matrixWorld),this.union(ql)}const s=e.children;for(let a=0,r=s.length;a<r;a++)this.expandByObject(s[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ii),ii.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(oo),Yl.subVectors(this.max,oo),Ua.subVectors(e.a,oo),Na.subVectors(e.b,oo),Oa.subVectors(e.c,oo),ls.subVectors(Na,Ua),cs.subVectors(Oa,Na),Ks.subVectors(Ua,Oa);let t=[0,-ls.z,ls.y,0,-cs.z,cs.y,0,-Ks.z,Ks.y,ls.z,0,-ls.x,cs.z,0,-cs.x,Ks.z,0,-Ks.x,-ls.y,ls.x,0,-cs.y,cs.x,0,-Ks.y,Ks.x,0];return!Lf(t,Ua,Na,Oa,Yl)||(t=[1,0,0,0,1,0,0,0,1],!Lf(t,Ua,Na,Oa,Yl))?!1:(jl.crossVectors(ls,cs),t=[jl.x,jl.y,jl.z],Lf(t,Ua,Na,Oa,Yl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ii).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ii).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ni[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ni[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ni[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ni[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ni[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ni[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ni[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ni[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ni),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ni=[new O,new O,new O,new O,new O,new O,new O,new O],ii=new O,ql=new as,Ua=new O,Na=new O,Oa=new O,ls=new O,cs=new O,Ks=new O,oo=new O,Yl=new O,jl=new O,Zs=new O;function Lf(n,e,t,i,s){for(let a=0,r=n.length-3;a<=r;a+=3){Zs.fromArray(n,a);const o=s.x*Math.abs(Zs.x)+s.y*Math.abs(Zs.y)+s.z*Math.abs(Zs.z),l=e.dot(Zs),c=t.dot(Zs),u=i.dot(Zs);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Eb=new as,lo=new O,Uf=new O;class Ri{constructor(e=new O,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Eb.setFromPoints(e).getCenter(i);let s=0;for(let a=0,r=e.length;a<r;a++)s=Math.max(s,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;lo.subVectors(e,this.center);const t=lo.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(lo,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Uf.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(lo.copy(e.center).add(Uf)),this.expandByPoint(lo.copy(e.center).sub(Uf))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Oi=new O,Nf=new O,Kl=new O,us=new O,Of=new O,Zl=new O,Pf=new O;class Hu{constructor(e=new O,t=new O(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Oi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Oi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Oi.copy(this.origin).addScaledVector(this.direction,t),Oi.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Nf.copy(e).add(t).multiplyScalar(.5),Kl.copy(t).sub(e).normalize(),us.copy(this.origin).sub(Nf);const a=e.distanceTo(t)*.5,r=-this.direction.dot(Kl),o=us.dot(this.direction),l=-us.dot(Kl),c=us.lengthSq(),u=Math.abs(1-r*r);let f,h,p,g;if(u>0)if(f=r*l-o,h=r*o-l,g=a*u,f>=0)if(h>=-g)if(h<=g){const v=1/u;f*=v,h*=v,p=f*(f+r*h+2*o)+h*(r*f+h+2*l)+c}else h=a,f=Math.max(0,-(r*h+o)),p=-f*f+h*(h+2*l)+c;else h=-a,f=Math.max(0,-(r*h+o)),p=-f*f+h*(h+2*l)+c;else h<=-g?(f=Math.max(0,-(-r*a+o)),h=f>0?-a:Math.min(Math.max(-a,-l),a),p=-f*f+h*(h+2*l)+c):h<=g?(f=0,h=Math.min(Math.max(-a,-l),a),p=h*(h+2*l)+c):(f=Math.max(0,-(r*a+o)),h=f>0?a:Math.min(Math.max(-a,-l),a),p=-f*f+h*(h+2*l)+c);else h=r>0?-a:a,f=Math.max(0,-(r*h+o)),p=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Nf).addScaledVector(Kl,h),p}intersectSphere(e,t){Oi.subVectors(e.center,this.origin);const i=Oi.dot(this.direction),s=Oi.dot(Oi)-i*i,a=e.radius*e.radius;if(s>a)return null;const r=Math.sqrt(a-s),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,a,r,o,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),u>=0?(a=(e.min.y-h.y)*u,r=(e.max.y-h.y)*u):(a=(e.max.y-h.y)*u,r=(e.min.y-h.y)*u),i>r||a>s||((a>i||isNaN(i))&&(i=a),(r<s||isNaN(s))&&(s=r),f>=0?(o=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(o=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Oi)!==null}intersectTriangle(e,t,i,s,a){Of.subVectors(t,e),Zl.subVectors(i,e),Pf.crossVectors(Of,Zl);let r=this.direction.dot(Pf),o;if(r>0){if(s)return null;o=1}else if(r<0)o=-1,r=-r;else return null;us.subVectors(this.origin,e);const l=o*this.direction.dot(Zl.crossVectors(us,Zl));if(l<0)return null;const c=o*this.direction.dot(Of.cross(us));if(c<0||l+c>r)return null;const u=-o*us.dot(Pf);return u<0?null:this.at(u/r,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Pe{constructor(e,t,i,s,a,r,o,l,c,u,f,h,p,g,v,m){Pe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,a,r,o,l,c,u,f,h,p,g,v,m)}set(e,t,i,s,a,r,o,l,c,u,f,h,p,g,v,m){const d=this.elements;return d[0]=e,d[4]=t,d[8]=i,d[12]=s,d[1]=a,d[5]=r,d[9]=o,d[13]=l,d[2]=c,d[6]=u,d[10]=f,d[14]=h,d[3]=p,d[7]=g,d[11]=v,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Pe().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/Pa.setFromMatrixColumn(e,0).length(),a=1/Pa.setFromMatrixColumn(e,1).length(),r=1/Pa.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*a,t[5]=i[5]*a,t[6]=i[6]*a,t[7]=0,t[8]=i[8]*r,t[9]=i[9]*r,t[10]=i[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,a=e.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(a),f=Math.sin(a);if(e.order==="XYZ"){const h=r*u,p=r*f,g=o*u,v=o*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=p+g*c,t[5]=h-v*c,t[9]=-o*l,t[2]=v-h*c,t[6]=g+p*c,t[10]=r*l}else if(e.order==="YXZ"){const h=l*u,p=l*f,g=c*u,v=c*f;t[0]=h+v*o,t[4]=g*o-p,t[8]=r*c,t[1]=r*f,t[5]=r*u,t[9]=-o,t[2]=p*o-g,t[6]=v+h*o,t[10]=r*l}else if(e.order==="ZXY"){const h=l*u,p=l*f,g=c*u,v=c*f;t[0]=h-v*o,t[4]=-r*f,t[8]=g+p*o,t[1]=p+g*o,t[5]=r*u,t[9]=v-h*o,t[2]=-r*c,t[6]=o,t[10]=r*l}else if(e.order==="ZYX"){const h=r*u,p=r*f,g=o*u,v=o*f;t[0]=l*u,t[4]=g*c-p,t[8]=h*c+v,t[1]=l*f,t[5]=v*c+h,t[9]=p*c-g,t[2]=-c,t[6]=o*l,t[10]=r*l}else if(e.order==="YZX"){const h=r*l,p=r*c,g=o*l,v=o*c;t[0]=l*u,t[4]=v-h*f,t[8]=g*f+p,t[1]=f,t[5]=r*u,t[9]=-o*u,t[2]=-c*u,t[6]=p*f+g,t[10]=h-v*f}else if(e.order==="XZY"){const h=r*l,p=r*c,g=o*l,v=o*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=h*f+v,t[5]=r*u,t[9]=p*f-g,t[2]=g*f-p,t[6]=o*u,t[10]=v*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Tb,e,bb)}lookAt(e,t,i){const s=this.elements;return Rn.subVectors(e,t),Rn.lengthSq()===0&&(Rn.z=1),Rn.normalize(),fs.crossVectors(i,Rn),fs.lengthSq()===0&&(Math.abs(i.z)===1?Rn.x+=1e-4:Rn.z+=1e-4,Rn.normalize(),fs.crossVectors(i,Rn)),fs.normalize(),Ql.crossVectors(Rn,fs),s[0]=fs.x,s[4]=Ql.x,s[8]=Rn.x,s[1]=fs.y,s[5]=Ql.y,s[9]=Rn.y,s[2]=fs.z,s[6]=Ql.z,s[10]=Rn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,a=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],u=i[1],f=i[5],h=i[9],p=i[13],g=i[2],v=i[6],m=i[10],d=i[14],_=i[3],x=i[7],y=i[11],R=i[15],w=s[0],b=s[4],C=s[8],T=s[12],S=s[1],L=s[5],X=s[9],G=s[13],Z=s[2],Q=s[6],N=s[10],V=s[14],B=s[3],ee=s[7],se=s[11],ve=s[15];return a[0]=r*w+o*S+l*Z+c*B,a[4]=r*b+o*L+l*Q+c*ee,a[8]=r*C+o*X+l*N+c*se,a[12]=r*T+o*G+l*V+c*ve,a[1]=u*w+f*S+h*Z+p*B,a[5]=u*b+f*L+h*Q+p*ee,a[9]=u*C+f*X+h*N+p*se,a[13]=u*T+f*G+h*V+p*ve,a[2]=g*w+v*S+m*Z+d*B,a[6]=g*b+v*L+m*Q+d*ee,a[10]=g*C+v*X+m*N+d*se,a[14]=g*T+v*G+m*V+d*ve,a[3]=_*w+x*S+y*Z+R*B,a[7]=_*b+x*L+y*Q+R*ee,a[11]=_*C+x*X+y*N+R*se,a[15]=_*T+x*G+y*V+R*ve,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],a=e[12],r=e[1],o=e[5],l=e[9],c=e[13],u=e[2],f=e[6],h=e[10],p=e[14],g=e[3],v=e[7],m=e[11],d=e[15];return g*(+a*l*f-s*c*f-a*o*h+i*c*h+s*o*p-i*l*p)+v*(+t*l*p-t*c*h+a*r*h-s*r*p+s*c*u-a*l*u)+m*(+t*c*f-t*o*p-a*r*f+i*r*p+a*o*u-i*c*u)+d*(-s*o*u-t*l*f+t*o*h+s*r*f-i*r*h+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],r=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=e[9],h=e[10],p=e[11],g=e[12],v=e[13],m=e[14],d=e[15],_=f*m*c-v*h*c+v*l*p-o*m*p-f*l*d+o*h*d,x=g*h*c-u*m*c-g*l*p+r*m*p+u*l*d-r*h*d,y=u*v*c-g*f*c+g*o*p-r*v*p-u*o*d+r*f*d,R=g*f*l-u*v*l-g*o*h+r*v*h+u*o*m-r*f*m,w=t*_+i*x+s*y+a*R;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/w;return e[0]=_*b,e[1]=(v*h*a-f*m*a-v*s*p+i*m*p+f*s*d-i*h*d)*b,e[2]=(o*m*a-v*l*a+v*s*c-i*m*c-o*s*d+i*l*d)*b,e[3]=(f*l*a-o*h*a-f*s*c+i*h*c+o*s*p-i*l*p)*b,e[4]=x*b,e[5]=(u*m*a-g*h*a+g*s*p-t*m*p-u*s*d+t*h*d)*b,e[6]=(g*l*a-r*m*a-g*s*c+t*m*c+r*s*d-t*l*d)*b,e[7]=(r*h*a-u*l*a+u*s*c-t*h*c-r*s*p+t*l*p)*b,e[8]=y*b,e[9]=(g*f*a-u*v*a-g*i*p+t*v*p+u*i*d-t*f*d)*b,e[10]=(r*v*a-g*o*a+g*i*c-t*v*c-r*i*d+t*o*d)*b,e[11]=(u*o*a-r*f*a-u*i*c+t*f*c+r*i*p-t*o*p)*b,e[12]=R*b,e[13]=(u*v*s-g*f*s+g*i*h-t*v*h-u*i*m+t*f*m)*b,e[14]=(g*o*s-r*v*s-g*i*l+t*v*l+r*i*m-t*o*m)*b,e[15]=(r*f*s-u*o*s+u*i*l-t*f*l-r*i*h+t*o*h)*b,this}scale(e){const t=this.elements,i=e.x,s=e.y,a=e.z;return t[0]*=i,t[4]*=s,t[8]*=a,t[1]*=i,t[5]*=s,t[9]*=a,t[2]*=i,t[6]*=s,t[10]*=a,t[3]*=i,t[7]*=s,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),a=1-i,r=e.x,o=e.y,l=e.z,c=a*r,u=a*o;return this.set(c*r+i,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+i,u*l-s*r,0,c*l-s*o,u*l+s*r,a*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,a,r){return this.set(1,i,a,0,e,1,r,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,a=t._x,r=t._y,o=t._z,l=t._w,c=a+a,u=r+r,f=o+o,h=a*c,p=a*u,g=a*f,v=r*u,m=r*f,d=o*f,_=l*c,x=l*u,y=l*f,R=i.x,w=i.y,b=i.z;return s[0]=(1-(v+d))*R,s[1]=(p+y)*R,s[2]=(g-x)*R,s[3]=0,s[4]=(p-y)*w,s[5]=(1-(h+d))*w,s[6]=(m+_)*w,s[7]=0,s[8]=(g+x)*b,s[9]=(m-_)*b,s[10]=(1-(h+v))*b,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let a=Pa.set(s[0],s[1],s[2]).length();const r=Pa.set(s[4],s[5],s[6]).length(),o=Pa.set(s[8],s[9],s[10]).length();this.determinant()<0&&(a=-a),e.x=s[12],e.y=s[13],e.z=s[14],si.copy(this);const c=1/a,u=1/r,f=1/o;return si.elements[0]*=c,si.elements[1]*=c,si.elements[2]*=c,si.elements[4]*=u,si.elements[5]*=u,si.elements[6]*=u,si.elements[8]*=f,si.elements[9]*=f,si.elements[10]*=f,t.setFromRotationMatrix(si),i.x=a,i.y=r,i.z=o,this}makePerspective(e,t,i,s,a,r,o=ji){const l=this.elements,c=2*a/(t-e),u=2*a/(i-s),f=(t+e)/(t-e),h=(i+s)/(i-s);let p,g;if(o===ji)p=-(r+a)/(r-a),g=-2*r*a/(r-a);else if(o===vu)p=-r/(r-a),g=-r*a/(r-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,a,r,o=ji){const l=this.elements,c=1/(t-e),u=1/(i-s),f=1/(r-a),h=(t+e)*c,p=(i+s)*u;let g,v;if(o===ji)g=(r+a)*f,v=-2*f;else if(o===vu)g=a*f,v=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Pa=new O,si=new Pe,Tb=new O(0,0,0),bb=new O(1,1,1),fs=new O,Ql=new O,Rn=new O,c_=new Pe,u_=new Ws;class Ti{constructor(e=0,t=0,i=0,s=Ti.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,a=s[0],r=s[4],o=s[8],l=s[1],c=s[5],u=s[9],f=s[2],h=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Ve(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-r,a)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ve(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,a),this._z=0);break;case"ZXY":this._x=Math.asin(Ve(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-Ve(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(Ve(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,a)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ve(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return c_.makeRotationFromQuaternion(e),this.setFromRotationMatrix(c_,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return u_.setFromEuler(this),this.setFromQuaternion(u_,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ti.DEFAULT_ORDER="XYZ";class Ny{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ab=0;const f_=new O,Ia=new Ws,Pi=new Pe,Jl=new O,co=new O,Rb=new O,wb=new Ws,h_=new O(1,0,0),d_=new O(0,1,0),p_=new O(0,0,1),m_={type:"added"},Cb={type:"removed"},Ba={type:"childadded",child:null},If={type:"childremoved",child:null};class At extends Yr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ab++}),this.uuid=hi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=At.DEFAULT_UP.clone();const e=new O,t=new Ti,i=new Ws,s=new O(1,1,1);function a(){i.setFromEuler(t,!1)}function r(){t.setFromQuaternion(i,void 0,!1)}t._onChange(a),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Pe},normalMatrix:{value:new Oe}}),this.matrix=new Pe,this.matrixWorld=new Pe,this.matrixAutoUpdate=At.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=At.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ny,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ia.setFromAxisAngle(e,t),this.quaternion.multiply(Ia),this}rotateOnWorldAxis(e,t){return Ia.setFromAxisAngle(e,t),this.quaternion.premultiply(Ia),this}rotateX(e){return this.rotateOnAxis(h_,e)}rotateY(e){return this.rotateOnAxis(d_,e)}rotateZ(e){return this.rotateOnAxis(p_,e)}translateOnAxis(e,t){return f_.copy(e).applyQuaternion(this.quaternion),this.position.add(f_.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(h_,e)}translateY(e){return this.translateOnAxis(d_,e)}translateZ(e){return this.translateOnAxis(p_,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Pi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Jl.copy(e):Jl.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),co.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Pi.lookAt(co,Jl,this.up):Pi.lookAt(Jl,co,this.up),this.quaternion.setFromRotationMatrix(Pi),s&&(Pi.extractRotation(s.matrixWorld),Ia.setFromRotationMatrix(Pi),this.quaternion.premultiply(Ia.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(m_),Ba.child=e,this.dispatchEvent(Ba),Ba.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Cb),If.child=e,this.dispatchEvent(If),If.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Pi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Pi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Pi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(m_),Ba.child=e,this.dispatchEvent(Ba),Ba.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const r=this.children[i].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(co,e,Rb),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(co,wb,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function a(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];a(e.shapes,f)}else a(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(a(e.materials,this.material[l]));s.material=o}else s.material=a(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(a(e.animations,l))}}if(t){const o=r(e.geometries),l=r(e.materials),c=r(e.textures),u=r(e.images),f=r(e.shapes),h=r(e.skeletons),p=r(e.animations),g=r(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function r(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}At.DEFAULT_UP=new O(0,1,0);At.DEFAULT_MATRIX_AUTO_UPDATE=!0;At.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ai=new O,Ii=new O,Bf=new O,Bi=new O,za=new O,Fa=new O,g_=new O,zf=new O,Ff=new O,Hf=new O,Gf=new it,Vf=new it,kf=new it;class ci{constructor(e=new O,t=new O,i=new O){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),ai.subVectors(e,t),s.cross(ai);const a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(e,t,i,s,a){ai.subVectors(s,t),Ii.subVectors(i,t),Bf.subVectors(e,t);const r=ai.dot(ai),o=ai.dot(Ii),l=ai.dot(Bf),c=Ii.dot(Ii),u=Ii.dot(Bf),f=r*c-o*o;if(f===0)return a.set(0,0,0),null;const h=1/f,p=(c*l-o*u)*h,g=(r*u-o*l)*h;return a.set(1-p-g,g,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Bi)===null?!1:Bi.x>=0&&Bi.y>=0&&Bi.x+Bi.y<=1}static getInterpolation(e,t,i,s,a,r,o,l){return this.getBarycoord(e,t,i,s,Bi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,Bi.x),l.addScaledVector(r,Bi.y),l.addScaledVector(o,Bi.z),l)}static getInterpolatedAttribute(e,t,i,s,a,r){return Gf.setScalar(0),Vf.setScalar(0),kf.setScalar(0),Gf.fromBufferAttribute(e,t),Vf.fromBufferAttribute(e,i),kf.fromBufferAttribute(e,s),r.setScalar(0),r.addScaledVector(Gf,a.x),r.addScaledVector(Vf,a.y),r.addScaledVector(kf,a.z),r}static isFrontFacing(e,t,i,s){return ai.subVectors(i,t),Ii.subVectors(e,t),ai.cross(Ii).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ai.subVectors(this.c,this.b),Ii.subVectors(this.a,this.b),ai.cross(Ii).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ci.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ci.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,a){return ci.getInterpolation(e,this.a,this.b,this.c,t,i,s,a)}containsPoint(e){return ci.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ci.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,a=this.c;let r,o;za.subVectors(s,i),Fa.subVectors(a,i),zf.subVectors(e,i);const l=za.dot(zf),c=Fa.dot(zf);if(l<=0&&c<=0)return t.copy(i);Ff.subVectors(e,s);const u=za.dot(Ff),f=Fa.dot(Ff);if(u>=0&&f<=u)return t.copy(s);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return r=l/(l-u),t.copy(i).addScaledVector(za,r);Hf.subVectors(e,a);const p=za.dot(Hf),g=Fa.dot(Hf);if(g>=0&&p<=g)return t.copy(a);const v=p*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(Fa,o);const m=u*g-p*f;if(m<=0&&f-u>=0&&p-g>=0)return g_.subVectors(a,s),o=(f-u)/(f-u+(p-g)),t.copy(s).addScaledVector(g_,o);const d=1/(m+v+h);return r=v*d,o=h*d,t.copy(i).addScaledVector(za,r).addScaledVector(Fa,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Oy={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},hs={h:0,s:0,l:0},$l={h:0,s:0,l:0};function Xf(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Le{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ye.toWorkingColorSpace(this,t),this}setRGB(e,t,i,s=Ye.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ye.toWorkingColorSpace(this,s),this}setHSL(e,t,i,s=Ye.workingColorSpace){if(e=nm(e,1),t=Ve(t,0,1),i=Ve(i,0,1),t===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+t):i+t-i*t,r=2*i-a;this.r=Xf(r,a,e+1/3),this.g=Xf(r,a,e),this.b=Xf(r,a,e-1/3)}return Ye.toWorkingColorSpace(this,s),this}setStyle(e,t=Qt){function i(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const r=s[1],o=s[2];switch(r){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=s[1],r=a.length;if(r===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(a,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Qt){const i=Oy[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Qi(e.r),this.g=Qi(e.g),this.b=Qi(e.b),this}copyLinearToSRGB(e){return this.r=vr(e.r),this.g=vr(e.g),this.b=vr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Qt){return Ye.fromWorkingColorSpace(nn.copy(this),e),Math.round(Ve(nn.r*255,0,255))*65536+Math.round(Ve(nn.g*255,0,255))*256+Math.round(Ve(nn.b*255,0,255))}getHexString(e=Qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ye.workingColorSpace){Ye.fromWorkingColorSpace(nn.copy(this),t);const i=nn.r,s=nn.g,a=nn.b,r=Math.max(i,s,a),o=Math.min(i,s,a);let l,c;const u=(o+r)/2;if(o===r)l=0,c=0;else{const f=r-o;switch(c=u<=.5?f/(r+o):f/(2-r-o),r){case i:l=(s-a)/f+(s<a?6:0);break;case s:l=(a-i)/f+2;break;case a:l=(i-s)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Ye.workingColorSpace){return Ye.fromWorkingColorSpace(nn.copy(this),t),e.r=nn.r,e.g=nn.g,e.b=nn.b,e}getStyle(e=Qt){Ye.fromWorkingColorSpace(nn.copy(this),e);const t=nn.r,i=nn.g,s=nn.b;return e!==Qt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(hs),this.setHSL(hs.h+e,hs.s+t,hs.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(hs),e.getHSL($l);const i=Fo(hs.h,$l.h,t),s=Fo(hs.s,$l.s,t),a=Fo(hs.l,$l.l,t);return this.setHSL(i,s,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*s,this.g=a[1]*t+a[4]*i+a[7]*s,this.b=a[2]*t+a[5]*i+a[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const nn=new Le;Le.NAMES=Oy;let Db=0;class Ei extends Yr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Db++}),this.uuid=hi(),this.name="",this.type="Material",this.blending=_r,this.side=ns,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=sd,this.blendDst=ad,this.blendEquation=oa,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Le(0,0,0),this.blendAlpha=0,this.depthFunc=Lr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=n_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Da,this.stencilZFail=Da,this.stencilZPass=Da,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==_r&&(i.blending=this.blending),this.side!==ns&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==sd&&(i.blendSrc=this.blendSrc),this.blendDst!==ad&&(i.blendDst=this.blendDst),this.blendEquation!==oa&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Lr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==n_&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Da&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Da&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Da&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(a){const r=[];for(const o in a){const l=a[o];delete l.metadata,r.push(l)}return r}if(t){const a=s(e.textures),r=s(e.images);a.length>0&&(i.textures=a),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let a=0;a!==s;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class xi extends Ei{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Le(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ti,this.combine=gy,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Pt=new O,ec=new Ke;let Lb=0;class pn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Lb++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Vd,this.updateRanges=[],this.gpuType=ui,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ec.fromBufferAttribute(this,t),ec.applyMatrix3(e),this.setXY(t,ec.x,ec.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix3(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix4(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyNormalMatrix(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.transformDirection(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=li(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=ct(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=li(t,this.array)),t}setX(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=li(t,this.array)),t}setY(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=li(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=li(t,this.array)),t}setW(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),i=ct(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),i=ct(i,this.array),s=ct(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,a){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),i=ct(i,this.array),s=ct(s,this.array),a=ct(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Vd&&(e.usage=this.usage),e}}class Py extends pn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Iy extends pn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Bn extends pn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Ub=0;const Vn=new Pe,Wf=new At,Ha=new O,wn=new as,uo=new as,kt=new O;class ei extends Yr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ub++}),this.uuid=hi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ly(e)?Iy:Py)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new Oe().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Vn.makeRotationFromQuaternion(e),this.applyMatrix4(Vn),this}rotateX(e){return Vn.makeRotationX(e),this.applyMatrix4(Vn),this}rotateY(e){return Vn.makeRotationY(e),this.applyMatrix4(Vn),this}rotateZ(e){return Vn.makeRotationZ(e),this.applyMatrix4(Vn),this}translate(e,t,i){return Vn.makeTranslation(e,t,i),this.applyMatrix4(Vn),this}scale(e,t,i){return Vn.makeScale(e,t,i),this.applyMatrix4(Vn),this}lookAt(e){return Wf.lookAt(e),Wf.updateMatrix(),this.applyMatrix4(Wf.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ha).negate(),this.translate(Ha.x,Ha.y,Ha.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,a=e.length;s<a;s++){const r=e[s];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new Bn(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const a=e[s];t.setXYZ(s,a.x,a.y,a.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new as);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const a=t[i];wn.setFromBufferAttribute(a),this.morphTargetsRelative?(kt.addVectors(this.boundingBox.min,wn.min),this.boundingBox.expandByPoint(kt),kt.addVectors(this.boundingBox.max,wn.max),this.boundingBox.expandByPoint(kt)):(this.boundingBox.expandByPoint(wn.min),this.boundingBox.expandByPoint(wn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ri);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(e){const i=this.boundingSphere.center;if(wn.setFromBufferAttribute(e),t)for(let a=0,r=t.length;a<r;a++){const o=t[a];uo.setFromBufferAttribute(o),this.morphTargetsRelative?(kt.addVectors(wn.min,uo.min),wn.expandByPoint(kt),kt.addVectors(wn.max,uo.max),wn.expandByPoint(kt)):(wn.expandByPoint(uo.min),wn.expandByPoint(uo.max))}wn.getCenter(i);let s=0;for(let a=0,r=e.count;a<r;a++)kt.fromBufferAttribute(e,a),s=Math.max(s,i.distanceToSquared(kt));if(t)for(let a=0,r=t.length;a<r;a++){const o=t[a],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)kt.fromBufferAttribute(o,c),l&&(Ha.fromBufferAttribute(e,c),kt.add(Ha)),s=Math.max(s,i.distanceToSquared(kt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,a=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new pn(new Float32Array(4*i.count),4));const r=this.getAttribute("tangent"),o=[],l=[];for(let C=0;C<i.count;C++)o[C]=new O,l[C]=new O;const c=new O,u=new O,f=new O,h=new Ke,p=new Ke,g=new Ke,v=new O,m=new O;function d(C,T,S){c.fromBufferAttribute(i,C),u.fromBufferAttribute(i,T),f.fromBufferAttribute(i,S),h.fromBufferAttribute(a,C),p.fromBufferAttribute(a,T),g.fromBufferAttribute(a,S),u.sub(c),f.sub(c),p.sub(h),g.sub(h);const L=1/(p.x*g.y-g.x*p.y);isFinite(L)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(f,-p.y).multiplyScalar(L),m.copy(f).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(L),o[C].add(v),o[T].add(v),o[S].add(v),l[C].add(m),l[T].add(m),l[S].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let C=0,T=_.length;C<T;++C){const S=_[C],L=S.start,X=S.count;for(let G=L,Z=L+X;G<Z;G+=3)d(e.getX(G+0),e.getX(G+1),e.getX(G+2))}const x=new O,y=new O,R=new O,w=new O;function b(C){R.fromBufferAttribute(s,C),w.copy(R);const T=o[C];x.copy(T),x.sub(R.multiplyScalar(R.dot(T))).normalize(),y.crossVectors(w,T);const L=y.dot(l[C])<0?-1:1;r.setXYZW(C,x.x,x.y,x.z,L)}for(let C=0,T=_.length;C<T;++C){const S=_[C],L=S.start,X=S.count;for(let G=L,Z=L+X;G<Z;G+=3)b(e.getX(G+0)),b(e.getX(G+1)),b(e.getX(G+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new pn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const s=new O,a=new O,r=new O,o=new O,l=new O,c=new O,u=new O,f=new O;if(e)for(let h=0,p=e.count;h<p;h+=3){const g=e.getX(h+0),v=e.getX(h+1),m=e.getX(h+2);s.fromBufferAttribute(t,g),a.fromBufferAttribute(t,v),r.fromBufferAttribute(t,m),u.subVectors(r,a),f.subVectors(s,a),u.cross(f),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=t.count;h<p;h+=3)s.fromBufferAttribute(t,h+0),a.fromBufferAttribute(t,h+1),r.fromBufferAttribute(t,h+2),u.subVectors(r,a),f.subVectors(s,a),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)kt.fromBufferAttribute(e,t),kt.normalize(),e.setXYZ(t,kt.x,kt.y,kt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,f=o.normalized,h=new c.constructor(l.length*u);let p=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?p=l[v]*o.data.stride+o.offset:p=l[v]*u;for(let d=0;d<u;d++)h[g++]=c[p++]}return new pn(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ei,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,i);t.setAttribute(o,c)}const a=this.morphAttributes;for(const o in a){const l=[],c=a[o];for(let u=0,f=c.length;u<f;u++){const h=c[u],p=e(h,i);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,l=r.length;o<l;o++){const c=r[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let a=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const p=c[f];u.push(p.toJSON(e.data))}u.length>0&&(s[l]=u,a=!0)}a&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const a=e.morphAttributes;for(const c in a){const u=[],f=a[c];for(let h=0,p=f.length;h<p;h++)u.push(f[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let c=0,u=r.length;c<u;c++){const f=r[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const __=new Pe,Qs=new Hu,tc=new Ri,v_=new O,nc=new O,ic=new O,sc=new O,qf=new O,ac=new O,x_=new O,rc=new O;class rn extends At{constructor(e=new ei,t=new xi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,a=i.morphAttributes.position,r=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(a&&o){ac.set(0,0,0);for(let l=0,c=a.length;l<c;l++){const u=o[l],f=a[l];u!==0&&(qf.fromBufferAttribute(f,e),r?ac.addScaledVector(qf,u):ac.addScaledVector(qf.sub(t),u))}t.add(ac)}return t}raycast(e,t){const i=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),tc.copy(i.boundingSphere),tc.applyMatrix4(a),Qs.copy(e.ray).recast(e.near),!(tc.containsPoint(Qs.origin)===!1&&(Qs.intersectSphere(tc,v_)===null||Qs.origin.distanceToSquared(v_)>(e.far-e.near)**2))&&(__.copy(a).invert(),Qs.copy(e.ray).applyMatrix4(__),!(i.boundingBox!==null&&Qs.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Qs)))}_computeIntersections(e,t,i){let s;const a=this.geometry,r=this.material,o=a.index,l=a.attributes.position,c=a.attributes.uv,u=a.attributes.uv1,f=a.attributes.normal,h=a.groups,p=a.drawRange;if(o!==null)if(Array.isArray(r))for(let g=0,v=h.length;g<v;g++){const m=h[g],d=r[m.materialIndex],_=Math.max(m.start,p.start),x=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let y=_,R=x;y<R;y+=3){const w=o.getX(y),b=o.getX(y+1),C=o.getX(y+2);s=oc(this,d,e,i,c,u,f,w,b,C),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let m=g,d=v;m<d;m+=3){const _=o.getX(m),x=o.getX(m+1),y=o.getX(m+2);s=oc(this,r,e,i,c,u,f,_,x,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(r))for(let g=0,v=h.length;g<v;g++){const m=h[g],d=r[m.materialIndex],_=Math.max(m.start,p.start),x=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=_,R=x;y<R;y+=3){const w=y,b=y+1,C=y+2;s=oc(this,d,e,i,c,u,f,w,b,C),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let m=g,d=v;m<d;m+=3){const _=m,x=m+1,y=m+2;s=oc(this,r,e,i,c,u,f,_,x,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Nb(n,e,t,i,s,a,r,o){let l;if(e.side===Sn?l=i.intersectTriangle(r,a,s,!0,o):l=i.intersectTriangle(s,a,r,e.side===ns,o),l===null)return null;rc.copy(o),rc.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(rc);return c<t.near||c>t.far?null:{distance:c,point:rc.clone(),object:n}}function oc(n,e,t,i,s,a,r,o,l,c){n.getVertexPosition(o,nc),n.getVertexPosition(l,ic),n.getVertexPosition(c,sc);const u=Nb(n,e,t,i,nc,ic,sc,x_);if(u){const f=new O;ci.getBarycoord(x_,nc,ic,sc,f),s&&(u.uv=ci.getInterpolatedAttribute(s,o,l,c,f,new Ke)),a&&(u.uv1=ci.getInterpolatedAttribute(a,o,l,c,f,new Ke)),r&&(u.normal=ci.getInterpolatedAttribute(r,o,l,c,f,new O),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new O,materialIndex:0};ci.getNormal(nc,ic,sc,h.normal),u.face=h,u.barycoord=f}return u}class bl extends ei{constructor(e=1,t=1,i=1,s=1,a=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:a,depthSegments:r};const o=this;s=Math.floor(s),a=Math.floor(a),r=Math.floor(r);const l=[],c=[],u=[],f=[];let h=0,p=0;g("z","y","x",-1,-1,i,t,e,r,a,0),g("z","y","x",1,-1,i,t,-e,r,a,1),g("x","z","y",1,1,e,i,t,s,r,2),g("x","z","y",1,-1,e,i,-t,s,r,3),g("x","y","z",1,-1,e,t,i,s,a,4),g("x","y","z",-1,-1,e,t,-i,s,a,5),this.setIndex(l),this.setAttribute("position",new Bn(c,3)),this.setAttribute("normal",new Bn(u,3)),this.setAttribute("uv",new Bn(f,2));function g(v,m,d,_,x,y,R,w,b,C,T){const S=y/b,L=R/C,X=y/2,G=R/2,Z=w/2,Q=b+1,N=C+1;let V=0,B=0;const ee=new O;for(let se=0;se<N;se++){const ve=se*L-G;for(let Ue=0;Ue<Q;Ue++){const et=Ue*S-X;ee[v]=et*_,ee[m]=ve*x,ee[d]=Z,c.push(ee.x,ee.y,ee.z),ee[v]=0,ee[m]=0,ee[d]=w>0?1:-1,u.push(ee.x,ee.y,ee.z),f.push(Ue/b),f.push(1-se/C),V+=1}}for(let se=0;se<C;se++)for(let ve=0;ve<b;ve++){const Ue=h+ve+Q*se,et=h+ve+Q*(se+1),W=h+(ve+1)+Q*(se+1),ie=h+(ve+1)+Q*se;l.push(Ue,et,ie),l.push(et,W,ie),B+=6}o.addGroup(p,B,T),p+=B,h+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bl(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ir(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function cn(n){const e={};for(let t=0;t<n.length;t++){const i=Ir(n[t]);for(const s in i)e[s]=i[s]}return e}function Ob(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function By(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ye.workingColorSpace}const Pb={clone:Ir,merge:cn};var Ib=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Bb=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Vs extends Ei{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ib,this.fragmentShader=Bb,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ir(e.uniforms),this.uniformsGroups=Ob(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const r=this.uniforms[s].value;r&&r.isTexture?t.uniforms[s]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[s]={type:"m4",value:r.toArray()}:t.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class zy extends At{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Pe,this.projectionMatrix=new Pe,this.projectionMatrixInverse=new Pe,this.coordinateSystem=ji}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ds=new O,y_=new Ke,S_=new Ke;class un extends zy{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Pr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(zo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Pr*2*Math.atan(Math.tan(zo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){ds.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ds.x,ds.y).multiplyScalar(-e/ds.z),ds.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ds.x,ds.y).multiplyScalar(-e/ds.z)}getViewSize(e,t){return this.getViewBounds(e,y_,S_),t.subVectors(S_,y_)}setViewOffset(e,t,i,s,a,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(zo*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,a=-.5*s;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;a+=r.offsetX*s/l,t-=r.offsetY*i/c,s*=r.width/l,i*=r.height/c}const o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ga=-90,Va=1;class zb extends At{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new un(Ga,Va,e,t);s.layers=this.layers,this.add(s);const a=new un(Ga,Va,e,t);a.layers=this.layers,this.add(a);const r=new un(Ga,Va,e,t);r.layers=this.layers,this.add(r);const o=new un(Ga,Va,e,t);o.layers=this.layers,this.add(o);const l=new un(Ga,Va,e,t);l.layers=this.layers,this.add(l);const c=new un(Ga,Va,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,a,r,o,l]=t;for(const c of t)this.remove(c);if(e===ji)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===vu)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,r,o,l,c,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,a),e.setRenderTarget(i,1,s),e.render(t,r),e.setRenderTarget(i,2,s),e.render(t,o),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,s),e.render(t,u),e.setRenderTarget(f,h,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Fy extends jt{constructor(e=[],t=Ur,i,s,a,r,o,l,c,u){super(e,t,i,s,a,r,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Fb extends Ma{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Fy(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Un}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new bl(5,5,5),a=new Vs({name:"CubemapFromEquirect",uniforms:Ir(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Sn,blending:Bs});a.uniforms.tEquirect.value=t;const r=new rn(s,a),o=t.minFilter;return t.minFilter===Yi&&(t.minFilter=Un),new zb(1,10,this).update(e,r),t.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const a=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,i,s);e.setRenderTarget(a)}}class ca extends At{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Hb={type:"move"};class Yf{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ca,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ca,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ca,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,a=null,r=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){r=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,i),d=this._getHandJoint(c,v);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),p=.02,g=.005;c.inputState.pinching&&h>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&a!==null&&(s=a),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Hb)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new ca;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Gb extends At{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ti,this.environmentIntensity=1,this.environmentRotation=new Ti,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Vb{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Vd,this.updateRanges=[],this.version=0,this.uuid=hi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,a=this.stride;s<a;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const ln=new O;class sm{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)ln.fromBufferAttribute(this,t),ln.applyMatrix4(e),this.setXYZ(t,ln.x,ln.y,ln.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)ln.fromBufferAttribute(this,t),ln.applyNormalMatrix(e),this.setXYZ(t,ln.x,ln.y,ln.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)ln.fromBufferAttribute(this,t),ln.transformDirection(e),this.setXYZ(t,ln.x,ln.y,ln.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=li(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=ct(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=li(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=li(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=li(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=li(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),i=ct(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),i=ct(i,this.array),s=ct(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,a){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),i=ct(i,this.array),s=ct(s,this.array),a=ct(a,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=a,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)t.push(this.data.array[s+a])}return new pn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new sm(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)t.push(this.data.array[s+a])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const M_=new O,E_=new it,T_=new it,kb=new O,b_=new Pe,lc=new O,jf=new Ri,A_=new Pe,Kf=new Hu;class Xb extends rn{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Jg,this.bindMatrix=new Pe,this.bindMatrixInverse=new Pe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new as),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,lc),this.boundingBox.expandByPoint(lc)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Ri),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,lc),this.boundingSphere.expandByPoint(lc)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const i=this.material,s=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),jf.copy(this.boundingSphere),jf.applyMatrix4(s),e.ray.intersectsSphere(jf)!==!1&&(A_.copy(s).invert(),Kf.copy(e.ray).applyMatrix4(A_),!(this.boundingBox!==null&&Kf.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Kf)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new it,t=this.geometry.attributes.skinWeight;for(let i=0,s=t.count;i<s;i++){e.fromBufferAttribute(t,i);const a=1/e.manhattanLength();a!==1/0?e.multiplyScalar(a):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Jg?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===zT?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const i=this.skeleton,s=this.geometry;E_.fromBufferAttribute(s.attributes.skinIndex,e),T_.fromBufferAttribute(s.attributes.skinWeight,e),M_.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let a=0;a<4;a++){const r=T_.getComponent(a);if(r!==0){const o=E_.getComponent(a);b_.multiplyMatrices(i.bones[o].matrixWorld,i.boneInverses[o]),t.addScaledVector(kb.copy(M_).applyMatrix4(b_),r)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Hy extends At{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Gy extends jt{constructor(e=null,t=1,i=1,s,a,r,o,l,c=dn,u=dn,f,h){super(null,r,o,l,c,u,s,a,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const R_=new Pe,Wb=new Pe;class am{constructor(e=[],t=[]){this.uuid=hi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,s=this.bones.length;i<s;i++)this.boneInverses.push(new Pe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const i=new Pe;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){const e=this.bones,t=this.boneInverses,i=this.boneMatrices,s=this.boneTexture;for(let a=0,r=e.length;a<r;a++){const o=e[a]?e[a].matrixWorld:Wb;R_.multiplyMatrices(o,t[a]),R_.toArray(i,a*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new am(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const i=new Gy(t,e,e,Qn,ui);return i.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=i,this}getBoneByName(e){for(let t=0,i=this.bones.length;t<i;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let i=0,s=e.bones.length;i<s;i++){const a=e.bones[i];let r=t[a];r===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",a),r=new Hy),this.bones.push(r),this.boneInverses.push(new Pe().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,i=this.boneInverses;for(let s=0,a=t.length;s<a;s++){const r=t[s];e.bones.push(r.uuid);const o=i[s];e.boneInverses.push(o.toArray())}return e}}class kd extends pn{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ka=new Pe,w_=new Pe,cc=[],C_=new as,qb=new Pe,fo=new rn,ho=new Ri;class Yb extends rn{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new kd(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,qb)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new as),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,ka),C_.copy(e.boundingBox).applyMatrix4(ka),this.boundingBox.union(C_)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ri),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,ka),ho.copy(e.boundingSphere).applyMatrix4(ka),this.boundingSphere.union(ho)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,a=i.length+1,r=e*a+1;for(let o=0;o<i.length;o++)i[o]=s[r+o]}raycast(e,t){const i=this.matrixWorld,s=this.count;if(fo.geometry=this.geometry,fo.material=this.material,fo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ho.copy(this.boundingSphere),ho.applyMatrix4(i),e.ray.intersectsSphere(ho)!==!1))for(let a=0;a<s;a++){this.getMatrixAt(a,ka),w_.multiplyMatrices(i,ka),fo.matrixWorld=w_,fo.raycast(e,cc);for(let r=0,o=cc.length;r<o;r++){const l=cc[r];l.instanceId=a,l.object=this,t.push(l)}cc.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new kd(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new Gy(new Float32Array(s*this.count),s,this.count,Jp,ui));const a=this.morphTexture.source.data.data;let r=0;for(let c=0;c<i.length;c++)r+=i[c];const o=this.geometry.morphTargetsRelative?1:1-r,l=s*e;a[l]=o,a.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Zf=new O,jb=new O,Kb=new Oe;class aa{constructor(e=new O(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Zf.subVectors(i,t).cross(jb.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Zf),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return a<0||a>1?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Kb.getNormalMatrix(e),s=this.coplanarPoint(Zf).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Js=new Ri,uc=new O;class rm{constructor(e=new aa,t=new aa,i=new aa,s=new aa,a=new aa,r=new aa){this.planes=[e,t,i,s,a,r]}set(e,t,i,s,a,r){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(a),o[5].copy(r),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=ji){const i=this.planes,s=e.elements,a=s[0],r=s[1],o=s[2],l=s[3],c=s[4],u=s[5],f=s[6],h=s[7],p=s[8],g=s[9],v=s[10],m=s[11],d=s[12],_=s[13],x=s[14],y=s[15];if(i[0].setComponents(l-a,h-c,m-p,y-d).normalize(),i[1].setComponents(l+a,h+c,m+p,y+d).normalize(),i[2].setComponents(l+r,h+u,m+g,y+_).normalize(),i[3].setComponents(l-r,h-u,m-g,y-_).normalize(),i[4].setComponents(l-o,h-f,m-v,y-x).normalize(),t===ji)i[5].setComponents(l+o,h+f,m+v,y+x).normalize();else if(t===vu)i[5].setComponents(o,f,v,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Js.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Js.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Js)}intersectsSprite(e){return Js.center.set(0,0,0),Js.radius=.7071067811865476,Js.applyMatrix4(e.matrixWorld),this.intersectsSphere(Js)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(uc.x=s.normal.x>0?e.max.x:e.min.x,uc.y=s.normal.y>0?e.max.y:e.min.y,uc.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(uc)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Vy extends Ei{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Le(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const xu=new O,yu=new O,D_=new Pe,po=new Hu,fc=new Ri,Qf=new O,L_=new O;class om extends At{constructor(e=new ei,t=new Vy){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,a=t.count;s<a;s++)xu.fromBufferAttribute(t,s-1),yu.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=xu.distanceTo(yu);e.setAttribute("lineDistance",new Bn(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,a=e.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),fc.copy(i.boundingSphere),fc.applyMatrix4(s),fc.radius+=a,e.ray.intersectsSphere(fc)===!1)return;D_.copy(s).invert(),po.copy(e.ray).applyMatrix4(D_);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const p=Math.max(0,r.start),g=Math.min(u.count,r.start+r.count);for(let v=p,m=g-1;v<m;v+=c){const d=u.getX(v),_=u.getX(v+1),x=hc(this,e,po,l,d,_,v);x&&t.push(x)}if(this.isLineLoop){const v=u.getX(g-1),m=u.getX(p),d=hc(this,e,po,l,v,m,g-1);d&&t.push(d)}}else{const p=Math.max(0,r.start),g=Math.min(h.count,r.start+r.count);for(let v=p,m=g-1;v<m;v+=c){const d=hc(this,e,po,l,v,v+1,v);d&&t.push(d)}if(this.isLineLoop){const v=hc(this,e,po,l,g-1,p,g-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function hc(n,e,t,i,s,a,r){const o=n.geometry.attributes.position;if(xu.fromBufferAttribute(o,s),yu.fromBufferAttribute(o,a),t.distanceSqToSegment(xu,yu,Qf,L_)>i)return;Qf.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Qf);if(!(c<e.near||c>e.far))return{distance:c,point:L_.clone().applyMatrix4(n.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:n}}const U_=new O,N_=new O;class Zb extends om{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,a=t.count;s<a;s+=2)U_.fromBufferAttribute(t,s),N_.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+U_.distanceTo(N_);e.setAttribute("lineDistance",new Bn(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Qb extends om{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class lm extends Ei{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Le(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const O_=new Pe,Xd=new Hu,dc=new Ri,pc=new O;class Wd extends At{constructor(e=new ei,t=new lm){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,a=e.params.Points.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),dc.copy(i.boundingSphere),dc.applyMatrix4(s),dc.radius+=a,e.ray.intersectsSphere(dc)===!1)return;O_.copy(s).invert(),Xd.copy(e.ray).applyMatrix4(O_);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,f=i.attributes.position;if(c!==null){const h=Math.max(0,r.start),p=Math.min(c.count,r.start+r.count);for(let g=h,v=p;g<v;g++){const m=c.getX(g);pc.fromBufferAttribute(f,m),P_(pc,m,l,s,e,t,this)}}else{const h=Math.max(0,r.start),p=Math.min(f.count,r.start+r.count);for(let g=h,v=p;g<v;g++)pc.fromBufferAttribute(f,g),P_(pc,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function P_(n,e,t,i,s,a,r){const o=Xd.distanceSqToPoint(n);if(o<t){const l=new O;Xd.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;a.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:r})}}class ky extends jt{constructor(e,t,i=Sa,s,a,r,o=dn,l=dn,c,u=il){if(u!==il&&u!==sl)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super(null,s,a,r,o,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new im(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Al extends ei{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const a=e/2,r=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,u=l+1,f=e/o,h=t/l,p=[],g=[],v=[],m=[];for(let d=0;d<u;d++){const _=d*h-r;for(let x=0;x<c;x++){const y=x*f-a;g.push(y,-_,0),v.push(0,0,1),m.push(x/o),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let _=0;_<o;_++){const x=_+c*d,y=_+c*(d+1),R=_+1+c*(d+1),w=_+1+c*d;p.push(x,y,w),p.push(y,R,w)}this.setIndex(p),this.setAttribute("position",new Bn(g,3)),this.setAttribute("normal",new Bn(v,3)),this.setAttribute("uv",new Bn(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Al(e.width,e.height,e.widthSegments,e.heightSegments)}}class cm extends ei{constructor(e=1,t=32,i=16,s=0,a=Math.PI*2,r=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:a,thetaStart:r,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(r+o,Math.PI);let c=0;const u=[],f=new O,h=new O,p=[],g=[],v=[],m=[];for(let d=0;d<=i;d++){const _=[],x=d/i;let y=0;d===0&&r===0?y=.5/t:d===i&&l===Math.PI&&(y=-.5/t);for(let R=0;R<=t;R++){const w=R/t;f.x=-e*Math.cos(s+w*a)*Math.sin(r+x*o),f.y=e*Math.cos(r+x*o),f.z=e*Math.sin(s+w*a)*Math.sin(r+x*o),g.push(f.x,f.y,f.z),h.copy(f).normalize(),v.push(h.x,h.y,h.z),m.push(w+y,1-x),_.push(c++)}u.push(_)}for(let d=0;d<i;d++)for(let _=0;_<t;_++){const x=u[d][_+1],y=u[d][_],R=u[d+1][_],w=u[d+1][_+1];(d!==0||r>0)&&p.push(x,y,w),(d!==i-1||l<Math.PI)&&p.push(y,R,w)}this.setIndex(p),this.setAttribute("position",new Bn(g,3)),this.setAttribute("normal",new Bn(v,3)),this.setAttribute("uv",new Bn(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cm(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class um extends Ei{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Le(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Cy,this.normalScale=new Ke(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ti,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class wi extends um{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ke(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ve(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Le(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Le(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Le(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Jb extends Ei{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=GT,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class $b extends Ei{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function mc(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function eA(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function tA(n){function e(s,a){return n[s]-n[a]}const t=n.length,i=new Array(t);for(let s=0;s!==t;++s)i[s]=s;return i.sort(e),i}function I_(n,e,t){const i=n.length,s=new n.constructor(i);for(let a=0,r=0;r!==i;++a){const o=t[a]*e;for(let l=0;l!==e;++l)s[r++]=n[o+l]}return s}function Xy(n,e,t,i){let s=1,a=n[0];for(;a!==void 0&&a[i]===void 0;)a=n[s++];if(a===void 0)return;let r=a[i];if(r!==void 0)if(Array.isArray(r))do r=a[i],r!==void 0&&(e.push(a.time),t.push(...r)),a=n[s++];while(a!==void 0);else if(r.toArray!==void 0)do r=a[i],r!==void 0&&(e.push(a.time),r.toArray(t,t.length)),a=n[s++];while(a!==void 0);else do r=a[i],r!==void 0&&(e.push(a.time),t.push(r)),a=n[s++];while(a!==void 0)}class Rl{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let i=this._cachedIndex,s=t[i],a=t[i-1];e:{t:{let r;n:{i:if(!(e<s)){for(let o=i+2;;){if(s===void 0){if(e<a)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(a=s,s=t[++i],e<s)break t}r=t.length;break n}if(!(e>=a)){const o=t[1];e<o&&(i=2,a=o);for(let l=i-2;;){if(a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=a,a=t[--i-1],e>=a)break t}r=i,i=0;break n}break e}for(;i<r;){const o=i+r>>>1;e<t[o]?r=o:i=o+1}if(s=t[i],a=t[i-1],a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,a,s)}return this.interpolate_(i,a,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,a=e*s;for(let r=0;r!==s;++r)t[r]=i[a+r];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class nA extends Rl{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:$g,endingEnd:$g}}intervalChanged_(e,t,i){const s=this.parameterPositions;let a=e-2,r=e+1,o=s[a],l=s[r];if(o===void 0)switch(this.getSettings_().endingStart){case e_:a=e,o=2*t-i;break;case t_:a=s.length-2,o=t+s[a]-s[a+1];break;default:a=e,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case e_:r=e,l=2*i-t;break;case t_:r=1,l=i+s[1]-s[0];break;default:r=e-1,l=t}const c=(i-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-i),this._offsetPrev=a*u,this._offsetNext=r*u}interpolate_(e,t,i,s){const a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,f=this._offsetNext,h=this._weightPrev,p=this._weightNext,g=(i-t)/(s-t),v=g*g,m=v*g,d=-h*m+2*h*v-h*g,_=(1+h)*m+(-1.5-2*h)*v+(-.5+h)*g+1,x=(-1-p)*m+(1.5+p)*v+.5*g,y=p*m-p*v;for(let R=0;R!==o;++R)a[R]=d*r[u+R]+_*r[c+R]+x*r[l+R]+y*r[f+R];return a}}class iA extends Rl{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){const a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(i-t)/(s-t),f=1-u;for(let h=0;h!==o;++h)a[h]=r[c+h]*f+r[l+h]*u;return a}}class sA extends Rl{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class pi{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=mc(t,this.TimeBufferType),this.values=mc(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:mc(e.times,Array),values:mc(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new sA(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new iA(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new nA(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case al:t=this.InterpolantFactoryMethodDiscrete;break;case rl:t=this.InterpolantFactoryMethodLinear;break;case Rf:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return al;case this.InterpolantFactoryMethodLinear:return rl;case this.InterpolantFactoryMethodSmooth:return Rf}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e}return this}trim(e,t){const i=this.times,s=i.length;let a=0,r=s-1;for(;a!==s&&i[a]<e;)++a;for(;r!==-1&&i[r]>t;)--r;if(++r,a!==0||r!==s){a>=r&&(r=Math.max(r,1),a=r-1);const o=this.getValueSize();this.times=i.slice(a,r),this.values=this.values.slice(a*o,r*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const i=this.times,s=this.values,a=i.length;a===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let r=null;for(let o=0;o!==a;o++){const l=i[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(r!==null&&r>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,r),e=!1;break}r=l}if(s!==void 0&&eA(s))for(let o=0,l=s.length;o!==l;++o){const c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Rf,a=e.length-1;let r=1;for(let o=1;o<a;++o){let l=!1;const c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(s)l=!0;else{const f=o*i,h=f-i,p=f+i;for(let g=0;g!==i;++g){const v=t[f+g];if(v!==t[h+g]||v!==t[p+g]){l=!0;break}}}if(l){if(o!==r){e[r]=e[o];const f=o*i,h=r*i;for(let p=0;p!==i;++p)t[h+p]=t[f+p]}++r}}if(a>0){e[r]=e[a];for(let o=a*i,l=r*i,c=0;c!==i;++c)t[l+c]=t[o+c];++r}return r!==e.length?(this.times=e.slice(0,r),this.values=t.slice(0,r*i)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}pi.prototype.ValueTypeName="";pi.prototype.TimeBufferType=Float32Array;pi.prototype.ValueBufferType=Float32Array;pi.prototype.DefaultInterpolation=rl;class jr extends pi{constructor(e,t,i){super(e,t,i)}}jr.prototype.ValueTypeName="bool";jr.prototype.ValueBufferType=Array;jr.prototype.DefaultInterpolation=al;jr.prototype.InterpolantFactoryMethodLinear=void 0;jr.prototype.InterpolantFactoryMethodSmooth=void 0;class Wy extends pi{constructor(e,t,i,s){super(e,t,i,s)}}Wy.prototype.ValueTypeName="color";class Br extends pi{constructor(e,t,i,s){super(e,t,i,s)}}Br.prototype.ValueTypeName="number";class aA extends Rl{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){const a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=(i-t)/(s-t);let c=e*o;for(let u=c+o;c!==u;c+=4)Ws.slerpFlat(a,0,r,c-o,r,c,l);return a}}class zr extends pi{constructor(e,t,i,s){super(e,t,i,s)}InterpolantFactoryMethodLinear(e){return new aA(this.times,this.values,this.getValueSize(),e)}}zr.prototype.ValueTypeName="quaternion";zr.prototype.InterpolantFactoryMethodSmooth=void 0;class Kr extends pi{constructor(e,t,i){super(e,t,i)}}Kr.prototype.ValueTypeName="string";Kr.prototype.ValueBufferType=Array;Kr.prototype.DefaultInterpolation=al;Kr.prototype.InterpolantFactoryMethodLinear=void 0;Kr.prototype.InterpolantFactoryMethodSmooth=void 0;class Fr extends pi{constructor(e,t,i,s){super(e,t,i,s)}}Fr.prototype.ValueTypeName="vector";class rA{constructor(e="",t=-1,i=[],s=FT){this.name=e,this.tracks=i,this.duration=t,this.blendMode=s,this.uuid=hi(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],i=e.tracks,s=1/(e.fps||1);for(let r=0,o=i.length;r!==o;++r)t.push(lA(i[r]).scale(s));const a=new this(e.name,e.duration,t,e.blendMode);return a.uuid=e.uuid,a}static toJSON(e){const t=[],i=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let a=0,r=i.length;a!==r;++a)t.push(pi.toJSON(i[a]));return s}static CreateFromMorphTargetSequence(e,t,i,s){const a=t.length,r=[];for(let o=0;o<a;o++){let l=[],c=[];l.push((o+a-1)%a,o,(o+1)%a),c.push(0,1,0);const u=tA(l);l=I_(l,1,u),c=I_(c,1,u),!s&&l[0]===0&&(l.push(a),c.push(c[0])),r.push(new Br(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/i))}return new this(e,-1,r)}static findByName(e,t){let i=e;if(!Array.isArray(e)){const s=e;i=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<i.length;s++)if(i[s].name===t)return i[s];return null}static CreateClipsFromMorphTargetSequences(e,t,i){const s={},a=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],u=c.name.match(a);if(u&&u.length>1){const f=u[1];let h=s[f];h||(s[f]=h=[]),h.push(c)}}const r=[];for(const o in s)r.push(this.CreateFromMorphTargetSequence(o,s[o],t,i));return r}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const i=function(f,h,p,g,v){if(p.length!==0){const m=[],d=[];Xy(p,m,d,g),m.length!==0&&v.push(new f(h,m,d))}},s=[],a=e.name||"default",r=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let f=0;f<c.length;f++){const h=c[f].keys;if(!(!h||h.length===0))if(h[0].morphTargets){const p={};let g;for(g=0;g<h.length;g++)if(h[g].morphTargets)for(let v=0;v<h[g].morphTargets.length;v++)p[h[g].morphTargets[v]]=-1;for(const v in p){const m=[],d=[];for(let _=0;_!==h[g].morphTargets.length;++_){const x=h[g];m.push(x.time),d.push(x.morphTarget===v?1:0)}s.push(new Br(".morphTargetInfluence["+v+"]",m,d))}l=p.length*r}else{const p=".bones["+t[f].name+"]";i(Fr,p+".position",h,"pos",s),i(zr,p+".quaternion",h,"rot",s),i(Fr,p+".scale",h,"scl",s)}}return s.length===0?null:new this(a,l,s,o)}resetDuration(){const e=this.tracks;let t=0;for(let i=0,s=e.length;i!==s;++i){const a=this.tracks[i];t=Math.max(t,a.times[a.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function oA(n){switch(n.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Br;case"vector":case"vector2":case"vector3":case"vector4":return Fr;case"color":return Wy;case"quaternion":return zr;case"bool":case"boolean":return jr;case"string":return Kr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+n)}function lA(n){if(n.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=oA(n.type);if(n.times===void 0){const t=[],i=[];Xy(n.keys,t,i,"value"),n.times=t,n.values=i}return e.parse!==void 0?e.parse(n):new e(n.name,n.times,n.values,n.interpolation)}const ws={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class cA{constructor(e,t,i){const s=this;let a=!1,r=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(u){o++,a===!1&&s.onStart!==void 0&&s.onStart(u,r,o),a=!0},this.itemEnd=function(u){r++,s.onProgress!==void 0&&s.onProgress(u,r,o),r===o&&(a=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,f){return c.push(u,f),this},this.removeHandler=function(u){const f=c.indexOf(u);return f!==-1&&c.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=c.length;f<h;f+=2){const p=c[f],g=c[f+1];if(p.global&&(p.lastIndex=0),p.test(u))return g}return null}}}const uA=new cA;class Zr{constructor(e){this.manager=e!==void 0?e:uA,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(s,a){i.load(e,s,t,a)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Zr.DEFAULT_MATERIAL_NAME="__DEFAULT";const zi={};class fA extends Error{constructor(e,t){super(e),this.response=t}}class qy extends Zr{constructor(e){super(e),this.mimeType="",this.responseType=""}load(e,t,i,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const a=ws.get(e);if(a!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(a),this.manager.itemEnd(e)},0),a;if(zi[e]!==void 0){zi[e].push({onLoad:t,onProgress:i,onError:s});return}zi[e]=[],zi[e].push({onLoad:t,onProgress:i,onError:s});const r=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(r).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=zi[e],f=c.body.getReader(),h=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),p=h?parseInt(h):0,g=p!==0;let v=0;const m=new ReadableStream({start(d){_();function _(){f.read().then(({done:x,value:y})=>{if(x)d.close();else{v+=y.byteLength;const R=new ProgressEvent("progress",{lengthComputable:g,loaded:v,total:p});for(let w=0,b=u.length;w<b;w++){const C=u[w];C.onProgress&&C.onProgress(R)}d.enqueue(y),_()}},x=>{d.error(x)})}}});return new Response(m)}else throw new fA(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return c.json();default:if(o==="")return c.text();{const f=/charset="?([^;"\s]*)"?/i.exec(o),h=f&&f[1]?f[1].toLowerCase():void 0,p=new TextDecoder(h);return c.arrayBuffer().then(g=>p.decode(g))}}}).then(c=>{ws.add(e,c);const u=zi[e];delete zi[e];for(let f=0,h=u.length;f<h;f++){const p=u[f];p.onLoad&&p.onLoad(c)}}).catch(c=>{const u=zi[e];if(u===void 0)throw this.manager.itemError(e),c;delete zi[e];for(let f=0,h=u.length;f<h;f++){const p=u[f];p.onError&&p.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class hA extends Zr{constructor(e){super(e)}load(e,t,i,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const a=this,r=ws.get(e);if(r!==void 0)return a.manager.itemStart(e),setTimeout(function(){t&&t(r),a.manager.itemEnd(e)},0),r;const o=ol("img");function l(){u(),ws.add(e,this),t&&t(this),a.manager.itemEnd(e)}function c(f){u(),s&&s(f),a.manager.itemError(e),a.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),a.manager.itemStart(e),o.src=e,o}}class dA extends Zr{constructor(e){super(e)}load(e,t,i,s){const a=new jt,r=new hA(this.manager);return r.setCrossOrigin(this.crossOrigin),r.setPath(this.path),r.load(e,function(o){a.image=o,a.needsUpdate=!0,t!==void 0&&t(a)},i,s),a}}class Gu extends At{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Le(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const Jf=new Pe,B_=new O,z_=new O;class fm{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ke(512,512),this.map=null,this.mapPass=null,this.matrix=new Pe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new rm,this._frameExtents=new Ke(1,1),this._viewportCount=1,this._viewports=[new it(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;B_.setFromMatrixPosition(e.matrixWorld),t.position.copy(B_),z_.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(z_),t.updateMatrixWorld(),Jf.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Jf),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Jf)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class pA extends fm{constructor(){super(new un(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,i=Pr*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,a=e.distance||t.far;(i!==t.fov||s!==t.aspect||a!==t.far)&&(t.fov=i,t.aspect=s,t.far=a,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class mA extends Gu{constructor(e,t,i=0,s=Math.PI/3,a=0,r=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.target=new At,this.distance=i,this.angle=s,this.penumbra=a,this.decay=r,this.map=null,this.shadow=new pA}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const F_=new Pe,mo=new O,$f=new O;class gA extends fm{constructor(){super(new un(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ke(4,2),this._viewportCount=6,this._viewports=[new it(2,1,1,1),new it(0,1,1,1),new it(3,1,1,1),new it(1,1,1,1),new it(3,0,1,1),new it(1,0,1,1)],this._cubeDirections=[new O(1,0,0),new O(-1,0,0),new O(0,0,1),new O(0,0,-1),new O(0,1,0),new O(0,-1,0)],this._cubeUps=[new O(0,1,0),new O(0,1,0),new O(0,1,0),new O(0,1,0),new O(0,0,1),new O(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,s=this.matrix,a=e.distance||i.far;a!==i.far&&(i.far=a,i.updateProjectionMatrix()),mo.setFromMatrixPosition(e.matrixWorld),i.position.copy(mo),$f.copy(i.position),$f.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt($f),i.updateMatrixWorld(),s.makeTranslation(-mo.x,-mo.y,-mo.z),F_.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(F_)}}class _A extends Gu{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new gA}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class hm extends zy{constructor(e=-1,t=1,i=1,s=-1,a=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=a,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,a,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let a=i-e,r=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,r=a+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(a,r,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class vA extends fm{constructor(){super(new hm(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Yy extends Gu{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.target=new At,this.shadow=new vA}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class xA extends Gu{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Ho{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class yA extends Zr{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,i,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const a=this,r=ws.get(e);if(r!==void 0){if(a.manager.itemStart(e),r.then){r.then(c=>{t&&t(c),a.manager.itemEnd(e)}).catch(c=>{s&&s(c)});return}return setTimeout(function(){t&&t(r),a.manager.itemEnd(e)},0),r}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(a.options,{colorSpaceConversion:"none"}))}).then(function(c){return ws.add(e,c),t&&t(c),a.manager.itemEnd(e),c}).catch(function(c){s&&s(c),ws.remove(e),a.manager.itemError(e),a.manager.itemEnd(e)});ws.add(e,l),a.manager.itemStart(e)}}class SA extends un{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e,this.index=0}}class MA{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=H_(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=H_();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function H_(){return performance.now()}const dm="\\[\\]\\.:\\/",EA=new RegExp("["+dm+"]","g"),pm="[^"+dm+"]",TA="[^"+dm.replace("\\.","")+"]",bA=/((?:WC+[\/:])*)/.source.replace("WC",pm),AA=/(WCOD+)?/.source.replace("WCOD",TA),RA=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",pm),wA=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",pm),CA=new RegExp("^"+bA+AA+RA+wA+"$"),DA=["material","materials","bones","map"];class LA{constructor(e,t,i){const s=i||ut.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){const i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,a=i.length;s!==a;++s)i[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}}class ut{constructor(e,t,i){this.path=t,this.parsedPath=i||ut.parseTrackName(t),this.node=ut.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new ut.Composite(e,t,i):new ut(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(EA,"")}static parseTrackName(e){const t=CA.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const a=i.nodeName.substring(s+1);DA.indexOf(a)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=a)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){const i=function(a){for(let r=0;r<a.length;r++){const o=a[r];if(o.name===t||o.uuid===t)return o;const l=i(o.children);if(l)return l}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,i=t.objectName,s=t.propertyName;let a=t.propertyIndex;if(e||(e=ut.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const r=e[s];if(r===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(a!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[a]!==void 0&&(a=e.morphTargetDictionary[a])}l=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=a}else r.fromArray!==void 0&&r.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=r):Array.isArray(r)?(l=this.BindingType.EntireArray,this.resolvedProperty=r):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ut.Composite=LA;ut.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ut.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ut.prototype.GetterByBindingType=[ut.prototype._getValue_direct,ut.prototype._getValue_array,ut.prototype._getValue_arrayElement,ut.prototype._getValue_toArray];ut.prototype.SetterByBindingTypeAndVersioning=[[ut.prototype._setValue_direct,ut.prototype._setValue_direct_setNeedsUpdate,ut.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_array,ut.prototype._setValue_array_setNeedsUpdate,ut.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_arrayElement,ut.prototype._setValue_arrayElement_setNeedsUpdate,ut.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_fromArray,ut.prototype._setValue_fromArray_setNeedsUpdate,ut.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];function G_(n,e,t,i){const s=UA(i);switch(t){case My:return n*e;case Ty:return n*e;case by:return n*e*2;case Jp:return n*e/s.components*s.byteLength;case $p:return n*e/s.components*s.byteLength;case Ay:return n*e*2/s.components*s.byteLength;case em:return n*e*2/s.components*s.byteLength;case Ey:return n*e*3/s.components*s.byteLength;case Qn:return n*e*4/s.components*s.byteLength;case tm:return n*e*4/s.components*s.byteLength;case Nc:case Oc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Pc:case Ic:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case gd:case vd:return Math.max(n,16)*Math.max(e,8)/4;case md:case _d:return Math.max(n,8)*Math.max(e,8)/2;case xd:case yd:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Sd:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Md:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ed:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Td:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case bd:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Ad:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Rd:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case wd:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Cd:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Dd:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Ld:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Ud:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Nd:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Od:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Pd:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Bc:case Id:case Bd:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Ry:case zd:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Fd:case Hd:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function UA(n){switch(n){case is:case xy:return{byteLength:1,components:1};case tl:case yy:case Tl:return{byteLength:2,components:1};case Zp:case Qp:return{byteLength:2,components:4};case Sa:case Kp:case ui:return{byteLength:4,components:1};case Sy:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:jp}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=jp);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function jy(){let n=null,e=!1,t=null,i=null;function s(a,r){t(a,r),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){n=a}}}function NA(n){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,f=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,l,c){const u=l.array,f=l.updateRanges;if(n.bindBuffer(c,o),f.length===0)n.bufferSubData(c,0,u);else{f.sort((p,g)=>p.start-g.start);let h=0;for(let p=1;p<f.length;p++){const g=f[h],v=f[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++h,f[h]=v)}f.length=h+1;for(let p=0,g=f.length;p<g;p++){const v=f[p];n.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:a,update:r}}var OA=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,PA=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,IA=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,BA=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zA=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,FA=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,HA=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,GA=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,VA=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,kA=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,XA=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,WA=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,qA=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,YA=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,jA=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,KA=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,ZA=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,QA=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,JA=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,$A=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,e1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,t1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,n1=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,i1=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,s1=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,a1=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,r1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,o1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,l1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,c1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,u1="gl_FragColor = linearToOutputTexel( gl_FragColor );",f1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,h1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,d1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,p1=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,m1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,g1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,_1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,v1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,x1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,y1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,S1=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,M1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,E1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,T1=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,b1=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,A1=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,R1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,w1=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,C1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,D1=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,L1=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,U1=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,N1=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,O1=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,P1=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,I1=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,B1=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,z1=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,F1=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,H1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,G1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,V1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,k1=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,X1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,W1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,q1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Y1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,j1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,K1=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Z1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Q1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,J1=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,$1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,eR=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tR=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,nR=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,iR=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,sR=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,aR=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,rR=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,oR=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,lR=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,cR=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,uR=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,fR=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,hR=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,dR=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,pR=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,mR=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,gR=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,_R=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,vR=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,xR=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,yR=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,SR=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,MR=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,ER=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,TR=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,bR=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,AR=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,RR=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,wR=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,CR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,DR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,LR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,UR=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const NR=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,OR=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,PR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,IR=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,BR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zR=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,FR=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,HR=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,GR=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,VR=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,kR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,XR=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,WR=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,qR=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,YR=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,jR=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,KR=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ZR=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,QR=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,JR=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$R=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ew=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,tw=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nw=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iw=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,sw=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,aw=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rw=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ow=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,lw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,cw=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,uw=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,fw=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,hw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Be={alphahash_fragment:OA,alphahash_pars_fragment:PA,alphamap_fragment:IA,alphamap_pars_fragment:BA,alphatest_fragment:zA,alphatest_pars_fragment:FA,aomap_fragment:HA,aomap_pars_fragment:GA,batching_pars_vertex:VA,batching_vertex:kA,begin_vertex:XA,beginnormal_vertex:WA,bsdfs:qA,iridescence_fragment:YA,bumpmap_pars_fragment:jA,clipping_planes_fragment:KA,clipping_planes_pars_fragment:ZA,clipping_planes_pars_vertex:QA,clipping_planes_vertex:JA,color_fragment:$A,color_pars_fragment:e1,color_pars_vertex:t1,color_vertex:n1,common:i1,cube_uv_reflection_fragment:s1,defaultnormal_vertex:a1,displacementmap_pars_vertex:r1,displacementmap_vertex:o1,emissivemap_fragment:l1,emissivemap_pars_fragment:c1,colorspace_fragment:u1,colorspace_pars_fragment:f1,envmap_fragment:h1,envmap_common_pars_fragment:d1,envmap_pars_fragment:p1,envmap_pars_vertex:m1,envmap_physical_pars_fragment:A1,envmap_vertex:g1,fog_vertex:_1,fog_pars_vertex:v1,fog_fragment:x1,fog_pars_fragment:y1,gradientmap_pars_fragment:S1,lightmap_pars_fragment:M1,lights_lambert_fragment:E1,lights_lambert_pars_fragment:T1,lights_pars_begin:b1,lights_toon_fragment:R1,lights_toon_pars_fragment:w1,lights_phong_fragment:C1,lights_phong_pars_fragment:D1,lights_physical_fragment:L1,lights_physical_pars_fragment:U1,lights_fragment_begin:N1,lights_fragment_maps:O1,lights_fragment_end:P1,logdepthbuf_fragment:I1,logdepthbuf_pars_fragment:B1,logdepthbuf_pars_vertex:z1,logdepthbuf_vertex:F1,map_fragment:H1,map_pars_fragment:G1,map_particle_fragment:V1,map_particle_pars_fragment:k1,metalnessmap_fragment:X1,metalnessmap_pars_fragment:W1,morphinstance_vertex:q1,morphcolor_vertex:Y1,morphnormal_vertex:j1,morphtarget_pars_vertex:K1,morphtarget_vertex:Z1,normal_fragment_begin:Q1,normal_fragment_maps:J1,normal_pars_fragment:$1,normal_pars_vertex:eR,normal_vertex:tR,normalmap_pars_fragment:nR,clearcoat_normal_fragment_begin:iR,clearcoat_normal_fragment_maps:sR,clearcoat_pars_fragment:aR,iridescence_pars_fragment:rR,opaque_fragment:oR,packing:lR,premultiplied_alpha_fragment:cR,project_vertex:uR,dithering_fragment:fR,dithering_pars_fragment:hR,roughnessmap_fragment:dR,roughnessmap_pars_fragment:pR,shadowmap_pars_fragment:mR,shadowmap_pars_vertex:gR,shadowmap_vertex:_R,shadowmask_pars_fragment:vR,skinbase_vertex:xR,skinning_pars_vertex:yR,skinning_vertex:SR,skinnormal_vertex:MR,specularmap_fragment:ER,specularmap_pars_fragment:TR,tonemapping_fragment:bR,tonemapping_pars_fragment:AR,transmission_fragment:RR,transmission_pars_fragment:wR,uv_pars_fragment:CR,uv_pars_vertex:DR,uv_vertex:LR,worldpos_vertex:UR,background_vert:NR,background_frag:OR,backgroundCube_vert:PR,backgroundCube_frag:IR,cube_vert:BR,cube_frag:zR,depth_vert:FR,depth_frag:HR,distanceRGBA_vert:GR,distanceRGBA_frag:VR,equirect_vert:kR,equirect_frag:XR,linedashed_vert:WR,linedashed_frag:qR,meshbasic_vert:YR,meshbasic_frag:jR,meshlambert_vert:KR,meshlambert_frag:ZR,meshmatcap_vert:QR,meshmatcap_frag:JR,meshnormal_vert:$R,meshnormal_frag:ew,meshphong_vert:tw,meshphong_frag:nw,meshphysical_vert:iw,meshphysical_frag:sw,meshtoon_vert:aw,meshtoon_frag:rw,points_vert:ow,points_frag:lw,shadow_vert:cw,shadow_frag:uw,sprite_vert:fw,sprite_frag:hw},ae={common:{diffuse:{value:new Le(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Oe}},envmap:{envMap:{value:null},envMapRotation:{value:new Oe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Oe},normalScale:{value:new Ke(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Le(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Le(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0},uvTransform:{value:new Oe}},sprite:{diffuse:{value:new Le(16777215)},opacity:{value:1},center:{value:new Ke(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}}},gi={basic:{uniforms:cn([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.fog]),vertexShader:Be.meshbasic_vert,fragmentShader:Be.meshbasic_frag},lambert:{uniforms:cn([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new Le(0)}}]),vertexShader:Be.meshlambert_vert,fragmentShader:Be.meshlambert_frag},phong:{uniforms:cn([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new Le(0)},specular:{value:new Le(1118481)},shininess:{value:30}}]),vertexShader:Be.meshphong_vert,fragmentShader:Be.meshphong_frag},standard:{uniforms:cn([ae.common,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.roughnessmap,ae.metalnessmap,ae.fog,ae.lights,{emissive:{value:new Le(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag},toon:{uniforms:cn([ae.common,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.gradientmap,ae.fog,ae.lights,{emissive:{value:new Le(0)}}]),vertexShader:Be.meshtoon_vert,fragmentShader:Be.meshtoon_frag},matcap:{uniforms:cn([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,{matcap:{value:null}}]),vertexShader:Be.meshmatcap_vert,fragmentShader:Be.meshmatcap_frag},points:{uniforms:cn([ae.points,ae.fog]),vertexShader:Be.points_vert,fragmentShader:Be.points_frag},dashed:{uniforms:cn([ae.common,ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Be.linedashed_vert,fragmentShader:Be.linedashed_frag},depth:{uniforms:cn([ae.common,ae.displacementmap]),vertexShader:Be.depth_vert,fragmentShader:Be.depth_frag},normal:{uniforms:cn([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,{opacity:{value:1}}]),vertexShader:Be.meshnormal_vert,fragmentShader:Be.meshnormal_frag},sprite:{uniforms:cn([ae.sprite,ae.fog]),vertexShader:Be.sprite_vert,fragmentShader:Be.sprite_frag},background:{uniforms:{uvTransform:{value:new Oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Be.background_vert,fragmentShader:Be.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Oe}},vertexShader:Be.backgroundCube_vert,fragmentShader:Be.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Be.cube_vert,fragmentShader:Be.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Be.equirect_vert,fragmentShader:Be.equirect_frag},distanceRGBA:{uniforms:cn([ae.common,ae.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Be.distanceRGBA_vert,fragmentShader:Be.distanceRGBA_frag},shadow:{uniforms:cn([ae.lights,ae.fog,{color:{value:new Le(0)},opacity:{value:1}}]),vertexShader:Be.shadow_vert,fragmentShader:Be.shadow_frag}};gi.physical={uniforms:cn([gi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Oe},clearcoatNormalScale:{value:new Ke(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Oe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Oe},sheen:{value:0},sheenColor:{value:new Le(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Oe},transmissionSamplerSize:{value:new Ke},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Oe},attenuationDistance:{value:0},attenuationColor:{value:new Le(0)},specularColor:{value:new Le(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Oe},anisotropyVector:{value:new Ke},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Oe}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag};const gc={r:0,b:0,g:0},$s=new Ti,dw=new Pe;function pw(n,e,t,i,s,a,r){const o=new Le(0);let l=a===!0?0:1,c,u,f=null,h=0,p=null;function g(x){let y=x.isScene===!0?x.background:null;return y&&y.isTexture&&(y=(x.backgroundBlurriness>0?t:e).get(y)),y}function v(x){let y=!1;const R=g(x);R===null?d(o,l):R&&R.isColor&&(d(R,1),y=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?i.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,r),(n.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(x,y){const R=g(y);R&&(R.isCubeTexture||R.mapping===Fu)?(u===void 0&&(u=new rn(new bl(1,1,1),new Vs({name:"BackgroundCubeMaterial",uniforms:Ir(gi.backgroundCube.uniforms),vertexShader:gi.backgroundCube.vertexShader,fragmentShader:gi.backgroundCube.fragmentShader,side:Sn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,b,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),$s.copy(y.backgroundRotation),$s.x*=-1,$s.y*=-1,$s.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&($s.y*=-1,$s.z*=-1),u.material.uniforms.envMap.value=R,u.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(dw.makeRotationFromEuler($s)),u.material.toneMapped=Ye.getTransfer(R.colorSpace)!==ht,(f!==R||h!==R.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,f=R,h=R.version,p=n.toneMapping),u.layers.enableAll(),x.unshift(u,u.geometry,u.material,0,0,null)):R&&R.isTexture&&(c===void 0&&(c=new rn(new Al(2,2),new Vs({name:"BackgroundMaterial",uniforms:Ir(gi.background.uniforms),vertexShader:gi.background.vertexShader,fragmentShader:gi.background.fragmentShader,side:ns,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=R,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=Ye.getTransfer(R.colorSpace)!==ht,R.matrixAutoUpdate===!0&&R.updateMatrix(),c.material.uniforms.uvTransform.value.copy(R.matrix),(f!==R||h!==R.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,f=R,h=R.version,p=n.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function d(x,y){x.getRGB(gc,By(n)),i.buffers.color.setClear(gc.r,gc.g,gc.b,y,r)}function _(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(x,y=1){o.set(x),l=y,d(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,d(o,l)},render:v,addToRenderList:m,dispose:_}}function mw(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let a=s,r=!1;function o(S,L,X,G,Z){let Q=!1;const N=f(G,X,L);a!==N&&(a=N,c(a.object)),Q=p(S,G,X,Z),Q&&g(S,G,X,Z),Z!==null&&e.update(Z,n.ELEMENT_ARRAY_BUFFER),(Q||r)&&(r=!1,y(S,L,X,G),Z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(Z).buffer))}function l(){return n.createVertexArray()}function c(S){return n.bindVertexArray(S)}function u(S){return n.deleteVertexArray(S)}function f(S,L,X){const G=X.wireframe===!0;let Z=i[S.id];Z===void 0&&(Z={},i[S.id]=Z);let Q=Z[L.id];Q===void 0&&(Q={},Z[L.id]=Q);let N=Q[G];return N===void 0&&(N=h(l()),Q[G]=N),N}function h(S){const L=[],X=[],G=[];for(let Z=0;Z<t;Z++)L[Z]=0,X[Z]=0,G[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:X,attributeDivisors:G,object:S,attributes:{},index:null}}function p(S,L,X,G){const Z=a.attributes,Q=L.attributes;let N=0;const V=X.getAttributes();for(const B in V)if(V[B].location>=0){const se=Z[B];let ve=Q[B];if(ve===void 0&&(B==="instanceMatrix"&&S.instanceMatrix&&(ve=S.instanceMatrix),B==="instanceColor"&&S.instanceColor&&(ve=S.instanceColor)),se===void 0||se.attribute!==ve||ve&&se.data!==ve.data)return!0;N++}return a.attributesNum!==N||a.index!==G}function g(S,L,X,G){const Z={},Q=L.attributes;let N=0;const V=X.getAttributes();for(const B in V)if(V[B].location>=0){let se=Q[B];se===void 0&&(B==="instanceMatrix"&&S.instanceMatrix&&(se=S.instanceMatrix),B==="instanceColor"&&S.instanceColor&&(se=S.instanceColor));const ve={};ve.attribute=se,se&&se.data&&(ve.data=se.data),Z[B]=ve,N++}a.attributes=Z,a.attributesNum=N,a.index=G}function v(){const S=a.newAttributes;for(let L=0,X=S.length;L<X;L++)S[L]=0}function m(S){d(S,0)}function d(S,L){const X=a.newAttributes,G=a.enabledAttributes,Z=a.attributeDivisors;X[S]=1,G[S]===0&&(n.enableVertexAttribArray(S),G[S]=1),Z[S]!==L&&(n.vertexAttribDivisor(S,L),Z[S]=L)}function _(){const S=a.newAttributes,L=a.enabledAttributes;for(let X=0,G=L.length;X<G;X++)L[X]!==S[X]&&(n.disableVertexAttribArray(X),L[X]=0)}function x(S,L,X,G,Z,Q,N){N===!0?n.vertexAttribIPointer(S,L,X,Z,Q):n.vertexAttribPointer(S,L,X,G,Z,Q)}function y(S,L,X,G){v();const Z=G.attributes,Q=X.getAttributes(),N=L.defaultAttributeValues;for(const V in Q){const B=Q[V];if(B.location>=0){let ee=Z[V];if(ee===void 0&&(V==="instanceMatrix"&&S.instanceMatrix&&(ee=S.instanceMatrix),V==="instanceColor"&&S.instanceColor&&(ee=S.instanceColor)),ee!==void 0){const se=ee.normalized,ve=ee.itemSize,Ue=e.get(ee);if(Ue===void 0)continue;const et=Ue.buffer,W=Ue.type,ie=Ue.bytesPerElement,_e=W===n.INT||W===n.UNSIGNED_INT||ee.gpuType===Kp;if(ee.isInterleavedBufferAttribute){const oe=ee.data,Te=oe.stride,tt=ee.offset;if(oe.isInstancedInterleavedBuffer){for(let Re=0;Re<B.locationSize;Re++)d(B.location+Re,oe.meshPerAttribute);S.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let Re=0;Re<B.locationSize;Re++)m(B.location+Re);n.bindBuffer(n.ARRAY_BUFFER,et);for(let Re=0;Re<B.locationSize;Re++)x(B.location+Re,ve/B.locationSize,W,se,Te*ie,(tt+ve/B.locationSize*Re)*ie,_e)}else{if(ee.isInstancedBufferAttribute){for(let oe=0;oe<B.locationSize;oe++)d(B.location+oe,ee.meshPerAttribute);S.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let oe=0;oe<B.locationSize;oe++)m(B.location+oe);n.bindBuffer(n.ARRAY_BUFFER,et);for(let oe=0;oe<B.locationSize;oe++)x(B.location+oe,ve/B.locationSize,W,se,ve*ie,ve/B.locationSize*oe*ie,_e)}}else if(N!==void 0){const se=N[V];if(se!==void 0)switch(se.length){case 2:n.vertexAttrib2fv(B.location,se);break;case 3:n.vertexAttrib3fv(B.location,se);break;case 4:n.vertexAttrib4fv(B.location,se);break;default:n.vertexAttrib1fv(B.location,se)}}}}_()}function R(){C();for(const S in i){const L=i[S];for(const X in L){const G=L[X];for(const Z in G)u(G[Z].object),delete G[Z];delete L[X]}delete i[S]}}function w(S){if(i[S.id]===void 0)return;const L=i[S.id];for(const X in L){const G=L[X];for(const Z in G)u(G[Z].object),delete G[Z];delete L[X]}delete i[S.id]}function b(S){for(const L in i){const X=i[L];if(X[S.id]===void 0)continue;const G=X[S.id];for(const Z in G)u(G[Z].object),delete G[Z];delete X[S.id]}}function C(){T(),r=!0,a!==s&&(a=s,c(a.object))}function T(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:C,resetDefaultState:T,dispose:R,releaseStatesOfGeometry:w,releaseStatesOfProgram:b,initAttributes:v,enableAttribute:m,disableUnusedAttributes:_}}function gw(n,e,t){let i;function s(c){i=c}function a(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function r(c,u,f){f!==0&&(n.drawArraysInstanced(i,c,u,f),t.update(u,i,f))}function o(c,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,f);let p=0;for(let g=0;g<f;g++)p+=u[g];t.update(p,i,1)}function l(c,u,f,h){if(f===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)r(c[g],u[g],h[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,h,0,f);let g=0;for(let v=0;v<f;v++)g+=u[v]*h[v];t.update(g,i,1)}}this.setMode=s,this.render=a,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function _w(n,e,t,i){let s;function a(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const b=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(b){return!(b!==Qn&&i.convert(b)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(b){const C=b===Tl&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(b!==is&&i.convert(b)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==ui&&!C)}function l(b){if(b==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=t.logarithmicDepthBuffer===!0,h=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),_=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),x=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,w=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reverseDepthBuffer:h,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:_,maxVaryings:x,maxFragmentUniforms:y,vertexTextures:R,maxSamples:w}}function vw(n){const e=this;let t=null,i=0,s=!1,a=!1;const r=new aa,o=new Oe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const p=f.length!==0||h||i!==0||s;return s=h,i=f.length,p},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,p){const g=f.clippingPlanes,v=f.clipIntersection,m=f.clipShadows,d=n.get(f);if(!s||g===null||g.length===0||a&&!m)a?u(null):c();else{const _=a?0:i,x=_*4;let y=d.clippingState||null;l.value=y,y=u(g,h,x,p);for(let R=0;R!==x;++R)y[R]=t[R];d.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,h,p,g){const v=f!==null?f.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const d=p+v*4,_=h.matrixWorldInverse;o.getNormalMatrix(_),(m===null||m.length<d)&&(m=new Float32Array(d));for(let x=0,y=p;x!==v;++x,y+=4)r.copy(f[x]).applyMatrix4(_,o),r.normal.toArray(m,y),m[y+3]=r.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function xw(n){let e=new WeakMap;function t(r,o){return o===dd?r.mapping=Ur:o===pd&&(r.mapping=Nr),r}function i(r){if(r&&r.isTexture){const o=r.mapping;if(o===dd||o===pd)if(e.has(r)){const l=e.get(r).texture;return t(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const c=new Fb(l.height);return c.fromEquirectangularTexture(n,r),e.set(r,c),r.addEventListener("dispose",s),t(c.texture,r.mapping)}else return null}}return r}function s(r){const o=r.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function a(){e=new WeakMap}return{get:i,dispose:a}}const lr=4,V_=[.125,.215,.35,.446,.526,.582],la=20,eh=new hm,k_=new Le;let th=null,nh=0,ih=0,sh=!1;const ra=(1+Math.sqrt(5))/2,Xa=1/ra,X_=[new O(-ra,Xa,0),new O(ra,Xa,0),new O(-Xa,0,ra),new O(Xa,0,ra),new O(0,ra,-Xa),new O(0,ra,Xa),new O(-1,1,-1),new O(1,1,-1),new O(-1,1,1),new O(1,1,1)],yw=new O;class W_{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100,a={}){const{size:r=256,position:o=yw}=a;th=this._renderer.getRenderTarget(),nh=this._renderer.getActiveCubeFace(),ih=this._renderer.getActiveMipmapLevel(),sh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=j_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Y_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(th,nh,ih),this._renderer.xr.enabled=sh,e.scissorTest=!1,_c(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ur||e.mapping===Nr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),th=this._renderer.getRenderTarget(),nh=this._renderer.getActiveCubeFace(),ih=this._renderer.getActiveMipmapLevel(),sh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Un,minFilter:Un,generateMipmaps:!1,type:Tl,format:Qn,colorSpace:mn,depthBuffer:!1},s=q_(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=q_(e,t,i);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Sw(a)),this._blurMaterial=Mw(a,e,t)}return s}_compileMaterial(e){const t=new rn(this._lodPlanes[0],e);this._renderer.compile(t,eh)}_sceneToCubeUV(e,t,i,s,a){const l=new un(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,p=f.toneMapping;f.getClearColor(k_),f.toneMapping=zs,f.autoClear=!1;const g=new xi({name:"PMREM.Background",side:Sn,depthWrite:!1,depthTest:!1}),v=new rn(new bl,g);let m=!1;const d=e.background;d?d.isColor&&(g.color.copy(d),e.background=null,m=!0):(g.color.copy(k_),m=!0);for(let _=0;_<6;_++){const x=_%3;x===0?(l.up.set(0,c[_],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x+u[_],a.y,a.z)):x===1?(l.up.set(0,0,c[_]),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y+u[_],a.z)):(l.up.set(0,c[_],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y,a.z+u[_]));const y=this._cubeSize;_c(s,x*y,_>2?y:0,y,y),f.setRenderTarget(s),m&&f.render(v,l),f.render(e,l)}v.geometry.dispose(),v.material.dispose(),f.toneMapping=p,f.autoClear=h,e.background=d}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Ur||e.mapping===Nr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=j_()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Y_());const a=s?this._cubemapMaterial:this._equirectMaterial,r=new rn(this._lodPlanes[0],a),o=a.uniforms;o.envMap.value=e;const l=this._cubeSize;_c(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(r,eh)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let a=1;a<s;a++){const r=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),o=X_[(s-a-1)%X_.length];this._blur(e,a-1,a,r,o)}t.autoClear=i}_blur(e,t,i,s,a){const r=this._pingPongRenderTarget;this._halfBlur(e,r,t,i,s,"latitudinal",a),this._halfBlur(r,e,i,i,s,"longitudinal",a)}_halfBlur(e,t,i,s,a,r,o){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new rn(this._lodPlanes[s],c),h=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(a)?Math.PI/(2*p):2*Math.PI/(2*la-1),v=a/g,m=isFinite(a)?1+Math.floor(u*v):la;m>la&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${la}`);const d=[];let _=0;for(let b=0;b<la;++b){const C=b/v,T=Math.exp(-C*C/2);d.push(T),b===0?_+=T:b<m&&(_+=2*T)}for(let b=0;b<d.length;b++)d[b]=d[b]/_;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=d,h.latitudinal.value=r==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:x}=this;h.dTheta.value=g,h.mipInt.value=x-i;const y=this._sizeLods[s],R=3*y*(s>x-lr?s-x+lr:0),w=4*(this._cubeSize-y);_c(t,R,w,3*y,2*y),l.setRenderTarget(t),l.render(f,eh)}}function Sw(n){const e=[],t=[],i=[];let s=n;const a=n-lr+1+V_.length;for(let r=0;r<a;r++){const o=Math.pow(2,s);t.push(o);let l=1/o;r>n-lr?l=V_[r-n+lr-1]:r===0&&(l=0),i.push(l);const c=1/(o-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],p=6,g=6,v=3,m=2,d=1,_=new Float32Array(v*g*p),x=new Float32Array(m*g*p),y=new Float32Array(d*g*p);for(let w=0;w<p;w++){const b=w%3*2/3-1,C=w>2?0:-1,T=[b,C,0,b+2/3,C,0,b+2/3,C+1,0,b,C,0,b+2/3,C+1,0,b,C+1,0];_.set(T,v*g*w),x.set(h,m*g*w);const S=[w,w,w,w,w,w];y.set(S,d*g*w)}const R=new ei;R.setAttribute("position",new pn(_,v)),R.setAttribute("uv",new pn(x,m)),R.setAttribute("faceIndex",new pn(y,d)),e.push(R),s>lr&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function q_(n,e,t){const i=new Ma(n,e,t);return i.texture.mapping=Fu,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function _c(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function Mw(n,e,t){const i=new Float32Array(la),s=new O(0,1,0);return new Vs({name:"SphericalGaussianBlur",defines:{n:la,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:mm(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Bs,depthTest:!1,depthWrite:!1})}function Y_(){return new Vs({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:mm(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Bs,depthTest:!1,depthWrite:!1})}function j_(){return new Vs({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:mm(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Bs,depthTest:!1,depthWrite:!1})}function mm(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Ew(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===dd||l===pd,u=l===Ur||l===Nr;if(c||u){let f=e.get(o);const h=f!==void 0?f.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return t===null&&(t=new W_(n)),f=c?t.fromEquirectangular(o,f):t.fromCubemap(o,f),f.texture.pmremVersion=o.pmremVersion,e.set(o,f),f.texture;if(f!==void 0)return f.texture;{const p=o.image;return c&&p&&p.height>0||u&&p&&s(p)?(t===null&&(t=new W_(n)),f=c?t.fromEquirectangular(o):t.fromCubemap(o),f.texture.pmremVersion=o.pmremVersion,e.set(o,f),o.addEventListener("dispose",a),f.texture):null}}}return o}function s(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function a(o){const l=o.target;l.removeEventListener("dispose",a);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function r(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:r}}function Tw(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&zc("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function bw(n,e,t,i){const s={},a=new WeakMap;function r(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",r),delete s[h.id];const p=a.get(h);p&&(e.remove(p),a.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(f,h){return s[h.id]===!0||(h.addEventListener("dispose",r),s[h.id]=!0,t.memory.geometries++),h}function l(f){const h=f.attributes;for(const p in h)e.update(h[p],n.ARRAY_BUFFER)}function c(f){const h=[],p=f.index,g=f.attributes.position;let v=0;if(p!==null){const _=p.array;v=p.version;for(let x=0,y=_.length;x<y;x+=3){const R=_[x+0],w=_[x+1],b=_[x+2];h.push(R,w,w,b,b,R)}}else if(g!==void 0){const _=g.array;v=g.version;for(let x=0,y=_.length/3-1;x<y;x+=3){const R=x+0,w=x+1,b=x+2;h.push(R,w,w,b,b,R)}}else return;const m=new(Ly(h)?Iy:Py)(h,1);m.version=v;const d=a.get(f);d&&e.remove(d),a.set(f,m)}function u(f){const h=a.get(f);if(h){const p=f.index;p!==null&&h.version<p.version&&c(f)}else c(f);return a.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function Aw(n,e,t){let i;function s(h){i=h}let a,r;function o(h){a=h.type,r=h.bytesPerElement}function l(h,p){n.drawElements(i,p,a,h*r),t.update(p,i,1)}function c(h,p,g){g!==0&&(n.drawElementsInstanced(i,p,a,h*r,g),t.update(p,i,g))}function u(h,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,a,h,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];t.update(m,i,1)}function f(h,p,g,v){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<h.length;d++)c(h[d]/r,p[d],v[d]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,a,h,0,v,0,g);let d=0;for(let _=0;_<g;_++)d+=p[_]*v[_];t.update(d,i,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function Rw(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,r,o){switch(t.calls++,r){case n.TRIANGLES:t.triangles+=o*(a/3);break;case n.LINES:t.lines+=o*(a/2);break;case n.LINE_STRIP:t.lines+=o*(a-1);break;case n.LINE_LOOP:t.lines+=o*a;break;case n.POINTS:t.points+=o*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function ww(n,e,t){const i=new WeakMap,s=new it;function a(r,o,l){const c=r.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let h=i.get(o);if(h===void 0||h.count!==f){let S=function(){C.dispose(),i.delete(o),o.removeEventListener("dispose",S)};var p=S;h!==void 0&&h.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],_=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let y=0;g===!0&&(y=1),v===!0&&(y=2),m===!0&&(y=3);let R=o.attributes.position.count*y,w=1;R>e.maxTextureSize&&(w=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const b=new Float32Array(R*w*4*f),C=new Uy(b,R,w,f);C.type=ui,C.needsUpdate=!0;const T=y*4;for(let L=0;L<f;L++){const X=d[L],G=_[L],Z=x[L],Q=R*w*4*L;for(let N=0;N<X.count;N++){const V=N*T;g===!0&&(s.fromBufferAttribute(X,N),b[Q+V+0]=s.x,b[Q+V+1]=s.y,b[Q+V+2]=s.z,b[Q+V+3]=0),v===!0&&(s.fromBufferAttribute(G,N),b[Q+V+4]=s.x,b[Q+V+5]=s.y,b[Q+V+6]=s.z,b[Q+V+7]=0),m===!0&&(s.fromBufferAttribute(Z,N),b[Q+V+8]=s.x,b[Q+V+9]=s.y,b[Q+V+10]=s.z,b[Q+V+11]=Z.itemSize===4?s.w:1)}}h={count:f,texture:C,size:new Ke(R,w)},i.set(o,h),o.addEventListener("dispose",S)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",r.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const v=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",v),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:a}}function Cw(n,e,t,i){let s=new WeakMap;function a(l){const c=i.render.frame,u=l.geometry,f=e.get(l,u);if(s.get(f)!==c&&(e.update(f),s.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return f}function r(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:a,dispose:r}}const Ky=new jt,K_=new ky(1,1),Zy=new Uy,Qy=new Mb,Jy=new Fy,Z_=[],Q_=[],J_=new Float32Array(16),$_=new Float32Array(9),e0=new Float32Array(4);function Qr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let a=Z_[s];if(a===void 0&&(a=new Float32Array(s),Z_[s]=a),e!==0){i.toArray(a,0);for(let r=1,o=0;r!==e;++r)o+=t,n[r].toArray(a,o)}return a}function Gt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Vt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Vu(n,e){let t=Q_[e];t===void 0&&(t=new Int32Array(e),Q_[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Dw(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Lw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;n.uniform2fv(this.addr,e),Vt(t,e)}}function Uw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Gt(t,e))return;n.uniform3fv(this.addr,e),Vt(t,e)}}function Nw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;n.uniform4fv(this.addr,e),Vt(t,e)}}function Ow(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Gt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Vt(t,e)}else{if(Gt(t,i))return;e0.set(i),n.uniformMatrix2fv(this.addr,!1,e0),Vt(t,i)}}function Pw(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Gt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Vt(t,e)}else{if(Gt(t,i))return;$_.set(i),n.uniformMatrix3fv(this.addr,!1,$_),Vt(t,i)}}function Iw(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Gt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Vt(t,e)}else{if(Gt(t,i))return;J_.set(i),n.uniformMatrix4fv(this.addr,!1,J_),Vt(t,i)}}function Bw(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function zw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;n.uniform2iv(this.addr,e),Vt(t,e)}}function Fw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Gt(t,e))return;n.uniform3iv(this.addr,e),Vt(t,e)}}function Hw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;n.uniform4iv(this.addr,e),Vt(t,e)}}function Gw(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Vw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;n.uniform2uiv(this.addr,e),Vt(t,e)}}function kw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Gt(t,e))return;n.uniform3uiv(this.addr,e),Vt(t,e)}}function Xw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;n.uniform4uiv(this.addr,e),Vt(t,e)}}function Ww(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let a;this.type===n.SAMPLER_2D_SHADOW?(K_.compareFunction=Dy,a=K_):a=Ky,t.setTexture2D(e||a,s)}function qw(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Qy,s)}function Yw(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Jy,s)}function jw(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Zy,s)}function Kw(n){switch(n){case 5126:return Dw;case 35664:return Lw;case 35665:return Uw;case 35666:return Nw;case 35674:return Ow;case 35675:return Pw;case 35676:return Iw;case 5124:case 35670:return Bw;case 35667:case 35671:return zw;case 35668:case 35672:return Fw;case 35669:case 35673:return Hw;case 5125:return Gw;case 36294:return Vw;case 36295:return kw;case 36296:return Xw;case 35678:case 36198:case 36298:case 36306:case 35682:return Ww;case 35679:case 36299:case 36307:return qw;case 35680:case 36300:case 36308:case 36293:return Yw;case 36289:case 36303:case 36311:case 36292:return jw}}function Zw(n,e){n.uniform1fv(this.addr,e)}function Qw(n,e){const t=Qr(e,this.size,2);n.uniform2fv(this.addr,t)}function Jw(n,e){const t=Qr(e,this.size,3);n.uniform3fv(this.addr,t)}function $w(n,e){const t=Qr(e,this.size,4);n.uniform4fv(this.addr,t)}function eC(n,e){const t=Qr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function tC(n,e){const t=Qr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function nC(n,e){const t=Qr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function iC(n,e){n.uniform1iv(this.addr,e)}function sC(n,e){n.uniform2iv(this.addr,e)}function aC(n,e){n.uniform3iv(this.addr,e)}function rC(n,e){n.uniform4iv(this.addr,e)}function oC(n,e){n.uniform1uiv(this.addr,e)}function lC(n,e){n.uniform2uiv(this.addr,e)}function cC(n,e){n.uniform3uiv(this.addr,e)}function uC(n,e){n.uniform4uiv(this.addr,e)}function fC(n,e,t){const i=this.cache,s=e.length,a=Vu(t,s);Gt(i,a)||(n.uniform1iv(this.addr,a),Vt(i,a));for(let r=0;r!==s;++r)t.setTexture2D(e[r]||Ky,a[r])}function hC(n,e,t){const i=this.cache,s=e.length,a=Vu(t,s);Gt(i,a)||(n.uniform1iv(this.addr,a),Vt(i,a));for(let r=0;r!==s;++r)t.setTexture3D(e[r]||Qy,a[r])}function dC(n,e,t){const i=this.cache,s=e.length,a=Vu(t,s);Gt(i,a)||(n.uniform1iv(this.addr,a),Vt(i,a));for(let r=0;r!==s;++r)t.setTextureCube(e[r]||Jy,a[r])}function pC(n,e,t){const i=this.cache,s=e.length,a=Vu(t,s);Gt(i,a)||(n.uniform1iv(this.addr,a),Vt(i,a));for(let r=0;r!==s;++r)t.setTexture2DArray(e[r]||Zy,a[r])}function mC(n){switch(n){case 5126:return Zw;case 35664:return Qw;case 35665:return Jw;case 35666:return $w;case 35674:return eC;case 35675:return tC;case 35676:return nC;case 5124:case 35670:return iC;case 35667:case 35671:return sC;case 35668:case 35672:return aC;case 35669:case 35673:return rC;case 5125:return oC;case 36294:return lC;case 36295:return cC;case 36296:return uC;case 35678:case 36198:case 36298:case 36306:case 35682:return fC;case 35679:case 36299:case 36307:return hC;case 35680:case 36300:case 36308:case 36293:return dC;case 36289:case 36303:case 36311:case 36292:return pC}}class gC{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Kw(t.type)}}class _C{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=mC(t.type)}}class vC{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let a=0,r=s.length;a!==r;++a){const o=s[a];o.setValue(e,t[o.id],i)}}}const ah=/(\w+)(\])?(\[|\.)?/g;function t0(n,e){n.seq.push(e),n.map[e.id]=e}function xC(n,e,t){const i=n.name,s=i.length;for(ah.lastIndex=0;;){const a=ah.exec(i),r=ah.lastIndex;let o=a[1];const l=a[2]==="]",c=a[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===s){t0(t,c===void 0?new gC(o,n,e):new _C(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new vC(o),t0(t,f)),t=f}}}class Fc{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const a=e.getActiveUniform(t,s),r=e.getUniformLocation(t,a.name);xC(a,r,this)}}setValue(e,t,i,s){const a=this.map[t];a!==void 0&&a.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let a=0,r=t.length;a!==r;++a){const o=t[a],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,a=e.length;s!==a;++s){const r=e[s];r.id in t&&i.push(r)}return i}}function n0(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const yC=37297;let SC=0;function MC(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let r=s;r<a;r++){const o=r+1;i.push(`${o===e?">":" "} ${o}: ${t[r]}`)}return i.join(`
`)}const i0=new Oe;function EC(n){Ye._getMatrix(i0,Ye.workingColorSpace,n);const e=`mat3( ${i0.elements.map(t=>t.toFixed(4))} )`;switch(Ye.getTransfer(n)){case _u:return[e,"LinearTransferOETF"];case ht:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function s0(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=n.getShaderInfoLog(e).trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const r=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+MC(n.getShaderSource(e),r)}else return s}function TC(n,e){const t=EC(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function bC(n,e){let t;switch(e){case LT:t="Linear";break;case UT:t="Reinhard";break;case NT:t="Cineon";break;case OT:t="ACESFilmic";break;case IT:t="AgX";break;case BT:t="Neutral";break;case PT:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const vc=new O;function AC(){Ye.getLuminanceCoefficients(vc);const n=vc.x.toFixed(4),e=vc.y.toFixed(4),t=vc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function RC(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Mo).join(`
`)}function wC(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function CC(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const a=n.getActiveAttrib(e,s),r=a.name;let o=1;a.type===n.FLOAT_MAT2&&(o=2),a.type===n.FLOAT_MAT3&&(o=3),a.type===n.FLOAT_MAT4&&(o=4),t[r]={type:a.type,location:n.getAttribLocation(e,r),locationSize:o}}return t}function Mo(n){return n!==""}function a0(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function r0(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const DC=/^[ \t]*#include +<([\w\d./]+)>/gm;function qd(n){return n.replace(DC,UC)}const LC=new Map;function UC(n,e){let t=Be[e];if(t===void 0){const i=LC.get(e);if(i!==void 0)t=Be[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return qd(t)}const NC=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function o0(n){return n.replace(NC,OC)}function OC(n,e,t,i){let s="";for(let a=parseInt(e);a<parseInt(t);a++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function l0(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function PC(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===my?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===uT?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Fi&&(e="SHADOWMAP_TYPE_VSM"),e}function IC(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Ur:case Nr:e="ENVMAP_TYPE_CUBE";break;case Fu:e="ENVMAP_TYPE_CUBE_UV";break}return e}function BC(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Nr:e="ENVMAP_MODE_REFRACTION";break}return e}function zC(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case gy:e="ENVMAP_BLENDING_MULTIPLY";break;case CT:e="ENVMAP_BLENDING_MIX";break;case DT:e="ENVMAP_BLENDING_ADD";break}return e}function FC(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function HC(n,e,t,i){const s=n.getContext(),a=t.defines;let r=t.vertexShader,o=t.fragmentShader;const l=PC(t),c=IC(t),u=BC(t),f=zC(t),h=FC(t),p=RC(t),g=wC(a),v=s.createProgram();let m,d,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Mo).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Mo).join(`
`),d.length>0&&(d+=`
`)):(m=[l0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Mo).join(`
`),d=[l0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==zs?"#define TONE_MAPPING":"",t.toneMapping!==zs?Be.tonemapping_pars_fragment:"",t.toneMapping!==zs?bC("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Be.colorspace_pars_fragment,TC("linearToOutputTexel",t.outputColorSpace),AC(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Mo).join(`
`)),r=qd(r),r=a0(r,t),r=r0(r,t),o=qd(o),o=a0(o,t),o=r0(o,t),r=o0(r),o=o0(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",t.glslVersion===i_?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===i_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const x=_+m+r,y=_+d+o,R=n0(s,s.VERTEX_SHADER,x),w=n0(s,s.FRAGMENT_SHADER,y);s.attachShader(v,R),s.attachShader(v,w),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function b(L){if(n.debug.checkShaderErrors){const X=s.getProgramInfoLog(v).trim(),G=s.getShaderInfoLog(R).trim(),Z=s.getShaderInfoLog(w).trim();let Q=!0,N=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(Q=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,R,w);else{const V=s0(s,R,"vertex"),B=s0(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+X+`
`+V+`
`+B)}else X!==""?console.warn("THREE.WebGLProgram: Program Info Log:",X):(G===""||Z==="")&&(N=!1);N&&(L.diagnostics={runnable:Q,programLog:X,vertexShader:{log:G,prefix:m},fragmentShader:{log:Z,prefix:d}})}s.deleteShader(R),s.deleteShader(w),C=new Fc(s,v),T=CC(s,v)}let C;this.getUniforms=function(){return C===void 0&&b(this),C};let T;this.getAttributes=function(){return T===void 0&&b(this),T};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(v,yC)),S},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=SC++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=R,this.fragmentShader=w,this}let GC=0;class VC{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),a=this._getShaderStage(i),r=this._getShaderCacheForMaterial(e);return r.has(s)===!1&&(r.add(s),s.usedTimes++),r.has(a)===!1&&(r.add(a),a.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new kC(e),t.set(e,i)),i}}class kC{constructor(e){this.id=GC++,this.code=e,this.usedTimes=0}}function XC(n,e,t,i,s,a,r){const o=new Ny,l=new VC,c=new Set,u=[],f=s.logarithmicDepthBuffer,h=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(T){return c.add(T),T===0?"uv":`uv${T}`}function m(T,S,L,X,G){const Z=X.fog,Q=G.geometry,N=T.isMeshStandardMaterial?X.environment:null,V=(T.isMeshStandardMaterial?t:e).get(T.envMap||N),B=V&&V.mapping===Fu?V.image.height:null,ee=g[T.type];T.precision!==null&&(p=s.getMaxPrecision(T.precision),p!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",p,"instead."));const se=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,ve=se!==void 0?se.length:0;let Ue=0;Q.morphAttributes.position!==void 0&&(Ue=1),Q.morphAttributes.normal!==void 0&&(Ue=2),Q.morphAttributes.color!==void 0&&(Ue=3);let et,W,ie,_e;if(ee){const ot=gi[ee];et=ot.vertexShader,W=ot.fragmentShader}else et=T.vertexShader,W=T.fragmentShader,l.update(T),ie=l.getVertexShaderID(T),_e=l.getFragmentShaderID(T);const oe=n.getRenderTarget(),Te=n.state.buffers.depth.getReversed(),tt=G.isInstancedMesh===!0,Re=G.isBatchedMesh===!0,Lt=!!T.map,Tt=!!T.matcap,Xe=!!V,D=!!T.aoMap,Fn=!!T.lightMap,Ze=!!T.bumpMap,We=!!T.normalMap,Se=!!T.displacementMap,vt=!!T.emissiveMap,ye=!!T.metalnessMap,A=!!T.roughnessMap,M=T.anisotropy>0,z=T.clearcoat>0,j=T.dispersion>0,J=T.iridescence>0,q=T.sheen>0,xe=T.transmission>0,le=M&&!!T.anisotropyMap,de=z&&!!T.clearcoatMap,Qe=z&&!!T.clearcoatNormalMap,ne=z&&!!T.clearcoatRoughnessMap,pe=J&&!!T.iridescenceMap,Ae=J&&!!T.iridescenceThicknessMap,Ce=q&&!!T.sheenColorMap,me=q&&!!T.sheenRoughnessMap,qe=!!T.specularMap,Ie=!!T.specularColorMap,gt=!!T.specularIntensityMap,U=xe&&!!T.transmissionMap,ce=xe&&!!T.thicknessMap,k=!!T.gradientMap,K=!!T.alphaMap,fe=T.alphaTest>0,ue=!!T.alphaHash,Ne=!!T.extensions;let Rt=zs;T.toneMapped&&(oe===null||oe.isXRRenderTarget===!0)&&(Rt=n.toneMapping);const en={shaderID:ee,shaderType:T.type,shaderName:T.name,vertexShader:et,fragmentShader:W,defines:T.defines,customVertexShaderID:ie,customFragmentShaderID:_e,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:p,batching:Re,batchingColor:Re&&G._colorsTexture!==null,instancing:tt,instancingColor:tt&&G.instanceColor!==null,instancingMorph:tt&&G.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:oe===null?n.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:mn,alphaToCoverage:!!T.alphaToCoverage,map:Lt,matcap:Tt,envMap:Xe,envMapMode:Xe&&V.mapping,envMapCubeUVHeight:B,aoMap:D,lightMap:Fn,bumpMap:Ze,normalMap:We,displacementMap:h&&Se,emissiveMap:vt,normalMapObjectSpace:We&&T.normalMapType===kT,normalMapTangentSpace:We&&T.normalMapType===Cy,metalnessMap:ye,roughnessMap:A,anisotropy:M,anisotropyMap:le,clearcoat:z,clearcoatMap:de,clearcoatNormalMap:Qe,clearcoatRoughnessMap:ne,dispersion:j,iridescence:J,iridescenceMap:pe,iridescenceThicknessMap:Ae,sheen:q,sheenColorMap:Ce,sheenRoughnessMap:me,specularMap:qe,specularColorMap:Ie,specularIntensityMap:gt,transmission:xe,transmissionMap:U,thicknessMap:ce,gradientMap:k,opaque:T.transparent===!1&&T.blending===_r&&T.alphaToCoverage===!1,alphaMap:K,alphaTest:fe,alphaHash:ue,combine:T.combine,mapUv:Lt&&v(T.map.channel),aoMapUv:D&&v(T.aoMap.channel),lightMapUv:Fn&&v(T.lightMap.channel),bumpMapUv:Ze&&v(T.bumpMap.channel),normalMapUv:We&&v(T.normalMap.channel),displacementMapUv:Se&&v(T.displacementMap.channel),emissiveMapUv:vt&&v(T.emissiveMap.channel),metalnessMapUv:ye&&v(T.metalnessMap.channel),roughnessMapUv:A&&v(T.roughnessMap.channel),anisotropyMapUv:le&&v(T.anisotropyMap.channel),clearcoatMapUv:de&&v(T.clearcoatMap.channel),clearcoatNormalMapUv:Qe&&v(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ne&&v(T.clearcoatRoughnessMap.channel),iridescenceMapUv:pe&&v(T.iridescenceMap.channel),iridescenceThicknessMapUv:Ae&&v(T.iridescenceThicknessMap.channel),sheenColorMapUv:Ce&&v(T.sheenColorMap.channel),sheenRoughnessMapUv:me&&v(T.sheenRoughnessMap.channel),specularMapUv:qe&&v(T.specularMap.channel),specularColorMapUv:Ie&&v(T.specularColorMap.channel),specularIntensityMapUv:gt&&v(T.specularIntensityMap.channel),transmissionMapUv:U&&v(T.transmissionMap.channel),thicknessMapUv:ce&&v(T.thicknessMap.channel),alphaMapUv:K&&v(T.alphaMap.channel),vertexTangents:!!Q.attributes.tangent&&(We||M),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!Q.attributes.uv&&(Lt||K),fog:!!Z,useFog:T.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:T.flatShading===!0,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:Te,skinning:G.isSkinnedMesh===!0,morphTargets:Q.morphAttributes.position!==void 0,morphNormals:Q.morphAttributes.normal!==void 0,morphColors:Q.morphAttributes.color!==void 0,morphTargetsCount:ve,morphTextureStride:Ue,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:T.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:Rt,decodeVideoTexture:Lt&&T.map.isVideoTexture===!0&&Ye.getTransfer(T.map.colorSpace)===ht,decodeVideoTextureEmissive:vt&&T.emissiveMap.isVideoTexture===!0&&Ye.getTransfer(T.emissiveMap.colorSpace)===ht,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===oi,flipSided:T.side===Sn,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Ne&&T.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ne&&T.extensions.multiDraw===!0||Re)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return en.vertexUv1s=c.has(1),en.vertexUv2s=c.has(2),en.vertexUv3s=c.has(3),c.clear(),en}function d(T){const S=[];if(T.shaderID?S.push(T.shaderID):(S.push(T.customVertexShaderID),S.push(T.customFragmentShaderID)),T.defines!==void 0)for(const L in T.defines)S.push(L),S.push(T.defines[L]);return T.isRawShaderMaterial===!1&&(_(S,T),x(S,T),S.push(n.outputColorSpace)),S.push(T.customProgramCacheKey),S.join()}function _(T,S){T.push(S.precision),T.push(S.outputColorSpace),T.push(S.envMapMode),T.push(S.envMapCubeUVHeight),T.push(S.mapUv),T.push(S.alphaMapUv),T.push(S.lightMapUv),T.push(S.aoMapUv),T.push(S.bumpMapUv),T.push(S.normalMapUv),T.push(S.displacementMapUv),T.push(S.emissiveMapUv),T.push(S.metalnessMapUv),T.push(S.roughnessMapUv),T.push(S.anisotropyMapUv),T.push(S.clearcoatMapUv),T.push(S.clearcoatNormalMapUv),T.push(S.clearcoatRoughnessMapUv),T.push(S.iridescenceMapUv),T.push(S.iridescenceThicknessMapUv),T.push(S.sheenColorMapUv),T.push(S.sheenRoughnessMapUv),T.push(S.specularMapUv),T.push(S.specularColorMapUv),T.push(S.specularIntensityMapUv),T.push(S.transmissionMapUv),T.push(S.thicknessMapUv),T.push(S.combine),T.push(S.fogExp2),T.push(S.sizeAttenuation),T.push(S.morphTargetsCount),T.push(S.morphAttributeCount),T.push(S.numDirLights),T.push(S.numPointLights),T.push(S.numSpotLights),T.push(S.numSpotLightMaps),T.push(S.numHemiLights),T.push(S.numRectAreaLights),T.push(S.numDirLightShadows),T.push(S.numPointLightShadows),T.push(S.numSpotLightShadows),T.push(S.numSpotLightShadowsWithMaps),T.push(S.numLightProbes),T.push(S.shadowMapType),T.push(S.toneMapping),T.push(S.numClippingPlanes),T.push(S.numClipIntersection),T.push(S.depthPacking)}function x(T,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),T.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reverseDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),T.push(o.mask)}function y(T){const S=g[T.type];let L;if(S){const X=gi[S];L=Pb.clone(X.uniforms)}else L=T.uniforms;return L}function R(T,S){let L;for(let X=0,G=u.length;X<G;X++){const Z=u[X];if(Z.cacheKey===S){L=Z,++L.usedTimes;break}}return L===void 0&&(L=new HC(n,S,T,a),u.push(L)),L}function w(T){if(--T.usedTimes===0){const S=u.indexOf(T);u[S]=u[u.length-1],u.pop(),T.destroy()}}function b(T){l.remove(T)}function C(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:y,acquireProgram:R,releaseProgram:w,releaseShaderCache:b,programs:u,dispose:C}}function WC(){let n=new WeakMap;function e(r){return n.has(r)}function t(r){let o=n.get(r);return o===void 0&&(o={},n.set(r,o)),o}function i(r){n.delete(r)}function s(r,o,l){n.get(r)[o]=l}function a(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:a}}function qC(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function c0(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function u0(){const n=[];let e=0;const t=[],i=[],s=[];function a(){e=0,t.length=0,i.length=0,s.length=0}function r(f,h,p,g,v,m){let d=n[e];return d===void 0?(d={id:f.id,object:f,geometry:h,material:p,groupOrder:g,renderOrder:f.renderOrder,z:v,group:m},n[e]=d):(d.id=f.id,d.object=f,d.geometry=h,d.material=p,d.groupOrder=g,d.renderOrder=f.renderOrder,d.z=v,d.group=m),e++,d}function o(f,h,p,g,v,m){const d=r(f,h,p,g,v,m);p.transmission>0?i.push(d):p.transparent===!0?s.push(d):t.push(d)}function l(f,h,p,g,v,m){const d=r(f,h,p,g,v,m);p.transmission>0?i.unshift(d):p.transparent===!0?s.unshift(d):t.unshift(d)}function c(f,h){t.length>1&&t.sort(f||qC),i.length>1&&i.sort(h||c0),s.length>1&&s.sort(h||c0)}function u(){for(let f=e,h=n.length;f<h;f++){const p=n[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:s,init:a,push:o,unshift:l,finish:u,sort:c}}function YC(){let n=new WeakMap;function e(i,s){const a=n.get(i);let r;return a===void 0?(r=new u0,n.set(i,[r])):s>=a.length?(r=new u0,a.push(r)):r=a[s],r}function t(){n=new WeakMap}return{get:e,dispose:t}}function jC(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new O,color:new Le};break;case"SpotLight":t={position:new O,direction:new O,color:new Le,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new O,color:new Le,distance:0,decay:0};break;case"HemisphereLight":t={direction:new O,skyColor:new Le,groundColor:new Le};break;case"RectAreaLight":t={color:new Le,position:new O,halfWidth:new O,halfHeight:new O};break}return n[e.id]=t,t}}}function KC(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let ZC=0;function QC(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function JC(n){const e=new jC,t=KC(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new O);const s=new O,a=new Pe,r=new Pe;function o(c){let u=0,f=0,h=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let p=0,g=0,v=0,m=0,d=0,_=0,x=0,y=0,R=0,w=0,b=0;c.sort(QC);for(let T=0,S=c.length;T<S;T++){const L=c[T],X=L.color,G=L.intensity,Z=L.distance,Q=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=X.r*G,f+=X.g*G,h+=X.b*G;else if(L.isLightProbe){for(let N=0;N<9;N++)i.probe[N].addScaledVector(L.sh.coefficients[N],G);b++}else if(L.isDirectionalLight){const N=e.get(L);if(N.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const V=L.shadow,B=t.get(L);B.shadowIntensity=V.intensity,B.shadowBias=V.bias,B.shadowNormalBias=V.normalBias,B.shadowRadius=V.radius,B.shadowMapSize=V.mapSize,i.directionalShadow[p]=B,i.directionalShadowMap[p]=Q,i.directionalShadowMatrix[p]=L.shadow.matrix,_++}i.directional[p]=N,p++}else if(L.isSpotLight){const N=e.get(L);N.position.setFromMatrixPosition(L.matrixWorld),N.color.copy(X).multiplyScalar(G),N.distance=Z,N.coneCos=Math.cos(L.angle),N.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),N.decay=L.decay,i.spot[v]=N;const V=L.shadow;if(L.map&&(i.spotLightMap[R]=L.map,R++,V.updateMatrices(L),L.castShadow&&w++),i.spotLightMatrix[v]=V.matrix,L.castShadow){const B=t.get(L);B.shadowIntensity=V.intensity,B.shadowBias=V.bias,B.shadowNormalBias=V.normalBias,B.shadowRadius=V.radius,B.shadowMapSize=V.mapSize,i.spotShadow[v]=B,i.spotShadowMap[v]=Q,y++}v++}else if(L.isRectAreaLight){const N=e.get(L);N.color.copy(X).multiplyScalar(G),N.halfWidth.set(L.width*.5,0,0),N.halfHeight.set(0,L.height*.5,0),i.rectArea[m]=N,m++}else if(L.isPointLight){const N=e.get(L);if(N.color.copy(L.color).multiplyScalar(L.intensity),N.distance=L.distance,N.decay=L.decay,L.castShadow){const V=L.shadow,B=t.get(L);B.shadowIntensity=V.intensity,B.shadowBias=V.bias,B.shadowNormalBias=V.normalBias,B.shadowRadius=V.radius,B.shadowMapSize=V.mapSize,B.shadowCameraNear=V.camera.near,B.shadowCameraFar=V.camera.far,i.pointShadow[g]=B,i.pointShadowMap[g]=Q,i.pointShadowMatrix[g]=L.shadow.matrix,x++}i.point[g]=N,g++}else if(L.isHemisphereLight){const N=e.get(L);N.skyColor.copy(L.color).multiplyScalar(G),N.groundColor.copy(L.groundColor).multiplyScalar(G),i.hemi[d]=N,d++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ae.LTC_FLOAT_1,i.rectAreaLTC2=ae.LTC_FLOAT_2):(i.rectAreaLTC1=ae.LTC_HALF_1,i.rectAreaLTC2=ae.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;const C=i.hash;(C.directionalLength!==p||C.pointLength!==g||C.spotLength!==v||C.rectAreaLength!==m||C.hemiLength!==d||C.numDirectionalShadows!==_||C.numPointShadows!==x||C.numSpotShadows!==y||C.numSpotMaps!==R||C.numLightProbes!==b)&&(i.directional.length=p,i.spot.length=v,i.rectArea.length=m,i.point.length=g,i.hemi.length=d,i.directionalShadow.length=_,i.directionalShadowMap.length=_,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=_,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=y+R-w,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=b,C.directionalLength=p,C.pointLength=g,C.spotLength=v,C.rectAreaLength=m,C.hemiLength=d,C.numDirectionalShadows=_,C.numPointShadows=x,C.numSpotShadows=y,C.numSpotMaps=R,C.numLightProbes=b,i.version=ZC++)}function l(c,u){let f=0,h=0,p=0,g=0,v=0;const m=u.matrixWorldInverse;for(let d=0,_=c.length;d<_;d++){const x=c[d];if(x.isDirectionalLight){const y=i.directional[f];y.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),f++}else if(x.isSpotLight){const y=i.spot[p];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),p++}else if(x.isRectAreaLight){const y=i.rectArea[g];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(m),r.identity(),a.copy(x.matrixWorld),a.premultiply(m),r.extractRotation(a),y.halfWidth.set(x.width*.5,0,0),y.halfHeight.set(0,x.height*.5,0),y.halfWidth.applyMatrix4(r),y.halfHeight.applyMatrix4(r),g++}else if(x.isPointLight){const y=i.point[h];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(m),h++}else if(x.isHemisphereLight){const y=i.hemi[v];y.direction.setFromMatrixPosition(x.matrixWorld),y.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:i}}function f0(n){const e=new JC(n),t=[],i=[];function s(u){c.camera=u,t.length=0,i.length=0}function a(u){t.push(u)}function r(u){i.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:a,pushShadow:r}}function $C(n){let e=new WeakMap;function t(s,a=0){const r=e.get(s);let o;return r===void 0?(o=new f0(n),e.set(s,[o])):a>=r.length?(o=new f0(n),r.push(o)):o=r[a],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const e2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,t2=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function n2(n,e,t){let i=new rm;const s=new Ke,a=new Ke,r=new it,o=new Jb({depthPacking:VT}),l=new $b,c={},u=t.maxTextureSize,f={[ns]:Sn,[Sn]:ns,[oi]:oi},h=new Vs({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ke},radius:{value:4}},vertexShader:e2,fragmentShader:t2}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const g=new ei;g.setAttribute("position",new pn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new rn(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=my;let d=this.type;this.render=function(w,b,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const T=n.getRenderTarget(),S=n.getActiveCubeFace(),L=n.getActiveMipmapLevel(),X=n.state;X.setBlending(Bs),X.buffers.color.setClear(1,1,1,1),X.buffers.depth.setTest(!0),X.setScissorTest(!1);const G=d!==Fi&&this.type===Fi,Z=d===Fi&&this.type!==Fi;for(let Q=0,N=w.length;Q<N;Q++){const V=w[Q],B=V.shadow;if(B===void 0){console.warn("THREE.WebGLShadowMap:",V,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;s.copy(B.mapSize);const ee=B.getFrameExtents();if(s.multiply(ee),a.copy(B.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(a.x=Math.floor(u/ee.x),s.x=a.x*ee.x,B.mapSize.x=a.x),s.y>u&&(a.y=Math.floor(u/ee.y),s.y=a.y*ee.y,B.mapSize.y=a.y)),B.map===null||G===!0||Z===!0){const ve=this.type!==Fi?{minFilter:dn,magFilter:dn}:{};B.map!==null&&B.map.dispose(),B.map=new Ma(s.x,s.y,ve),B.map.texture.name=V.name+".shadowMap",B.camera.updateProjectionMatrix()}n.setRenderTarget(B.map),n.clear();const se=B.getViewportCount();for(let ve=0;ve<se;ve++){const Ue=B.getViewport(ve);r.set(a.x*Ue.x,a.y*Ue.y,a.x*Ue.z,a.y*Ue.w),X.viewport(r),B.updateMatrices(V,ve),i=B.getFrustum(),y(b,C,B.camera,V,this.type)}B.isPointLightShadow!==!0&&this.type===Fi&&_(B,C),B.needsUpdate=!1}d=this.type,m.needsUpdate=!1,n.setRenderTarget(T,S,L)};function _(w,b){const C=e.update(v);h.defines.VSM_SAMPLES!==w.blurSamples&&(h.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Ma(s.x,s.y)),h.uniforms.shadow_pass.value=w.map.texture,h.uniforms.resolution.value=w.mapSize,h.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(b,null,C,h,v,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(b,null,C,p,v,null)}function x(w,b,C,T){let S=null;const L=C.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(L!==void 0)S=L;else if(S=C.isPointLight===!0?l:o,n.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){const X=S.uuid,G=b.uuid;let Z=c[X];Z===void 0&&(Z={},c[X]=Z);let Q=Z[G];Q===void 0&&(Q=S.clone(),Z[G]=Q,b.addEventListener("dispose",R)),S=Q}if(S.visible=b.visible,S.wireframe=b.wireframe,T===Fi?S.side=b.shadowSide!==null?b.shadowSide:b.side:S.side=b.shadowSide!==null?b.shadowSide:f[b.side],S.alphaMap=b.alphaMap,S.alphaTest=b.alphaTest,S.map=b.map,S.clipShadows=b.clipShadows,S.clippingPlanes=b.clippingPlanes,S.clipIntersection=b.clipIntersection,S.displacementMap=b.displacementMap,S.displacementScale=b.displacementScale,S.displacementBias=b.displacementBias,S.wireframeLinewidth=b.wireframeLinewidth,S.linewidth=b.linewidth,C.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const X=n.properties.get(S);X.light=C}return S}function y(w,b,C,T,S){if(w.visible===!1)return;if(w.layers.test(b.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&S===Fi)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,w.matrixWorld);const G=e.update(w),Z=w.material;if(Array.isArray(Z)){const Q=G.groups;for(let N=0,V=Q.length;N<V;N++){const B=Q[N],ee=Z[B.materialIndex];if(ee&&ee.visible){const se=x(w,ee,T,S);w.onBeforeShadow(n,w,b,C,G,se,B),n.renderBufferDirect(C,null,G,se,w,B),w.onAfterShadow(n,w,b,C,G,se,B)}}}else if(Z.visible){const Q=x(w,Z,T,S);w.onBeforeShadow(n,w,b,C,G,Q,null),n.renderBufferDirect(C,null,G,Q,w,null),w.onAfterShadow(n,w,b,C,G,Q,null)}}const X=w.children;for(let G=0,Z=X.length;G<Z;G++)y(X[G],b,C,T,S)}function R(w){w.target.removeEventListener("dispose",R);for(const C in c){const T=c[C],S=w.target.uuid;S in T&&(T[S].dispose(),delete T[S])}}}const i2={[rd]:od,[ld]:fd,[cd]:hd,[Lr]:ud,[od]:rd,[fd]:ld,[hd]:cd,[ud]:Lr};function s2(n,e){function t(){let U=!1;const ce=new it;let k=null;const K=new it(0,0,0,0);return{setMask:function(fe){k!==fe&&!U&&(n.colorMask(fe,fe,fe,fe),k=fe)},setLocked:function(fe){U=fe},setClear:function(fe,ue,Ne,Rt,en){en===!0&&(fe*=Rt,ue*=Rt,Ne*=Rt),ce.set(fe,ue,Ne,Rt),K.equals(ce)===!1&&(n.clearColor(fe,ue,Ne,Rt),K.copy(ce))},reset:function(){U=!1,k=null,K.set(-1,0,0,0)}}}function i(){let U=!1,ce=!1,k=null,K=null,fe=null;return{setReversed:function(ue){if(ce!==ue){const Ne=e.get("EXT_clip_control");ue?Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.ZERO_TO_ONE_EXT):Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.NEGATIVE_ONE_TO_ONE_EXT),ce=ue;const Rt=fe;fe=null,this.setClear(Rt)}},getReversed:function(){return ce},setTest:function(ue){ue?oe(n.DEPTH_TEST):Te(n.DEPTH_TEST)},setMask:function(ue){k!==ue&&!U&&(n.depthMask(ue),k=ue)},setFunc:function(ue){if(ce&&(ue=i2[ue]),K!==ue){switch(ue){case rd:n.depthFunc(n.NEVER);break;case od:n.depthFunc(n.ALWAYS);break;case ld:n.depthFunc(n.LESS);break;case Lr:n.depthFunc(n.LEQUAL);break;case cd:n.depthFunc(n.EQUAL);break;case ud:n.depthFunc(n.GEQUAL);break;case fd:n.depthFunc(n.GREATER);break;case hd:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}K=ue}},setLocked:function(ue){U=ue},setClear:function(ue){fe!==ue&&(ce&&(ue=1-ue),n.clearDepth(ue),fe=ue)},reset:function(){U=!1,k=null,K=null,fe=null,ce=!1}}}function s(){let U=!1,ce=null,k=null,K=null,fe=null,ue=null,Ne=null,Rt=null,en=null;return{setTest:function(ot){U||(ot?oe(n.STENCIL_TEST):Te(n.STENCIL_TEST))},setMask:function(ot){ce!==ot&&!U&&(n.stencilMask(ot),ce=ot)},setFunc:function(ot,ti,Ci){(k!==ot||K!==ti||fe!==Ci)&&(n.stencilFunc(ot,ti,Ci),k=ot,K=ti,fe=Ci)},setOp:function(ot,ti,Ci){(ue!==ot||Ne!==ti||Rt!==Ci)&&(n.stencilOp(ot,ti,Ci),ue=ot,Ne=ti,Rt=Ci)},setLocked:function(ot){U=ot},setClear:function(ot){en!==ot&&(n.clearStencil(ot),en=ot)},reset:function(){U=!1,ce=null,k=null,K=null,fe=null,ue=null,Ne=null,Rt=null,en=null}}}const a=new t,r=new i,o=new s,l=new WeakMap,c=new WeakMap;let u={},f={},h=new WeakMap,p=[],g=null,v=!1,m=null,d=null,_=null,x=null,y=null,R=null,w=null,b=new Le(0,0,0),C=0,T=!1,S=null,L=null,X=null,G=null,Z=null;const Q=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let N=!1,V=0;const B=n.getParameter(n.VERSION);B.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(B)[1]),N=V>=1):B.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),N=V>=2);let ee=null,se={};const ve=n.getParameter(n.SCISSOR_BOX),Ue=n.getParameter(n.VIEWPORT),et=new it().fromArray(ve),W=new it().fromArray(Ue);function ie(U,ce,k,K){const fe=new Uint8Array(4),ue=n.createTexture();n.bindTexture(U,ue),n.texParameteri(U,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(U,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ne=0;Ne<k;Ne++)U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY?n.texImage3D(ce,0,n.RGBA,1,1,K,0,n.RGBA,n.UNSIGNED_BYTE,fe):n.texImage2D(ce+Ne,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,fe);return ue}const _e={};_e[n.TEXTURE_2D]=ie(n.TEXTURE_2D,n.TEXTURE_2D,1),_e[n.TEXTURE_CUBE_MAP]=ie(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),_e[n.TEXTURE_2D_ARRAY]=ie(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),_e[n.TEXTURE_3D]=ie(n.TEXTURE_3D,n.TEXTURE_3D,1,1),a.setClear(0,0,0,1),r.setClear(1),o.setClear(0),oe(n.DEPTH_TEST),r.setFunc(Lr),Ze(!1),We(jg),oe(n.CULL_FACE),D(Bs);function oe(U){u[U]!==!0&&(n.enable(U),u[U]=!0)}function Te(U){u[U]!==!1&&(n.disable(U),u[U]=!1)}function tt(U,ce){return f[U]!==ce?(n.bindFramebuffer(U,ce),f[U]=ce,U===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=ce),U===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=ce),!0):!1}function Re(U,ce){let k=p,K=!1;if(U){k=h.get(ce),k===void 0&&(k=[],h.set(ce,k));const fe=U.textures;if(k.length!==fe.length||k[0]!==n.COLOR_ATTACHMENT0){for(let ue=0,Ne=fe.length;ue<Ne;ue++)k[ue]=n.COLOR_ATTACHMENT0+ue;k.length=fe.length,K=!0}}else k[0]!==n.BACK&&(k[0]=n.BACK,K=!0);K&&n.drawBuffers(k)}function Lt(U){return g!==U?(n.useProgram(U),g=U,!0):!1}const Tt={[oa]:n.FUNC_ADD,[hT]:n.FUNC_SUBTRACT,[dT]:n.FUNC_REVERSE_SUBTRACT};Tt[pT]=n.MIN,Tt[mT]=n.MAX;const Xe={[gT]:n.ZERO,[_T]:n.ONE,[vT]:n.SRC_COLOR,[sd]:n.SRC_ALPHA,[TT]:n.SRC_ALPHA_SATURATE,[MT]:n.DST_COLOR,[yT]:n.DST_ALPHA,[xT]:n.ONE_MINUS_SRC_COLOR,[ad]:n.ONE_MINUS_SRC_ALPHA,[ET]:n.ONE_MINUS_DST_COLOR,[ST]:n.ONE_MINUS_DST_ALPHA,[bT]:n.CONSTANT_COLOR,[AT]:n.ONE_MINUS_CONSTANT_COLOR,[RT]:n.CONSTANT_ALPHA,[wT]:n.ONE_MINUS_CONSTANT_ALPHA};function D(U,ce,k,K,fe,ue,Ne,Rt,en,ot){if(U===Bs){v===!0&&(Te(n.BLEND),v=!1);return}if(v===!1&&(oe(n.BLEND),v=!0),U!==fT){if(U!==m||ot!==T){if((d!==oa||y!==oa)&&(n.blendEquation(n.FUNC_ADD),d=oa,y=oa),ot)switch(U){case _r:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Kg:n.blendFunc(n.ONE,n.ONE);break;case Zg:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Qg:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case _r:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Kg:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Zg:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Qg:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}_=null,x=null,R=null,w=null,b.set(0,0,0),C=0,m=U,T=ot}return}fe=fe||ce,ue=ue||k,Ne=Ne||K,(ce!==d||fe!==y)&&(n.blendEquationSeparate(Tt[ce],Tt[fe]),d=ce,y=fe),(k!==_||K!==x||ue!==R||Ne!==w)&&(n.blendFuncSeparate(Xe[k],Xe[K],Xe[ue],Xe[Ne]),_=k,x=K,R=ue,w=Ne),(Rt.equals(b)===!1||en!==C)&&(n.blendColor(Rt.r,Rt.g,Rt.b,en),b.copy(Rt),C=en),m=U,T=!1}function Fn(U,ce){U.side===oi?Te(n.CULL_FACE):oe(n.CULL_FACE);let k=U.side===Sn;ce&&(k=!k),Ze(k),U.blending===_r&&U.transparent===!1?D(Bs):D(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),r.setFunc(U.depthFunc),r.setTest(U.depthTest),r.setMask(U.depthWrite),a.setMask(U.colorWrite);const K=U.stencilWrite;o.setTest(K),K&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),vt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?oe(n.SAMPLE_ALPHA_TO_COVERAGE):Te(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ze(U){S!==U&&(U?n.frontFace(n.CW):n.frontFace(n.CCW),S=U)}function We(U){U!==lT?(oe(n.CULL_FACE),U!==L&&(U===jg?n.cullFace(n.BACK):U===cT?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Te(n.CULL_FACE),L=U}function Se(U){U!==X&&(N&&n.lineWidth(U),X=U)}function vt(U,ce,k){U?(oe(n.POLYGON_OFFSET_FILL),(G!==ce||Z!==k)&&(n.polygonOffset(ce,k),G=ce,Z=k)):Te(n.POLYGON_OFFSET_FILL)}function ye(U){U?oe(n.SCISSOR_TEST):Te(n.SCISSOR_TEST)}function A(U){U===void 0&&(U=n.TEXTURE0+Q-1),ee!==U&&(n.activeTexture(U),ee=U)}function M(U,ce,k){k===void 0&&(ee===null?k=n.TEXTURE0+Q-1:k=ee);let K=se[k];K===void 0&&(K={type:void 0,texture:void 0},se[k]=K),(K.type!==U||K.texture!==ce)&&(ee!==k&&(n.activeTexture(k),ee=k),n.bindTexture(U,ce||_e[U]),K.type=U,K.texture=ce)}function z(){const U=se[ee];U!==void 0&&U.type!==void 0&&(n.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function j(){try{n.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function J(){try{n.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function q(){try{n.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function xe(){try{n.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function le(){try{n.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function de(){try{n.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Qe(){try{n.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ne(){try{n.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function pe(){try{n.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ae(){try{n.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ce(U){et.equals(U)===!1&&(n.scissor(U.x,U.y,U.z,U.w),et.copy(U))}function me(U){W.equals(U)===!1&&(n.viewport(U.x,U.y,U.z,U.w),W.copy(U))}function qe(U,ce){let k=c.get(ce);k===void 0&&(k=new WeakMap,c.set(ce,k));let K=k.get(U);K===void 0&&(K=n.getUniformBlockIndex(ce,U.name),k.set(U,K))}function Ie(U,ce){const K=c.get(ce).get(U);l.get(ce)!==K&&(n.uniformBlockBinding(ce,K,U.__bindingPointIndex),l.set(ce,K))}function gt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),r.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},ee=null,se={},f={},h=new WeakMap,p=[],g=null,v=!1,m=null,d=null,_=null,x=null,y=null,R=null,w=null,b=new Le(0,0,0),C=0,T=!1,S=null,L=null,X=null,G=null,Z=null,et.set(0,0,n.canvas.width,n.canvas.height),W.set(0,0,n.canvas.width,n.canvas.height),a.reset(),r.reset(),o.reset()}return{buffers:{color:a,depth:r,stencil:o},enable:oe,disable:Te,bindFramebuffer:tt,drawBuffers:Re,useProgram:Lt,setBlending:D,setMaterial:Fn,setFlipSided:Ze,setCullFace:We,setLineWidth:Se,setPolygonOffset:vt,setScissorTest:ye,activeTexture:A,bindTexture:M,unbindTexture:z,compressedTexImage2D:j,compressedTexImage3D:J,texImage2D:pe,texImage3D:Ae,updateUBOMapping:qe,uniformBlockBinding:Ie,texStorage2D:Qe,texStorage3D:ne,texSubImage2D:q,texSubImage3D:xe,compressedTexSubImage2D:le,compressedTexSubImage3D:de,scissor:Ce,viewport:me,reset:gt}}function a2(n,e,t,i,s,a,r){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ke,u=new WeakMap;let f;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,M){return p?new OffscreenCanvas(A,M):ol("canvas")}function v(A,M,z){let j=1;const J=ye(A);if((J.width>z||J.height>z)&&(j=z/Math.max(J.width,J.height)),j<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const q=Math.floor(j*J.width),xe=Math.floor(j*J.height);f===void 0&&(f=g(q,xe));const le=M?g(q,xe):f;return le.width=q,le.height=xe,le.getContext("2d").drawImage(A,0,0,q,xe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+q+"x"+xe+")."),le}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),A;return A}function m(A){return A.generateMipmaps}function d(A){n.generateMipmap(A)}function _(A){return A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?n.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function x(A,M,z,j,J=!1){if(A!==null){if(n[A]!==void 0)return n[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let q=M;if(M===n.RED&&(z===n.FLOAT&&(q=n.R32F),z===n.HALF_FLOAT&&(q=n.R16F),z===n.UNSIGNED_BYTE&&(q=n.R8)),M===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(q=n.R8UI),z===n.UNSIGNED_SHORT&&(q=n.R16UI),z===n.UNSIGNED_INT&&(q=n.R32UI),z===n.BYTE&&(q=n.R8I),z===n.SHORT&&(q=n.R16I),z===n.INT&&(q=n.R32I)),M===n.RG&&(z===n.FLOAT&&(q=n.RG32F),z===n.HALF_FLOAT&&(q=n.RG16F),z===n.UNSIGNED_BYTE&&(q=n.RG8)),M===n.RG_INTEGER&&(z===n.UNSIGNED_BYTE&&(q=n.RG8UI),z===n.UNSIGNED_SHORT&&(q=n.RG16UI),z===n.UNSIGNED_INT&&(q=n.RG32UI),z===n.BYTE&&(q=n.RG8I),z===n.SHORT&&(q=n.RG16I),z===n.INT&&(q=n.RG32I)),M===n.RGB_INTEGER&&(z===n.UNSIGNED_BYTE&&(q=n.RGB8UI),z===n.UNSIGNED_SHORT&&(q=n.RGB16UI),z===n.UNSIGNED_INT&&(q=n.RGB32UI),z===n.BYTE&&(q=n.RGB8I),z===n.SHORT&&(q=n.RGB16I),z===n.INT&&(q=n.RGB32I)),M===n.RGBA_INTEGER&&(z===n.UNSIGNED_BYTE&&(q=n.RGBA8UI),z===n.UNSIGNED_SHORT&&(q=n.RGBA16UI),z===n.UNSIGNED_INT&&(q=n.RGBA32UI),z===n.BYTE&&(q=n.RGBA8I),z===n.SHORT&&(q=n.RGBA16I),z===n.INT&&(q=n.RGBA32I)),M===n.RGB&&z===n.UNSIGNED_INT_5_9_9_9_REV&&(q=n.RGB9_E5),M===n.RGBA){const xe=J?_u:Ye.getTransfer(j);z===n.FLOAT&&(q=n.RGBA32F),z===n.HALF_FLOAT&&(q=n.RGBA16F),z===n.UNSIGNED_BYTE&&(q=xe===ht?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT_4_4_4_4&&(q=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(q=n.RGB5_A1)}return(q===n.R16F||q===n.R32F||q===n.RG16F||q===n.RG32F||q===n.RGBA16F||q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function y(A,M){let z;return A?M===null||M===Sa||M===nl?z=n.DEPTH24_STENCIL8:M===ui?z=n.DEPTH32F_STENCIL8:M===tl&&(z=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Sa||M===nl?z=n.DEPTH_COMPONENT24:M===ui?z=n.DEPTH_COMPONENT32F:M===tl&&(z=n.DEPTH_COMPONENT16),z}function R(A,M){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==dn&&A.minFilter!==Un?Math.log2(Math.max(M.width,M.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?M.mipmaps.length:1}function w(A){const M=A.target;M.removeEventListener("dispose",w),C(M),M.isVideoTexture&&u.delete(M)}function b(A){const M=A.target;M.removeEventListener("dispose",b),S(M)}function C(A){const M=i.get(A);if(M.__webglInit===void 0)return;const z=A.source,j=h.get(z);if(j){const J=j[M.__cacheKey];J.usedTimes--,J.usedTimes===0&&T(A),Object.keys(j).length===0&&h.delete(z)}i.remove(A)}function T(A){const M=i.get(A);n.deleteTexture(M.__webglTexture);const z=A.source,j=h.get(z);delete j[M.__cacheKey],r.memory.textures--}function S(A){const M=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(M.__webglFramebuffer[j]))for(let J=0;J<M.__webglFramebuffer[j].length;J++)n.deleteFramebuffer(M.__webglFramebuffer[j][J]);else n.deleteFramebuffer(M.__webglFramebuffer[j]);M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer[j])}else{if(Array.isArray(M.__webglFramebuffer))for(let j=0;j<M.__webglFramebuffer.length;j++)n.deleteFramebuffer(M.__webglFramebuffer[j]);else n.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&n.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let j=0;j<M.__webglColorRenderbuffer.length;j++)M.__webglColorRenderbuffer[j]&&n.deleteRenderbuffer(M.__webglColorRenderbuffer[j]);M.__webglDepthRenderbuffer&&n.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const z=A.textures;for(let j=0,J=z.length;j<J;j++){const q=i.get(z[j]);q.__webglTexture&&(n.deleteTexture(q.__webglTexture),r.memory.textures--),i.remove(z[j])}i.remove(A)}let L=0;function X(){L=0}function G(){const A=L;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),L+=1,A}function Z(A){const M=[];return M.push(A.wrapS),M.push(A.wrapT),M.push(A.wrapR||0),M.push(A.magFilter),M.push(A.minFilter),M.push(A.anisotropy),M.push(A.internalFormat),M.push(A.format),M.push(A.type),M.push(A.generateMipmaps),M.push(A.premultiplyAlpha),M.push(A.flipY),M.push(A.unpackAlignment),M.push(A.colorSpace),M.join()}function Q(A,M){const z=i.get(A);if(A.isVideoTexture&&Se(A),A.isRenderTargetTexture===!1&&A.version>0&&z.__version!==A.version){const j=A.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{W(z,A,M);return}}t.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+M)}function N(A,M){const z=i.get(A);if(A.version>0&&z.__version!==A.version){W(z,A,M);return}t.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+M)}function V(A,M){const z=i.get(A);if(A.version>0&&z.__version!==A.version){W(z,A,M);return}t.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+M)}function B(A,M){const z=i.get(A);if(A.version>0&&z.__version!==A.version){ie(z,A,M);return}t.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+M)}const ee={[Or]:n.REPEAT,[Rs]:n.CLAMP_TO_EDGE,[gu]:n.MIRRORED_REPEAT},se={[dn]:n.NEAREST,[vy]:n.NEAREST_MIPMAP_NEAREST,[So]:n.NEAREST_MIPMAP_LINEAR,[Un]:n.LINEAR,[Uc]:n.LINEAR_MIPMAP_NEAREST,[Yi]:n.LINEAR_MIPMAP_LINEAR},ve={[XT]:n.NEVER,[ZT]:n.ALWAYS,[WT]:n.LESS,[Dy]:n.LEQUAL,[qT]:n.EQUAL,[KT]:n.GEQUAL,[YT]:n.GREATER,[jT]:n.NOTEQUAL};function Ue(A,M){if(M.type===ui&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Un||M.magFilter===Uc||M.magFilter===So||M.magFilter===Yi||M.minFilter===Un||M.minFilter===Uc||M.minFilter===So||M.minFilter===Yi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,ee[M.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,ee[M.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,ee[M.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,se[M.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,se[M.minFilter]),M.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,ve[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===dn||M.minFilter!==So&&M.minFilter!==Yi||M.type===ui&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const z=e.get("EXT_texture_filter_anisotropic");n.texParameterf(A,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function et(A,M){let z=!1;A.__webglInit===void 0&&(A.__webglInit=!0,M.addEventListener("dispose",w));const j=M.source;let J=h.get(j);J===void 0&&(J={},h.set(j,J));const q=Z(M);if(q!==A.__cacheKey){J[q]===void 0&&(J[q]={texture:n.createTexture(),usedTimes:0},r.memory.textures++,z=!0),J[q].usedTimes++;const xe=J[A.__cacheKey];xe!==void 0&&(J[A.__cacheKey].usedTimes--,xe.usedTimes===0&&T(M)),A.__cacheKey=q,A.__webglTexture=J[q].texture}return z}function W(A,M,z){let j=n.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(j=n.TEXTURE_2D_ARRAY),M.isData3DTexture&&(j=n.TEXTURE_3D);const J=et(A,M),q=M.source;t.bindTexture(j,A.__webglTexture,n.TEXTURE0+z);const xe=i.get(q);if(q.version!==xe.__version||J===!0){t.activeTexture(n.TEXTURE0+z);const le=Ye.getPrimaries(Ye.workingColorSpace),de=M.colorSpace===Ms?null:Ye.getPrimaries(M.colorSpace),Qe=M.colorSpace===Ms||le===de?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Qe);let ne=v(M.image,!1,s.maxTextureSize);ne=vt(M,ne);const pe=a.convert(M.format,M.colorSpace),Ae=a.convert(M.type);let Ce=x(M.internalFormat,pe,Ae,M.colorSpace,M.isVideoTexture);Ue(j,M);let me;const qe=M.mipmaps,Ie=M.isVideoTexture!==!0,gt=xe.__version===void 0||J===!0,U=q.dataReady,ce=R(M,ne);if(M.isDepthTexture)Ce=y(M.format===sl,M.type),gt&&(Ie?t.texStorage2D(n.TEXTURE_2D,1,Ce,ne.width,ne.height):t.texImage2D(n.TEXTURE_2D,0,Ce,ne.width,ne.height,0,pe,Ae,null));else if(M.isDataTexture)if(qe.length>0){Ie&&gt&&t.texStorage2D(n.TEXTURE_2D,ce,Ce,qe[0].width,qe[0].height);for(let k=0,K=qe.length;k<K;k++)me=qe[k],Ie?U&&t.texSubImage2D(n.TEXTURE_2D,k,0,0,me.width,me.height,pe,Ae,me.data):t.texImage2D(n.TEXTURE_2D,k,Ce,me.width,me.height,0,pe,Ae,me.data);M.generateMipmaps=!1}else Ie?(gt&&t.texStorage2D(n.TEXTURE_2D,ce,Ce,ne.width,ne.height),U&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ne.width,ne.height,pe,Ae,ne.data)):t.texImage2D(n.TEXTURE_2D,0,Ce,ne.width,ne.height,0,pe,Ae,ne.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Ie&&gt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ce,Ce,qe[0].width,qe[0].height,ne.depth);for(let k=0,K=qe.length;k<K;k++)if(me=qe[k],M.format!==Qn)if(pe!==null)if(Ie){if(U)if(M.layerUpdates.size>0){const fe=G_(me.width,me.height,M.format,M.type);for(const ue of M.layerUpdates){const Ne=me.data.subarray(ue*fe/me.data.BYTES_PER_ELEMENT,(ue+1)*fe/me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,k,0,0,ue,me.width,me.height,1,pe,Ne)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,k,0,0,0,me.width,me.height,ne.depth,pe,me.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,k,Ce,me.width,me.height,ne.depth,0,me.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ie?U&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,k,0,0,0,me.width,me.height,ne.depth,pe,Ae,me.data):t.texImage3D(n.TEXTURE_2D_ARRAY,k,Ce,me.width,me.height,ne.depth,0,pe,Ae,me.data)}else{Ie&&gt&&t.texStorage2D(n.TEXTURE_2D,ce,Ce,qe[0].width,qe[0].height);for(let k=0,K=qe.length;k<K;k++)me=qe[k],M.format!==Qn?pe!==null?Ie?U&&t.compressedTexSubImage2D(n.TEXTURE_2D,k,0,0,me.width,me.height,pe,me.data):t.compressedTexImage2D(n.TEXTURE_2D,k,Ce,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ie?U&&t.texSubImage2D(n.TEXTURE_2D,k,0,0,me.width,me.height,pe,Ae,me.data):t.texImage2D(n.TEXTURE_2D,k,Ce,me.width,me.height,0,pe,Ae,me.data)}else if(M.isDataArrayTexture)if(Ie){if(gt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ce,Ce,ne.width,ne.height,ne.depth),U)if(M.layerUpdates.size>0){const k=G_(ne.width,ne.height,M.format,M.type);for(const K of M.layerUpdates){const fe=ne.data.subarray(K*k/ne.data.BYTES_PER_ELEMENT,(K+1)*k/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,K,ne.width,ne.height,1,pe,Ae,fe)}M.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,pe,Ae,ne.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ce,ne.width,ne.height,ne.depth,0,pe,Ae,ne.data);else if(M.isData3DTexture)Ie?(gt&&t.texStorage3D(n.TEXTURE_3D,ce,Ce,ne.width,ne.height,ne.depth),U&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,pe,Ae,ne.data)):t.texImage3D(n.TEXTURE_3D,0,Ce,ne.width,ne.height,ne.depth,0,pe,Ae,ne.data);else if(M.isFramebufferTexture){if(gt)if(Ie)t.texStorage2D(n.TEXTURE_2D,ce,Ce,ne.width,ne.height);else{let k=ne.width,K=ne.height;for(let fe=0;fe<ce;fe++)t.texImage2D(n.TEXTURE_2D,fe,Ce,k,K,0,pe,Ae,null),k>>=1,K>>=1}}else if(qe.length>0){if(Ie&&gt){const k=ye(qe[0]);t.texStorage2D(n.TEXTURE_2D,ce,Ce,k.width,k.height)}for(let k=0,K=qe.length;k<K;k++)me=qe[k],Ie?U&&t.texSubImage2D(n.TEXTURE_2D,k,0,0,pe,Ae,me):t.texImage2D(n.TEXTURE_2D,k,Ce,pe,Ae,me);M.generateMipmaps=!1}else if(Ie){if(gt){const k=ye(ne);t.texStorage2D(n.TEXTURE_2D,ce,Ce,k.width,k.height)}U&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,pe,Ae,ne)}else t.texImage2D(n.TEXTURE_2D,0,Ce,pe,Ae,ne);m(M)&&d(j),xe.__version=q.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function ie(A,M,z){if(M.image.length!==6)return;const j=et(A,M),J=M.source;t.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+z);const q=i.get(J);if(J.version!==q.__version||j===!0){t.activeTexture(n.TEXTURE0+z);const xe=Ye.getPrimaries(Ye.workingColorSpace),le=M.colorSpace===Ms?null:Ye.getPrimaries(M.colorSpace),de=M.colorSpace===Ms||xe===le?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const Qe=M.isCompressedTexture||M.image[0].isCompressedTexture,ne=M.image[0]&&M.image[0].isDataTexture,pe=[];for(let K=0;K<6;K++)!Qe&&!ne?pe[K]=v(M.image[K],!0,s.maxCubemapSize):pe[K]=ne?M.image[K].image:M.image[K],pe[K]=vt(M,pe[K]);const Ae=pe[0],Ce=a.convert(M.format,M.colorSpace),me=a.convert(M.type),qe=x(M.internalFormat,Ce,me,M.colorSpace),Ie=M.isVideoTexture!==!0,gt=q.__version===void 0||j===!0,U=J.dataReady;let ce=R(M,Ae);Ue(n.TEXTURE_CUBE_MAP,M);let k;if(Qe){Ie&&gt&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ce,qe,Ae.width,Ae.height);for(let K=0;K<6;K++){k=pe[K].mipmaps;for(let fe=0;fe<k.length;fe++){const ue=k[fe];M.format!==Qn?Ce!==null?Ie?U&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,fe,0,0,ue.width,ue.height,Ce,ue.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,fe,qe,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ie?U&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,fe,0,0,ue.width,ue.height,Ce,me,ue.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,fe,qe,ue.width,ue.height,0,Ce,me,ue.data)}}}else{if(k=M.mipmaps,Ie&&gt){k.length>0&&ce++;const K=ye(pe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ce,qe,K.width,K.height)}for(let K=0;K<6;K++)if(ne){Ie?U&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,pe[K].width,pe[K].height,Ce,me,pe[K].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,qe,pe[K].width,pe[K].height,0,Ce,me,pe[K].data);for(let fe=0;fe<k.length;fe++){const Ne=k[fe].image[K].image;Ie?U&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,fe+1,0,0,Ne.width,Ne.height,Ce,me,Ne.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,fe+1,qe,Ne.width,Ne.height,0,Ce,me,Ne.data)}}else{Ie?U&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Ce,me,pe[K]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,qe,Ce,me,pe[K]);for(let fe=0;fe<k.length;fe++){const ue=k[fe];Ie?U&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,fe+1,0,0,Ce,me,ue.image[K]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,fe+1,qe,Ce,me,ue.image[K])}}}m(M)&&d(n.TEXTURE_CUBE_MAP),q.__version=J.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function _e(A,M,z,j,J,q){const xe=a.convert(z.format,z.colorSpace),le=a.convert(z.type),de=x(z.internalFormat,xe,le,z.colorSpace),Qe=i.get(M),ne=i.get(z);if(ne.__renderTarget=M,!Qe.__hasExternalTextures){const pe=Math.max(1,M.width>>q),Ae=Math.max(1,M.height>>q);J===n.TEXTURE_3D||J===n.TEXTURE_2D_ARRAY?t.texImage3D(J,q,de,pe,Ae,M.depth,0,xe,le,null):t.texImage2D(J,q,de,pe,Ae,0,xe,le,null)}t.bindFramebuffer(n.FRAMEBUFFER,A),We(M)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,j,J,ne.__webglTexture,0,Ze(M)):(J===n.TEXTURE_2D||J>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,j,J,ne.__webglTexture,q),t.bindFramebuffer(n.FRAMEBUFFER,null)}function oe(A,M,z){if(n.bindRenderbuffer(n.RENDERBUFFER,A),M.depthBuffer){const j=M.depthTexture,J=j&&j.isDepthTexture?j.type:null,q=y(M.stencilBuffer,J),xe=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=Ze(M);We(M)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,le,q,M.width,M.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,le,q,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,q,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,xe,n.RENDERBUFFER,A)}else{const j=M.textures;for(let J=0;J<j.length;J++){const q=j[J],xe=a.convert(q.format,q.colorSpace),le=a.convert(q.type),de=x(q.internalFormat,xe,le,q.colorSpace),Qe=Ze(M);z&&We(M)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Qe,de,M.width,M.height):We(M)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Qe,de,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,de,M.width,M.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Te(A,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,A),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=i.get(M.depthTexture);j.__renderTarget=M,(!j.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),Q(M.depthTexture,0);const J=j.__webglTexture,q=Ze(M);if(M.depthTexture.format===il)We(M)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,J,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,J,0);else if(M.depthTexture.format===sl)We(M)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,J,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function tt(A){const M=i.get(A),z=A.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==A.depthTexture){const j=A.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),j){const J=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,j.removeEventListener("dispose",J)};j.addEventListener("dispose",J),M.__depthDisposeCallback=J}M.__boundDepthTexture=j}if(A.depthTexture&&!M.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");Te(M.__webglFramebuffer,A)}else if(z){M.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[j]),M.__webglDepthbuffer[j]===void 0)M.__webglDepthbuffer[j]=n.createRenderbuffer(),oe(M.__webglDepthbuffer[j],A,!1);else{const J=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,q=M.__webglDepthbuffer[j];n.bindRenderbuffer(n.RENDERBUFFER,q),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,q)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=n.createRenderbuffer(),oe(M.__webglDepthbuffer,A,!1);else{const j=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,J=M.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,J),n.framebufferRenderbuffer(n.FRAMEBUFFER,j,n.RENDERBUFFER,J)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Re(A,M,z){const j=i.get(A);M!==void 0&&_e(j.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&tt(A)}function Lt(A){const M=A.texture,z=i.get(A),j=i.get(M);A.addEventListener("dispose",b);const J=A.textures,q=A.isWebGLCubeRenderTarget===!0,xe=J.length>1;if(xe||(j.__webglTexture===void 0&&(j.__webglTexture=n.createTexture()),j.__version=M.version,r.memory.textures++),q){z.__webglFramebuffer=[];for(let le=0;le<6;le++)if(M.mipmaps&&M.mipmaps.length>0){z.__webglFramebuffer[le]=[];for(let de=0;de<M.mipmaps.length;de++)z.__webglFramebuffer[le][de]=n.createFramebuffer()}else z.__webglFramebuffer[le]=n.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){z.__webglFramebuffer=[];for(let le=0;le<M.mipmaps.length;le++)z.__webglFramebuffer[le]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(xe)for(let le=0,de=J.length;le<de;le++){const Qe=i.get(J[le]);Qe.__webglTexture===void 0&&(Qe.__webglTexture=n.createTexture(),r.memory.textures++)}if(A.samples>0&&We(A)===!1){z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let le=0;le<J.length;le++){const de=J[le];z.__webglColorRenderbuffer[le]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[le]);const Qe=a.convert(de.format,de.colorSpace),ne=a.convert(de.type),pe=x(de.internalFormat,Qe,ne,de.colorSpace,A.isXRRenderTarget===!0),Ae=Ze(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ae,pe,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+le,n.RENDERBUFFER,z.__webglColorRenderbuffer[le])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),oe(z.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(q){t.bindTexture(n.TEXTURE_CUBE_MAP,j.__webglTexture),Ue(n.TEXTURE_CUBE_MAP,M);for(let le=0;le<6;le++)if(M.mipmaps&&M.mipmaps.length>0)for(let de=0;de<M.mipmaps.length;de++)_e(z.__webglFramebuffer[le][de],A,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+le,de);else _e(z.__webglFramebuffer[le],A,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);m(M)&&d(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(xe){for(let le=0,de=J.length;le<de;le++){const Qe=J[le],ne=i.get(Qe);t.bindTexture(n.TEXTURE_2D,ne.__webglTexture),Ue(n.TEXTURE_2D,Qe),_e(z.__webglFramebuffer,A,Qe,n.COLOR_ATTACHMENT0+le,n.TEXTURE_2D,0),m(Qe)&&d(n.TEXTURE_2D)}t.unbindTexture()}else{let le=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(le=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(le,j.__webglTexture),Ue(le,M),M.mipmaps&&M.mipmaps.length>0)for(let de=0;de<M.mipmaps.length;de++)_e(z.__webglFramebuffer[de],A,M,n.COLOR_ATTACHMENT0,le,de);else _e(z.__webglFramebuffer,A,M,n.COLOR_ATTACHMENT0,le,0);m(M)&&d(le),t.unbindTexture()}A.depthBuffer&&tt(A)}function Tt(A){const M=A.textures;for(let z=0,j=M.length;z<j;z++){const J=M[z];if(m(J)){const q=_(A),xe=i.get(J).__webglTexture;t.bindTexture(q,xe),d(q),t.unbindTexture()}}}const Xe=[],D=[];function Fn(A){if(A.samples>0){if(We(A)===!1){const M=A.textures,z=A.width,j=A.height;let J=n.COLOR_BUFFER_BIT;const q=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,xe=i.get(A),le=M.length>1;if(le)for(let de=0;de<M.length;de++)t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,xe.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,xe.__webglFramebuffer);for(let de=0;de<M.length;de++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(J|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(J|=n.STENCIL_BUFFER_BIT)),le){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,xe.__webglColorRenderbuffer[de]);const Qe=i.get(M[de]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Qe,0)}n.blitFramebuffer(0,0,z,j,0,0,z,j,J,n.NEAREST),l===!0&&(Xe.length=0,D.length=0,Xe.push(n.COLOR_ATTACHMENT0+de),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Xe.push(q),D.push(q),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,D)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Xe))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),le)for(let de=0;de<M.length;de++){t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,xe.__webglColorRenderbuffer[de]);const Qe=i.get(M[de]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,Qe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,xe.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const M=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[M])}}}function Ze(A){return Math.min(s.maxSamples,A.samples)}function We(A){const M=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Se(A){const M=r.render.frame;u.get(A)!==M&&(u.set(A,M),A.update())}function vt(A,M){const z=A.colorSpace,j=A.format,J=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||z!==mn&&z!==Ms&&(Ye.getTransfer(z)===ht?(j!==Qn||J!==is)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),M}function ye(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=X,this.setTexture2D=Q,this.setTexture2DArray=N,this.setTexture3D=V,this.setTextureCube=B,this.rebindTextures=Re,this.setupRenderTarget=Lt,this.updateRenderTargetMipmap=Tt,this.updateMultisampleRenderTarget=Fn,this.setupDepthRenderbuffer=tt,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=We}function r2(n,e){function t(i,s=Ms){let a;const r=Ye.getTransfer(s);if(i===is)return n.UNSIGNED_BYTE;if(i===Zp)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Qp)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Sy)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===xy)return n.BYTE;if(i===yy)return n.SHORT;if(i===tl)return n.UNSIGNED_SHORT;if(i===Kp)return n.INT;if(i===Sa)return n.UNSIGNED_INT;if(i===ui)return n.FLOAT;if(i===Tl)return n.HALF_FLOAT;if(i===My)return n.ALPHA;if(i===Ey)return n.RGB;if(i===Qn)return n.RGBA;if(i===Ty)return n.LUMINANCE;if(i===by)return n.LUMINANCE_ALPHA;if(i===il)return n.DEPTH_COMPONENT;if(i===sl)return n.DEPTH_STENCIL;if(i===Jp)return n.RED;if(i===$p)return n.RED_INTEGER;if(i===Ay)return n.RG;if(i===em)return n.RG_INTEGER;if(i===tm)return n.RGBA_INTEGER;if(i===Nc||i===Oc||i===Pc||i===Ic)if(r===ht)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===Nc)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Oc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Pc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ic)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===Nc)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Oc)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Pc)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ic)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===md||i===gd||i===_d||i===vd)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===md)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===gd)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===_d)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===vd)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===xd||i===yd||i===Sd)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(i===xd||i===yd)return r===ht?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===Sd)return r===ht?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Md||i===Ed||i===Td||i===bd||i===Ad||i===Rd||i===wd||i===Cd||i===Dd||i===Ld||i===Ud||i===Nd||i===Od||i===Pd)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(i===Md)return r===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ed)return r===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Td)return r===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===bd)return r===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ad)return r===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Rd)return r===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===wd)return r===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Cd)return r===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Dd)return r===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ld)return r===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ud)return r===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Nd)return r===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Od)return r===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Pd)return r===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Bc||i===Id||i===Bd)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(i===Bc)return r===ht?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Id)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Bd)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ry||i===zd||i===Fd||i===Hd)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(i===Bc)return a.COMPRESSED_RED_RGTC1_EXT;if(i===zd)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Fd)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Hd)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===nl?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const o2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,l2=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class c2{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const s=new jt,a=e.properties.get(s);a.__webglTexture=t.texture,(t.depthNear!==i.depthNear||t.depthFar!==i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Vs({vertexShader:o2,fragmentShader:l2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new rn(new Al(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class u2 extends Yr{constructor(e,t){super();const i=this;let s=null,a=1,r=null,o="local-floor",l=1,c=null,u=null,f=null,h=null,p=null,g=null;const v=new c2,m=t.getContextAttributes();let d=null,_=null;const x=[],y=[],R=new Ke;let w=null;const b=new un;b.viewport=new it;const C=new un;C.viewport=new it;const T=[b,C],S=new SA;let L=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let ie=x[W];return ie===void 0&&(ie=new Yf,x[W]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(W){let ie=x[W];return ie===void 0&&(ie=new Yf,x[W]=ie),ie.getGripSpace()},this.getHand=function(W){let ie=x[W];return ie===void 0&&(ie=new Yf,x[W]=ie),ie.getHandSpace()};function G(W){const ie=y.indexOf(W.inputSource);if(ie===-1)return;const _e=x[ie];_e!==void 0&&(_e.update(W.inputSource,W.frame,c||r),_e.dispatchEvent({type:W.type,data:W.inputSource}))}function Z(){s.removeEventListener("select",G),s.removeEventListener("selectstart",G),s.removeEventListener("selectend",G),s.removeEventListener("squeeze",G),s.removeEventListener("squeezestart",G),s.removeEventListener("squeezeend",G),s.removeEventListener("end",Z),s.removeEventListener("inputsourceschange",Q);for(let W=0;W<x.length;W++){const ie=y[W];ie!==null&&(y[W]=null,x[W].disconnect(ie))}L=null,X=null,v.reset(),e.setRenderTarget(d),p=null,h=null,f=null,s=null,_=null,et.stop(),i.isPresenting=!1,e.setPixelRatio(w),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){a=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(W){if(s=W,s!==null){if(d=e.getRenderTarget(),s.addEventListener("select",G),s.addEventListener("selectstart",G),s.addEventListener("selectend",G),s.addEventListener("squeeze",G),s.addEventListener("squeezestart",G),s.addEventListener("squeezeend",G),s.addEventListener("end",Z),s.addEventListener("inputsourceschange",Q),m.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(R),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let _e=null,oe=null,Te=null;m.depth&&(Te=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,_e=m.stencil?sl:il,oe=m.stencil?nl:Sa);const tt={colorFormat:t.RGBA8,depthFormat:Te,scaleFactor:a};f=new XRWebGLBinding(s,t),h=f.createProjectionLayer(tt),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),_=new Ma(h.textureWidth,h.textureHeight,{format:Qn,type:is,depthTexture:new ky(h.textureWidth,h.textureHeight,oe,void 0,void 0,void 0,void 0,void 0,void 0,_e),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const _e={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:a};p=new XRWebGLLayer(s,t,_e),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),_=new Ma(p.framebufferWidth,p.framebufferHeight,{format:Qn,type:is,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await s.requestReferenceSpace(o),et.setContext(s),et.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function Q(W){for(let ie=0;ie<W.removed.length;ie++){const _e=W.removed[ie],oe=y.indexOf(_e);oe>=0&&(y[oe]=null,x[oe].disconnect(_e))}for(let ie=0;ie<W.added.length;ie++){const _e=W.added[ie];let oe=y.indexOf(_e);if(oe===-1){for(let tt=0;tt<x.length;tt++)if(tt>=y.length){y.push(_e),oe=tt;break}else if(y[tt]===null){y[tt]=_e,oe=tt;break}if(oe===-1)break}const Te=x[oe];Te&&Te.connect(_e)}}const N=new O,V=new O;function B(W,ie,_e){N.setFromMatrixPosition(ie.matrixWorld),V.setFromMatrixPosition(_e.matrixWorld);const oe=N.distanceTo(V),Te=ie.projectionMatrix.elements,tt=_e.projectionMatrix.elements,Re=Te[14]/(Te[10]-1),Lt=Te[14]/(Te[10]+1),Tt=(Te[9]+1)/Te[5],Xe=(Te[9]-1)/Te[5],D=(Te[8]-1)/Te[0],Fn=(tt[8]+1)/tt[0],Ze=Re*D,We=Re*Fn,Se=oe/(-D+Fn),vt=Se*-D;if(ie.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(vt),W.translateZ(Se),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),Te[10]===-1)W.projectionMatrix.copy(ie.projectionMatrix),W.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const ye=Re+Se,A=Lt+Se,M=Ze-vt,z=We+(oe-vt),j=Tt*Lt/A*ye,J=Xe*Lt/A*ye;W.projectionMatrix.makePerspective(M,z,j,J,ye,A),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function ee(W,ie){ie===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(ie.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(s===null)return;let ie=W.near,_e=W.far;v.texture!==null&&(v.depthNear>0&&(ie=v.depthNear),v.depthFar>0&&(_e=v.depthFar)),S.near=C.near=b.near=ie,S.far=C.far=b.far=_e,(L!==S.near||X!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),L=S.near,X=S.far),b.layers.mask=W.layers.mask|2,C.layers.mask=W.layers.mask|4,S.layers.mask=b.layers.mask|C.layers.mask;const oe=W.parent,Te=S.cameras;ee(S,oe);for(let tt=0;tt<Te.length;tt++)ee(Te[tt],oe);Te.length===2?B(S,b,C):S.projectionMatrix.copy(b.projectionMatrix),se(W,S,oe)};function se(W,ie,_e){_e===null?W.matrix.copy(ie.matrixWorld):(W.matrix.copy(_e.matrixWorld),W.matrix.invert(),W.matrix.multiply(ie.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(ie.projectionMatrix),W.projectionMatrixInverse.copy(ie.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Pr*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(W){l=W,h!==null&&(h.fixedFoveation=W),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=W)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(S)};let ve=null;function Ue(W,ie){if(u=ie.getViewerPose(c||r),g=ie,u!==null){const _e=u.views;p!==null&&(e.setRenderTargetFramebuffer(_,p.framebuffer),e.setRenderTarget(_));let oe=!1;_e.length!==S.cameras.length&&(S.cameras.length=0,oe=!0);for(let Re=0;Re<_e.length;Re++){const Lt=_e[Re];let Tt=null;if(p!==null)Tt=p.getViewport(Lt);else{const D=f.getViewSubImage(h,Lt);Tt=D.viewport,Re===0&&(e.setRenderTargetTextures(_,D.colorTexture,D.depthStencilTexture),e.setRenderTarget(_))}let Xe=T[Re];Xe===void 0&&(Xe=new un,Xe.layers.enable(Re),Xe.viewport=new it,T[Re]=Xe),Xe.matrix.fromArray(Lt.transform.matrix),Xe.matrix.decompose(Xe.position,Xe.quaternion,Xe.scale),Xe.projectionMatrix.fromArray(Lt.projectionMatrix),Xe.projectionMatrixInverse.copy(Xe.projectionMatrix).invert(),Xe.viewport.set(Tt.x,Tt.y,Tt.width,Tt.height),Re===0&&(S.matrix.copy(Xe.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),oe===!0&&S.cameras.push(Xe)}const Te=s.enabledFeatures;if(Te&&Te.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&f){const Re=f.getDepthInformation(_e[0]);Re&&Re.isValid&&Re.texture&&v.init(e,Re,s.renderState)}}for(let _e=0;_e<x.length;_e++){const oe=y[_e],Te=x[_e];oe!==null&&Te!==void 0&&Te.update(oe,ie,c||r)}ve&&ve(W,ie),ie.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ie}),g=null}const et=new jy;et.setAnimationLoop(Ue),this.setAnimationLoop=function(W){ve=W},this.dispose=function(){}}}const ea=new Ti,f2=new Pe;function h2(n,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,By(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,_,x,y){d.isMeshBasicMaterial||d.isMeshLambertMaterial?a(m,d):d.isMeshToonMaterial?(a(m,d),f(m,d)):d.isMeshPhongMaterial?(a(m,d),u(m,d)):d.isMeshStandardMaterial?(a(m,d),h(m,d),d.isMeshPhysicalMaterial&&p(m,d,y)):d.isMeshMatcapMaterial?(a(m,d),g(m,d)):d.isMeshDepthMaterial?a(m,d):d.isMeshDistanceMaterial?(a(m,d),v(m,d)):d.isMeshNormalMaterial?a(m,d):d.isLineBasicMaterial?(r(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?l(m,d,_,x):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function a(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Sn&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Sn&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const _=e.get(d),x=_.envMap,y=_.envMapRotation;x&&(m.envMap.value=x,ea.copy(y),ea.x*=-1,ea.y*=-1,ea.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(ea.y*=-1,ea.z*=-1),m.envMapRotation.value.setFromMatrix4(f2.makeRotationFromEuler(ea)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function r(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,_,x){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*_,m.scale.value=x*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function f(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function h(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,_){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Sn&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function v(m,d){const _=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function d2(n,e,t,i){let s={},a={},r=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,x){const y=x.program;i.uniformBlockBinding(_,y)}function c(_,x){let y=s[_.id];y===void 0&&(g(_),y=u(_),s[_.id]=y,_.addEventListener("dispose",m));const R=x.program;i.updateUBOMapping(_,R);const w=e.render.frame;a[_.id]!==w&&(h(_),a[_.id]=w)}function u(_){const x=f();_.__bindingPointIndex=x;const y=n.createBuffer(),R=_.__size,w=_.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,R,w),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,y),y}function f(){for(let _=0;_<o;_++)if(r.indexOf(_)===-1)return r.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(_){const x=s[_.id],y=_.uniforms,R=_.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let w=0,b=y.length;w<b;w++){const C=Array.isArray(y[w])?y[w]:[y[w]];for(let T=0,S=C.length;T<S;T++){const L=C[T];if(p(L,w,T,R)===!0){const X=L.__offset,G=Array.isArray(L.value)?L.value:[L.value];let Z=0;for(let Q=0;Q<G.length;Q++){const N=G[Q],V=v(N);typeof N=="number"||typeof N=="boolean"?(L.__data[0]=N,n.bufferSubData(n.UNIFORM_BUFFER,X+Z,L.__data)):N.isMatrix3?(L.__data[0]=N.elements[0],L.__data[1]=N.elements[1],L.__data[2]=N.elements[2],L.__data[3]=0,L.__data[4]=N.elements[3],L.__data[5]=N.elements[4],L.__data[6]=N.elements[5],L.__data[7]=0,L.__data[8]=N.elements[6],L.__data[9]=N.elements[7],L.__data[10]=N.elements[8],L.__data[11]=0):(N.toArray(L.__data,Z),Z+=V.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,X,L.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(_,x,y,R){const w=_.value,b=x+"_"+y;if(R[b]===void 0)return typeof w=="number"||typeof w=="boolean"?R[b]=w:R[b]=w.clone(),!0;{const C=R[b];if(typeof w=="number"||typeof w=="boolean"){if(C!==w)return R[b]=w,!0}else if(C.equals(w)===!1)return C.copy(w),!0}return!1}function g(_){const x=_.uniforms;let y=0;const R=16;for(let b=0,C=x.length;b<C;b++){const T=Array.isArray(x[b])?x[b]:[x[b]];for(let S=0,L=T.length;S<L;S++){const X=T[S],G=Array.isArray(X.value)?X.value:[X.value];for(let Z=0,Q=G.length;Z<Q;Z++){const N=G[Z],V=v(N),B=y%R,ee=B%V.boundary,se=B+ee;y+=ee,se!==0&&R-se<V.storage&&(y+=R-se),X.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=y,y+=V.storage}}}const w=y%R;return w>0&&(y+=R-w),_.__size=y,_.__cache={},this}function v(_){const x={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(x.boundary=4,x.storage=4):_.isVector2?(x.boundary=8,x.storage=8):_.isVector3||_.isColor?(x.boundary=16,x.storage=12):_.isVector4?(x.boundary=16,x.storage=16):_.isMatrix3?(x.boundary=48,x.storage=48):_.isMatrix4?(x.boundary=64,x.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),x}function m(_){const x=_.target;x.removeEventListener("dispose",m);const y=r.indexOf(x.__bindingPointIndex);r.splice(y,1),n.deleteBuffer(s[x.id]),delete s[x.id],delete a[x.id]}function d(){for(const _ in s)n.deleteBuffer(s[_]);r=[],s={},a={}}return{bind:l,update:c,dispose:d}}class p2{constructor(e={}){const{canvas:t=db(),context:i=null,depth:s=!0,stencil:a=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=r;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,d=null;const _=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=zs,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const y=this;let R=!1;this._outputColorSpace=Qt;let w=0,b=0,C=null,T=-1,S=null;const L=new it,X=new it;let G=null;const Z=new Le(0);let Q=0,N=t.width,V=t.height,B=1,ee=null,se=null;const ve=new it(0,0,N,V),Ue=new it(0,0,N,V);let et=!1;const W=new rm;let ie=!1,_e=!1;const oe=new Pe,Te=new Pe,tt=new O,Re=new it,Lt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Tt=!1;function Xe(){return C===null?B:1}let D=i;function Fn(E,P){return t.getContext(E,P)}try{const E={alpha:!0,depth:s,stencil:a,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${jp}`),t.addEventListener("webglcontextlost",K,!1),t.addEventListener("webglcontextrestored",fe,!1),t.addEventListener("webglcontextcreationerror",ue,!1),D===null){const P="webgl2";if(D=Fn(P,E),D===null)throw Fn(P)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Ze,We,Se,vt,ye,A,M,z,j,J,q,xe,le,de,Qe,ne,pe,Ae,Ce,me,qe,Ie,gt,U;function ce(){Ze=new Tw(D),Ze.init(),Ie=new r2(D,Ze),We=new _w(D,Ze,e,Ie),Se=new s2(D,Ze),We.reverseDepthBuffer&&h&&Se.buffers.depth.setReversed(!0),vt=new Rw(D),ye=new WC,A=new a2(D,Ze,Se,ye,We,Ie,vt),M=new xw(y),z=new Ew(y),j=new NA(D),gt=new mw(D,j),J=new bw(D,j,vt,gt),q=new Cw(D,J,j,vt),Ce=new ww(D,We,A),ne=new vw(ye),xe=new XC(y,M,z,Ze,We,gt,ne),le=new h2(y,ye),de=new YC,Qe=new $C(Ze),Ae=new pw(y,M,z,Se,q,p,l),pe=new n2(y,q,We),U=new d2(D,vt,We,Se),me=new gw(D,Ze,vt),qe=new Aw(D,Ze,vt),vt.programs=xe.programs,y.capabilities=We,y.extensions=Ze,y.properties=ye,y.renderLists=de,y.shadowMap=pe,y.state=Se,y.info=vt}ce();const k=new u2(y,D);this.xr=k,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const E=Ze.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Ze.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(E){E!==void 0&&(B=E,this.setSize(N,V,!1))},this.getSize=function(E){return E.set(N,V)},this.setSize=function(E,P,F=!0){if(k.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=E,V=P,t.width=Math.floor(E*B),t.height=Math.floor(P*B),F===!0&&(t.style.width=E+"px",t.style.height=P+"px"),this.setViewport(0,0,E,P)},this.getDrawingBufferSize=function(E){return E.set(N*B,V*B).floor()},this.setDrawingBufferSize=function(E,P,F){N=E,V=P,B=F,t.width=Math.floor(E*F),t.height=Math.floor(P*F),this.setViewport(0,0,E,P)},this.getCurrentViewport=function(E){return E.copy(L)},this.getViewport=function(E){return E.copy(ve)},this.setViewport=function(E,P,F,H){E.isVector4?ve.set(E.x,E.y,E.z,E.w):ve.set(E,P,F,H),Se.viewport(L.copy(ve).multiplyScalar(B).round())},this.getScissor=function(E){return E.copy(Ue)},this.setScissor=function(E,P,F,H){E.isVector4?Ue.set(E.x,E.y,E.z,E.w):Ue.set(E,P,F,H),Se.scissor(X.copy(Ue).multiplyScalar(B).round())},this.getScissorTest=function(){return et},this.setScissorTest=function(E){Se.setScissorTest(et=E)},this.setOpaqueSort=function(E){ee=E},this.setTransparentSort=function(E){se=E},this.getClearColor=function(E){return E.copy(Ae.getClearColor())},this.setClearColor=function(){Ae.setClearColor(...arguments)},this.getClearAlpha=function(){return Ae.getClearAlpha()},this.setClearAlpha=function(){Ae.setClearAlpha(...arguments)},this.clear=function(E=!0,P=!0,F=!0){let H=0;if(E){let I=!1;if(C!==null){const te=C.texture.format;I=te===tm||te===em||te===$p}if(I){const te=C.texture.type,re=te===is||te===Sa||te===tl||te===nl||te===Zp||te===Qp,he=Ae.getClearColor(),ge=Ae.getClearAlpha(),De=he.r,we=he.g,Me=he.b;re?(g[0]=De,g[1]=we,g[2]=Me,g[3]=ge,D.clearBufferuiv(D.COLOR,0,g)):(v[0]=De,v[1]=we,v[2]=Me,v[3]=ge,D.clearBufferiv(D.COLOR,0,v))}else H|=D.COLOR_BUFFER_BIT}P&&(H|=D.DEPTH_BUFFER_BIT),F&&(H|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",K,!1),t.removeEventListener("webglcontextrestored",fe,!1),t.removeEventListener("webglcontextcreationerror",ue,!1),Ae.dispose(),de.dispose(),Qe.dispose(),ye.dispose(),M.dispose(),z.dispose(),q.dispose(),gt.dispose(),U.dispose(),xe.dispose(),k.dispose(),k.removeEventListener("sessionstart",gm),k.removeEventListener("sessionend",_m),qs.stop()};function K(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function fe(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const E=vt.autoReset,P=pe.enabled,F=pe.autoUpdate,H=pe.needsUpdate,I=pe.type;ce(),vt.autoReset=E,pe.enabled=P,pe.autoUpdate=F,pe.needsUpdate=H,pe.type=I}function ue(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Ne(E){const P=E.target;P.removeEventListener("dispose",Ne),Rt(P)}function Rt(E){en(E),ye.remove(E)}function en(E){const P=ye.get(E).programs;P!==void 0&&(P.forEach(function(F){xe.releaseProgram(F)}),E.isShaderMaterial&&xe.releaseShaderCache(E))}this.renderBufferDirect=function(E,P,F,H,I,te){P===null&&(P=Lt);const re=I.isMesh&&I.matrixWorld.determinant()<0,he=nS(E,P,F,H,I);Se.setMaterial(H,re);let ge=F.index,De=1;if(H.wireframe===!0){if(ge=J.getWireframeAttribute(F),ge===void 0)return;De=2}const we=F.drawRange,Me=F.attributes.position;let Je=we.start*De,at=(we.start+we.count)*De;te!==null&&(Je=Math.max(Je,te.start*De),at=Math.min(at,(te.start+te.count)*De)),ge!==null?(Je=Math.max(Je,0),at=Math.min(at,ge.count)):Me!=null&&(Je=Math.max(Je,0),at=Math.min(at,Me.count));const Ot=at-Je;if(Ot<0||Ot===1/0)return;gt.setup(I,H,he,F,ge);let wt,$e=me;if(ge!==null&&(wt=j.get(ge),$e=qe,$e.setIndex(wt)),I.isMesh)H.wireframe===!0?(Se.setLineWidth(H.wireframeLinewidth*Xe()),$e.setMode(D.LINES)):$e.setMode(D.TRIANGLES);else if(I.isLine){let Ee=H.linewidth;Ee===void 0&&(Ee=1),Se.setLineWidth(Ee*Xe()),I.isLineSegments?$e.setMode(D.LINES):I.isLineLoop?$e.setMode(D.LINE_LOOP):$e.setMode(D.LINE_STRIP)}else I.isPoints?$e.setMode(D.POINTS):I.isSprite&&$e.setMode(D.TRIANGLES);if(I.isBatchedMesh)if(I._multiDrawInstances!==null)zc("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),$e.renderMultiDrawInstances(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount,I._multiDrawInstances);else if(Ze.get("WEBGL_multi_draw"))$e.renderMultiDraw(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount);else{const Ee=I._multiDrawStarts,Kt=I._multiDrawCounts,rt=I._multiDrawCount,ni=ge?j.get(ge).bytesPerElement:1,Ra=ye.get(H).currentProgram.getUniforms();for(let Tn=0;Tn<rt;Tn++)Ra.setValue(D,"_gl_DrawID",Tn),$e.render(Ee[Tn]/ni,Kt[Tn])}else if(I.isInstancedMesh)$e.renderInstances(Je,Ot,I.count);else if(F.isInstancedBufferGeometry){const Ee=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,Kt=Math.min(F.instanceCount,Ee);$e.renderInstances(Je,Ot,Kt)}else $e.render(Je,Ot)};function ot(E,P,F){E.transparent===!0&&E.side===oi&&E.forceSinglePass===!1?(E.side=Sn,E.needsUpdate=!0,Cl(E,P,F),E.side=ns,E.needsUpdate=!0,Cl(E,P,F),E.side=oi):Cl(E,P,F)}this.compile=function(E,P,F=null){F===null&&(F=E),d=Qe.get(F),d.init(P),x.push(d),F.traverseVisible(function(I){I.isLight&&I.layers.test(P.layers)&&(d.pushLight(I),I.castShadow&&d.pushShadow(I))}),E!==F&&E.traverseVisible(function(I){I.isLight&&I.layers.test(P.layers)&&(d.pushLight(I),I.castShadow&&d.pushShadow(I))}),d.setupLights();const H=new Set;return E.traverse(function(I){if(!(I.isMesh||I.isPoints||I.isLine||I.isSprite))return;const te=I.material;if(te)if(Array.isArray(te))for(let re=0;re<te.length;re++){const he=te[re];ot(he,F,I),H.add(he)}else ot(te,F,I),H.add(te)}),d=x.pop(),H},this.compileAsync=function(E,P,F=null){const H=this.compile(E,P,F);return new Promise(I=>{function te(){if(H.forEach(function(re){ye.get(re).currentProgram.isReady()&&H.delete(re)}),H.size===0){I(E);return}setTimeout(te,10)}Ze.get("KHR_parallel_shader_compile")!==null?te():setTimeout(te,10)})};let ti=null;function Ci(E){ti&&ti(E)}function gm(){qs.stop()}function _m(){qs.start()}const qs=new jy;qs.setAnimationLoop(Ci),typeof self<"u"&&qs.setContext(self),this.setAnimationLoop=function(E){ti=E,k.setAnimationLoop(E),E===null?qs.stop():qs.start()},k.addEventListener("sessionstart",gm),k.addEventListener("sessionend",_m),this.render=function(E,P){if(P!==void 0&&P.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),k.enabled===!0&&k.isPresenting===!0&&(k.cameraAutoUpdate===!0&&k.updateCamera(P),P=k.getCamera()),E.isScene===!0&&E.onBeforeRender(y,E,P,C),d=Qe.get(E,x.length),d.init(P),x.push(d),Te.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),W.setFromProjectionMatrix(Te),_e=this.localClippingEnabled,ie=ne.init(this.clippingPlanes,_e),m=de.get(E,_.length),m.init(),_.push(m),k.enabled===!0&&k.isPresenting===!0){const te=y.xr.getDepthSensingMesh();te!==null&&ku(te,P,-1/0,y.sortObjects)}ku(E,P,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(ee,se),Tt=k.enabled===!1||k.isPresenting===!1||k.hasDepthSensing()===!1,Tt&&Ae.addToRenderList(m,E),this.info.render.frame++,ie===!0&&ne.beginShadows();const F=d.state.shadowsArray;pe.render(F,E,P),ie===!0&&ne.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=m.opaque,I=m.transmissive;if(d.setupLights(),P.isArrayCamera){const te=P.cameras;if(I.length>0)for(let re=0,he=te.length;re<he;re++){const ge=te[re];xm(H,I,E,ge)}Tt&&Ae.render(E);for(let re=0,he=te.length;re<he;re++){const ge=te[re];vm(m,E,ge,ge.viewport)}}else I.length>0&&xm(H,I,E,P),Tt&&Ae.render(E),vm(m,E,P);C!==null&&b===0&&(A.updateMultisampleRenderTarget(C),A.updateRenderTargetMipmap(C)),E.isScene===!0&&E.onAfterRender(y,E,P),gt.resetDefaultState(),T=-1,S=null,x.pop(),x.length>0?(d=x[x.length-1],ie===!0&&ne.setGlobalState(y.clippingPlanes,d.state.camera)):d=null,_.pop(),_.length>0?m=_[_.length-1]:m=null};function ku(E,P,F,H){if(E.visible===!1)return;if(E.layers.test(P.layers)){if(E.isGroup)F=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(P);else if(E.isLight)d.pushLight(E),E.castShadow&&d.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||W.intersectsSprite(E)){H&&Re.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Te);const re=q.update(E),he=E.material;he.visible&&m.push(E,re,he,F,Re.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||W.intersectsObject(E))){const re=q.update(E),he=E.material;if(H&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Re.copy(E.boundingSphere.center)):(re.boundingSphere===null&&re.computeBoundingSphere(),Re.copy(re.boundingSphere.center)),Re.applyMatrix4(E.matrixWorld).applyMatrix4(Te)),Array.isArray(he)){const ge=re.groups;for(let De=0,we=ge.length;De<we;De++){const Me=ge[De],Je=he[Me.materialIndex];Je&&Je.visible&&m.push(E,re,Je,F,Re.z,Me)}}else he.visible&&m.push(E,re,he,F,Re.z,null)}}const te=E.children;for(let re=0,he=te.length;re<he;re++)ku(te[re],P,F,H)}function vm(E,P,F,H){const I=E.opaque,te=E.transmissive,re=E.transparent;d.setupLightsView(F),ie===!0&&ne.setGlobalState(y.clippingPlanes,F),H&&Se.viewport(L.copy(H)),I.length>0&&wl(I,P,F),te.length>0&&wl(te,P,F),re.length>0&&wl(re,P,F),Se.buffers.depth.setTest(!0),Se.buffers.depth.setMask(!0),Se.buffers.color.setMask(!0),Se.setPolygonOffset(!1)}function xm(E,P,F,H){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[H.id]===void 0&&(d.state.transmissionRenderTarget[H.id]=new Ma(1,1,{generateMipmaps:!0,type:Ze.has("EXT_color_buffer_half_float")||Ze.has("EXT_color_buffer_float")?Tl:is,minFilter:Yi,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ye.workingColorSpace}));const te=d.state.transmissionRenderTarget[H.id],re=H.viewport||L;te.setSize(re.z*y.transmissionResolutionScale,re.w*y.transmissionResolutionScale);const he=y.getRenderTarget();y.setRenderTarget(te),y.getClearColor(Z),Q=y.getClearAlpha(),Q<1&&y.setClearColor(16777215,.5),y.clear(),Tt&&Ae.render(F);const ge=y.toneMapping;y.toneMapping=zs;const De=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),d.setupLightsView(H),ie===!0&&ne.setGlobalState(y.clippingPlanes,H),wl(E,F,H),A.updateMultisampleRenderTarget(te),A.updateRenderTargetMipmap(te),Ze.has("WEBGL_multisampled_render_to_texture")===!1){let we=!1;for(let Me=0,Je=P.length;Me<Je;Me++){const at=P[Me],Ot=at.object,wt=at.geometry,$e=at.material,Ee=at.group;if($e.side===oi&&Ot.layers.test(H.layers)){const Kt=$e.side;$e.side=Sn,$e.needsUpdate=!0,ym(Ot,F,H,wt,$e,Ee),$e.side=Kt,$e.needsUpdate=!0,we=!0}}we===!0&&(A.updateMultisampleRenderTarget(te),A.updateRenderTargetMipmap(te))}y.setRenderTarget(he),y.setClearColor(Z,Q),De!==void 0&&(H.viewport=De),y.toneMapping=ge}function wl(E,P,F){const H=P.isScene===!0?P.overrideMaterial:null;for(let I=0,te=E.length;I<te;I++){const re=E[I],he=re.object,ge=re.geometry,De=re.group;let we=re.material;we.allowOverride===!0&&H!==null&&(we=H),he.layers.test(F.layers)&&ym(he,P,F,ge,we,De)}}function ym(E,P,F,H,I,te){E.onBeforeRender(y,P,F,H,I,te),E.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),I.onBeforeRender(y,P,F,H,E,te),I.transparent===!0&&I.side===oi&&I.forceSinglePass===!1?(I.side=Sn,I.needsUpdate=!0,y.renderBufferDirect(F,P,H,I,E,te),I.side=ns,I.needsUpdate=!0,y.renderBufferDirect(F,P,H,I,E,te),I.side=oi):y.renderBufferDirect(F,P,H,I,E,te),E.onAfterRender(y,P,F,H,I,te)}function Cl(E,P,F){P.isScene!==!0&&(P=Lt);const H=ye.get(E),I=d.state.lights,te=d.state.shadowsArray,re=I.state.version,he=xe.getParameters(E,I.state,te,P,F),ge=xe.getProgramCacheKey(he);let De=H.programs;H.environment=E.isMeshStandardMaterial?P.environment:null,H.fog=P.fog,H.envMap=(E.isMeshStandardMaterial?z:M).get(E.envMap||H.environment),H.envMapRotation=H.environment!==null&&E.envMap===null?P.environmentRotation:E.envMapRotation,De===void 0&&(E.addEventListener("dispose",Ne),De=new Map,H.programs=De);let we=De.get(ge);if(we!==void 0){if(H.currentProgram===we&&H.lightsStateVersion===re)return Mm(E,he),we}else he.uniforms=xe.getUniforms(E),E.onBeforeCompile(he,y),we=xe.acquireProgram(he,ge),De.set(ge,we),H.uniforms=he.uniforms;const Me=H.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Me.clippingPlanes=ne.uniform),Mm(E,he),H.needsLights=sS(E),H.lightsStateVersion=re,H.needsLights&&(Me.ambientLightColor.value=I.state.ambient,Me.lightProbe.value=I.state.probe,Me.directionalLights.value=I.state.directional,Me.directionalLightShadows.value=I.state.directionalShadow,Me.spotLights.value=I.state.spot,Me.spotLightShadows.value=I.state.spotShadow,Me.rectAreaLights.value=I.state.rectArea,Me.ltc_1.value=I.state.rectAreaLTC1,Me.ltc_2.value=I.state.rectAreaLTC2,Me.pointLights.value=I.state.point,Me.pointLightShadows.value=I.state.pointShadow,Me.hemisphereLights.value=I.state.hemi,Me.directionalShadowMap.value=I.state.directionalShadowMap,Me.directionalShadowMatrix.value=I.state.directionalShadowMatrix,Me.spotShadowMap.value=I.state.spotShadowMap,Me.spotLightMatrix.value=I.state.spotLightMatrix,Me.spotLightMap.value=I.state.spotLightMap,Me.pointShadowMap.value=I.state.pointShadowMap,Me.pointShadowMatrix.value=I.state.pointShadowMatrix),H.currentProgram=we,H.uniformsList=null,we}function Sm(E){if(E.uniformsList===null){const P=E.currentProgram.getUniforms();E.uniformsList=Fc.seqWithValue(P.seq,E.uniforms)}return E.uniformsList}function Mm(E,P){const F=ye.get(E);F.outputColorSpace=P.outputColorSpace,F.batching=P.batching,F.batchingColor=P.batchingColor,F.instancing=P.instancing,F.instancingColor=P.instancingColor,F.instancingMorph=P.instancingMorph,F.skinning=P.skinning,F.morphTargets=P.morphTargets,F.morphNormals=P.morphNormals,F.morphColors=P.morphColors,F.morphTargetsCount=P.morphTargetsCount,F.numClippingPlanes=P.numClippingPlanes,F.numIntersection=P.numClipIntersection,F.vertexAlphas=P.vertexAlphas,F.vertexTangents=P.vertexTangents,F.toneMapping=P.toneMapping}function nS(E,P,F,H,I){P.isScene!==!0&&(P=Lt),A.resetTextureUnits();const te=P.fog,re=H.isMeshStandardMaterial?P.environment:null,he=C===null?y.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:mn,ge=(H.isMeshStandardMaterial?z:M).get(H.envMap||re),De=H.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,we=!!F.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Me=!!F.morphAttributes.position,Je=!!F.morphAttributes.normal,at=!!F.morphAttributes.color;let Ot=zs;H.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(Ot=y.toneMapping);const wt=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,$e=wt!==void 0?wt.length:0,Ee=ye.get(H),Kt=d.state.lights;if(ie===!0&&(_e===!0||E!==S)){const on=E===S&&H.id===T;ne.setState(H,E,on)}let rt=!1;H.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==Kt.state.version||Ee.outputColorSpace!==he||I.isBatchedMesh&&Ee.batching===!1||!I.isBatchedMesh&&Ee.batching===!0||I.isBatchedMesh&&Ee.batchingColor===!0&&I.colorTexture===null||I.isBatchedMesh&&Ee.batchingColor===!1&&I.colorTexture!==null||I.isInstancedMesh&&Ee.instancing===!1||!I.isInstancedMesh&&Ee.instancing===!0||I.isSkinnedMesh&&Ee.skinning===!1||!I.isSkinnedMesh&&Ee.skinning===!0||I.isInstancedMesh&&Ee.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&Ee.instancingColor===!1&&I.instanceColor!==null||I.isInstancedMesh&&Ee.instancingMorph===!0&&I.morphTexture===null||I.isInstancedMesh&&Ee.instancingMorph===!1&&I.morphTexture!==null||Ee.envMap!==ge||H.fog===!0&&Ee.fog!==te||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==ne.numPlanes||Ee.numIntersection!==ne.numIntersection)||Ee.vertexAlphas!==De||Ee.vertexTangents!==we||Ee.morphTargets!==Me||Ee.morphNormals!==Je||Ee.morphColors!==at||Ee.toneMapping!==Ot||Ee.morphTargetsCount!==$e)&&(rt=!0):(rt=!0,Ee.__version=H.version);let ni=Ee.currentProgram;rt===!0&&(ni=Cl(H,P,I));let Ra=!1,Tn=!1,Jr=!1;const yt=ni.getUniforms(),Hn=Ee.uniforms;if(Se.useProgram(ni.program)&&(Ra=!0,Tn=!0,Jr=!0),H.id!==T&&(T=H.id,Tn=!0),Ra||S!==E){Se.buffers.depth.getReversed()?(oe.copy(E.projectionMatrix),mb(oe),gb(oe),yt.setValue(D,"projectionMatrix",oe)):yt.setValue(D,"projectionMatrix",E.projectionMatrix),yt.setValue(D,"viewMatrix",E.matrixWorldInverse);const _n=yt.map.cameraPosition;_n!==void 0&&_n.setValue(D,tt.setFromMatrixPosition(E.matrixWorld)),We.logarithmicDepthBuffer&&yt.setValue(D,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&yt.setValue(D,"isOrthographic",E.isOrthographicCamera===!0),S!==E&&(S=E,Tn=!0,Jr=!0)}if(I.isSkinnedMesh){yt.setOptional(D,I,"bindMatrix"),yt.setOptional(D,I,"bindMatrixInverse");const on=I.skeleton;on&&(on.boneTexture===null&&on.computeBoneTexture(),yt.setValue(D,"boneTexture",on.boneTexture,A))}I.isBatchedMesh&&(yt.setOptional(D,I,"batchingTexture"),yt.setValue(D,"batchingTexture",I._matricesTexture,A),yt.setOptional(D,I,"batchingIdTexture"),yt.setValue(D,"batchingIdTexture",I._indirectTexture,A),yt.setOptional(D,I,"batchingColorTexture"),I._colorsTexture!==null&&yt.setValue(D,"batchingColorTexture",I._colorsTexture,A));const Gn=F.morphAttributes;if((Gn.position!==void 0||Gn.normal!==void 0||Gn.color!==void 0)&&Ce.update(I,F,ni),(Tn||Ee.receiveShadow!==I.receiveShadow)&&(Ee.receiveShadow=I.receiveShadow,yt.setValue(D,"receiveShadow",I.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Hn.envMap.value=ge,Hn.flipEnvMap.value=ge.isCubeTexture&&ge.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&P.environment!==null&&(Hn.envMapIntensity.value=P.environmentIntensity),Tn&&(yt.setValue(D,"toneMappingExposure",y.toneMappingExposure),Ee.needsLights&&iS(Hn,Jr),te&&H.fog===!0&&le.refreshFogUniforms(Hn,te),le.refreshMaterialUniforms(Hn,H,B,V,d.state.transmissionRenderTarget[E.id]),Fc.upload(D,Sm(Ee),Hn,A)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Fc.upload(D,Sm(Ee),Hn,A),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&yt.setValue(D,"center",I.center),yt.setValue(D,"modelViewMatrix",I.modelViewMatrix),yt.setValue(D,"normalMatrix",I.normalMatrix),yt.setValue(D,"modelMatrix",I.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const on=H.uniformsGroups;for(let _n=0,Xu=on.length;_n<Xu;_n++){const Ys=on[_n];U.update(Ys,ni),U.bind(Ys,ni)}}return ni}function iS(E,P){E.ambientLightColor.needsUpdate=P,E.lightProbe.needsUpdate=P,E.directionalLights.needsUpdate=P,E.directionalLightShadows.needsUpdate=P,E.pointLights.needsUpdate=P,E.pointLightShadows.needsUpdate=P,E.spotLights.needsUpdate=P,E.spotLightShadows.needsUpdate=P,E.rectAreaLights.needsUpdate=P,E.hemisphereLights.needsUpdate=P}function sS(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(E,P,F){const H=ye.get(E);H.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),ye.get(E.texture).__webglTexture=P,ye.get(E.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:F,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,P){const F=ye.get(E);F.__webglFramebuffer=P,F.__useDefaultFramebuffer=P===void 0};const aS=D.createFramebuffer();this.setRenderTarget=function(E,P=0,F=0){C=E,w=P,b=F;let H=!0,I=null,te=!1,re=!1;if(E){const ge=ye.get(E);if(ge.__useDefaultFramebuffer!==void 0)Se.bindFramebuffer(D.FRAMEBUFFER,null),H=!1;else if(ge.__webglFramebuffer===void 0)A.setupRenderTarget(E);else if(ge.__hasExternalTextures)A.rebindTextures(E,ye.get(E.texture).__webglTexture,ye.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Me=E.depthTexture;if(ge.__boundDepthTexture!==Me){if(Me!==null&&ye.has(Me)&&(E.width!==Me.image.width||E.height!==Me.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(E)}}const De=E.texture;(De.isData3DTexture||De.isDataArrayTexture||De.isCompressedArrayTexture)&&(re=!0);const we=ye.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(we[P])?I=we[P][F]:I=we[P],te=!0):E.samples>0&&A.useMultisampledRTT(E)===!1?I=ye.get(E).__webglMultisampledFramebuffer:Array.isArray(we)?I=we[F]:I=we,L.copy(E.viewport),X.copy(E.scissor),G=E.scissorTest}else L.copy(ve).multiplyScalar(B).floor(),X.copy(Ue).multiplyScalar(B).floor(),G=et;if(F!==0&&(I=aS),Se.bindFramebuffer(D.FRAMEBUFFER,I)&&H&&Se.drawBuffers(E,I),Se.viewport(L),Se.scissor(X),Se.setScissorTest(G),te){const ge=ye.get(E.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+P,ge.__webglTexture,F)}else if(re){const ge=ye.get(E.texture),De=P;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,ge.__webglTexture,F,De)}else if(E!==null&&F!==0){const ge=ye.get(E.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,ge.__webglTexture,F)}T=-1},this.readRenderTargetPixels=function(E,P,F,H,I,te,re){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let he=ye.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&re!==void 0&&(he=he[re]),he){Se.bindFramebuffer(D.FRAMEBUFFER,he);try{const ge=E.texture,De=ge.format,we=ge.type;if(!We.textureFormatReadable(De)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!We.textureTypeReadable(we)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=E.width-H&&F>=0&&F<=E.height-I&&D.readPixels(P,F,H,I,Ie.convert(De),Ie.convert(we),te)}finally{const ge=C!==null?ye.get(C).__webglFramebuffer:null;Se.bindFramebuffer(D.FRAMEBUFFER,ge)}}},this.readRenderTargetPixelsAsync=async function(E,P,F,H,I,te,re){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let he=ye.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&re!==void 0&&(he=he[re]),he)if(P>=0&&P<=E.width-H&&F>=0&&F<=E.height-I){Se.bindFramebuffer(D.FRAMEBUFFER,he);const ge=E.texture,De=ge.format,we=ge.type;if(!We.textureFormatReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!We.textureTypeReadable(we))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Me=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Me),D.bufferData(D.PIXEL_PACK_BUFFER,te.byteLength,D.STREAM_READ),D.readPixels(P,F,H,I,Ie.convert(De),Ie.convert(we),0);const Je=C!==null?ye.get(C).__webglFramebuffer:null;Se.bindFramebuffer(D.FRAMEBUFFER,Je);const at=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await pb(D,at,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Me),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,te),D.deleteBuffer(Me),D.deleteSync(at),te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,P=null,F=0){const H=Math.pow(2,-F),I=Math.floor(E.image.width*H),te=Math.floor(E.image.height*H),re=P!==null?P.x:0,he=P!==null?P.y:0;A.setTexture2D(E,0),D.copyTexSubImage2D(D.TEXTURE_2D,F,0,0,re,he,I,te),Se.unbindTexture()};const rS=D.createFramebuffer(),oS=D.createFramebuffer();this.copyTextureToTexture=function(E,P,F=null,H=null,I=0,te=null){te===null&&(I!==0?(zc("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),te=I,I=0):te=0);let re,he,ge,De,we,Me,Je,at,Ot;const wt=E.isCompressedTexture?E.mipmaps[te]:E.image;if(F!==null)re=F.max.x-F.min.x,he=F.max.y-F.min.y,ge=F.isBox3?F.max.z-F.min.z:1,De=F.min.x,we=F.min.y,Me=F.isBox3?F.min.z:0;else{const Gn=Math.pow(2,-I);re=Math.floor(wt.width*Gn),he=Math.floor(wt.height*Gn),E.isDataArrayTexture?ge=wt.depth:E.isData3DTexture?ge=Math.floor(wt.depth*Gn):ge=1,De=0,we=0,Me=0}H!==null?(Je=H.x,at=H.y,Ot=H.z):(Je=0,at=0,Ot=0);const $e=Ie.convert(P.format),Ee=Ie.convert(P.type);let Kt;P.isData3DTexture?(A.setTexture3D(P,0),Kt=D.TEXTURE_3D):P.isDataArrayTexture||P.isCompressedArrayTexture?(A.setTexture2DArray(P,0),Kt=D.TEXTURE_2D_ARRAY):(A.setTexture2D(P,0),Kt=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,P.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,P.unpackAlignment);const rt=D.getParameter(D.UNPACK_ROW_LENGTH),ni=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Ra=D.getParameter(D.UNPACK_SKIP_PIXELS),Tn=D.getParameter(D.UNPACK_SKIP_ROWS),Jr=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,wt.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,wt.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,De),D.pixelStorei(D.UNPACK_SKIP_ROWS,we),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Me);const yt=E.isDataArrayTexture||E.isData3DTexture,Hn=P.isDataArrayTexture||P.isData3DTexture;if(E.isDepthTexture){const Gn=ye.get(E),on=ye.get(P),_n=ye.get(Gn.__renderTarget),Xu=ye.get(on.__renderTarget);Se.bindFramebuffer(D.READ_FRAMEBUFFER,_n.__webglFramebuffer),Se.bindFramebuffer(D.DRAW_FRAMEBUFFER,Xu.__webglFramebuffer);for(let Ys=0;Ys<ge;Ys++)yt&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,ye.get(E).__webglTexture,I,Me+Ys),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,ye.get(P).__webglTexture,te,Ot+Ys)),D.blitFramebuffer(De,we,re,he,Je,at,re,he,D.DEPTH_BUFFER_BIT,D.NEAREST);Se.bindFramebuffer(D.READ_FRAMEBUFFER,null),Se.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(I!==0||E.isRenderTargetTexture||ye.has(E)){const Gn=ye.get(E),on=ye.get(P);Se.bindFramebuffer(D.READ_FRAMEBUFFER,rS),Se.bindFramebuffer(D.DRAW_FRAMEBUFFER,oS);for(let _n=0;_n<ge;_n++)yt?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Gn.__webglTexture,I,Me+_n):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Gn.__webglTexture,I),Hn?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,on.__webglTexture,te,Ot+_n):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,on.__webglTexture,te),I!==0?D.blitFramebuffer(De,we,re,he,Je,at,re,he,D.COLOR_BUFFER_BIT,D.NEAREST):Hn?D.copyTexSubImage3D(Kt,te,Je,at,Ot+_n,De,we,re,he):D.copyTexSubImage2D(Kt,te,Je,at,De,we,re,he);Se.bindFramebuffer(D.READ_FRAMEBUFFER,null),Se.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Hn?E.isDataTexture||E.isData3DTexture?D.texSubImage3D(Kt,te,Je,at,Ot,re,he,ge,$e,Ee,wt.data):P.isCompressedArrayTexture?D.compressedTexSubImage3D(Kt,te,Je,at,Ot,re,he,ge,$e,wt.data):D.texSubImage3D(Kt,te,Je,at,Ot,re,he,ge,$e,Ee,wt):E.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,te,Je,at,re,he,$e,Ee,wt.data):E.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,te,Je,at,wt.width,wt.height,$e,wt.data):D.texSubImage2D(D.TEXTURE_2D,te,Je,at,re,he,$e,Ee,wt);D.pixelStorei(D.UNPACK_ROW_LENGTH,rt),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ni),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Ra),D.pixelStorei(D.UNPACK_SKIP_ROWS,Tn),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Jr),te===0&&P.generateMipmaps&&D.generateMipmap(Kt),Se.unbindTexture()},this.copyTextureToTexture3D=function(E,P,F=null,H=null,I=0){return zc('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,P,F,H,I)},this.initRenderTarget=function(E){ye.get(E).__webglFramebuffer===void 0&&A.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?A.setTextureCube(E,0):E.isData3DTexture?A.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?A.setTexture2DArray(E,0):A.setTexture2D(E,0),Se.unbindTexture()},this.resetState=function(){w=0,b=0,C=null,Se.reset(),gt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ji}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ye._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ye._getUnpackColorSpace()}}function h0(n,e){if(e===HT)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),n;if(e===Gd||e===wy){let t=n.getIndex();if(t===null){const r=[],o=n.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)r.push(l);n.setIndex(r),t=n.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),n}const i=t.count-2,s=[];if(e===Gd)for(let r=1;r<=i;r++)s.push(t.getX(0)),s.push(t.getX(r)),s.push(t.getX(r+1));else for(let r=0;r<i;r++)r%2===0?(s.push(t.getX(r)),s.push(t.getX(r+1)),s.push(t.getX(r+2))):(s.push(t.getX(r+2)),s.push(t.getX(r+1)),s.push(t.getX(r)));s.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const a=n.clone();return a.setIndex(s),a.clearGroups(),a}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),n}class m2 extends Zr{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new y2(t)}),this.register(function(t){return new S2(t)}),this.register(function(t){return new D2(t)}),this.register(function(t){return new L2(t)}),this.register(function(t){return new U2(t)}),this.register(function(t){return new E2(t)}),this.register(function(t){return new T2(t)}),this.register(function(t){return new b2(t)}),this.register(function(t){return new A2(t)}),this.register(function(t){return new x2(t)}),this.register(function(t){return new R2(t)}),this.register(function(t){return new M2(t)}),this.register(function(t){return new C2(t)}),this.register(function(t){return new w2(t)}),this.register(function(t){return new _2(t)}),this.register(function(t){return new N2(t)}),this.register(function(t){return new O2(t)})}load(e,t,i,s){const a=this;let r;if(this.resourcePath!=="")r=this.resourcePath;else if(this.path!==""){const c=Ho.extractUrlBase(e);r=Ho.resolveURL(c,this.path)}else r=Ho.extractUrlBase(e);this.manager.itemStart(e);const o=function(c){s?s(c):console.error(c),a.manager.itemError(e),a.manager.itemEnd(e)},l=new qy(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{a.parse(c,r,function(u){t(u),a.manager.itemEnd(e)},o)}catch(u){o(u)}},i,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,i,s){let a;const r={},o={},l=new TextDecoder;if(typeof e=="string")a=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===$y){try{r[ke.KHR_BINARY_GLTF]=new P2(e)}catch(f){s&&s(f);return}a=JSON.parse(r[ke.KHR_BINARY_GLTF].content)}else a=JSON.parse(l.decode(e));else a=e;if(a.asset===void 0||a.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new j2(a,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const f=this.pluginCallbacks[u](c);f.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[f.name]=f,r[f.name]=!0}if(a.extensionsUsed)for(let u=0;u<a.extensionsUsed.length;++u){const f=a.extensionsUsed[u],h=a.extensionsRequired||[];switch(f){case ke.KHR_MATERIALS_UNLIT:r[f]=new v2;break;case ke.KHR_DRACO_MESH_COMPRESSION:r[f]=new I2(a,this.dracoLoader);break;case ke.KHR_TEXTURE_TRANSFORM:r[f]=new B2;break;case ke.KHR_MESH_QUANTIZATION:r[f]=new z2;break;default:h.indexOf(f)>=0&&o[f]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+f+'".')}}c.setExtensions(r),c.setPlugins(o),c.parse(i,s)}parseAsync(e,t){const i=this;return new Promise(function(s,a){i.parse(e,t,s,a)})}}function g2(){let n={};return{get:function(e){return n[e]},add:function(e,t){n[e]=t},remove:function(e){delete n[e]},removeAll:function(){n={}}}}const ke={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class _2{constructor(e){this.parser=e,this.name=ke.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let i=0,s=t.length;i<s;i++){const a=t[i];a.extensions&&a.extensions[this.name]&&a.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,a.extensions[this.name].light)}}_loadLight(e){const t=this.parser,i="light:"+e;let s=t.cache.get(i);if(s)return s;const a=t.json,l=((a.extensions&&a.extensions[this.name]||{}).lights||[])[e];let c;const u=new Le(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],mn);const f=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Yy(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new _A(u),c.distance=f;break;case"spot":c=new mA(u),c.distance=f,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),Hi(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(i,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,i=this.parser,a=i.json.nodes[e],o=(a.extensions&&a.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return i._getNodeRef(t.cache,o,l)})}}class v2{constructor(){this.name=ke.KHR_MATERIALS_UNLIT}getMaterialType(){return xi}extendParams(e,t,i){const s=[];e.color=new Le(1,1,1),e.opacity=1;const a=t.pbrMetallicRoughness;if(a){if(Array.isArray(a.baseColorFactor)){const r=a.baseColorFactor;e.color.setRGB(r[0],r[1],r[2],mn),e.opacity=r[3]}a.baseColorTexture!==void 0&&s.push(i.assignTexture(e,"map",a.baseColorTexture,Qt))}return Promise.all(s)}}class x2{constructor(e){this.parser=e,this.name=ke.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const a=s.extensions[this.name].emissiveStrength;return a!==void 0&&(t.emissiveIntensity=a),Promise.resolve()}}class y2{constructor(e){this.parser=e,this.name=ke.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:wi}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const a=[],r=s.extensions[this.name];if(r.clearcoatFactor!==void 0&&(t.clearcoat=r.clearcoatFactor),r.clearcoatTexture!==void 0&&a.push(i.assignTexture(t,"clearcoatMap",r.clearcoatTexture)),r.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=r.clearcoatRoughnessFactor),r.clearcoatRoughnessTexture!==void 0&&a.push(i.assignTexture(t,"clearcoatRoughnessMap",r.clearcoatRoughnessTexture)),r.clearcoatNormalTexture!==void 0&&(a.push(i.assignTexture(t,"clearcoatNormalMap",r.clearcoatNormalTexture)),r.clearcoatNormalTexture.scale!==void 0)){const o=r.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ke(o,o)}return Promise.all(a)}}class S2{constructor(e){this.parser=e,this.name=ke.KHR_MATERIALS_DISPERSION}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:wi}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const a=s.extensions[this.name];return t.dispersion=a.dispersion!==void 0?a.dispersion:0,Promise.resolve()}}class M2{constructor(e){this.parser=e,this.name=ke.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:wi}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const a=[],r=s.extensions[this.name];return r.iridescenceFactor!==void 0&&(t.iridescence=r.iridescenceFactor),r.iridescenceTexture!==void 0&&a.push(i.assignTexture(t,"iridescenceMap",r.iridescenceTexture)),r.iridescenceIor!==void 0&&(t.iridescenceIOR=r.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),r.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=r.iridescenceThicknessMinimum),r.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=r.iridescenceThicknessMaximum),r.iridescenceThicknessTexture!==void 0&&a.push(i.assignTexture(t,"iridescenceThicknessMap",r.iridescenceThicknessTexture)),Promise.all(a)}}class E2{constructor(e){this.parser=e,this.name=ke.KHR_MATERIALS_SHEEN}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:wi}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const a=[];t.sheenColor=new Le(0,0,0),t.sheenRoughness=0,t.sheen=1;const r=s.extensions[this.name];if(r.sheenColorFactor!==void 0){const o=r.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],mn)}return r.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=r.sheenRoughnessFactor),r.sheenColorTexture!==void 0&&a.push(i.assignTexture(t,"sheenColorMap",r.sheenColorTexture,Qt)),r.sheenRoughnessTexture!==void 0&&a.push(i.assignTexture(t,"sheenRoughnessMap",r.sheenRoughnessTexture)),Promise.all(a)}}class T2{constructor(e){this.parser=e,this.name=ke.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:wi}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const a=[],r=s.extensions[this.name];return r.transmissionFactor!==void 0&&(t.transmission=r.transmissionFactor),r.transmissionTexture!==void 0&&a.push(i.assignTexture(t,"transmissionMap",r.transmissionTexture)),Promise.all(a)}}class b2{constructor(e){this.parser=e,this.name=ke.KHR_MATERIALS_VOLUME}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:wi}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const a=[],r=s.extensions[this.name];t.thickness=r.thicknessFactor!==void 0?r.thicknessFactor:0,r.thicknessTexture!==void 0&&a.push(i.assignTexture(t,"thicknessMap",r.thicknessTexture)),t.attenuationDistance=r.attenuationDistance||1/0;const o=r.attenuationColor||[1,1,1];return t.attenuationColor=new Le().setRGB(o[0],o[1],o[2],mn),Promise.all(a)}}class A2{constructor(e){this.parser=e,this.name=ke.KHR_MATERIALS_IOR}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:wi}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const a=s.extensions[this.name];return t.ior=a.ior!==void 0?a.ior:1.5,Promise.resolve()}}class R2{constructor(e){this.parser=e,this.name=ke.KHR_MATERIALS_SPECULAR}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:wi}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const a=[],r=s.extensions[this.name];t.specularIntensity=r.specularFactor!==void 0?r.specularFactor:1,r.specularTexture!==void 0&&a.push(i.assignTexture(t,"specularIntensityMap",r.specularTexture));const o=r.specularColorFactor||[1,1,1];return t.specularColor=new Le().setRGB(o[0],o[1],o[2],mn),r.specularColorTexture!==void 0&&a.push(i.assignTexture(t,"specularColorMap",r.specularColorTexture,Qt)),Promise.all(a)}}class w2{constructor(e){this.parser=e,this.name=ke.EXT_MATERIALS_BUMP}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:wi}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const a=[],r=s.extensions[this.name];return t.bumpScale=r.bumpFactor!==void 0?r.bumpFactor:1,r.bumpTexture!==void 0&&a.push(i.assignTexture(t,"bumpMap",r.bumpTexture)),Promise.all(a)}}class C2{constructor(e){this.parser=e,this.name=ke.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:wi}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const a=[],r=s.extensions[this.name];return r.anisotropyStrength!==void 0&&(t.anisotropy=r.anisotropyStrength),r.anisotropyRotation!==void 0&&(t.anisotropyRotation=r.anisotropyRotation),r.anisotropyTexture!==void 0&&a.push(i.assignTexture(t,"anisotropyMap",r.anisotropyTexture)),Promise.all(a)}}class D2{constructor(e){this.parser=e,this.name=ke.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,i=t.json,s=i.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const a=s.extensions[this.name],r=t.options.ktx2Loader;if(!r){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,a.source,r)}}class L2{constructor(e){this.parser=e,this.name=ke.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,i=this.parser,s=i.json,a=s.textures[e];if(!a.extensions||!a.extensions[t])return null;const r=a.extensions[t],o=s.images[r.source];let l=i.textureLoader;if(o.uri){const c=i.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return i.loadTextureImage(e,r.source,l);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return i.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class U2{constructor(e){this.parser=e,this.name=ke.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,i=this.parser,s=i.json,a=s.textures[e];if(!a.extensions||!a.extensions[t])return null;const r=a.extensions[t],o=s.images[r.source];let l=i.textureLoader;if(o.uri){const c=i.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return i.loadTextureImage(e,r.source,l);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return i.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class N2{constructor(e){this.name=ke.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,i=t.bufferViews[e];if(i.extensions&&i.extensions[this.name]){const s=i.extensions[this.name],a=this.parser.getDependency("buffer",s.buffer),r=this.parser.options.meshoptDecoder;if(!r||!r.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return a.then(function(o){const l=s.byteOffset||0,c=s.byteLength||0,u=s.count,f=s.byteStride,h=new Uint8Array(o,l,c);return r.decodeGltfBufferAsync?r.decodeGltfBufferAsync(u,f,h,s.mode,s.filter).then(function(p){return p.buffer}):r.ready.then(function(){const p=new ArrayBuffer(u*f);return r.decodeGltfBuffer(new Uint8Array(p),u,f,h,s.mode,s.filter),p})})}else return null}}class O2{constructor(e){this.name=ke.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,i=t.nodes[e];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;const s=t.meshes[i.mesh];for(const c of s.primitives)if(c.mode!==kn.TRIANGLES&&c.mode!==kn.TRIANGLE_STRIP&&c.mode!==kn.TRIANGLE_FAN&&c.mode!==void 0)return null;const r=i.extensions[this.name].attributes,o=[],l={};for(const c in r)o.push(this.parser.getDependency("accessor",r[c]).then(u=>(l[c]=u,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const u=c.pop(),f=u.isGroup?u.children:[u],h=c[0].count,p=[];for(const g of f){const v=new Pe,m=new O,d=new Ws,_=new O(1,1,1),x=new Yb(g.geometry,g.material,h);for(let y=0;y<h;y++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&d.fromBufferAttribute(l.ROTATION,y),l.SCALE&&_.fromBufferAttribute(l.SCALE,y),x.setMatrixAt(y,v.compose(m,d,_));for(const y in l)if(y==="_COLOR_0"){const R=l[y];x.instanceColor=new kd(R.array,R.itemSize,R.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&g.geometry.setAttribute(y,l[y]);At.prototype.copy.call(x,g),this.parser.assignFinalMaterial(x),p.push(x)}return u.isGroup?(u.clear(),u.add(...p),u):p[0]}))}}const $y="glTF",go=12,d0={JSON:1313821514,BIN:5130562};class P2{constructor(e){this.name=ke.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,go),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==$y)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-go,a=new DataView(e,go);let r=0;for(;r<s;){const o=a.getUint32(r,!0);r+=4;const l=a.getUint32(r,!0);if(r+=4,l===d0.JSON){const c=new Uint8Array(e,go+r,o);this.content=i.decode(c)}else if(l===d0.BIN){const c=go+r;this.body=e.slice(c,c+o)}r+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class I2{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=ke.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const i=this.json,s=this.dracoLoader,a=e.extensions[this.name].bufferView,r=e.extensions[this.name].attributes,o={},l={},c={};for(const u in r){const f=Yd[u]||u.toLowerCase();o[f]=r[u]}for(const u in e.attributes){const f=Yd[u]||u.toLowerCase();if(r[u]!==void 0){const h=i.accessors[e.attributes[u]],p=xr[h.componentType];c[f]=p.name,l[f]=h.normalized===!0}}return t.getDependency("bufferView",a).then(function(u){return new Promise(function(f,h){s.decodeDracoFile(u,function(p){for(const g in p.attributes){const v=p.attributes[g],m=l[g];m!==void 0&&(v.normalized=m)}f(p)},o,c,mn,h)})})}}class B2{constructor(){this.name=ke.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class z2{constructor(){this.name=ke.KHR_MESH_QUANTIZATION}}class eS extends Rl{constructor(e,t,i,s){super(e,t,i,s)}copySampleValue_(e){const t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,a=e*s*3+s;for(let r=0;r!==s;r++)t[r]=i[a+r];return t}interpolate_(e,t,i,s){const a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,u=s-t,f=(i-t)/u,h=f*f,p=h*f,g=e*c,v=g-c,m=-2*p+3*h,d=p-h,_=1-m,x=d-h+f;for(let y=0;y!==o;y++){const R=r[v+y+o],w=r[v+y+l]*u,b=r[g+y+o],C=r[g+y]*u;a[y]=_*R+x*w+m*b+d*C}return a}}const F2=new Ws;class H2 extends eS{interpolate_(e,t,i,s){const a=super.interpolate_(e,t,i,s);return F2.fromArray(a).normalize().toArray(a),a}}const kn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},xr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},p0={9728:dn,9729:Un,9984:vy,9985:Uc,9986:So,9987:Yi},m0={33071:Rs,33648:gu,10497:Or},rh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Yd={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ps={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},G2={CUBICSPLINE:void 0,LINEAR:rl,STEP:al},oh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function V2(n){return n.DefaultMaterial===void 0&&(n.DefaultMaterial=new um({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ns})),n.DefaultMaterial}function ta(n,e,t){for(const i in t.extensions)n[i]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[i]=t.extensions[i])}function Hi(n,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(n.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function k2(n,e,t){let i=!1,s=!1,a=!1;for(let c=0,u=e.length;c<u;c++){const f=e[c];if(f.POSITION!==void 0&&(i=!0),f.NORMAL!==void 0&&(s=!0),f.COLOR_0!==void 0&&(a=!0),i&&s&&a)break}if(!i&&!s&&!a)return Promise.resolve(n);const r=[],o=[],l=[];for(let c=0,u=e.length;c<u;c++){const f=e[c];if(i){const h=f.POSITION!==void 0?t.getDependency("accessor",f.POSITION):n.attributes.position;r.push(h)}if(s){const h=f.NORMAL!==void 0?t.getDependency("accessor",f.NORMAL):n.attributes.normal;o.push(h)}if(a){const h=f.COLOR_0!==void 0?t.getDependency("accessor",f.COLOR_0):n.attributes.color;l.push(h)}}return Promise.all([Promise.all(r),Promise.all(o),Promise.all(l)]).then(function(c){const u=c[0],f=c[1],h=c[2];return i&&(n.morphAttributes.position=u),s&&(n.morphAttributes.normal=f),a&&(n.morphAttributes.color=h),n.morphTargetsRelative=!0,n})}function X2(n,e){if(n.updateMorphTargets(),e.weights!==void 0)for(let t=0,i=e.weights.length;t<i;t++)n.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(n.morphTargetInfluences.length===t.length){n.morphTargetDictionary={};for(let i=0,s=t.length;i<s;i++)n.morphTargetDictionary[t[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function W2(n){let e;const t=n.extensions&&n.extensions[ke.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+lh(t.attributes):e=n.indices+":"+lh(n.attributes)+":"+n.mode,n.targets!==void 0)for(let i=0,s=n.targets.length;i<s;i++)e+=":"+lh(n.targets[i]);return e}function lh(n){let e="";const t=Object.keys(n).sort();for(let i=0,s=t.length;i<s;i++)e+=t[i]+":"+n[t[i]]+";";return e}function jd(n){switch(n){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function q2(n){return n.search(/\.jpe?g($|\?)/i)>0||n.search(/^data\:image\/jpeg/)===0?"image/jpeg":n.search(/\.webp($|\?)/i)>0||n.search(/^data\:image\/webp/)===0?"image/webp":n.search(/\.ktx2($|\?)/i)>0||n.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const Y2=new Pe;class j2{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new g2,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,s=-1,a=!1,r=-1;if(typeof navigator<"u"){const o=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(o)===!0;const l=o.match(/Version\/(\d+)/);s=i&&l?parseInt(l[1],10):-1,a=o.indexOf("Firefox")>-1,r=a?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&s<17||a&&r<98?this.textureLoader=new dA(this.options.manager):this.textureLoader=new yA(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new qy(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const i=this,s=this.json,a=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(r){return r._markDefs&&r._markDefs()}),Promise.all(this._invokeAll(function(r){return r.beforeRoot&&r.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(r){const o={scene:r[0][s.scene||0],scenes:r[0],animations:r[1],cameras:r[2],asset:s.asset,parser:i,userData:{}};return ta(a,o,s),Hi(o,s),Promise.all(i._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(const l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let s=0,a=t.length;s<a;s++){const r=t[s].joints;for(let o=0,l=r.length;o<l;o++)e[r[o]].isBone=!0}for(let s=0,a=e.length;s<a;s++){const r=e[s];r.mesh!==void 0&&(this._addNodeRef(this.meshCache,r.mesh),r.skin!==void 0&&(i[r.mesh].isSkinnedMesh=!0)),r.camera!==void 0&&this._addNodeRef(this.cameraCache,r.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,i){if(e.refs[t]<=1)return i;const s=i.clone(),a=(r,o)=>{const l=this.associations.get(r);l!=null&&this.associations.set(o,l);for(const[c,u]of r.children.entries())a(u,o.children[c])};return a(i,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){const s=e(t[i]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const i=[];for(let s=0;s<t.length;s++){const a=e(t[s]);a&&i.push(a)}return i}getDependency(e,t){const i=e+":"+t;let s=this.cache.get(i);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(a){return a.loadNode&&a.loadNode(t)});break;case"mesh":s=this._invokeOne(function(a){return a.loadMesh&&a.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(a){return a.loadBufferView&&a.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(a){return a.loadMaterial&&a.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(a){return a.loadTexture&&a.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(a){return a.loadAnimation&&a.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(a){return a!=this&&a.getDependency&&a.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(i,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const i=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(a,r){return i.getDependency(e,r)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[ke.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(a,r){i.load(Ho.resolveURL(t.uri,s.path),a,void 0,function(){r(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(i){const s=t.byteLength||0,a=t.byteOffset||0;return i.slice(a,a+s)})}loadAccessor(e){const t=this,i=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const r=rh[s.type],o=xr[s.componentType],l=s.normalized===!0,c=new o(s.count*r);return Promise.resolve(new pn(c,r,l))}const a=[];return s.bufferView!==void 0?a.push(this.getDependency("bufferView",s.bufferView)):a.push(null),s.sparse!==void 0&&(a.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),a.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(a).then(function(r){const o=r[0],l=rh[s.type],c=xr[s.componentType],u=c.BYTES_PER_ELEMENT,f=u*l,h=s.byteOffset||0,p=s.bufferView!==void 0?i.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0;let v,m;if(p&&p!==f){const d=Math.floor(h/p),_="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+d+":"+s.count;let x=t.cache.get(_);x||(v=new c(o,d*p,s.count*p/u),x=new Vb(v,p/u),t.cache.add(_,x)),m=new sm(x,l,h%p/u,g)}else o===null?v=new c(s.count*l):v=new c(o,h,s.count*l),m=new pn(v,l,g);if(s.sparse!==void 0){const d=rh.SCALAR,_=xr[s.sparse.indices.componentType],x=s.sparse.indices.byteOffset||0,y=s.sparse.values.byteOffset||0,R=new _(r[1],x,s.sparse.count*d),w=new c(r[2],y,s.sparse.count*l);o!==null&&(m=new pn(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let b=0,C=R.length;b<C;b++){const T=R[b];if(m.setX(T,w[b*l]),l>=2&&m.setY(T,w[b*l+1]),l>=3&&m.setZ(T,w[b*l+2]),l>=4&&m.setW(T,w[b*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,i=this.options,a=t.textures[e].source,r=t.images[a];let o=this.textureLoader;if(r.uri){const l=i.manager.getHandler(r.uri);l!==null&&(o=l)}return this.loadTextureImage(e,a,o)}loadTextureImage(e,t,i){const s=this,a=this.json,r=a.textures[e],o=a.images[t],l=(o.uri||o.bufferView)+":"+r.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,i).then(function(u){u.flipY=!1,u.name=r.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);const h=(a.samplers||{})[r.sampler]||{};return u.magFilter=p0[h.magFilter]||Un,u.minFilter=p0[h.minFilter]||Yi,u.wrapS=m0[h.wrapS]||Or,u.wrapT=m0[h.wrapT]||Or,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==dn&&u.minFilter!==Un,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const i=this,s=this.json,a=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(f=>f.clone());const r=s.images[e],o=self.URL||self.webkitURL;let l=r.uri||"",c=!1;if(r.bufferView!==void 0)l=i.getDependency("bufferView",r.bufferView).then(function(f){c=!0;const h=new Blob([f],{type:r.mimeType});return l=o.createObjectURL(h),l});else if(r.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(f){return new Promise(function(h,p){let g=h;t.isImageBitmapLoader===!0&&(g=function(v){const m=new jt(v);m.needsUpdate=!0,h(m)}),t.load(Ho.resolveURL(f,a.path),g,void 0,p)})}).then(function(f){return c===!0&&o.revokeObjectURL(l),Hi(f,r),f.userData.mimeType=r.mimeType||q2(r.uri),f}).catch(function(f){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),f});return this.sourceCache[e]=u,u}assignTexture(e,t,i,s){const a=this;return this.getDependency("texture",i.index).then(function(r){if(!r)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(r=r.clone(),r.channel=i.texCoord),a.extensions[ke.KHR_TEXTURE_TRANSFORM]){const o=i.extensions!==void 0?i.extensions[ke.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=a.associations.get(r);r=a.extensions[ke.KHR_TEXTURE_TRANSFORM].extendTexture(r,o),a.associations.set(r,l)}}return s!==void 0&&(r.colorSpace=s),e[t]=r,r})}assignFinalMaterial(e){const t=e.geometry;let i=e.material;const s=t.attributes.tangent===void 0,a=t.attributes.color!==void 0,r=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+i.uuid;let l=this.cache.get(o);l||(l=new lm,Ei.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,l.sizeAttenuation=!1,this.cache.add(o,l)),i=l}else if(e.isLine){const o="LineBasicMaterial:"+i.uuid;let l=this.cache.get(o);l||(l=new Vy,Ei.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,this.cache.add(o,l)),i=l}if(s||a||r){let o="ClonedMaterial:"+i.uuid+":";s&&(o+="derivative-tangents:"),a&&(o+="vertex-colors:"),r&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=i.clone(),a&&(l.vertexColors=!0),r&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(i))),i=l}e.material=i}getMaterialType(){return um}loadMaterial(e){const t=this,i=this.json,s=this.extensions,a=i.materials[e];let r;const o={},l=a.extensions||{},c=[];if(l[ke.KHR_MATERIALS_UNLIT]){const f=s[ke.KHR_MATERIALS_UNLIT];r=f.getMaterialType(),c.push(f.extendParams(o,a,t))}else{const f=a.pbrMetallicRoughness||{};if(o.color=new Le(1,1,1),o.opacity=1,Array.isArray(f.baseColorFactor)){const h=f.baseColorFactor;o.color.setRGB(h[0],h[1],h[2],mn),o.opacity=h[3]}f.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",f.baseColorTexture,Qt)),o.metalness=f.metallicFactor!==void 0?f.metallicFactor:1,o.roughness=f.roughnessFactor!==void 0?f.roughnessFactor:1,f.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",f.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",f.metallicRoughnessTexture))),r=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(e,o)})))}a.doubleSided===!0&&(o.side=oi);const u=a.alphaMode||oh.OPAQUE;if(u===oh.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===oh.MASK&&(o.alphaTest=a.alphaCutoff!==void 0?a.alphaCutoff:.5)),a.normalTexture!==void 0&&r!==xi&&(c.push(t.assignTexture(o,"normalMap",a.normalTexture)),o.normalScale=new Ke(1,1),a.normalTexture.scale!==void 0)){const f=a.normalTexture.scale;o.normalScale.set(f,f)}if(a.occlusionTexture!==void 0&&r!==xi&&(c.push(t.assignTexture(o,"aoMap",a.occlusionTexture)),a.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=a.occlusionTexture.strength)),a.emissiveFactor!==void 0&&r!==xi){const f=a.emissiveFactor;o.emissive=new Le().setRGB(f[0],f[1],f[2],mn)}return a.emissiveTexture!==void 0&&r!==xi&&c.push(t.assignTexture(o,"emissiveMap",a.emissiveTexture,Qt)),Promise.all(c).then(function(){const f=new r(o);return a.name&&(f.name=a.name),Hi(f,a),t.associations.set(f,{materials:e}),a.extensions&&ta(s,f,a),f})}createUniqueName(e){const t=ut.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,i=this.extensions,s=this.primitiveCache;function a(o){return i[ke.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return g0(l,o,t)})}const r=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],u=W2(c),f=s[u];if(f)r.push(f.promise);else{let h;c.extensions&&c.extensions[ke.KHR_DRACO_MESH_COMPRESSION]?h=a(c):h=g0(new ei,c,t),s[u]={primitive:c,promise:h},r.push(h)}}return Promise.all(r)}loadMesh(e){const t=this,i=this.json,s=this.extensions,a=i.meshes[e],r=a.primitives,o=[];for(let l=0,c=r.length;l<c;l++){const u=r[l].material===void 0?V2(this.cache):this.getDependency("material",r[l].material);o.push(u)}return o.push(t.loadGeometries(r)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],f=[];for(let p=0,g=u.length;p<g;p++){const v=u[p],m=r[p];let d;const _=c[p];if(m.mode===kn.TRIANGLES||m.mode===kn.TRIANGLE_STRIP||m.mode===kn.TRIANGLE_FAN||m.mode===void 0)d=a.isSkinnedMesh===!0?new Xb(v,_):new rn(v,_),d.isSkinnedMesh===!0&&d.normalizeSkinWeights(),m.mode===kn.TRIANGLE_STRIP?d.geometry=h0(d.geometry,wy):m.mode===kn.TRIANGLE_FAN&&(d.geometry=h0(d.geometry,Gd));else if(m.mode===kn.LINES)d=new Zb(v,_);else if(m.mode===kn.LINE_STRIP)d=new om(v,_);else if(m.mode===kn.LINE_LOOP)d=new Qb(v,_);else if(m.mode===kn.POINTS)d=new Wd(v,_);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(d.geometry.morphAttributes).length>0&&X2(d,a),d.name=t.createUniqueName(a.name||"mesh_"+e),Hi(d,a),m.extensions&&ta(s,d,m),t.assignFinalMaterial(d),f.push(d)}for(let p=0,g=f.length;p<g;p++)t.associations.set(f[p],{meshes:e,primitives:p});if(f.length===1)return a.extensions&&ta(s,f[0],a),f[0];const h=new ca;a.extensions&&ta(s,h,a),t.associations.set(h,{meshes:e});for(let p=0,g=f.length;p<g;p++)h.add(f[p]);return h})}loadCamera(e){let t;const i=this.json.cameras[e],s=i[i.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new un(Ka.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):i.type==="orthographic"&&(t=new hm(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),Hi(t,i),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],i=[];for(let s=0,a=t.joints.length;s<a;s++)i.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",t.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(s){const a=s.pop(),r=s,o=[],l=[];for(let c=0,u=r.length;c<u;c++){const f=r[c];if(f){o.push(f);const h=new Pe;a!==null&&h.fromArray(a.array,c*16),l.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new am(o,l)})}loadAnimation(e){const t=this.json,i=this,s=t.animations[e],a=s.name?s.name:"animation_"+e,r=[],o=[],l=[],c=[],u=[];for(let f=0,h=s.channels.length;f<h;f++){const p=s.channels[f],g=s.samplers[p.sampler],v=p.target,m=v.node,d=s.parameters!==void 0?s.parameters[g.input]:g.input,_=s.parameters!==void 0?s.parameters[g.output]:g.output;v.node!==void 0&&(r.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",d)),l.push(this.getDependency("accessor",_)),c.push(g),u.push(v))}return Promise.all([Promise.all(r),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(f){const h=f[0],p=f[1],g=f[2],v=f[3],m=f[4],d=[];for(let _=0,x=h.length;_<x;_++){const y=h[_],R=p[_],w=g[_],b=v[_],C=m[_];if(y===void 0)continue;y.updateMatrix&&y.updateMatrix();const T=i._createAnimationTracks(y,R,w,b,C);if(T)for(let S=0;S<T.length;S++)d.push(T[S])}return new rA(a,void 0,d)})}createNodeMesh(e){const t=this.json,i=this,s=t.nodes[e];return s.mesh===void 0?null:i.getDependency("mesh",s.mesh).then(function(a){const r=i._getNodeRef(i.meshCache,s.mesh,a);return s.weights!==void 0&&r.traverse(function(o){if(o.isMesh)for(let l=0,c=s.weights.length;l<c;l++)o.morphTargetInfluences[l]=s.weights[l]}),r})}loadNode(e){const t=this.json,i=this,s=t.nodes[e],a=i._loadNodeShallow(e),r=[],o=s.children||[];for(let c=0,u=o.length;c<u;c++)r.push(i.getDependency("node",o[c]));const l=s.skin===void 0?Promise.resolve(null):i.getDependency("skin",s.skin);return Promise.all([a,Promise.all(r),l]).then(function(c){const u=c[0],f=c[1],h=c[2];h!==null&&u.traverse(function(p){p.isSkinnedMesh&&p.bind(h,Y2)});for(let p=0,g=f.length;p<g;p++)u.add(f[p]);return u})}_loadNodeShallow(e){const t=this.json,i=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const a=t.nodes[e],r=a.name?s.createUniqueName(a.name):"",o=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),a.camera!==void 0&&o.push(s.getDependency("camera",a.camera).then(function(c){return s._getNodeRef(s.cameraCache,a.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let u;if(a.isBone===!0?u=new Hy:c.length>1?u=new ca:c.length===1?u=c[0]:u=new At,u!==c[0])for(let f=0,h=c.length;f<h;f++)u.add(c[f]);if(a.name&&(u.userData.name=a.name,u.name=r),Hi(u,a),a.extensions&&ta(i,u,a),a.matrix!==void 0){const f=new Pe;f.fromArray(a.matrix),u.applyMatrix4(f)}else a.translation!==void 0&&u.position.fromArray(a.translation),a.rotation!==void 0&&u.quaternion.fromArray(a.rotation),a.scale!==void 0&&u.scale.fromArray(a.scale);return s.associations.has(u)||s.associations.set(u,{}),s.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,i=this.json.scenes[e],s=this,a=new ca;i.name&&(a.name=s.createUniqueName(i.name)),Hi(a,i),i.extensions&&ta(t,a,i);const r=i.nodes||[],o=[];for(let l=0,c=r.length;l<c;l++)o.push(s.getDependency("node",r[l]));return Promise.all(o).then(function(l){for(let u=0,f=l.length;u<f;u++)a.add(l[u]);const c=u=>{const f=new Map;for(const[h,p]of s.associations)(h instanceof Ei||h instanceof jt)&&f.set(h,p);return u.traverse(h=>{const p=s.associations.get(h);p!=null&&f.set(h,p)}),f};return s.associations=c(a),a})}_createAnimationTracks(e,t,i,s,a){const r=[],o=e.name?e.name:e.uuid,l=[];ps[a.path]===ps.weights?e.traverse(function(h){h.morphTargetInfluences&&l.push(h.name?h.name:h.uuid)}):l.push(o);let c;switch(ps[a.path]){case ps.weights:c=Br;break;case ps.rotation:c=zr;break;case ps.translation:case ps.scale:c=Fr;break;default:switch(i.itemSize){case 1:c=Br;break;case 2:case 3:default:c=Fr;break}break}const u=s.interpolation!==void 0?G2[s.interpolation]:rl,f=this._getArrayFromAccessor(i);for(let h=0,p=l.length;h<p;h++){const g=new c(l[h]+"."+ps[a.path],t.array,f,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),r.push(g)}return r}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const i=jd(t.constructor),s=new Float32Array(t.length);for(let a=0,r=t.length;a<r;a++)s[a]=t[a]*i;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(i){const s=this instanceof zr?H2:eS;return new s(this.times,this.values,this.getValueSize()/3,i)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function K2(n,e,t){const i=e.attributes,s=new as;if(i.POSITION!==void 0){const o=t.json.accessors[i.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(s.set(new O(l[0],l[1],l[2]),new O(c[0],c[1],c[2])),o.normalized){const u=jd(xr[o.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const a=e.targets;if(a!==void 0){const o=new O,l=new O;for(let c=0,u=a.length;c<u;c++){const f=a[c];if(f.POSITION!==void 0){const h=t.json.accessors[f.POSITION],p=h.min,g=h.max;if(p!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),h.normalized){const v=jd(xr[h.componentType]);l.multiplyScalar(v)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}n.boundingBox=s;const r=new Ri;s.getCenter(r.center),r.radius=s.min.distanceTo(s.max)/2,n.boundingSphere=r}function g0(n,e,t){const i=e.attributes,s=[];function a(r,o){return t.getDependency("accessor",r).then(function(l){n.setAttribute(o,l)})}for(const r in i){const o=Yd[r]||r.toLowerCase();o in n.attributes||s.push(a(i[r],o))}if(e.indices!==void 0&&!n.index){const r=t.getDependency("accessor",e.indices).then(function(o){n.setIndex(o)});s.push(r)}return Ye.workingColorSpace!==mn&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ye.workingColorSpace}" not supported.`),Hi(n,e),K2(n,e,t),Promise.all(s).then(function(){return e.targets!==void 0?k2(n,e.targets,t):n})}const _0=10,Z2=()=>{const[n,e]=Cn.useState("loading"),[t,i]=Cn.useState(!1),[s,a]=Cn.useState(!1),r=Cn.useRef(null),o=Cn.useRef(null),l=Cn.useRef(null),c=Cn.useRef(null),u=Cn.useRef(null);return Cn.useEffect(()=>{if(!r.current||!o.current){console.error("Mount point or canvas not found");return}if(l.current){console.log("Game instance already exists, skipping init (Strict Mode double render likely).");return}console.log("Initializing Game Logic...");class f{constructor(g){Dl(this,"game");Dl(this,"inputProcessed",!1);Dl(this,"timeoutId",null);this.game=g}enter(g){console.log(`Entering state: ${this.game.currentState}`),this.inputProcessed=!1,this.game.assets.planet&&(this.game.assets.planet.visible=!1),this.game.assets.stars&&(this.game.assets.stars.visible=!1),this.game.assets.titleShips.forEach(v=>v&&(v.visible=!1)),this.game.assets.undockingSquares.forEach(v=>v.visible=!1)}exit(g){console.log(`Exiting state: ${this.game.currentState}`),this.timeoutId&&clearTimeout(this.timeoutId)}update(g){}handleInput(g){}}const h={scene:null,camera:null,renderer:null,clock:new MA,assets:{titleShips:[],planet:null,stars:null,undockingSquares:[]},assetsToLoad:0,assetsLoaded:0,loadingCompleteCallback:null,currentState:"loading",sceneLogics:{},animationFrameId:null,currentShipIndex:0,shipDisplayTimer:0,FLY_IN_DURATION:.5,FLY_OUT_DURATION:.5,HOLD_DURATION:Math.max(0,_0-.5-.5),TOTAL_CYCLE_DURATION:_0,START_Z:-150,TARGET_POS:new O(-3,0,0),boundHandleGlobalInput:null,boundOnWindowResize:null,init(p,g){this.loadingCompleteCallback=g,this.scene=new Gb,this.camera=new un(75,window.innerWidth/window.innerHeight,.1,4100),this.camera.position.z=15,this.renderer=new p2({canvas:p,antialias:!1}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setClearColor(0);const v=new xA(16777215,.7);this.scene.add(v);const m=new Yy(16777215,.5);m.position.set(1,1,1),this.scene.add(m),this.createAssets(),this.setupSceneLogics(),this.startAnimationLoop(),this.boundHandleGlobalInput=this.handleGlobalInput.bind(this),this.boundOnWindowResize=this.onWindowResize.bind(this),window.addEventListener("resize",this.boundOnWindowResize),window.addEventListener("keydown",this.boundHandleGlobalInput),window.addEventListener("mousedown",this.boundHandleGlobalInput),console.log("Game logic initialized and listeners added.")},setupSceneLogics(){this.sceneLogics.loading=new f(this),this.sceneLogics.loading.enter=()=>{f.prototype.enter.call(this.sceneLogics.loading),this.assets.stars&&(this.assets.stars.visible=!0)},this.sceneLogics.loading.update=p=>{this.assets.stars&&(this.assets.stars.rotation.y+=.01*p)},this.sceneLogics.loading.handleInput=p=>{this.sceneLogics.loading.inputProcessed||(p.type==="keydown"||p.type==="mousedown")&&(this.sceneLogics.loading.inputProcessed=!0,console.log("Loader input detected, switching state..."),this.switchState("title"))},this.sceneLogics.title=new f(this),this.sceneLogics.title.enter=()=>{var p;f.prototype.enter.call(this.sceneLogics.title),this.assets.titleShips.forEach(g=>g&&(g.visible=!1)),this.currentShipIndex=0,this.shipDisplayTimer=0,this.prepareShip(this.currentShipIndex),this.assets.planet&&(this.assets.planet.visible=!0,this.assets.planet.position.set(200,0,-500),this.assets.planet.scale.set(1,1,1)),this.assets.stars&&(this.assets.stars.visible=!0),(p=c.current)==null||p.play().catch(g=>console.warn("Intro music play failed:",g))},this.sceneLogics.title.exit=()=>{var g;f.prototype.exit.call(this.sceneLogics.title);const p=this.assets.titleShips[this.currentShipIndex];p&&(p.visible=!1),this.assets.planet&&(this.assets.planet.visible=!1),(g=c.current)==null||g.pause(),c.current&&(c.current.currentTime=0)},this.sceneLogics.title.update=p=>{this.assets.stars&&(this.assets.stars.rotation.y+=.01*p),this.updateTitleShipAnimation(p)},this.sceneLogics.title.handleInput=p=>{this.sceneLogics.title.inputProcessed||(p.type==="keydown"||p.type==="mousedown")&&(this.sceneLogics.title.inputProcessed=!0,this.switchState("credits"))},this.sceneLogics.credits=new f(this),this.sceneLogics.credits.enter=()=>{f.prototype.enter.call(this.sceneLogics.credits),this.assets.stars&&(this.assets.stars.visible=!0),this.sceneLogics.credits.timeoutId=setTimeout(()=>{this.currentState==="credits"&&this.switchState("stats")},3e3)},this.sceneLogics.credits.update=p=>{this.assets.stars&&(this.assets.stars.rotation.y+=.01*p)},this.sceneLogics.stats=new f(this),this.sceneLogics.stats.enter=()=>{f.prototype.enter.call(this.sceneLogics.stats),this.assets.stars&&(this.assets.stars.visible=!0),this.sceneLogics.stats.timeoutId=setTimeout(()=>{this.currentState==="stats"&&this.switchState("undocking")},5e3)},this.sceneLogics.stats.update=p=>{this.assets.stars&&(this.assets.stars.rotation.y+=.01*p)},this.sceneLogics.undocking=new f(this),this.sceneLogics.undocking.enter=()=>{var p;f.prototype.enter.call(this.sceneLogics.undocking),this.assets.stars&&(this.assets.stars.visible=!0),this.assets.undockingSquares.forEach((g,v)=>{g.position.z=-v*5,g.visible=!0}),(p=u.current)==null||p.play().catch(g=>console.warn("Undock sound play failed:",g)),this.sceneLogics.undocking.timeoutId=setTimeout(()=>{this.currentState==="undocking"&&this.switchState("space_flight")},3500)},this.sceneLogics.undocking.exit=()=>{f.prototype.exit.call(this.sceneLogics.undocking),this.assets.undockingSquares.forEach(p=>p.visible=!1),u.current&&(u.current.currentTime=0)},this.sceneLogics.undocking.update=p=>{var m;this.assets.stars&&(this.assets.stars.rotation.y+=.01*p);const g=20,v=((m=this.camera)==null?void 0:m.position.z)??0;this.assets.undockingSquares.forEach(d=>{d.position.z+=g*p,d.position.z>v+5&&(d.position.z=-this.assets.undockingSquares.length*5+(5-(d.position.z-(v+5))))})},this.sceneLogics.space_flight=new f(this),this.sceneLogics.space_flight.enter=()=>{f.prototype.enter.call(this.sceneLogics.space_flight),this.assets.planet&&(this.assets.planet.position.set(0,15,-60),this.assets.planet.scale.set(5,5,5),this.assets.planet.visible=!0),this.assets.stars&&(this.assets.stars.visible=!0),console.log("Entered Space Flight Scene. Intro sequence complete.")},this.sceneLogics.space_flight.update=p=>{this.assets.stars&&(this.assets.stars.rotation.y+=.01*p)}},createAssets(){if(!this.scene)return;const p=new m2,g=["assets/ships/ship-cobra.gltf","assets/ships/ship-pirate.gltf","assets/ships/asteroid.gltf"],v=6;this.assetsToLoad=g.length,this.assetsLoaded=0,this.assets.titleShips=new Array(this.assetsToLoad).fill(null),console.log(`Expecting ${this.assetsToLoad} ship assets.`);const m=new cm(160,16,12),d=new xi({color:16711680});this.assets.planet=new rn(m,d),this.assets.planet.visible=!1,this.scene.add(this.assets.planet);const _=[];for(let b=0;b<2e3;b++){const C=Ka.randFloatSpread(4e3),T=Ka.randFloatSpread(4e3),S=Ka.randFloatSpread(4e3);Math.sqrt(C*C+T*T+S*S)>100&&_.push(C,T,S)}const x=new ei;x.setAttribute("position",new Bn(_,3));const y=new lm({color:16777215,size:.5,sizeAttenuation:!1});this.assets.stars=new Wd(x,y),this.assets.stars.visible=!1,this.scene.add(this.assets.stars);const R=new Al(1,1),w=new xi({color:65280,side:oi,wireframe:!0});this.assets.undockingSquares=[];for(let b=0;b<10;b++){const C=new rn(R,w);C.scale.set((b+1)*2,(b+1)*2,1),C.position.z=-b*5,C.visible=!1,this.scene.add(C),this.assets.undockingSquares.push(C)}g.forEach((b,C)=>{p.load(b,T=>{var L;console.log(`Successfully loaded ${b}`);const S=T.scene;S.scale.set(v,v,v),S.visible=!1,S.traverse(X=>{if(X.isMesh){const G=X;!G.material||G.material.type==="MeshStandardMaterial"?G.material=new xi({color:16776960,wireframe:!0}):G.material.wireframe!==void 0&&(G.material.wireframe=!0)}}),(L=this.scene)==null||L.add(S),this.assets.titleShips[C]=S,this.checkLoadingComplete()},void 0,T=>{console.error(`Error loading ${b}:`,T),this.assets.titleShips[C]=null,this.checkLoadingComplete()})}),this.assetsToLoad===0&&this.checkLoadingComplete()},checkLoadingComplete(){this.assetsLoaded++,console.log(`Assets loaded: ${this.assetsLoaded}/${this.assetsToLoad}`),this.assetsLoaded>=this.assetsToLoad&&(console.log("All assets processed. Informing React."),this.loadingCompleteCallback?this.loadingCompleteCallback():console.warn("loadingCompleteCallback not set!"))},animate(){if(!this.renderer||!this.scene||!this.camera)return;const p=this.clock.getDelta(),g=this.sceneLogics[this.currentState];g!=null&&g.update&&g.update(p),this.renderer.render(this.scene,this.camera),this.animationFrameId=requestAnimationFrame(this.animate.bind(this))},startAnimationLoop(){this.animationFrameId&&cancelAnimationFrame(this.animationFrameId),this.animate()},stopAnimationLoop(){this.animationFrameId&&cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null},switchState(p){if(p===this.currentState)return;const g=this.currentState,v=this.sceneLogics[g],m=this.sceneLogics[p];v!=null&&v.exit&&v.exit(p),this.currentState=p,console.log("GameLogic switched state to:",p),this.reactSetGameState(p),m!=null&&m.enter&&m.enter(g)},reactSetGameState:p=>{console.warn("reactSetGameState placeholder called.")},onWindowResize(){!this.camera||!this.renderer||(this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight))},handleGlobalInput(p){const g=this.sceneLogics[this.currentState];g!=null&&g.handleInput&&g.handleInput(p)},prepareShip(p){const g=this.assets.titleShips[p];g?(g.position.set(this.TARGET_POS.x,this.TARGET_POS.y,this.START_Z),g.rotation.set(0,Math.PI,0),g.visible=!0):console.warn(`Attempted to prepare missing ship at index ${p}`)},updateTitleShipAnimation(p){if(this.assets.titleShips.length===0)return;this.shipDisplayTimer+=p;const g=this.assets.titleShips[this.currentShipIndex];if(!g)console.warn(`Ship at index ${this.currentShipIndex} is missing. Skipping.`),this.shipDisplayTimer=this.TOTAL_CYCLE_DURATION;else{const v=this.shipDisplayTimer;if(v<this.FLY_IN_DURATION){const m=Math.min(1,v/this.FLY_IN_DURATION);g.position.z=Ka.lerp(this.START_Z,this.TARGET_POS.z,m),g.rotation.y+=.1*p}else if(v<this.FLY_IN_DURATION+this.HOLD_DURATION)g.position.z=this.TARGET_POS.z,g.rotation.y+=.5*p,g.rotation.x+=.25*p;else if(v<this.TOTAL_CYCLE_DURATION){const m=v-(this.FLY_IN_DURATION+this.HOLD_DURATION),d=Math.min(1,m/this.FLY_OUT_DURATION);g.position.z=Ka.lerp(this.TARGET_POS.z,this.START_Z,d),g.rotation.y+=.1*p}}if(this.shipDisplayTimer>=this.TOTAL_CYCLE_DURATION){g&&(g.visible=!1);const v=this.assets.titleShips.map((m,d)=>d).filter(m=>this.assets.titleShips[m]!==null);if(v.length>0){const d=(v.indexOf(this.currentShipIndex)+1)%v.length;this.currentShipIndex=v[d],this.prepareShip(this.currentShipIndex)}else console.warn("No valid title ships to display.");this.shipDisplayTimer=0}},dispose(){var p,g;console.log("Disposing game logic..."),this.stopAnimationLoop(),this.boundOnWindowResize&&window.removeEventListener("resize",this.boundOnWindowResize),this.boundHandleGlobalInput&&(window.removeEventListener("keydown",this.boundHandleGlobalInput),window.removeEventListener("mousedown",this.boundHandleGlobalInput)),console.log("Event listeners removed."),(p=this.renderer)==null||p.dispose(),(g=this.scene)==null||g.traverse(v=>{var m;(v instanceof rn||v instanceof Wd)&&((m=v.geometry)==null||m.dispose(),Array.isArray(v.material)?v.material.forEach(d=>d.dispose()):v.material&&v.material.dispose())}),this.scene=null,this.camera=null,this.renderer=null,this.assets={titleShips:[],planet:null,stars:null,undockingSquares:[]},this.boundHandleGlobalInput=null,this.boundOnWindowResize=null,l.current=null,console.log("Game logic disposed.")}};return h.reactSetGameState=e,h.init(o.current,()=>{console.log("React notified that loading is complete."),i(!0)}),l.current=h,()=>{var p;l.current===h?(p=l.current)==null||p.dispose():h.renderer&&(console.log("Cleaning up potentially orphaned gameLogic instance from StrictMode."),h.dispose())}},[]),Cn.useEffect(()=>{if(n==="loading"&&t){const f=setTimeout(()=>a(!0),100);return()=>clearTimeout(f)}else a(!1)},[n,t]),$.jsxs("div",{ref:r,id:"container",children:[$.jsx("canvas",{ref:o,id:"eliteCanvas"}),$.jsxs("div",{className:"overlay",children:[$.jsxs("div",{className:"top-bar",children:[n!=="loading"&&n!=="undocking"&&n!=="space_flight"&&$.jsx("span",{id:"title-text",children:"--- PROJECT COBRA ---"}),n==="space_flight"&&$.jsx("span",{id:"bounty-text",children:" BOUNTY: 5.0 Cr "}),(n==="undocking"||n==="space_flight")&&$.jsx("span",{id:"view-text",children:"Front View"})]}),n==="loading"&&$.jsxs("div",{id:"loader-screen",className:"center-text",children:[!s&&$.jsx("p",{id:"loader-progress-text",children:"LOADING..."}),s&&$.jsxs("p",{id:"loader-continue-text",children:[" ","GAME LOADED",$.jsx("br",{})," PRESS ANY KEY TO CONTINUE"," "]})]}),n==="title"&&$.jsxs("div",{id:"press-key-text",className:"center-text",children:[" ","Press any key to start game"," "]}),n==="credits"&&$.jsxs("div",{id:"credits-text",className:"center-text small",children:["Game Copyright:-",$.jsx("br",{}),"Bell & Braben",$.jsx("br",{}),"Code Copyright:-",$.jsx("br",{}),"Realtime Games",$.jsx("br",{}),"Software Ltd",$.jsx("br",{}),"Written by:-",$.jsx("br",{}),"Andy Onions",$.jsx("br",{}),"Cracked by:-",$.jsx("br",{}),"Key Software"]}),n==="stats"&&$.jsxs("div",{id:"stats-screen",className:"center-text small",children:[$.jsx("h2",{children:"COMMANDER JAMESON"}),$.jsxs("p",{children:[$.jsx("strong",{children:"System:"})," LAVE"]})," ",$.jsxs("p",{children:[$.jsx("strong",{children:"Hypersystem:"})," LAVE"]})," ",$.jsxs("p",{children:[$.jsx("strong",{children:"Fuel:"})," 7.0 Light Years"]})," ",$.jsxs("p",{children:[$.jsx("strong",{children:"Cash:"})," 100.0 Credits"]})," ",$.jsxs("p",{children:[$.jsx("strong",{children:"Legal Status:"})," Clean"]})," ",$.jsxs("p",{children:[$.jsx("strong",{children:"Rating:"})," Harmless"]})," ",$.jsx("p",{className:"equipment",children:$.jsx("strong",{children:"EQUIPMENT:"})})," ",$.jsx("p",{children:"Missile (3)"})," ",$.jsx("p",{children:"Pulse Laser (Fore)"})]}),n==="undocking"&&$.jsxs("div",{id:"leaving-text",className:"center-text small",children:[" ","Leaving Space Station"," "]}),n!=="loading"&&$.jsxs("div",{className:"bottom-bar",children:[$.jsxs("div",{className:"hud-left",children:[$.jsxs("div",{className:"hud-item",children:[" ",$.jsx("span",{className:"hud-label",children:"FORE-SHIELD"})," ",$.jsx("div",{className:"hud-bar",children:$.jsx("div",{id:"fore-shield-fill",className:"hud-bar-fill",style:{width:"80%"}})})," "]}),$.jsxs("div",{className:"hud-item",children:[" ",$.jsx("span",{className:"hud-label",children:"AFT-SHIELD"})," ",$.jsx("div",{className:"hud-bar",children:$.jsx("div",{id:"aft-shield-fill",className:"hud-bar-fill",style:{width:"80%"}})})," "]}),$.jsxs("div",{className:"hud-item",children:[" ",$.jsx("span",{className:"hud-label",children:"FUEL"})," ",$.jsx("div",{className:"hud-bar",children:$.jsx("div",{id:"fuel-fill",className:"hud-bar-fill",style:{width:"100%"}})})," "]}),$.jsxs("div",{className:"hud-item",children:[" ",$.jsx("span",{className:"hud-label",children:"CABIN TEMP"})," ",$.jsx("div",{className:"hud-bar",children:$.jsx("div",{id:"cabin-temp-fill",className:"hud-bar-fill",style:{width:"10%"}})})," "]}),$.jsxs("div",{className:"hud-item",children:[" ",$.jsx("span",{className:"hud-label",children:"LASER TEMP"})," ",$.jsx("div",{className:"hud-bar",children:$.jsx("div",{id:"laser-temp-fill",className:"hud-bar-fill red",style:{width:"5%"}})})," "]}),$.jsxs("div",{className:"hud-item",children:[" ",$.jsx("span",{className:"hud-label",children:"ALTITUDE"})," ",$.jsx("div",{className:"hud-bar"})," "]}),$.jsxs("div",{className:"hud-item",children:[" ",$.jsx("span",{className:"hud-label",children:"MISSILES"}),$.jsx("span",{className:"hud-value",children:" M M M M"})," "]})]}),$.jsx("div",{className:"hud-center",children:$.jsx("div",{className:"scanner-shape"})}),$.jsxs("div",{className:"hud-right",children:[$.jsxs("div",{className:"hud-item",children:[" ",$.jsx("span",{className:"hud-label",children:"SPEED"})," ",$.jsx("div",{className:"hud-bar",children:$.jsx("div",{className:"hud-bar-fill",style:{width:"10%"}})})," "]}),$.jsxs("div",{className:"hud-item",children:[" ",$.jsx("span",{className:"hud-label",children:"ROLL"})," ",$.jsx("div",{className:"hud-bar",children:$.jsx("div",{className:"hud-bar-fill",style:{width:"50%"}})})," "]}),$.jsxs("div",{className:"hud-item",children:[" ",$.jsx("span",{className:"hud-label",children:"DIVE/CLIMB"})," ",$.jsx("div",{className:"hud-bar",children:$.jsx("div",{className:"hud-bar-fill",style:{width:"50%"}})})," "]}),$.jsxs("div",{className:"hud-item",style:{justifyContent:"center",marginTop:"5px"},children:[" ",$.jsx("span",{style:{border:"1px solid #00ff00",padding:"2px 5px"},children:"1"})," ",$.jsx("span",{style:{border:"1px solid #00ff00",padding:"2px 5px",margin:"0 5px"},children:"2"})," ",$.jsx("span",{style:{border:"1px solid #00ff00",padding:"2px 5px"},children:"3"})," ",$.jsx("span",{style:{border:"1px solid #ffff00",borderRadius:"50%",width:"15px",height:"15px",display:"inline-block",marginLeft:"10px"}})," "]})]})]})]}),$.jsxs("audio",{ref:c,id:"introMusic",loop:!0,children:[$.jsx("source",{src:"assets/elite_intro_music.mp3",type:"audio/mpeg"}),"Your browser does not support the audio element."]}),$.jsxs("audio",{ref:u,id:"undockSound",children:[$.jsx("source",{src:"assets/undocking_sound.mp3",type:"audio/mpeg"}),"Your browser does not support the audio element."]})]})},tS=document.getElementById("root");if(!tS)throw new Error("Failed to find the root element");oT.createRoot(tS).render($.jsx(RS.StrictMode,{children:$.jsx(Z2,{})}));

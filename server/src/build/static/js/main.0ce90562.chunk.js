(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{341:function(e,t,n){e.exports=n(409)},346:function(e,t,n){},408:function(e,t,n){},409:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(15),c=n.n(r),o=(n(346),n(93)),s=n(229),l=n.n(s),u=n(328),d=n(113),f=(n(2),n(291)),m=n(311),p=n(94),b=n(430),h=n(292),g=n(222),j=n(81),O=n(10),E=n(329),v=n.n(E),w=Object(f.a)((function(e){var t;return{root:{flexGrow:1},appBar:{backgroundColor:"grey"},menuButton:{marginRight:e.spacing(2)},title:Object(p.a)({flexGrow:1,display:"none"},e.breakpoints.up("sm"),{display:"block"}),search:(t={position:"relative",borderRadius:e.shape.borderRadius,backgroundColor:Object(O.d)(e.palette.common.white,.15),"&:hover":{backgroundColor:Object(O.d)(e.palette.common.white,.25)},marginLeft:0,width:"100%"},Object(p.a)(t,e.breakpoints.up("sm"),{marginLeft:e.spacing(1),width:"auto"}),Object(p.a)(t,"display","inline-flex"),t),searchIcon:{padding:e.spacing(0,2),height:"100%",position:"absolute",display:"flex",alignItems:"center",justifyContent:"center",right:"-10px"},inputRoot:{color:"inherit"},inputInput:Object(p.a)({padding:e.spacing(1,1,1,0),paddingLeft:"calc(1em)",transition:e.transitions.create("width"),width:"100%"},e.breakpoints.up("sm"),{width:"12ch","&:focus":{width:"20ch"}})}}));function x(){var e=w();return i.a.createElement("div",{className:e.root},i.a.createElement(b.a,{className:e.appBar,position:"static"},i.a.createElement(h.a,null,i.a.createElement(g.a,{edge:"start",className:e.menuButton,color:"inherit","aria-label":"open drawer"},i.a.createElement(v.a,null)),i.a.createElement(j.a,{className:e.title,variant:"h6",noWrap:!0},"Student Directory"))))}var k=n(195),y=n(223),D=n.n(y);function N(e){var t=e.students,n=Object(a.useState)({columns:[{title:"Code",field:"classCode"},{title:"Name",field:"fullName"},{title:"Email",field:"email",render:function(e){return i.a.createElement("a",{href:"mailto:".concat(e.email)},e.email)}},{title:"GH",field:"githubId",render:function(e){return i.a.createElement("a",{href:"https://github.com/".concat(e.githubId),target:"_blank"},e.githubId)}},{title:"Grad Date",field:"graduationDate"},{title:"Sessions",field:"sessionsWeek"},{title:"Diff",field:"timeDiff"},{title:"Zoom",field:"zoomLink",render:function(e){return i.a.createElement("a",{href:e.zoomLink,target:"_blank"},e.zoomLink)}},{title:"Spot",field:"startingPoint"}],data:[]}),r=Object(d.a)(n,2),c=r[0],s=r[1];return Object(a.useEffect)((function(){s((function(e){return Object(o.a)({},e,{data:t})}))}),[t]),Object(a.useEffect)((function(){t.length>0&&console.log(t)}),[t]),i.a.createElement(D.a,{title:"",columns:c.columns,data:c.data,options:{sorting:!0,rowStyle:{backgroundColor:"#EEE"}},editable:{onRowAdd:function(e){return new Promise((function(t){setTimeout((function(){t(),s((function(t){var n=Object(k.a)(t.data);return n.push(e),Object(o.a)({},t,{data:n})}))}),600)}))},onRowUpdate:function(e,t){return new Promise((function(n){setTimeout((function(){n(),t&&s((function(n){var a=Object(k.a)(n.data);return a[a.indexOf(t)]=e,Object(o.a)({},n,{data:a})}))}),600)}))},onRowDelete:function(e){return new Promise((function(t){setTimeout((function(){t(),s((function(t){var n=Object(k.a)(t.data);return n.splice(n.indexOf(e),1),Object(o.a)({},t,{data:n})}))}),600)}))}}})}n(408);var S=Object(f.a)((function(e){return Object(m.a)({hide:{visibility:"hidden"},show:{visibility:"visible"}})})),C=function(){var e=Object(a.useState)([]),t=Object(d.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(null),s=Object(d.a)(c,2),f=s[0],m=s[1],p=Object(a.useState)(!1),b=Object(d.a)(p,2),h=b[0],g=b[1];S();return Object(a.useEffect)((function(){function e(){return(e=Object(u.a)(l.a.mark((function e(){var t,n,a,i,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("/current-time");case 3:if(!(t=e.sent).ok){e.next=21;break}return e.next=7,t.json();case 7:return n=e.sent,(a=new Date).setTime(1e3*n.time),a.toLocaleString(),e.next=13,fetch("/api/students");case 13:return i=e.sent,e.next=16,i.json();case 16:c=e.sent,m(a),r(c),e.next=22;break;case 21:g(t.statusText);case 22:e.next=28;break;case 24:e.prev=24,e.t0=e.catch(0),console.log(e.t0),g(!0);case 28:case"end":return e.stop()}}),e,null,[[0,24]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),i.a.createElement("div",{className:"App"},i.a.createElement(x,null),h?i.a.createElement("p",{className:"pt-2 text-center text-error"},h):i.a.createElement("div",{className:"main"},i.a.createElement("p",{className:"pt-2 text-center text-success"},f?"".concat(f):"Loading..."),i.a.createElement("div",{style:{display:"flex",justifyContent:"space-around",flexWrap:"wrap"}},i.a.createElement("div",null,i.a.createElement(N,{students:n.map((function(e){var t=new Date(e.graduationDate.$date);return Object(o.a)({},e,{_id:e._id.$oid,graduationDate:"".concat(t.getMonth()+1,"/").concat(t.getDate(),"/").concat(t.getFullYear())})}))})))))};c.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(C,null)),document.getElementById("root"))}},[[341,1,2]]]);
//# sourceMappingURL=main.0ce90562.chunk.js.map
(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{24:function(e,a,t){e.exports=t(40)},29:function(e,a,t){},40:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),c=t(20),s=t.n(c),i=(t(29),t(21)),r=t(6),o=t(7),m=t(8),d=t(10),u=t(9),h=t(11),E=t(13),v=function(e){function a(){var e,t;Object(o.a)(this,a);for(var n=arguments.length,l=new Array(n),c=0;c<n;c++)l[c]=arguments[c];return(t=Object(d.a)(this,(e=Object(u.a)(a)).call.apply(e,[this].concat(l)))).state={email:"",password:""},t.handleInputChange=function(e){var a=e.target,n=a.name,l=a.value;t.setState(Object(E.a)({},n,l))},t.handleFormSubmit=function(e){e.preventDefault(),t.setState({email:"",password:""})},t}return Object(h.a)(a,e),Object(m.a)(a,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("div",{className:this.props.show?"modal is-active":"modal"},l.a.createElement("div",{className:"modal-background",onClick:this.props.hide}),l.a.createElement("div",{className:"modal-content"},l.a.createElement("div",{className:"modal-card"},l.a.createElement("div",{className:"modal-card-head"}),l.a.createElement("div",{className:"modal-card-body"},l.a.createElement("h1",{className:"title"},"Enter your login information."),l.a.createElement("div",{className:"field"},l.a.createElement("label",{className:"label"},"Email Address"),l.a.createElement("div",{className:"control"},l.a.createElement("input",{className:"input",type:"text",placeholder:"email@example.com",name:"email",value:this.state.email,onChange:this.handleInputChange}))),l.a.createElement("div",{className:"field"},l.a.createElement("label",{className:"label"},"Password"),l.a.createElement("div",{className:"control"},l.a.createElement("input",{className:"input",type:"text",name:"password",value:this.state.password,onChange:this.handleInputChange}))),l.a.createElement("button",{className:"button is-primary",onClick:this.handleFormSubmit},"Log In"),l.a.createElement("button",{className:"modal-close is-large",onClick:this.props.hide})),l.a.createElement("div",{className:"modal-card-foot"})))))}}]),a}(n.Component),p=function(e){function a(){var e,t;Object(o.a)(this,a);for(var n=arguments.length,l=new Array(n),c=0;c<n;c++)l[c]=arguments[c];return(t=Object(d.a)(this,(e=Object(u.a)(a)).call.apply(e,[this].concat(l)))).state={email:"",password:"",confirmedPassword:"",firstName:"",lastName:"",location:""},t.handleInputChange=function(e){var a=e.target,n=a.name,l=a.value;t.setState(Object(E.a)({},n,l))},t.handleFormSubmit=function(e){e.preventDefault(),t.setState({email:"",password:"",confirmedPassword:"",firstName:"",lastName:"",location:""})},t}return Object(h.a)(a,e),Object(m.a)(a,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("div",{className:this.props.show?"modal is-active":"modal"},l.a.createElement("div",{className:"modal-background",onClick:this.props.hide}),l.a.createElement("div",{className:"modal-content"},l.a.createElement("div",{className:"modal-card"},l.a.createElement("div",{className:"modal-card-head"}),l.a.createElement("div",{className:"modal-card-body"},l.a.createElement("h1",{className:"title"},"Enter your information to sign up."),l.a.createElement("div",{className:"field"},l.a.createElement("label",{className:"label"},"Email Address"),l.a.createElement("div",{className:"control"},l.a.createElement("input",{className:"input",type:"text",placeholder:"email@example.com",name:"email",value:this.state.email,onChange:this.handleInputChange}))),l.a.createElement("div",{className:"field"},l.a.createElement("label",{className:"label"},"Password"),l.a.createElement("div",{className:"control"},l.a.createElement("input",{className:"input",type:"text",name:"password",value:this.state.password,onChange:this.handleInputChange}))),l.a.createElement("div",{className:"field"},l.a.createElement("label",{className:"label"},"Confirm Password"),l.a.createElement("div",{className:"control"},l.a.createElement("input",{className:"input",type:"text",name:"confirmedPassword",value:this.state.confirmedPassword,onChange:this.handleInputChange}))),l.a.createElement("div",{className:"field"},l.a.createElement("label",{className:"label"},"First Name"),l.a.createElement("div",{className:"control"},l.a.createElement("input",{className:"input",type:"text",name:"firstName",value:this.state.firstName,onChange:this.handleInputChange}))),l.a.createElement("div",{className:"field"},l.a.createElement("label",{className:"label"},"Last Name"),l.a.createElement("div",{className:"control"},l.a.createElement("input",{className:"input",type:"text",name:"lastName",value:this.state.lastName,onChange:this.handleInputChange}))),l.a.createElement("div",{className:"field"},l.a.createElement("label",{className:"label"},"Location"),l.a.createElement("div",{className:"control"},l.a.createElement("input",{className:"input",type:"text",name:"location",value:this.state.location,onChange:this.handleInputChange}))),l.a.createElement("button",{className:"button is-primary",onClick:this.handleFormSubmit},"Log In"),l.a.createElement("button",{className:"modal-close is-large",onClick:this.props.hide})),l.a.createElement("div",{className:"modal-card-foot"})))))}}]),a}(n.Component),N=function(e){function a(e){var t;return Object(o.a)(this,a),(t=Object(d.a)(this,Object(u.a)(a).call(this,e))).hideModal=function(){t.setState({loginShow:!1}),t.setState({signUpShow:!1})},t.showLogin=function(){t.setState({loginShow:!0})},t.showSignUp=function(){t.setState({signUpShow:!0})},t.state={loginShow:!1,signUpShow:!1},t}return Object(h.a)(a,e),Object(m.a)(a,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("div",{className:"section"},l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"content"},l.a.createElement("h1",{className:"title"},"Goober"),l.a.createElement("h3",{className:"subtitle"},"Helping you find man's best friend's best friend.")),l.a.createElement(v,{show:this.state.loginShow,hide:this.hideModal}),l.a.createElement(p,{show:this.state.signUpShow,hide:this.hideModal}),l.a.createElement("button",{className:"button",onClick:this.showLogin},"Login"),l.a.createElement("button",{className:"button",onClick:this.showSignUp},"Sign Up"))))}}]),a}(n.Component),f=function(){return l.a.createElement("nav",{className:"navbar"},l.a.createElement("div",{className:"navbar-start"},l.a.createElement("a",{className:"navbar-item",href:"/profile"},"Profile"),l.a.createElement("a",{className:"navbar-item",href:"/search"},"Search"),l.a.createElement("a",{className:"navbar-item",href:"/social"},"Social")),l.a.createElement("div",{className:"navbar-end"},l.a.createElement("a",{className:"navbar-item"},"Log Out")))};var g=function(){return l.a.createElement("div",null,l.a.createElement(f,null),l.a.createElement("div",{className:"section"},l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"content"},l.a.createElement("h1",{className:"title"},"Profile Page")))))};var b=function(){return l.a.createElement("div",null,l.a.createElement(f,null),l.a.createElement("div",{className:"section"},l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"content"},l.a.createElement("h1",{className:"title"},"Search Page")))))};var w=function(){return l.a.createElement("div",null,l.a.createElement(f,null),l.a.createElement("div",{className:"section"},l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"content"},l.a.createElement("h1",{className:"title"},"Social Page")))))};var C=function(){return l.a.createElement("div",null,l.a.createElement("div",{className:"section"},l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"content"},l.a.createElement("h1",null,"404 Page Not Found"),l.a.createElement("h1",null,l.a.createElement("span",{role:"img","aria-label":"Face With Rolling Eyes Emoji"},"\ud83d\ude44"))))))};var S=function(){return l.a.createElement(i.a,null,l.a.createElement("div",null,l.a.createElement(r.c,null,l.a.createElement(r.a,{exact:!0,path:"/",component:N}),l.a.createElement(r.a,{exact:!0,path:"/profile",component:g}),l.a.createElement(r.a,{exact:!0,path:"/search",component:b}),l.a.createElement(r.a,{exact:!0,path:"/social",component:w}),l.a.createElement(r.a,{component:C}))))},y=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function k(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var a=e.installing;a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}s.a.render(l.a.createElement(S,null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("","/service-worker.js");y?function(e){fetch(e).then(function(a){404===a.status||-1===a.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):k(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e):k(e)})}}()}},[[24,1,2]]]);
//# sourceMappingURL=main.a8964cd3.chunk.js.map
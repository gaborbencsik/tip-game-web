webpackJsonp([1],{"0Kyw":function(t,e,a){"use strict";function n(t){a("hy9n")}var s=a("7q3b"),o=a("7/jB"),i=a("VU/8"),r=n,c=i(s.a,o.a,r,"data-v-315a7c42",null);e.a=c.exports},"0MqI":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"navbar"},[a("header",{staticClass:"container"},[a("nav",[a("router-link",{staticClass:"btn",attrs:{to:"/home"}},[t._v("Home")]),t._v(" "),a("router-link",{staticClass:"btn",attrs:{to:"/match-list"}},[t._v("Match List")]),t._v(" "),a("router-link",{staticClass:"btn",attrs:{to:"/tips"}},[t._v("Tips")]),t._v(" "),a("logout")],1)])])},s=[],o={render:n,staticRenderFns:s};e.a=o},"24zf":function(t,e){},"4jld":function(t,e,a){"use strict";var n=a("mtWM"),s=a.n(n);e.a={name:"registration",data:function(){return{credentials:{name:"",password:"",email:""},error:"",showLogin:!1,success:!1}},methods:{submit:function(){var t=this;console.log(this.credentials),s.a.post("/registration",{name:this.credentials.name,password:this.credentials.password,email:this.credentials.email}).then(function(e){e.data.success?t.success=!0:t.error=e.data.message}).catch(function(t){console.log(t)})},changeLoginState:function(){this.showLogin=!this.showLogin,this.$store.commit("toggleLoginState",this.showLogin)}}}},"7/jB":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"logout"},[a("button",{staticClass:"btn btn-danger",attrs:{type:"button",name:"button"},on:{click:function(e){t.logout()}}},[t._v("Logout")])])},s=[],o={render:n,staticRenderFns:s};e.a=o},"7q3b":function(t,e,a){"use strict";e.a={name:"logout",data:function(){return{}},methods:{logout:function(){localStorage.removeItem("token"),localStorage.setItem("authenticated",!1);var t={token:null,authenticated:!1};this.$store.commit("authenticateUser",t)}}}},"9M+g":function(t,e){},"9sAL":function(t,e){},Drc2:function(t,e,a){"use strict";var n=a("0Kyw");e.a={name:"navbar",components:{logout:n.a},data:function(){return{}},beforeCreate:function(){var t=localStorage.getItem("token"),e=""!==t;this.$store.commit("authenticateUser",{token:t,authenticated:e})},methods:{logout:function(){localStorage.removeItem("token"),localStorage.setItem("authenticated",!1)}}}},Fs8J:function(t,e,a){"use strict";e.a={name:"home",data:function(){return{}},computed:{authenticated:function(){return this.$store.state.user.authenticated}}}},G5BR:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"registration"},[a("div",{},[a("h2",[t._v("Registration")]),t._v(" "),t.error?a("div",{staticClass:"alert alert-danger"},[a("p",[t._v(t._s(t.error))])]):t._e(),t._v(" "),t.success?a("div",{staticClass:"alert alert-success"},[a("p",[t._v("Your registration was successful.")]),t._v(" "),a("a",{staticClass:"alert-link login-text",on:{click:function(e){t.changeLoginState()}}},[t._v("Login here!")])]):t._e(),t._v(" "),a("div",{staticClass:"form-group"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.credentials.name,expression:"credentials.name"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Enter your username"},domProps:{value:t.credentials.name},on:{input:function(e){e.target.composing||(t.credentials.name=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-group"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.credentials.email,expression:"credentials.email"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Enter your email"},domProps:{value:t.credentials.email},on:{input:function(e){e.target.composing||(t.credentials.email=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-group"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.credentials.password,expression:"credentials.password"}],staticClass:"form-control",attrs:{type:"password",placeholder:"Enter your password"},domProps:{value:t.credentials.password},on:{input:function(e){e.target.composing||(t.credentials.password=e.target.value)}}})]),t._v(" "),a("button",{staticClass:"btn btn-primary",on:{click:function(e){t.submit()}}},[t._v("Register")])]),t._v(" "),a("h3",{staticClass:"btn btn-link",on:{click:function(e){t.changeLoginState()}}},[t._v("Login")])])},s=[],o={render:n,staticRenderFns:s};e.a=o},Jmt5:function(t,e){},Jwpp:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[t.user.authenticated?a("div",[a("navbar")],1):a("div",{staticClass:"row container-fluid"},[a("div",{staticClass:"col-md-6 col-xs-8 col-xs-offset-2"},[t.showLoginState?a("div",[a("login")],1):a("div",[a("registration")],1)])]),t._v(" "),a("router-view",{staticClass:"container"})],1)},s=[],o={render:n,staticRenderFns:s};e.a=o},KiS1:function(t,e){},L7Qg:function(t,e){},M93x:function(t,e,a){"use strict";function n(t){a("9sAL")}var s=a("xJD8"),o=a("Jwpp"),i=a("VU/8"),r=n,c=i(s.a,o.a,r,null,null);e.a=c.exports},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("7+uW"),s=a("M93x"),o=a("YaEn"),i=a("sCSS"),r=a("9M+g"),c=(a.n(r),a("Jmt5"));a.n(c);n.a.config.productionTip=!1,n.a.use(i.a),new n.a({el:"#app",router:o.a,template:"<App/>",components:{App:s.a}})},"Qg+d":function(t,e,a){"use strict";e.a={name:"tips",computed:{matches:function(){return this.$store.state.matches},authenticated:function(){return this.$store.state.user.authenticated},tips:function(){return this.$store.state.matches.map(function(t){return{id:t.id,homeTeamName:t.homeTeamName,awayTeamName:t.awayTeamName,date:t.tipTimestamp}})},getCount:function(){return this.$store.state.count}},methods:{increment:function(){console.log("clicked"),this.$store.commit("increment",1)},decrement:function(){this.$store.commit("increment",-1)},set:function(){this.$store.commit("set",parseInt(this.$refs.counter.value))}}}},YaEn:function(t,e,a){"use strict";var n=a("7+uW"),s=a("/ocq"),o=a("lO7g"),i=a("aduR"),r=a("nCcz"),c=a("xJsL"),u=a("mRaa");n.a.use(s.a);var l=new s.a({routes:[{path:"/login",name:"Login",component:c.a},{path:"/registration",name:"Registration",component:u.a},{path:"/home",name:"Home",component:o.a},{path:"/match-list",name:"MatchList",component:i.a},{path:"/tips",name:"Tips",component:r.a}]});e.a=l},aduR:function(t,e,a){"use strict";function n(t){a("kgSD")}var s=a("vD/i"),o=a("e5Kh"),i=a("VU/8"),r=n,c=i(s.a,o.a,r,"data-v-58fceffb",null);e.a=c.exports},c7J4:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"login"},[a("div",{},[a("h2",[t._v("Log In")]),t._v(" "),t.error?a("div",{staticClass:"alert alert-danger"},[a("p",[t._v(t._s(t.error))])]):t._e(),t._v(" "),a("div",{staticClass:"form-group"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.credentials.name,expression:"credentials.name"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Enter your username"},domProps:{value:t.credentials.name},on:{input:function(e){e.target.composing||(t.credentials.name=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-group"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.credentials.password,expression:"credentials.password"}],staticClass:"form-control",attrs:{type:"password",placeholder:"Enter your password"},domProps:{value:t.credentials.password},on:{input:function(e){e.target.composing||(t.credentials.password=e.target.value)}}})]),t._v(" "),a("button",{staticClass:"btn btn-primary",on:{click:function(e){t.submit()}}},[t._v("Login")])]),t._v(" "),a("h3",{staticClass:"btn btn-link",on:{click:function(e){t.goToRegister()}}},[t._v("Not registered yet?")])])},s=[],o={render:n,staticRenderFns:s};e.a=o},ciMT:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.authenticated?a("div",{staticClass:"home"}):t._e()},s=[],o={render:n,staticRenderFns:s};e.a=o},e5Kh:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.authenticated?a("div",{staticClass:"matchList"},[a("h1",[t._v("MatchList")]),t._v(" "),a("main",[a("table",{staticClass:"table table-responsive"},[t._m(0),t._v(" "),a("tbody",t._l(t.matches,function(e){return a("tr",[a("td",[t._v(t._s(e.homeTeamName))]),t._v(" "),a("td",[t._v(t._s(e.awayTeamName))]),t._v(" "),a("td",[a("span",[t._v(t._s(e.homeGoals)+" - ")]),t._v(" "),a("span",[t._v(t._s(e.awayGoals))])]),t._v(" "),a("td",[a("span",[t._v("("+t._s(e.halfTimeHomeGoals)+" - ")]),t._v(" "),a("span",[t._v(t._s(e.halfTimeAwayGoals)+")")])]),t._v(" "),a("td",[t._v(t._s(e.date))])])}))])])]):t._e()},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",[t._v("Home")]),t._v(" "),a("th",[t._v("Away")]),t._v(" "),a("th",[t._v("Result")]),t._v(" "),a("th",[t._v("Halftime")]),t._v(" "),a("th",[t._v("Date")])])])}],o={render:n,staticRenderFns:s};e.a=o},hMMY:function(t,e){},hy9n:function(t,e){},kgSD:function(t,e){},lO7g:function(t,e,a){"use strict";function n(t){a("24zf")}var s=a("Fs8J"),o=a("ciMT"),i=a("VU/8"),r=n,c=i(s.a,o.a,r,"data-v-2a297117",null);e.a=c.exports},lfLh:function(t,e,a){"use strict";function n(t){a("KiS1")}var s=a("Drc2"),o=a("0MqI"),i=a("VU/8"),r=n,c=i(s.a,o.a,r,"data-v-4272cfc8",null);e.a=c.exports},mRaa:function(t,e,a){"use strict";function n(t){a("hMMY")}var s=a("4jld"),o=a("G5BR"),i=a("VU/8"),r=n,c=i(s.a,o.a,r,"data-v-7777c7f1",null);e.a=c.exports},nCcz:function(t,e,a){"use strict";function n(t){a("L7Qg")}var s=a("Qg+d"),o=a("wG0v"),i=a("VU/8"),r=n,c=i(s.a,o.a,r,"data-v-5d940a20",null);e.a=c.exports},"nKb+":function(t,e,a){"use strict";var n=a("mtWM"),s=a.n(n);e.a={name:"login",data:function(){return{credentials:{name:"",password:""},error:"",showLogin:!0}},methods:{submit:function(){var t=this;s.a.post("/login",{name:this.credentials.name,password:this.credentials.password}).then(function(e){console.log(e),e.data.success?(t.authenticateUser(e.data.token),localStorage.setItem("token",e.data.token),localStorage.setItem("id",e.data.id)):t.error=e.data.message}).catch(function(t){console.log(t)})},goToRegister:function(){this.showLogin=!this.showLogin,this.$store.commit("toggleLoginState",this.showLogin)},authenticateUser:function(t){var e={token:t,authenticated:!0};this.$store.commit("authenticateUser",e)}}}},pfl9:function(t,e){},"vD/i":function(t,e,a){"use strict";e.a={name:"matchList",computed:{matches:function(){return this.$store.state.matches},authenticated:function(){return this.$store.state.user.authenticated}},created:function(){console.log(this.$store.state.user.authenticated)}}},wG0v:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.authenticated?a("div",{staticClass:"matchList container-fluid"},[a("h1",[t._v("My Tips")]),t._v(" "),a("main",[a("table",{staticClass:"table table-responsive"},[t._m(0),t._v(" "),a("tbody",t._l(t.tips,function(e){return a("tr",[a("td",[t._v(t._s(e.homeTeamName))]),t._v(" "),a("td",[t._v(t._s(e.awayTeamName))]),t._v(" "),t._m(1,!0),t._v(" "),a("td",[t._v(t._s(e.date))]),t._v(" "),t._m(2,!0)])}))])]),t._v(" "),a("input",{ref:"counter",attrs:{type:"number",name:""},domProps:{value:t.getCount}}),t._v(" "),a("button",{attrs:{type:"button",name:"button"},on:{click:t.set}},[t._v("set")]),t._v(" "),a("button",{attrs:{type:"button",name:"button"},on:{click:t.increment}},[t._v("increment by one")]),t._v(" "),a("button",{attrs:{type:"button",name:"button"},on:{click:t.decrement}},[t._v("decrement by one")]),t._v(" "),a("p",[t._v(t._s(t.getCount))])]):t._e()},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",[t._v("Home")]),t._v(" "),a("th",[t._v("Away")]),t._v(" "),a("th",[t._v("Tip")]),t._v(" "),a("th",[t._v("Last modified")]),t._v(" "),a("th",[a("button",{staticClass:"btn btn-success",attrs:{type:"button",name:"button",disabled:""}},[t._v("Save all")])])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("td",[a("input",{staticClass:"col-sx-1"}),t._v(" "),a("input",{staticClass:"col-sx-1"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("td",[a("button",{staticClass:"btn btn-primary"},[t._v("Save")])])}],o={render:n,staticRenderFns:s};e.a=o},wtEF:function(t,e,a){"use strict";a.d(e,"a",function(){return o});var n=a("7+uW"),s=a("NYxO");n.a.use(s.a);var o=new s.a.Store({strict:!0,state:{count:0,user:{token:"",authenticated:!1},showLogin:!0,matches:[{id:"162537",homeTeamName:"FC Bayern München",awayTeamName:"Bayer Leverkusen",date:1503081e3,matchday:1,homeGoals:3,awayGoals:1,halfTimeHomeGoals:2,halfTimeAwayGoals:0,status:"FINISHED"},{id:"162536",homeTeamName:"VfL Wolfsburg",awayTeamName:"Borussia Dortmund",date:1503149400,matchday:1,homeGoals:0,awayGoals:3,halfTimeHomeGoals:0,halfTimeAwayGoals:2,status:"FINISHED"}],tips:[{userId:"2",id:"162537",homeGoals:"4",awayGoals:"4",tipTimestamp:1506441882776},{userId:"2",id:"162536",homeGoals:"3",awayGoals:"5",tipTimestamp:1506441819019}]},getters:{},mutations:{setState:function(t,e){t.matches=e},increment:function(t,e){t.count+=e},decrement:function(t,e){t.count-=e},set:function(t,e){t.count=e},authenticateUser:function(t,e){t.user.authenticated=e.authenticated,t.user.token=e.token},toggleLoginState:function(t,e){t.showLogin=e}},actions:{getMatches:function(t){var e=t.commit;console.log("1");var a=[{id:"162537",homeTeamName:"HAZAI",awayTeamName:"VENDÉG",date:1503081e3,matchday:1,homeGoals:5,awayGoals:5,halfTimeHomeGoals:5,halfTimeAwayGoals:0,status:"FINISHED"}];setTimeout(function(){e("setState",a),console.log("2")},500)}}})},xJD8:function(t,e,a){"use strict";var n=a("wtEF"),s=a("lfLh"),o=a("xJsL"),i=a("lO7g"),r=a("mRaa");e.a={store:n.a,name:"app",components:{navbar:s.a,login:o.a,home:i.a,registration:r.a},computed:{user:function(){return this.$store.state.user},showLoginState:function(){return this.$store.state.showLogin},getToken:function(){return this.$store.state.user.token}},beforeCreate:function(){var t=localStorage.getItem("token"),e=t;this.$store.commit("authenticateUser",{token:t,authenticated:e})}}},xJsL:function(t,e,a){"use strict";function n(t){a("pfl9")}var s=a("nKb+"),o=a("c7J4"),i=a("VU/8"),r=n,c=i(s.a,o.a,r,"data-v-38e99861",null);e.a=c.exports}},["NHnr"]);
//# sourceMappingURL=app.20f852145338eef9453a.js.map
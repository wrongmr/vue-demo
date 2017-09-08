// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import weui from 'weui'
Vue.use(VueResource);
import $ from './assets/flexible'
import wx from 'weixin-js-sdk'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

Vue.config.productionTip = false

// 路由跳转
Vue.prototype.$goRoute = function (index) {
  this.$router.push(index)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});

//设置请求头
Vue.http.options.emulateHTTP = true;
Vue.http.options.emulateJSON = true;
window.times = "?timestamp="+ new Date().getTime();

//设置cookie,增加到vue实例方便全局调用
//vue全局调用的理由是，有些组件所用到的接口可能需要session验证，session从cookie获取
//当然，如果session保存到vuex的话除外
Vue.prototype.setCookie = (c_name, value, expiredays) => {
  var exdate = new Date();　　　　
  exdate.setDate(exdate.getDate() + expiredays);　　　　
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

/*//获取cookie、
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}
Vue.prototype.getCookie = getCookie;*/

//删除cookie
Vue.prototype.delCookie =(name) => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  }
function getCookie (cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
  }
  return "";
}

//获取向请求头设置的数据
window.getRequestHeaders = function  ()
{
  var na = "userId",ses = "";
  var name = na + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
  }
  return "";
};
window.encode = function(){
  var name ="encodeToken";
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg)) {
    return unescape(arr[2]);
  }else{
    return null;}
}
window.headers = function(){
  Vue.http.interceptors.push((request, next)  =>{
    var a= true;
    var had="";
    var ses = window.encode();
    var ses1 = window.getRequestHeaders();
    if (ses)
    {
      had += ses;
      if (ses1 != 'undefined')
      {
        had += "_" + ses1;
      }
    }
    if(a){
      request.headers.set('authorization', had);
      request.headers.set("If-Modified-Since","0");
      request.headers.set("Cache-Control","no-cache");
    }
    next((response) => {
      return response
    });

  });
}
/*
 * 格式化日期方法，传入时间
 * */
window.formatDates = function (dates)
{
  if (dates)
  {
    var date = new Date(dates);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;

    return y + '-' + m + '-' + d;
  }
  else
  {
    return "";
  }
};
window.formatDateTimesec = function (dates) {
  if (dates)
  {
    var date = new Date(dates);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ("0" + h) : h;
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var ss = date.getTime()%60000;
    ss = (ss - (ss % 1000)) / 1000;
    ss = ss < 10 ? ("0" + ss) : ss;
    return y + '-' + m + '-' + d+' '+h+':'+minute+":"+ss;
  }
  else
  {
    return "";
  }
};
window.first = "";
window.firstpic = "";
window.second = "";
window.secondpic = "";

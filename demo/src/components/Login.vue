<template>
<div id="login" class="login">
  <div v-if="isLoging" class="model-div" >
    <img src="../images/loading.gif" alt="">
  </div>
  <div class="login-mian">
    <div>
      <div class="wx_login_log">
        <img :class="'banimg'"  src="../images/wx_login_log.png">
      </div>
      <p>联通智慧工地营销支撑平台</p>
    </div>
    <div>
      <form id="form">
        <tr>
          <div class="wx-user"> <img src="../images/wx_login_user.png" alt=""></div>
          <input type="text"  v-model="username" placeholder="用户名">
        </tr>
        <tr class="trpt">
          <div class="wx-psd"> <img src="../images/wx_login_psd.png" alt=""></div>
          <input type="password"  v-model="password" placeholder="密码6-18位">
        </tr>
        <!-- <a href="javascript:;" class="weui-btn weui-btn_primary">按钮</a> -->
        <tr class="borNone trpt">
          <input type="button" value="登录" :class="'fignIn'" @click="logins" v-bind:user="user.username" v-bind:name="user.userRealName">
        </tr>
        <!--<router-link class="set-server" to="/Home">服务器配置</router-link>-->
      </form>
      <div class="wx_login_bgd">
        <img :class="'banimg'"  src="../images/wx_login_bgd.png">
      </div>
    </div>
  </div>

  <div class="Mask" v-show="mask.maskshow">
    <div class="promptBox">
      <div class="promptBox-title">
        <p>{{mask.title}}</p><span @click="cancel"></span>
      </div>
      <div class="promptBox-top">
        <p>{{mask.tisnr}}</p>
      </div>
      <div class="promptBox-butt">
        <input type="button" class="cancel" value="取消" @click="cancel" v-show="mask.butt.but_cancel">
        <input type="button" class="confirm" value="确认" @click="confirm" v-show="mask.butt.but_confirm">
      </div>
    </div>
  </div>
</div>
</template>
<script>
import Loading from './Loading.vue'
// var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
// var passWord = /^(\w){6,20}$/
export default {
  name: 'login',
  data() {
    return {
      isLoging: false,
      password:"",
      username:"",
      user:[],
      mask:{
        maskshow: false,
        title: "",
        tisnr: "",
        butt: {
          but_confirm: true,
          but_cancel: true
        }
      }
    }
  },
  components:{
  Loading
  },
   created() {
     /*pushHistory();
     window.addEventListener("popstate", function(e) {
       console.log("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
     }, false);
     function pushHistory() {
       var state = {
         title: "title",
         url: "#"
       };
       window.history.pushState(state, "title", "#");
       console.log(window.history);
     }*/
   },

  // methods
  // created() {
  //   this.checkLogin();
  // },
  methods: {
    // checkLogin(){
    //       //检查是否存在session
    //       //cookie操作方法在源码里有或者参考网上的即可
    //       if(!this.getCookie('session')){
    //         //如果没有登录状态则跳转到登录页
    //         this.$router.push('/');
    //       }else{
    //         //否则跳转到登录后的页面
    //         this.$router.push('/home');
    //       }
    //     },

    logins(){
        //邮箱以及手机的正则表达式
        var reg = {
          email: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
          phone: /^1(3|4|5|7|8)\d{9}$/
        }
    		/*if(reg.email.test(this.account) || reg.phone.test(this.account)){
          if(this.password != ""){
            this.toLogin();
          }
    		}*/
        if(this.username !="" && this.password != ""){
            this.toLogin();
        }
  	   },
    //登录请求
    toLogin(){

    //一般要跟后端了解密码的加密规则
    //这里例子用的哈希算法来自./js/sha1.min.js
    // let password_sha = hex_sha1(hex_sha1( this.password ));

   /* //设置在登录状态
       this.isLoging = true;
       //请求后端,比如:
       this.$http.post( '/test/general/token/login',{
       params:{
       username: this.username,
       password: this.password
       }
       }).then(function(response){
       if(response.data.code == 1){
       let expireDays = 1000 * 60 * 60 * 24 * 15;
       this.setCookie('session', response.data.session, expireDays);
       //登录成功后
       this.$router.push('/home');
       }
       },function(response){
       //Error
       });*/

    //提交数据
      this.$http.post('/test/general/token/login'+window.times,{
            username:this.username,
            password:this.password
        },{
          emulateJSON:true,
          before:function(xhr)
          {
            this.isLoging = true;
          }
        })
        .then(
          function(response){
            if(response.data.success === 0){
              var head = 'false';
              let expireDays = 1000 * 60 * 60 * 24 * 15;
              this.user = response.data.data;
              window.username=response.data.data.username;
              window.userRealName=response.data.data.userRealName;
             if(head === 'false'){
               this.setCookie('sendusername', response.data.data.username, expireDays);
               this.setCookie('userRealName', response.data.data.userRealName, expireDays);
               this.setCookie('userId', response.data.data.userId, expireDays);
               this.setCookie('encodeToken', response.data.data.encodeToken, expireDays);
               this.setCookie('time', response.data.data.time, expireDays);
               head === 'true';
               this.addhead();
               this.isLoging = false;
             }
              //登录成功后

              this.$router.push({
                name: 'Home',
                params:{username: this.user.username,userRealName:this.user.userRealName}
              })
            }else if(response.data.success === -1){
              var pams = {
                maskshow:true,
                title:"提示",
                tisnr:response.data.error,
                butt:{
                  but_confirm:true,
                  but_cancel:false
                }
              };
              this.mask = pams;
            }
          },
          function(response){
            if(response.data.success === -1){
              var pams = {
                maskshow:true,
                title:"提示",
                tisnr:response.data.error,
                butt:{
                  but_confirm:true,
                  but_cancel:false
                }
              };
              this.mask = pams;
            }
          }
        )

  },
  confirm:function(){
    this.mask.maskshow=false;
  },
  addhead:function (){
      window.headers();
  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../css/login.css";
.model-div{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  background: #000000;
  z-index: 11111;
  opacity: 0.4;
  display: flex;
  align-items: center;
  justify-content: center;
}
.model-div img{
  width:1rem;
  height: 1rem;
}
</style>

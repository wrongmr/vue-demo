<template>
  <div id="home" class="home">
    <div class="home-main">
    <!--大图-->
    <div class="wx-banner">
      <div>
        <span v-html="user.userRealName" v-bind:userRealName="user.username"></span><span class="logout" @click="logout" v-if="!isLogouting">【注销】</span>
      </div>
    </div>
    <!--选择工地-->
    <div class="wx-worksite">
      <img src="../images/wx-addr.png" alt="" >
      <span>当前工地:</span><span class="wx-site" v-html="workSite.workSite?workSite.workSite:'请选择'"  v-bind:id="workSite.id"></span>
      <input type="button" v-on:click="selectSite" value="选择工地">
    </div>
    <!--设备列表-->
    <div>
      <div v-for="item in items" class="wx-sb"  @click="sbdj(item.assetCode)"  v-bind:assetCode="item.assetCode">
        <div><img src="../images/wx-sb.png" alt=""></div>
        <div>
          <span>设备名称:</span>
          <span v-html="item.assetName"></span>
          <span>资产编号:</span>
          <span v-html="item.assetCode"></span>
        </div>
      </div>
      <noequi class="noequip"></noequi>
    </div>
    <!--底部待登记未登记数-->
    <div>
      <ul>
        <li>
          <a @click="ddj(workSite.id,count.before)">

            <div class="wx-outer-ddj wx-outer">
              <div class="wx-inner-ddj wx-inner">
                <span v-html="count.before?count.before:'0'"></span><span>/个</span>
              </div>
            </div>
            <p class="ddj">待登记设备</p>
          </a>
        </li>
        <li>
          <a @click="ydj(workSite.id,count.after)">

            <div class="wx-outer-ydj wx-outer">
              <div class="wx-inner-ydj wx-inner">
                <span v-html="count.after?count.after:'0'"></span><span>/个</span>
              </div>
            </div>

            <p class="ydj">已登记设备</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
    <Loading v-if="isLogouting" marginTop="3%"></Loading>
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
    <!--<v-scan @click.native="scanClick()"></v-scan>-->
  </div>
</template>

<script>
//  import Scan from './scan.vue';
  import noequi from './NoEquipment.vue'
  import Loading from './Loading.vue'
  export default {
    name: 'Home',
    data () {
      return {
        isLogouting: false,
        items: [],
        user: {
          username: window.username,
          userRealName: window.userRealName
        },
        workSite:{
          workSite:"",
          id:""
        },
        count:[],
        mask:{
          maskshow: false,
          title: "",
          show:"",
          tisnr: "",
          butt: {
            but_confirm: true,
            but_cancel: true
          }
        }
       }
    },
    components:{
      'noequi':noequi,
//      'v-scan': Scan,
      Loading
    },
    created (){
       /* // 获取当前登录人信息
        this.$http.get('/static/user.json',{
            params: {
              productType:"1",
              pageNum:1,
              pageLimit:8
            }
          },{
        emulateJSON:true
        })
          .then(
            function(response){
              this.user =response.data.data;

              console.log(this.user);
            },
            function(response){
              console.log(response);
            }
          )*/
          // 获取当前工地信息
          this.$http.post('/test/weixin/findLastSite'+window.times,{
                username:window.username
            },{
              emulateJSON:true
            })
            .then(
              function(response){
                if(response.data.success === 0) {
                  //通过选择工地页面是否将工地信息传递过来进行判断但前工地显示数据
                  var worksite = this.$route.params.workSite || "";
                  if(worksite != ""){
                    this.workSite = this.$route.params;
                  }else{
                    this.workSite = response.data.data;
                  }
                  console.log("this.workSite",this.workSite);
                  // 获取设备列表、传入工地id
                  //因首页展示设备为未登记设备，需传 ZCZT-WSY：未登记设备
                  this.$http.post('/test/weixin/findByStatus'+window.times,{
                      pageNo : 1,
                      pageSize : 5,
                      site:this.workSite.id,
                      assetStatus:'ZCZT-WSY'
                    },{
                      emulateJSON:true
                    })
                    .then(
                      function(response){
                        if(response.data.success === 0) {
                          var dataM = response.data.data.result;
                          //判断数据是否为空，进行截取前5条数据
                          if(dataM !="") {
                            $('.noequip').css('display', 'none');
                            if (dataM) {
                              this.items = response.data.data.result;
                            }
                          }else{
                            $('.noequip').css('display','block');
                          }
                        }else if(response.data.success === -4){
                          var pams = {
                            maskshow:true,
                            title:"提示",
                            show:"-4",
                            tisnr:'登录超时，请重新登录',
                            butt:{
                              but_confirm:true,
                              but_cancel:false
                            }
                          };
                          this.mask = pams;
                        }
                      }
                    )
                    // 获取当前工地下待登记数和已登记数
                    this.$http.post('/test/weixin/findCountByStatus'+window.times,{
                        site:this.workSite.id
                      },{
                        emulateJSON:true
                      })
                      .then(
                        function(response){
                          if(response.data.success === 0) {
                            this.count = response.data.data;
                          }else if(response.data.success === -4){
                            var pams = {
                              maskshow:true,
                              title:"提示",
                              show:"-4",
                              tisnr:'登录超时，请重新登录',
                              butt:{
                                but_confirm:true,
                                but_cancel:false
                              }
                            };
                            this.mask = pams;
                          }
                        }
                      )
                }else if(response.data.success === -4){
                  var pams = {
                    maskshow:true,
                    title:"提示",
                    show:"-4",
                    tisnr:'登录超时，请重新登录',
                    butt:{
                      but_confirm:true,
                      but_cancel:false
                    }
                  };
                  this.mask = pams;
                }
              },
              function(response){
                console.log(response);
              }
            )
    },
    methods: {
      //返回上一页
      //向跳转页面进行传参
      sbdj: function(e) {
        var sStorage=window.sessionStorage;
            sStorage.unrgcode = e;
            sStorage.workSite = this.workSite.workSite;
            sStorage.workSiteId = this.workSite.id;
        this.$router.push({
          name: 'Register',
          params:{
            assetCode:e,
            workSite:this.workSite.workSite,
            workSiteId:this.workSite.id
          }
        })
      },
      ydj: function(e,v) {
        var sStorage=window.sessionStorage;
        sStorage.assetCode = e;
        sStorage.workSite = this.workSite.workSite;
        sStorage.workSiteId = this.workSite.id;
        if(v === '0'){
        }
        this.$router.push({
          name: 'DeviceList',
          params:{
            id:e,
            assetStatus:'ZCZT-SY',
            workSite:this.workSite.workSite,
            workSiteId:this.workSite.id
          }
        })
      },
      ddj: function(e,v) {
        var sStorage=window.sessionStorage;
        sStorage.assetCode = e;
        sStorage.workSite = this.workSite.workSite;
        sStorage.workSiteId = this.workSite.id;
        if(v === '0'){

        }
        this.$router.push({
          name: 'UnregisteredDevice',
          params:{
            id:e,
            assetStatus:'ZCZT-WSY',
            workSite:this.workSite.workSite,
            workSiteId:this.workSite.id
          }
        })
      },
      selectSite:function(e)
      {
        this.$router.push({
          name: 'RosterSelectSite',
          params:{id:e}
        })
      },
      logout:function()
      {
        var pams = {
          maskshow:true,
          title:"提示",
          show:"out",
          tisnr:'确认要退出登录吗？',
          butt:{
            but_confirm:true,
            but_cancel:true
          }
        };
        this.mask = pams;
      },
      confirm:function(){
        if(this.mask.show ==="out"){
          var workchua = "",
            workSitename = this.workSite.workSite,
            workSiteId = this.workSite.id;
          workchua = workSiteId+','+workSitename;
          console.log("workchua",workchua);
          this.$http.post('/test/general/token/logout',{
              userName:window.username,
              userExtendInfo:workchua,
            },{
              emulateJSON:true
            })
            .then(
              function(response){
                console.log("response.data.success",response.data.success)
                if(response.data.success === 0){
                  //删除cookie并跳到登录页
                  this.isLogouting = true;
                  this.delCookie('username');
                  //演示
                  setTimeout(()=>{
                    this.$router.push('/');
                  this.isLogouting = false;
                },3000)
                  this.$router.push({
                    name: 'Login',
                    params:{
                    }
                  })
                }else if(response.data.success === -4){

                  var pams = {
                    maskshow:true,
                    title:"提示",
                    show:"-4",
                    tisnr:'登录超时，请重新登录',
                    butt:{
                      but_confirm:true,
                      but_cancel:false
                    }
                  };
                  this.mask = pams;
                }
              },
              function(response){
                console.log(response);
              }
            )
        }else if(this.mask.show ==="-4"){
          this.$router.push({
            name: 'Login',
            params:{
            }
          })
        }else {
          this.mask.maskshow = false;
        }
      },
      cancel:function(){
        this.mask.maskshow = false;
      },
      setTitle : function(t) {
        console.log(t);
        document.title = t;
        var i = document.createElement('iframe');
        i.src = '//m.baidu.com/favicon.ico';
        i.style.display = 'none';
        i.onload = function() {
          setTimeout(function(){
            i.remove();
          }, 9)
        }
        document.body.appendChild(i);
      }
    },
    mounted : function(){
      this.setTitle('联通智慧工地');
    }
  }
  // 2016.8——2017.8
  // 参与联通智慧工地、劳务实名制管理系统、营销支撑平台微信公众号、微信小程序业务功能讨论、前端原型页面
  // 设计、前端技术规则制定、以及与其他前端工程师共同完成前端页面、功能实现。
  // 联通智慧工地页面、接口联调、功能实现等。
  // 2014.7——2016.7
  // 负责网络孔子学院，在线课堂、微课堂等前端页面功能实现
  // 2013.11——2015.6
  //
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../css/home.css";
</style>

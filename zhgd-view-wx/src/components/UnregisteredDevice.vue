<template>
  <div id="UnregisteredDevice" class="unregisteredDevice">
    <div :class="'list'">
      <div class="hard"></div>
      <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
        <ul :style="{'min-height':fullHeight+'px','background-color':'#ffffff'}">
          <li class="unregisteredDevice-li" v-for="item in listdata"  v-bind:assetCode="item.assetCode">
            <a @click="goRoute(item.assetCode)">
              <span class="unregisteredDevice-li-le">
                <img v-bind:src="item.attachmentId" />
              </span>
              <span class="unregisteredDevice-li-re">
                <p>设备名称：<i>{{item.assetName}}</i></p>
                <p>资产编号：<i>{{item.assetCode}}</i></p>
              </span>
            </a>
          </li>
          <li class="unregisteredDevice-li" v-for="item in downdata"  v-bind:assetCode="item.assetCode">
            <a @click="goRoute(item.assetCode)">
              <span class="unregisteredDevice-li-le">
                <img v-bind:src="item.attachmentId" />
              </span>
              <span class="unregisteredDevice-li-re">
                <p>设备名称：<i>{{item.assetName}}</i></p>
                <p>资产编号：<i>{{item.assetCode}}</i></p>
              </span>
            </a>
          </li>
          <noequi class="noequip"></noequi>
        </ul>
      </v-scroll>
    </div>
    <!--<v-scan @click.native="scanClick()"></v-scan>-->
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
//  import Scan from './scan.vue';
  import noequi from './NoEquipment.vue'
  import Scroll from './scroll.vue';
  export default {
    name: 'UnregisteredDevice',
    data(){
      return {
        pageNo:1,
        pageSize:10,
        counter : 1, //默认已经显示出10条数据 count等于一是让从11条开始加载
        num : 10,  // 一次显示多少条
        pageStart : 0, // 开始页数
        pageEnd : 0, // 结束页数
        listdata: [], // 下拉更新数据存放数组
        downdata: [],  // 上拉更多的数据存放数组
        fullHeight:"",
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
    mounted : function(){
      this.fullHeight=document.documentElement.clientHeight;
      this.getList();
      this.setTitle('待登记设备')
    },
    methods: {
      getList(){
        var sStorage=window.sessionStorage,
          pasid = this.$route.params.id || "",
          pasassetStatus = this.$route.params.assetStatus || "",
          sstorassetCode = sStorage.assetCode || "",
          sstorworkSiteId = sStorage.workSiteId || "",
          deviceid,devicecode;
        if(pasid == undefined || pasid == "" || pasid ==null){
          deviceid = sstorworkSiteId;
        }else{
          deviceid=pasid
        }
        let vm = this;
        vm.$http.post('/test/weixin/findByStatus'+window.times,{
            pageSize:vm.pageSize,
            pageNo:1,
            site:deviceid,
            assetStatus:'ZCZT-WSY'
        },{
          emulateJSON:true
        }).then(function(response){
          if(response.data.success === 0) {
            if(response.data.data.result !=""){
              $('.noequip').css('display', 'none');
              vm.listdata = response.data.data.result;
              var imglist = vm.listdata;
              imglist.forEach(function(x,y){
                if(imglist[y].attachmentId){
                  imglist[y].attachmentId ='/test/project/attachment/downloadImage?id='+imglist[y].attachmentId;
                }else{
                  imglist[y].attachmentId ="../../dist/static/dowimg.png";
                }
              });
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
        }, function(response){
          console.log('error');
        });
      },
      onRefresh(done) {
        this.getList();
        done() // call done
      },
      onInfinite(done) {
        var sStorage=window.sessionStorage,
          pasid = this.$route.params.id || "",
          pasassetStatus = this.$route.params.assetStatus || "",
          sstorassetCode = sStorage.assetCode || "",
          sstorworkSiteId = sStorage.workSiteId || "",
          deviceid,devicecode;
        if(pasid == undefined || pasid == "" || pasid ==null){
          deviceid = sstorworkSiteId;
        }else{
          deviceid=pasid
        }
        let vm = this;
        vm.pageNo ++;
        vm.$http.post('/test/weixin/findByStatus'+window.times,{
          pageSize:vm.pageSize,
          pageNo:vm.pageNo,
            site:deviceid,
            assetStatus:'ZCZT-WSY'
        },{
          emulateJSON:true
        }).then(function(response){
          if(response.data.success === 0) {
            vm.counter++;
            vm.pageEnd = vm.num * vm.counter;
            vm.pageStart = vm.pageEnd - vm.num;
            let arr = response.data.data.result;
            let i = vm.pageStart;
            let end = vm.pageEnd;
            if(arr !="") {
              for (i=0; i < end; i++) {
                let obj = {};
                obj["id"] = arr[i].id;
                obj["attachmentId"] = arr[i].attachmentId;
                obj["assetName"] = arr[i].assetName;
                obj["assetCode"] = arr[i].assetCode;
                vm.downdata.push(obj);
                var imglist1 = vm.downdata;
//                imglist1.forEach(function(x,y){
                if(imglist1[i].attachmentId){
                  imglist1[i].attachmentId ='/test/project/attachment/downloadImage?id='+imglist1[i].attachmentId;
                }else{
                  imglist1[i].attachmentId ="../../dist/static/dowimg.png";
                }
//                });
                if ((i + 1) >= response.data.data.result.length) {
                  this.$el.querySelector('.load-more').style.display = 'none';
                  $('.nullData').css('display','block');
                  return;
                }
              }
              done() // call done
            }else{
              this.$el.querySelector('.load-more').style.display = 'none';
              $('.nullData').css('display','block');
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
        }, function(response){
          console.log('error');
        });
      },
      setTitle : function(t) {
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
      },
      goRoute: function(e) {
        var sStorage=window.sessionStorage;
        sStorage.unrgcode = e;
        this.$router.push({
          name: 'Register',
          params:{
            assetCode:e,
            workSite:this.$route.params.workSite,
            workSiteId:this.$route.params.workSiteId,
            site:this.$route.params.id,
            assetStatus:'ZCZT-WSY'
          }
        })
      },
      confirm:function(){
        if(this.mask.show ==="-4"){
          this.$router.push({
            name: 'Login',
            params:{
            }
          })
        }else {
          this.mask.maskshow = false;
        }
      }
    },
    components : {
      'noequi':noequi,
//      'v-scan': Scan,
      'v-scroll': Scroll
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../css/UnregisteredDevice.css";
</style>

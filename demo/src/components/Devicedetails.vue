<template>
  <div id="Devicedetails" class="devicedetails">
    <div class="Devicedetails-position">
      <div class="position-title"><div></div><i>设备位置</i></div>
      <form @submit.prevent="submit">
        <table>
          <tr class="field">
            <td class="tdleft">
              <img src="../images/icon/ssxm.png">
              所在项目
            </td>
            <td class="tdright"><span class="pf40 disbok">{{info.currentPosition.position1}}</span></td>
          </tr>
          <tr class="field">
            <td class="tdleft">
              <img src="../images/icon/gd.png">
              所在工地
            </td>
            <td class="tdright"><span class="pf40 disbok">{{info.currentPosition.position2}}</span></td>
          </tr>
          <tr class="field">
            <td class="tdleft">
              <img src="../images/icon/azwz.png">
              所在位置
            </td>
            <td class="tdright"><span class="pf40 disbok">{{info.currentPosition.assetPosition}}</span></td>
          </tr>
          <tr class="field">
            <td class="tdleft">
              <img src="../images/icon/azr.png">
              安装人
            </td>
            <td class="tdright"><span class="pf40 disbok">{{info.currentPosition.user}}</span></td>
          </tr>
          <tr class="field">
            <td class="tdleft">
              <img src="../images/icon/azsj.png">
              安装时间
            </td>
            <td class="tdright"><span class="pf40 disbok">{{info.currentPosition.time}}</span></td>
          </tr>
        </table>
      </form>
    </div>

    <div class="Devicedetails-position matop20">
      <div class="position-title"><div></div><i>照片查看</i></div>
      <form @submit.prevent="submit">
        <table>
          <tr class="field field-img">
            <td class="tdright imglist"></td>
          </tr>
        </table>
      </form>
    </div>

    <div class="bott">
      <input type="submit" class="submit marig40" value="备注"  @click="goRem(info.id)">
      <input type="submit" class="submit" value="撤销登记" @click="cxdj">
    </div>

    <div class="Devicedetails-position">
      <div class="position-title"><div></div><i>设备信息</i></div>
      <form @submit.prevent="submit">
        <table>
          <tr class="field">
            <td class="tdleft">
              <div class="tdle"></div>
              设备名称
            </td>
            <td class="tdright"><span class="pf40 disbok">{{info.assetName}}</span></td>
          </tr>
          <tr class="field">
            <td class="tdleft">
              <div class="tdle"></div>
              设备分类
            </td>
            <td class="tdright"><span class="pf40 disbok">{{info.equipmentName}}</span></td>
          </tr>
          <tr class="field">
            <td class="tdleft">
              <div class="tdle"></div>
              设备编号
            </td>
            <td class="tdright"><span class="pf40 disbok">{{info.deviceCode}}</span></td>
          </tr>
          <tr class="field">
            <td class="tdleft">
              <div class="tdle"></div>
              规格型号
            </td>
            <td class="tdright"><span class="pf40 disbok">{{info.specifications}}</span></td>
          </tr>
          <tr class="field">
            <td class="tdleft">
              <div class="tdle"></div>
              资产编号
            </td>
            <td class="tdright"><span class="pf40 disbok">{{info.assetCode}}</span></td>
          </tr>
          <tr class="field">
            <td class="tdleft">
              <div class="tdle"></div>
              资产状态
            </td>
            <td class="tdright"><span class="pf40 disbok assetStatus">{{info.assetStatus}}</span></td>
          </tr>
          <tr class="field">
            <td class="tdleft">
              <div class="tdle"></div>
              单价
            </td>
            <td class="tdright"><span class="pf40 disbok">{{info.price}}</span></td>
          </tr>
          <tr class="field">
            <td class="tdleft">
              <div class="tdle"></div>
              折旧期限(月)
            </td>
            <td class="tdright"><span class="pf40 disbok">{{info.durableYears}}</span></td>
          </tr>
          <tr class="field">
            <td class="tdleft">
              <div class="tdle"></div>
              残值率(%)
            </td>
            <td class="tdright"><span class="pf40 disbok">{{info.residualRate}}</span></td>
          </tr>
          <tr class="field">
            <td class="tdleft">
              <div class="tdle"></div>
              月折旧率(%)
            </td>
            <td class="tdright"><span class="pf40 disbok">{{info.depreciationRate}}</span></td>
          </tr>
        </table>
      </form>
    </div>

    <div class="Devicedetails-position matop20 pb20">
      <div class="position-title borTop"><div></div><i>生命周期</i></div>
      <div class="dev-smzq">
        <div class="cycle" v-for="item in items">
          <div><p class="sizecolor dis">{{item.createTime}}</p><span class="sign">{{item.operation}}</span></div>
          <p><span class="sizecolor">操作人：</span>{{item.createUserName}}</p>
          <p><span class="sizecolor">备注：</span>{{item.operationDetail}}</p>
        </div>
      </div>
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
<!--assetName:设备名称  equipmentName:设备分类 deviceCode:设备编号 specifications:型号 assetCode:资产编号 assetStatus:资产状态 price:单价
    durableYears：折旧期限 residualRate:残值率 depreciationRate:月折旧比 relatedAttachId附件id -->
<script>
//  import Scan from './scan.vue';
  export default {
    name: 'Remarks',
    data(){
      console.log("---------",this.$route.params);//上一页带过来的参数
      return {
        info:{
          id:"",
          szxm: "",
          szgd: "",
          szwz: "",
          azr: "",
          azsj: "",
          assetName: "",
          equipmentName: "",
          deviceCode: "",
          specifications:"",
          assetCode:"",
          assetStatus:"",
          price:"",
          durableYears:"",
          residualRate:"",
          depreciationRate:"",
          relatedAttachId:"",
          currentPosition:{
            position1:"",
            position2:"",
            assetPosition:"",
            user:"",
            time:""
          }
        },
        items:[{

        }],
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
    created (){
      this.$http.post('/test/project/assetRegistration/findTrackingInfo'+window.times,{
            assetCode:window.sessionStorage.devlicode
        },{
          emulateJSON:true
        })
        .then(
          function(response){
            if(response.data.success === 0) {
              this.info = response.data.data;
              var aa = JSON.parse(response.data.data.currentPosition);
              var assetStatus = response.data.data.assetStatus;
              var imglist = response.data.data.relatedAttachId;
              this.info.currentPosition = aa;
              //设备图片
              if(imglist){
                var strs= new Array(),
                  html="";
                strs=imglist.split(",");
                strs.forEach(function (v, i) {
                  html += "<img style='float:left' src=/test/project/attachment/downloadImage?id=" + strs[i] + ">";
                });
                $(".imglist").append(html);
              }

              //资产状态
              this.$http.post('/test/general/dictionary/findDictionary' + window.times, {
                  dictCode: "ZCZT"
                }, {
                  emulateJSON: true
                })
                .then(
                  function (response) {
                    if(response.data.success === 0) {
                      var datalist = response.data.data;
                      datalist.forEach(function (v, i) {
                        if (assetStatus === (v.dictCodeValue)) {
                          var dictCodeName = datalist[i].dictCodeName;
                          $(".assetStatus").html(dictCodeName);
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
                  function (response) {
                    console.log(response);
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
          })
      this.$http.post('/test/project/assetRegistration/findTrackingList'+window.times,{
            assetCode:window.sessionStorage.devlicode
        },{
          emulateJSON:true
        })
        .then(
          function(response){
            if(response.data.success === 0) {
              this.items = response.data.data.result;
            //资产状态
            this.$http.post('/test/general/dictionary/findDictionary'+window.times,{
                dictCode:"ZCCZ"
              },{
                emulateJSON: true
              })
              .then(function(response){
                if(response.data.success === 0) {
                  var datalist = response.data.data;
                  var devli = {};
                  datalist.forEach(function (v, i) {
                    var key = datalist[i].dictCodeValue;
                    var val = datalist[i].dictCodeName;
                    devli[key] = val;
                  })
                  var operat = this.items;
                  operat.forEach(function(x,y){
                    var key1 = operat[y].operation;
                    var devtime= operat[y].createTime;
                    operat[y].operation = devli[key1];
                    operat[y].createTime = window.formatDateTimesec(devtime);
                  })
                }
              },
              function(response){
                console.log(response);
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
          })
    },
    methods:{
      goRem:function(e){
        this.$router.push({
          name: 'Remarks',
          params:{
            id:e,
            assetCode:this.$route.params.assetCode,
          }
        })
      },
      cxdj:function(){
        var pams = {
          maskshow:true,
          title:"提示",
          tisnr:"是否确定撤销设备",
          show:"",
          butt:{
            but_confirm:true,
            but_cancel:true
          }
        };
        this.mask = pams;
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
          this.$http.post('/test/weixin/deleteRegisterCode' + window.times, {
              assetCode: window.sessionStorage.devlicode
            }, {
              emulateJSON: true
            })
            .then(
              function (response) {
                this.$router.push({
                  name: 'DeviceList',
                  params: {
                    assetCode: this.$route.params.assetCode,
                  }
                })
              },
              function (response) {
                console.log(response);
              })
        }
      },
      cancel:function(){
        this.mask.maskshow=false;
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
      }
    },
    mounted(){
      this.setTitle('生命周期')
    },
    components:{
//      'v-scan': Scan
//      calendar: require('./calendar.vue')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../css/devicedetails.css";
</style>

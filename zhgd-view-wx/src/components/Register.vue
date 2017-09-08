<template>
  <div id="Register" class="register">
    <div v-if="isLoging" class="model-div" >
      <img src="../images/loading.gif" alt="">
    </div>
    <div class="register-main">
      <form @submit.prevent="submit">
        <tr class="field">
          <td class="span">
            <img src="../images/icon/gd.png">
            工地
          </td>
          <td class="rigtd">
            <input type="text" v-model="site" readonly>
          </td>
        </tr>
        <tr class="field">
          <td class="span">
            <img src="../images/icon/ssdw.png">
            <span :style="{'color':'red','margin-right':'2px'}">*</span>所属工单
          </td>
          <td class="rigtd">
            <select  v-model="jobOrder" class="selectOP">
              <option value="">请选择</option>
              <option v-for="item in items" v-bind:value="item.id" v-bind:subProjectId="item.subProjectId" v-bind:subProject="item.subProject" v-bind:projectId="item.projectId" v-bind:project="item.project" v-bind:siteName="item.siteName" v-bind:site="item.site">{{item.workOrderName}}</option>
            </select>
          </td>
        </tr>
        <tr class="field">
          <td class="span">
            <img src="../images/icon/azwz.png">
             <span :style="{'color':'red','margin-right':'2px'}">*</span>安装位置
          </td>
          <td class="rigtd">
            <input type="text" v-model="assetPosition">
          </td>
        </tr>
        <tr class="field">
          <td class="span">
            <img src="../images/icon/azr.png">
             <span :style="{'color':'red','margin-right':'2px'}">*</span>安装人
          </td>
          <td class="rigtd">
            <input type="text" v-model="installPeople">
          </td>
        </tr>
        <tr class="field">
          <td class="span">
            <img src="../images/icon/azsj.png">
             <span :style="{'color':'red','margin-right':'2px'}">*</span>安装时间
          </td>
          <!--<div class="weui-cell">
            <div class="weui-cell__bd">
              <input id="d11 times" type="text" onClick="WdatePicker()" v-model="time" style="height: 0.75rem;"/>
            </div>
          </div>-->
          <td class="weui-cell rigtd">
            <div class="weui-cell__bd">
              <!--<input class="weui-input" type="date" value="" v-model="time">-->
              <div class="">
                <div>
                  <input type="text" class="times" @click="openByDrop($event)" v-model="calendar3.display" readonly>
                </div>
                <transition name="fade">
                  <div class="calendar-dropdown" :style="{'left':calendar3.left+'rem','top':calendar3.top+'rem'}" v-if="calendar3.show">
                    <calendar :zero="calendar3.zero" :lunar="calendar3.lunar" :value="calendar3.value" :begin="calendar3.begin" :end="calendar3.end" @select="calendar3.select"></calendar>
                  </div>
                </transition>
              </div>
            </div>
          </td>
        </tr>
        <tr class="field field-img">
          <td class="span">
            <img src="../images/icon/zp.png">
            照片
          </td>
          <td class="tdwid imglist imgcontent rigtd">
            <div class="picadd imgdiss">
              <img src="../images/iconfont-tianjia.png" alt="" />
              <div v-if="!isiOS()" style="width:100%;height:100%;">
                <input  type="file" id="upload" accept="image/*" capture="camera"  @change="upload">
              </div>
              <div  v-else style="width:100%;height:100%;">
                <input  type="file" id="upload" accept="image"  @change="upload">
              </div>
            </div>
          </td>
        </tr>
      </form>
    </div>
    <input type="submit" class="submit" value="提交"  @click="gounreg()">
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
  import Exif from 'exif-js'
  import calendar from './calendar.vue'

  export default {
    name: 'Register',
    data(){
      return {
        isLoging: false,
        site:"",
        jobOrder:"",
        assetPosition:"",
        installPeople:window.userRealName,
        headerImage:[],
        picValue:'',
        items:{

        },
        mask:{
          maskshow: false,
          title: "",
          show:"",
          tisnr: "",
          butt: {
            but_confirm: true,
            but_cancel: true
          }
        },
        calendar3:{
          display:"",
          show:false,
          zero:true,
          value:[], //默认日期
          lunar:true, //显示农历
          select:(value)=>{
            this.calendar3.show=false;
            this.calendar3.value=value;
            this.calendar3.display=value.join("-");
          }
        }
      }

    },
    created (){

      var myDate = new Date();
      var yy,hh,ss,regTime;
      yy = myDate.getFullYear();
      hh = myDate.getMonth()+1;
      ss = myDate.getDate();
      regTime = yy+"-"+hh+"-"+ss;
      this.calendar3.display = regTime;
      this.$http.post('/test/weixin/findWorkOrder'+window.times,{
        //通过首页传参过来的工地进行赋值
        site:window.sessionStorage.workSiteId,
        username:window.username
        },{
          emulateJSON:true
        })
        .then(function(response){
          if(response.data.success === 0) {
            this.items = response.data.data;
          }else if(response.data.success === -4){
            var pams = {
              maskshow:true,
              title:"提示",
              show:"-4",
              tisnr:'登录超时，请从新登录',
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
      isiOS(){
        //解决上传图片时capture="camera"在安卓与IOS的兼容性问题（在IOS只能拍照，不能选相册）
        var ua = navigator.userAgent.toLowerCase();//获取浏览器的userAgent,并转化为小写——注：userAgent是用户可以修改的
        var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);//判断是否是苹果手机，是则是true
        if (isIos) {
          return true;
        };
      },
      //拍照开始
      upload (e) {
        let files = e.target.files || e.dataTransfer.files;
        console.log("files",files)
        if (!files.length) return;
        this.picValue = files[0];
        console.log("this.picValue",this.picValue)
        this.imgPreview(this.picValue);
      },
      imgPreview (file) {
        let self = this;
        let Orientation;
        console.log("self",self);

        //去获取拍照时的信息，解决拍出来的照片旋转问题
        Exif.getData(file, function(){
          Orientation = Exif.getTag(this, 'Orientation');
          console.log("Orientation",Orientation);
        });
        // 看支持不支持FileReader
        if (!file || !window.FileReader) return;

        if (/^image/.test(file.type)) {
          // 创建一个reader
          let reader = new FileReader();
          console.log("reader",reader);
          // 将图片2将转成 base64 格式
          reader.readAsDataURL(file);
          console.log("file161",file);
          // 读取成功后的回调
          reader.onloadend = function () {
            let result = this.result;
            let img = new Image();
            let arrimg = this.result;
            img.src = result;
            secondpic += (" "+result);
            arrimg = secondpic.split(" ");
            arrimg.shift();
            // self.headerImage = arrimg;
            //判断图片是否大于100K,是就直接上传，反之压缩图片
            if (this.result.length <= (100 * 1024)) {
              //  self.headerImage = this.result;
              self.postImg(result,file);
            }else {
              img.onload = function () {
                let data = self.compress(img,Orientation);
                console.log("1766",data)
                //  self.headerImage = data;
                self.postImg(data,file);
              }
            }
          }
        }
      },
      postImg (result,file) {
        this.isLoging = true;
        this.$http.post('/test/project/attachment/createImage'+window.times,
          {figure:result},{
            emulateJSON:true,
            before:function(xhr)
            {

            }

          })
          .then(
            function(response){
              let picid = "";
              let picname = "";

              picid = response.data.data.pictureId;
              picname = file.name;

              var content = $(".imgcontent");
              content.prepend("<div filename="+picname+" fileid="+picid+" style='padding:0.1rem;width: 1.4rem;height: 1.4rem;position: relative;' class='show imgdiss'><Icon type='close' class='delimg'  style='position:absolute;font-size:0.4rem;top:0.2rem;right:0.14rem;color:red;'>x</Icon><img style='width:1.2rem;height:1.2rem;' class='pictures' src="+result+" alt=''></div>");
              var imgcnt = $(".imgcontent").find("[fileid]"),
                  imgcntname = $(".imgcontent").find("[filename]"),
                imgid,imgname;
              for(var i = 0; i < imgcnt.length; i++)
              {
                imgid += ","+imgcnt.eq(i).attr("fileid");
              }
              for(var i = 0; i < imgcntname.length; i++)
              {
                imgname += ","+imgcnt.eq(i).attr("filename");
              }
              imgid = imgid.split(",");
              imgname = imgname.split(",");
              imgid.shift();
              imgname.shift();

              $(".imgcontent").attr("imgid",imgid);
              $(".imgcontent").attr("imgname",imgname);
              this.isLoging = false;
              let sendData = {
                attachName:file.name,
                attachType:file.type,
                attachLength:file.size,
                attachId:picid,
                attachDetail:"0"
              };
              this.$http.post('/test/project/attachment/createFileInfo'+window.times,sendData)
                .then(function(data){
                  $(".delimg").on('click',function(){
                    $(this).parent(".show").css("display","none").removeAttr("filename").removeAttr("fileid");

                    var imgcnt = $(".imgcontent").find("[fileid]"),
                        imgcntname = $(".imgcontent").find("[filename]"),
                      imgid,imgname;
                      if(imgcnt.length > 0){
                        for(var i = 0; i < imgcnt.length; i++)
                        {
                          imgid += ","+imgcnt.eq(i).attr("fileid");
                        }
                        for(var i = 0; i < imgcntname.length; i++)
                        {
                          imgname += ","+imgcnt.eq(i).attr("filename");
                        }
                        imgid = imgid.split(",");
                        imgname = imgname.split(",");
                        imgid.shift();
                        imgname.shift();

                        $(".imgcontent").attr("imgid",imgid);
                        $(".imgcontent").attr("imgname",imgname);
                      }
                      else{
                        $(".imgcontent").removeAttr("imgid");
                        $(".imgcontent").removeAttr("imgname");
                      }
                })
                },
                  function(data){})
            },
            function(response){

            }
          );

        //这里写接口
      },
      rotateImg (img, direction,canvas) {
        //最小与最大旋转方向，图片旋转4次后回到原方向
        const min_step = 0;
        const max_step = 3;
        if (img == null)return;
        //img的高度和宽度不能在img元素隐藏后获取，否则会出错
        let height = img.height;
        let width = img.width;
        let step = 2;
        if (step == null) {
          step = min_step;
        }
        if (direction == 'right') {
          step++;
          //旋转到原位置，即超过最大值
          step > max_step && (step = min_step);
        } else {
          step--;
          step < min_step && (step = max_step);
        }
        //旋转角度以弧度值为参数
        let degree = step * 90 * Math.PI / 180;
        let ctx = canvas.getContext('2d');
        switch (step) {
          case 0:
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0);
            break;
          case 1:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, 0, -height);
            break;
          case 2:
            canvas.width = width;
            canvas.height = height;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, -height);
            break;
          case 3:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, 0);
            break;
        }
      },
      compress(img,Orientation) {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext('2d');
        //瓦片canvas
        let tCanvas = document.createElement("canvas");
        let tctx = tCanvas.getContext("2d");
        let initSize = img.src.length;
        let width = img.width;
        let height = img.height;
        //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
        let ratio;
        if ((ratio = width * height / 4000000) > 1) {
          console.log("大于400万像素")
          ratio = Math.sqrt(ratio);
          width /= ratio;
          height /= ratio;
        } else {
          ratio = 1;
        }
        canvas.width = width;
        canvas.height = height;
//        铺底色
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        //如果图片像素大于100万则使用瓦片绘制
        let count;
        if ((count = width * height / 1000000) > 1) {
          console.log("超过100W像素");
          count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
//            计算每块瓦片的宽和高
          let nw = ~~(width / count);
          let nh = ~~(height / count);
          tCanvas.width = nw;
          tCanvas.height = nh;
          for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
              tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
              ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
            }
          }
        } else {
          ctx.drawImage(img, 0, 0, width, height);
        }
        //修复ios上传图片的时候 被旋转的问题
        if(Orientation != "" && Orientation != 1){
          switch(Orientation){
            case 6://需要顺时针（向左）90度旋转
              this.rotateImg(img,'left',canvas);
              break;
            case 8://需要逆时针（向右）90度旋转
              this.rotateImg(img,'right',canvas);
              break;
            case 3://需要180度旋转
              this.rotateImg(img,'right',canvas);//转两次
              this.rotateImg(img,'right',canvas);
              break;
          }
        }
        //进行最小压缩
        let ndata = canvas.toDataURL('image/jpeg', 0.1);
        console.log('压缩前：' + initSize);
        console.log('压缩后：' + ndata.length);
        console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
        tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;

        return ndata;
      },
      //拍照结束



      gounreg:function(){
        var options=$(".selectOP option:selected"),     //获取选中的项
            assetTrackInfos = {},str,
            subProjectId,subProject,projectId,project,siteName,site,times,relativeId;
            subProjectId = options.attr("subProjectId");  //子项目id
            subProject = options.attr("subProject");      //子项目名称
            projectId = options.attr("projectId");        //项目id
            project = options.attr("project");            //项目名称
            siteName = options.attr("siteName");          //工地名称
            site = options.attr("site");                  //工地id
            times = $(".times").val() || "";
            relativeId = $(".imgcontent").attr("imgid") || "";

          assetTrackInfos.workSiteId= site,
          assetTrackInfos.workSiteName= siteName,
          assetTrackInfos.subProjectId= subProjectId,
          assetTrackInfos.subProjectName= subProject,
          assetTrackInfos.projectId= projectId,
          assetTrackInfos.projectName= project,
          assetTrackInfos.assetPosition= this.assetPosition,
          assetTrackInfos.installPeople= this.installPeople,
          assetTrackInfos.installTime= times
          str = JSON.stringify(assetTrackInfos);
        console.log("options.val()",options.val());
        if(options.val() != "" && this.assetPosition != "" && this.installPeople != "" && times != ""){
          this.$http.post('/test/weixin/updateRegisterType'+window.times,{
              assetStatus:"ZCZT-SY",
              assetCode:window.sessionStorage.unrgcode,
              relatedAttachId:relativeId,
              relativedId : options.val(),
              assetTrackInfos: str
            },{
              emulateJSON:true
            })
            .then(function(response){
                if(response.data.success === 0) {
                  this.$router.push({
                    name: 'UnregisteredDevice',
                    params:{
                      id:this.$route.params.site,
                      assetStatus:'ZCZT-WSY'
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
        }else{
          var pams = {
            maskshow:true,
            title:"提示",
            show:"",
            tisnr:"请正确填写数据",
            butt:{
              but_confirm:true,
              but_cancel:false
            }
          };
          this.mask = pams;
        }
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
      },
      openByDrop(e){
        this.calendar3.show=true;
        this.calendar3.left=-2;
        this.calendar3.top=0.8;

        e.stopPropagation();
        window.setTimeout(function(){
          document.addEventListener("click",function(e){
            this.calendar3.show=false;
            document.removeEventListener("click",function(){},false);
          },false);
        },1000)
      }
    },
    mounted(){
      this.site=window.sessionStorage.workSite;
      this.setTitle('设备登记')
    },
    components:{
      calendar
//      'v-scan': Scan
//      calendar: require('./calendar.vue')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../css/register.css";
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
  .model-pic{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 0.2rem;
    /* line-height: 100%; */
    display: flex;
    align-items: center;
    background: white;
    z-index: 999;
    opacity: 0.6;
     display: none;
  }
  .model-pic>p{
    width: 0;
    height: 0.3rem;
    background: #09bb07;
    font-size: 0.14rem;
    line-height: 0.3rem;
    color: #f7f7f7;
    font-weight: bolder;
  }
  .show {
    padding: 0.1rem;
    width: 1.4rem;
    height: 1.4rem;
  }
  .picture {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .pictures{
    width: 100%;
    height: 100%;
  }
  .imglist{
    width: 70%;
    /*display: flex;*/
    align-items: center;
    float: left;
  }
  .picadd{
    width: 1.4rem;
    height: 1.4rem;
    position: relative;
    padding: 0.1rem;
  }
  .picadd img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .picadd input{
    width: 1.4rem;
    height: 1.4rem;
    border: 0;
    opacity: 0;
  }
</style>

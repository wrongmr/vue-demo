<template>
  <div id="Remarks" class="remarks">
    <div v-if="isLoging" class="model-div" >
      <img src="../images/loading.gif" alt="">
    </div>
    <div class="Remarks-main">
      <form @submit.prevent="submit" class="mainForm">
        <table class="table">
          <tr class="field">
            <td class="tdle">
                <img src="../images/icon/azr.png">
                姓名
            </td>
            <td class="tdwid">
              <input type="text" class="name" v-model="name">
            </td>
          </tr>
          <tr class="field fieldTop">
            <td class="tdle">
              <img src="../images/icon/dh.png">
              电话
            </td>
            <td class="tdwid">
              <input type="text" class="home" v-model="phone" @change="Newhone">
            </td>
          </tr>
          <tr class="field fieldTop">
            <td class="tdle">
              <img src="../images/icon/azsj.png">
              时间
            </td>
            <!--<td class="tdwid">
              <input class="Wdate time" type="text" v-model="phone" onClick="WdatePicker()" style="background: none;border: none;">
            </td>-->
            <td class="tdwid">
              <div class="">
                <div>
                  <input type="text" class="time" @click="openByDrop($event)" v-model="calendar3.display" readonly>
                </div>
                <transition name="fade">
                  <div class="calendar-dropdown" :style="{'left':calendar3.left+'rem','top':calendar3.top+'rem'}" v-if="calendar3.show">
                    <calendar :zero="calendar3.zero" :lunar="calendar3.lunar" :value="calendar3.value" :begin="calendar3.begin" :end="calendar3.end" @select="calendar3.select"></calendar>
                  </div>
                </transition>
              </div>
            </td>
          </tr>
          <tr class="field fieldTop remar field-img">
            <td class="tdle">
              <img src="../images/icon/bz.png">
              备注
            </td>
            <td class="tdwid">
            <textarea class="content"  v-model="content"></textarea>
            </td>
          </tr>
          <tr class="field field-img fieldTop" style="height: auto;">
            <td class="tdle">
              <img src="../images/icon/fj.png">
              附件
            </td>
            <td class="tdwid imglist imgcontent imglists">
              <!-- <div class="show" v-for="item in headerImage"  >
                <Icon type="close" class="delimg" @click="deletimg()" style="position:absolute;top:0.1rem;right:0.1rem;color:red;"></Icon>
                <img class="pictures" :src="item" alt=""> -->
              <!-- <div class="picture" :style="'backgroundImage:url(data'+item+')'"></div> -->
              <!-- </div> -->
              <div class="picadd">
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
        </table>
      </form>
    </div>
    <input type="submit" class="submit" value="提交" @click="godevilist()">

    <div class="Remarks-main remarShow" v-for="itemli in remarShow">
      <form @submit.prevent="submit" class="mainForm">
        <table class="table">
          <tr class="field">
            <td class="tdle">
              <img src="../images/icon/azr.png">
              姓名
            </td>
            <td class="tdwid">
              <input type="text" class="name" v-model="itemli.name" readonly>
            </td>
          </tr>
          <tr class="field fieldTop">
            <td class="tdle">
              <img src="../images/icon/dh.png">
              电话
            </td>
            <td class="tdwid">
              <input type="text" class="home" v-model="itemli.phone" @change="Newhone" readonly>
            </td>
          </tr>
          <tr class="field fieldTop">
            <td class="tdle">
              <img src="../images/icon/azsj.png">
              时间
            </td>
            <td class="tdwid">
              <input class="time" type="text" v-model="itemli.time" readonly>
            </td>
          </tr>
          <tr class="field fieldTop remar field-img">
            <td class="tdle">
              <img src="../images/icon/bz.png">
              备注
            </td>
            <td class="tdwid">
              <textarea class="content"  v-model="itemli.content" readonly></textarea>
            </td>
          </tr>
          <tr class="field field-img fieldTop" style="height: auto;">
            <td class="tdle">
              <img src="../images/icon/fj.png">
              附件
            </td>
            <td class="tdwid imglist imglists" v-bind:imgid="itemli.relatedAttachId" v-bind:imgname="itemli.relatedAttachName">
                <!--{{itemli.relatedAttachId}}-->
              <!--<li v-for="attcid in itemli.relatedAttachId">
                <div class="shows"><img class="pictures" src='/test/project/attachment/downloadImage?id='{{attcid}}></div>
              </li>-->
            </td>
          </tr>
        </table>
      </form>
      <!--<form @submit.prevent="submit" class="mainForm">
        <table class="table">
          <tr class="field">
            <td class="tdle">
              <img src="../images/icon/azr.png">
              姓名
            </td>
            <td class="tdwid">
              <input type="text" class="name" v-model="itemli.name">
            </td>
          </tr>
          <tr class="field fieldTop">
            <td class="tdle">
              <img src="../images/icon/dh.png">
              电话
            </td>
            <td class="tdwid">
              <input type="text" class="home" v-model="itemli.phone" @change="Newhone">
            </td>
          </tr>
          <tr class="field fieldTop">
            <td class="tdle">
              <img src="../images/icon/azsj.png">
              时间
            </td>
            <td class="tdwid">
              <input id="d11 time" type="text" onClick="WdatePicker()" v-model="itemli.time"/>
            </td>
          </tr>
          <tr class="field fieldTop remar field-img">
            <td class="tdle">
              <img src="../images/icon/bz.png">
              备注
            </td>
            <td class="tdwid">
              <textarea class="content"  v-model="itemli.content"></textarea>
            </td>
          </tr>
          <tr class="field field-img fieldTop" style="height: auto;">
            <td class="tdle">
              <img src="../images/icon/fj.png">
              附件
            </td>
            <td class="tdwid imglist imglists">

              <div class="show" v-for="item in headerImage">
                <Icon type="close" class="delimg" @click="deletimg()" style="position:absolute;top:0.1rem;right:0.1rem;color:red;"></Icon>
                <img class="pictures" :src="item" alt="">
                &lt;!&ndash; <div class="picture" :style="'backgroundImage:url(data'+item+')'"></div> &ndash;&gt;
              </div>
              <div class="picadd">
                <img src="../images/iconfont-tianjia.png" alt="" />
                <input type="file" id="upload1" accept="image" @change="upload">
                <label for="upload"></label>
              </div>
            </td>
          </tr>
        </table>
      </form>-->
    </div>
    <!--<v-scan @click.native="scanClick()"></v-scan>-->
    <!--<promptBox ref="foxbox"></promptBox>-->
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
  import Exif from 'exif-js'
//  import promptBox from './promptBox.vue'
  import calendar from './calendar.vue'
  //  import Scan from './scan.vue';
  export default {
    name: 'Remarks',
    data(){
      return {
        isLoging: false,
        name: "",
        time:"",
        phone: "",
        content: "",
        headerImage:[],
        imgarr:[],
        picValue:'',
        remarShow:[{},{},
          {},{},{},{},
          {},{},{},{}],
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
      this.name = window.userRealName;
      //资产状态
      this.$http.post('/test/weixin/findRemark' + window.times, {
          assetCode:window.sessionStorage.devlicode
        }, {
          emulateJSON: true
        })
        .then(
          function (response) {
            if(response.data.success === 0) {
              var lists = response.data.data;
              var bb = lists.replace(/[\\]/g,'');
              var cc = "["+bb+"]";
              var datalist = JSON.parse(cc);
              var imgid="",imgli="",imgarrt=[];
              if(datalist != "" && datalist != null) {
                $(".remarShow").css("display","block");
                datalist.reverse();
                this.remarShow = datalist;
                var arrts = this.remarShow;
                arrts.forEach(function(v,i){
                  var attachid = arrts[i].relatedAttachId || "";
                  console.log("attachid",attachid);
                  if(attachid != ""){
                    imgarrt = attachid.split(",");
                    imgli="";
                    console.log("imgli",imgli);
                    imgarrt.forEach(function (v, i) {
                      imgli += '<div class="shows">' +
                        '<img class="pictures" src=/test/project/attachment/downloadImage?id=' + v + '>' +
                        '</div>';
                    })
                    $(".remarShow").find(".imglists").eq(i).html(imgli);
                  }
                });
              }else{
                $(".remarShow").css('display','none');
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
          },
          function (response) {
            console.log(response);
          })
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
        if (!files.length) return;
        this.picValue = files[0];
        this.imgPreview(this.picValue);
      },
      imgPreview (file) {
        let self = this;
        let Orientation;
        let arrimgs = "";
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

          // 将图片2将转成 base64 格式
          reader.readAsDataURL(file);

          // 读取成功后的回调
          reader.onloadend = function () {
            let result = this.result;
            let arrimg = this.result;
            let img = new Image();
            img.src = result;
            second += (" "+result);
            arrimg = second.split(" ");
            arrimg.shift();

            // self.headerImage = arrimg;
            //判断图片是否大于100K,是就直接上传，反之压缩图片
            if (this.result.length <= (100 * 1024)) {
              //  self.headerImage = this.result;
              self.postImg(result,file);
            }
            else {
              img.onload = function () {
                let data = self.compress(img,Orientation);
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

              content.prepend("<div filename="+picname+" fileid="+picid+" style='padding:0.1rem;width: 1.4rem;height: 1.4rem;position: relative;' class='show imgdiss'><Icon type='close' class='delimg'  style='position:absolute;font-size:0.4rem;top:-0.85rem;right:0.14rem;color:red;'>x</Icon><img style='width:1.2rem;height:1.2rem;' class='pictures' src="+result+" alt=''></div>");

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
              console.log(response);
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


      Newhone: function() {
        var reg = {
          email: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
          phone: /^1(3|4|5|7|8)\d{9}$/
        }
        if(this.phone !=""){
          if(reg.phone.test(this.phone)){

          }else {
            var pams = {
              maskshow:true,
              title:"提示",
              show:"",
              tisnr:"请正确填写手机号",
              butt:{
                but_confirm:true,
                but_cancel:false
              }
            };
            this.mask = pams;
          }
        }

      },
      openByDrop(e){
        this.calendar3.show=true;
        this.calendar3.left=0.4;
        this.calendar3.top=2.7;

        e.stopPropagation();
        window.setTimeout(function(){
          document.addEventListener("click",function(e){
            this.calendar3.show=false;
            document.removeEventListener("click",function(){},false);
          },false);
        },1000)
      },
      godevilist:function(e){   //提交数据
        var str = [],remark={},sendJson=[],
          names,phones,times,contents,
          relatedAttachId,
          relatedAttachName,arrt;
        first = first.substring(1);


        var mainform = $("#Remarks").find(".mainForm");
        var foemlen = mainform.length;
          for(var i=0; i<mainform.length; i++){
            console.log(mainform);
            console.log('1111',$("#Remarks").eq(i).find(".imglists").attr("imgid"));
            console.log('2222',$("#Remarks").eq(i).find(".imglists").attr("imgname"));
            if($("#Remarks").find(".Remarks-main").eq(i).is(':visible')==false){

            }else{
              relatedAttachId = $("#Remarks").eq(i).find(".imglists").attr("imgid") || "";
              relatedAttachName = $("#Remarks").eq(i).find(".imglists").attr("imgname") || "";
              str[i] = {};
              str[i]['name']= mainform[i][0].value,            //姓名
                str[i]['phone']= mainform[i][1].value,            //电话
                str[i]['time']= mainform[i][2].value,      //时间
                str[i]['content']= mainform[i][3].value,       //备注
                str[i]['relatedAttachId']= relatedAttachId,    //附件id
                str[i]['relatedAttachName']=relatedAttachName,    //附件名称
                sendJson.push(str[i]);
            }
        };
        console.log(sendJson);
        console.log(JSON.stringify(sendJson));

       /* names = this.name;             //姓名
        phones = this.phone;       //电话
        times = $(".time").val();      //时间
        contents = this.content;       //备注
        relatedAttachId = first;         //附件id
        relatedAttachName = ""        //附件名称
        str.name= names,
        str.phone= phones,
        str.time= times,
        str.content= contents,
        str.relatedAttachId= relatedAttachId,
        str.relatedAttachName= relatedAttachName;
        remark = JSON.stringify(str);*/
        var reg = {
          phone: /^1(3|4|5|7|8)\d{9}$/
        }
        if(this.phone !="") {
          if (reg.phone.test(this.phone)) {
            this.$http.post('/test/weixin/updateRegister' + window.times, {
                assetCode: window.sessionStorage.devlicode,
                assetTrackInfos: JSON.stringify(sendJson.reverse())
              }, {
                emulateJSON: true
              })
              .then(
                function (response) {
                  if (response.data.success === 0) {
                    this.$router.push({
                      name: 'DeviceList',
                      params: {
                        id: this.$route.params.site,
                        assetStatus: 'ZCZT-SY'
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
                }
              )
          } else {
            var pams = {
              maskshow: true,
              title: "提示",
              tisnr: "请正确填写手机号",
              show:"",
              butt: {
                but_confirm: true,
                but_cancel: false
              }
            };
            this.mask = pams;
          }
        }else{
          this.$http.post('/test/weixin/updateRegister' + window.times, {
              assetCode: window.sessionStorage.devlicode,
              assetTrackInfos: JSON.stringify(sendJson)
            }, {
              emulateJSON: true
            })
            .then(
              function (response) {
                if (response.data.success === 0) {
                  this.$router.push({
                    name: 'DeviceList',
                    params: {
                      id: this.$route.params.site,
                      assetStatus: 'ZCZT-SY'
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
              }
            )
        }
      },
      /*scanClick: function(){ //扫一扫功能
        console.log("<<<=======>>>");
        wx.ready(function() {
          wx.scanQRCode({
            needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
              console.log("res",res);
              var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            }
          });
        });
      },*/
      setTitle : function(t) { //更新title  有问题，需要刷新才能更换
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
      cancel:function(){
        this.mask.maskshow = false;
      },
    },
    mounted(){
      this.setTitle('备注');
    },
    components:{
//      promptBox,
      calendar
//      'v-scan': Scan
    //      calendar: require('./calendar.vue')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../css/remarks.css";
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
  .show {
    padding: 0.1rem;
    width: 1.4rem;
    height: 1.4rem;
    position: relative;
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
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .picadd{
    width: 1.2rem;
    height: 1.2rem;
    position: relative;
    margin-left: 0.1rem;
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

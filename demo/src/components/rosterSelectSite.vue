<template>
  <div id="rosterSelectSite" class="rosterSelectSite">
    <div :class="'list'">
      <ul>
        <li v-for="item in items"   @click="returnHome(item.id,item.worksiteName)" v-bind:id="item.id">
          <a>
            <p>{{item.worksiteName}}</p>
          </a>
        </li>
      </ul>
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
    <!--<v-scan @click.native="scanClick()"></v-scan>-->
  </div>
</template>

<script>
//  import Scan from './scan.vue';
  export default {
    name: 'RosterSelectSite',
    data(){
      console.log("---------",this.$route);
      return {
        title:"请选择工地",
        items:[],
        mask:{
          maskshow: false,
          title: "",
          tisnr: "",
          judge:"",
          butt: {
            but_confirm: true,
            but_cancel: true
          }
        }
      }
    },
    created (){
      this.$http.post('/test/weixin/findWorkSite'+window.times,{
          params: {
          }
        },{
          emulateJSON:true
        })
        .then(
          function(response){
            if(response.data.success === 0) {
              this.items = response.data.data;
            }else if(response.data.success === -4){
              var pams = {
                maskshow:true,
                title:"提示",
                tisnr:'登录超时，请重新登录',
                judge:'-4',
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
      returnHome: function(e,i) {
        var workchua = e +','+i;
        this.$http.post('/test/weixin/saveHistory'+window.times,{
            userName:window.username,
            userExtendInfo:workchua,
          },{
            emulateJSON:true
          })
          .then(
            function(response){
              if(response.data.success === 0) {
                this.items = response.data.data;
              }else if(response.data.success === -4){
                var pams = {
                  maskshow:true,
                  title:"提示",
                  tisnr:'登录超时，请重新登录',
                  judge:'-4',
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
        this.$router.push({
          name: 'Home',
          params:{id:e,workSite:i}
        })
      },
      confirm:function(){
        console.log("this.mask.judge",this.mask.judge);
        if(this.mask.judge === '-4'){
          this.$router.push({
            name: 'Login',
            params:{}
          })
        }else{
          this.mask.maskshow=false;
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
      }
    },
    mounted(){
      this.setTitle('选择工地')
    },
    components:{
//      'v-scan': Scan
//      calendar: require('./calendar.vue')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../css/rosterSelectSite.css";
</style>

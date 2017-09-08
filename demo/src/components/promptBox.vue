<template lang="html">
  <div class="Mask" v-show="item.maskshow">
    <div class="promptBox">
      <div class="promptBox-title">
        <p>{{item.title}}</p><span @click="cancel"></span>
      </div>
      <div class="promptBox-top">
        <p>{{item.tisnr}}</p>
      </div>
      <div class="promptBox-butt">
        <input type="button" class="cancel" value="取消" @click="cancel" v-show="item.butt.but_cancel">
        <input type="button" class="confirm" value="确认" @click="confirm" v-show="item.butt.but_confirm">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name:"promptBox",
    data() {
      return {
        item:{
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
    mounted:{

    },
    methods: {
      prompt:function(data){
        console.log("data",data);
        this.item = data;

      },
      confirm:function(){  //确认
        var confirm="true";
        this.item.maskshow = false
        console.log(this.item.maskshow);
        return true
      },
      cancel:function(){  //取消
        this.item.maskshow = false
      }
    }
  }
</script>
<style>
  .Mask{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 999;
    background: rgba(0,0,0,0.3);
    filter: alpha(opacity=30);
  }
  .promptBox{
    width: 50%;
    height: 2.6rem;
    position: relative;
    top: 50%;
    left: 50%;
    margin-top: -2.5rem;
    margin-left: -25%;
    border-radius: 0.2rem;
    background-color: #fff;
  }
  .promptBox-title{
    border-bottom: 1px solid #eee;
  }
  .promptBox-title p{
    display: inline-block;
    width: 90%;
    line-height: 0.5rem;
    padding-left: 0.2rem;
  }
  .promptBox-title span{
    width: 10%;
    display: inline-block;
  }
  .promptBox-butt{
    text-align: center;
  }
  .promptBox input{
    width: 1rem;
    height: .5rem;
    color: #fff;
    text-align: center;
    line-height: .3rem;
    font-weight: 400;
    background-color: #c8c7cc;
    border-radius: 3px;
    display: inline-block;
    padding: 0 .1rem;
  }
  .promptBox-top{
    width: 100%;
    height: 1.4rem;
    line-height: 1.4rem;
    color: #000;
  }
  .promptBox-top p{
    text-align: center;
    font-size: 0.26rem;
  }

</style>

<template>
  <div>
    <div class="abs offline_box bg_white">
      <div class="nofind_box tc flex_column flex_center">
        <img class="nofind_ico" :src="offlineIco"/>
        <p class="nofind_title">无网络连接</p>
        <p class="nofind_text">您当前没有网络连接，部分网页使用了离线访问技术，您还可以继续访问！</p>
        <div class="btn_s_box mb50 mt20">
          <a class="small_btn" @click="goBackIndex">返回首页</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        offlineIco: './static/images/default.png'
      }
    },
    methods: {
      goBackIndex () {
        this.$store.commit('UPDATE_OfflineShow', false)
        this.$router.replace('/')
      }
    }
  }
</script>
<style lang="less" scoped>
  .offline_box{ position: fixed; left: 0; right: 0;bottom:0; top:0;}
  .nofind_box {height: 100vh;}
  .nofind_ico{ width: 60%; height: auto; margin-top: -1rem;}
  .nofind_title{ font-size: 0.32rem; color: #999; margin-top: 0.2rem;}
  .nofind_text{ font-size: 0.28rem; color: #C4CDD7; margin-top: 0.2rem; padding: 0 0.5rem;}
  .btn_s_box .small_btn{
    background-image: linear-gradient(-180deg, #ff9d32 0%, #ff682a 100%);
    box-shadow: 0 10px 15px #FFD9CF;
    border-radius: 0.5rem;
    font-size: 0.24rem!important; padding:0.1rem 0.5rem; color: #fff;
  }
</style>
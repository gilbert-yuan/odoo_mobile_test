<template>
  <div id="app" style="height:100%;">
    <view-box ref="viewBox">
      <x-header :title="headerTitle">
      </x-header>
      <router-view></router-view>
    </view-box>
  </div>
</template>

<script>
  import {XHeader, Actionsheet, Tab, TabItem, ViewBox} from 'vux'
  export default {
    name: 'app',
    components: {
      XHeader,
      Actionsheet,
      ViewBox,
      Tab,
      TabItem
    },
    data () {
      return {
        headerTitle: ''
      }
    },
    created: function () {
      this.$router.push({name: 'odooGrid'})
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

  body {
    background-color: #fbf9fe;
  }
</style>

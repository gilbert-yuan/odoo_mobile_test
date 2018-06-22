<template>
  <div id="app" style="height:100%;">
    <view-box ref="viewBox" :body-padding-top="'0px'" body-padding-bottom="55px">
      <div v-transfer-dom>
        <loading v-model="isLoading"></loading>
      </div>
      <div v-transfer-dom>
        <actionsheet :menus="vux.menus" v-model="showMenu" @on-click-menu="vux.actionSheetFunction"></actionsheet>
      </div>
      <x-header :left-options="{showBack: vux.showBackHeader, preventGoBack: true, backText: '返回首页'}"
                :title="vux.headerTitle"
                style="width:100%; position:float;" @on-click-back="onclickBack()">
      </x-header>
      <transition>
        <box gap="0.05em 0.2em">
          <router-view class="router-view"></router-view>
        </box>
      </transition>
      <tabbar class="vux-demo-tabbar" icon-class="vux-center" v-show="['odooGrid', 'OdooUser'].indexOf($route.name) >=0" slot="bottom">
        <tabbar-item :link="{path:'/'}" :selected="$router.path === '/'">
          <span class="demo-icon-22 vux-demo-tabbar-icon-home" slot="icon"
                style="position:relative;top: -2px;">&#xe637;</span>
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item @on-item-click="onclick_tabbar">
          <span class="demo-icon-22" slot="icon">&#xe633;</span>
          <span slot="label">我</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
  import {
    Radio, Group, Cell, Badge, Drawer, Actionsheet, ButtonTab, ButtonTabItem, ViewBox, cookie,
    XHeader, Tabbar, TabbarItem, Loading, TransferDom
  } from 'vux'

  import {mapState} from 'vuex'
  import Box from "vux/src/components/box/index";

  export default {
    name: 'app',
    directives: {
      TransferDom
    },
    components: {
      Box,
      Radio,
      Group,
      Cell,
      Badge,
      Drawer,
      ButtonTab,
      ButtonTabItem,
      ViewBox,
      XHeader,
      Tabbar,
      TabbarItem,
      Loading,
      Actionsheet
    },
    data: function () {
      return {
        isShowNav: false,
        direction: 'forward',
        headerTitle: '',
        showMenu: false
      }
    },
    computed: {
      ...mapState({
        route: state => state.route,
        path: state => state.route.path,
        isLoading: state => state.vux.isLoading,
        vux: state => state.vux
      })
    },
    methods: {
      onclickBack: function () {
        this.$router.push({name: 'odooGrid'})
      },
      onclick_tabbar: function () {
        this.$router.push({name: 'OdooUser'})
      },
      headerTransition: function () {
        if (!this.direction) return ''
        return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
      },
      changeLocale: function (menuKey, menuItem) {
      },
      viewTransition: function () {
        if (!this.direction) return ''
        return 'vux-pop-' + (this.direction === 'forward' ? 'in' : 'out')
      },
      actionSheetFunction: function (item, items) {
      }
    },
    mounted: function () {
      let self = this
      if (cookie.get('uid', {})) {
        self.vux.menus = ['刷新', '取消']
        self.vux.actionSheetFunction = self.actionSheetFunction
        self.headerTitle = self.vux.headerTitle
        self.$router.push({name: 'odooGrid'})
      } else {
        self.$router.push({name: 'OdooLogin'})
      }
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/tap.less';

  body {
    background-color: #fbf9fe;
  }

  body {
    background-color: #fbf9fe;
  }

  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }

  .demo-icon-22 {
    font-family: 'vux-demo';
    font-size: 22px;
    color: #888;
  }

  .weui-tabbar.vux-demo-tabbar {
    /** backdrop-filter: blur(10px);
    background-color: none;
    background: rgba(247, 247, 250, 0.5);**/
  }

  .vux-demo-tabbar .weui-bar__item_on .demo-icon-22 {
    color: #F70968;
  }

  .vux-demo-tabbar .weui-tabbar_item.weui-bar__item_on .vux-demo-tabbar-icon-home {
    color: rgb(53, 73, 94);
  }

  .demo-icon-22:before {
    content: attr(icon);
  }

  .vux-demo-tabbar-component {
    background-color: #F70968;
    color: #fff;
    border-radius: 7px;
    padding: 0 4px;
    line-height: 14px;
  }

  .weui-tabbar__icon + .weui-tabbar__label {
    margin-top: 0 !important;
  }

  .vux-demo-header-box {
    z-index: 100;
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
  }

  @font-face {
    font-family: 'vux-demo';  /* project id 70323 */
    src: url('//at.alicdn.com/t/font_70323_wlronpvr565yiudi.eot');
    src: url('//at.alicdn.com/t/font_70323_wlronpvr565yiudi.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_70323_wlronpvr565yiudi.woff') format('woff'),
    url('//at.alicdn.com/t/font_70323_wlronpvr565yiudi.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_70323_wlronpvr565yiudi.svg#iconfont') format('svg');
  }

  .demo-icon {
    font-family: 'vux-demo';
    font-size: 20px;
    color: #04BE02;
  }

  .demo-icon-big {
    font-size: 28px;
  }

  .demo-icon:before {
    content: attr(icon);
  }

  .router-view {
    width: 100%;
    top: 46px;
  }

  .vux-pop-out-enter-active,
  .vux-pop-out-leave-active,
  .vux-pop-in-enter-active,
  .vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .vux-pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .menu-title {
    color: #888;
  }


</style>

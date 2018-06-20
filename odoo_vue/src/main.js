// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import axios from 'axios'
import { sync } from 'vuex-router-sync'
import { Toast, ToastPlugin, cookie } from 'vux'
import VueScroller from 'vue-scroller'
import Grid from './components/OdooGrid.vue'
import View from './components/OdooViews.vue'
import Form from './components/OdooForm.vue'
import NewForm from './components/OdooNewForm.vue'
Vue.use(ToastPlugin, {position: 'middle'})
Vue.use(VueRouter)
require('./mock.js')
Vue.use(Vuex)
Vue.use(cookie)
Vue.use(VueScroller)
Vue.component('toast', Toast)

const routes = [{
  path: '/',
  component: App
}, {
  path: '/odoo/grid',
  name: 'odooGrid',
  component: Grid
}, {
  path: '/odoo/view/:actionId',
  name: 'odooViews',
  component: View
}, {
  path: '/odoo/view/:actionId/:domain',
  name: 'odooViewsDetial',
  component: View
}, {
  path: '/odoo/new/form',
  name: 'newForm',
  component: NewForm
}, {
  path: '/odoo/form/:record',
  name: 'odooForm',
  component: Form
}]

/** i18n **/
let store = new Vuex.Store({
})

axios.interceptors.request.use(function (config) {
  const token = cookie.get('session', {}) // 获取Cookie
  config.data = JSON.stringify(config.data)
  config.headers = {
    'Content-Type': 'application/x-www-form-urlencoded' // 设置跨域头部
  }
  if (token) {
    config.params = {'token': token} // 后台接收的参数，后面我们将说明后台如何接收
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  if(response.data.errCode === 2) {
    router.push({
      path: '/login',
      query: {redirect: router.currentRoute.fullPath} // 从哪个页面跳转
    })
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

Vue.prototype.$http = axios
store.registerModule('vux', {
  state: {
    demoScrollTop: 0,
    headerTitle: '内部系统ERP',
    menus: ['刷新'],
    tabbarShow: true,
    showBackHeader: false,
    isLoading: false,
    actionSheetFunction: function () {}
  }
})

const router = new VueRouter({
  routes
})
sync(store, router)
FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')

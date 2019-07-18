// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import qs from 'qs'
import VueRouter from 'vue-router'
import App from './App'
import axios from 'axios'
import { sync } from 'vuex-router-sync'
import { Toast, ToastPlugin, LoadingPlugin, Loading, cookie } from 'vux'
import VueScroller from 'vue-scroller'
import Grid from './components/OdooGrid.vue'
import View from './components/OdooViews.vue'
import Form from './components/OdooForm.vue'
import NewForm from './components/OdooNewForm.vue'
import Login from './components/OdooLogin.vue'
import Echats from './components/OdooEcharts.vue'
import OdooUser from './components/OdooUserMe.vue'
const FastClick = require('fastclick')
FastClick.attach(document.body)
Vue.use(ToastPlugin, {position: 'middle'})
Vue.use(VueRouter)
require('./mock.js')
Vue.use(Vuex)
Vue.use(Loading)
Vue.use(LoadingPlugin)
Vue.use(qs)
Vue.use(VueScroller)
Vue.component('toast', Toast)

const routes = [{
  path: '/',
  name: 'OdooLogin',
  component: Login
}, {
  path: '/odoo/grid',
  name: 'odooGrid',
  component: Grid
}, {
  path: '/odoo/charts',
  name: 'Echarts',
  component: Echats
}, {
  path: '/odoo/view/:actionId',
  name: 'odooViews',
  component: View
}, {
  path: '/odoo/me',
  name: 'OdooUser',
  component: OdooUser
}, {
  path: '/odoo/view/:actionId/:domain',
  name: 'odooViewsDetial',
  component: View
}, {
  path: '/odoo/new/form',
  name: 'newForm',
  component: NewForm
}, {
  path: '/odoo/login/',
  name: 'OdooLogin',
  component: Login
}, {
  path: '/odoo/form/:recordId',
  name: 'odooForm',
  component: Form
}]

/** i18n **/
let store = new Vuex.Store({
})
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

document.title = store.state.vux.headerTitle
axios.interceptors.request.use(function (config) {
  console.log(config)
  store.state.vux.isLoading = true
  if (!cookie.get('uid', {}) && config.url !== '/odoo/login') {
    router.push({
      path: '/odoo/login'
    })
  }
  return config
}, function (error) {
  store.state.vux.isLoading = false
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  store.state.vux.isLoading = false
  if (response.data.error_code) {
    router.push({
      path: '/odoo/login'
    })
  }
  return response
}, function (error) {
  router.push({
    path: '/odoo/login'
  })
  store.state.vux.isLoading = false
  return Promise.reject(error)
})

Vue.prototype.$http = axios

axios.interceptors.response.use(data => { // 响应成功关闭loading
  if (data.data.code === 'offline') {
    store.commit('UPDATE_LOADING', false)
    store.commit('UPDATE_OfflineShow', true)
  } else {
    let code = Number(data.data.code)
    switch (code) {
      case 5000:
        store.commit('SHOWTOAST', '服务器内部处理异常')
        break
      case 404:
        store.commit('SHOWTOAST', '该请求没有找到指定资源')
        break
      default:
        return data
    }
  }
})

const router = new VueRouter({
  routes
})

sync(store, router)
Vue.config.productionTip = false
// Before you create app
Vue.config.devtools = process.env.NODE_ENV === 'development'
/* eslint-disable no-new */
let app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
// After you create app
window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor
// then had to add in ./store.js as well.
Vue.config.devtools = process.env.NODE_ENV === 'development'

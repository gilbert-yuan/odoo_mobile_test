<template>
  <div>
    <box gap="10px 10px">
      <group>
        <div class="container">
          <div class="box">
            <p class="center"><img src="/web/binary/company_logo"></p>
          </div>
        </div>
      </group>
      <group>
        <x-input title="账号" v-model="name" type="text"></x-input>
        <x-input title="密码" v-model="password" type="password"></x-input>
      </group>
      <group>
        <x-button @click.native="login" type="primary">登录</x-button>
      </group>
    </box>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  import {
    Group, XInput, cookie, XButton, Box, XImg, Blur
  } from 'vux'

  export default {
    name: 'Login',
    components: {
      Group,
      XImg,
      Blur,
      Box,
      XButton,
      XInput
    },
    data: function () {
      return {
        name: '',
        password: ''
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
    created: function () {
      document.title = '系统登录'
      this.$nextTick(function () {
        this.name = ''
        this.password = ''
      })
    },
    methods: {
      login: function () {
        let self = this
        self.$http.post('/odoo/mobile/login', {name: this.name, password: this.password}).then(function (response) {
          if (response.data && response.data.result && response.data.result.success) {
            cookie.set('uid', response.data.result.uid, {expires: 60 * 60 * 24})
            self.$vux.toast.show({text: response.data.result.errMsg, type: 'text'})
            self.$router.push({name: 'odooGrid'})
          } else if (response.data && response.data.result) {
            self.$vux.toast.show({text: response.data.result.errMsg, type: 'warn'})
          }
        }).catch(function () {

        })
      }
    }
  }
</script>
<style scoped>
  .container {
    align-items: center;
    display: flex;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  .center {
    text-align: center;
    padding-top: 20px;
    color: #fff;
    font-size: 18px;
  }

  .center img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 4px solid #ececec;
  }

  .box {
    // background-image: url("https://odoo.net.cn/uploads/profile/6861-profileimg.jpg");
    border-radius: 5px;
    font-family: sans-serif;
    text-align: center;
    line-height: 1;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    max-width: 100%;
    max-height: 100%;
    padding: 20px 40px;
  }
</style>

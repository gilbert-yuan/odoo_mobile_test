<template>
  <div>
    <box gap="10px 10px">
      <group>
        <div class="container">
          <div class="box">
            <p class="center"><img src="https://odoo.net.cn/uploads/profile/6861-profileimg.jpg"></p>
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
    Group, XInput, XButton, Box, XImg, Blur
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
    },
    methods: {
      login: function () {
      }
    }
  }
</script>
<style scoped>

</style>

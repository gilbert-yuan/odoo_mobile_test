<template>
  <div>
    <box gap="10px 10px">
      <x-button @click.native="cancelLogin" type="warn">退出登录</x-button>
    </box>
  </div>
</template>

<script>
  import {
    Group, XInput, cookie, XButton, Box
  } from 'vux'

  export default {
    name: 'OdooUser',
    components: {
      Group,
      Box,
      XButton,
      XInput
    },
    data: function () {
      return {
      }
    },
    computed: {
    },
    created: function () {
    },
    methods: {
      cancelLogin: function () {
        cookie.remove('uid', {})
        this.$router.push({name: 'OdooLogin'})
      }
    }
  }
</script>

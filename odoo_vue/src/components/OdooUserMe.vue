<template>
  <div>
    <box gap="10px 10px">
      <group>
        <div class="container">
          <div class="box">
            <p class="center"><img :src="'/web/binary/image?model=res.users&field=image_small&id='+ uid"></p>
          </div>
        </div>
      </group>
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
        uid: 0
      }
    },
    computed: {
    },
    created: function () {
      if (!cookie.get('uid')) {
        this.$router.push({
          path: '/odoo/login'
        })
      }
      this.uid = cookie.get('uid', 1)
    },
    methods: {
      cancelLogin: function () {
        cookie.remove('uid', {})
        this.$router.push({name: 'OdooLogin'})
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
    //background-image: url("https://odoo.net.cn/uploads/profile/6861-profileimg.jpg");
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

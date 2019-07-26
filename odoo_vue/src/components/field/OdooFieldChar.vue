<template>
    <x-input :title="title" v-model="changeVal" :required="required && true || false" :type="type"
             :placeholder="placeholder||'请输入'+title"
             :readonly="readonly" :is-type="isType" @on-focus="focusChange"></x-input>
</template>

<script>
  import { XInput } from 'vux'
  export default {
    name: 'Char',
    props: [ 'value', 'title', 'readonly', 'required', 'showClear', 'isType', 'type', 'placeholder' ],
    components: {
      XInput
    },
    data: function () {
      return {
        changeVal: this.value
      }
    },
    methods: {
      focusChange: function (val) {
        this.changeVal = val
      }
    },
    watch: {
      changeVal: function (newvalue, oldVal) {
        this.$emit('update:value', newvalue)
        // this.value = newvalue
      }
    }
  }
</script>
<style scoped>

</style>

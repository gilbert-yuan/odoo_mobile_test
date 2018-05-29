<template>
  <x-input :title="title" v-model="changeVal" :required="required" :type="type" :placeholder="placeholder"
           :readonly="readonly" :show-clear="showClear" :is-type="isType"></x-input>
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
      }
    },
    computed: {
      changeVal: {
        get: function () {
          return this.value
        },
        set: function (v) {
          this.$emit('update:value', v)
        }
      }
    }
  }
</script>

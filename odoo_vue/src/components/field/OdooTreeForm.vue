<template>
  <div>
    <template v-for="field in newFormData">
      <template v-if="field.invisible">
      </template>
      <template v-else-if="field.type === 'char'">
        <Char :title="field.title" v-model="field.value" type="text" :required="field.required || false"></Char>
      </template>
      <template v-else-if="field.type === 'date'">
        <datetime v-model="field.value" :title="field.title" :required="field.required || false"></datetime>
      </template>
      <template v-else-if="field.type === 'datetime'">
        <datetime v-model="field.value" :title="field.title" format="YYYY-MM-DD HH:mm"
                  :required="field.required || false"></datetime>
      </template>
      <template v-else-if="field.type === 'many2one'">
        <Many2one :title="field.title" :value.sync='field.value'></Many2one>
      </template>
      <template v-else-if="field.type === 'boolean'">
        <x-switch :title="field.title" v-model="field.value"></x-switch>
      </template>
      <template v-else-if="field.type === 'integer'">
        <x-number :title="field.title" v-model="field.value" button-style="round"
                  :required="field.required || false"></x-number>
      </template>
      <template v-else-if="field.type === 'float'">
        <Char :title="field.title" v-model="field.value" type="number"
              :required="field.required || false"></Char>
      </template>
      <template v-else-if="field.type === 'selection'">
        <selector :title="field.title" :options="field.options" v-model="field.value"
                     :required="field.required || false"></selector>
      </template>
      <template v-else-if="field.type === 'text'">
        <x-textarea :title="field.title" v-model="field.value"
                    :required="field.required || false"></x-textarea>
      </template>
      <template v-else-if="field.type === 'Html'">

      </template>
      <template v-else-if="field.type === 'Binary'">

      </template>
      <template v-else-if="field.type === 'Many2many'">

      </template>
    </template>
    <x-button mini type="primary" @click.native="saveForm()">保存</x-button>
    <x-button mini type="warn" @click.native="cancel()">取消</x-button>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import Char from './OdooFieldChar.vue'
  import Many2one from './OdooMany2one.vue'
  import {
    GroupTitle, Group, XInput, Selector, PopupRadio,
    Datetime, XNumber, XTextarea, XSwitch, XButton
  } from 'vux'

  export default {
    name: 'treeForm',
    components: {
      Group,
      Char,
      XButton,
      PopupRadio,
      Many2one,
      GroupTitle,
      XInput,
      Selector,
      Datetime,
      XNumber,
      XTextarea,
      XSwitch
    },
    props: ['allFormData', 'model', 'id'],
    computed: {
      ...mapState({
        route: state => state.route,
        path: state => state.route.path,
        isLoading: state => state.vux.isLoading,
        vux: state => state.vux
      }),
      newFormData: {
        get: function () {
          return this.allFormData
        },
        set: function (v) {
          this.$emit('update:allFormData', v)
        }
      }
    },
    methods: {
      saveForm: function () {
        this.$emit('save', this.newFormData)
      },
      cancel: function () {
        this.$emit('cancel', this.newFormData)
      },
      getTreeRowFooter: function () {
        return {
          title: '添加'
        }
      },
      actionSheetFunction: function (itemIndex, items) {

      },
      treeRowClick: function (field) {
        console.log(field)
      }
    }
  }
</script>

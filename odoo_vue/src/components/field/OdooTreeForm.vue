<template>
  <div>
    <group label-width="5.5em" label-margin-right="2em" label-align="left" gutter="20px">
        <template v-for="field in newFormData.fieldVals">
          <template v-if="!field.is_show_edit_form">
            <template v-if="field.type === 'char'">
              <x-input :title="field.title" v-model="field.value" type="text"
                       :required="field.required && true || false"
                       value-text-align="left"
                       :readonly="field.readonly"></x-input>
            </template>
            <template v-else-if="field.type === 'date'">
              <datetime v-model="field.value" :title="field.title" :required="field.required || false"></datetime>
            </template>
            <template v-else-if="field.type === 'datetime'">
              <datetime v-model="field.value" :title="field.title" format="YYYY-MM-DD HH:mm"
                        :required="field.required || false"></datetime>
            </template>
            <template v-else-if="field.type === 'many2one'">
              <Many2one :title="field.title" :value.sync='field.value' :field="field" :readonly="field.readonly"
                        :options_default.sync="field.options"></Many2one>
            </template>
            <template v-else-if="field.type === 'boolean'">
              <x-switch :title="field.title" v-model="field.value"
                        :required="field.required || false"
                        :readonly="field.readonly"
              ></x-switch>
            </template>
            <template v-else-if="field.type === 'integer'">
              <x-number :title="field.title" v-model="field.value" button-style="round" :readonly="field.readonly"
                        :required="field.required || false"></x-number>
            </template>
            <template v-else-if="field.type === 'float'">
              <x-input :title="field.title" v-model="field.value" type="number"
                       :required="field.required && true || false"
                       value-text-align="left"
                       :readonly="field.readonly"></x-input>
            </template>
            <template v-else-if="field.type === 'selection'">
              <selector :title="field.title" :options="field.options" v-model="field.value" :readonly="field.readonly"
                        :required="field.required || false"></selector>
            </template>
            <template v-else-if="field.type === 'text'">
              <x-textarea :title="field.title" v-model="field.value" :readonly="field.readonly"
                          :required="field.required || false"></x-textarea>
            </template>
            <template v-else-if="field.type === 'Html'">
            </template>
            <template v-else-if="field.type === 'Binary'">
            </template>
            <template v-else-if="field.type === 'Many2many'">
            </template>
          </template>
        </template>
        <group gutter="20px">
          <group>
          </group>
          <flexbox>
            <flexbox-item>
              <x-button type="warn" @click.native="cancel">取消</x-button>
            </flexbox-item>
            <flexbox-item>
              <x-button type="primary" @click.native="saveForm">保存</x-button>
            </flexbox-item>
          </flexbox>
        </group>
    </group>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import Char from './OdooFieldChar.vue'
  import Many2one from './OdooMany2one.vue'
  import {
    GroupTitle, Group, XInput, Selector, PopupRadio, Box, Flexbox, FlexboxItem,
    Datetime, XNumber, XTextarea, XSwitch, XButton
  } from 'vux'

  export default {
    name: 'treeForm',
    components: {
      Group,
      Char,
      Flexbox,
      FlexboxItem,
      Box,
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
      })
    },
    data: function () {
      return {
        newFormData: {}
      }
    },
    created: function () {
    },
    watch: {
      allFormData: {
        handler: function (val, oldVal) {
          this.newFormData = []
          this.newFormData = JSON.parse(JSON.stringify(val))
        },
        deep: true
      }
    },
    methods: {
      saveForm: function () {
        // this.allFormData = this.newFormData
        this.$emit('save', this.newFormData)
      },
      cancel: function () {
        // this.newFormData = []
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
      }
    }
  }
</script>

<style lang="less">
  .custom-primary-red {
    border-radius: 99px !important;
    border-color: #CE3C39 !important;
    color: #CE3C39 !important;
    &:active {
      border-color: rgba(206, 60, 57, 0.6) !important;
      color: rgba(206, 60, 57, 0.6) !important;
      background-color: transparent;
    }
  }
</style>

<template>
  <div>
    <group>
      <template v-for="field in allFormData">
        <template v-if="!field.is_show_edit_form">
          <template v-if="field.type === 'char'">
            <Char :title="field.title" :value.sync="field.value" type="text" :required="field.required || false"></Char>
          </template>
          <template v-else-if="field.type === 'date'">
            <datetime v-model="field.value" :title="field.title" :required="field.required || false"></datetime>
          </template>
          <template v-else-if="field.type === 'datetime'">
            <datetime v-model="field.value" :title="field.title" format="YYYY-MM-DD HH:mm"
                      :required="field.required || false"></datetime>
          </template>
          <template v-else-if="field.type === 'many2one'">
            <Many2one :title="field.title" :value.sync='field.value' :field="field" :options_default.sync="field.options"></Many2one>
          </template>
          <template v-else-if="field.type === 'one2many'">
            <TreeRow :list.sync="field.tree_show" style="position:autoFixed;" v-on:on-click-item="treeRowClick"
                     :header="field.title" :footer="getTreeRowFooter()" :recordField="field.many_field"
            ></TreeRow>
          </template>
          <template v-else-if="field.type === 'boolean'">
            <x-switch :title="field.title" v-model="field.value"></x-switch>
          </template>
          <template v-else-if="field.type === 'integer'">
            <x-number :title="field.title" v-model="field.value" button-style="round"
                      :required="field.required || false"></x-number>
          </template>
          <template v-else-if="field.type === 'float'">
            <Char :title="field.title" :value.sync="field.value" type="number"
                  :required="field.required || false"></Char>
          </template>
          <template v-else-if="field.type === 'selection'">
            <selector :value="field.value" :title="field.title"  :options="field.options"
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
      </template>
    </group>
    <group>
      <x-button type="primary" @click.native="saveRecord">保存</x-button>
    </group>
    <div v-transfer-dom>
      <alert v-model="showAlert" title="错误" @on-show="onShow" @on-hide="onHide"> {{ errorMessage}}</alert>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import {mapState} from 'vuex'
  import Char from './OdooFieldChar.vue'
  import TreeRow from './OdooTreeRow.vue'
  import Many2one from './OdooMany2one.vue'
  import {
    GroupTitle, Group, XInput, Selector, PopupRadio, XButton, Msg, TransferDom, Alert,
    Datetime, XNumber, XTextarea, XSwitch
  } from 'vux'

  export default {
    name: 'editForm',
    components: {
      Group,
      Char,
      Selector,
      Msg,
      Alert,
      XButton,
      TreeRow,
      PopupRadio,
      Many2one,
      GroupTitle,
      XInput,
      Datetime,
      XNumber,
      XTextarea,
      XSwitch
    },
    directives: {
      TransferDom
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
    created: function () {
    },
    data () {
      return {
        errorMessage: '',
        showAlert: false
      }
    },
    methods: {
      onShow: function () {},
      onHide: function () {},
      saveRecord: function () {
        let self = this
        axios.post('/odoo/save/record', {value: this.allFormData, modelName: this.model}).then(function (response) {
          if (response.success) {

          }
        }).catch(function () {
          self.showAlert = true
          self.errorMessage = ''
        })
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

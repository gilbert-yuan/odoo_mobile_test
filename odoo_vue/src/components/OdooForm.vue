<template>
  <div>
    <div style="padding:15px;">
      <x-table>
        <thead></thead>
        <tbody>
        <template v-for="field in allFormData">
          <template v-if="field.type=='boolean' && !field.invisible">
            <tr>
              <td style="width: 40%"> {{field.title}}</td>
              <td style="width: 60%">
                <check-icon :value="field.value" type="plain"></check-icon>
              </td>
            </tr>
          </template>
          <template
            v-else-if="['char', 'boolean', 'integer', 'many2one', 'float', 'selection'].indexOf(field.type) >= 0 && !field.invisible">
            <tr>
              <td style="width: 40%"> {{ field.title }}</td>
              <td style="width: 60%">{{ field.value }}</td>
            </tr>
          </template>
        </template>
        </tbody>
      </x-table>
      <template v-for="field in allFormData">
        <template v-if="field.type=='one2many'">
          <x-table full-bordered style="background-color:#fff;font-size: 8px">
            <thead>
            <tr>
              <th v-for="tableT in field.table.tableTh">
                {{tableT}}
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="rowVal in  field.table.tableBody">
              <td v-for="val in rowVal">
                {{val.value}}
              </td>
            </tr>
            </tbody>
          </x-table>
        </template>
      </template>
      <template  v-for="(item, index) in allFormData">
        <x-button v-show="!item.invisible && item.type === 'button'"
                v-on:click.prevent="buttonHttp(item, index)" type="primary"
                v-bind:value="item.value">{{item.title}} </x-button>
      </template>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {XTable, CheckIcon, XButton} from 'vux'

  export default {
    name: 'formComponent',
    components: {
      XTable,
      XButton,
      CheckIcon
    },
    data: function () {
      return {
        second_level_menu: [],
        id: 0,
        allFormData: []
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
      let self = this
      self.vux.menus = ['新建', '删除', '编辑', '取消']
      self.vux.actionSheetFunction = self.actionSheetFunction
      self.$nextTick(function () {
        self.get_form_data()
      })
    },
    methods: {
      actionSheetFunction: function (itemIndex, items) {
        if (items === '新建') {
          this.$router.push({name: 'newForm', params: {}})
        }
      },
      buttonHttp: function (item, index) {
        let self = this
        self.$http.get('/odoo/button/method', {params: { method: item.value, model: item.model, ids: self.id }}).then(function (response) {
          if (response.data.success) {
            self.$emit('refresh', false)
          } else {
            self.$emit('show-toast', {toastType: 'warn', toastMsg: response.data.errMsg, toastShow: true})
          }
        }).catch(function () {

        })
      },
      get_form_data: function () {
        let self = this
        self.$http.get('/odoo/form/view/data', {
          params: {
            model: self.$route.query.model,
            viewId: self.$route.query.viewId,
            id: self.$route.query.recordId
          }
        }).then(function (response) {
          self.allFormData = response.data.fieldVals
          self.id = response.data.id
        }).catch(function (error) {
          alert(error)
        })
      }
    },
    watch: {}
  }
</script>

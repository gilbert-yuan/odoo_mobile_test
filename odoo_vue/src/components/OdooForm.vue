<template>
  <div>
    <div style="padding:15px;">
      <x-table >
        <thead></thead>
        <tbody>
        <template v-for="field in allFormData">
          <template v-if="field.type=='boolean'">
            <tr>
              <td style="width: 40%"> {{field.title}}</td>
              <td style="width: 60%">
                <check-icon :value="field.value" type="plain"></check-icon>
              </td>
            </tr>
          </template>
          <template v-else-if="field.type=='char'">
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
          <x-table full-bordered style="background-color:#fff;">
            <thead>
              <tr>
                <th v-for="tableT in field.value.tableTh">
                  {{tableT}}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="rowVal in  field.value.value">
                <td v-for="val in rowVal">
                  {{val}}
                </td>
              </tr>
            </tbody>
          </x-table>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapState } from 'vuex'
  import {XTable, CheckIcon} from 'vux'
  export default {
    name: 'formComponent',
    components: {
      XTable,
      CheckIcon
    },
    data: function () {
      return {
        second_level_menu: [],
        allFormData: [],
        model: [],
        id: []
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
          this.$router.push({ name: 'newForm', params: {} })
        }
      },
      get_form_data: function () {
        let self = this
        axios.get('/odoo/form/view/data', {model: this.model, id: this.recordId}).then(function (response) {
          self.allFormData = response.data
        }).catch(function (error) {
          alert(error)
        })
      }
    },
    watch: {
      '$route': function (to, from) {
      }
    }
  }
</script>

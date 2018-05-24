<template>
  <div>

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
      //      self.vux.menus = ['新建', '删除', '编辑', '取消']
      //      self.vux.actionSheetFunction = self.actionSheetFunction
      self.$nextTick(function () {
        self.get_form_data()
      })
    },
    methods: {
      actionSheetFunction: function (itemIndex, items) {

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

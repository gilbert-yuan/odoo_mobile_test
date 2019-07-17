<template>
  <editForm :allFormData.sync="allFormData" :model="model" :id="id">
  </editForm>
</template>

<script>
  import {mapState} from 'vuex'
  import editForm from './field/OdooEditForm.vue'
  import {
    GroupTitle, Group, XInput, Selector, PopupRadio,
    Datetime, XNumber, XTextarea, XSwitch
  } from 'vux'

  export default {
    name: 'formComponent',
    components: {
      Group,
      editForm,
      PopupRadio,
      GroupTitle,
      XInput,
      Selector,
      Datetime,
      XNumber,
      XTextarea,
      XSwitch
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
      self.$nextTick(function () {
        self.get_form_data()
      })
    },
    methods: {
      actionSheetFunction: function (itemIndex, items) {

      },
      get_form_data: function () {
        let self = this
        self.$http.get('/odoo/mobile/form/view/data',
          {params: {
            model: self.$route.params.model,
            viewId: self.$route.params.viewId,
            id: self.$route.params.id}
          }).then(function (response) {
            self.allFormData = response.data && response.data
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

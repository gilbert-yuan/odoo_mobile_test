<template>
  <div>
    <group>
      <template v-for="field in allFormData">
        <template v-if="field.type === 'char'">
          <x-input title="field.name" v-model="field.value"></x-input>
        </template>
        <template v-else-if="field.type === 'date'" >

        </template>
        <template v-else-if="field.type === 'datetime'" >

        </template>
        <template v-else-if="field.type === 'many2one'" >

        </template>
        <template v-else-if="field.type === 'one2many'" >

        </template>
        <template v-else-if="field.type === 'boolean'" >

        </template>
        <template v-else-if="field.type === 'integer'" >

        </template>
        <template v-else-if="field.type === 'float'" >

        </template>
        <template v-else-if="field.type === 'selection'" >

        </template>
        <template v-else-if="field.type === 'text'" >

        </template>
        <template v-else-if="field.type === 'Html'" >

        </template>
        <template v-else-if="field.type === 'Binary'" >

        </template>
        <template v-else-if="field.type === 'Many2many'" >

        </template>

      </template>
    </group>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapState } from 'vuex'
  import { GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, XNumber, XAddress, XTextarea, XSwitch } from 'vux'

  export default {
    name: 'formComponent',
    components: {
      Group,
      GroupTitle,
      Cell,
      XInput,
      Selector,
      PopupPicker,
      XAddress,
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
